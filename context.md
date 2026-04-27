# Proyecto: ARUOSAL — App B2B2C de Zona Optima (Arousal–Valencia)

Version del documento: v1.5 — 2026-03-23
Estado: Sprint 5 especificado — pendiente validacion con cliente

---

## Vision

Ser la herramienta de bienestar laboral mas usable y confiable para trabajadores en Mexico, que aprende del patron personal de cada usuario sin diagnosticar, sin exponer datos individuales a la empresa, y sin lenguaje clinico. Bienestar en el trabajo que se siente como apoyo, no como vigilancia.

---

## Resumen del producto

App movil B2B2C para trabajadores que permite registrar en segundos su estado emocional (activacion/arousal y valencia/agrado–desagrado) durante turnos laborales. El sistema aprende gradualmente la "zona optima" personal de cada usuario mediante datos longitudinales y un modelo explicable (prior poblacional + personalizacion incremental Bayesiana Normal-Normal). Cuando el usuario se aleja de su zona optima, ofrece microintervenciones (activacion o desactivacion segun cuadrante), escala a coach segun urgencia, y sugiere apoyo profesional cuando existe persistencia de 3+ dias en extremos. La empresa accede unicamente a datos agregados y anonimizados con k-anonimato >= 5.

---

## Propuesta de valor diferencial

- Check-in en < 5 segundos: cuadrante tactil draggable + sliders equivalentes.
- Zona optima personal: aprende de cada usuario con modelo Bayesiano Normal-Normal, no solo de promedios grupales.
- Intervenciones contextualizadas: cuadrante + urgencia + historial personal + persistencia + tendencia.
- Escalamiento gradual: verde → sin interrupcion; amarillo → tecnica; rojo → coach.
- Panel empresa no punitivo: la empresa ve tendencias, no personas.
- Cumplimiento LFPDPPP verificable: OTP + hash + timestamp en cada consentimiento.

---

## Objetivos

- Registro ultra-rapido (< 5 segundos) del estado mediante cuadrante o sliders.
- Recomendaciones breves, seguras y basadas en evidencia; lenguaje de "estado" y "apoyo", no clinico.
- Personalizacion: iniciar con zona estandar (prior poblacional) y ajustar por usuario con modelo Bayesiano Normal-Normal desde el check-in 14.
- Escalamiento a coach por urgencia (zona roja), y rutas hacia atencion profesional por persistencia (>= 3 dias en zona roja/amarilla extrema).
- Modo B2B2C: panel empresa con metricas agregadas (k-anonimato >= 5) por defecto; sin uso punitivo; sin datos individuales.
- Cumplimiento Mexico (LFPDPPP): consentimiento expreso y por escrito; aviso de privacidad; revocacion; ARCO; minimizacion; retencion limitada.

---

## Stakeholders

| Rol | Descripcion | Acceso por defecto |
|---|---|---|
| Trabajador | Usuario final; registra check-ins; ve sus propios datos | Datos propios completos |
| Coach | Apoya al trabajador en sesiones telefonicas o chat | Datos del trabajador solo con opt-in explicito |
| Admin Empresa | Gestiona usuarios; ve tendencias grupales | Solo agregados anonimizados (k >= 5) |
| Privacy Admin | Cumplimiento LFPDPPP; gestiona ARCO; log de auditoria | Acceso completo auditado |
| Equipo de producto | PM, UX/UI, Front, Data; no tiene acceso a produccion por defecto | Entornos de desarrollo/staging con datos sinteticos |

---

## Alcance MVP

- Registro/Login con MFA (OTP SMS o email).
- Onboarding con aviso de privacidad + consentimiento expreso verificable (OTP + checkbox + hash SHA-256 + timestamp + IP + UUID de dispositivo → registro inmutable).
- Check-ins por turnos: cuadrante tactil draggable + sliders sincronizados; fondo neutral (sin colores de tema en el instrumento).
- Motor de zona optima: prior poblacional (semanas 1–2) → personalizacion Bayesiana Normal-Normal (desde check-in 14); explicable al usuario en lenguaje llano.
- Biblioteca de 12+ microintervenciones clasificadas por cuadrante y urgencia (verde/amarillo/rojo).
- Escalamiento a coach: zona roja → oferta inmediata; persistencia >= 3 dias → sugerencia de apoyo profesional (sin diagnostico).
- Panel empresa: agregados k-anonimizados; tendencia por area/turno; KPIs de adherencia y zona verde.
- RBAC con 4 roles (trabajador, coach, admin empresa, privacy admin).
- Log de auditoria inmutable para accesos a datos sensibles.
- Formulario ARCO in-app con SLA de 15 dias habiles.
- Dos temas visuales: Calm Pastel e INTRA Brand.
- Accesibilidad WCAG AA (contraste, tamanios tactiles, estados no solo por color, modo oscuro).

---

## Fuera de alcance (version 1.0)

- Diagnosticos clinicos o prediccion de trastornos.
- Integraciones con biometricos (revisar legal y DPIA antes de incluir).
- Deteccion automatica de emociones por camara o microfono.
- Evaluacion de desempeno laboral o reportes individualizados a la empresa por defecto.
- Gamificacion o puntuaciones comparativas entre trabajadores.

---

## Restricciones legales y de privacidad (Mexico — LFPDPPP)

