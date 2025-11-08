'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export type IDEPropertiesPanelBodyProps = {
  children?: React.ReactNode
  placeholder?: string
  className?: string
}

export const IDEPropertiesPanelBody: React.FC<IDEPropertiesPanelBodyProps> = ({
  children,
  placeholder = 'Select a component to edit.',
  className,
}) => {
  return (
    <Box
      className={className}
      sx={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        flexDirection: 'column',
        p: 1.5,
        gap: 1,
        bgcolor: 'white',
      }}
    >
      {children || (
        <Typography
          variant="body2"
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
