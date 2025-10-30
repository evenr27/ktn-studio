'use client'

import * as React from 'react'
import Box from '@mui/material/Box'

export type IDEHeaderLogoProps = {
  children?: React.ReactNode
  className?: string
}

export const IDEHeaderLogo: React.FC<IDEHeaderLogoProps> = ({ children, className }) => {
  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      {children ?? (
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: '9999px',
            bgcolor: 'error.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          K
        </Box>
      )}
    </Box>
  )
}
