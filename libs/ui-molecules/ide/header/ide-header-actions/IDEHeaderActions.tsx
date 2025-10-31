// libs/ui-molecules/ide/IDEHeaderActions.tsx
'use client'

import * as React from 'react'
import Box from '@mui/material/Box'

export type IDEHeaderActionsProps = {
  children?: React.ReactNode
  className?: string
}

export const IDEHeaderActions: React.FC<IDEHeaderActionsProps> = ({ children, className }) => {
  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      {children}
    </Box>
  )
}
