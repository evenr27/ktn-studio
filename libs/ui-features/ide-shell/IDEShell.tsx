'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import { IDEHeader } from '@ktn/ui-cells'

export const IDEShell: React.FC = () => {
  const leftPanelWidth = 260
  const rightPanelWidth = 340

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'rgba(2,6,23,1)', // slate-950
        color: 'rgba(226,232,240,1)',
      }}
    >
      {/* Header */}
      <IDEHeader title="KTN Studio" subtitle="Visual Form IDE" />

      {/* Menú debajo del header (placeholder por ahora) */}
      <Box
        component="nav"
        sx={{
          height: 36,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 1.5,
          borderBottom: '1px solid rgba(15,23,42,0.4)',
          bgcolor: 'rgba(15,23,42,0.2)',
        }}
      >
        {/* después lo cambiamos por un TopMenu en MUI */}
        <Box
          component="button"
          sx={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(226,232,240,0.85)',
            fontSize: 12,
            px: 1,
            py: 0.5,
            borderRadius: 1,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(15,23,42,0.6)',
            },
          }}
        >
          Designer
        </Box>
        <Box
          component="button"
          sx={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(148,163,184,0.85)',
            fontSize: 12,
            px: 1,
            py: 0.5,
            borderRadius: 1,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(15,23,42,0.4)',
            },
          }}
        >
          JSON
        </Box>
        <Box
          component="button"
          sx={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(148,163,184,0.85)',
            fontSize: 12,
            px: 1,
            py: 0.5,
            borderRadius: 1,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(15,23,42,0.4)',
            },
          }}
        >
          Preview
        </Box>
      </Box>

      {/* Main layout */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
        }}
      >
        {/* Left panel */}
        <Box
          sx={{
            width: leftPanelWidth,
            minWidth: leftPanelWidth,
            borderRight: '1px solid rgba(15,23,42,0.35)',
            bgcolor: 'rgba(15,23,42,0.12)',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}
        >
          <Box
            sx={{
              height: 34,
              px: 1.5,
              display: 'flex',
              alignItems: 'center',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              color: 'rgba(148,163,184,0.95)',
              borderBottom: '1px solid rgba(15,23,42,0.25)',
            }}
          >
            Components
          </Box>
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              p: 1.5,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            {/* placeholder components */}
            <Box
              sx={{
                fontSize: 12,
                bgcolor: 'rgba(15,23,42,0.35)',
                border: '1px solid rgba(15,23,42,0.1)',
                borderRadius: 1,
                px: 1.25,
                py: 0.6,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'rgba(15,23,42,0.6)',
                },
              }}
            >
              Form
            </Box>
            <Box
              sx={{
                fontSize: 12,
                bgcolor: 'rgba(15,23,42,0.35)',
                border: '1px solid rgba(15,23,42,0.1)',
                borderRadius: 1,
                px: 1.25,
                py: 0.6,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'rgba(15,23,42,0.6)',
                },
              }}
            >
              Text
            </Box>
            <Box
              sx={{
                fontSize: 12,
                bgcolor: 'rgba(15,23,42,0.35)',
                border: '1px solid rgba(15,23,42,0.1)',
                borderRadius: 1,
                px: 1.25,
                py: 0.6,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'rgba(15,23,42,0.6)',
                },
              }}
            >
              Select
            </Box>
          </Box>
        </Box>

        {/* Center content / canvas */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            p: 2,
            overflow: 'auto',
          }}
        >
          <Box
            sx={{
              height: '100%',
              border: '1px dashed rgba(148,163,184,0.25)',
              borderRadius: 2,
              bgcolor: 'rgba(15,23,42,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(148,163,184,0.7)',
              fontSize: 13,
            }}
          >
            Canvas / Work Area
          </Box>
        </Box>

        {/* Right panel */}
        <Box
          sx={{
            width: rightPanelWidth,
            minWidth: rightPanelWidth,
            borderLeft: '1px solid rgba(15,23,42,0.35)',
            bgcolor: 'rgba(15,23,42,0.05)',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}
        >
          <Box
            sx={{
              height: 34,
              px: 1.5,
              display: 'flex',
              alignItems: 'center',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              color: 'rgba(148,163,184,0.95)',
              borderBottom: '1px solid rgba(15,23,42,0.25)',
            }}
          >
            Properties
          </Box>
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              p: 1.5,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            {/* placeholder */}
            <Box sx={{ fontSize: 12, color: 'rgba(148,163,184,0.9)' }}>
              Select a component to edit.
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
