import type { Metadata, Viewport } from 'next'
import { cookies }         from 'next/headers'
import { ThemeProvider }   from '@/components/providers/ThemeProvider'
import './globals.css'

export const metadata: Metadata = {
  title:       'ARUOSAL — Bienestar en tu turno',
  description: 'Monitoreo de bienestar emocional para trabajadores.',
  robots:      'noindex, nofollow',
}

export const viewport: Viewport = {
  width:         'device-width',
  initialScale:  1,
  maximumScale:  1,
  userScalable:  false,
  themeColor:    '#DD98D1',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Leer tema desde la cookie de sesión para evitar flash en el primer render
  // El JWT contiene el campo `theme` del usuario
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('aruosal_session')?.value

  let initialTheme: 'calm' | 'intra' = 'calm'
  if (sessionCookie) {
    try {
      // Decodificar el payload del JWT sin verificar firma (solo para el tema — seguro)
      const [, payloadB64] = sessionCookie.split('.')
      if (payloadB64) {
        const payload = JSON.parse(
          Buffer.from(payloadB64, 'base64url').toString('utf8')
        )
        if (payload.theme === 'calm' || payload.theme === 'intra') {
          initialTheme = payload.theme
        }
      }
    } catch {
      // Fallo silencioso — usar tema por defecto
    }
  }

  return (
    <html lang="es" data-theme={initialTheme}>
      <body>
        <ThemeProvider initialTheme={initialTheme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
