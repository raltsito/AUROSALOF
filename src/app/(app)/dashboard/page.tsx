import { StateCard }          from '@/components/dashboard/StateCard'
import { ZoneIndicator }      from '@/components/dashboard/ZoneIndicator'
import { RecommendationCard } from '@/components/dashboard/RecommendationCard'
import { EmotionalLog, Recommendation } from '@/types'
import styles from './dashboard.module.css'

// MOCKUP — datos de presentacion
const MOCK_USER = { name: 'Sofia Ramirez' }

const MOCK_LOG: EmotionalLog = {
  id:        'mock-1',
  user_id:   'mock-user',
  arousal:   7.2,
  valence:   6.8,
  zone:      'green',
  quadrant:  'Q2',
  timestamp: new Date(),
}

const MOCK_RECS: Recommendation[] = [
  {
    id:           'r1',
    title:        'Respiracion 4-7-8',
    description:  'Inhala 4 segundos, retén 7 y exhala lentamente en 8. Repite 3 veces para bajar el ritmo.',
    duration_min: 3,
    type:         'breathing',
    quadrant:     'Q2',
    urgency:      'green',
  },
  {
    id:           'r2',
    title:        'Pausa activa de 5 minutos',
    description:  'Levantate, estira hombros y cuello, camina un poco. Tu cuerpo y mente lo agradecen.',
    duration_min: 5,
    type:         'movement',
    quadrant:     'all',
    urgency:      'green',
  },
]

export default function DashboardPage() {
  const firstName = MOCK_USER.name.split(' ')[0]
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Buenos dias' : hour < 18 ? 'Buenas tardes' : 'Buenas noches'

  return (
    <>
      <header className={styles.header}>
        <div>
          <p className={styles.greeting}>{greeting},</p>
          <h1 className={styles.name}>{firstName}.</h1>
        </div>
        <div className={styles.avatar} aria-hidden="true">
          {firstName[0].toUpperCase()}
        </div>
      </header>

      <section aria-labelledby="last-state-heading" className="anim-fade-up">
        <h2 id="last-state-heading" className={styles.sectionTitle}>Tu estado</h2>
        <StateCard log={MOCK_LOG} />
      </section>

      <section aria-labelledby="zone-heading" className="anim-fade-up">
        <h2 id="zone-heading" className={styles.sectionTitle}>Tu zona habitual</h2>
        <ZoneIndicator
          status="green"
          label="Dentro de tu zona habitual"
          explanation="Tu energia y agrado estan dentro de tu rango personal. Es un buen momento para mantener el ritmo."
        />
      </section>

      <section aria-labelledby="recs-heading">
        <h2 id="recs-heading" className={styles.sectionTitle}>Para ti ahora</h2>
        <div className={styles.recList}>
          {MOCK_RECS.map((rec, i) => (
            <div key={rec.id} className="anim-fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
              <RecommendationCard rec={rec} />
            </div>
          ))}
        </div>
      </section>

      <p className={styles.crisis}>
        Si sientes una crisis, llama a la Linea de la Vida:{' '}
        <a href="tel:8009112000" className={styles.crisisLink}>800 911 2000</a>
        {' '}(gratuita, 24/7)
      </p>
    </>
  )
}
