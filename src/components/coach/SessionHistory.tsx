'use client'

// SessionHistory — ARUOSAL Sprint 2
// Muestra las últimas sesiones con coach del usuario.
// No expone notas al listado; solo tipo, estado y fecha.

import styles from './SessionHistory.module.css'

interface Session {
  id:         string
  type:       'virtual' | 'human'
  status:     'pending' | 'active' | 'completed' | 'cancelled'
  started_at: string | Date
  ended_at?:  string | Date | null
}

interface SessionHistoryProps {
  sessions: Session[]
}

const TYPE_LABEL: Record<string, string> = {
  virtual: 'Tecnica virtual',
  human:   'Sesion con coach',
}

const STATUS_LABEL: Record<string, string> = {
  pending:   'Pendiente',
  active:    'En curso',
  completed: 'Completada',
  cancelled: 'Cancelada',
}

const STATUS_DOT: Record<string, string> = {
  pending:   'dotPending',
  active:    'dotActive',
  completed: 'dotDone',
  cancelled: 'dotCancelled',
}

const DAY_SHORT = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa']
const MONTH_SHORT = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

function formatDate(d: string | Date): string {
  const date = new Date(d)
  return `${DAY_SHORT[date.getDay()]} ${date.getDate()} ${MONTH_SHORT[date.getMonth()]}`
}

export function SessionHistory({ sessions }: SessionHistoryProps) {
  if (sessions.length === 0) {
    return (
      <p className={styles.empty}>
        Todavia no has iniciado ninguna sesion de apoyo.
      </p>
    )
  }

  return (
    <ul className={styles.list} aria-label="Historial de sesiones">
      {sessions.map(s => (
        <li key={s.id} className={styles.item}>
          <div className={styles.itemLeft}>
            <span className={[styles.dot, styles[STATUS_DOT[s.status]]].join(' ')} aria-hidden="true" />
            <div>
              <p className={styles.typeLabel}>{TYPE_LABEL[s.type] ?? s.type}</p>
              <p className={styles.statusLabel}>{STATUS_LABEL[s.status] ?? s.status}</p>
            </div>
          </div>
          <time
            dateTime={new Date(s.started_at).toISOString()}
            className={styles.date}
          >
            {formatDate(s.started_at)}
          </time>
        </li>
      ))}
    </ul>
  )
}
