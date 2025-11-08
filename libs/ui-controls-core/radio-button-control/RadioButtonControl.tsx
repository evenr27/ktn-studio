'use client'

import * as React from 'react'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'

export interface RadioButtonOption {
  label: string
  value: string
}

export interface RadioButtonControlProps {
  /**
   * Field label
   */
  label?: string

  /**
   * Radio button options
   */
  options?: RadioButtonOption[]

  /**
   * Selected value
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
 * RadioButtonControl - Presentational radio button group component
 *
 * Displays a group of radio buttons for single selection.
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
export const RadioButtonControl: React.FC<RadioButtonControlProps> = ({
  label,
  options = [],
  value = '',
  disabled = false,
  required = false,
  onChange,
  className,
}) => {
  // Handle change event
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value)
  }

  return (
    <FormControl
      component="fieldset"
      disabled={disabled}
      required={required}
      className={className}
      sx={{
        width: '100%',
      }}
    >
      {label && <FormLabel component="legend">{label}</FormLabel>}
      <RadioGroup value={value} onChange={handleChange}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio size="small" />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
