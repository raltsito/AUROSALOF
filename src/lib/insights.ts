// Motor de insights — ARUOSAL Sprint 2
// Calcula métricas de progreso personal a partir del historial de check-ins.
// Diseñado para ser explicable: cada métrica tiene una fórmula documentada.
// Sprint 3: ampliar con actualización Bayesiana y detección de deriva.

import { ZoneStatus, Quadrant } from '@/types'

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface LogLite {
  arousal:   number
  valence:   number
  zone:      ZoneStatus
  timestamp: Date | string
}

export type InsightTrend = 'improving' | 'stable' | 'declining' | 'insufficient_data'

export interface UserInsights {
  /** Tendencia de la semana comparando primera vs segunda mitad */
  trend:             InsightTrend
  /** Cuadrante más frecuente en la ventana analizada */
  dominant_quadrant: Quadrant | null
  /** % de check-ins en zona verde (0–100) */
  percent_green:     number
  /** % de check-ins en zona amarilla (0–100) */
  percent_yellow:    number
  /** % de check-ins en zona roja (0–100) */
  percent_red:       number
  /** Días consecutivos con al menos un check-in (racha actual) */
  checkin_streak:    number
  /** Número de check-ins en la ventana de análisis */
  checkin_count:     number
  /** Alerta de persistencia: 3+ días consecutivos fuera de zona verde */
  persistence_alert: boolean
  /** Conteo de check-ins en zona roja en la ventana */
  extremes_count:    number
  /** Texto empático generado para la pantalla de progreso */
  summary_copy:      string
}

// ─── Motor principal ──────────────────────────────────────────────────────────

/**
 * Calcula insights a partir de un array de logs ordenados DESC (más reciente primero).
 * windowDays: ventana de análisis (default 7 días).
 */
export function calculateInsights(logs: LogLite[], windowDays = 7): UserInsights {
  if (logs.length === 0) return emptyInsights()

  const now    = new Date()
  const cutoff = new Date(now.getTime() - windowDays * 86_400_000)
  const recent = logs.filter(l => new Date(l.timestamp) >= cutoff)

  // ─── Distribución de zonas ─────────────────────────────────────
  const total   = recent.length
  const greens  = recent.filter(l => l.zone === 'green').length
  const yellows = recent.filter(l => l.zone === 'yellow').length
  const reds    = recent.filter(l => l.zone === 'red').length

  const pctGreen  = total ? Math.round((greens  / total) * 100) : 0
  const pctYellow = total ? Math.round((yellows / total) * 100) : 0
  const pctRed    = total ? Math.round((reds    / total) * 100) : 0

  // ─── Tendencia: primera vs segunda mitad de la ventana ─────────
  // Score: green=1, yellow=0.5, red=0 → promedio más alto = mejor
  const midpoint = new Date(now.getTime() - (windowDays / 2) * 86_400_000)
  const older    = recent.filter(l => new Date(l.timestamp) < midpoint)
  const newer    = recent.filter(l => new Date(l.timestamp) >= midpoint)

  let trend: InsightTrend = 'insufficient_data'
  if (older.length >= 2 && newer.length >= 2) {
    const delta = avgZoneScore(newer) - avgZoneScore(older)
    trend = delta > 0.15 ? 'improving' : delta < -0.15 ? 'declining' : 'stable'
  } else if (total >= 3) {
    trend = 'stable'
  }

  // ─── Cuadrante dominante ───────────────────────────────────────
  const qCounts: Partial<Record<Quadrant, number>> = {}
  for (const log of recent) {
    const q = inferQuadrant(log.arousal, log.valence)
    qCounts[q] = (qCounts[q] ?? 0) + 1
  }
  const dominant = (
    Object.entries(qCounts).sort(([, a], [, b]) => b - a)[0]?.[0] as Quadrant
  ) ?? null

  // ─── Racha de días consecutivos ────────────────────────────────
  const streak = calcStreak(logs)

  // ─── Alerta de persistencia ────────────────────────────────────
  const persistence = calcPersistenceAlert(logs)

  // ─── Copy empático ─────────────────────────────────────────────
  const copy = buildSummaryCopy({ trend, pctGreen, streak, persistence, total, pctRed })

  return {
    trend,
    dominant_quadrant: dominant,
    percent_green:     pctGreen,
    percent_yellow:    pctYellow,
    percent_red:       pctRed,
    checkin_streak:    streak,
    checkin_count:     total,
    persistence_alert: persistence,
    extremes_count:    reds,
    summary_copy:      copy,
  }
}