- Los registros de estado emocional se tratan como DATOS SENSIBLES (LFPDPPP Art. 3 fracc. VI).
- Consentimiento expreso y por escrito obligatorio. Mecanismo en app: OTP 6 digitos + checkbox + hash SHA-256 del texto del aviso + timestamp UTC + IP + UUID de dispositivo → tabla inmutable append-only.
- El aviso de privacidad debe estar disponible en version corta (in-app, lenguaje claro) y version completa (enlace).
- Revocacion de consentimiento habilitada desde Configuracion > Mi privacidad.
- Derechos ARCO (Acceso, Rectificacion, Cancelacion, Oposicion) con formulario in-app y SLA de 15 dias habiles.
- Minimizacion de datos: solo se registran los campos estrictamente necesarios.
- Retencion limitada:
  - PII: 6 meses post-baja → eliminacion irreversible con log.
  - Eventos de bienestar: 24 meses → anonimizacion automatica por cron job.
  - Consentimientos: vida del sistema + 5 anios (obligacion legal).
  - Log de auditoria: 3 anios en archivo cifrado.
- Panel empresa: datos disociados/anonimizados con k-anonimato >= 5; controles anti-uso punitivo; ninguna vista individual por defecto.
- Toda transferencia de datos a terceros (EAP, proveedor de push) requiere clausula contractual de privacidad.

---

## Sistema de diseno — Referencia de tokens

### Tema A: Calm Pastel

| Token | Valor | Uso |
|---|---|---|
| `--cp-dark` | `#060F16` | Texto principal, nav oscura |
| `--cp-slate` | `#5A6B70` | Texto secundario, iconos |
| `--cp-fog` | `#DEEAED` | Fondo de pantalla, tarjetas |
| `--cp-mist` | `#ADC7D0` | Bordes, separadores |
| `--cp-plum` | `#DD98D1` | Acento primario, CTAs, highlights |
| `--cp-clay` | `#B58B80` | Advertencia calida, estado precaucion |
| `--cp-lavender` | `#A8A3C8` | Acento secundario, tags, progreso |
| `--cp-night` | `#443956` | Encabezados en modo claro |
| `--cp-surface-1` | `#FFFFFF` | Tarjeta primaria |
| `--cp-surface-2` | `#F4F8F9` | Fondo alternativo, input fields |
| `--cp-dark-bg` | `#0D1C23` | Fondo modo oscuro |
| `--cp-dark-card` | `#1A2C34` | Tarjeta modo oscuro |

### Tema B: INTRA Brand

| Token | Valor | Uso |
|---|---|---|
| `--ib-teal` | `#06C4CC` | Primario, CTAs, iconos activos |
| `--ib-teal-light` | `#D7F3F4` | Fondos de tarjeta, estados activos |
| `--ib-red` | `#F71A21` | Alerta de urgencia, zona roja |
| `--ib-carbon` | `#1F191B` | Texto, navbar, encabezados |
| `--ib-white` | `#FFFFFF` | Superficie primaria |
| `--ib-gray` | `#EEF0F1` | Fondos alternativos, disabled |
| `--ib-red-soft` | `#FFEDED` | Fondo de alerta suave |
| `--ib-dark-bg` | `#141010` | Fondo modo oscuro |
| `--ib-dark-card` | `#231D1F` | Tarjeta modo oscuro |
| `--ib-dark-teal` | `#04A8AF` | Teal modo oscuro (contraste > 4.5:1) |

### Reglas de diseno criticas
- Tipografia: Plus Jakarta Sans (display) + Inter (cuerpo).
- Cuadrante de check-in: fondo `#F5F5F5`, punto `#3A3A3A` — SIN colores de tema para evitar sesgo.
- Los estados de urgencia (verde/amarillo/rojo) siempre usan icono + texto + color, nunca solo color.
- Tamanos tactiles minimos: 44x44pt (iOS), 48x48dp (Android).
- Contraste: WCAG AA minimo (4.5:1 texto/fondo), preferible AAA.
- Modo oscuro obligatorio con tokens `--*-dark-bg` y `--*-dark-card`.

---

## Modelo de zona optima — Especificacion tecnica completa (Sprint 3)

### Parametros del modelo

| Parametro | Valor | Justificacion |
|---|---|---|
| `PRIOR_AROUSAL_CENTER` | 5.2 | Media poblacional calibrada |
| `PRIOR_AROUSAL_SIGMA` | 1.5 | Desviacion estandar poblacional |
| `PRIOR_VALENCE_CENTER` | 6.1 | Media poblacional calibrada |
| `PRIOR_VALENCE_SIGMA` | 1.8 | Desviacion estandar poblacional |
| `MIN_SAMPLES` | 14 | Check-ins minimos para personalizar |
| `TAU_SQUARED` | 2.0 | Ruido de observacion (τ²); τ≈1.41 en escala 1-10 |
| `MAX_PRECISION` | 25.0 | Cap para evitar congelamiento del modelo |
| `DRIFT_THRESHOLD` | 1.5σ | Desplazamiento en 7 dias que activa DriftAlert |
| `EMA_SIGMA_ALPHA` | 0.1 | Alpha para EMA de varianza |
| `SIGMA_MIN` | 0.5 | Zona minima (evita colapso a punto) |
| `SIGMA_MAX` | 3.0 | Zona maxima (evita zona sin sentido) |

