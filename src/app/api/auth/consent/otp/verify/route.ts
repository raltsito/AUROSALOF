// POST /api/auth/consent/otp/verify
// Verifica el OTP ingresado por el usuario y, si es correcto,
// crea el registro de consentimiento inmutable y refresca el JWT.
//
// Body: { otp_code: string, version: string, text_hash: string, device_id?: string }
// Respuesta exitosa: actualiza JWT (has_consent: true) y retorna ok: true.

import { NextRequest, NextResponse } from 'next/server'
import { prisma }                    from '@/lib/db'
import { getCurrentUser, createSession, setSessionCookie } from '@/lib/auth'
import { verifyOtp }                 from '@/lib/otp'
import { rateLimiter }               from '@/lib/rateLimit'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ ok: false, error: 'No autenticado.' }, { status: 401 })
    }

    // Verificar que no tenga consentimiento ya registrado
    const existing = await prisma.consent.findUnique({ where: { user_id: user.id } })
    if (existing?.otp_verified) {
      // Ya tiene consentimiento — refrescar JWT por si acaso y continuar
      const newToken = await createSession({ ...user, has_consent: true })
      await setSessionCookie(newToken)
      return NextResponse.json({ ok: true })
    }

    // Rate limit de verificación: máx 5 intentos en 15 min (la lógica por OTP es adicional)
    const rl = await rateLimiter.check(`otp_verify:${user.id}`, 5, 15 * 60 * 1000)
    if (!rl.allowed) {
      return NextResponse.json(
        { ok: false, error: 'Demasiados intentos. Espera 15 minutos.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const { otp_code, version, text_hash, device_id } = body as {
      otp_code:   string
      version:    string
      text_hash:  string
      device_id?: string
    }

    if (!otp_code || !version || !text_hash) {
      return NextResponse.json(
        { ok: false, error: 'Datos incompletos.' },
        { status: 400 }
      )
    }

    // Verificar OTP (incluye control de intentos y expiración)
    const otpResult = await verifyOtp(user.id, 'consent', otp_code)
    if (!otpResult.ok) {
      return NextResponse.json({ ok: false, error: otpResult.error }, { status: 422 })
    }

    // Capturar IP del request
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      'unknown'

    // Crear registro de consentimiento inmutable
    await prisma.consent.upsert({
      where:  { user_id: user.id },
      create: {
        user_id:      user.id,
        version,
        text_hash,
        otp_verified: true,
        ip_address:   ip,
        device_id:    device_id ?? null,
      },
      update: {
        // Solo actualizar si no estaba verificado (rara vez llega aquí por el check de arriba)
        otp_verified: true,
        ip_address:   ip,
        device_id:    device_id ?? null,
      },
    })

    // Resetear rate limiters de OTP
    await rateLimiter.reset(`otp_send:${user.id}`)
    await rateLimiter.reset(`otp_verify:${user.id}`)

    // Actualizar JWT con has_consent = true
    const newToken = await createSession({ ...user, has_consent: true })
    await setSessionCookie(newToken)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[consent/otp/verify]', err)
    return NextResponse.json({ ok: false, error: 'Error interno.' }, { status: 500 })
  }
}
