// Auth utilities — ARUOSAL Sprint 2
// Contraseñas: Argon2id (migrado desde bcrypt en Sprint 1)
// JWT: HS256 con jose; tokens de 15 min (access) y 7 d (session cookie)
//
// Instalación requerida: npm install argon2
// Si el entorno no soporta módulos nativos, usar @node-rs/argon2 como alternativa.

import { SignJWT, jwtVerify } from 'jose'
import { cookies }            from 'next/headers'
import { UserSession }        from '@/types'

const COOKIE_NAME = 'aruosal_session'
const JWT_SECRET  = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'dev_secret_reemplazar_en_produccion'
)

// ─── Argon2id ─────────────────────────────────────────────────────────────────
// Parámetros según OWASP 2023: m=65536 (64 MiB), t=3, p=4
// Sprint 1 usaba bcrypt rounds=12. Los hashes existentes siguen siendo
// verificables con verifyPassword que detecta el formato automáticamente.

const ARGON2_OPTIONS = {
  memoryCost: 65536, // 64 MiB
  timeCost:   3,
  parallelism: 4,
  type: 2,          // Argon2id = type 2
} as const

export async function hashPassword(password: string): Promise<string> {
  // Importación dinámica para compatibilidad con Next.js build
  const argon2 = await import('argon2')
  return argon2.hash(password, ARGON2_OPTIONS)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // Detectar si es hash bcrypt ($2a$ o $2b$) para compatibilidad migratoria
  if (hash.startsWith('$2a$') || hash.startsWith('$2b$')) {
    const bcrypt = await import('bcryptjs')
    return bcrypt.compare(password, hash)
  }
  // Argon2id (Sprint 2+)
  const argon2 = await import('argon2')
  return argon2.verify(hash, password)
}

// ─── JWT ─────────────────────────────────────────────────────────────────────

export async function createSession(user: UserSession): Promise<string> {
  return new SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)
}

export async function verifySession(token: string): Promise<UserSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as UserSession
  } catch {
    return null
  }
}

// ─── Helpers de cookie ────────────────────────────────────────────────────────

export async function setSessionCookie(token: string): Promise<void> {
  const store = await cookies()
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge:   60 * 60 * 24 * 7, // 7 días
    path:     '/',
  })
}

export async function getSessionCookie(): Promise<string | undefined> {
  const store = await cookies()
  return store.get(COOKIE_NAME)?.value
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

export async function getCurrentUser(): Promise<UserSession | null> {
  const token = await getSessionCookie()
  if (!token) return null
  return verifySession(token)
}

// ─── Validación de inputs ─────────────────────────────────────────────────────

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validatePassword(password: string): { ok: boolean; error?: string } {
  if (password.length < 8)    return { ok: false, error: 'Minimo 8 caracteres.' }
  if (!/[A-Z]/.test(password)) return { ok: false, error: 'Al menos una mayuscula.' }
  if (!/[0-9]/.test(password)) return { ok: false, error: 'Al menos un numero.' }
  return { ok: true }
}
