import { NextRequest, NextResponse } from 'next/server'
import { prisma }                    from '@/lib/db'
import { hashPassword, createSession, setSessionCookie, validateEmail, validatePassword } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password, company_code } = body

    // Validaciones
    if (!name?.trim() || name.trim().length < 2) {
      return NextResponse.json({ ok: false, error: 'Nombre invalido.' }, { status: 400 })
    }
    if (!validateEmail(email)) {
      return NextResponse.json({ ok: false, error: 'Correo invalido.' }, { status: 400 })
    }
    const pwCheck = validatePassword(password ?? '')
    if (!pwCheck.ok) {
      return NextResponse.json({ ok: false, error: pwCheck.error }, { status: 400 })
    }

    // Verificar correo unico
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json(
        { ok: false, error: 'Ya existe una cuenta con ese correo.' },
        { status: 409 }
      )
    }

    const hashed = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        name:       name.trim(),
        email:      email.toLowerCase().trim(),
        password:   hashed,
        company_id: company_code?.trim() || null,
      },
    })

    // Crear perfil de zona por defecto (prior poblacional)
    await prisma.zoneProfile.create({
      data: {
        user_id:        user.id,
        center_arousal: 5.2,
        center_valence: 6.1,
        sigma_arousal:  1.5,
        sigma_valence:  1.8,
        sample_count:   0,
      },
    })

    // Crear sesion
    const token = await createSession({
      id:          user.id,
      name:        user.name,
      email:       user.email,
      company_id:  user.company_id,
      theme:       user.theme as 'calm' | 'intra',
      has_consent: false,
    })
    await setSessionCookie(token)

    return NextResponse.json({ ok: true, data: { has_consent: false } })
  } catch (err) {
    console.error('[register]', err)
    return NextResponse.json({ ok: false, error: 'Error interno.' }, { status: 500 })
  }
}
