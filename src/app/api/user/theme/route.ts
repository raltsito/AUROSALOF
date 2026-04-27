// PATCH /api/user/theme — ARUOSAL Sprint 2
// Persiste la preferencia de tema en la base de datos y refresca el JWT.
// Body: { theme: "calm" | "intra" }

import { NextRequest, NextResponse } from 'next/server'
import { prisma }                    from '@/lib/db'
import { getCurrentUser, createSession, setSessionCookie } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function PATCH(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ ok: false, error: 'No autenticado.' }, { status: 401 })
    }

    const { theme } = await req.json()

    if (theme !== 'calm' && theme !== 'intra') {
      return NextResponse.json(
        { ok: false, error: 'Tema invalido. Valores permitidos: "calm" o "intra".' },
        { status: 400 }
      )
    }

    // Persistir en DB
    await prisma.user.update({
      where: { id: user.id },
      data:  { theme },
    })

    // Refrescar JWT con el tema actualizado
    const newToken = await createSession({ ...user, theme })
    await setSessionCookie(newToken)

    return NextResponse.json({ ok: true, data: { theme } })
  } catch (err) {
    console.error('[user/theme]', err)
    return NextResponse.json({ ok: false, error: 'Error interno.' }, { status: 500 })
  }
}
