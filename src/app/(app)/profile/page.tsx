import { getCurrentUser } from '@/lib/auth'
import { prisma }         from '@/lib/db'
import styles from './profile.module.css'

const SHIFT_LABEL: Record<string, string> = {
  morning:   'Matutino',
  afternoon: 'Vespertino',
  night:     'Nocturno',
}

function formatMemberSince(date: Date): string {
  return `desde ${date.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })}`
}

const chevron = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9,18 15,12 9,6" />
  </svg>
)

export default async function ProfilePage() {
  const session = await getCurrentUser()

  const [user, zoneProfile] = session
    ? await Promise.all([
        prisma.user.findUnique({
          where:  { id: session.id },
          select: { name: true, email: true, company_id: true, shift: true, created_at: true },
        }),
        prisma.zoneProfile.findUnique({
          where:  { user_id: session.id },
          select: {
            center_arousal: true,
            center_valence: true,
            sigma_arousal:  true,
            sigma_valence:  true,
            sample_count:   true,
          },
        }),
      ])
    : [null, null]

  const name      = user?.name  ?? '—'
  const email     = user?.email ?? '—'
  const firstName = name.split(' ')[0]
  const turno     = user?.shift ? (SHIFT_LABEL[user.shift] ?? user.shift) : '—'
  const miembro   = user?.created_at ? formatMemberSince(user.created_at) : '—'

  return (
    <>
      {/* Encabezado */}
      <header className={styles.header}>
        <div className={styles.avatar} aria-hidden="true">
          {firstName[0]?.toUpperCase() ?? '?'}
        </div>
        <div>
          <p className={styles.name}>{name}</p>
          <p className={styles.email}>{email}</p>
        </div>
      </header>

      {/* Info cuenta */}
      <section aria-labelledby="info-heading" className={styles.section}>
        <h2 id="info-heading" className={styles.sectionTitle}>Mi cuenta</h2>
        <div className={styles.card}>
          {user?.company_id && (
            <div className={styles.zoneRow}>
              <span className={styles.zoneLabel}>Empresa</span>
              <span className={styles.zoneValue}>{user.company_id}</span>
            </div>
          )}
          <div className={styles.zoneRow}>
            <span className={styles.zoneLabel}>Turno</span>
            <span className={styles.zoneValue}>{turno}</span>
          </div>
          <div className={styles.zoneRow}>
            <span className={styles.zoneLabel}>Miembro</span>
            <span className={styles.zoneValue}>{miembro}</span>
          </div>
        </div>
      </section>

      {/* Zona personal */}
      {zoneProfile && (
        <section aria-labelledby="zone-heading" className={styles.section}>
          <h2 id="zone-heading" className={styles.sectionTitle}>Tu zona habitual</h2>
          <div className={styles.card}>
            <div className={styles.zoneRow}>
              <span className={styles.zoneLabel}>Centro energia</span>
              <span className={styles.zoneValue}>{zoneProfile.center_arousal.toFixed(1)} / 10</span>
            </div>
            <div className={styles.zoneRow}>
              <span className={styles.zoneLabel}>Centro agrado</span>
              <span className={styles.zoneValue}>{zoneProfile.center_valence.toFixed(1)} / 10</span>
            </div>
            <div className={styles.zoneRow}>
              <span className={styles.zoneLabel}>Amplitud energia</span>
              <span className={styles.zoneValue}>&plusmn;{zoneProfile.sigma_arousal.toFixed(1)}</span>
            </div>
            <div className={styles.zoneRow}>
              <span className={styles.zoneLabel}>Amplitud agrado</span>
              <span className={styles.zoneValue}>&plusmn;{zoneProfile.sigma_valence.toFixed(1)}</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.zoneRow}>
              <span className={styles.zoneLabel}>Registros totales</span>
              <span className={styles.zoneValue}>{zoneProfile.sample_count}</span>
            </div>
            <p className={styles.zoneMeta}>
              Tu zona es personal — aprendida de tus propios registros.
            </p>
          </div>
        </section>
      )}

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
          <a href="/arco/nueva" className={styles.privacyLink}>
            <span>Solicitar derechos ARCO</span>
            {chevron}
          </a>
          <div className={styles.divider} />
          <a href="/arco" className={styles.privacyLink}>
            <span>Mis solicitudes ARCO</span>
            {chevron}
          </a>
          <div className={styles.divider} />
          <a href="#" className={styles.privacyLink}>
            <span>Aviso de privacidad</span>
            {chevron}
          </a>
          <div className={styles.divider} />
          <a href="#" className={`${styles.privacyLink} ${styles.privacyLinkDanger}`}>
            <span>Revocar consentimiento</span>
            {chevron}
          </a>
        </div>
      </section>

      <p className={styles.crisis}>
        Si sientes una crisis, llama a la Linea de la Vida:{' '}
        <a href="tel:8009112000" className={styles.crisisLink}>800 911 2000</a>
        {' '}(gratuita, 24/7)
      </p>
    </>
  )
}
