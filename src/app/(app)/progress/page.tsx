// Progreso — ARUOSAL (MOCKUP presentacion)

import { Sparkline }       from '@/components/progress/Sparkline'
import { ZoneTimeSummary } from '@/components/progress/ZoneTimeSummary'
import styles from './progress.module.css'
import React from 'react'

// MOCKUP — 7 dias de datos
const MOCK_SPARKLINE = [
  { date: '2026-03-17', has_data: true,  avg_arousal: 5.8, avg_valence: 6.2, dominant_zone: 'green'  as const },
  { date: '2026-03-18', has_data: true,  avg_arousal: 6.4, avg_valence: 5.9, dominant_zone: 'green'  as const },
  { date: '2026-03-19', has_data: false, avg_arousal: null, avg_valence: null, dominant_zone: null },
  { date: '2026-03-20', has_data: true,  avg_arousal: 7.8, avg_valence: 4.1, dominant_zone: 'yellow' as const },
  { date: '2026-03-21', has_data: true,  avg_arousal: 6.9, avg_valence: 6.5, dominant_zone: 'green'  as const },
  { date: '2026-03-22', has_data: true,  avg_arousal: 6.2, avg_valence: 7.1, dominant_zone: 'green'  as const },
  { date: '2026-03-23', has_data: true,  avg_arousal: 7.2, avg_valence: 6.8, dominant_zone: 'green'  as const },
]

const MOCK_INSIGHTS = {
  trend:             'improving' as const,
  percent_green:     74,
  percent_yellow:    18,
  percent_red:       8,
  checkin_count:     6,
  checkin_streak:    3,
  persistence_alert: false,
  summary_copy:      'Esta semana has estado mayormente dentro de tu zona habitual. Tus niveles de energia y agrado muestran una tendencia positiva. Sigue asi.',
}

const trendLabel = {
  improving: {
    text: 'Mejorando',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18,15 12,9 6,15" />
      </svg>
    ),
  },
}

export default function ProgressPage() {
  const trend = trendLabel.improving

  return (
    <>
      <header className={styles.header}>
        <div>
          <p className={styles.greeting}>Tu semana,</p>
          <h1 className={styles.name}>Sofia.</h1>
        </div>
        <div className={[styles.trendBadge, styles['trend_improving']].join(' ')} aria-label="Tendencia: Mejorando">
          <span aria-hidden="true">{trend.icon}</span>
          <span>{trend.text}</span>
        </div>
      </header>

      <section aria-labelledby="sparkline-heading" className={`${styles.card} anim-fade-up`}>
        <h2 id="sparkline-heading" className={styles.cardTitle}>Energia — ultimos 7 dias</h2>
        <p className={styles.cardSubtitle}>Nivel promedio de activacion por dia</p>
        <div className={styles.sparklineWrap}>
          <Sparkline data={MOCK_SPARKLINE} width={300} height={72} />
        </div>
        <div className={styles.sparklineLegend} aria-hidden="true">
          <span className={styles.legendDot} style={{ background: 'var(--state-green)' }} /> Zona verde
          <span className={styles.legendDot} style={{ background: 'var(--state-yellow)' }} /> Amarilla
          <span className={styles.legendDot} style={{ background: 'var(--state-red)' }} /> Roja
        </div>
      </section>

      <section aria-label="Metricas de la semana" className={styles.metrics}>
        <div className={`${styles.metricCard} anim-fade-up`}>
          <div className={styles.metricValue}>{MOCK_INSIGHTS.checkin_count}</div>
          <div className={styles.metricLabel}>check-ins esta semana</div>
          <div className={styles.metricSub}>de 7 dias posibles</div>
        </div>
        <div className={`${styles.metricCard} anim-fade-up`}>
          <div className={[styles.metricValue, styles.metricValueGreen].join(' ')}>
            {MOCK_INSIGHTS.percent_green}%
          </div>
          <div className={styles.metricLabel}>en zona verde</div>
          <div className={styles.metricSub}>3 dias seguidos</div>
        </div>
      </section>

      <section aria-labelledby="zone-dist-heading" className={`${styles.card} anim-fade-up`}>
        <h2 id="zone-dist-heading" className={styles.cardTitle}>Distribucion de zona</h2>
        <ZoneTimeSummary
          percentGreen={MOCK_INSIGHTS.percent_green}
          percentYellow={MOCK_INSIGHTS.percent_yellow}
          percentRed={MOCK_INSIGHTS.percent_red}
          totalCheckins={MOCK_INSIGHTS.checkin_count}
        />
      </section>

      <section aria-label="Resumen de tu semana" className={`${styles.insightCard} anim-fade-up`}>
        <div className={styles.insightIcon} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        </div>
        <p className={styles.insightText}>{MOCK_INSIGHTS.summary_copy}</p>
      </section>

      <p className={styles.modelNote}>
        Tu zona habitual se basa en 31 registros. Tu zona esta personalizada para ti.
      </p>

      <p className={styles.crisis}>
        Si sientes una crisis:{' '}
        <a href="tel:8009112000" className={styles.crisisLink}>Linea de la Vida 800 911 2000</a>
        {' '}(gratuita, 24/7)
      </p>
    </>
  )
}
