'use client'

import styles from './RecommendationCard.module.css'
import { Recommendation } from '@/types'

const TYPE_ICON: Record<string, React.ReactNode> = {
  breathing: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22a8 8 0 01-8-8c0-3.5 1.5-5 3-6.5S9 5.5 9 3a6 6 0 016 6c0 2-1 3-2 4s-2 2-2 4a3 3 0 003 3" />
      <path d="M20 8c0 4-4 6-4 10" />
    </svg>
  ),
  movement: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13" cy="4" r="1" />
      <path d="M7 21l3-6 2 2 2-4 3 8" />
      <path d="M12 11l-2-4 5 1 2 3h-3" />
    </svg>
  ),
  mindfulness: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 00-6.88 17.25" />
      <path d="M12 2a10 10 0 016.88 17.25" />
      <path d="M12 12a3 3 0 100-6 3 3 0 000 6z" />
      <path d="M12 12v10" />
    </svg>
  ),
  cognitive: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-4.96-.44 2.5 2.5 0 01-2.96-3.08 3 3 0 01-.34-5.58 2.5 2.5 0 013.76-3.4z" />
      <path d="M14.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 004.96-.44 2.5 2.5 0 002.96-3.08 3 3 0 00.34-5.58 2.5 2.5 0 00-3.76-3.4z" />
    </svg>
  ),
  coach: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
}

const DEFAULT_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

interface Props {
  rec:       Recommendation
  onStart?:  (rec: Recommendation) => void
}

export function RecommendationCard({ rec, onStart }: Props) {
  const isCoach = rec.type === 'coach'

  return (
    <div className={`${styles.card} ${isCoach ? styles.coach : ''}`}>
      <div className={styles.header}>
        <span className={styles.icon} aria-hidden="true">
          {TYPE_ICON[rec.type] ?? DEFAULT_ICON}
        </span>
        <div className={styles.meta}>
          <p className={styles.title}>{rec.title}</p>
          {rec.duration_min > 0 && (
            <p className={styles.duration}>{rec.duration_min} min</p>
          )}
        </div>
      </div>

      <p className={styles.description}>{rec.description}</p>

      <div className={styles.actions}>
        {onStart && !isCoach && (
          <button className={styles.btnStart} onClick={() => onStart(rec)}>
            Comenzar
          </button>
        )}
        {isCoach && (
          <button className={`${styles.btnStart} ${styles.btnCoach}`} onClick={() => onStart?.(rec)}>
            Hablar con mi coach
          </button>
        )}
      </div>
    </div>
  )
}
