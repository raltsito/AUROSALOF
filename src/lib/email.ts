import nodemailer from 'nodemailer'

export interface EmailPayload {
  to: string
  subject: string
  html: string
  text: string
}

export interface EmailResult {
  ok: boolean
  error?: string
}

export function buildOtpEmail(opts: { code: string; name: string }): Pick<EmailPayload, 'subject' | 'html' | 'text'> {
  const { code, name } = opts

  return {
    subject: 'Tu codigo de verificacion - ARUOSAL',
    text: [
      `Hola ${name},`,
      '',
      'Tu codigo de verificacion para confirmar tu consentimiento de datos es:',
      '',
      `    ${code}`,
      '',
      'Este codigo es valido por 10 minutos y solo puede usarse una vez.',
      'Si no solicitaste este codigo, ignora este mensaje.',
      '',
      'Privacidad y bienestar - ARUOSAL',
    ].join('\n'),
    html: `
      <div style="font-family:Inter,-apple-system,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#F4F8F9;border-radius:16px;">
        <p style="font-size:14px;color:#5A6B70;margin-bottom:8px;">Hola, ${name}</p>
        <h2 style="font-size:20px;color:#060F16;margin-bottom:8px;font-family:'Plus Jakarta Sans',sans-serif;">
          Verifica tu consentimiento
        </h2>
        <p style="font-size:14px;color:#5A6B70;margin-bottom:24px;">
          Ingresa este codigo en la app para confirmar que autorizas el tratamiento
          de tus datos de bienestar conforme a la LFPDPPP:
        </p>
        <div style="background:#FFFFFF;border-radius:12px;padding:20px 32px;text-align:center;letter-spacing:10px;font-size:36px;font-weight:700;color:#060F16;border:1.5px solid #D0E2E8;">
          ${code}
        </div>
        <p style="font-size:12px;color:#9BB8C0;margin-top:16px;text-align:center;">
          Valido 10 minutos - Solo un uso - No compartas este codigo
        </p>
        <hr style="border:none;border-top:1px solid #D0E2E8;margin:24px 0;" />
        <p style="font-size:12px;color:#9BB8C0;text-align:center;">
          Si no solicitaste este codigo, ignora este mensaje. Nadie de ARUOSAL
          te pedira este codigo por telefono o chat.
        </p>
      </div>
    `,
  }
}

export async function sendEmail(payload: EmailPayload): Promise<EmailResult> {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT ?? 465)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const from = process.env.SMTP_FROM ?? user

  if (!host || !user || !pass || !from) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[email] SMTP no configurado. Revisa SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS y SMTP_FROM.')
      return { ok: false, error: 'Servicio de correo no configurado.' }
    }

    const line = '-'.repeat(52)
    console.log(`\n${line}`)
    console.log(`[EMAIL DEV] Para:    ${payload.to}`)
    console.log(`[EMAIL DEV] Asunto:  ${payload.subject}`)
    console.log(`[EMAIL DEV] Cuerpo:\n${payload.text}`)
    console.log(`${line}\n`)
    return { ok: true }
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })

  try {
    await transporter.sendMail({
      from,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    })
    return { ok: true }
  } catch (err) {
    console.error('[email]', err)
    return { ok: false, error: 'No se pudo enviar el correo de verificacion.' }
  }
}
