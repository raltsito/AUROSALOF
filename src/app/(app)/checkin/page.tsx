'use client'

import { useState, useCallback } from 'react'
import { useRouter }             from 'next/navigation'
import { EmotionalQuadrant }     from '@/components/checkin/EmotionalQuadrant'
import { Button }                from '@/components/ui/Button'
import { QuadrantValue }         from '@/types'
import styles from './checkin.module.css'

const DEFAULT_VALUE: QuadrantValue = { arousal: 5, valence: 5 }

export default function CheckinPage() {
  const router = useRouter()
  const [value,   setValue]   = useState<QuadrantValue>(DEFAULT_VALUE)
  const [note,    setNote]    = useState('')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [useSliders, setUseSliders] = useState(false)

  const handleChange = useCallback((v: QuadrantValue) => setValue(v), [])

  async function handleSubmit() {
    // MOCKUP — simula guardado y redirige al dashboard
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    router.push('/dashboard')
  }

  const now = new Date().toLocaleTimeString('es-MX', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  })

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button
          className={styles.back}
          onClick={() => router.back()}
          aria-label="Volver"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15,18 9,12 15,6" />
          </svg>
        </button>
        <div>
          <h1 className={styles.title}>Como te sientes ahora?</h1>
          <p className={styles.subtitle}>{now}</p>
        </div>
      </header>

      {/* Toggle cuadrante / sliders */}
      <div className={styles.modeToggle} role="group" aria-label="Modo de registro">
        <button
          className={`${styles.modeBtn} ${!useSliders ? styles.modeActive : ''}`}
          onClick={() => setUseSliders(false)}
          aria-pressed={!useSliders}
        >
          Cuadrante
        </button>
        <button
          className={`${styles.modeBtn} ${useSliders ? styles.modeActive : ''}`}
          onClick={() => setUseSliders(true)}
          aria-pressed={useSliders}
        >
          Deslizadores
        </button>
      </div>

      {/* Instruccion */}
      <p className={styles.instruction}>
        {useSliders
          ? 'Mueve los deslizadores para indicar tu estado.'
          : 'Toca o arrastra el punto al lugar que mejor describe como te sientes.'}
      </p>

      {/* Cuadrante — siempre renderizado para sincronizar sliders */}
      <div className={useSliders ? styles.hidden : ''}>
        <EmotionalQuadrant
          value={value}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      {/* Sliders (siempre activos, sincronizados) */}
      <div className={`${styles.sliders} ${!useSliders ? styles.slidersCompact : ''}`}>
        <div className={styles.sliderRow}>
          <label htmlFor="arousal-slider" className={styles.sliderLabel}>
            Energia
          </label>
          <input
            id="arousal-slider"
            type="range"
            min={1}
            max={10}
            step={1}
            value={value.arousal}
            onChange={e => setValue(v => ({ ...v, arousal: Number(e.target.value) }))}
            className={styles.slider}
            disabled={loading}
            aria-valuetext={`Energia: ${value.arousal} de 10`}
          />
          <span className={styles.sliderValue}>{value.arousal}</span>
        </div>
        <div className={styles.sliderRow}>
          <label htmlFor="valence-slider" className={styles.sliderLabel}>
            Agrado
          </label>
          <input
            id="valence-slider"
            type="range"
            min={1}
            max={10}
            step={1}
            value={value.valence}
            onChange={e => setValue(v => ({ ...v, valence: Number(e.target.value) }))}
            className={styles.slider}
            disabled={loading}
            aria-valuetext={`Agrado: ${value.valence} de 10`}
          />
          <span className={styles.sliderValue}>{value.valence}</span>
        </div>
      </div>

      {/* Nota opcional */}
      <div className={styles.noteWrapper}>
        <label htmlFor="note" className={styles.noteLabel}>
          Agregar nota (opcional)
        </label>
        <textarea
          id="note"
          className={styles.noteInput}
          value={note}
          onChange={e => setNote(e.target.value.slice(0, 200))}
          placeholder="Que esta pasando? (max 200 caracteres)"
          rows={3}
          maxLength={200}
          disabled={loading}
        />
        <p className={styles.noteCount}>{note.length}/200</p>
      </div>

      {error && (
        <p className={styles.error} role="alert">{error}</p>
      )}

      <Button
        fullWidth
        size="lg"
        loading={loading}
        onClick={handleSubmit}
      >
        Registrar estado
      </Button>
    </div>
  )
}
