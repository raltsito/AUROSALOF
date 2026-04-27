'use client'

// ZoneTimeSummary — ARUOSAL Sprint 2
// Barras de distribución de zona: verde / amarillo / rojo.
// Siempre usa icono + texto + color (nunca solo color — accesibilidad).

import styles from './ZoneTimeSummary.module.css'

interface ZoneTimeSummaryProps {
  percentGreen:  number
  percentYellow: number
  percentRed:    number
  totalCheckins: number
}

interface ZoneRowProps {
  label:   string
  percent: number
  zone:    'green' | 'yellow' | 'red'
  icon:    React.ReactNode
}

function ZoneRow({ label, percent, zone, icon }: ZoneRowProps) {
  return (
    <div className={styles.row}>
      <div className={[styles.iconWrap, styles[`icon_${zone}`]].join(' ')} aria-hidden="true">
        {icon}
      </div>
      <div className={styles.barCol}>
        <div className={styles.barHeader}>
          <span className={styles.zoneLabel}>{label}</span>
          <span className={styles.percent}>{percent}%</span>
        </div>
        <div className={styles.track} role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label={`${label}: ${percent}%`}>
          <div
            className={[styles.fill, styles[`fill_${zone}`]].join(' ')}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export function ZoneTimeSummary({ percentGreen, percentYellow, percentRed, totalCheckins }: ZoneTimeSummaryProps) {
  if (totalCheckins === 0) {
    return (
      <p className={styles.empty}>
        Registra tu primer estado para ver la distribucion de tu zona.
      </p>
    )
  }

  return (
    <div className={styles.container}>
      <ZoneRow
        zone="green"
        label="Zona verde"
        percent={percentGreen}
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20,6 9,17 4,12" />
          </svg>
        }
      />
      <ZoneRow
        zone="yellow"
        label="Zona amarilla"
        percent={percentYellow}
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        }
      />
      <ZoneRow
        zone="red"
        label="Zona roja"
        percent={percentRed}
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        }
      />
    </div>
  )
}
