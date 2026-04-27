'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input }  from '@/components/ui/Input'
import styles from '../auth.module.css'

function passwordStrength(pw: string): { level: 0 | 1 | 2 | 3; label: string } {
  if (pw.length === 0) return { level: 0, label: '' }
  let score = 0
  if (pw.length >= 8)       score++
  if (/[A-Z]/.test(pw))    score++
  if (/[0-9]/.test(pw))    score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  const labels = ['', 'Debil', 'Regular', 'Fuerte']
  return { level: Math.min(3, score) as 0|1|2|3, label: labels[Math.min(3, score)] }
}

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name:        '',
    email:       '',
    password:    '',
    company_code: '',
  })
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const strength = passwordStrength(form.password)

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    if (form.name.trim().length < 2) {
      setError('El nombre debe tener al menos 2 caracteres.')
      return
    }
    if (strength.level < 2) {
      setError('La contrasena es demasiado debil. Usa al menos 8 caracteres, una mayuscula y un numero.')
      return
    }

    setLoading(true)
    const res = await fetch('/api/auth/register', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(form),
    })
    const data = await res.json()
    setLoading(false)

    if (!data.ok) {
      setError(data.error ?? 'Ocurrio un error. Intenta de nuevo.')
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <div className={styles.logo} aria-hidden="true" />
          <h1 className={styles.title}>Crea tu cuenta</h1>
          <p className={styles.subtitle}>Empieza a cuidar tu bienestar</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <Input
            label="Nombre completo"
            type="text"
            value={form.name}
            onChange={update('name')}
            placeholder="Ana Garcia"
            autoComplete="name"
            required
          />
          <Input
            label="Correo electronico"
            type="email"
            value={form.email}
            onChange={update('email')}
            placeholder="tu@correo.com"
            autoComplete="email"
            required
          />
          <div>
            <Input
              label="Contrasena"
              type="password"
              value={form.password}
              onChange={update('password')}
              placeholder="Minimo 8 caracteres"
              autoComplete="new-password"
              hint="Al menos 8 caracteres, una mayuscula y un numero"
              required
            />
            {form.password.length > 0 && (
              <div className={registerStyles.strengthBar} aria-label={`Fortaleza: ${strength.label}`}>
                <div
                  className={`${registerStyles.strengthFill} ${registerStyles[`strength${strength.level}`]}`}
                  style={{ width: `${(strength.level / 3) * 100}%` }}
                />
                <span className={registerStyles.strengthLabel}>{strength.label}</span>
              </div>
            )}
          </div>
          <Input
            label="Codigo de empresa (opcional)"
            type="text"
            value={form.company_code}
            onChange={update('company_code')}
            placeholder="Ej: INTRA-2024"
            hint="Tu empresa te lo proporciona. Puedes agregarlo despues."
          />

          {error && (
            <p className={styles.errorBanner} role="alert">{error}</p>
          )}

          <Button type="submit" fullWidth loading={loading} size="lg">
            Crear cuenta
          </Button>
        </form>

        <p className={styles.footer}>
          Ya tienes cuenta?{' '}
          <Link href="/login" className={styles.link}>Inicia sesion</Link>
        </p>
      </div>
    </div>
  )
}

// Estilos inline del medidor de fortaleza (sin archivo extra)
const registerStyles: Record<string, string> = {
  strengthBar:    'strengthBar',
  strengthFill:   'strengthFill',
  strength0:      '',
  strength1:      'strengthWeak',
  strength2:      'strengthFair',
  strength3:      'strengthStrong',
  strengthLabel:  'strengthLabel',
}
