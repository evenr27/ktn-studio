'use client'

import * as React from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

export interface CheckBoxControlProps {
  /**
   * Field label
   */
  label?: string

  /**
   * Checked state
   */
  checked?: boolean

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
  onChange?: (checked: boolean) => void

  /**
   * Additional CSS class
   */
  className?: string
}

/**
 * CheckBoxControl - Presentational checkbox component
 *
 * Displays a single checkbox for boolean selection.
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
export const CheckBoxControl: React.FC<CheckBoxControlProps> = ({
  label,
  checked = false,
  disabled = false,
  required = false,
  onChange,
  className,
}) => {
  // Handle change event
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.checked)
  }

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          size="small"
        />
      }
      label={label || ''}
      className={className}
      sx={{
        width: '100%',
      }}
    />
  )
}