### Modelo hibrido: Bayesiano (centro) + EMA (varianza)

**Fundamento del centro (Normal-Normal conjugado)**:

El parametro de interes es el "verdadero centro" del usuario μ.
- Prior: μ ~ N(μ₀, σ₀²)
- Likelihood: xᵢ ~ N(μ, τ²), cada check-in es observacion ruidosa
- Posterior: se actualiza incrementalmente con cada check-in

**Update incremental (online, un check-in a la vez)**:
```
P₀ = 1/σ₀²                             // precision inicial del prior
P_{n+1} = min(P_n + 1/τ², MAX_PRECISION) // precision crece por check-in, limitada al cap
α_eff = (1/τ²) / P_{n+1}               // alpha efectivo (disminuye con el tiempo)
μ_{n+1} = μ_n + α_eff × (x − μ_n)     // update del centro
```

**Tabla de alpha efectivo (arousal, τ²=2.0, P₀=0.444)**:

| n check-ins | P_arousal | α efectivo | Interpretacion |
|---|---|---|---|
| 0 (prior puro) | 0.444 | — | Prior activo, sin personalizacion |
| 1 (post check-in 14) | 7.444 | 0.067 | Primera actualizacion: aprende rapido |
| 6 | 10.444 | 0.048 | Convergiendo |
| 22 | 18.444 | 0.027 | Modelo estable |
| 36+ | 25.000 (cap) | 0.020 | Maximo de estabilidad; sigue adaptando |

**Varianza (EMA, alpha fijo)**:
```
σ²_{n+1} = SIGMA_EMA_ALPHA × (x − μ_{n+1})² + (1 − SIGMA_EMA_ALPHA) × σ²_n
σ_{n+1} = clamp(sqrt(σ²_{n+1}), SIGMA_MIN, SIGMA_MAX)
// Se usa μ_{n+1} (ya actualizado) para el calculo de desviacion
```

### Clasificacion de zona

- Verde: max(|dA|, |dV|) <= 1σ — ambos ejes dentro de la zona habitual
- Amarillo: 1σ < max <= 2σ — un eje ligeramente fuera
- Rojo: max > 2σ — fuera de zona habitual en al menos un eje
- dA = (arousal − center_arousal) / sigma_arousal (con signo)
- dV = (valence − center_valence) / sigma_valence (con signo)

### Deteccion de deriva (DriftAlert)

Logica de snapshot semanal:
1. Al crear ZoneProfile: prev_center = null, snapshot_date = null
2. Cuando daysSince(snapshot_date) >= 7 O snapshot_date IS NULL Y daysSince(created_at) >= 7:
   - Comparar center actual vs prev_center
   - Si max(|dA|, |dV|) > DRIFT_THRESHOLD: generar DriftAlert
   - Recalibrar precision a P_recal = P₀ + MIN_SAMPLES × (1/τ²) = 7.444
   - Actualizar prev_center al center actual y snapshot_date a now()

### Cuadrantes y escalamiento

- Cuadrante I (alta energia + bajo agrado): desactivacion.
- Cuadrante II (alta energia + alto agrado): validacion + prevencion.
- Cuadrante III (baja energia + bajo agrado): activacion.
- Cuadrante IV (baja energia + alto agrado): validacion.
- Escalamiento: Verde → sin interrupcion; Amarillo → oferta de tecnica; Rojo → coach inmediato; Persistencia >= 3d → sugerencia de apoyo profesional.
- Persistencia con deriva → prioridad maxima de escalamiento (antes de zona roja).

---

## Arquitectura de seguridad — Resumen

- Contrasenas: Argon2id (m=65536, t=3, p=4). Sprint 2: migrado desde bcrypt. Compatibilidad retroactiva para hashes bcrypt existentes.
- Cifrado en transito: TLS 1.3 obligatorio; HSTS.
- Cifrado en reposo: AES-256-GCM para datos sensibles (nota de check-in, notas de sesiones de coach); clave derivada desde ENCRYPTION_KEY (env).
- Separacion de stores: PII y eventos en bases de datos distintas, vinculadas solo por UUID interno.
- Log de auditoria append-only: todo acceso a datos sensibles queda registrado con actor, recurso, motivo y timestamp.
- Panel empresa recibe solo datos de la capa de AGREGADOS, nunca de PII ni EVENTOS directamente.
- Rate limiting: interfaz abstracta RateLimiter. MemoryRateLimiter en dev/staging sin REDIS_URL; RedisRateLimiter en produccion con REDIS_URL (Sprint 3).
- OTP: SHA-256 del codigo almacenado; max 3 intentos; expira en 10 min; cooldown de 60 s entre reenvios.

---

## Principios de diseno de producto

- "Calma + claridad": UI tipo tarjetas redondeadas, microcopy empatico.
- Modulo de medicion (cuadrante/sliders) con cromatica neutral para evitar sesgos de respuesta.
- Accesibilidad: contraste, tamanos tactiles, sin dependencia exclusiva del color.
- Lenguaje: siempre de "estado", "energia", "zona habitual". Nunca de diagnostico, trastorno o patologia.
- No punitivo: la empresa ve tendencias, no personas; los datos no se usan para evaluacion de desempeno.
- Escalamiento empatico: sin alarmismo; las sugerencias de apoyo profesional son invitaciones, no alarmas.

---

## Stack tecnico

