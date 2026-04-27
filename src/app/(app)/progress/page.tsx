import { Sparkline }        from '@/components/progress/Sparkline'
import { ZoneTimeSummary }  from '@/components/progress/ZoneTimeSummary'
import { getCurrentUser }   from '@/lib/auth'
import { prisma }           from '@/lib/db'
import { calculateInsights } from '@/lib/insights'
import { InsightTrend }     from '@/types'
import styles from './progress.module.css'

const TREND_LABEL: Record<InsightTrend, { text: string; icon: JSX.Element }> = {
  improving: {
    text: 'Mejorando',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18,15 12,9 6,15" />
      </svg>
    ),
  },
  stable: {
    text: 'Estable',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
  },
  declining: {
    text: 'Bajando',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6,9 12,15 18,9" />
      </svg>
    ),
  },
  insufficient_data: {
    text: 'Sin datos',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
  },
}

const TREND_CLASSES: Record<InsightTrend, string> = {
  improving:         styles.trend_improving,
  stable:            styles.trend_stable,
  declining:         styles.trend_declining,
  insufficient_data: styles.trend_insufficient_data,
}

const WINDOW_DAYS = 7

export default async function ProgressPage() {
  const user      = await getCurrentUser()
  const firstName = user?.name?.split(' ')[0] ?? 'tu'

  const since = new Date(Date.now() - 30 * 86_400_000)
  const logs  = user
    ? await prisma.emotionalLog.findMany({
        where:   { user_id: user.id, timestamp: { gte: since } },
        orderBy: { timestamp: 'desc' },
        select:  { arousal: true, valence: true, zone: true, timestamp: true },
      })
    : []

  const typedLogs = logs.map(l => ({ ...l, zone: l.zone as 'green' | 'yellow' | 'red' }))
  const insights  = calculateInsights(typedLogs, WINDOW_DAYS)
  const trend     = TREND_LABEL[insights.trend]

  // Sparkline: últimos 7 días agrupados por día
  const cutoff  = new Date(Date.now() - WINDOW_DAYS * 86_400_000)
  const window7 = typedLogs.filter(l => new Date(l.timestamp) >= cutoff)
  const byDay   = new Map<string, { arousal: number[]; valence: number[]; zones: string[] }>()
  for (const log of window7) {
    const day = new Date(log.timestamp).toISOString().slice(0, 10)
    if (!byDay.has(day)) byDay.set(day, { arousal: [], valence: [], zones: [] })
    const d = byDay.get(day)!
    d.arousal.push(log.arousal)
    d.valence.push(log.valence)
    d.zones.push(log.zone)
  }
  const sparkline = Array.from({ length: WINDOW_DAYS }, (_, i) => {
    const d     = new Date(Date.now() - (WINDOW_DAYS - 1 - i) * 86_400_000)
    const key   = d.toISOString().slice(0, 10)
    const entry = byDay.get(key)
    if (!entry || entry.arousal.length === 0) {
      return { date: key, has_data: false, avg_arousal: null, avg_valence: null, dominant_zone: null }
    }
    const avg = (arr: number[]) =>
      Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10
    const zonePriority: Record<string, number> = { red: 3, yellow: 2, green: 1 }
    const dominant = entry.zones.reduce((a, b) => zonePriority[b] > zonePriority[a] ? b : a)
    return {
      date:          key,
      has_data:      true,
      avg_arousal:   avg(entry.arousal),
      avg_valence:   avg(entry.valence),
      dominant_zone: dominant as 'green' | 'yellow' | 'red',
    }
  })

  const zoneProfile = user
    ? await prisma.zoneProfile.findUnique({
        where:  { user_id: user.id },
        select: { sample_count: true },
      })
    : null

  return (
    <>
      <header className={styles.header}>
        <div>
          <p className={styles.greeting}>Tu semana,</p>
          <h1 className={styles.name}>{firstName}.</h1>
        </div>
        <div
          className={[styles.trendBadge, TREND_CLASSES[insights.trend]].join(' ')}
          aria-label={`Tendencia: ${trend.text}`}
        >
          <span aria-hidden="true">{trend.icon}</span>
          <span>{trend.text}</span>
        </div>
      </header>

      <section aria-labelledby="sparkline-heading" className={`${styles.card} anim-fade-up`}>
        <h2 id="sparkline-heading" className={styles.cardTitle}>Energia — ultimos 7 dias</h2>
        <p className={styles.cardSubtitle}>Nivel promedio de activacion por dia</p>
        <div className={styles.sparklineWrap}>
          <Sparkline data={sparkline} width={300} height={72} />
        </div>
        <div className={styles.sparklineLegend} aria-hidden="true">
          <span className={styles.legendDot} style={{ background: 'var(--state-green)' }} /> Zona verde
          <span className={styles.legendDot} style={{ background: 'var(--state-yellow)' }} /> Amarilla
          <span className={styles.legendDot} style={{ background: 'var(--state-red)' }} /> Roja
        </div>
      </section>

      <section aria-label="Metricas de la semana" className={styles.metrics}>
        <div className={`${styles.metricCard} anim-fade-up`}>
          <div className={styles.metricValue}>{insights.checkin_count}</div>
          <div className={styles.metricLabel}>check-ins esta semana</div>
          <div className={styles.metricSub}>de {WINDOW_DAYS} dias posibles</div>
        </div>
        <div className={`${styles.metricCard} anim-fade-up`}>
          <div className={[styles.metricValue, styles.metricValueGreen].join(' ')}>
            {insights.percent_green}%
          </div>
          <div className={styles.metricLabel}>en zona verde</div>
          <div className={styles.metricSub}>
            {insights.checkin_streak > 0
              ? `${insights.checkin_streak} dias seguidos`
              : 'Sin racha activa'}
          </div>
        </div>
      </section>

      <section aria-labelledby="zone-dist-heading" className={`${styles.card} anim-fade-up`}>
        <h2 id="zone-dist-heading" className={styles.cardTitle}>Distribucion de zona</h2>
        <ZoneTimeSummary
          percentGreen={insights.percent_green}
          percentYellow={insights.percent_yellow}
          percentRed={insights.percent_red}
          totalCheckins={insights.checkin_count}
        />
      </section>

      <section aria-label="Resumen de tu semana" className={`${styles.insightCard} anim-fade-up`}>
        <div className={styles.insightIcon} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        </div>
        <p className={styles.insightText}>{insights.summary_copy}</p>
      </section>

      {zoneProfile && (
        <p className={styles.modelNote}>
          Tu zona habitual se basa en {zoneProfile.sample_count} registros. Tu zona esta personalizada para ti.
        </p>
      )}

      <p className={styles.crisis}>
        Si sientes una crisis:{' '}
        <a href="tel:8009112000" className={styles.crisisLink}>Linea de la Vida 800 911 2000</a>
        {' '}(gratuita, 24/7)
      </p>
    </>
  )
}
