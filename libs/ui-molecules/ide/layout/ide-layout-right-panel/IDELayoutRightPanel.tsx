'use client'

import * as React from 'react'
import Box from '@mui/material/Box'

export type IDELayoutRightPanelProps = {
  children: React.ReactNode
  className?: string
  width?: number
}

export const IDELayoutRightPanel: React.FC<IDELayoutRightPanelProps> = ({
  children,
  className,
  width = 340,
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
        borderLeft: '1px solid #e0e0e0',
        backgroundColor: '#ffffff',
      }}
    >
      {children}
    </Box>
  )
}
