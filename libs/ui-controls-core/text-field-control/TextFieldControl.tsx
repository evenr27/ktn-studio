'use client'

import * as React from 'react'
import TextField from '@mui/material/TextField'
import type { TextFieldVariant } from '@ktn/core-form'

export interface TextFieldControlProps {
  /**
   * TextField variant (determines input type and behavior)
   */
  type: TextFieldVariant

  /**
   * Field label
   */
  label?: string

  /**
   * Placeholder text
   */
  placeholder?: string

  /**
   * Current value
   */
  value?: string

  /**
   * Disabled state
   */
  disabled?: boolean

  /**
   * Required indicator
   */
  required?: boolean

  /**
   * Change handler
   */
  onChange?: (value: string) => void

  /**
   * Additional CSS class
   */
  className?: string
}

/**
 * TextFieldControl - Presentational text input component
 *
 * Supports 6 variants via the `type` prop:
 * - text: General text input
 * - number: Numeric input
 * - email: Email format
 * - phone: Phone number
 * - alphanumeric: Letters and numbers only
 * - date: Date input
 *
 * NOTE: This is a "bruto" (raw) component for visual purposes only.
 * It does NOT include:
 * - Validation logic
 * - Git-like state (stash/commit)
 * - Auto-commit behavior
 * - CreateFormField factory pattern
 *
 * Those features will be added in future phases.
 */
export const TextFieldControl: React.FC<TextFieldControlProps> = ({
  type,
  label,
  placeholder,
  value = '',
  disabled = false,
  required = false,
  onChange,
  className,
}) => {
  // Determine the HTML input type based on variant
  const getInputType = (): string => {
    switch (type) {
      case 'number':
        return 'number'
      case 'email':
        return 'email'
      case 'phone':
        return 'tel'
      case 'date':
        return 'date'
      case 'text':
      case 'alphanumeric':
      default:
        return 'text'
    }
  }

  // Handle change event
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value

    // For alphanumeric, filter out non-alphanumeric characters
    if (type === 'alphanumeric') {
      newValue = newValue.replace(/[^a-zA-Z0-9]/g, '')
    }

    onChange?.(newValue)
  }

  return (
    <TextField
      type={getInputType()}
      label={label}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      required={required}
      onChange={handleChange}
      className={className}
      fullWidth
      variant="outlined"
      size="small"
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: disabled ? 'rgba(0,0,0,0.05)' : '#ffffff',
        },
      }}
    />
  )
}
