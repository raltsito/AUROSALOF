import styles from './profile.module.css'

// MOCKUP — datos de presentacion
const MOCK = {
  name:        'Sofia Ramirez',
  email:       'sofia.ramirez@empresa.mx',
  empresa:     'Grupo Industrial Norte',
  turno:       'Matutino',
  miembro:     'desde enero 2026',
  center:      { arousal: 6.4, valence: 6.9 },
  sigma:       { arousal: 1.2, valence: 1.4 },
  sampleCount: 31,
}

const chevron = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9,18 15,12 9,6" />
  </svg>
)

export default function ProfilePage() {
  const firstName = MOCK.name.split(' ')[0]

  return (
    <>
      {/* Encabezado */}
      <header className={styles.header}>
        <div className={styles.avatar} aria-hidden="true">
          {firstName[0].toUpperCase()}
        </div>
        <div>
          <p className={styles.name}>{MOCK.name}</p>
          <p className={styles.email}>{MOCK.email}</p>
        </div>
      </header>

      {/* Info empresa */}
      <section aria-labelledby="info-heading" className={styles.section}>
        <h2 id="info-heading" className={styles.sectionTitle}>Mi cuenta</h2>
        <div className={styles.card}>
          <div className={styles.zoneRow}>
            <span className={styles.zoneLabel}>Empresa</span>
            <span className={styles.zoneValue}>{MOCK.empresa}</span>
          </div>
          <div className={styles.zoneRow}>
            <span className={styles.zoneLabel}>Turno</span>
            <span className={styles.zoneValue}>{MOCK.turno}</span>
          </div>
          <div className={styles.zoneRow}>
            <span className={styles.zoneLabel}>Miembro</span>
            <span className={styles.zoneValue}>{MOCK.miembro}</span>
          </div>
        </div>
      </section>

      {/* Zona personal */}
      <section aria-labelledby="zone-heading" className={styles.section}>
        <h2 id="zone-heading" className={styles.sectionTitle}>Tu zona habitual</h2>
        <div className={styles.card}>
          <div className={styles.zoneRow}>
            <span className={styles.zoneLabel}>Centro energia</span>
            <span className={styles.zoneValue}>{MOCK.center.arousal.toFixed(1)} / 10</span>
          </div>
          <div className={styles.zoneRow}>
            <span className={styles.zoneLabel}>Centro agrado</span>
            <span className={styles.zoneValue}>{MOCK.center.valence.toFixed(1)} / 10</span>
          </div>
          <div className={styles.zoneRow}>
            <span className={styles.zoneLabel}>Amplitud energia</span>
            <span className={styles.zoneValue}>&plusmn;{MOCK.sigma.arousal.toFixed(1)}</span>
          </div>
          <div className={styles.zoneRow}>
            <span className={styles.zoneLabel}>Amplitud agrado</span>
            <span className={styles.zoneValue}>&plusmn;{MOCK.sigma.valence.toFixed(1)}</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.zoneRow}>
            <span className={styles.zoneLabel}>Registros totales</span>
            <span className={styles.zoneValue}>{MOCK.sampleCount}</span>
          </div>
          <p className={styles.zoneMeta}>
            Tu zona es personal — aprendida de tus propios registros.
          </p>
        </div>
      </section>

      {/* Notificaciones */}
      <section aria-labelledby="notif-heading" className={styles.section}>
        <h2 id="notif-heading" className={styles.sectionTitle}>Notificaciones</h2>
        <div className={styles.card}>
          <div className={styles.zoneRow}>
            <span className={styles.zoneLabel}>Recordatorio de registro</span>
            <span className={styles.badge}>Activo</span>
          </div>
          <div className={styles.zoneRow}>
            <span className={styles.zoneLabel}>Horario preferido</span>
            <span className={styles.zoneValue}>09:00</span>
          </div>
          <div className={styles.zoneRow}>
            <span className={styles.zoneLabel}>Alertas de zona</span>
            <span className={styles.badge}>Activo</span>
          </div>
        </div>
      </section>

      {/* Privacidad */}
      <section aria-labelledby="privacy-heading" className={styles.section}>
        <h2 id="privacy-heading" className={styles.sectionTitle}>Mi privacidad</h2>
        <div className={styles.card}>
          <a href="#" className={styles.privacyLink}>
            <span>Solicitar derechos ARCO</span>
            {chevron}
          </a>
          <div className={styles.divider} />
          <a href="#" className={styles.privacyLink}>
            <span>Mis solicitudes ARCO</span>
            {chevron}
          </a>
          <div className={styles.divider} />
          <a href="#" className={styles.privacyLink}>
            <span>Aviso de privacidad</span>
            {chevron}
          </a>
          <div className={styles.divider} />
          <a href="#" className={styles.privacyLink + ' ' + styles.privacyLinkDanger}>
            <span>Revocar consentimiento</span>
            {chevron}
          </a>
        </div>
      </section>

      {/* Linea de crisis */}
      <p className={styles.crisis}>
        Si sientes una crisis, llama a la Linea de la Vida:{' '}
        <a href="tel:8009112000" className={styles.crisisLink}>800 911 2000</a>
        {' '}(gratuita, 24/7)
      </p>
    </>
  )
}
