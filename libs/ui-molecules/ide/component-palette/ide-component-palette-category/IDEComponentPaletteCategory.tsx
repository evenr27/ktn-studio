'use client'

import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export interface IDEComponentPaletteCategoryProps {
  /**
   * Category title
   */
  title: string

  /**
   * Whether category should be expanded by default
   */
  defaultExpanded?: boolean

  /**
   * Child components (IDEComponentPaletteItem components)
   */
  children?: React.ReactNode

  /**
   * Additional CSS class
   */
  className?: string
}

/**
 * IDEComponentPaletteCategory - Collapsible category section in the component palette
 *
 * This component represents a category of components in the palette.
 * It uses MUI Accordion for collapsible behavior.
 *
 * Usage:
 * ```tsx
 * <IDEComponentPaletteCategory title="Text Inputs" defaultExpanded={true}>
 *   <IDEComponentPaletteItem name="TextField" />
 *   <IDEComponentPaletteItem name="NumberField" />
 * </IDEComponentPaletteCategory>
 * ```
 *
 * Part of the Compound Component pattern:
 * - IDEComponentPaletteContainer (root)
 * - IDEComponentPaletteCategory (collapsible section)
 * - IDEComponentPaletteItem (individual component)
 */
export const IDEComponentPaletteCategory: React.FC<IDEComponentPaletteCategoryProps> = ({
  title,
  defaultExpanded = true,
  children,
  className,
}) => {
  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      className={className}
      disableGutters
      elevation={0}
      sx={{
        '&:before': {
          display: 'none',
        },
        '&.Mui-expanded': {
          margin: 0,
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ fontSize: 18 }} />}
        sx={{
          minHeight: 40,
          px: 2,
          py: 0.5,
          '&.Mui-expanded': {
            minHeight: 40,
          },
          '& .MuiAccordionSummary-content': {
            margin: '8px 0',
          },
          '& .MuiAccordionSummary-content.Mui-expanded': {
            margin: '8px 0',
          },
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            fontSize: 12,
            textTransform: 'uppercase',
            color: 'rgba(75,85,99,1)', // gray-600
            letterSpacing: '0.05em',
          }}
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          p: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  )
}
