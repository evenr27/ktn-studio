'use client'

import * as React from 'react'
import Box from '@mui/material/Box'

export type IDELayoutCenterProps = {
  children: React.ReactNode
  className?: string
}

export const IDELayoutCenter: React.FC<IDELayoutCenterProps> = ({ children, className }) => {
  return (
    <Box
      className={className}
      sx={{
        flexGrow: 1,
        height: '100%',
        overflow: 'auto',
        backgroundColor: '#fafafa',
        position: 'relative',
      }}
    >
      {children}
    </Box>
  )
}
