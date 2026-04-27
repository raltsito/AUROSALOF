'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import styles from './consent.module.css'

const CONSENT_VERSION = '1.0'
const CONSENT_TEXT_HASH = 'auto-consent-no-otp'

export default function ConsentPage() {
  const router = useRouter()
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleAccept() {
    if (!agreed) {
      setError('Marca la casilla para continuar.')
      return
    }

    setError('')
    setLoading(true)

    const res = await fetch('/api/auth/consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        version: CONSENT_VERSION,
        text_hash: CONSENT_TEXT_HASH,
      }),
    })
    const data = await res.json()
    setLoading(false)

    if (!data.ok) {
      setError(data.error ?? 'No se pudo continuar. Intenta de nuevo.')
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <div className={styles.headerIcon} aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <h1 className={styles.title}>Tu privacidad importa</h1>
            <p className={styles.subtitle}>Acepta para continuar</p>
          </div>
        </header>

        <div className={styles.summary}>
          <p className={styles.summaryText}>
            ARUOSAL registra informacion de bienestar para mostrarte recomendaciones
            y progreso personal. Tus registros individuales son privados.
          </p>
        </div>

        <div className={styles.consentSection}>
          <h2 className={styles.consentTitle}>Consentimiento de datos</h2>
          <p className={styles.consentText}>
            Acepto que ARUOSAL guarde mis datos de cuenta y bienestar para usar la app.
          </p>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              className={styles.checkbox}
            />
            <span>Acepto continuar sin verificacion por correo.</span>
          </label>

          {error && <p className={styles.error} role="alert">{error}</p>}

          <Button fullWidth size="lg" loading={loading} onClick={handleAccept} disabled={!agreed}>
            Continuar
          </Button>
        </div>
      </div>
    </div>
  )
}