- Framework: Next.js 14 (App Router, TypeScript)
- Base de datos: Prisma ORM + SQLite (dev) / PostgreSQL (prod)
- Auth: JWT con jose, cookies httpOnly, Argon2id (Sprint 2: migrado desde bcrypt)
- Cifrado en reposo: Node.js crypto (AES-256-GCM), clave desde ENCRYPTION_KEY env
- Rate limiting: interfaz RateLimiter abstracta; MemoryRateLimiter (dev); RedisRateLimiter con ioredis (prod, Sprint 3)
- Email: abstraccion sobre Resend (dev: console log; prod: configurar RESEND_API_KEY)
- Notificaciones push: Web Push con VAPID (web-push); Expo Push para cliente nativo (Sprint 3/4)
- Estilos: CSS Modules + custom properties (sin Tailwind ni Bootstrap)
- Iconos: SVG inline (sin dependencia de libreria de iconos)
- Deploy objetivo: Vercel + Railway (PostgreSQL)

## Variables de entorno requeridas

| Variable | Descripcion | Requerida en prod | Sprint |
|---|---|---|---|
| `DATABASE_URL` | URL de SQLite (dev) o PostgreSQL (prod) | SI | S1 |
| `JWT_SECRET` | Secreto para firmar JWT (min 32 chars) | SI | S1 |
| `ENCRYPTION_KEY` | 64 hex chars = 32 bytes para AES-256-GCM | SI | S2 |
| `RESEND_API_KEY` | API key de Resend para envio de OTP emails | SI | S2 |
| `EMAIL_FROM` | Direccion remitente (e.g. noreply@aruosal.app) | SI | S2 |
| `REDIS_URL` | URL de Redis (Upstash o Railway) para rate limiting | SI (multi-instancia) | S3 |
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY` | Clave VAPID publica para Web Push | SI (notificaciones) | S3 |
| `VAPID_PRIVATE_KEY` | Clave VAPID privada para Web Push | SI (notificaciones) | S3 |
| `VAPID_SUBJECT` | Email o URL del responsable del push (`mailto:...`) | SI (notificaciones) | S3 |
| `CRON_SECRET` | Secreto para autenticar Vercel Cron en /api/cron/notifications | SI (notificaciones) | S5 |
| `NEXT_PUBLIC_APP_URL` | URL base de la app (e.g. https://aruosal.app) para links en emails ARCO | SI | S5 |

## Dependencias por sprint

| Paquete | Proposito | Comando | Sprint |
|---|---|---|---|
| `argon2` | Hashing de contrasenas Argon2id | `npm install argon2` | S2 |
| `resend` | Envio de emails OTP en produccion | `npm install resend` | S2 |
| `ioredis` | Cliente Redis para rate limiting en produccion | `npm install ioredis` | S3 |
| `web-push` | Notificaciones Web Push con VAPID | `npm install web-push` | S3 |

---

## Modelos Prisma — Resumen completo

### Modelos existentes (Sprint 1-2)
- `User`: autenticacion, rol, tema, turno
- `Consent`: registro inmutable LFPDPPP
- `OtpCode`: codigos de un solo uso
- `EmotionalLog`: check-ins con nota cifrada
- `ZoneProfile`: perfil de zona optima personal
- `RecommendationLog`: trazabilidad de intervenciones
- `CoachSession`: sesiones con notas cifradas

### Cambios en ZoneProfile (Sprint 3)
```
precision_arousal   Float    @default(0.444)  // 1/1.5² — precision Bayesiana
precision_valence   Float    @default(0.309)  // 1/1.8²
prev_center_arousal Float?   // snapshot para deteccion de deriva
prev_center_valence Float?
snapshot_date       DateTime? // fecha del ultimo snapshot de 7 dias
```

### Modelos nuevos (Sprint 5)

**EscalationEvent** — eventos de escalamiento automatico por persistencia, desviacion critica o deriva:
```
id, user_id, trigger_type ("persistence_3d"|"persistence_5d"|"critical_deviation"|"drift_confirmed"),
escalation_level ("gentle_suggestion"|"coach_offer"|"immediate_coach"),
zone_color, persistence_days, deviation_sigma_max, quadrant,
message_key (clave de microcopy por cuadrante + trigger),
status ("pending"|"acknowledged"|"dismissed"|"completed"),
triggered_at, acknowledged_at, dismissed_at, created_at
@@index([user_id, status, triggered_at])
```

**ArcoRequest** — solicitudes ARCO con SLA legal:
```
id, user_id, request_type ("access"|"rectification"|"cancellation"|"opposition"),
status ("pending"|"in_progress"|"completed"|"rejected"),
description (opcional), response_notes_encrypted (AES-256-GCM),
submitted_at, due_at (submitted_at + 15 dias habiles Mexico),
completed_at, assigned_to (privacy admin user_id), created_at, updated_at
@@index([user_id, status])
@@index([status, due_at])
```

**NotificationSchedule** — cola de notificaciones para Vercel Cron:
```
id, user_id, notification_type ("checkin_reminder"|"risk_alert"|"followup"|"drift_alert"|"arco_update"),
scheduled_for, status ("pending"|"processing"|"sent"|"failed"|"cancelled"),
payload_json, sent_at, error_message, retry_count Int @default(0), created_at
@@index([status, scheduled_for])
@@index([user_id, notification_type, scheduled_for])
```

**AuditLog** — registro append-only de accesos y eventos criticos (retencion 3 anos):
```
id, actor_id (user_id o "SYSTEM"), actor_role, action (ver tabla de acciones),
resource_type ("EmotionalLog"|"User"|"ArcoRequest"|"CoachSession"|...),
resource_id, company_id, ip_address, user_agent, details_json, created_at
SIN relacion a User — inmutabilidad: persiste aunque se elimine el usuario
@@index([actor_id, created_at])
@@index([action, created_at])
@@index([resource_type, resource_id])
```

**Campos nuevos en User (Sprint 5)**:
```
push_enabled              Boolean   @default(true)
push_checkin_reminder     Boolean   @default(true)
push_risk_alerts          Boolean   @default(true)
notification_time         String    @default("09:00")  // HH:MM UTC
coach_data_access_enabled Boolean   @default(false)    // opt-in para que coach vea resumen
is_deleted                Boolean   @default(false)
deleted_at                DateTime?
jwt_invalidated_at        DateTime? // invalidacion inmediata post-ARCO cancelacion
```

### Modelos nuevos (Sprint 4)

**AggregateSnapshot** — totales diarios anonimizados por empresa (sin user_id):
```
id, company_id, date, active_user_count, checkin_count,
sum_arousal, sum_valence,
zone_green_count, zone_yellow_count, zone_red_count,
q1_count, q2_count, q3_count, q4_count,
drift_count, persistence_count,
avg_sigma_arousal, avg_sigma_valence,
created_at, updated_at
@@unique([company_id, date])
```

**OrganizationAlert** — alertas organizacionales automaticas:
```
id, company_id, alert_type, severity ("warning"|"critical"),
threshold_value, message, period_start, period_end,
detected_at, acknowledged_at, acknowledged_by
@@unique([company_id, alert_type, period_start])
```

**Campo `role` en User**:
```
role String @default("worker")
// "worker" | "coach" | "company_admin" | "system_admin"
```

### Modelos nuevos (Sprint 3)

**DriftAlert** — alerta de cambio en patron emocional:
```
id, user_id, detected_at, axis ("arousal"|"valence"|"both"),
shift_magnitude (float, sigmas), shift_direction ("higher"|"lower"),
snapshot_arousal, snapshot_valence, current_arousal, current_valence,
acknowledged_at (nullable)
```

**PushSubscription** — suscripciones Web Push:
```
id, user_id, endpoint, keys_p256dh, keys_auth, is_active, created_at, updated_at
@@unique([user_id, endpoint])
```

---

## Patron de archivos del proyecto (Next.js 14 App Router) — Post Sprint 5

```
src/
  app/
    (auth)/               login · register · consent
    (app)/                dashboard · checkin · coach · profile · progress
                          history (S5) · arco · arco/nueva · arco/[id] (S5)
    (company)/            dashboard · analytics · alerts · nom-035 (S4)
    (admin)/              arco · arco/[id] (S5 — privacy admin)
    api/auth/             register · login · consent
    api/checkin/          POST (guardar + Bayesian + aggregate + escalamiento async S5)
                          GET (historial con limit/offset/from/to/zone + audit S5)
    api/progress/         GET (insights + sparkline + zona)
    api/coach/            sessions/
    api/user/             theme · profile (S3)
    api/drift-alerts/     GET (S3)
    api/notifications/    subscribe (S3)
    api/company/          dashboard (con ?shift= S5) · people-analytics · alerts · nom-035 (S4)
    api/company/alerts/   [id]/acknowledge (S4)
    api/company/nom-035/  export (S4)
    api/admin/            users (S4)
    api/arco/             POST · GET (S5)
    api/arco/[id]/        GET (S5)
    api/admin/arco/[id]/  PATCH (S5 — privacy admin)
    api/escalation/       GET (evento activo del worker) (S5)
    api/escalation/[id]/  PATCH (dismiss | acknowledge) (S5)
    api/cron/notifications/ GET (Vercel Cron, x-cron-secret) (S5)
  components/
    ui/                   Button · Input · Card
    checkin/              EmotionalQuadrant
    dashboard/            ZoneIndicator · StateCard · RecommendationCard · DeviationCard (S3)
                          EscalationCard (S5)
    layout/               BottomNav · CompanyNav (S4)
    coach/                PersistenceAlert (S3)
    company/              KpiCard · ZoneBar · AlertCard · NOM035Indicator (S4)
    history/              CheckinHistoryItem · HistoryFilters · ZoneBadge (S5)
    arco/                 ArcoForm · ArcoStatusBadge · ArcoRequestCard (S5)
    notifications/        NotificationToggle (S5)
  lib/
    db                    Prisma client
    auth                  JWT + getCurrentUser + requireRole (S4)
    zone                  Bayesian update + getDeviationDetail + checkDrift (S3)
    recommendations       getEnrichedRecommendations v2 (anti-repeticion + historial S5)
    insights              calculateInsights + calcPersistenceDays (S3)
    aggregate             updateAggregateSnapshot (async no-await S5) + buildDashboard +
                          buildPeopleAnalytics + filtro por turno con k-anonimato (S5)
    alerts                evaluateOrganizationAlerts + buildNOM035Indicators (S4)
    escalation            evaluateEscalation · createEscalationEvent · getActiveEscalation (S5)
    audit                 audit() — helper append-only, 18 acciones tipadas (S5)
    arco                  calcBusinessDueDate · submitArcoRequest · processArcoCancellation (S5)
    notifications         scheduleNotification · deliverNotification (S5)
    cron                  processPendingNotifications — usado por /api/cron/notifications (S5)
    crypto                AES-256-GCM
    rateLimit             RateLimiter · MemoryRateLimiter · RedisRateLimiter (S3)
    otp                   OTP flow
    email                 Resend abstraction
    push                  Web Push + VAPID (S3)
  types/                  index.ts — UserRole · CompanyDashboard · PeopleAnalytics ·
                          OrganizationAlert · NOM035Indicator (S4) ·
                          EscalationEvent · ArcoRequest · AuditAction ·
                          NotificationSchedule (S5)
  vercel.json             crons: /api/cron/notifications, schedule "0 * * * *" (S5)
