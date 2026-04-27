'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input }  from '@/components/ui/Input'
import styles from '../auth.module.css'

export default function LoginPage() {
  const router = useRouter()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/auth/login', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email, password }),
    })

    const data = await res.json()
    setLoading(false)

    if (!data.ok) {
      setError(data.error ?? 'Correo o contrasena incorrectos.')
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Logo / marca */}
        <div className={styles.brand}>
          <div className={styles.logo} aria-hidden="true" />
          <h1 className={styles.title}>Bienvenido</h1>
          <p className={styles.subtitle}>Ingresa a tu espacio de bienestar</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <Input
            label="Correo electronico"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            autoComplete="email"
            required
          />
          <Input
            label="Contrasena"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />

          {error && (
            <p className={styles.errorBanner} role="alert">
              {error}
            </p>
          )}

          <Button type="submit" fullWidth loading={loading} size="lg">
            Ingresar
          </Button>
        </form>

        <p className={styles.footer}>
          No tienes cuenta?{' '}
          <Link href="/register" className={styles.link}>
            Registrate aqui
          </Link>
        </p>
      </div>
    </div>
  )
}
