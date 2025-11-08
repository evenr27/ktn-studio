'use client'

import * as React from 'react'
import Box from '@mui/material/Box'

export type IDELayoutRootProps = {
  children: React.ReactNode
  className?: string
}

export const IDELayoutRoot: React.FC<IDELayoutRootProps> = ({ children, className }) => {
  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        position: 'fixed',
        top: 0,
        left: 0,
        margin: 0,
        padding: 0,
      }}
    >
      {children}
    </Box>
  )
}
