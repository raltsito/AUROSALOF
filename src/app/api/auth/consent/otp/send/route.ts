// POST /api/auth/consent/otp/send
// Genera un OTP de 6 dígitos, lo almacena hasheado y lo envía por email.
// Requiere: sesión activa (usuario autenticado).
// Aplica cooldown de 60 s entre reenvíos.

import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser }            from '@/lib/auth'
import { createOtp }                 from '@/lib/otp'
import { sendEmail, buildOtpEmail }  from '@/lib/email'
import { prisma }                    from '@/lib/db'
import { rateLimiter }               from '@/lib/rateLimit'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ ok: false, error: 'No autenticado.' }, { status: 401 })
    }

    // Verificar que no tenga consentimiento previo
    const existing = await prisma.consent.findUnique({ where: { user_id: user.id } })
    if (existing?.otp_verified) {
      return NextResponse.json({ ok: true, already_verified: true })
    }

    // Rate limit: máx 3 envíos por usuario en 15 min
    const rl = await rateLimiter.check(`otp_send:${user.id}`, 3, 15 * 60 * 1000)
    if (!rl.allowed) {
      return NextResponse.json(
        { ok: false, error: 'Demasiados intentos de envio. Espera 15 minutos.' },
        { status: 429 }
      )
    }

    // Crear OTP (maneja cooldown de 60 s internamente)
    const result = await createOtp(user.id, 'consent')
    if (!result.ok || !result.code) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 429 })
    }

    // Enviar email
    const emailContent = buildOtpEmail({ code: result.code, name: user.name.split(' ')[0] })
    const emailResult  = await sendEmail({ to: user.email, ...emailContent })

    if (!emailResult.ok) {
      // En dev el email siempre es ok (se imprime en consola)
      // En prod: retornar error manejable
      return NextResponse.json(
        { ok: false, error: 'No se pudo enviar el correo. Intenta de nuevo.' },
        { status: 503 }
      )
    }

    // No retornar el código — solo confirmar el envío
    return NextResponse.json({
      ok:         true,
      email_hint: maskEmail(user.email), // Solo para mostrar en la UI: "j***@empresa.com"
    })
  } catch (err) {
    console.error('[consent/otp/send]', err)
    return NextResponse.json({ ok: false, error: 'Error interno.' }, { status: 500 })
  }
}

/** Enmascara el email para mostrarlo en la UI sin revelar la dirección completa */
function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!local || !domain) return email
  const visible = local.length > 2 ? local[0] + '***' : '***'
  return `${visible}@${domain}`
}
