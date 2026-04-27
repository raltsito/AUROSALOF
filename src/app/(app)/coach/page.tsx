'use client'

import { useState, useEffect, useCallback } from 'react'
import { CoachOption }    from '@/components/coach/CoachOption'
import { SessionHistory } from '@/components/coach/SessionHistory'
import { CoachSessionType } from '@/types'
import styles from './coach.module.css'

type SessionRow = {
  id:         string
  type:       'virtual' | 'human'
  status:     'pending' | 'active' | 'completed' | 'cancelled'
  started_at: string
  ended_at:   string | null
}

export default function CoachPage() {
  const [sessions,  setSessions]  = useState<SessionRow[]>([])
  const [loading,   setLoading]   = useState(true)
  const [creating,  setCreating]  = useState<CoachSessionType | null>(null)

  const loadSessions = useCallback(async () => {
    setLoading(true)
    try {
      const res  = await fetch('/api/coach/sessions')
      const json = await res.json()
      if (json.ok) setSessions(json.data)
    } catch { /* conexion fallida — no interrumpir UX */ }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { loadSessions() }, [loadSessions])

  async function handleSelect(type: CoachSessionType) {
    setCreating(type)
    try {
      const res  = await fetch('/api/coach/sessions', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ type }),
      })
      const json = await res.json()
      if (json.ok) await loadSessions()
    } catch { /* ignorar error de red */ }
    finally { setCreating(null) }
  }

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Apoyo disponible</h1>
        <p className={styles.subtitle}>
          Aqui cuando lo necesites. Sin prisa, sin juicios.
        </p>
      </header>

      <section aria-label="Opciones de apoyo" className={styles.options}>
        <CoachOption
          type="virtual"
          urgency="green"
          onSelect={() => handleSelect('virtual')}
          isLoading={creating === 'virtual'}
        />
        <CoachOption
          type="human"
          urgency="green"
          onSelect={() => handleSelect('human')}
          isLoading={creating === 'human'}
        />
      </section>

      <section aria-labelledby="when-heading" className={`${styles.card} anim-fade-up`}>
        <h2 id="when-heading" className={styles.cardTitle}>Como elegir</h2>
        <div className={styles.guideList}>
          <div className={styles.guideItem}>
            <div className={styles.guideIcon} aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
              </svg>
            </div>
            <p className={styles.guideText}>
              <strong>Tecnica rapida</strong> — cuando tienes 2–5 minutos y quieres reencuadrarte en el momento.
            </p>
          </div>
          <div className={styles.guideItem}>
            <div className={styles.guideIcon} aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
              </svg>
            </div>
            <p className={styles.guideText}>
              <strong>Coach humano</strong> — cuando quieres hablar con alguien, procesar algo mas profundo o llevas varios dias de alta intensidad.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="history-heading" className={`${styles.card} anim-fade-up`}>
        <h2 id="history-heading" className={styles.cardTitle}>Historial reciente</h2>
        {loading ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Cargando...</p>
        ) : (
          <SessionHistory sessions={sessions} />
        )}
      </section>

      <section aria-labelledby="pro-heading" className={`${styles.proCard} anim-fade-up`}>
        <div className={styles.proIcon} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.63 19.79 19.79 0 01.12 2.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
        </div>
        <div>
          <h2 id="pro-heading" className={styles.proTitle}>Atencion psicologica</h2>
          <p className={styles.proText}>
            Si lo sientes oportuno, hablar con un psicologo puede ser un paso valioso.
            Esta app complementa, pero no reemplaza, la atencion profesional.
          </p>
          <a href="tel:8009112000" className={styles.proLink}>
            Linea de la Vida — 800 911 2000 (gratuita, 24/7)
          </a>
        </div>
      </section>

      <p className={styles.disclaimer}>
        El apoyo disponible en esta app complementa, pero no sustituye, atencion clinica o medica.
        Si estas en crisis, llama a la Linea de la Vida: 800 911 2000.
      </p>
    </>
  )
}
