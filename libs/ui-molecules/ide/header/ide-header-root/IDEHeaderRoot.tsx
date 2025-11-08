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
        backgroundColor: '#004C97',
        borderBottom: '1px solid #004C97',
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
