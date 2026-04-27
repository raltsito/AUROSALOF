'use client'

// OtpInput — ARUOSAL Sprint 2
// Input de 6 dígitos para verificación de código OTP.
// Accesible: etiquetas ARIA, navegación con teclado, soporte de pegado.

import { useRef, KeyboardEvent, ClipboardEvent } from 'react'
import styles from './OtpInput.module.css'

interface OtpInputProps {
  length?:   number
  value:     string
  onChange:  (v: string) => void
  disabled?: boolean
  hasError?: boolean
}

export function OtpInput({ length = 6, value, onChange, disabled, hasError }: OtpInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([])

  const digits = Array.from({ length }, (_, i) => value[i] ?? '')

  function focus(idx: number) {
    refs.current[idx]?.focus()
  }

  function handleChange(idx: number, raw: string) {
    const char = raw.replace(/\D/g, '').slice(-1) // Solo el último dígito ingresado
    if (!char) return
    const next = digits.map((d, i) => (i === idx ? char : d))
    onChange(next.join(''))
    if (idx < length - 1) focus(idx + 1)
  }

  function handleKeyDown(idx: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace') {
      e.preventDefault()
      if (digits[idx]) {
        const next = digits.map((d, i) => (i === idx ? '' : d))
        onChange(next.join(''))
      } else if (idx > 0) {
        const next = digits.map((d, i) => (i === idx - 1 ? '' : d))
        onChange(next.join(''))
        focus(idx - 1)
      }
      return
    }
    if (e.key === 'ArrowLeft'  && idx > 0)          focus(idx - 1)
    if (e.key === 'ArrowRight' && idx < length - 1)  focus(idx + 1)
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const raw    = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    const padded = raw.padEnd(length, ' ')
    const next   = Array.from({ length }, (_, i) => (raw[i] ?? ''))
    onChange(next.join(''))
    focus(Math.min(raw.length, length - 1))
  }

  return (
    <div
      className={[styles.row, hasError ? styles.rowError : ''].filter(Boolean).join(' ')}
      role="group"
      aria-label="Codigo de verificacion de 6 digitos"
    >
      {digits.map((digit, idx) => (
        <input
          key={idx}
          ref={el => { refs.current[idx] = el }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={2}            // maxLength=2 para capturar el nuevo dígito cuando hay uno previo
          value={digit}
          disabled={disabled}
          aria-label={`Digito ${idx + 1} de ${length}`}
          className={[
            styles.box,
            digit     ? styles.boxFilled : '',
            hasError  ? styles.boxError  : '',
          ].filter(Boolean).join(' ')}
          onChange={e => handleChange(idx, e.target.value)}
          onKeyDown={e => handleKeyDown(idx, e)}
          onPaste={idx === 0 ? handlePaste : undefined}
          onFocus={e => e.target.select()}
          autoComplete={idx === 0 ? 'one-time-code' : 'off'}
        />
      ))}
    </div>
  )
}
