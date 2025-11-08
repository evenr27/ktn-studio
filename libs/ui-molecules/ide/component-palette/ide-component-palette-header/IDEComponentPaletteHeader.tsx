'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export type IDEComponentPaletteHeaderProps = {
  children?: React.ReactNode
  title?: string
  className?: string
}

export const IDEComponentPaletteHeader: React.FC<IDEComponentPaletteHeaderProps> = ({
  children,
  title = 'Component Palette',
  className,
}) => {
  return (
    <Box
      className={className}
      sx={{
        p: 2,
        borderBottom: '1px solid rgba(229,231,235,1)', // gray-200
      }}
    >
      {children || (
        <Typography
          variant="subtitle2"
          sx={{
            textTransform: 'uppercase',
            fontWeight: 600,
            color: 'rgba(75,85,99,1)', // gray-600
            fontSize: 12,
          }}
        >
          {title}
        </Typography>
      )}
    </Box>
  )
}
