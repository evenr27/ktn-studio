'use client'

import * as React from 'react'
import Box from '@mui/material/Box'

export type IDELayoutBodyProps = {
  children: React.ReactNode
  className?: string
}

export const IDELayoutBody: React.FC<IDELayoutBodyProps> = ({ children, className }) => {
  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      {children}
    </Box>
  )
}