```

---

## Decisiones tecnicas registradas

### Sprint 1-2
- El cuadrante NUNCA usa tokens de color del tema activo. Fondo `#F5F5F5`, punto `#2E2E2E`.
- Sliders y cuadrante estan sincronizados bidirecccionalmente en tiempo real.
- La zona optima se calcula en el servidor en cada check-in (no en el cliente).
- El JWT contiene `has_consent` y `theme` para que el middleware y el layout puedan operar sin consultar DB.
- Rate limiting migrado a interfaz abstracta `RateLimiter`: MemoryRateLimiter en dev, Redis-ready para prod.
- OTP de consentimiento: codigo SHA-256 en DB, max 3 intentos, 10 min de expiracion, cooldown 60 s entre reenvios.
- La nota del check-in y las notas de sesion de coach se cifran con AES-256-GCM usando ENCRYPTION_KEY.
- ThemeProvider: optimistic update local + persistencia en DB via PATCH /api/user/theme. Sin flash en primer render (lee del JWT en el servidor).
- El campo `note` del modelo EmotionalLog se renombro a `note_encrypted` en Sprint 2. Requiere migracion de datos existentes si los hay.
- La pantalla de Progreso es Server Component; la de Coach es Client Component (necesita estado para carga de sesiones).
- El BottomNav tiene 5 tabs: Inicio · Progreso · [+] Registrar · Coach · Yo.
- Compatibilidad retroactiva bcrypt → Argon2id: verifyPassword detecta el prefijo del hash (`$2a$`, `$2b$`) y usa el verificador correcto.
- Los estados de urgencia (verde/amarillo/rojo) siempre se comunican con icono + texto + color, nunca solo con color.
- Insights de la pantalla de Progreso: trend por comparacion de primera vs segunda mitad de la ventana; streak por dias consecutivos con check-in; persistence_alert si 3+ dias consecutivos todos fuera de verde.