// ─── Helpers internos ─────────────────────────────────────────────────────────

function avgZoneScore(logs: LogLite[]): number {
  if (logs.length === 0) return 0
  const map: Record<ZoneStatus, number> = { green: 1, yellow: 0.5, red: 0 }
  return logs.reduce((acc, l) => acc + map[l.zone as ZoneStatus], 0) / logs.length
}

function inferQuadrant(arousal: number, valence: number): Quadrant {
  // Umbral 5.5 (mitad de escala 1–10)
  if (arousal >= 5.5 && valence <  5.5) return 'Q1' // Alta energía, bajo agrado
  if (arousal >= 5.5 && valence >= 5.5) return 'Q2' // Alta energía, alto agrado
  if (arousal <  5.5 && valence <  5.5) return 'Q3' // Baja energía, bajo agrado
  return 'Q4'                                        // Baja energía, alto agrado
}

/**
 * Racha: días consecutivos desde hoy hacia atrás con al menos un check-in.
 * Máximo 30 días de búsqueda hacia atrás.
 */
function calcStreak(logs: LogLite[]): number {
  if (logs.length === 0) return 0
  const days = new Set(logs.map(l => toDateStr(new Date(l.timestamp))))
  const today = new Date()
  let streak = 0
  for (let i = 0; i < 30; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    if (days.has(toDateStr(d))) streak++
    else break
  }
  return streak
}

/**
 * Persistencia: 3 o más días consecutivos recientes con todos los check-ins fuera de verde.
 * Día a día — si en un día hubo al menos un check-in verde, la racha se rompe.
 */
function calcPersistenceAlert(logs: LogLite[]): boolean {
  // Agrupar por día (más reciente primero)
  const byDay = new Map<string, ZoneStatus[]>()
  for (const log of logs) {
    const day = toDateStr(new Date(log.timestamp))
    if (!byDay.has(day)) byDay.set(day, [])
    byDay.get(day)!.push(log.zone as ZoneStatus)
  }
  const days = [...byDay.entries()].sort(([a], [b]) => b.localeCompare(a))

  let consecutive = 0
  for (const [, zones] of days) {
    const allNonGreen = zones.every(z => z !== 'green')
    if (allNonGreen) consecutive++
    else break
  }
  return consecutive >= 3
}

function toDateStr(d: Date): string {
  return d.toISOString().slice(0, 10) // YYYY-MM-DD
}

// ─── Copy empático ────────────────────────────────────────────────────────────

function buildSummaryCopy(opts: {
  trend:       InsightTrend
  pctGreen:    number
  pctRed:      number
  streak:      number
  persistence: boolean
  total:       number
}): string {
  const { trend, pctGreen, streak, persistence, total } = opts

  if (total === 0) {
    return 'Todavia no hay registros esta semana. Cada check-in es un paso hacia conocerte mejor.'
  }

  if (persistence) {
    return 'Has tenido algunos dias de mayor intensidad. Si lo sientes oportuno, el modulo de apoyo esta disponible para ti cuando quieras.'
  }

  if (trend === 'improving' && pctGreen >= 60) {
    if (streak >= 3) {
      return `Llevas ${streak} dias seguidos registrando tu estado. Tu energia ha ido encontrando su ritmo. Eso es una buena senal.`
    }
    return 'Tu estado ha ido mejorando a lo largo de la semana. Cada registro cuenta.'
  }

  if (trend === 'stable' && pctGreen >= 70) {
    return 'Tu zona habitual se ha mantenido estable esta semana. Conocer tu propio ritmo es la base del bienestar.'
  }

  if (trend === 'declining') {
    return 'Esta semana ha tenido momentos de mayor esfuerzo. Es completamente normal que los niveles fluctuen. Aqui estamos si necesitas apoyo.'
  }

  if (streak >= 5) {
    return `${streak} dias seguidos registrando. Ese habito es tuyo y nadie mas lo puede ver.`
  }

  return 'Cada registro que haces te ayuda a entender mejor tu propio ritmo. Sigue a tu paso.'
}

// ─── Estado vacío ─────────────────────────────────────────────────────────────

function emptyInsights(): UserInsights {
  return {
    trend:             'insufficient_data',
    dominant_quadrant: null,
    percent_green:     0,
    percent_yellow:    0,
    percent_red:       0,
    checkin_streak:    0,
    checkin_count:     0,
    persistence_alert: false,
    extremes_count:    0,
    summary_copy:      'Todavia no hay registros esta semana. Cada check-in es un paso hacia conocerte mejor.',
  }
}
