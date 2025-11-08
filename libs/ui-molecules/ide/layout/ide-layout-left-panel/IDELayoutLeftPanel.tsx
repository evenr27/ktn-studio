'use client'

import * as React from 'react'
import Box from '@mui/material/Box'

export type IDELayoutLeftPanelProps = {
  children: React.ReactNode
  className?: string
  width?: number
}

export const IDELayoutLeftPanel: React.FC<IDELayoutLeftPanelProps> = ({
  children,
  className,
  width = 260,
}) => {
  return (
    <Box
      className={className}
      sx={{
        width: `${width}px`,
        minWidth: `${width}px`,
        maxWidth: `${width}px`,
        height: '100%',
        overflow: 'auto',
        borderRight: '1px solid #e0e0e0',
        backgroundColor: '#ffffff',
      }}
    >
      {children}
    </Box>
  )
}
