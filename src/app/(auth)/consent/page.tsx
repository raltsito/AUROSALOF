'use client'

// Consentimiento — Sprint 2
// Flujo de 3 pasos:
//   1. Leer aviso + marcar checkbox
//   2. Verificar identidad con OTP enviado por email
//   3. Redirigir a /dashboard
//
// LFPDPPP: consentimiento expreso + OTP + IP + device_id + timestamp + hash del aviso.

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button }   from '@/components/ui/Button'
import { OtpInput } from '@/components/ui/OtpInput'
import styles from './consent.module.css'

const CONSENT_VERSION   = '1.0'
const CONSENT_TEXT_HASH = 'sha256-aviso-v1.0-2026-03-23' // SHA-256 del texto canónico del aviso

type Step = 'read' | 'otp' | 'done'

export default function ConsentPage() {
  const router = useRouter()

  const [step,     setStep]     = useState<Step>('read')
  const [agreed,   setAgreed]   = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  // Paso 2: OTP
  const [otp,        setOtp]        = useState('')
  const [emailHint,  setEmailHint]  = useState('')
  const [cooldown,   setCooldown]   = useState(0) // segundos restantes para reenvío

  // ─── Paso 1: enviar OTP ───────────────────────────────────────────────────

  async function handleSendOtp() {
    if (!agreed) {
      setError('Marca la casilla para continuar.')
      return
    }
    setError('')
    setLoading(true)

    const res  = await fetch('/api/auth/consent/otp/send', { method: 'POST' })
    const data = await res.json()
    setLoading(false)

    if (!data.ok) {
      setError(data.error ?? 'No se pudo enviar el codigo. Intenta de nuevo.')
      return
    }

    if (data.already_verified) {
      router.push('/dashboard')
      return
    }

    setEmailHint(data.email_hint ?? '')
    setStep('otp')
    startCooldown(60)
  }

  // ─── Paso 2: verificar OTP ────────────────────────────────────────────────

  async function handleVerifyOtp() {
    if (otp.length < 6) {
      setError('Ingresa los 6 digitos del codigo.')
      return
    }
    setError('')
    setLoading(true)

    const res  = await fetch('/api/auth/consent/otp/verify', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        otp_code:  otp,
        version:   CONSENT_VERSION,
        text_hash: CONSENT_TEXT_HASH,
        device_id: getDeviceId(),
      }),
    })
    const data = await res.json()
    setLoading(false)

    if (!data.ok) {
      setError(data.error ?? 'Codigo incorrecto. Intenta de nuevo.')
      setOtp('')
      return
    }

    setStep('done')
    router.push('/dashboard')
  }

  // ─── Reenviar OTP ─────────────────────────────────────────────────────────

  async function handleResend() {
    if (cooldown > 0) return
    setError('')
    setLoading(true)
    const res  = await fetch('/api/auth/consent/otp/send', { method: 'POST' })
    const data = await res.json()
    setLoading(false)
    if (!data.ok) {
      setError(data.error ?? 'No se pudo reenviar. Intenta en un momento.')
    } else {
      setOtp('')
      startCooldown(60)
    }
  }

  function startCooldown(seconds: number) {
    setCooldown(seconds)
    const interval = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) { clearInterval(interval); return 0 }
        return prev - 1
      })
    }, 1000)
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        {/* Encabezado */}
        <header className={styles.header}>
          <div className={styles.headerIcon} aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <h1 className={styles.title}>Tu privacidad importa</h1>
            <p className={styles.subtitle}>
              {step === 'read' ? 'Lee esto antes de continuar' : 'Verifica tu identidad'}
            </p>
          </div>
        </header>

        {/* Indicador de progreso */}
        <div className={styles.stepper} aria-label="Progreso del consentimiento">
          <div className={[styles.stepDot, step !== 'read' ? styles.stepDone : styles.stepActive].join(' ')} />
          <div className={styles.stepLine} />
          <div className={[styles.stepDot, step === 'otp' ? styles.stepActive : step === 'done' ? styles.stepDone : styles.stepPending].join(' ')} />
          <div className={styles.stepLine} />
          <div className={[styles.stepDot, step === 'done' ? styles.stepDone : styles.stepPending].join(' ')} />
        </div>

        {/* ── PASO 1: Leer y aceptar ── */}
        {step === 'read' && (
          <>
            <div className={styles.summary}>
              <p className={styles.summaryText}>
                ARUOSAL registra tu nivel de energia y bienestar durante el turno
                para ayudarte a estar mejor. Estos datos son personales y se tratan
                como informacion sensible conforme a la LFPDPPP.
              </p>
              <ul className={styles.highlights}>
                <li>
                  <span className={styles.bullet} aria-hidden="true" />
                  Solo tu ves tus registros individuales en detalle.
                </li>
                <li>
                  <span className={styles.bullet} aria-hidden="true" />
                  Tu empresa ve unicamente estadisticas grupales anonimas.
                </li>
                <li>
                  <span className={styles.bullet} aria-hidden="true" />
                  Puedes revocar este consentimiento en cualquier momento desde
                  Configuracion.
                </li>
                <li>
                  <span className={styles.bullet} aria-hidden="true" />
                  Tienes derechos ARCO. Solicitalos a privacidad@empresa.com.
                </li>
              </ul>

              <button
                className={styles.expandBtn}
                onClick={() => setExpanded(v => !v)}
                aria-expanded={expanded}
              >
                {expanded ? 'Ocultar aviso completo' : 'Leer aviso de privacidad completo'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  <polyline points="6,9 12,15 18,9" />
                </svg>
              </button>

              {expanded && (
                <div className={styles.fullText} role="region" aria-label="Aviso de privacidad completo">
                  <h2>Aviso de Privacidad — ARUOSAL v{CONSENT_VERSION}</h2>
                  <p><strong>Responsable:</strong> [Empresa Responsable S.A. de C.V.]</p>
                  <p><strong>Datos sensibles:</strong> registros de activacion emocional y bienestar.</p>
                  <p><strong>Finalidades:</strong> recomendaciones personalizadas; conexion con coach; estadisticas grupales anonimas para la empresa.</p>
                  <p><strong>Transferencias:</strong> proveedores de TI y coaching bajo clausulas contractuales de privacidad.</p>
                  <p><strong>Derechos ARCO:</strong> privacidad@empresa.com. Respuesta en 15 dias habiles.</p>
                  <p><strong>Revocacion:</strong> desde Configuracion &gt; Mi privacidad en cualquier momento.</p>
                </div>
              )}
            </div>

            <div className={styles.consentSection}>
              <h2 className={styles.consentTitle}>Autorizo el tratamiento de mis datos de bienestar</h2>
              <p className={styles.consentText}>
                Entiendo que mis registros de activacion y agrado son datos sensibles.
                Autorizo expresamente su tratamiento con las finalidades descritas.
                Este consentimiento es voluntario y puedo revocarlo en cualquier momento.
              </p>

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  className={styles.checkbox}
                />
                <span>Acepto este consentimiento expreso y voluntario para el tratamiento de mis datos sensibles de bienestar.</span>
              </label>

              {error && <p className={styles.error} role="alert">{error}</p>}

              <Button fullWidth size="lg" loading={loading} onClick={handleSendOtp} disabled={!agreed}>
                Enviar codigo de verificacion
              </Button>

              <p className={styles.noConsent}>
                Si prefieres no aceptar,{' '}
                <button className={styles.declineBtn} onClick={() => router.push('/login')}>
                  vuelve al inicio
                </button>
                . La app funcionara en modo basico sin registros de bienestar.
              </p>
            </div>
          </>
        )}

        {/* ── PASO 2: OTP ── */}
        {step === 'otp' && (
          <div className={styles.consentSection}>
            <div className={styles.otpHeader}>
              <div className={styles.otpIcon} aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22,7-10,7L2,7" />
                </svg>
              </div>
              <div>
                <h2 className={styles.consentTitle}>Codigo enviado a tu correo</h2>
                {emailHint && (
                  <p className={styles.consentText}>
                    Enviamos un codigo de 6 digitos a{' '}
                    <strong>{emailHint}</strong>. Revisa tambien tu carpeta de spam.
                  </p>
                )}
              </div>
            </div>

            <OtpInput
              value={otp}
              onChange={setOtp}
              disabled={loading}
              hasError={!!error}
            />

            {error && <p className={styles.error} role="alert">{error}</p>}

            <Button fullWidth size="lg" loading={loading} onClick={handleVerifyOtp} disabled={otp.length < 6}>
              Verificar y confirmar consentimiento
            </Button>

            <div className={styles.resendRow}>
              <span className={styles.noConsent}>No lo recibiste?</span>
              <button
                className={[styles.declineBtn, cooldown > 0 ? styles.declineBtnDisabled : ''].filter(Boolean).join(' ')}
                onClick={handleResend}
                disabled={cooldown > 0 || loading}
              >
                {cooldown > 0 ? `Reenviar en ${cooldown}s` : 'Reenviar codigo'}
              </button>
            </div>

            <button
              className={styles.backBtn}
              onClick={() => { setStep('read'); setOtp(''); setError('') }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15,18 9,12 15,6" />
              </svg>
              Volver al aviso
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

/** Genera un device_id estable por navegador usando localStorage */
function getDeviceId(): string {
  try {
    const key     = 'aruosal_device_id'
    const existing = localStorage.getItem(key)
    if (existing) return existing
    const id = crypto.randomUUID()
    localStorage.setItem(key, id)
    return id
  } catch {
    return 'unknown'
  }
}
