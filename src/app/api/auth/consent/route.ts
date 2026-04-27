import { NextRequest, NextResponse } from 'next/server'
import { prisma }            from '@/lib/db'
import { getCurrentUser, createSession, setSessionCookie } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ ok: false, error: 'No autenticado.' }, { status: 401 })
    }

    const { version, text_hash } = await req.json()

    if (!version || !text_hash) {
      return NextResponse.json({ ok: false, error: 'Datos de consentimiento incompletos.' }, { status: 400 })
    }

    // Verificar que no tenga consentimiento ya registrado
    const existing = await prisma.consent.findUnique({ where: { user_id: user.id } })
    if (existing) {
      // Ya tenia consentimiento, redirigir sin error
      return NextResponse.json({ ok: true })
    }

    await prisma.consent.create({
      data: {
        user_id:      user.id,
        version,
        text_hash,
        otp_verified: false, // Sprint 2: implementar OTP de consentimiento
        // TODO Sprint 2: registrar ip_address, device_id, otp_code
      },
    })

    // Actualizar JWT con has_consent = true
    const newToken = await createSession({ ...user, has_consent: true })
    await setSessionCookie(newToken)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[consent]', err)
    return NextResponse.json({ ok: false, error: 'Error interno.' }, { status: 500 })
  }
}
