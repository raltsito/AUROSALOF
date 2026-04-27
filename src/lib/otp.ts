// Gestión de OTP — ARUOSAL Sprint 2
// Genera, almacena (hasheado) y verifica códigos de 6 dígitos
// Propósito inicial: consentimiento LFPDPPP
// Extensible a: login MFA, revocación de consentimiento

import { randomInt }  from 'crypto'
import { sha256 }     from './crypto'
import { prisma }     from './db'

// ─── Constantes ───────────────────────────────────────────────────────────────

const OTP_EXPIRY_MS   = 10 * 60 * 1000 // 10 minutos
const MAX_ATTEMPTS    = 3
const RESEND_COOLDOWN = 60 * 1000       // 60 segundos entre reenvíos

// ─── Generación ───────────────────────────────────────────────────────────────

/** Genera un código numérico de 6 dígitos con criptografía segura */
function generateCode(): string {
  // randomInt(lo, hi) → [lo, hi) — producimos 000000–999999 con padding
  return String(randomInt(0, 1_000_000)).padStart(6, '0')
}

// ─── Crear OTP ────────────────────────────────────────────────────────────────

export interface CreateOtpResult {
  ok:     boolean
  code?:  string   // Solo retornado para que el llamador lo envíe por email
  error?: string
}

/**
 * Crea un nuevo OTP para el usuario.
 * - Invalida OTPs anteriores del mismo propósito.
 * - Respeta cooldown de 60 s entre reenvíos.
 * - El código NO se almacena en claro — solo su SHA-256.
 */
export async function createOtp(userId: string, purpose: string): Promise<CreateOtpResult> {
  // Verificar cooldown: ¿hay un OTP creado hace menos de 60 s?
  const recent = await prisma.otpCode.findFirst({
    where: {
      user_id:    userId,
      purpose,
      used:       false,
      created_at: { gte: new Date(Date.now() - RESEND_COOLDOWN) },
    },
    orderBy: { created_at: 'desc' },
  })

  if (recent) {
    const waitSec = Math.ceil(
      (RESEND_COOLDOWN - (Date.now() - recent.created_at.getTime())) / 1000
    )
    return {
      ok:    false,
      error: `Espera ${waitSec} segundos antes de solicitar un nuevo codigo.`,
    }
  }

  // Invalidar OTPs pendientes anteriores del mismo propósito
  await prisma.otpCode.updateMany({
    where: { user_id: userId, purpose, used: false },
    data:  { used: true },
  })

  // Generar y almacenar (solo hash)
  const code = generateCode()
  await prisma.otpCode.create({
    data: {
      user_id:    userId,
      code_hash:  sha256(code),
      purpose,
      expires_at: new Date(Date.now() + OTP_EXPIRY_MS),
    },
  })

  return { ok: true, code }
}

// ─── Verificar OTP ────────────────────────────────────────────────────────────

export interface VerifyOtpResult {
  ok:     boolean
  error?: string
}

/**
 * Verifica un OTP ingresado por el usuario.
 * - Busca el OTP activo más reciente (no usado, no expirado).
 * - Incrementa intentos aunque sea incorrecto.
 * - Marca como usado si es correcto.
 */
export async function verifyOtp(
  userId:    string,
  purpose:   string,
  inputCode: string,
): Promise<VerifyOtpResult> {
  const otp = await prisma.otpCode.findFirst({
    where: {
      user_id:    userId,
      purpose,
      used:       false,
      expires_at: { gte: new Date() },
    },
    orderBy: { created_at: 'desc' },
  })

  if (!otp) {
    return {
      ok:    false,
      error: 'El codigo expiro o no existe. Solicita uno nuevo.',
    }
  }

  if (otp.attempts >= MAX_ATTEMPTS) {
    return {
      ok:    false,
      error: 'Has agotado los intentos. Solicita un codigo nuevo.',
    }
  }

  const inputHash = sha256(inputCode.trim().replace(/\s/g, ''))

  if (inputHash !== otp.code_hash) {
    await prisma.otpCode.update({
      where: { id: otp.id },
      data:  { attempts: { increment: 1 } },
    })
    const remaining = MAX_ATTEMPTS - (otp.attempts + 1)
    const msg = remaining > 0
      ? `Codigo incorrecto. Te ${remaining === 1 ? 'queda' : 'quedan'} ${remaining} intento${remaining === 1 ? '' : 's'}.`
      : 'Codigo incorrecto. Has agotado los intentos. Solicita uno nuevo.'
    return { ok: false, error: msg }
  }

  // Correcto — marcar como usado
  await prisma.otpCode.update({
    where: { id: otp.id },
    data:  { used: true },
  })

  return { ok: true }
}
