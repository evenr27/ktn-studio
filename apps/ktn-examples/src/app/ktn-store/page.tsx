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
  Button,
} from '@mui/material'
import Link from 'next/link'

/**
 * ktn-store examples index page.
 * Provides navigation to different ktn-store examples.
 */
export default function KtnStoreIndexPage() {
  const examples = [
    {
      title: 'Example 1: Basic Counter',
      description: 'Demonstrates stash, commit, and discard operations with a simple counter',
      href: '/ktn-store/counter',
    },
    {
      title: 'Example 2: User Form',
      description: 'Form with auto-commit and discard functionality using multiple fields',
      href: '/ktn-store/user-form',
    },
    {
      title: 'Example 3: Todo List',
      description:
        'Todo list with localStorage persistence showing data persistence across sessions',
      href: '/ktn-store/todo-list',
    },
    {
      title: 'Example 4: Multi-field Form',
      description: 'Optimized form with fine-grained selectors to prevent unnecessary re-renders',
      href: '/ktn-store/multi-field-form',
    },
  ]

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Button variant="text" href="/" sx={{ mb: 2 }}>
          ← Back to Main Index
        </Button>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          ktn-store Examples
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Practical examples demonstrating the functionality of ktn-store, our custom state
          management library with git-like stash/commit semantics.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Each example showcases different aspects of ktn-store:
        </Typography>
        <Box component="ul" sx={{ mt: 1, ml: 2 }}>
          <li>
            <Typography variant="body2">
              <strong>Git-like pattern:</strong> stashData (working copy) vs commitData (saved copy)
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              <strong>Persistence:</strong> localStorage and sessionStorage adapters
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              <strong>React integration:</strong> Custom hooks with useSyncExternalStore
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              <strong>Fine-grained subscriptions:</strong> Selector-based optimization
            </Typography>
          </li>
        </Box>
      </Box>

      <Paper elevation={2}>
        <List>
          {examples.map((example, index) => (
            <ListItem key={example.href} disablePadding divider={index < examples.length - 1}>
              <ListItemButton component={Link} href={example.href}>
                <ListItemText
                  primary={example.title}
                  secondary={example.description}
                  primaryTypographyProps={{ variant: 'h6' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Box sx={{ mt: 4, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
        <Typography variant="body2">
          <strong>Note:</strong> These examples use monolithic components for simplicity. In the
          actual Katana Studio application, we follow the compound component pattern and Clean
          Architecture principles.
        </Typography>
      </Box>
    </Container>
  )
}
