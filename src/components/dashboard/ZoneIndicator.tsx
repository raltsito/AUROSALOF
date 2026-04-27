import styles from './ZoneIndicator.module.css'
import { ZoneStatus } from '@/types'

interface Props {
  status:      ZoneStatus
  label:       string
  explanation: string
}

const ICON: Record<ZoneStatus, React.ReactNode> = {
  green: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22,4 12,14.01 9,11.01" />
    </svg>
  ),
  yellow: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  red: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
}

const LABEL: Record<ZoneStatus, string> = {
  green:  'En tu zona habitual',
  yellow: 'Ligeramente fuera de tu zona',
  red:    'Fuera de tu zona habitual',
}

export function ZoneIndicator({ status, label, explanation }: Props) {
  return (
    <div
      className={`${styles.indicator} ${styles[status]}`}
      role="status"
      aria-label={`Estado de zona: ${label}`}
    >
      <div className={styles.header}>
        <span className={styles.iconWrap} aria-hidden="true">
          {ICON[status]}
        </span>
        <span className={styles.label}>{LABEL[status]}</span>
      </div>
      <p className={styles.explanation}>{explanation}</p>
    </div>
  )
}
