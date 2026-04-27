║                                      ║
  ║  ┌─────────────┐ ┌──────────────┐    ║
  ║  │ Esta semana │ │ Consejo      │    ║  ← tarjetas pequenas 2 col
  ║  │ 4 de 6 ✓   │ │ del dia      │    ║
  ║  └─────────────┘ └──────────────┘    ║
  ║                                      ║
  ╠══════════════════════════════════════╣
  ║  [Home]  [Check-in+]  [Coach]  [Yo]  ║  ← bottom nav, 48dp items
  ╚══════════════════════════════════════╝

  Notas de componente: El boton "Check-in+" en la nav central es el FAB equivalente; 64dp, color acento principal. La tarjeta CTA pulsa suavemente (animacion    
  scale 1.0→1.02 en idle) para llamar la atencion sin molestar.

  ---
  Pantalla 2 — CHECK-IN (cuadrante)

  ╔══════════════════════════════════════╗
  ║  [←]   Como te sientes ahora         ║  ← titulo title-sm, back ghost
  ║  Turno matutino · 11:04 am           ║  ← caption slate
  ╠══════════════════════════════════════╣
  ║                                      ║
  ║  ┌─── CUADRANTE (fondo neutral) ──┐  ║
  ║  │  Alta energia                  │  ║  ← etiqueta caption gris neutro
  ║  │  ↑                             │  ║
  ║  │  │         [●]                 │  ║  ← punto draggable 28pt, #3A3A3A
  ║  │  │                             │  ║
  ║  │  │                             │  ║
  ║  │ ──────────────────────── →     │  ║
  ║  │  Poco agrado    Mucho agrado    │  ║
  ║  │  ↓                             │  ║
  ║  │  Poca energia                  │  ║
  ║  └────────────────────────────────┘  ║
  ║  Fondo: #F5F5F5  Sin colores tema    ║
  ║                                      ║
  ║  — o usa los deslizadores —          ║  ← texto caption, separador
  ║                                      ║
  ║  Energia     [────●────────]  7      ║  ← slider 8pt track, 32pt thumb
  ║  Agrado      [──────●──────]  5      ║  ← mismo style
  ║                                      ║
  ║  ¿Quieres agregar una nota?          ║  ← link secundario, opcional
  ║                                      ║
  ║  [  Registrar estado  ]              ║  ← boton primario full-width
  ╠══════════════════════════════════════╣
  ║  [Home]  [Check-in+]  [Coach]  [Yo]  ║
  ╚══════════════════════════════════════╝

  Notas de componente: El cuadrante y los sliders son equivalentes (sincronizados en tiempo real). Las etiquetas del cuadrante son solo texto neutro, sin color. 
  El punto draggable deja un rastro de opacidad 20% para feedback visual. Haptic feedback leve al soltar.

  ---
  Pantalla 3 — RECOMENDACIONES

  ╔══════════════════════════════════════╗
  ║  [←]   Para ti ahora                 ║
  ║  Basado en tu estado de las 11:04    ║  ← caption, timestamp
  ╠══════════════════════════════════════╣
  ║                                      ║
  ║  ┌────────────────────────────────┐  ║
  ║  │  Tu zona habitual              │  ║  ← tarjeta zona optica
  ║  │  Energia: 4.5–6.5              │  ║
  ║  │  Agrado: 5.5–7.5               │  ║
  ║  │  Hoy estas: energia alta (8.1) │  ║  ← texto clay/ib-red-soft
  ║  │  Zona amarilla                 │  ║  ← badge, no solo color:
  ║  │  [!] Ligeramente elevado       │  ║     icono + texto + bg
  ║  └────────────────────────────────┘  ║
  ║                                      ║
  ║  Aqui van algunas tecnicas:          ║  ← titulo section
  ║                                      ║
  ║  ┌────────────────────────────────┐  ║
  ║  │ Respiracion 4-7-8     5 min    │  ║  ← tarjeta intervencion
  ║  │ Exhala la tension del turno    │  ║
  ║  │          [Comenzar] [Guardar]  │  ║
  ║  └────────────────────────────────┘  ║
  ║                                      ║
  ║  ┌────────────────────────────────┐  ║
  ║  │ Pausa activa          3 min    │  ║
  ║  │ Estira cervicales y hombros    │  ║
  ║  │          [Comenzar] [Guardar]  │  ║
  ║  └────────────────────────────────┘  ║
  ║                                      ║
  ║  ┌────────────────────────────────┐  ║
  ║  │ Reappraisal guiado    4 min    │  ║
  ║  │ Nombra lo que sientes y suelta │  ║
  ║  │          [Comenzar] [Guardar]  │  ║
  ║  └────────────────────────────────┘  ║
  ║                                      ║
  ║  [Hablar con mi coach]               ║  ← secundario, siempre visible
  ╠══════════════════════════════════════╣
  ║  [Home]  [Check-in+]  [Coach]  [Yo]  ║
  ╚══════════════════════════════════════╝

  ---
  Pantalla 4 — COACH

  ╔══════════════════════════════════════╗
  ║  Coach y apoyo                       ║
  ╠══════════════════════════════════════╣
  ║                                      ║
  ║  ┌────────────────────────────────┐  ║
  ║  │  Coach disponible ahora        │  ║  ← tarjeta urgencia (si zona roja)
  ║  │  Tu estado esta fuera de       │  ║
  ║  │  tu zona habitual.             │  ║
  ║  │                                │  ║
  ║  │  [Llamar al coach]             │  ║  ← btn primario, icono telefono SVG
  ║  │  [Escribir por chat]           │  ║  ← btn secundario, icono mensaje SVG
  ║  └────────────────────────────────┘  ║
  ║                                      ║
  ║  Tu historial con el coach           ║  ← titulo section
  ║                                      ║
  ║  ┌────────────────────────────────┐  ║
  ║  │  Mar 18 · 10:22 am             │  ║  ← item sesion anterior
  ║  │  Sesion por chat · 8 min       │  ║
  ║  │  "Tecnica de respiracion"      │  ║  ← nota breve
  ║  └────────────────────────────────┘  ║
  ║                                      ║
  ║  Recursos siempre disponibles        ║  ← separador
  ║                                      ║
  ║  ┌────────────────────────────────┐  ║
  ║  │  Directorio de apoyo EAP       │  ║  ← tarjeta recurso
  ║  │  Psicologos y especialistas    │  ║
  ║  │  de tu empresa                 │  ║
  ║  │               [Ver directorio] │  ║
  ║  └────────────────────────────────┘  ║
  ║                                      ║
  ║  Linea de la Vida: 800 911 2000      ║  ← siempre visible, caption
  ║  (gratuita, 24/7)                    ║
  ╠══════════════════════════════════════╣
  ║  [Home]  [Check-in+]  [Coach]  [Yo]  ║
  ╚══════════════════════════════════════╝

  ---
  Pantalla 5 — PROGRESO

  ╔══════════════════════════════════════╗
  ║  Mi progreso                         ║
  ║  Marzo 2026                          ║  ← caption, selector mes
  ╠══════════════════════════════════════╣
  ║                                      ║
  ║  ┌────────────────────────────────┐  ║
  ║  │  Check-ins esta semana         │  ║  ← tarjeta adherencia
  ║  │  ████████████░░  4 de 6        │  ║  ← barra progreso lavender/teal
  ║  └────────────────────────────────┘  ║
  ║                                      ║
  ║  ┌────────────────────────────────┐  ║
  ║  │  Tu zona habitual              │  ║  ← tarjeta zona optica
  ║  │                                │  ║
  ║  │  Cuadrante de los ultimos 30d  │  ║
  ║  │  [mini-scatter-plot suave]     │  ║  ← puntos pequenos, zona resaltada
  ║  │  Zona verde: 68% del tiempo    │  ║  ← stat con icono, no solo color
  ║  │  Zona amarilla: 24%            │  ║
  ║  │  Zona roja: 8%                 │  ║
  ║  └────────────────────────────────┘  ║
  ║                                      ║
  ║  ┌────────────────────────────────┐  ║
  ║  │  Tendencia esta semana         │  ║  ← tarjeta tendencia
  ║  │  [linea chart suave, 7 dias]   │  ║  ← Chart.js o equivalente
  ║  │  Energia   ─── Agrado          │  ║  ← leyenda con icono + texto
  ║  └────────────────────────────────┘  ║
  ║                                      ║
  ║  ┌────────────────────────────────┐  ║
  ║  │  Tecnicas mas usadas           │  ║  ← tarjeta intervenciones
  ║  │  1. Respiracion 4-7-8 (8x)     │  ║
  ║  │  2. Pausa activa (5x)          │  ║
  ║  └────────────────────────────────┘  ║
  ╠══════════════════════════════════════╣
  ║  [Home]  [Check-in+]  [Coach]  [Yo]  ║
  ╚══════════════════════════════════════╝

  ---
  Pantalla 6 — PANEL EMPRESA (web/tablet, Admin Empresa)

  ╔══════════════════════════════════════════════════════════════╗
  ║  [LOGO INTRA]  Panel de Bienestar        [Admin] [Cerrar]    ║
  ╠══════════════════════════════════════════════════════════════╣
  ║  Empresa: TechCorp MX  |  Periodo: Mar 2026  |  [Exportar]  ║
  ╠═══════════════╦═══════════════╦══════════════╦══════════════╣
  ║               ║               ║              ║              ║
  ║   Adherencia  ║  Zona verde   ║  Escaladas   ║  Alertas     ║
  ║    78%        ║   61%         ║    14         ║   2 areas    ║
  ║  [▲ +3%]      ║  [▲ +5%]     ║  [─ igual]   ║  [ver]       ║
  ╠═══════════════╩═══════════════╩══════════════╩══════════════╣
  ║                                                              ║
  ║  Tendencia por area (ultimos 30 dias)                        ║
  ║                                                              ║
  ║  ┌───────────────────────────────────────────────────────┐   ║
  ║  │  Area Operaciones  ──  Area Atencion ──  Area Ventas  │   ║
  ║  │  [line chart suave, eje X = fechas, eje Y = % zona v] │   ║
  ║  └───────────────────────────────────────────────────────┘   ║
  ║                                                              ║
  ║  Distribucion de estados (turno matutino vs vespertino)      ║
  ║  ┌──────────────────────┐  ┌───────────────────────────┐    ║
  ║  │ [pie/donut chart]    │  │ [heat-map semanal suave]   │    ║
  ║  │ Verde 61% Amar 30%   │  │ Lu Ma Mi Ju Vi Sa Dom      │    ║
  ║  │ Rojo 9%              │  │ [celulas de intensidad]    │    ║
  ║  └──────────────────────┘  └───────────────────────────┘    ║
  ║                                                              ║
  ║  [!] Nota: datos anonimizados · grupos min. 5 personas       ║
  ║       No representan evaluacion individual de desempeno      ║
  ╚══════════════════════════════════════════════════════════════╝

  Notas: El panel empresa solo es accesible via web/tablet. Cada grafico tiene el disclaimer visible. Si un filtro de area resulta en grupo < 5, el sistema      
  muestra "Datos insuficientes para este filtro" sin revelar informacion.

  ---
  4. Modelo de zona optima — Especificacion

  Prior poblacional (semanas 1–2)

  - Centro inicial: Arousal = 5.2 ± 1.5, Valencia = 6.1 ± 1.8 (escala 1–10, ajustable por sector/turno via configuracion admin).
  - Zona verde: dentro de ±1σ en ambos ejes.
  - Zona amarilla: dentro de ±2σ (excluyendo verde) en al menos un eje.
  - Zona roja: fuera de ±2σ en cualquier eje.

  Personalización incremental (semana 3 en adelante)

  // Pseudocódigo — actualización después de cada check-in

  function actualizar_zona(usuario, arousal_nuevo, valencia_nueva):
    historial = obtener_ultimos_30_dias(usuario)

    si len(historial) < 14:
      devolver prior_poblacional  // colección silenciosa

    // Media móvil exponencial (alpha = 0.1 = más estable, 0.3 = más reactivo)
    mu_a  = EMA(historial.arousal, alpha=0.1)
    mu_v  = EMA(historial.valencia, alpha=0.1)

    // Desviación estándar rodante (ventana 14 días)
    sigma_a = std_rodante(historial.arousal, ventana=14)
    sigma_v = std_rodante(historial.valencia, ventana=14)

    // Umbrales
    verde   = dentro(arousal, mu_a ± sigma_a) Y dentro(valencia, mu_v ± sigma_v)
    amarillo = dentro(arousal, mu_a ± 2*sigma_a) Y dentro(valencia, mu_v ± 2*sigma_v)
    rojo    = fuera_de_amarillo

    devolver { centro: (mu_a, mu_v), sigma: (sigma_a, sigma_v),
               zona_actual: verde | amarillo | rojo }

  Actualización bayesiana (opcional, sprint 3+)

  // Para arousal (se aplica igual a valencia):
  // Prior:    Normal(mu_0=5.2, sigma_0=1.5)
  // Observación x_n tras n check-ins propios:
  // Posterior: mu_n = (sigma_0^-2 * mu_0 + n * sigma^-2 * x_barra)
  //                  / (sigma_0^-2 + n * sigma^-2)
  // Resultado: zona óptima converge gradualmente al patrón personal.

  Detección de deriva

  // Si el centro personal se desplaza > 1.5σ en 7 días consecutivos:
  // → señal interna al motor de recomendaciones
  // → opcional: notificar al coach (si el trabajador otorgó ese permiso)
  // → posible recalibración del prior personal
  // → NO se notifica al panel empresa en forma individual

  Explicabilidad para el usuario (copy)

  ▎ "Tu zona de calma habitual está entre 4.5 y 6.5 en energía, y entre 5.5 y 7.5 en agrado. Hoy estás en energía 8.1, que es un poco más alto que lo habitual   
  para ti. Por eso te sugerimos técnicas para bajar un poco el ritmo."

  ---
  5. Biblioteca de intervenciones

  ┌───────────────────┬────────────────────┬─────────────────────────────┬───────────────────────────────────────┬──────────────────────────────────────────┐    
  │     Cuadrante     │    Descripcion     │        Verde (zona)         │      Amarillo (cerca del limite)      │             Rojo (urgencia)              │    
  ├───────────────────┼────────────────────┼─────────────────────────────┼───────────────────────────────────────┼──────────────────────────────────────────┤    
  │ I — Alta energia  │ Estres, tension,   │ Respiracion 4-7-8 (3        │ Box breathing (4 min) · caminata      │ PMR express (5 min) · reappraisal guiado │    
  │ + bajo agrado     │ ansiedad           │ ciclos) · recordatorio de   │ breve 3 min · musica instrumental sin │  · [Coach ahora] · si 3+ dias:           │    
  │                   │                    │ pausa                       │  letra                                │ sugerencia de apoyo                      │    
  ├───────────────────┼────────────────────┼─────────────────────────────┼───────────────────────────────────────┼──────────────────────────────────────────┤    
  │ II — Alta energia │ Flujo, entusiasmo, │ Microcopy de validacion ·   │ Recordatorio de hidratacion ·         │ Prevencion de burnout · recordatorio de  │    
  │  + alto agrado    │  euforia           │ continuar                   │ micropause preventiva en 1h           │ cierre de jornada · [Coach]              │    
  ├───────────────────┼────────────────────┼─────────────────────────────┼───────────────────────────────────────┼──────────────────────────────────────────┤    
  │ III — Baja        │ Agotamiento,       │ Autocompasion guiada (2     │ Tecnica de 2 minutos (iniciar tarea   │ [Coach activacion] · si 3+ dias:         │    
  │ energia + bajo    │ desmotivacion      │ min) · musica motivadora    │ minima) · reactivacion postural · luz │ sugerencia de apoyo profesional          │    
  │ agrado            │                    │                             │  natural                              │                                          │    
  ├───────────────────┼────────────────────┼─────────────────────────────┼───────────────────────────────────────┼──────────────────────────────────────────┤    
  │ IV — Baja energia │ Calma, descanso,   │ Validar y celebrar ·        │ Respiracion estimulante si inicio de  │ Solo si persiste + contexto de fatiga:   │    
  │  + alto agrado    │ relajacion         │ microcopy de refuerzo       │ turno (2 min)                         │ orientacion sin diagnostico              │    
  └───────────────────┴────────────────────┴─────────────────────────────┴───────────────────────────────────────┴──────────────────────────────────────────┘    

  Niveles de urgencia y accion de escalamiento:

  ┌──────────────────────┬───────────────────────────────────────┬────────────────────────────────────────────────────────────────────────┐
  │        Nivel         │               Criterio                │                           Accion del sistema                           │
  ├──────────────────────┼───────────────────────────────────────┼────────────────────────────────────────────────────────────────────────┤
  │ Verde                │ Dentro de zona optima                 │ Solo feedback positivo, sin interrupcion                               │
  ├──────────────────────┼───────────────────────────────────────┼────────────────────────────────────────────────────────────────────────┤
  │ Amarillo             │ 1–2σ fuera de zona, primer dia        │ Ofrece tecnicas, no obliga                                             │
  ├──────────────────────┼───────────────────────────────────────┼────────────────────────────────────────────────────────────────────────┤
  │ Amarillo persistente │ 1–2σ fuera de zona, 2 dias seguidos   │ Push notification con tecnica + opcion de coach                        │
  ├──────────────────────┼───────────────────────────────────────┼────────────────────────────────────────────────────────────────────────┤
  │ Rojo                 │ Fuera de 2σ                           │ Pop-up con oferta de coach inmediato + tecnica de emergencia           │
  ├──────────────────────┼───────────────────────────────────────┼────────────────────────────────────────────────────────────────────────┤
  │ Rojo persistente     │ Zona roja o amarilla extrema ≥ 3 dias │ Tarjeta especial + sugerencia de apoyo profesional (copy no alarmista) │
  ├──────────────────────┼───────────────────────────────────────┼────────────────────────────────────────────────────────────────────────┤
  │ Crisis declarada     │ Usuario pulsa "estoy en crisis"       │ Numero de linea directa + coach inmediato                              │
  └──────────────────────┴───────────────────────────────────────┴────────────────────────────────────────────────────────────────────────┘

  ---
  6. RBAC — Roles y permisos

  ┌──────────────────────────────────────┬─────────────────────────┬──────────────────────────────────┬──────────────────┬──────────────────────────────────┐    
  │           Recurso / Accion           │       Trabajador        │              Coach               │  Admin Empresa   │          Privacy Admin           │    
  ├──────────────────────────────────────┼─────────────────────────┼──────────────────────────────────┼──────────────────┼──────────────────────────────────┤    
  │ Ver propios registros de estado      │ Completo                │ Solo con opt-in del trabajador   │ No               │ Solo con justificacion + log     │    
  ├──────────────────────────────────────┼─────────────────────────┼──────────────────────────────────┼──────────────────┼──────────────────────────────────┤    
  │ Ver zona optica propia               │ Completo                │ Solo con opt-in                  │ No               │ No                               │    
  ├──────────────────────────────────────┼─────────────────────────┼──────────────────────────────────┼──────────────────┼──────────────────────────────────┤    
  │ Ver historial de intervenciones      │ Completo                │ Solo con opt-in                  │ No               │ No                               │    
  │ propias                              │                         │                                  │                  │                                  │    
  ├──────────────────────────────────────┼─────────────────────────┼──────────────────────────────────┼──────────────────┼──────────────────────────────────┤    
  │ Iniciar sesion de coaching           │ Puede solicitar         │ Puede iniciar                    │ No               │ No                               │    
  ├──────────────────────────────────────┼─────────────────────────┼──────────────────────────────────┼──────────────────┼──────────────────────────────────┤    
  │ Ver notas de sesion de coaching      │ Propias completo        │ Propias + de sus asignados       │ No               │ Solo por ARCO                    │    
  │                                      │                         │ (opt-in)                         │                  │                                  │    
  ├──────────────────────────────────────┼─────────────────────────┼──────────────────────────────────┼──────────────────┼──────────────────────────────────┤    
  │ Ver datos individuales identificados │ Solo los propios        │ Solo con opt-in del trabajador   │ No               │ Con justificacion documentada +  │    
  │                                      │                         │                                  │                  │ log                              │    
  ├──────────────────────────────────────┼─────────────────────────┼──────────────────────────────────┼──────────────────┼──────────────────────────────────┤    
  │ Ver agregados de area/turno (k-anon  │ No                      │ No                               │ Completo         │ Completo                         │    
  │ ≥ 5)                                 │                         │                                  │                  │                                  │    
  ├──────────────────────────────────────┼─────────────────────────┼──────────────────────────────────┼──────────────────┼──────────────────────────────────┤    
  │ Exportar datos anonimizados          │ No                      │ No                               │ Restringido +    │ Completo + log                   │    
  │                                      │                         │                                  │ log              │                                  │    
  ├──────────────────────────────────────┼─────────────────────────┼──────────────────────────────────┼──────────────────┼──────────────────────────────────┤    
  │ Gestionar usuarios de la empresa     │ No                      │ No                               │ Completo         │ Completo                         │    
  ├──────────────────────────────────────┼─────────────────────────┼──────────────────────────────────┼──────────────────┼──────────────────────────────────┤    
  │ Configurar umbrales de alertas       │ No                      │ Puede proponer                   │ No               │ Puede autorizar                  │    
  │ empresa                              │                         │                                  │                  │                                  │    
  ├──────────────────────────────────────┼─────────────────────────┼──────────────────────────────────┼──────────────────┼──────────────────────────────────┤    
  │ Acceder a log de auditoria           │ No                      │ No                               │ No               │ Completo                         │    
  ├──────────────────────────────────────┼─────────────────────────┼──────────────────────────────────┼──────────────────┼──────────────────────────────────┤    
  │ Gestionar solicitudes ARCO           │ Solo las propias        │ No                               │ No               │ Gestiona todas                   │    
  │                                      │ (enviar)                │                                  │                  │                                  │    
  ├──────────────────────────────────────┼─────────────────────────┼──────────────────────────────────┼──────────────────┼──────────────────────────────────┤    
  │ Revocar consentimiento propio        │ Completo                │ No                               │ No               │ Puede ayudar                     │    
  ├──────────────────────────────────────┼─────────────────────────┼──────────────────────────────────┼──────────────────┼──────────────────────────────────┤    
  │ Ver reporte de cumplimiento LFPDPPP  │ No                      │ No                               │ Vista limitada   │ Completo                         │    
  ├──────────────────────────────────────┼─────────────────────────┼──────────────────────────────────┼──────────────────┼──────────────────────────────────┤    
  │ Configurar reglas de retencion       │ No                      │ No                               │ No               │ Completo                         │    
  └──────────────────────────────────────┴─────────────────────────┴──────────────────────────────────┴──────────────────┴──────────────────────────────────┘    

  Notas RBAC:
  - El opt-in del trabajador para "compartir historial con coach" es un consentimiento secundario, separado del principal. Puede revocarse en cualquier momento. 
  - Admin Empresa NUNCA accede a datos individuales, bajo ninguna configuracion por defecto. Para activar acceso individualizado se requeriria un nuevo aviso de 
  privacidad y consentimiento adicional del trabajador.
  - Todos los accesos a datos sensibles por parte de Privacy Admin quedan registrados en el log de auditoria con motivo de acceso, timestamp, y accion realizada.

  ---
  7. Backlog por sprints

  Sprint 1 — Fundacion + Privacidad + Onboarding (semanas 1–2)

  Objetivo: usuarios pueden registrarse, aceptar el aviso de privacidad, otorgar consentimiento expreso verificable, y configurar su turno.

  ┌─────┬───────────────────────────────────────────────────────┬───────────┬────────────────────────────────────────────────────────────────────────────────┐   
  │  #  │                       Historia                        │ Prioridad │                            Criterios de aceptacion                             │   
  ├─────┼───────────────────────────────────────────────────────┼───────────┼────────────────────────────────────────────────────────────────────────────────┤   
  │ 1.1 │ Registro con correo/contrasena + token empresa        │ P0        │ Cuenta creada, OTP de activacion enviado, contrasena hasheada con Argon2id     │   
  ├─────┼───────────────────────────────────────────────────────┼───────────┼────────────────────────────────────────────────────────────────────────────────┤   
  │ 1.2 │ Login con MFA (OTP SMS o email)                       │ P0        │ Sesion activa solo tras segundo factor; bloqueo tras 5 intentos fallidos       │   
  ├─────┼───────────────────────────────────────────────────────┼───────────┼────────────────────────────────────────────────────────────────────────────────┤   
  │ 1.3 │ Pantalla de aviso de privacidad (version corta +      │ P0        │ El usuario no puede continuar sin ver el aviso; log de visualizacion           │   
  │     │ enlace a completo)                                    │           │                                                                                │   
  ├─────┼───────────────────────────────────────────────────────┼───────────┼────────────────────────────────────────────────────────────────────────────────┤   
  │ 1.4 │ Consentimiento expreso: OTP + checkbox + hash +       │ P0        │ Registro inmutable en tabla de consentimientos; traza recuperable para ARCO    │   
  │     │ timestamp + IP                                        │           │                                                                                │   
  ├─────┼───────────────────────────────────────────────────────┼───────────┼────────────────────────────────────────────────────────────────────────────────┤   
  │ 1.5 │ Configuracion de turno (horario, zona horaria,        │ P0        │ Turno guardado; primeras notificaciones programadas correctamente              │   
  │     │ notificaciones)                                       │           │                                                                                │   
  ├─────┼───────────────────────────────────────────────────────┼───────────┼────────────────────────────────────────────────────────────────────────────────┤   
  │ 1.6 │ Revocacion de consentimiento desde Configuracion      │ P1        │ Usuario puede revocar; datos de bienestar dejan de registrarse; PII se retiene │   
  │     │                                                       │           │  solo el tiempo de ley                                                         │   
  ├─────┼───────────────────────────────────────────────────────┼───────────┼────────────────────────────────────────────────────────────────────────────────┤   
  │ 1.7 │ Formulario ARCO in-app                                │ P1        │ Solicitud enviada; acuse de recibo automatico; SLA 15 dias habiles visible     │   
  ├─────┼───────────────────────────────────────────────────────┼───────────┼────────────────────────────────────────────────────────────────────────────────┤   
  │ 1.8 │ Tour de onboarding (3 slides)                         │ P2        │ Skippable; muestra Home, Check-in, Coach                                       │   
  └─────┴───────────────────────────────────────────────────────┴───────────┴────────────────────────────────────────────────────────────────────────────────┘   

  Riesgos: Entrega tardía del token de empresa desde el cliente → bloquea 1.2. Mitigacion: modo demo con token provisional.

  ---
  Sprint 2 — Check-in + Cuadrante + Notificaciones (semanas 3–4)

  Objetivo: el trabajador puede registrar su estado y recibir notificaciones por turno.

  ┌─────┬─────────────────────────────────────────────────────┬───────────┬──────────────────────────────────────────────────────────────────────────────────┐   
  │  #  │                      Historia                       │ Prioridad │                             Criterios de aceptacion                              │   
  ├─────┼─────────────────────────────────────────────────────┼───────────┼──────────────────────────────────────────────────────────────────────────────────┤   
  │ 2.1 │ Pantalla de check-in con cuadrante draggable        │ P0        │ El punto se arrastra; valores arousal/valencia (1–10) se registran al soltar     │   
  ├─────┼─────────────────────────────────────────────────────┼───────────┼──────────────────────────────────────────────────────────────────────────────────┤   
  │ 2.2 │ Sliders equivalentes y sincronizados con cuadrante  │ P0        │ Mover slider mueve el punto y viceversa en tiempo real                           │   
  ├─────┼─────────────────────────────────────────────────────┼───────────┼──────────────────────────────────────────────────────────────────────────────────┤   
  │ 2.3 │ Registro del check-in en el store de eventos (sin   │ P0        │ Evento guardado con UUID de usuario, timestamp, arousal, valencia, turno; sin    │   
  │     │ PII)                                                │           │ nombre ni correo                                                                 │   
  ├─────┼─────────────────────────────────────────────────────┼───────────┼──────────────────────────────────────────────────────────────────────────────────┤   
  │ 2.4 │ Notificaciones push por turno (inicio, mitad,       │ P0        │ Notificacion llega en el horario configurado; el usuario puede posponer una vez  │   
  │     │ cierre)                                             │           │                                                                                  │   
  ├─────┼─────────────────────────────────────────────────────┼───────────┼──────────────────────────────────────────────────────────────────────────────────┤   
  │ 2.5 │ Nota opcional de texto libre post-check-in          │ P1        │ Campo de max 200 caracteres; se guarda cifrado; no llega al panel empresa        │   
  ├─────┼─────────────────────────────────────────────────────┼───────────┼──────────────────────────────────────────────────────────────────────────────────┤   
  │ 2.6 │ Feedback visual post-registro (animacion +          │ P1        │ Animacion suave; mensaje "Registrado. Aqui va lo que encontramos para ti."       │   
  │     │ microcopy)                                          │           │                                                                                  │   
  ├─────┼─────────────────────────────────────────────────────┼───────────┼──────────────────────────────────────────────────────────────────────────────────┤   
  │ 2.7 │ Configurar frecuencia de notificaciones (reducir si │ P2        │ El usuario puede bajar a 1/turno o silenciar temporalmente                       │   
  │     │  fatiga)                                            │           │                                                                                  │   
  └─────┴─────────────────────────────────────────────────────┴───────────┴──────────────────────────────────────────────────────────────────────────────────┘   

  Riesgos: Permiso de notificaciones denegado por el SO → notificaciones no llegan. Mitigacion: instruir en onboarding, ofrecer recordatorio manual en Home.     

  ---
  Sprint 3 — Recomendaciones + Modelo de zona optima (semanas 5–6)

  Objetivo: el sistema calcula la zona optima y ofrece microintervenciones pertinentes.

  ┌─────┬─────────────────────────────────────────────────────────────┬───────────┬──────────────────────────────────────────────────────────────────────────┐   
  │  #  │                          Historia                           │ Prioridad │                         Criterios de aceptacion                          │   
  ├─────┼─────────────────────────────────────────────────────────────┼───────────┼──────────────────────────────────────────────────────────────────────────┤   
  │ 3.1 │ Motor de zona optima con prior poblacional                  │ P0        │ Para usuarios < 14 check-ins, se usa prior; zona verde/amarilla/roja     │   
  │     │                                                             │           │ calculada correctamente                                                  │   
  ├─────┼─────────────────────────────────────────────────────────────┼───────────┼──────────────────────────────────────────────────────────────────────────┤   
  │ 3.2 │ Pantalla de recomendaciones post-check-in                   │ P0        │ Se muestran 2–3 intervenciones relevantes al cuadrante y urgencia;       │   
  │     │                                                             │           │ tarjetas claras                                                          │   
  ├─────┼─────────────────────────────────────────────────────────────┼───────────┼──────────────────────────────────────────────────────────────────────────┤   
  │ 3.3 │ Tracking de interaccion con intervenciones                  │ P0        │ Evento registrado sin PII; usado para mejorar recomendaciones futuras    │   
  │     │ (iniciada/completada/ignorada)                              │           │                                                                          │   
  ├─────┼─────────────────────────────────────────────────────────────┼───────────┼──────────────────────────────────────────────────────────────────────────┤   
  │ 3.4 │ Personalizacion incremental (EMA) desde check-in 14         │ P1        │ La zona del usuario empieza a moverse del prior; el sistema explica el   │   
  │     │                                                             │           │ cambio en lenguaje llano                                                 │   
  ├─────┼─────────────────────────────────────────────────────────────┼───────────┼──────────────────────────────────────────────────────────────────────────┤   
  │ 3.5 │ Explicacion de zona al usuario ("Por que esta               │ P1        │ Pantalla/tooltip que explica: "Tu zona habitual es X–Y. Hoy estas en Z." │   
  │     │ recomendacion")                                             │           │  Sin jerga clinica                                                       │   
  ├─────┼─────────────────────────────────────────────────────────────┼───────────┼──────────────────────────────────────────────────────────────────────────┤   
  │ 3.6 │ Favoritos de intervenciones                                 │ P2        │ El usuario puede guardar tecnicas; aparecen primero en futuras           │   
  │     │                                                             │           │ recomendaciones                                                          │   
  └─────┴─────────────────────────────────────────────────────────────┴───────────┴──────────────────────────────────────────────────────────────────────────┘   

  Riesgos: La personalizacion puede divergir con pocos check-ins → mitigacion: minimo 14 dias de datos antes de actualizar prior.

  ---
  Sprint 4 — Coach + Escalamiento + Persistencia (semanas 7–8)

  Objetivo: el sistema detecta urgencia y persistencia; escala de forma empática.

  ┌─────┬──────────────────────────────────────────────────┬───────────┬─────────────────────────────────────────────────────────────────────────────────────┐   
  │  #  │                     Historia                     │ Prioridad │                               Criterios de aceptacion                               │   
  ├─────┼──────────────────────────────────────────────────┼───────────┼─────────────────────────────────────────────────────────────────────────────────────┤   
  │ 4.1 │ Pantalla de Coach con opciones de llamada y chat │ P0        │ CTAs de llamada (tel:) y chat (deeplink) funcionan; historial de sesiones visible   │   
  ├─────┼──────────────────────────────────────────────────┼───────────┼─────────────────────────────────────────────────────────────────────────────────────┤   
  │ 4.2 │ Logica de escalamiento: zona roja → oferta de    │ P0        │ Despues de check-in en zona roja, pop-up o tarjeta con opciones de coach aparece    │   
  │     │ coach inmediata                                  │           │ automaticamente                                                                     │   
  ├─────┼──────────────────────────────────────────────────┼───────────┼─────────────────────────────────────────────────────────────────────────────────────┤   
  │ 4.3 │ Regla de persistencia: ≥ 3 dias en zona          │ P0        │ El sistema detecta la racha; muestra tarjeta especial con copy de sugerencia de     │   
  │     │ roja/amarilla extrema                            │           │ apoyo (sin diagnostico)                                                             │   
  ├─────┼──────────────────────────────────────────────────┼───────────┼─────────────────────────────────────────────────────────────────────────────────────┤   
  │ 4.4 │ Directorio EAP basico (links a recursos de la    │ P1        │ Lista de recursos visible; se configura por la empresa admin; no tiene datos        │   
  │     │ empresa)                                         │           │ personales                                                                          │   
  ├─────┼──────────────────────────────────────────────────┼───────────┼─────────────────────────────────────────────────────────────────────────────────────┤   
  │ 4.5 │ Linea de crisis siempre visible en pantalla      │ P1        │ Numero 800 911 2000 visible en todo momento en la pantalla de coach                 │   
  │     │ Coach                                            │           │                                                                                     │   
  ├─────┼──────────────────────────────────────────────────┼───────────┼─────────────────────────────────────────────────────────────────────────────────────┤   
  │ 4.6 │ Opt-in para compartir historial con coach        │ P1        │ Toggle claro; consentimiento separado; revocable; log de activacion/desactivacion   │   
  ├─────┼──────────────────────────────────────────────────┼───────────┼─────────────────────────────────────────────────────────────────────────────────────┤   
  │ 4.7 │ Rating opcional post-sesion de coaching          │ P2        │ 1–5 estrellas; comentario opcional; usado para metricas internas                    │   
  └─────┴──────────────────────────────────────────────────┴───────────┴─────────────────────────────────────────────────────────────────────────────────────┘   

  Riesgos: El coach no esta disponible en tiempo real → mitigacion: distinguir coach asistente virtual (siempre disponible) vs coach humano (con horario mostrado
   claramente).

  ---
  Sprint 5 — Panel Empresa + RBAC completo + Auditoria (semanas 9–10)

  Objetivo: las empresas ven agregados útiles; el RBAC está implementado de forma completa.

  ┌─────┬───────────────────────────────────────────────┬───────────┬────────────────────────────────────────────────────────────────────────────────────────┐   
  │  #  │                   Historia                    │ Prioridad │                                Criterios de aceptacion                                 │   
  ├─────┼───────────────────────────────────────────────┼───────────┼────────────────────────────────────────────────────────────────────────────────────────┤   
  │ 5.1 │ Panel web empresa con KPIs agregados (k-anon  │ P0        │ Cuatro tarjetas de KPI: adherencia, zona verde %, escaladas, alertas; todos            │   
  │     │ ≥ 5)                                          │           │ anonimizados                                                                           │   
  ├─────┼───────────────────────────────────────────────┼───────────┼────────────────────────────────────────────────────────────────────────────────────────┤   
  │ 5.2 │ Grafico de tendencia por area/turno           │ P0        │ Line chart de ultimos 30 dias; no muestra individuos; filtros de area y turno          │   
  ├─────┼───────────────────────────────────────────────┼───────────┼────────────────────────────────────────────────────────────────────────────────────────┤   
  │ 5.3 │ RBAC completo con 4 roles                     │ P0        │ Trabajador, Coach, Admin Empresa y Privacy Admin con permisos segun tabla; verificado  │   
  │     │                                               │           │ con tests                                                                              │   
  ├─────┼───────────────────────────────────────────────┼───────────┼────────────────────────────────────────────────────────────────────────────────────────┤   
  │ 5.4 │ Log de auditoria inmutable (append-only)      │ P0        │ Todo acceso a datos sensibles queda registrado con actor, recurso, timestamp y motivo  │   
  ├─────┼───────────────────────────────────────────────┼───────────┼────────────────────────────────────────────────────────────────────────────────────────┤   
  │ 5.5 │ Exportacion anonimizada CSV/JSON con log      │ P1        │ Solo Admin Empresa o Privacy Admin; formato sin PII; log de exportacion registrado     │   
  ├─────┼───────────────────────────────────────────────┼───────────┼────────────────────────────────────────────────────────────────────────────────────────┤   
  │ 5.6 │ Alerta de agregado por area (opcional,        │ P1        │ Admin puede configurar umbral de zona roja por area; alerta cuando % zona roja >       │   
  │     │ configurable)                                 │           │ umbral en grupo ≥ 5                                                                    │   
  ├─────┼───────────────────────────────────────────────┼───────────┼────────────────────────────────────────────────────────────────────────────────────────┤   
  │ 5.7 │ Dashboard de cumplimiento LFPDPPP para        │ P2        │ Vista de consentimientos activos, revocados, solicitudes ARCO pendientes, log de       │   
  │     │ Privacy Admin                                 │           │ incidentes                                                                             │   
  └─────┴───────────────────────────────────────────────┴───────────┴────────────────────────────────────────────────────────────────────────────────────────┘   

  Riesgos: El job de k-anonimizacion puede fallar silenciosamente → mitigacion: alertas de monitoreo del job; verificacion periodica de que ningun grupo < 5     
  aparece en el panel.

  ---
  Sprint 6 — Refinamiento + Accesibilidad + QA + Metricas (semanas 11–12)

  Objetivo: la app es accesible, segura, medible y lista para lanzamiento piloto.

  ┌─────┬──────────────────────────────────────────────────┬───────────┬─────────────────────────────────────────────────────────────────────────────────────┐   
  │  #  │                     Historia                     │ Prioridad │                               Criterios de aceptacion                               │   
  ├─────┼──────────────────────────────────────────────────┼───────────┼─────────────────────────────────────────────────────────────────────────────────────┤   
  │ 6.1 │ Auditoria de contraste (WCAG AA minimo en ambos  │ P0        │ Todos los textos sobre fondos pasan 4.5:1; iconos de estado no dependen solo de     │   
  │     │ temas)                                           │           │ color                                                                               │   
  ├─────┼──────────────────────────────────────────────────┼───────────┼─────────────────────────────────────────────────────────────────────────────────────┤   
  │ 6.2 │ Etiquetas de accesibilidad (labels, hints, roles │ P0        │ Lector de pantalla puede navegar toda la app; sliders tienen valores y etiquetas    │   
  │     │  ARIA en web)                                    │           │ accesibles                                                                          │   
  ├─────┼──────────────────────────────────────────────────┼───────────┼─────────────────────────────────────────────────────────────────────────────────────┤   
  │ 6.3 │ Modo oscuro en ambos temas                       │ P0        │ Tokens dark implementados; contraste verificado en modo oscuro                      │   
  ├─────┼──────────────────────────────────────────────────┼───────────┼─────────────────────────────────────────────────────────────────────────────────────┤   
  │ 6.4 │ Pruebas de seguridad basicas (OWASP Mobile Top   │ P0        │ No hay secretos en bundles; storage cifrado; no hay logs con PII; TLS 1.3           │   
  │     │ 10)                                              │           │ verificado                                                                          │   
  ├─────┼──────────────────────────────────────────────────┼───────────┼─────────────────────────────────────────────────────────────────────────────────────┤   
  │ 6.5 │ Metricas in-app: adherencia, NPS, fatiga de      │ P1        │ Dashboard interno (no empresa) con tasa de check-in diario, NPS mensual, tasa de    │   
  │     │ notificaciones                                   │           │ silenciado de notificaciones                                                        │   
  ├─────┼──────────────────────────────────────────────────┼───────────┼─────────────────────────────────────────────────────────────────────────────────────┤   
  │ 6.6 │ Prueba piloto con grupo ≥ 20 trabajadores        │ P1        │ KPIs de sprint 6 medidos; retroalimentacion cualitativa recolectada                 │   
  ├─────┼──────────────────────────────────────────────────┼───────────┼─────────────────────────────────────────────────────────────────────────────────────┤   
  │ 6.7 │ Localizacion ES-419 completa (sin ES-ES ni EN)   │ P2        │ Todos los strings en español latinoamericano; sin regionalismos peninsulares        │   
  └─────┴──────────────────────────────────────────────────┴───────────┴─────────────────────────────────────────────────────────────────────────────────────┘   

  ---
  8. Diagramas Mermaid

  Diagrama 1 — Flujo de onboarding

  flowchart TD
      A([App primera apertura]) --> B[Pantalla de bienvenida]
      B --> C{Tiene cuenta?}
      C -- Si --> D[Login\nusuario + contrasena]
      C -- No --> E[Registro\nnombre · correo · contrasena\ntoken de empresa]
      D --> F{Credenciales validas?}
      F -- No --> G[Mensaje de error\nBloqueo tras 5 intentos\nCAPTCHA opcional]
      G -.->|reintentar| D
      F -- Si --> H[MFA: OTP por SMS o email]
      E --> I[OTP de activacion\nverificacion de correo]
      H --> J([Sesion activa])
      I --> J
      J --> K[Aviso de Privacidad\nVersion corta legible\nEnlace a version completa]
      K --> L{Acepta el aviso?}
      L -- No --> M[No puede acceder a\nfunciones de bienestar\nOpcion de salir o revisar]
      L -- Si --> N[Consentimiento expreso\npara datos sensibles\nTexto claro: que · para que · quien]
      N --> O[Confirmar con OTP de 6 digitos\nCheckbox explicito\nTimestamp UTC · IP · hash SHA-256 del aviso]
      O --> P{Confirma el consentimiento?}
      P -- No --> Q[App en modo basico\nSin registro de estado\nPuede activar mas tarde]
      P -- Si --> R[(Consentimiento registrado\nTabla inmutable append-only\nLog de auditoria)]
      R --> S[Configuracion de turno\nHorario · notificaciones\nZona horaria]
      S --> T[Tour de 3 slides\nCheck-in · Recomendaciones · Coach]
      T --> U([Home principal\nListo para primer check-in])

  ---
  Diagrama 2 — Arquitectura de datos

  flowchart LR
      subgraph Cliente["Dispositivo movil"]
          APP[App movil\nStorage cifrado\nNo guarda contrasenas]
      end

      subgraph Gateway["API Gateway"]
          GW[Auth + Rate Limit\nJWT · WAF · TLS 1.3]
      end

      subgraph Servicios["Capa de servicios"]
          AUTH[Auth Service\nArgon2id · MFA]
          CHECKIN[Check-in Service]
          RECO[Motor de recomendaciones\nZona optima · EMA]
          COACH[Coach Service\nEscalamiento]
          NOTIF[Notificaciones push]
          ARCO[ARCO Handler\nDerechos LFPDPPP]
      end

      subgraph Datos["Almacenamiento por capas"]
          PII[(PII Store\nnombre · correo · empresa\nAES-256-GCM\nRetención: 6m post-baja)]
          EVENTOS[(Eventos de bienestar\narousal · valencia · turno\nUUID anonimo · timestamp\nRetención: 24 meses)]
          AGREGADOS[(Agregados\nk-anonimato >= 5\nSin identificadores\nPor area y turno)]
          CONSENT[(Consentimientos\nInmutable append-only\nOTP · hash · IP · timestamp)]
          AUDIT[(Log de auditoria\nTodos los accesos sensibles\nActor · recurso · motivo · ts)]
      end

      subgraph Actores["Actores y acceso"]
          TRABAJADOR[Trabajador]
          COACHU[Coach]
          EMPRESA[Admin Empresa]
          PRIVACY[Privacy Admin]
      end

      TRABAJADOR -->|TLS 1.3| APP
      APP --> GW
      GW --> AUTH & CHECKIN & RECO & COACH & NOTIF & ARCO
      AUTH --> PII
      AUTH --> CONSENT
      CHECKIN -->|solo UUID interno| EVENTOS
      CHECKIN -.->|no escribe PII en eventos| PII
      RECO --> EVENTOS
      EVENTOS -.->|cron job nocturno\nk-anonimizacion| AGREGADOS
      COACH --> AUDIT
      ARCO --> PII
      ARCO --> AUDIT

      COACHU -->|autenticado RBAC\nopt-in trabajador requerido| GW
      EMPRESA -->|RBAC: solo agregados| AGREGADOS
      PRIVACY -->|acceso completo auditado| AUDIT
      PRIVACY -->|gestion ARCO| PII

  ---
  9. Privacidad y seguridad (LFPDPPP)

  Hashing y cifrado

  ┌──────────────────────────────┬─────────────────────┬───────────────────────────────────────────────────────────────┐
  │           Elemento           │      Mecanismo      │                          Parametros                           │
  ├──────────────────────────────┼─────────────────────┼───────────────────────────────────────────────────────────────┤
  │ Contrasenas                  │ Argon2id            │ m=65536, t=3, p=4, output=32 bytes                            │
  ├──────────────────────────────┼─────────────────────┼───────────────────────────────────────────────────────────────┤
  │ Cifrado en transito          │ TLS 1.3             │ HSTS obligatorio; no TLS < 1.2                                │
  ├──────────────────────────────┼─────────────────────┼───────────────────────────────────────────────────────────────┤
  │ Cifrado en reposo (PII)      │ AES-256-GCM         │ Claves gestionadas por KMS externo                            │
  ├──────────────────────────────┼─────────────────────┼───────────────────────────────────────────────────────────────┤
  │ Hash del aviso de privacidad │ SHA-256             │ Del texto canonico en UTF-8; guardado junto al consentimiento │
  ├──────────────────────────────┼─────────────────────┼───────────────────────────────────────────────────────────────┤
  │ Tokens de sesion             │ JWT firmado (RS256) │ Expiracion: 15 min access, 7 dias refresh                     │
  ├──────────────────────────────┼─────────────────────┼───────────────────────────────────────────────────────────────┤
  │ Storage en dispositivo       │ AES-256             │ Keychain iOS / Android Keystore                               │
  └──────────────────────────────┴─────────────────────┴───────────────────────────────────────────────────────────────┘

  Consentimiento "por escrito" — mecanismo verificable

  Paso 1: Usuario lee el texto del consentimiento (version canonica).
  Paso 2: Marca el checkbox [ ] Acepto.
  Paso 3: Sistema envía OTP de 6 dígitos al correo/SMS registrado.
  Paso 4: Usuario ingresa el OTP.
  Paso 5: Sistema registra en tabla de consentimientos:
          {
            user_uuid:        "...",
            timestamp_utc:    "2026-03-23T11:04:00Z",
            ip_address:       "...",
            device_uuid:      "...",
            texto_hash_sha256: "...",
            otp_verificado:   true,
            version_aviso:    "v1.2"
          }
  Paso 6: Registro es append-only. Nunca se edita ni elimina.

  Derechos ARCO

  ┌───────────────┬─────────────────┬────────────────────────────────────────────────────────────────────────┐
  │    Derecho    │ Plazo (LFPDPPP) │                             Implementacion                             │
  ├───────────────┼─────────────────┼────────────────────────────────────────────────────────────────────────┤
  │ Acceso        │ 20 dias habiles │ Boton "Descargar mis datos" en Configuracion → archivo JSON/PDF        │
  ├───────────────┼─────────────────┼────────────────────────────────────────────────────────────────────────┤
  │ Rectificacion │ 20 dias habiles │ Formulario in-app con campo de descripcion de la correccion            │
  ├───────────────┼─────────────────┼────────────────────────────────────────────────────────────────────────┤
  │ Cancelacion   │ 20 dias habiles │ Solicitud de eliminacion; datos de eventos anonimizados; PII eliminada │
  ├───────────────┼─────────────────┼────────────────────────────────────────────────────────────────────────┤
  │ Oposicion     │ 20 dias habiles │ Formulario con finalidad especifica a la que se opone                  │
  └───────────────┴─────────────────┴────────────────────────────────────────────────────────────────────────┘

  Todas las solicitudes generan: acuse automatico de recibo + folio + timestamp + SLA visible al usuario. Privacy Admin recibe alerta y gestiona desde el        
  dashboard de cumplimiento.

  Retención de datos

  ┌──────────────────────┬───────────────────────────┬──────────────────────────────────────┐
  │     Tipo de dato     │         Retencion         │        Destino al vencimiento        │
  ├──────────────────────┼───────────────────────────┼──────────────────────────────────────┤
  │ PII (nombre, correo) │ 6 meses post-baja         │ Eliminacion irreversible + log       │
  ├──────────────────────┼───────────────────────────┼──────────────────────────────────────┤
  │ Eventos de bienestar │ 24 meses                  │ Anonimizacion automatica (job)       │
  ├──────────────────────┼───────────────────────────┼──────────────────────────────────────┤
  │ Consentimientos      │ Vida del sistema + 5 años │ Archivo inmutable (obligacion legal) │
  ├──────────────────────┼───────────────────────────┼──────────────────────────────────────┤
  │ Log de auditoria     │ 3 años                    │ Archivo comprimido cifrado           │
  ├──────────────────────┼───────────────────────────┼──────────────────────────────────────┤
  │ Notas de texto libre │ 12 meses                  │ Eliminacion automatica               │
  └──────────────────────┴───────────────────────────┴──────────────────────────────────────┘

  ---
  10. Metricas de exito

  ┌───────────────────────────┬────────────────────────────────────────────────┬───────────────────────────────────┬────────────────────────────────────────┐    
  │          Metrica          │                   Definicion                   │       Meta piloto (3 meses)       │           Forma de medicion            │    
  ├───────────────────────────┼────────────────────────────────────────────────┼───────────────────────────────────┼────────────────────────────────────────┤    
  │ Adherencia a check-ins    │ % de check-ins completados / programados por   │ >= 65%                            │ Log de eventos (sin PII)               │    
  │                           │ usuario                                        │                                   │                                        │    
  ├───────────────────────────┼────────────────────────────────────────────────┼───────────────────────────────────┼────────────────────────────────────────┤    
  │ Utilidad percibida        │ NPS mensual in-app + pregunta "¿te fue util la │ NPS >= +30; utilidad >= 70%       │ Encuesta in-app opcional               │    
  │                           │  recomendacion?"                               │                                   │                                        │    
  ├───────────────────────────┼────────────────────────────────────────────────┼───────────────────────────────────┼────────────────────────────────────────┤    
  │ Fatiga de notificaciones  │ % de usuarios que silencian notificaciones en  │ <= 20%                            │ Log de configuracion de notificaciones │    
  │                           │ 2 semanas                                      │                                   │                                        │    
  ├───────────────────────────┼────────────────────────────────────────────────┼───────────────────────────────────┼────────────────────────────────────────┤    
  │ Seguridad psicologica     │ Encuesta trimestral: "¿Sientes que tus datos   │ >= 80% responden "si"             │ Encuesta anonima (no vinculada al UUID │    
  │ percibida                 │ estan protegidos?"                             │                                   │  del usuario)                          │    
  ├───────────────────────────┼────────────────────────────────────────────────┼───────────────────────────────────┼────────────────────────────────────────┤    
  │ Calidad de                │ % de usuarios cuya zona optima se desvia del   │ >= 40% (indica que el modelo esta │ Agregado anonimo del motor             │    
  │ personalizacion           │ prior en 6 semanas                             │  aprendiendo)                     │                                        │    
  ├───────────────────────────┼────────────────────────────────────────────────┼───────────────────────────────────┼────────────────────────────────────────┤    
  │ Uso de escalamiento       │ % de sesiones en zona roja que terminan en     │ >= 25%                            │ Log de escalamientos (anonimo)         │    
  │                           │ interaccion con coach                          │                                   │                                        │    
  ├───────────────────────────┼────────────────────────────────────────────────┼───────────────────────────────────┼────────────────────────────────────────┤    
  │ Tiempo de check-in        │ Duracion promedio del flujo check-in           │ <= 20 segundos p95                │ Metricas de UX                         │    
  ├───────────────────────────┼────────────────────────────────────────────────┼───────────────────────────────────┼────────────────────────────────────────┤    
  │ Tasa de revocacion        │ % de usuarios que revocan consentimiento en 30 │ <= 5%                             │ Log de consentimientos                 │    
  │                           │  dias                                          │                                   │                                        │    
  ├───────────────────────────┼────────────────────────────────────────────────┼───────────────────────────────────┼────────────────────────────────────────┤    
  │ Errores de accesibilidad  │ Numero de reportes de problemas de             │ 0 criticos en piloto              │ Reportes in-app + auditoria manual     │
  │                           │ accesibilidad                                  │                                   │                                        │      ├───────────────────────────┼────────────────────────────────────────────────┼───────────────────────────────────┼────────────────────────────────────────┤
  │ Incidentes de seguridad   │ Numero de accesos no autorizados o brechas     │ 0                                 │ Log de auditoria + SIEM                │    
  └───────────────────────────┴────────────────────────────────────────────────┴───────────────────────────────────┴────────────────────────────────────────┘      
  ---                                                                                                                                                            
  11. Checklist MVP (maximo 15 items)                                                                                                                            

  [ ] 1.  Registro/login con MFA funcional y contrasenas con Argon2id.
  [ ] 2.  Aviso de privacidad legible con enlace a version completa.                                                                                             
  [ ] 3.  Consentimiento expreso verificable: OTP + checkbox + hash + timestamp + IP.                                                                            
  [ ] 4.  Configuracion de turno y notificaciones push.                                                                                                          
  [ ] 5.  Check-in con cuadrante draggable + sliders sincronizados (fondo neutral).                                                                              
  [ ] 6.  Registro de eventos sin PII (UUID, timestamp, arousal, valencia, turno).                                                                               
  [ ] 7.  Motor de zona optima con prior poblacional y personalizacion desde check-in 14.                                                                        
  [ ] 8.  Pantalla de recomendaciones con al menos 3 intervenciones por cuadrante/urgencia.                                                                      
  [ ] 9.  Escalamiento a coach (zona roja → oferta inmediata de llamada o chat).                                                                                 
  [ ] 10. Regla de persistencia 3+ dias con tarjeta de sugerencia de apoyo (sin diagnostico).                                                                    
  [ ] 11. Panel empresa con agregados k-anonimizados (k >= 5) y disclaimer visible.                                                                              
  [ ] 12. RBAC completo: 4 roles con permisos diferenciados y verificados.                                                                                       
  [ ] 13. Log de auditoria inmutable para accesos a datos sensibles.                                                                                               [ ] 14. Formulario ARCO in-app con acuse automatico y SLA visible.                                                                                             
  [ ] 15. Auditoria de contraste WCAG AA en ambos temas y estados no dependientes solo del color.                                                                
                                                                                                                                                                   ---                                                                                                                                                            
  12. Cambios a documentacion                                                                                                                                    

  context.md — Diff (unified patch)
                                                                                                                                                                   --- a/context.md
  +++ b/context.md                                                                                                                                               
  @@ -1,4 +1,10 @@                                                                                                                                                  # Proyecto: App B2B2C de Zona Optima (Arousal–Valencia)
  +Nombre provisional: ARUOSAL                                                                                                                                     +Version del documento: v1.1 — 2026-03-23                                                                                                                      
  +Estado: Especificacion inicial completa — pendiente validacion con cliente                                                                                    
  +                                                                                                                                                                +## Vision                                                                                                                                                     
  +Ser la herramienta de bienestar laboral mas usable y confiable para trabajadores en Mexico,                                                                   
  +que aprende de cada persona sin diagnosticar, sin exponer y sin puntuar.                                                                                      
                                                                                                                                                                    ## Resumen                                                                                                                                                    
   App movil para trabajadores que permite registrar en segundos su estado (activacion/arousal                                                                   
  @@ -11,6 +17,9 @@                                                                                                                                              
   - Modo B2B2C: panel empresa con metricas agregadas por defecto (no punitivo).                                                                                 
   - Cumplimiento Mexico: consentimiento expreso y por escrito para datos sensibles.                                                                             
                                                                                                                                                                   +## Propuesta de valor diferencial                                                                                                                               +- Check-in en < 5 segundos (cuadrante tactil o sliders).                                                                                                      
  +- Zona optima que aprende de ti, no de promedios grupales.                                                                                                    
  +- Empresa ve tendencias, no personas.                                                                                                                         
  +- Cumplimiento LFPDPPP verificable en cada consentimiento.                                                                                                    
  +                                                                                                                                                                 ## Stakeholders                                                                                                                                               
  [...y asi sucesivamente — ver contenido final completo abajo]                                                                                                  
                                                                                                                                                                   Dado el volumen del cambio (el archivo se expande significativamente), a continuacion se muestra el contenido final completo de ambos archivos, que es lo que    se escribira en disco.                                                                                                                                         
                                                                                                                                                                 
  ---
  Procediendo ahora a escribir los archivos actualizados en el repositorio.
                                                                                                                                                                 ● Write(context.md)       
  ⎿  Added 173 lines, removed 39 lines                                                                                                                           
        1 -# Proyecto: App B2B2C de Zona Óptima (Arousal–Valencia)                                                                                                       1 +# Proyecto: ARUOSAL — App B2B2C de Zona Optima (Arousal–Valencia)
        2                                                                                                                                                                3 -## Resumen                                                                                                                                            
        4 -App móvil para trabajadores que permite registrar en segundos su estado (activación/arousal y valencia/agrado–desagrado) durante turnos               
          -laborales, con el fin de ofrecer microintervenciones (activación/desactivación), escalamiento a coach (telefónico o virtual) según urgencia y       
          -sugerencia de apoyo psicológico cuando existan señales persistentes (p. ej., 3+ días en extremos). La app aprende gradualmente la “zona             
          -óptima” personal de cada usuario usando datos longitudinales, evitando diagnósticos médicos.                                                                  3 +Version del documento: v1.1 — 2026-03-23                                                                                                                      4 +Estado: Especificacion inicial completa — pendiente validacion con cliente                                                                                    5                                                                                                                                                                6 +---                                                                                                                                                   
        7 +
        8 +## Vision                                                                                                                                             
        9 +                                                                                                                                                      
       10 +Ser la herramienta de bienestar laboral mas usable y confiable para trabajadores en Mexico, que aprende del patron personal de cada usuario           
          +sin diagnosticar, sin exponer datos individuales a la empresa, y sin lenguaje clinico. Bienestar en el trabajo que se siente como apoyo, no           
          +como vigilancia.                                                                                                                                      
       11 +                                                                                                                                                      
       12 +---                                                                                                                                                   
       13 +                                                                                                                                                      
       14 +## Resumen del producto                                                                                                                               
       15 +                                                                                                                                                      
       16 +App movil B2B2C para trabajadores que permite registrar en segundos su estado emocional (activacion/arousal y valencia/agrado–desagrado)              
          +durante turnos laborales. El sistema aprende gradualmente la "zona optima" personal de cada usuario mediante datos longitudinales y un modelo         
          +explicable (prior poblacional + personalizacion incremental EMA). Cuando el usuario se aleja de su zona optima, ofrece microintervenciones            
          +(activacion o desactivacion segun cuadrante), escala a coach segun urgencia, y sugiere apoyo profesional cuando existe persistencia de 3+ dias        
          + en extremos. La empresa accede unicamente a datos agregados y anonimizados con k-anonimato >= 5.                                                     
       17 +                                                                                                                                                      
       18 +---                                                                                                                                                   
       19 +                                                                                                                                                      
       20 +## Propuesta de valor diferencial                                                                                                                     
       21 +                                                                                                                                                      
       22 +- Check-in en < 5 segundos: cuadrante tactil draggable + sliders equivalentes.                                                                        
       23 +- Zona optima personal: aprende de cada usuario, no solo de promedios grupales.                                                                       
       24 +- Intervenciones contextualizadas: cuadrante + urgencia + historial personal.                                                                         
       25 +- Escalamiento gradual: verde → sin interrupcion; amarillo → tecnica; rojo → coach.                                                                   
       26 +- Panel empresa no punitivo: la empresa ve tendencias, no personas.                                                                                   
       27 +- Cumplimiento LFPDPPP verificable: OTP + hash + timestamp en cada consentimiento.                                                                    
       28 +                                                                                                                                                      
       29 +---
       30 +                                                                                                                                                      
       31  ## Objetivos
       32 -- Registro ultra-rápido (<5s) del estado (valencia + arousal) mediante cuadrante o sliders.                                                           
       33 -- Recomendaciones breves, seguras y basadas en evidencia; lenguaje no clínico.                                                                        
       34 -- Personalización: iniciar con zona estándar y ajustar por usuario con modelo explicable.                                                             
       35 -- Escalamiento a coach por urgencia, y rutas hacia atención profesional por persistencia.                                                             
       36 -- Modo B2B2C: panel empresa con métricas agregadas por defecto (no punitivo).                                                                         
       37 -- Cumplimiento México: consentimiento expreso y por escrito para datos sensibles; aviso de privacidad; revocación; ARCO; retención.                   
       32
       33 +- Registro ultra-rapido (< 5 segundos) del estado mediante cuadrante o sliders.                                                                       
       34 +- Recomendaciones breves, seguras y basadas en evidencia; lenguaje de "estado" y "apoyo", no clinico.                                                 
       35 +- Personalizacion: iniciar con zona estandar (prior poblacional) y ajustar por usuario con modelo explicable desde el check-in 14.                    
       36 +- Escalamiento a coach por urgencia (zona roja), y rutas hacia atencion profesional por persistencia (>= 3 dias en zona roja/amarilla                 
          +extrema).                                                                                                                                             
       37 +- Modo B2B2C: panel empresa con metricas agregadas (k-anonimato >= 5) por defecto; sin uso punitivo; sin datos individuales.                          
       38 +- Cumplimiento Mexico (LFPDPPP): consentimiento expreso y por escrito; aviso de privacidad; revocacion; ARCO; minimizacion; retencion                 
          +limitada.                                                                                                                                             
       39 +                                                                                                                                                      
       40 +---                                                                                                                                                   
       41 +                                                                                                                                                      
       42  ## Stakeholders
       43 -- Trabajador (usuario final)                                                                                                                          
       44 -- Coach (telefónico / asistente virtual)                                                                                                              
       45 -- Admin empresa (solo agregados por defecto)                                                                                                          
       46 -- Privacy/Security owner (cumplimiento, auditoría, incidentes)                                                                                        
       47 -- Equipo de producto (PM, UX/UI, Front, Data)                                                                                                         
       43
       44 -## Alcance (MVP)                                                                                                                                      
       45 -- Registro/Login                                                                                                                                      
       46 -- Onboarding con aviso de privacidad + consentimiento sensible (expreso y por escrito)                                                                
       47 -- Check-ins por turnos (inicio/mitad/cierre + opcional evento crítico)                                                                                
       48 -- Biblioteca de microintervenciones por cuadrante y urgencia                                                                                          
       49 -- Escalamiento a coach (tel/chat) y regla de persistencia (3+ días)                                                                                   
       50 -- Panel empresa agregado (tendencias por área/turno, sin PII)                                                                                         
       51 -- RBAC y auditoría básica                                                                                                                             
       44 +| Rol | Descripcion | Acceso por defecto |                                                                                                            
       45 +|---|---|---|                                                                                                                                         
       46 +| Trabajador | Usuario final; registra check-ins; ve sus propios datos | Datos propios completos |                                                    
       47 +| Coach | Apoya al trabajador en sesiones telefonicas o chat | Datos del trabajador solo con opt-in explicito |                                       
       48 +| Admin Empresa | Gestiona usuarios; ve tendencias grupales | Solo agregados anonimizados (k >= 5) |                                                  
       49 +| Privacy Admin | Cumplimiento LFPDPPP; gestiona ARCO; log de auditoria | Acceso completo auditado |                                                  
       50 +| Equipo de producto | PM, UX/UI, Front, Data; no tiene acceso a produccion por defecto | Entornos de desarrollo/staging con datos sinteticos         
          +|                                                                                                                                                     
       51
       52 -## Fuera de alcance (por ahora)                                                                                                                       
       53 -- Diagnósticos clínicos o predicción de trastornos                                                                                                    
       54 -- Integraciones complejas con biométricos (revisar legal y DPIA)                                                                                      
       55 -- Detección automática de emociones por cámara/micrófono                                                                                              
       56 -- Evaluación de desempeño laboral o reportes individualizados a la empresa por defecto                                                                
       52 +---                                                                                                                                                   
       53
       54 -## Restricciones legales y de privacidad (México)                                                                                                     
       55 -- Tratar registros como potencialmente sensibles.                                                                                                     
       56 -- Requerir consentimiento expreso y por escrito para tratamiento de datos sensibles.                                                                  
       57 -- Habilitar revocación de consentimiento.                                                                                                             
       58 -- Habilitar derechos ARCO (acceso, rectificación, cancelación, oposición).                                                                            
       59 -- Minimización de datos y retención limitada.                                                                                                         
       60 -- Panel empresa: datos disociados/anonimizados por defecto; controles anti-uso punitivo.                                                              
       54 +## Alcance MVP                                                                                                                                        
       55
       56 -## Principios de diseño                                                                                                                               
       57 -- “Calma + claridad”: UI tipo tarjetas, redondeada, microcopy empático.                                                                               
       58 -- Módulo de medición (cuadrante/sliders) con cromática neutral para evitar sesgos.                                                                    
       59 -- Accesibilidad: contraste, tamaños táctiles, no depender solo de color para información.                                                             
       60 -- Dos temas: Calm Pastel (inspiración Dribbble) y INTRA Brand (teal/rojo).                                                                            
       56 +- Registro/Login con MFA (OTP SMS o email).                                                                                                           
       57 +- Onboarding con aviso de privacidad + consentimiento expreso verificable (OTP + checkbox + hash SHA-256 + timestamp + IP + UUID de                   
          +dispositivo → registro inmutable).                                                                                                                    
       58 +- Check-ins por turnos: cuadrante tactil draggable + sliders sincronizados; fondo neutral (sin colores de tema en el instrumento).                    
       59 +- Motor de zona optima: prior poblacional (semanas 1–2) → personalizacion EMA (desde check-in 14); explicable al usuario en lenguaje llano.           
       60 +- Biblioteca de 12+ microintervenciones clasificadas por cuadrante y urgencia (verde/amarillo/rojo).                                                  
       61 +- Escalamiento a coach: zona roja → oferta inmediata; persistencia >= 3 dias → sugerencia de apoyo profesional (sin diagnostico).                     
       62 +- Panel empresa: agregados k-anonimizados; tendencia por area/turno; KPIs de adherencia y zona verde.                                                 
       63 +- RBAC con 4 roles (trabajador, coach, admin empresa, privacy admin).                                                                                 
       64 +- Log de auditoria inmutable para accesos a datos sensibles.                                                                                          
       65 +- Formulario ARCO in-app con SLA de 15 dias habiles.                                                                                                  
       66 +- Dos temas visuales: Calm Pastel e INTRA Brand.                                                                                                      
       67 +- Accesibilidad WCAG AA (contraste, tamanios tactiles, estados no solo por color, modo oscuro).                                                       
       68 +                                                                                                                                                      
       69 +---                                                                                                                                                   
       70 +                                                                                                                                                      
       71 +## Fuera de alcance (version 1.0)                                                                                                                     
       72 +                                                                                                                                                      
       73 +- Diagnosticos clinicos o prediccion de trastornos.                                                                                                   
       74 +- Integraciones con biometricos (revisar legal y DPIA antes de incluir).                                                                              
       75 +- Deteccion automatica de emociones por camara o microfono.                                                                                           
       76 +- Evaluacion de desempeno laboral o reportes individualizados a la empresa por defecto.                                                               
       77 +- Gamificacion o puntuaciones comparativas entre trabajadores.                                                                                        
       78 +                                                                                                                                                      
       79 +---                                                                                                                                                   
       80 +                                                                                                                                                      
       81 +## Restricciones legales y de privacidad (Mexico — LFPDPPP)                                                                                           
       82 +                                                                                                                                                      
       83 +- Los registros de estado emocional se tratan como DATOS SENSIBLES (LFPDPPP Art. 3 fracc. VI).                                                        
       84 +- Consentimiento expreso y por escrito obligatorio. Mecanismo en app: OTP 6 digitos + checkbox + hash SHA-256 del texto del aviso + timestamp         
          +UTC + IP + UUID de dispositivo → tabla inmutable append-only.                                                                                         
       85 +- El aviso de privacidad debe estar disponible en version corta (in-app, lenguaje claro) y version completa (enlace).                                 
       86 +- Revocacion de consentimiento habilitada desde Configuracion > Mi privacidad.                                                                        
       87 +- Derechos ARCO (Acceso, Rectificacion, Cancelacion, Oposicion) con formulario in-app y SLA de 15 dias habiles.                                       
       88 +- Minimizacion de datos: solo se registran los campos estrictamente necesarios.                                                                       
       89 +- Retencion limitada:                                                                                                                                 
       90 +  - PII: 6 meses post-baja → eliminacion irreversible con log.                                                                                        
       91 +  - Eventos de bienestar: 24 meses → anonimizacion automatica por cron job.                                                                           
       92 +  - Consentimientos: vida del sistema + 5 anios (obligacion legal).                                                                                   
       93 +  - Log de auditoria: 3 anios en archivo cifrado.                                                                                                     
       94 +- Panel empresa: datos disociados/anonimizados con k-anonimato >= 5; controles anti-uso punitivo; ninguna vista individual por defecto.               
       95 +- Toda transferencia de datos a terceros (EAP, proveedor de push) requiere clausula contractual de privacidad.                                        
       96 +                                                                                                                                                      
       97 +---                                                                                                                                                   
       98 +                                                                                                                                                      
       99 +## Sistema de diseno — Referencia de tokens                                                                                                           
      100 +                                                                                                                                                      
      101 +### Tema A: Calm Pastel                                                                                                                               
      102 +- `--cp-dark: #060F16` — texto principal                                                                                                              
      103 +- `--cp-slate: #5A6B70` — texto secundario, iconos                                                                                                    
      104 +- `--cp-fog: #DEEAED` — fondo de pantalla, tarjetas                                                                                                   
      105 +- `--cp-mist: #ADC7D0` — bordes, separadores                                                                                                          
      106 +- `--cp-plum: #DD98D1` — acento primario, CTAs                                                                                                        
      107 +- `--cp-clay: #B58B80` — advertencia calida                                                                                                           
      108 +- `--cp-lavender: #A8A3C8` — acento secundario, progreso                                                                                              
      109 +- `--cp-night: #443956` — encabezados                                                                                                                 
      110 +                                                                                                                                                      
      111 +### Tema B: INTRA Brand                                                                                                                               
      112 +- `--ib-teal: #06C4CC` — primario, CTAs                                                                                                               
      113 +- `--ib-teal-light: #D7F3F4` — fondos activos                                                                                                         
      114 +- `--ib-red: #F71A21` — urgencia                                                                                                                      
      115 +- `--ib-carbon: #1F191B` — texto, navbar                                                                                                              
      116 +- `--ib-red-soft: #FFEDED` — fondo de alerta suave                                                                                                    
      117 +                                                                                                                                                      
      118 +### Reglas de diseno criticas                                                                                                                         
      119 +- Tipografia: Plus Jakarta Sans (display) + Inter (cuerpo).                                                                                           
      120 +- Cuadrante de check-in: fondo `#F5F5F5`, punto `#3A3A3A` — SIN colores de tema para evitar sesgo.                                                    
      121 +- Los estados de urgencia (verde/amarillo/rojo) siempre usan icono + texto + color, nunca solo color.                                                 
      122 +- Tamanos tactiles minimos: 44x44pt (iOS), 48x48dp (Android).                                                                                         
      123 +- Contraste: WCAG AA minimo (4.5:1 texto/fondo), preferible AAA.                                                                                      
      124 +- Modo oscuro obligatorio con tokens `--*-dark-bg` y `--*-dark-card`.                                                                                 
      125 +                                                                                                                                                      
      126 +---                                                                                                                                                   
      127 +                                                                                                                                                      
      128 +## Modelo de zona optima — Resumen tecnico                                                                                                            
      129 +                                                                                                                                                      
      130 +- **Prior poblacional**: Arousal 5.2±1.5, Valencia 6.1±1.8 (escala 1–10). Aplica primeras 2 semanas / < 14 check-ins.                                 
      131 +- **Personalizacion incremental**: EMA (alpha=0.1) sobre 30 dias de historial + std rodante 14 dias. Sin caja negra.                                  
      132 +- **Umbrales**: verde = ±1σ, amarillo = ±1–2σ, rojo = > ±2σ.                                                                                          
      133 +- **Deteccion de deriva**: si centro personal se desplaza > 1.5σ en 7 dias → recalibracion + notificacion opcional al coach.                          
      134 +- **Explicabilidad**: la app explica la zona al usuario en lenguaje llano sin jerga clinica.                                                          
      135 +- **Bayesiano opcional**: actualizacion Normal-Normal para convergencia mas suave en sprint 3+.                                                       
      136 +                                                                                                                                                      
      137 +---                                                                                                                                                   
      138 +                                                                                                                                                      
      139 +## Arquitectura de seguridad — Resumen                                                                                                                
      140 +                                                                                                                                                      
      141 +- Contrasenas: Argon2id (m=65536, t=3, p=4).                                                                                                          
      142 +- Cifrado en transito: TLS 1.3 obligatorio; HSTS.                                                                                                     
      143 +- Cifrado en reposo: AES-256-GCM para datos sensibles; claves en KMS.                                                                                 
      144 +- Separacion de stores: PII y eventos en bases de datos distintas, vinculadas solo por UUID interno.                                                  
      145 +- Log de auditoria append-only: todo acceso a datos sensibles queda registrado con actor, recurso, motivo y timestamp.                                
      146 +- Panel empresa recibe solo datos de la capa de AGREGADOS, nunca de PII ni EVENTOS directamente.                                                      
      147 +                                                                                                                                                      
      148 +---                                                                                                                                                   
      149 +                                                                                                                                                      
      150 +## Principios de diseno de producto                                                                                                                   
      151 +                                                                                                                                                      
      152 +- "Calma + claridad": UI tipo tarjetas redondeadas, microcopy empatico.                                                                               
      153 +- Modulo de medicion (cuadrante/sliders) con cromatica neutral para evitar sesgos de respuesta.                                                       
      154 +- Accesibilidad: contraste, tamanos tactiles, sin dependencia exclusiva del color.                                                                    
      155 +- Lenguaje: siempre de "estado", "energia", "zona habitual". Nunca de diagnostico, trastorno o patologia.                                             
      156 +- No punitivo: la empresa ve tendencias, no personas; los datos no se usan para evaluacion de desempeno.                                              
      157 +- Escalamiento empatico: sin alarmismo; las sugerencias de apoyo profesional son invitaciones, no alarmas.                                            
      158 +                                                                                                                                                      
      159 +---                                                                                                                                                   
      160 +                                                                                                                                                      
      161 +## Roadmap de sprints (resumen)                                                                                                                       
      162 +                                                                                                                                                      
      163 +| Sprint | Tema | Semanas |                                                                                                                           
      164 +|---|---|---|                                                                                                                                         
      165 +| 1 | Fundacion + Privacidad + Onboarding | 1–2 |                                                                                                     
      166 +| 2 | Check-in + Cuadrante + Notificaciones | 3–4 |                                                                                                   
      167 +| 3 | Recomendaciones + Modelo de zona optima | 5–6 |                                                                                                 
      168 +| 4 | Coach + Escalamiento + Persistencia | 7–8 |                                                                                                     
      169 +| 5 | Panel Empresa + RBAC + Auditoria | 9–10 |                                                                                                       
      170 +| 6 | Refinamiento + Accesibilidad + QA + Metricas | 11–12 |                                                                                          
      171 +                                                                                                                                                      
      172 +---                                                                                                                                                   
      173 +                                                                                                                                                      
      174 +## Metricas de exito (piloto 3 meses)                                                                                                                 
      175 +                                                                                                                                                      
      176 +- Adherencia a check-ins: >= 65% de check-ins completados / programados.                                                                              
      177 +- NPS mensual in-app: >= +30.                                                                                                                         
      178 +- Utilidad percibida de recomendaciones: >= 70% responden "util".                                                                                     
      179 +- Fatiga de notificaciones (tasa de silenciado): <= 20% en 2 semanas.                                                                                 
      180 +- Seguridad psicologica percibida: >= 80% "si" en encuesta trimestral anonima.                                                                        
      181 +- Uso de escalamiento: >= 25% de sesiones roja con interaccion de coach.                                                                              
      182 +- Incidentes de seguridad: 0.  