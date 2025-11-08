'use client'

import * as React from 'react'
import Box from '@mui/material/Box'

export type IDEWorkAreaRootProps = {
  children: React.ReactNode
  className?: string
}

export const IDEWorkAreaRoot: React.FC<IDEWorkAreaRootProps> = ({ children, className }) => {
  return (
    <Box
      className={className}
      sx={{
        p: 2,
        height: '100%',
        overflow: 'auto',
        bgcolor: 'rgba(255,255,255,1)',
      }}
    >
      {children}
    </Box>
  )
}
