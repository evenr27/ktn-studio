'use client'

import * as React from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { IDEHeaderRoot, IDEHeaderLogo, IDEHeaderTitle, IDEHeaderActions } from '@ktn/ui-molecules'

type IDEHeaderProps = {
  title?: string
  subtitle?: string
  rightSlot?: React.ReactNode
}

export const IDEHeader: React.FC<IDEHeaderProps> = ({
  title = 'KTN Form',
  subtitle = 'Form builder',
  rightSlot,
}) => {
  return (
    <IDEHeaderRoot>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IDEHeaderLogo />
        <IDEHeaderTitle subtitle={subtitle}>{title}</IDEHeaderTitle>
      </Box>
      <IDEHeaderActions>
        {rightSlot ?? (
          <>
            <Button
              size="small"
              variant="outlined"
              sx={{
                borderColor: 'rgba(148,163,184,0.35)',
                color: 'rgba(226,232,240,1)',
                textTransform: 'none',
                fontSize: 12,
                lineHeight: 1,
                py: 0.5,
                '&:hover': {
                  borderColor: 'rgba(148,163,184,0.7)',
                  backgroundColor: 'rgba(15,23,42,0.4)',
                },
              }}
            >
              Save
            </Button>
            <Button
              size="small"
              variant="contained"
              sx={{
                textTransform: 'none',
                fontSize: 12,
                lineHeight: 1,
                py: 0.5,
                bgcolor: 'rgba(226,232,240,1)',
                color: 'rgba(2,6,23,1)',
                '&:hover': {
                  bgcolor: 'rgba(203,213,225,1)',
                },
              }}
            >
              Preview
            </Button>
          </>
        )}
      </IDEHeaderActions>
    </IDEHeaderRoot>
  )
}
