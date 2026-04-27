// GET /api/progress — ARUOSAL Sprint 2
// Retorna métricas de progreso personal: distribución de zona, tendencia,
// racha de check-ins, sparkline de 7 días e insights empáticos.
// Toda la información es del propio usuario autenticado.

import { NextRequest, NextResponse } from 'next/server'
import { prisma }                    from '@/lib/db'
import { getCurrentUser }            from '@/lib/auth'
import { calculateInsights }         from '@/lib/insights'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ ok: false, error: 'No autenticado.' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const windowDays = Math.min(Number(searchParams.get('days') ?? 7), 30)

    // Obtener logs de los últimos 30 días (margen para calcular racha correctamente)
    const since = new Date(Date.now() - 30 * 86_400_000)
    const logs  = await prisma.emotionalLog.findMany({
      where:   { user_id: user.id, timestamp: { gte: since } },
      orderBy: { timestamp: 'desc' },
      select:  { arousal: true, valence: true, zone: true, timestamp: true },
    })

    const typedLogs = logs.map(l => ({
      ...l,
      zone: l.zone as 'green' | 'yellow' | 'red',
    }))

    const insights = calculateInsights(typedLogs, windowDays)

    // ─── Sparkline data (7 días, agrupado por día) ─────────────────
    // Retornar el promedio de arousal y valence por día para trazar la línea
    const cutoff = new Date(Date.now() - windowDays * 86_400_000)
    const window = typedLogs.filter(l => new Date(l.timestamp) >= cutoff)

    const byDay = new Map<string, { arousal: number[]; valence: number[]; zones: string[] }>()
    for (const log of window) {
      const day = new Date(log.timestamp).toISOString().slice(0, 10)
      if (!byDay.has(day)) byDay.set(day, { arousal: [], valence: [], zones: [] })
      const d = byDay.get(day)!
      d.arousal.push(log.arousal)
      d.valence.push(log.valence)
      d.zones.push(log.zone)
    }

    // Generar todos los días de la ventana (con o sin datos)
    const sparkline = Array.from({ length: windowDays }, (_, i) => {
      const d = new Date(Date.now() - (windowDays - 1 - i) * 86_400_000)
      const key = d.toISOString().slice(0, 10)
      const entry = byDay.get(key)
      if (!entry || entry.arousal.length === 0) {
        return { date: key, has_data: false, avg_arousal: null, avg_valence: null, dominant_zone: null }
      }
      const avg = (arr: number[]) => Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10
      const zonePriority: Record<string, number> = { red: 3, yellow: 2, green: 1 }
      const dominant = entry.zones.reduce((a, b) => zonePriority[b] > zonePriority[a] ? b : a)
      return {
        date:         key,
        has_data:     true,
        avg_arousal:  avg(entry.arousal),
        avg_valence:  avg(entry.valence),
        dominant_zone: dominant,
      }
    })

    // ─── Zona del perfil actual ────────────────────────────────────
    const zoneProfile = await prisma.zoneProfile.findUnique({
      where:  { user_id: user.id },
      select: { sample_count: true, last_updated: true },
    })

    return NextResponse.json({
      ok: true,
      data: {
        insights,
        sparkline,
        zone_profile: zoneProfile
          ? { sample_count: zoneProfile.sample_count, last_updated: zoneProfile.last_updated }
          : null,
        window_days: windowDays,
      },
    })
  } catch (err) {
    console.error('[progress]', err)
    return NextResponse.json({ ok: false, error: 'Error interno.' }, { status: 500 })
  }
}