### Sprint 3
- **Bug critico resuelto**: POST /api/checkin usaba `update` condicional en ZoneProfile — el registro nunca se creaba en el primer check-in. Corregido con `upsert`.
- **Modelo Bayesiano Normal-Normal**: el centro de la zona usa precision tracking (P₀ + n/τ²). La varianza sigue con EMA alpha=0.1. τ²=2.0 calibrado para escala 1–10.
- **DeviationDetail**: nuevo objeto de respuesta con desviacion por eje en sigmas con signo y direccion.
- **checkDrift(): snapshot de 7 dias**: prev_center + snapshot_date en ZoneProfile.
- **getEnrichedRecommendations()**: coach_chat sube a primera posicion con persistenceDays >= 3 y zona != verde.
- **Redis activable con REDIS_URL**: switch por presencia de variable de entorno.

### Sprint 5
- **EscalationEvent async + dedup 24 h**: se crea despues del check-in sin bloquear la respuesta; deduplicacion por (user_id, trigger_type, ventana 24 h) evita spam sin perder urgencia.
- **Tres niveles de escalamiento**: `gentle_suggestion` (drift) → `coach_offer` (persistence_3d) → `immediate_coach` (persistence_5d + critical_deviation). Microcopy distinto por cuadrante.
- **EscalationCard en dashboard**: siempre ofrece "Estoy bien, gracias" como salida digna. Linea de la Vida (800 911 2000) visible SOLO en `immediate_coach`.
- **ArcoRequest con SLA real**: `calcBusinessDueDate()` descuenta fines de semana + festivos federales Mexico 2026. Acuse de recibo por email inmediato y automatico.
- **ARCO Cancelacion**: anonimiza `EmotionalLog` (pseudoanonimizacion del user_id), borra PII de `User`, recalcula `AggregateSnapshot`, invalida JWT via `jwt_invalidated_at`. El `AuditLog` de la cancelacion persiste.
- **NotificationSchedule + Vercel Cron**: desacopla creacion del trigger de la entrega. Cron hourly, batch 100, status atomico `processing` evita doble envio. Retry hasta 3 intentos; 410 Gone de push → marcar `PushSubscription.is_active = false` y reintentar por email.
- **AuditLog append-only**: sin UPDATE/DELETE sobre la tabla. Helper `audit()` lanza excepcion en acciones criticas (ARCO, consent); `.catch(console.error)` en acciones secundarias. Retencion 3 anos.
- **18 acciones auditadas**: LOGIN_SUCCESS/FAILED, LOGOUT, CONSENT_GRANTED/REVOKED, VIEW_CHECKIN_HISTORY, VIEW_ZONE_PROFILE, COACH_VIEW_WORKER_DATA, COACH_SESSION_CREATED, ARCO_SUBMITTED/STATUS_CHANGED/CANCELLATION_EXECUTED/DATA_EXPORTED, COMPANY_DASHBOARD/ANALYTICS/NOM035_EXPORTED, USER_ROLE_CHANGED, ESCALATION_DISMISSED/ACKNOWLEDGED.
- **Coach opt-in**: campo `coach_data_access_enabled` en `User`. Coach ve resúmenes agregados (sin `EmotionalLog` raw). Cada acceso del coach genera `AuditLog`.
- **GET /api/checkin con filtros**: acepta `limit`/`offset`/`from`/`to`/`zone`; retorna `{ items, total, hasMore }`; `note_encrypted` excluida del listado (solo en exportacion ARCO).
- **updateAggregateSnapshot sin await**: llamada como Promise flotante con `.catch(console.error)` — no bloquea la respuesta al trabajador.
- **Filtro por turno en dashboard empresa**: k-anonimato por turno; si `shift_count < 5` → `insufficient_data` (mismo mecanismo que k-anonimato general).
- **calcBusinessDueDate(from, 15)**: itera dias calendario descartando sabados, domingos y 7 festivos federales de Mexico 2026. Extensible agregando festivos por ano.
- **getEnrichedRecommendations() v2**: filtra tecnicas usadas en ultimas 24 h via `RecommendationLog`; detecta tendencia de empeoramiento en ultimos 3 check-ins para priorizar "descanso/activacion".
- **vercel.json con cron**: `"0 * * * *"` en `/api/cron/notifications`. `CRON_SECRET` en header `x-cron-secret` para autenticacion.

