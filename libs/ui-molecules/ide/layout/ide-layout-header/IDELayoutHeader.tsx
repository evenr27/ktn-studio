'use client'

import * as React from 'react'
import Box from '@mui/material/Box'

export type IDELayoutHeaderProps = {
  children: React.ReactNode
  className?: string
}

export const IDELayoutHeader: React.FC<IDELayoutHeaderProps> = ({ children, className }) => {
  return (
    <Box
      className={className}
      sx={{
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </Box>
  )
}
