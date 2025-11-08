'use client'

import * as React from 'react'
import Button from '@mui/material/Button'

export interface ButtonControlProps {
  /**
   * Button label/text
   */
  label?: string

  /**
   * Button variant
   */
  variant?: 'text' | 'outlined' | 'contained'

  /**
   * Button color
   */
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

  /**
   * Disabled state
   */
  disabled?: boolean

  /**
   * Click handler
   */
  onClick?: () => void

  /**
   * Additional CSS class
   */
  className?: string
}

/**
 * ButtonControl - Presentational button component
 *
 * Displays a standard button with configurable variant and color.
 *
 * NOTE: This is a "bruto" (raw) component for visual purposes only.
 * It does NOT include:
 * - Form submission logic
 * - Validation triggers
 * - Git-like state (stash/commit)
 * - CreateFormField factory pattern
 *
 * Those features will be added in future phases.
 */
export const ButtonControl: React.FC<ButtonControlProps> = ({
  label = 'Button',
  variant = 'contained',
  color = 'primary',
  disabled = false,
  onClick,
  className,
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {label}
    </Button>
  )
}