### Sprint 4
- **Arquitectura de dos capas**: POST /api/checkin actualiza EmotionalLog (PII, capa trabajador) y AggregateSnapshot (sin user_id, capa empresa) de forma separada. Las rutas empresariales NUNCA tocan EmotionalLog.
- **K-anonimato en capa API, no en datos**: AggregateSnapshot guarda conteos reales. La API retorna `insufficient_data` si `active_user_count < 5`. Si un usuario ejerce ARCO Cancelacion, el snapshot se recalcula; si baja de k, la API redacta sin eliminar historico.
- **RBAC via JWT**: 4 roles (worker, coach, company_admin, system_admin). `role` y `company_id` en el payload del JWT. `requireRole()` helper en lib/auth.ts — cada ruta es responsable de su propio control.
- **company_admin ve solo su company_id**: todas las queries empresariales usan `user.company_id` del JWT, nunca un parametro del body. Proteccion contra acceso cruzado entre empresas.
- **OrganizationAlert deduplicada**: `@@unique([company_id, alert_type, period_start])` evita spam de alertas. Maximo una alerta por tipo por dia.
- **NOM-035 es complementario, no formal**: el disclaimer legal es obligatorio en cada pantalla y en el CSV exportado. Lenguaje: "indicador proxy" y "referencia", nunca "evaluacion formal" ni "riesgo clinico".
- **updateAggregateSnapshot re-consulta el dia completo**: re-query de todos los logs de la empresa para el dia (simple, adecuado para MVP). Candidato a optimizacion con sumas incrementales en S6.
- **evaluateOrganizationAlerts asincrono**: se evalua despues de cada actualizacion de snapshot pero no bloquea la respuesta del trabajador.
- **Reordenamiento de sprints**: S4 = Panel Empresa (antes S5). S5 = Escalamiento + ARCO + Historial + Push (consolida S4 original + deuda S3).
- **Modelo Bayesiano Normal-Normal**: el centro de la zona usa precision tracking (P₀ + n/τ²). La varianza sigue con EMA alpha=0.1. τ²=2.0 calibrado para escala 1–10.
- **MAX_PRECISION=25.0**: el alpha efectivo nunca baja de 0.02 — el modelo siempre sigue aprendiendo.
- **Recalibracion post-deriva**: cuando drift > 1.5σ, la precision se resetea a P₀ + MIN_SAMPLES/τ² = 7.444. El centro NO se resetea.
- **DeviationDetail**: nuevo objeto en la respuesta del check-in con desviacion por eje (sigmas, con signo y direccion). Permite explicaciones especificas ("Tu energia estuvo 1.3 desv. por encima").
- **checkDrift(): snapshot de 7 dias**: prev_center + snapshot_date en ZoneProfile. Solo compara cuando han pasado >= 7 dias desde el ultimo snapshot. Al detectar deriva, siempre renueva el snapshot.
- **getEnrichedRecommendations()**: recibe persistenceDays y trend. Con persistenceDays >= 3 y zona != verde: coach_chat sube a primera posicion.
- **Redis activable con REDIS_URL**: el singleton `rateLimiter` detecta la variable de entorno en tiempo de inicio y elige la implementacion. Sin REDIS_URL: MemoryRateLimiter con warning en consola.
- **Profile page (/profile)**: Server Component. Lee de GET /api/user/profile. Muestra zona personal, sample_count, toggle de tema, links de privacidad.
- **PushSubscription**: schema definido en Prisma. API /api/notifications/subscribe especificada. Entrega con Web Push + VAPID. Scheduler de notificaciones: Sprint 4 (requiere Vercel Cron o proceso background).
- **calcPersistenceDays()**: nueva funcion en insights.ts que retorna el numero de dias consecutivos recientes con todos los check-ins fuera de verde. Opera sobre el array en memoria (mismo query que calculateInsights).

