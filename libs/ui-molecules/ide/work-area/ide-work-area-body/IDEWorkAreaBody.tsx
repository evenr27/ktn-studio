'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export type IDEWorkAreaBodyProps = {
  children?: React.ReactNode
  placeholder?: string
  className?: string
}

export const IDEWorkAreaBody: React.FC<IDEWorkAreaBodyProps> = ({
  children,
  placeholder = 'Canvas / Work Area',
  className,
}) => {
  return (
    <Box
      className={className}
      sx={{
        height: '100%',
        border: '2px dashed rgba(209,213,219,1)',
        borderRadius: 2,
        bgcolor: 'rgba(249,250,251,1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(107,114,128,1)',
        fontSize: 13,
      }}
    >
      {children || (
        <Typography
          sx={{
            color: 'rgba(107,114,128,1)', // gray-500
          }}
        >
          {placeholder}
        </Typography>
      )}
    </Box>
  )
}
