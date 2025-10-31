'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export type IDEHeaderTitleProps = {
  children?: React.ReactNode
  subtitle?: string
  className?: string
}

export const IDEHeaderTitle: React.FC<IDEHeaderTitleProps> = ({
  children,
  subtitle,
  className,
}) => {
  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        lineHeight: 1,
      }}
    >
      <Typography variant="body2" sx={{ lineHeight: 1 }}>
        {children ?? 'Untitled form'}
      </Typography>
      {subtitle ? (
        <Typography
          variant="caption"
          sx={{ color: 'rgba(148,163,184,1)', mt: 0.25, lineHeight: 1 }}
        >
          {subtitle}
        </Typography>
      ) : null}
    </Box>
  )
}
