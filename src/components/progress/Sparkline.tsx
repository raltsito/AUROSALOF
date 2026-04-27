'use client'

// Sparkline SVG — ARUOSAL Sprint 2
// Mini gráfica de arousal de los últimos N días.
// Coloreada por zona dominante del día. Sin dependencias externas.

import styles from './Sparkline.module.css'

interface SparklinePoint {
  date:          string
  has_data:      boolean
  avg_arousal:   number | null
  dominant_zone: 'green' | 'yellow' | 'red' | null
}

interface SparklineProps {
  data:   SparklinePoint[]
  width?: number
  height?: number
}

const ZONE_COLOR: Record<string, string> = {
  green:  'var(--state-green)',
  yellow: 'var(--state-yellow)',
  red:    'var(--state-red)',
}

export function Sparkline({ data, width = 280, height = 64 }: SparklineProps) {
  const padding = { top: 8, right: 4, bottom: 20, left: 4 }
  const chartW  = width  - padding.left - padding.right
  const chartH  = height - padding.top  - padding.bottom

  const points = data.filter(d => d.has_data && d.avg_arousal !== null)

  if (points.length < 2) {
    return (
      <div className={styles.empty} style={{ width, height: height + padding.bottom }}>
        <span>Aun no hay suficientes datos para trazar la grafica</span>
      </div>
    )
  }

  const n = data.length
  const xScale = (i: number) => padding.left + (i / (n - 1)) * chartW
  const yScale = (v: number) => padding.top + chartH - ((v - 1) / 9) * chartH // 1–10 → top–bottom

  // Construir polyline solo con puntos con datos
  const lineCoords = data
    .map((d, i) =>
      d.has_data && d.avg_arousal !== null
        ? `${xScale(i).toFixed(1)},${yScale(d.avg_arousal).toFixed(1)}`
        : null
    )
    .filter(Boolean)
    .join(' ')

  // Etiquetas del eje X (día de la semana abreviado)
  const DAY = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa']
  const labels = data.map((d, i) => {
    const dow = new Date(d.date + 'T12:00:00').getDay()
    return { x: xScale(i), label: DAY[dow] }
  })

  return (
    <svg
      width={width}
      height={height + padding.bottom}
      viewBox={`0 0 ${width} ${height + padding.bottom}`}
      aria-label="Grafica de energia de los ultimos dias"
      role="img"
      className={styles.svg}
    >
      {/* Línea de referencia (zona central: 5.5) */}
      <line
        x1={padding.left} y1={yScale(5.5).toFixed(1)}
        x2={width - padding.right} y2={yScale(5.5).toFixed(1)}
        stroke="var(--border-color)"
        strokeWidth="1"
        strokeDasharray="4 3"
      />

      {/* Línea de tendencia */}
      <polyline
        points={lineCoords}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />

      {/* Puntos coloreados por zona */}
      {data.map((d, i) => {
        if (!d.has_data || d.avg_arousal === null) return null
        const cx    = xScale(i)
        const cy    = yScale(d.avg_arousal)
        const color = d.dominant_zone ? ZONE_COLOR[d.dominant_zone] : 'var(--color-primary)'
        return (
          <circle
            key={d.date}
            cx={cx.toFixed(1)}
            cy={cy.toFixed(1)}
            r="4"
            fill={color}
            stroke="var(--surface-card)"
            strokeWidth="1.5"
            aria-label={`${d.date}: energia ${d.avg_arousal}`}
          />
        )
      })}

      {/* Etiquetas eje X */}
      {labels.map(({ x, label }, i) => (
        <text
          key={i}
          x={x.toFixed(1)}
          y={height + padding.bottom - 2}
          textAnchor="middle"
          fontSize="10"
          fill="var(--text-muted)"
          fontFamily="Inter, sans-serif"
        >
          {label}
        </text>
      ))}
    </svg>
  )
}
