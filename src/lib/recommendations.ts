import { Recommendation, ZoneStatus, Quadrant, QuadrantValue } from '@/types'
import { getQuadrant } from './zone'

// ─── Biblioteca de intervenciones ────────────────────────────────────────────

export const LIBRARY: Recommendation[] = [
  // Q1 — Alta energia + poco agrado (estres, tension, ansiedad)
  {
    id:           'breathing-478',
    title:        'Respiracion 4-7-8',
    description:  'Inhala 4 seg, sostén 7, exhala 8. Tres ciclos. Regula el sistema nervioso en 2 minutos.',
    duration_min: 2,
    type:         'breathing',
    quadrant:     'Q1',
    urgency:      'green',
  },
  {
    id:           'box-breathing',
    title:        'Respiracion cuadrada',
    description:  'Inhala 4, sostén 4, exhala 4, sostén 4. Cuatro ciclos completos. Reduce la activacion.',
    duration_min: 4,
    type:         'breathing',
    quadrant:     'Q1',
    urgency:      'yellow',
  },
  {
    id:           'walk-brief',
    title:        'Caminata de 3 minutos',
    description:  'Sal un momento. Camina despacio, pon atencion en tus pasos, no en tus pensamientos.',
    duration_min: 3,
    type:         'movement',
    quadrant:     'Q1',
    urgency:      'yellow',
  },
  {
    id:           'pmr-express',
    title:        'Relajacion muscular progresiva',
    description:  'Tensa y suelta: hombros, manos, piernas. 5 minutos para liberar la tension fisica acumulada.',
    duration_min: 5,
    type:         'mindfulness',
    quadrant:     'Q1',
    urgency:      'red',
  },
  // Q3 — Baja energia + poco agrado (agotamiento, desmotivacion)
  {
    id:           'postural-reset',
    title:        'Reactivacion postural',
    description:  'Parate, estira los brazos arriba, respira profundo 3 veces. El cuerpo activa la mente.',
    duration_min: 1,
    type:         'movement',
    quadrant:     'Q3',
    urgency:      'green',
  },
  {
    id:           'two-minute-rule',
    title:        'Tecnica de los 2 minutos',
    description:  'Elige la tarea mas pequena posible y hazla ahora. Solo el primer paso cuenta.',
    duration_min: 2,
    type:         'cognitive',
    quadrant:     'Q3',
    urgency:      'yellow',
  },
  {
    id:           'micro-challenge',
    title:        'Micro reto cognitivo',
    description:  'Cuenta de 100 hacia atras de 7 en 7, o nombra 5 cosas que puedes ver ahora. Activa el cerebro.',
    duration_min: 2,
    type:         'cognitive',
    quadrant:     'Q3',
    urgency:      'yellow',
  },
  {
    id:           'stimulating-breath',
    title:        'Respiracion estimulante',
    description:  'Inhala y exhala rapidamente por la nariz durante 20 segundos. Aumenta el estado de alerta.',
    duration_min: 1,
    type:         'breathing',
    quadrant:     'Q3',
    urgency:      'green',
  },
  // Q2 — Alta energia + mucho agrado (flujo, entusiasmo)
  {
    id:           'hydration-reminder',
    title:        'Recuerda hidratarte',
    description:  'Cuando la energia es alta solemos olvidar lo basico. Toma agua y sigue con fuerza.',
    duration_min: 1,
    type:         'mindfulness',
    quadrant:     'Q2',
    urgency:      'yellow',
  },
  {
    id:           'burnout-prevention',
    title:        'Pausa preventiva en 1 hora',
    description:  'La alta energia es valiosa. Programa una pausa breve en la siguiente hora para sostenerla.',
    duration_min: 1,
    type:         'mindfulness',
    quadrant:     'Q2',
    urgency:      'red',
  },
  // Q4 — Baja energia + mucho agrado (calma, descanso)
  {
    id:           'celebrate-calm',
    title:        'Momento de calma merecida',
    description:  'Estas en un estado tranquilo y positivo. Eso es valioso. Si es inicio de turno, una respiracion estimulante puede ayudarte.',
    duration_min: 1,
    type:         'mindfulness',
    quadrant:     'Q4',
    urgency:      'green',
  },
  // Escalamiento — coach
  {
    id:           'coach-chat',
    title:        'Habla con tu coach ahora',
    description:  'Cuando el estado se mantiene intenso, una conversacion breve puede hacer la diferencia. Tu coach esta disponible.',
    duration_min: 0,
    type:         'coach',
    quadrant:     'all',
    urgency:      'red',
  },
]

// ─── Motor de recomendaciones (rule-based) ────────────────────────────────────

export function getRecommendations(
  value:      QuadrantValue,
  zoneStatus: ZoneStatus,
  limit:      number = 3
): Recommendation[] {
  const quadrant = getQuadrant(value)

  const coachRecs = zoneStatus === 'red'
    ? LIBRARY.filter(r => r.type === 'coach')
    : []

  const matching = LIBRARY.filter(r => {
    if (r.type === 'coach') return false
    if (r.quadrant !== quadrant && r.quadrant !== 'all') return false
    if (zoneStatus === 'green'  && r.urgency !== 'green')  return false
    if (zoneStatus === 'yellow' && r.urgency === 'red')    return false
    return true
  })

  // Leve aleatorizacion para variedad
  const shuffled = [...matching].sort(() => Math.random() - 0.45)

  return [...coachRecs, ...shuffled].slice(0, limit)
}

export function getPersistenceMessage(daysInExtreme: number): string | null {
  if (daysInExtreme < 3) return null
  return `Hemos notado algo en tu historial. En los ultimos ${daysInExtreme} dias tu estado ha estado fuera de tu zona habitual con frecuencia. Eso no significa que algo este mal, pero si lo sientes oportuno, hablar con alguien puede ayudar.`
}
