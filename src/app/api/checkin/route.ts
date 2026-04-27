// POST/GET /api/checkin — ARUOSAL Sprint 2
// Sprint 2: note cifrada en reposo (AES-256-GCM), insights calculados en servidor

import { NextRequest, NextResponse }   from 'next/server'
import { prisma }                       from '@/lib/db'
import { getCurrentUser }               from '@/lib/auth'
import { encryptText, decryptText }     from '@/lib/crypto'
import { calculateInsights }            from '@/lib/insights'
import {
  getZoneStatus,
  getZoneLabel,
  getZoneExplanation,
  updateZoneProfile,
  getQuadrant,
} from '@/lib/zone'
import { getRecommendations } from '@/lib/recommendations'
import { QuadrantValue }      from '@/types'

// ─── POST — guardar check-in ──────────────────────────────────────────────────

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ ok: false, error: 'No autenticado.' }, { status: 401 })
    }

    const body    = await req.json()
    const arousal = Number(body.arousal)
    const valence = Number(body.valence)
    const noteRaw = typeof body.note === 'string' ? body.note.trim().slice(0, 200) : undefined

    if (
      isNaN(arousal) || arousal < 1 || arousal > 10 ||
      isNaN(valence) || valence < 1 || valence > 10
    ) {
      return NextResponse.json(
        { ok: false, error: 'Valores fuera de rango (1–10).' },
        { status: 400 }
      )
    }

    // Cifrar nota si existe
    const noteEncrypted = noteRaw ? encryptText(noteRaw) : undefined

    const value: QuadrantValue = { arousal, valence }

    // Perfil de zona actual
    const zoneRecord = await prisma.zoneProfile.findUnique({ where: { user_id: user.id } })
    const profile = zoneRecord
      ? {
          center:       { arousal: zoneRecord.center_arousal, valence: zoneRecord.center_valence },
          sigma:        { arousal: zoneRecord.sigma_arousal,  valence: zoneRecord.sigma_valence },
          sample_count: zoneRecord.sample_count,
          last_updated: zoneRecord.last_updated,
        }
      : undefined

    const zoneStatus = getZoneStatus(value, profile)
    const quadrant   = getQuadrant(value)

    // Guardar check-in con nota cifrada
    const log = await prisma.emotionalLog.create({
      data: {
        user_id:       user.id,
        arousal,
        valence,
        zone:          zoneStatus,
        quadrant,
        note_encrypted: noteEncrypted,
      },
    })

    // Actualizar perfil de zona (EMA)
    if (zoneRecord) {
      const updated = updateZoneProfile(profile!, value)
      await prisma.zoneProfile.update({
        where: { user_id: user.id },
        data: {
          center_arousal: updated.center.arousal,
          center_valence: updated.center.valence,
          sigma_arousal:  updated.sigma.arousal,
          sigma_valence:  updated.sigma.valence,
          sample_count:   updated.sample_count,
          last_updated:   updated.last_updated,
        },
      })
    }

    const recommendations = getRecommendations(value, zoneStatus)

    // Calcular insights con los últimos 30 días de logs
    const recentLogs = await prisma.emotionalLog.findMany({
      where:   { user_id: user.id },
      orderBy: { timestamp: 'desc' },
      take:    60,
      select:  { arousal: true, valence: true, zone: true, timestamp: true },
    })
    const insights = calculateInsights(
      recentLogs.map(l => ({ ...l, zone: l.zone as 'green' | 'yellow' | 'red' }))
    )

    return NextResponse.json({
      ok: true,
      data: {
        log: {
          id:        log.id,
          arousal:   log.arousal,
          valence:   log.valence,
          zone:      log.zone,
          quadrant:  log.quadrant,
          timestamp: log.timestamp,
        },
        zone_status:      zoneStatus,
        zone_label:       getZoneLabel(zoneStatus),
        zone_explanation: getZoneExplanation(value, profile),
        recommendations,
        insights,
      },
    })
  } catch (err) {
    console.error('[checkin POST]', err)
    return NextResponse.json({ ok: false, error: 'Error interno.' }, { status: 500 })
  }
}

// ─── GET — historial con nota descifrada ──────────────────────────────────────

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ ok: false, error: 'No autenticado.' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const limit = Math.min(Number(searchParams.get('limit') ?? 20), 100)

    const logs = await prisma.emotionalLog.findMany({
      where:   { user_id: user.id },
      orderBy: { timestamp: 'desc' },
      take:    limit,
      select: {
        id:             true,
        arousal:        true,
        valence:        true,
        zone:           true,
        quadrant:       true,
        note_encrypted: true,
        timestamp:      true,
      },
    })

    // Descifrar notas al vuelo — nunca se expone el campo cifrado al cliente
    const result = logs.map(l => ({
      id:        l.id,
      arousal:   l.arousal,
      valence:   l.valence,
      zone:      l.zone,
      quadrant:  l.quadrant,
      note:      l.note_encrypted ? safeDecrypt(l.note_encrypted) : undefined,
      timestamp: l.timestamp,
    }))

    return NextResponse.json({ ok: true, data: result })
  } catch (err) {
    console.error('[checkin GET]', err)
    return NextResponse.json({ ok: false, error: 'Error interno.' }, { status: 500 })
  }
}

function safeDecrypt(payload: string): string | undefined {
  try {
    return decryptText(payload)
  } catch {
    return undefined // No exponer error de descifrado al cliente
  }
}
