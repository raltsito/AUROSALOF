'use client'

// ThemeProvider — ARUOSAL Sprint 2
// Gestiona el tema visual ("calm" | "intra") con:
//   1. Carga inicial desde cookie del servidor (via prop initialTheme)
//   2. Persistencia en localStorage para respuesta inmediata
//   3. Sincronización con DB vía PATCH /api/user/theme
//   4. Aplica data-theme al <html> en cada cambio
//
// Por qué prop + localStorage:
//   - La cookie httpOnly la lee el servidor (sin hidratación flash)
//   - localStorage mantiene consistencia entre tabs
//   - La DB persiste para cuando el usuario cambia de dispositivo

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

type Theme = 'calm' | 'intra'

interface ThemeContextValue {
  theme:     Theme
  setTheme:  (t: Theme) => Promise<void>
  isLoading: boolean
}

const ThemeContext = createContext<ThemeContextValue>({
  theme:     'calm',
  setTheme:  async () => {},
  isLoading: false,
})

export function useTheme() {
  return useContext(ThemeContext)
}

interface ThemeProviderProps {
  initialTheme: Theme
  children:     React.ReactNode
}

const LS_KEY = 'aruosal_theme'

export function ThemeProvider({ initialTheme, children }: ThemeProviderProps) {
  const [theme,     setThemeState] = useState<Theme>(initialTheme)
  const [isLoading, setIsLoading]  = useState(false)

  // Aplicar data-theme al <html> cuando cambie el tema
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // En el primer mount: leer localStorage para evitar flash si hay preferencia guardada
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_KEY) as Theme | null
      if (stored && stored !== theme && (stored === 'calm' || stored === 'intra')) {
        setThemeState(stored)
      }
    } catch {
      // localStorage no disponible (SSR, modo privado)
    }
  // Solo al montar
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setTheme = useCallback(async (newTheme: Theme) => {
    if (newTheme === theme || isLoading) return

    // Optimistic update inmediato
    setThemeState(newTheme)
    try { localStorage.setItem(LS_KEY, newTheme) } catch {}
    document.documentElement.setAttribute('data-theme', newTheme)

    // Persistir en DB (best-effort)
    setIsLoading(true)
    try {
      await fetch('/api/user/theme', {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ theme: newTheme }),
      })
    } catch (err) {
      console.warn('[ThemeProvider] No se pudo persistir el tema en el servidor.', err)
      // El tema ya cambió localmente — no revertir
    } finally {
      setIsLoading(false)
    }
  }, [theme, isLoading])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  )
}
