'use client'

import * as React from 'react'
import Box from '@mui/material/Box'

export type IDEWorkAreaHeaderProps = {
  children?: React.ReactNode
  title?: string
  className?: string
}

export const IDEWorkAreaHeader: React.FC<IDEWorkAreaHeaderProps> = ({ children, className }) => {
  return (
    <Box
      className={className}
      sx={{
        p: 2,
        borderBottom: '1px solid rgba(229,231,235,1)', // gray-200
      }}
    >
      {children}
    </Box>
  )
}
