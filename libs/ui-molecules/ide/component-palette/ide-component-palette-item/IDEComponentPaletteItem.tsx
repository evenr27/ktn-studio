'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export interface IDEComponentPaletteItemProps {
  /**
   * Component ID (from registry)
   */
  componentId: string

  /**
   * Component name to display
   */
  name: string

  /**
   * Click handler
   */
  onClick?: (componentId: string) => void

  /**
   * Additional CSS class
   */
  className?: string
}

/**
 * IDEComponentPaletteItem - Individual component item in the palette
 *
 * This component represents a single component in the palette list.
 * Displays the component name with hover effects.
 *
 * Usage:
 * ```tsx
 * <IDEComponentPaletteItem
 *   componentId="text-field"
 *   name="TextField"
 *   onClick={(id) => console.log('Clicked:', id)}
 * />
 * ```
 *
 * Part of the Compound Component pattern:
 * - IDEComponentPaletteContainer (root)
 * - IDEComponentPaletteCategory (collapsible section)
 * - IDEComponentPaletteItem (individual component)
 *
 * NOTE: This is a static display component for now.
 * Drag & drop functionality will be added in IDE-004.
 */
export const IDEComponentPaletteItem: React.FC<IDEComponentPaletteItemProps> = ({
  componentId,
  name,
  onClick,
  className,
}) => {
  const handleClick = () => {
    onClick?.(componentId)
  }

  return (
    <Box
      data-component-id={componentId}
      onClick={handleClick}
      className={className}
      sx={{
        px: 3,
        py: 1.5,
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        '&:hover': {
          backgroundColor: 'rgba(243,244,246,1)', // gray-100
        },
        '&:active': {
          backgroundColor: 'rgba(229,231,235,1)', // gray-200
        },
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: 13,
          color: 'rgba(55,65,81,1)', // gray-700
          userSelect: 'none',
        }}
      >
        {name}
      </Typography>
    </Box>
  )
}
