// Rate Limiter — ARUOSAL Sprint 2
// Implementación en memoria para desarrollo/staging.
// La interfaz RateLimiter permite swappear a Redis sin cambiar los llamadores.
//
// Para Sprint 3 (producción):
//   npm install ioredis    (o @upstash/redis si se usa serverless)
//   Implementar RedisRateLimiter con INCR + EXPIRE via pipeline.
//
// ADVERTENCIA: MemoryRateLimiter no funciona en entornos multi-instancia
// (Vercel serverless, workers paralelos). Usar Redis en producción.

// ─── Interfaz pública ─────────────────────────────────────────────────────────

export interface RateLimitResult {
  allowed:   boolean
  remaining: number
  resetAtMs: number // timestamp Unix (ms) cuando se resetea la ventana
}

export interface RateLimiter {
  /** Consume un intento. Retorna si se permite y cuántos quedan. */
  check(key: string, limit: number, windowMs: number): Promise<RateLimitResult>
  /** Resetea manualmente el contador (e.g. tras login exitoso). */
  reset(key: string): Promise<void>
}

// ─── Implementación en memoria ────────────────────────────────────────────────

interface Record {
  count:   number
  resetAt: number // timestamp ms
}

class MemoryRateLimiter implements RateLimiter {
  private store = new Map<string, Record>()

  async check(key: string, limit: number, windowMs: number): Promise<RateLimitResult> {
    const now = Date.now()
    const rec = this.store.get(key)

    if (!rec || rec.resetAt <= now) {
      const resetAt = now + windowMs
      this.store.set(key, { count: 1, resetAt })
      return { allowed: true, remaining: limit - 1, resetAtMs: resetAt }
    }

    if (rec.count >= limit) {
      return { allowed: false, remaining: 0, resetAtMs: rec.resetAt }
    }

    rec.count++
    return { allowed: true, remaining: limit - rec.count, resetAtMs: rec.resetAt }
  }

  async reset(key: string): Promise<void> {
    this.store.delete(key)
  }
}

// ─── Singleton exportado ──────────────────────────────────────────────────────
// En Sprint 3: sustituir por RedisRateLimiter(process.env.REDIS_URL)

export const rateLimiter: RateLimiter = new MemoryRateLimiter()

// ─── Stub Redis (Sprint 3) ────────────────────────────────────────────────────
//
// import Redis from 'ioredis'
//
// class RedisRateLimiter implements RateLimiter {
//   constructor(private client: Redis) {}
//
//   async check(key: string, limit: number, windowMs: number): Promise<RateLimitResult> {
//     const resetAt  = Date.now() + windowMs
//     const pipeline = this.client.pipeline()
//     pipeline.incr(key)
//     pipeline.pexpire(key, windowMs)
//     const [[, count]] = await pipeline.exec() as [[null, number]]
//     if (count === 1) await this.client.pexpire(key, windowMs)
//     const allowed = count <= limit
//     return { allowed, remaining: Math.max(0, limit - count), resetAtMs: resetAt }
//   }
//
//   async reset(key: string): Promise<void> {
//     await this.client.del(key)
//   }
// }
