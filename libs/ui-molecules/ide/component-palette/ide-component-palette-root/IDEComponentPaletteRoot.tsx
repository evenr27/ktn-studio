'use client'

import * as React from 'react'
import Box from '@mui/material/Box'

export type IDEComponentPaletteRootProps = {
  children: React.ReactNode
  className?: string
}

export const IDEComponentPaletteRoot: React.FC<IDEComponentPaletteRootProps> = ({
  children,
  className,
}) => {
  return (
    <Box
      className={className}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgba(249,250,251,1)', // gray-50
      }}
    >
      {children}
    </Box>
  )
}
