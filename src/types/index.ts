// Tipos centrales — ARUOSAL Sprint 2

// ─── Dominio emocional ────────────────────────────────────────────────────────

export interface QuadrantValue {
  arousal: number // 1–10 (eje Y: baja=1, alta=10)
  valence: number // 1–10 (eje X: poco agrado=1, mucho agrado=10)
}

export type ZoneStatus = 'green' | 'yellow' | 'red'
export type Quadrant   = 'Q1' | 'Q2' | 'Q3' | 'Q4'
export type Theme      = 'calm' | 'intra'

export interface ZoneProfile {
  center:       QuadrantValue
  sigma:        QuadrantValue
  sample_count: number
  last_updated: Date
}

export interface EmotionalLog {
  id:        string
  user_id:   string
  arousal:   number
  valence:   number
  zone:      ZoneStatus
  quadrant:  Quadrant
  note?:     string   // descifrada al retornar al cliente
  timestamp: Date
}

// ─── Recomendaciones ─────────────────────────────────────────────────────────

export type RecommendationType =
  | 'breathing'
  | 'movement'
  | 'mindfulness'
  | 'cognitive'
  | 'coach'

export interface Recommendation {
  id:           string
  title:        string
  description:  string
  duration_min: number
  type:         RecommendationType
  quadrant:     Quadrant | 'all'
  urgency:      ZoneStatus
}

// ─── Consentimiento ───────────────────────────────────────────────────────────

export interface ConsentRecord {
  id:           string
  user_id:      string
  timestamp:    Date
  version:      string
  text_hash:    string
  otp_verified: boolean
  ip_address?:  string
  device_id?:   string
}

// ─── Sesión de usuario ────────────────────────────────────────────────────────

export interface UserSession {
  id:          string
  name:        string
  email:       string
  company_id:  string | null
  theme:       Theme
  has_consent: boolean
}

// ─── Insights ─────────────────────────────────────────────────────────────────

export type InsightTrend = 'improving' | 'stable' | 'declining' | 'insufficient_data'

export interface UserInsights {
  trend:             InsightTrend
  dominant_quadrant: Quadrant | null
  percent_green:     number
  percent_yellow:    number
  percent_red:       number
  checkin_streak:    number
  checkin_count:     number
  persistence_alert: boolean
  extremes_count:    number
  summary_copy:      string
}

// ─── Coach ────────────────────────────────────────────────────────────────────

export type CoachSessionType   = 'virtual' | 'human'
export type CoachSessionStatus = 'pending' | 'active' | 'completed' | 'cancelled'

export interface CoachSession {
  id:         string
  user_id:    string
  type:       CoachSessionType
  status:     CoachSessionStatus
  notes?:     string // descifradas al retornar al cliente
  started_at: Date
  ended_at?:  Date | null
}

// ─── Sparkline ────────────────────────────────────────────────────────────────

export interface SparklinePoint {
  date:          string
  has_data:      boolean
  avg_arousal:   number | null
  avg_valence:   number | null
  dominant_zone: ZoneStatus | null
}

// ─── Respuestas de API ────────────────────────────────────────────────────────

export interface ApiResponse<T = void> {
  ok:     boolean
  data?:  T
  error?: string
}

export interface CheckinResponse {
  log:              EmotionalLog
  zone_status:      ZoneStatus
  zone_label:       string
  zone_explanation: string
  recommendations:  Recommendation[]
  insights:         UserInsights
}

export interface ProgressResponse {
  insights:     UserInsights
  sparkline:    SparklinePoint[]
  zone_profile: { sample_count: number; last_updated: Date } | null
  window_days:  number
}
