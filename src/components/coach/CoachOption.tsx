'use client'

// CoachOption — ARUOSAL Sprint 2
// Tarjeta de opción de apoyo: virtual o humano.
// El CTA varía según el tipo.

import styles from './CoachOption.module.css'

interface CoachOptionProps {
  type:        'virtual' | 'human'
  urgency?:    'green' | 'yellow' | 'red'
  onSelect:    () => void
  isLoading?:  boolean
}

const COPY = {
  virtual: {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label:       'Tecnica rapida',
    description: 'Ejercicios breves de 2 a 5 minutos adaptados a tu momento actual.',
    cta: {
      green:  'Explorar tecnicas',
      yellow: 'Iniciar una tecnica ahora',
      red:    'Necesito apoyo rapido',
    },
    disclaimer: null,
  },
  human: {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    label:       'Hablar con un coach',
    description: 'Sesion de apoyo con un coach certificado. Privada y confidencial.',
    cta: {
      green:  'Agendar sesion',
      yellow: 'Solicitar apoyo',
      red:    'Hablar con un coach ahora',
    },
    disclaimer: 'Esta opcion no sustituye atencion psicologica o medica especializada.',
  },
}

export function CoachOption({ type, urgency = 'green', onSelect, isLoading }: CoachOptionProps) {
  const c   = COPY[type]
  const cta = c.cta[urgency]

  return (
    <div className={[styles.card, styles[`card_${urgency}`]].join(' ')}>
      <div className={[styles.iconWrap, styles[`icon_${urgency}`]].join(' ')} aria-hidden="true">
        {c.icon}
      </div>
      <div className={styles.body}>
        <h3 className={styles.label}>{c.label}</h3>
        <p className={styles.description}>{c.description}</p>
        {c.disclaimer && (
          <p className={styles.disclaimer}>{c.disclaimer}</p>
        )}
        <button
          className={[styles.cta, styles[`cta_${urgency}`]].join(' ')}
          onClick={onSelect}
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.spinner} aria-hidden="true">
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </svg>
          ) : (
            <>
              {cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9,18 15,12 9,6" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
