import { QuadrantValue, ZoneProfile, ZoneStatus, Quadrant } from '@/types'

// ─── Prior poblacional ────────────────────────────────────────────────────────
// Aplica hasta que el usuario tenga >= MIN_SAMPLES check-ins propios.

export const PRIOR: ZoneProfile = {
  center:       { arousal: 5.2, valence: 6.1 },
  sigma:        { arousal: 1.5, valence: 1.8 },
  sample_count: 0,
  last_updated: new Date(),
}

const MIN_SAMPLES = 14  // minimo de check-ins para personalizar
const EMA_ALPHA   = 0.1 // conservador: responde lento a cambios

// ─── Clasificacion de zona ────────────────────────────────────────────────────

export function getZoneStatus(
  value:   QuadrantValue,
  profile: ZoneProfile = PRIOR
): ZoneStatus {
  const dA = Math.abs(value.arousal - profile.center.arousal) / profile.sigma.arousal
  const dV = Math.abs(value.valence - profile.center.valence) / profile.sigma.valence
  const deviation = Math.max(dA, dV)

  if (deviation <= 1) return 'green'
  if (deviation <= 2) return 'yellow'
  return 'red'
}

export function getQuadrant(value: QuadrantValue): Quadrant {
  const mid = 5.5
  if (value.arousal >= mid && value.valence <  mid) return 'Q1' // alta energia + poco agrado
  if (value.arousal >= mid && value.valence >= mid) return 'Q2' // alta energia + mucho agrado
  if (value.arousal <  mid && value.valence <  mid) return 'Q3' // baja energia + poco agrado
  return 'Q4'                                                    // baja energia + mucho agrado
}

// ─── Actualizacion del perfil (EMA) ──────────────────────────────────────────

export function updateZoneProfile(
  profile:  ZoneProfile,
  newValue: QuadrantValue
): ZoneProfile {
  const n = profile.sample_count + 1

  if (n < MIN_SAMPLES) {
    return { ...profile, sample_count: n }
  }

  const newCenter: QuadrantValue = {
    arousal: EMA_ALPHA * newValue.arousal + (1 - EMA_ALPHA) * profile.center.arousal,
    valence: EMA_ALPHA * newValue.valence + (1 - EMA_ALPHA) * profile.center.valence,
  }

  // Aproximacion de std con EMA de desviaciones cuadraticas
  const newSigma: QuadrantValue = {
    arousal: Math.sqrt(
      EMA_ALPHA * (newValue.arousal - newCenter.arousal) ** 2 +
      (1 - EMA_ALPHA) * profile.sigma.arousal ** 2
    ),
    valence: Math.sqrt(
      EMA_ALPHA * (newValue.valence - newCenter.valence) ** 2 +
      (1 - EMA_ALPHA) * profile.sigma.valence ** 2
    ),
  }

  return {
    center:       newCenter,
    sigma:        {
      arousal: clamp(newSigma.arousal, 0.5, 3.0),
      valence: clamp(newSigma.valence, 0.5, 3.0),
    },
    sample_count: n,
    last_updated: new Date(),
  }
}

// ─── Copy explicable ──────────────────────────────────────────────────────────

export function getZoneLabel(status: ZoneStatus): string {
  return {
    green:  'En tu zona habitual',
    yellow: 'Ligeramente fuera de tu zona',
    red:    'Fuera de tu zona habitual',
  }[status]
}

export function getZoneExplanation(
  value:   QuadrantValue,
  profile: ZoneProfile = PRIOR
): string {
  const { center, sigma } = profile
  const minA = (center.arousal - sigma.arousal).toFixed(1)
  const maxA = (center.arousal + sigma.arousal).toFixed(1)
  const minV = (center.valence - sigma.valence).toFixed(1)
  const maxV = (center.valence + sigma.valence).toFixed(1)

  return `Tu zona habitual esta entre ${minA}–${maxA} en energia y ${minV}–${maxV} en agrado. Hoy registraste energia ${value.arousal.toFixed(1)} y agrado ${value.valence.toFixed(1)}.`
}

export function detectDrift(
  currentProfile: ZoneProfile,
  previousCenter: QuadrantValue
): boolean {
  const threshold = 1.5
  const dA = Math.abs(currentProfile.center.arousal - previousCenter.arousal) / currentProfile.sigma.arousal
  const dV = Math.abs(currentProfile.center.valence - previousCenter.valence) / currentProfile.sigma.valence
  return Math.max(dA, dV) > threshold
}

// ─── Utils ────────────────────────────────────────────────────────────────────

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n))
}
