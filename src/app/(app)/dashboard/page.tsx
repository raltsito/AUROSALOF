import { StateCard }          from '@/components/dashboard/StateCard'
import { ZoneIndicator }      from '@/components/dashboard/ZoneIndicator'
import { RecommendationCard } from '@/components/dashboard/RecommendationCard'
import { getCurrentUser }     from '@/lib/auth'
import { prisma }             from '@/lib/db'
import { getZoneStatus, getZoneLabel, getZoneExplanation, PRIOR } from '@/lib/zone'
import { getRecommendations } from '@/lib/recommendations'
import { ZoneProfile, ZoneStatus, Quadrant } from '@/types'
import Link from 'next/link'
import styles from './dashboard.module.css'

export default async function DashboardPage() {
  const user      = await getCurrentUser()
  const firstName = user?.name?.split(' ')[0] ?? 'tu'
  const hour      = new Date().getHours()
  const greeting  = hour < 12 ? 'Buenos dias' : hour < 18 ? 'Buenas tardes' : 'Buenas noches'

  let lastLog: { id: string; user_id: string; arousal: number; valence: number; zone: ZoneStatus; quadrant: Quadrant; timestamp: Date } | null = null
  let profile: ZoneProfile = PRIOR

  if (user) {
    const [rawLog, rawProfile] = await Promise.all([
      prisma.emotionalLog.findFirst({
        where:   { user_id: user.id },
        orderBy: { timestamp: 'desc' },
      }),
      prisma.zoneProfile.findUnique({ where: { user_id: user.id } }),
    ])

    if (rawProfile) {
      profile = {
        center:       { arousal: rawProfile.center_arousal, valence: rawProfile.center_valence },
        sigma:        { arousal: rawProfile.sigma_arousal,  valence: rawProfile.sigma_valence  },
        sample_count: rawProfile.sample_count,
        last_updated: rawProfile.last_updated,
      }
    }

    if (rawLog) {
      lastLog = {
        id:        rawLog.id,
        user_id:   rawLog.user_id,
        arousal:   rawLog.arousal,
        valence:   rawLog.valence,
        zone:      rawLog.zone     as ZoneStatus,
        quadrant:  rawLog.quadrant as Quadrant,
        timestamp: rawLog.timestamp,
      }
    }
  }

  const value      = lastLog ? { arousal: lastLog.arousal, valence: lastLog.valence } : null
  const zoneStatus = value   ? getZoneStatus(value, profile) : null
  const recs       = value && zoneStatus ? getRecommendations(value, zoneStatus).slice(0, 3) : []

  return (
    <>
      <header className={styles.header}>
        <div>
          <p className={styles.greeting}>{greeting},</p>
          <h1 className={styles.name}>{firstName}.</h1>
        </div>
        <div className={styles.avatar} aria-hidden="true">
          {firstName[0]?.toUpperCase() ?? '?'}
        </div>
      </header>

      {lastLog && zoneStatus && value ? (
        <>
          <section aria-labelledby="last-state-heading" className="anim-fade-up">
            <h2 id="last-state-heading" className={styles.sectionTitle}>Tu estado</h2>
            <StateCard log={lastLog} />
          </section>

          <section aria-labelledby="zone-heading" className="anim-fade-up">
            <h2 id="zone-heading" className={styles.sectionTitle}>Tu zona habitual</h2>
            <ZoneIndicator
              status={zoneStatus}
              label={getZoneLabel(zoneStatus)}
              explanation={getZoneExplanation(value, profile)}
            />
          </section>

          {recs.length > 0 && (
            <section aria-labelledby="recs-heading">
              <h2 id="recs-heading" className={styles.sectionTitle}>Para ti ahora</h2>
              <div className={styles.recList}>
                {recs.map((rec, i) => (
                  <div key={rec.id} className="anim-fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
                    <RecommendationCard rec={rec} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        <section
          className="anim-fade-up"
          style={{ textAlign: 'center', padding: 'var(--space-xl) 0' }}
        >
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>
            Aun no tienes ningun registro.
          </p>
          <Link
            href="/checkin"
            style={{
              display:        'inline-block',
              background:     'var(--color-primary)',
              color:          'var(--text-inverse)',
              padding:        '12px 24px',
              borderRadius:   'var(--radius-md)',
              fontWeight:     600,
              textDecoration: 'none',
            }}
          >
            Registrar mi primer estado
          </Link>
        </section>
      )}

      <p className={styles.crisis}>
        Si sientes una crisis, llama a la Linea de la Vida:{' '}
        <a href="tel:8009112000" className={styles.crisisLink}>800 911 2000</a>
        {' '}(gratuita, 24/7)
      </p>
    </>
  )
}