---

## Roadmap de sprints (resumen)

| Sprint | Tema | Semanas | Estado |
|---|---|---|---|
| 1 | Auth + Consentimiento + Check-in + Dashboard + Recomendaciones base | 1–2 | COMPLETADO 2026-03-23 |
| 2 | OTP consent + Argon2id + Cifrado reposo + Progreso + Coach + ThemeProvider + Insights base | 3–4 | COMPLETADO 2026-03-23 |
| 3 | Bayesian zone model + Drift detection + DeviationDetail + Redis rate limiting + Profile page | 5–6 | COMPLETADO 2026-03-23 |
| 4 | Panel Empresa + RBAC + People Analytics + NOM-035 + Alertas organizacionales | 7–8 | COMPLETADO 2026-03-23 |
| 5 | Escalamiento automatico + Historial + ARCO in-app + Push scheduler + Log de auditoria | 9–10 | COMPLETADO 2026-03-23 |
| 6 | Accesibilidad WCAG AA + QA + Metricas + Deploy | 11–12 | Pendiente |

---

## Deuda tecnica — Post Sprint 5

| Item | Descripcion | Sprint objetivo |
|---|---|---|
| Email en produccion | Requiere configurar RESEND_API_KEY con proveedor real + SPF/DKIM | Antes de deploy |
| Migracion campo note | note → note_encrypted para datos previos a S2 | Inmediato si hay datos reales |
| Cron de anonimizacion | EmotionalLogs > 24 meses deben anonimizarse automaticamente | S6 |
| Diferencial de privacidad | k-anonimato en S5 suficiente para MVP; noise addition puede agregarse | S6 |
| AuditLog particion por mes | Tabla crece rapido en produccion; particionar por mes en PostgreSQL | S6 |
| ARCO Acceso — exportacion cifrada | Exportar datos del usuario como CSV cifrado al email; pendiente implementacion del archivo | S6 |
| ARCO Oposicion — bloqueo granular | Campo `is_processing_blocked` en User para bloquear solo nuevos check-ins sin eliminar datos | S6 |
| Festivos Mexico 2027+ | calcBusinessDueDate tiene hardcoded festivos 2026; actualizar tabla anualmente | Mantenimiento |
| Coach acceso granular | Coach actualmente ve resumen; permitir vista detallada con consentimiento explicito adicional | S6 |
| Preferencias de notificacion UI | NotificationToggle y horario en Profile pendiente (campos en User disponibles en S5) | S6 |

---

## Metricas de exito (piloto 3 meses)

| Metrica | Meta | Forma de medicion |
|---|---|---|
| Adherencia a check-ins | >= 65% completados / programados | Log de eventos sin PII |
| NPS mensual in-app | >= +30 | Encuesta in-app opcional |
| Utilidad percibida de recomendaciones | >= 70% responden "util" | Encuesta post-intervencion |
| Fatiga de notificaciones (tasa de silenciado) | <= 20% en primeras 2 semanas | Log de configuracion de notificaciones |
| Seguridad psicologica percibida | >= 80% responden "si" | Encuesta trimestral anonima (no vinculada a UUID) |
| Uso de escalamiento | >= 25% de sesiones en zona roja terminan con interaccion de coach | Log de escalamientos anonimo |
| Tiempo de check-in p95 | <= 20 segundos | Metricas de UX (duracion del flujo) |
| Tasa de revocacion de consentimiento | <= 5% en primeros 30 dias | Log de consentimientos |
| Errores criticos de accesibilidad reportados | 0 en piloto | Reportes in-app + auditoria manual |
| Incidentes de seguridad | 0 | Log de auditoria + SIEM |
| Usuarios con zona personalizada (>= 14 check-ins) | >= 50% al mes 1 | Log de zone_profiles |
| DriftAlerts resueltos sin escalamiento | >= 70% | Log de drift_alerts acknowledged |

---

## Artefactos de referencia

Los siguientes artefactos fueron entregados en especificaciones anteriores:

- **RBAC completo**: tabla de 4 roles x 14 recursos/acciones (especificacion v1.1 — 2026-03-23).
- **Biblioteca de intervenciones**: tabla cuadrante x urgencia con 12+ tecnicas (Sprint 1).
- **Checklist MVP**: 15 items verificables para el lanzamiento piloto.
- **Wireframes textuales**: 9 pantallas (Home, Check-in, Resultado, Recomendaciones, Coach, Progreso, Profile — Sprint 3).
- **Diagramas Mermaid**: flujo de onboarding + arquitectura de datos + flujo Sprint 3.
- **Especificacion matematica del modelo**: Normal-Normal conjugado + parametros calibrados (Sprint 3).
- **Sprint 5**: wireframes de EscalationCard, Historial, ARCO form/status; diagramas Mermaid de escalamiento automatico, flujo ARCO completo, arquitectura de notificaciones; pseudocodigo de evaluateEscalation, calcBusinessDueDate, audit(), processPendingNotifications, getEnrichedRecommendations v2 (anti-repeticion + historial reciente).
