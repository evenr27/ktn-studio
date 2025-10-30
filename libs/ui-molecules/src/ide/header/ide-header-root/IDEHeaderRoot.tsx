'use client'

import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

export type IDEHeaderRootProps = {
  children: React.ReactNode
  className?: string
  elevation?: number
}

export const IDEHeaderRoot: React.FC<IDEHeaderRootProps> = ({
  children,
  className,
  elevation = 0,
}) => {
  return (
    <AppBar
      position="static"
      elevation={elevation}
      sx={{
        backgroundColor: 'rgba(2,6,23,1)', // slate-950
        borderBottom: '1px solid rgba(15,23,42,0.6)',
        minHeight: 48,
      }}
      className={className}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: 48,
          px: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
        }}
      >
        {children}
      </Toolbar>
    </AppBar>
  )
}
