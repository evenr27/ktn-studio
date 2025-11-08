'use client'

import * as React from 'react'
import Box from '@mui/material/Box'

export type IDEComponentPaletteBodyProps = {
  children?: React.ReactNode
  className?: string
}

export const IDEComponentPaletteBody: React.FC<IDEComponentPaletteBodyProps> = ({
  children,
  className,
}) => {
  return (
    <Box
      className={className}
      sx={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      {children}
    </Box>
  )
}
