// Utilidades de cifrado — ARUOSAL Sprint 2
// AES-256-GCM para datos sensibles en reposo
// SHA-256 para hashing determinista (OTP codes, text_hash)
//
// Requiere: ENCRYPTION_KEY en .env (64 hex chars = 32 bytes)
// Generar: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

import { createCipheriv, createDecipheriv, randomBytes, createHash } from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const KEY_BYTES = 32 // 256 bits
const IV_BYTES  = 12 // 96 bits — recomendado para GCM
const TAG_BYTES = 16 // 128 bits auth tag

// ─── Clave de cifrado ─────────────────────────────────────────────────────────

function getDerivedKey(): Buffer {
  const raw = process.env.ENCRYPTION_KEY
  if (!raw) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('ENCRYPTION_KEY es obligatoria en produccion.')
    }
    // Dev: clave derivada del secreto JWT para no romper sin config
    const fallback = process.env.JWT_SECRET ?? 'dev_secret_reemplazar_en_produccion'
    return createHash('sha256').update(fallback).digest().slice(0, KEY_BYTES)
  }
  const buf = Buffer.from(raw, 'hex')
  if (buf.length < KEY_BYTES) throw new Error('ENCRYPTION_KEY debe tener al menos 64 caracteres hex.')
  return buf.slice(0, KEY_BYTES)
}

// ─── Cifrado simétrico AES-256-GCM ───────────────────────────────────────────

/**
 * Cifra texto plano.
 * Formato del resultado: "<iv_hex>:<tag_hex>:<ciphertext_hex>"
 * Todos los segmentos son hex; se puede almacenar como string en la DB.
 */
export function encryptText(plaintext: string): string {
  const key     = getDerivedKey()
  const iv      = randomBytes(IV_BYTES)
  const cipher  = createCipheriv(ALGORITHM, key, iv)
  const enc     = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
  const tag     = cipher.getAuthTag()
  return `${iv.toString('hex')}:${tag.toString('hex')}:${enc.toString('hex')}`
}

/**
 * Descifra un payload producido por encryptText.
 * Lanza un error si el tag de autenticación no coincide (datos alterados).
 */
export function decryptText(payload: string): string {
  const parts = payload.split(':')
  if (parts.length !== 3) throw new Error('Formato de payload cifrado inválido.')
  const [ivHex, tagHex, encHex] = parts
  const key      = getDerivedKey()
  const iv       = Buffer.from(ivHex, 'hex')
  const tag      = Buffer.from(tagHex, 'hex')
  const enc      = Buffer.from(encHex, 'hex')
  const decipher = createDecipheriv(ALGORITHM, key, iv)
  decipher.setAuthTag(tag)
  return Buffer.concat([decipher.update(enc), decipher.final()]).toString('utf8')
}

// ─── Hashing determinista ─────────────────────────────────────────────────────

/**
 * SHA-256 de una cadena. Uso: almacenar OTP codes, text_hash del aviso.
 * No usar para contraseñas — usar Argon2id.
 */
export function sha256(input: string): string {
  return createHash('sha256').update(input, 'utf8').digest('hex')
}
