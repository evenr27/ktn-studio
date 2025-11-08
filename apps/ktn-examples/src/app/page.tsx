'use client'

import * as React from 'react'
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Chip,
} from '@mui/material'
import Link from 'next/link'

/**
 * Main index page for ktn-examples.
 * Provides navigation to different example categories.
 */
export default function HomePage() {
  const categories = [
    {
      title: 'ktn-store Examples',
      description:
        'Explore our custom state management library with git-like stash/commit semantics',
      href: '/ktn-store',
      examples: 4,
      status: 'ready',
    },
    // Future categories will be added here:
    // {
    //   title: 'UI Components Examples',
    //   description: 'Compound components with MUI and Tailwind implementations',
    //   href: '/ui-components',
    //   examples: 0,
    //   status: 'coming-soon',
    // },
    // {
    //   title: 'Form Builder Examples',
    //   description: 'Visual form builder and runtime player demonstrations',
    //   href: '/form-builder',
    //   examples: 0,
    //   status: 'coming-soon',
    // },
  ]

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Katana Studio Examples
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Practical examples and demonstrations of Katana Studio's architecture and libraries
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Browse by category to explore different aspects of the Katana Studio ecosystem
        </Typography>
      </Box>

      <Paper elevation={2}>
        <List>
          {categories.map((category, index) => (
            <ListItem key={category.href} disablePadding divider={index < categories.length - 1}>
              <ListItemButton
                component={Link}
                href={category.href}
                disabled={category.status === 'coming-soon'}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6">{category.title}</Typography>
                      <Chip
                        label={`${category.examples} example${category.examples !== 1 ? 's' : ''}`}
                        size="small"
                        color={category.status === 'ready' ? 'success' : 'default'}
                      />
                      {category.status === 'coming-soon' && (
                        <Chip label="Coming Soon" size="small" color="warning" />
                      )}
                    </Box>
                  }
                  secondary={category.description}
                  primaryTypographyProps={{ component: 'div' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Box sx={{ mt: 4, p: 3, bgcolor: 'info.main', color: 'info.contrastText', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          About Katana Studio Examples
        </Typography>
        <Typography variant="body2" paragraph>
          This application showcases practical implementations of Katana Studio's architecture
          patterns and custom libraries. Each example category demonstrates different aspects of the
          system:
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 2 }}>
          <li>
            <Typography variant="body2">
              <strong>State Management:</strong> ktn-store with git-like stash/commit pattern
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              <strong>Component Architecture:</strong> Compound components and Clean Architecture
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              <strong>Form System:</strong> Visual form builder and declarative runtime player
            </Typography>
          </li>
        </Box>
      </Box>

      <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary">
          <strong>Note:</strong> These examples use simplified implementations for demonstration
          purposes. Production code in Katana Studio follows stricter architectural patterns
          including compound components, ports & adapters, and comprehensive unit testing.
        </Typography>
      </Box>
    </Container>
  )
}
