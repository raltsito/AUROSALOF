// POST /api/auth/login
// Sprint 2: rate limiting via rateLimiter abstracto (memory/Redis)

import { NextRequest, NextResponse } from 'next/server'
import { prisma }                    from '@/lib/db'
import { verifyPassword, createSession, setSessionCookie, validateEmail } from '@/lib/auth'
import { rateLimiter }               from '@/lib/rateLimit'

const LOGIN_LIMIT     = 5
const LOGIN_WINDOW_MS = 15 * 60 * 1000 // 15 minutos

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!validateEmail(email) || !password) {
      return NextResponse.json(
        { ok: false, error: 'Correo o contrasena incorrectos.' },
        { status: 400 }
      )
    }

    const key = `login:${email.toLowerCase().trim()}`

    const rl = await rateLimiter.check(key, LOGIN_LIMIT, LOGIN_WINDOW_MS)
    if (!rl.allowed) {
      return NextResponse.json(
        { ok: false, error: 'Demasiados intentos fallidos. Espera 15 minutos.' },
        { status: 429 }
      )
    }

    const user = await prisma.user.findUnique({
      where:   { email: email.toLowerCase().trim() },
      include: { consent: true },
    })

    // Respuesta genérica para no filtrar existencia del usuario
    if (!user) {
      return NextResponse.json(
        { ok: false, error: 'Correo o contrasena incorrectos.' },
        { status: 401 }
      )
    }

    const valid = await verifyPassword(password, user.password)
    if (!valid) {
      return NextResponse.json(
        { ok: false, error: 'Correo o contrasena incorrectos.' },
        { status: 401 }
      )
    }

    // Login exitoso — limpiar intentos
    await rateLimiter.reset(key)

    const hasConsent = !!user.consent?.otp_verified
    const token = await createSession({
      id:          user.id,
      name:        user.name,
      email:       user.email,
      company_id:  user.company_id,
      theme:       user.theme as 'calm' | 'intra',
      has_consent: hasConsent,
    })
    await setSessionCookie(token)

    return NextResponse.json({ ok: true, data: { has_consent: hasConsent } })
  } catch (err) {
    console.error('[login]', err)
    return NextResponse.json({ ok: false, error: 'Error interno.' }, { status: 500 })
  }
}
