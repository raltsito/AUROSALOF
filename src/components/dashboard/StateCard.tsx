import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import styles from './StateCard.module.css'
import { EmotionalLog } from '@/types'

interface Props {
  log?: EmotionalLog
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('es-MX', {
    hour:   '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(date))
}

function formatDate(date: Date): string {
  const d = new Date(date)
  const now = new Date()
  const isToday = d.toDateString() === now.toDateString()
  if (isToday) return `hoy a las ${formatTime(d)}`
  return new Intl.DateTimeFormat('es-MX', {
    weekday: 'short',
    day:     'numeric',
    month:   'short',
  }).format(d)
}

export function StateCard({ log }: Props) {
  if (!log) {
    return (
      <Link href="/checkin" className={styles.ctaCard}>
        <div className={styles.ctaContent}>
          <div className={styles.ctaIcon} aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </div>
          <div>
            <p className={styles.ctaTitle}>Registra tu primer estado</p>
            <p className={styles.ctaSub}>Toma menos de 5 segundos</p>
          </div>
        </div>
      </Link>
    )
  }

  const arousalPct = ((log.arousal - 1) / 9) * 100
  const valencePct = ((log.valence - 1) / 9) * 100

  return (
    <Card className={styles.card}>
      <p className={styles.timestamp}>Ultimo estado — {formatDate(log.timestamp)}</p>

      <div className={styles.bars}>
        <div className={styles.bar}>
          <span className={styles.barLabel}>Energia</span>
          <div className={styles.barTrack} role="progressbar" aria-valuenow={log.arousal} aria-valuemin={1} aria-valuemax={10}>
            <div className={styles.barFill} style={{ width: `${arousalPct}%` }} />
          </div>
          <span className={styles.barValue}>{log.arousal.toFixed(1)}</span>
        </div>
        <div className={styles.bar}>
          <span className={styles.barLabel}>Agrado</span>
          <div className={styles.barTrack} role="progressbar" aria-valuenow={log.valence} aria-valuemin={1} aria-valuemax={10}>
            <div className={`${styles.barFill} ${styles.barFillAlt}`} style={{ width: `${valencePct}%` }} />
          </div>
          <span className={styles.barValue}>{log.valence.toFixed(1)}</span>
        </div>
      </div>

      <Link href="/checkin" className={styles.checkinLink}>
        Nuevo registro
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="9,18 15,12 9,6" />
        </svg>
      </Link>
    </Card>
  )
}
