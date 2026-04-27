// GET/POST /api/coach/sessions — ARUOSAL Sprint 2
// GET: historial de sesiones del usuario autenticado.
// POST: crear una nueva sesión (virtual o con coach humano).
// Las notas de sesión se cifran en reposo (AES-256-GCM).

import { NextRequest, NextResponse } from 'next/server'
import { prisma }                    from '@/lib/db'
import { getCurrentUser }            from '@/lib/auth'
import { encryptText, decryptText }  from '@/lib/crypto'

// ─── GET ─────────────────────────────────────────────────────────────────────

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ ok: false, error: 'No autenticado.' }, { status: 401 })
    }

    const sessions = await prisma.coachSession.findMany({
      where:   { user_id: user.id },
      orderBy: { started_at: 'desc' },
      take:    20,
      select: {
        id:         true,
        type:       true,
        status:     true,
        notes_enc:  true,
        started_at: true,
        ended_at:   true,
      },
    })

    // Descifrar notas — nunca se expone el campo cifrado
    const result = sessions.map(s => ({
      id:         s.id,
      type:       s.type,
      status:     s.status,
      notes:      s.notes_enc ? safeDecrypt(s.notes_enc) : undefined,
      started_at: s.started_at,
      ended_at:   s.ended_at,
    }))

    return NextResponse.json({ ok: true, data: result })
  } catch (err) {
    console.error('[coach/sessions GET]', err)
    return NextResponse.json({ ok: false, error: 'Error interno.' }, { status: 500 })
  }
}

// ─── POST ─────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ ok: false, error: 'No autenticado.' }, { status: 401 })
    }

    const body  = await req.json()
    const type  = body.type === 'human' ? 'human' : 'virtual'
    const notes = typeof body.notes === 'string' ? body.notes.slice(0, 500) : undefined

    const session = await prisma.coachSession.create({
      data: {
        user_id:   user.id,
        type,
        status:    'pending',
        notes_enc: notes ? encryptText(notes) : undefined,
      },
    })

    return NextResponse.json({
      ok:   true,
      data: {
        id:         session.id,
        type:       session.type,
        status:     session.status,
        started_at: session.started_at,
      },
    })
  } catch (err) {
    console.error('[coach/sessions POST]', err)
    return NextResponse.json({ ok: false, error: 'Error interno.' }, { status: 500 })
  }
}

function safeDecrypt(payload: string): string | undefined {
  try { return decryptText(payload) } catch { return undefined }
}
