'use client'

import React from 'react'
import styles from './Card.module.css'

interface CardProps {
  children:   React.ReactNode
  variant?:   'default' | 'alt' | 'ghost'
  padding?:   'sm' | 'md' | 'lg'
  className?: string
  onClick?:   () => void
  role?:      string
  tabIndex?:  number
}

export function Card({
  children,
  variant   = 'default',
  padding   = 'md',
  className = '',
  onClick,
  ...rest
}: CardProps) {
  const Tag = onClick ? 'button' : 'div'

  return (
    <Tag
      className={[
        styles.card,
        styles[variant],
        styles[`pad-${padding}`],
        onClick ? styles.clickable : '',
        className,
      ].filter(Boolean).join(' ')}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Tag>
  )
}
