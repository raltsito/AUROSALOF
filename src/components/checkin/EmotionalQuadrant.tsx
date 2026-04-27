'use client'

import { useRef, useCallback } from 'react'
import styles from './EmotionalQuadrant.module.css'
import { QuadrantValue } from '@/types'

interface Props {
  value:      QuadrantValue
  onChange:   (value: QuadrantValue) => void
  disabled?:  boolean
  showZone?:  boolean
  zoneCenter?: QuadrantValue
  zoneSigma?:  QuadrantValue
}

export function EmotionalQuadrant({
  value,
  onChange,
  disabled   = false,
  showZone   = false,
  zoneCenter,
  zoneSigma,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging   = useRef(false)

  // Convierte coordenadas de pantalla a valores 1–10
  const screenToValue = useCallback(
    (clientX: number, clientY: number): QuadrantValue => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return value
      const x = Math.max(0, Math.min(1, (clientX - rect.left)  / rect.width))
      const y = Math.max(0, Math.min(1, (clientY - rect.top)   / rect.height))
      return {
        valence: Math.round(x * 9 + 1),        // 1–10, de izq a der
        arousal: Math.round((1 - y) * 9 + 1),  // 1–10, de abajo a arriba
      }
    },
    [value]
  )

  const fire = useCallback(
    (clientX: number, clientY: number) => {
      if (disabled) return
      onChange(screenToValue(clientX, clientY))
    },
    [disabled, screenToValue, onChange]
  )

  // Mouse
  const onMouseDown = (e: React.MouseEvent) => { isDragging.current = true; fire(e.clientX, e.clientY) }
  const onMouseMove = (e: React.MouseEvent) => { if (isDragging.current) fire(e.clientX, e.clientY) }
  const onMouseUp   = () => { isDragging.current = false }

  // Touch
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]
    fire(t.clientX, t.clientY)
  }
  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()
    const t = e.touches[0]
    fire(t.clientX, t.clientY)
  }

  // Teclado (accesibilidad)
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return
    const step = 1
    let next = { ...value }
    if (e.key === 'ArrowRight') next.valence = Math.min(10, value.valence + step)
    if (e.key === 'ArrowLeft')  next.valence = Math.max(1,  value.valence - step)
    if (e.key === 'ArrowUp')    next.arousal  = Math.min(10, value.arousal  + step)
    if (e.key === 'ArrowDown')  next.arousal  = Math.max(1,  value.arousal  - step)
    if (next !== value) { e.preventDefault(); onChange(next) }
  }

  // Posicion del punto como porcentaje
  const pointX = ((value.valence - 1) / 9) * 100
  const pointY = ((10 - value.arousal) / 9) * 100

  // Elipse de zona optima (si disponible)
  const zone = showZone && zoneCenter && zoneSigma
    ? {
        cx: ((zoneCenter.valence - 1) / 9) * 100,
        cy: ((10 - zoneCenter.arousal) / 9) * 100,
        rx: (zoneSigma.valence  / 9) * 100,
        ry: (zoneSigma.arousal  / 9) * 100,
      }
    : null

  return (
    <div
      ref={containerRef}
      className={`${styles.quadrant} ${disabled ? styles.disabled : ''}`}
      role="group"
      aria-label="Cuadrante de estado emocional. Usa las teclas de flecha para ajustar."
      tabIndex={disabled ? -1 : 0}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onKeyDown={onKeyDown}
    >
      {/* SVG: cuadricula y elipse de zona */}
      <svg
        className={styles.svg}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Lineas de cuadricula */}
        <line x1="50" y1="0" x2="50" y2="100" className={styles.gridLine} />
        <line x1="0" y1="50" x2="100" y2="50" className={styles.gridLine} />

        {/* Zona optima del usuario */}
        {zone && (
          <ellipse
            cx={zone.cx}
            cy={zone.cy}
            rx={zone.rx}
            ry={zone.ry}
            className={styles.zoneArea}
          />
        )}
      </svg>

      {/* Etiquetas de ejes — texto neutro, sin colores de tema */}
      <span className={`${styles.label} ${styles.top}`}    aria-hidden="true">Alta energia</span>
      <span className={`${styles.label} ${styles.bottom}`} aria-hidden="true">Poca energia</span>
      <span className={`${styles.label} ${styles.left}`}   aria-hidden="true">Poco agrado</span>
      <span className={`${styles.label} ${styles.right}`}  aria-hidden="true">Mucho agrado</span>

      {/* Punto draggable */}
      <div
        className={styles.point}
        style={{ left: `${pointX}%`, top: `${pointY}%` }}
        aria-hidden="true"
      />

      {/* Lectura accesible del estado actual */}
      <div className={styles.coords} aria-live="polite" aria-atomic="true">
        <span>Energia {value.arousal}</span>
        <span>Agrado {value.valence}</span>
      </div>
    </div>
  )
}
