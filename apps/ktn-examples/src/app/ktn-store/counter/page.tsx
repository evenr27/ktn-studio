'use client'

import * as React from 'react'
import { Box, Button, Container, Paper, Typography, Divider, Stack } from '@mui/material'
import { createKtnGitLikeStore } from '@ktn-store/factories'
import { createKtnGitLikeHook } from '@ktn-store/adapters'

/**
 * Example 1: Basic Counter with Git-like State
 *
 * This example demonstrates the core functionality of ktn-store:
 * - stash: Make changes to working copy (stashData)
 * - commit: Save changes to commitData
 * - discard: Revert stashData to last committed state
 *
 * The counter has two states:
 * - stashData: Current value (can be uncommitted changes)
 * - commitData: Last saved value
 */

// 1. Define the state shape
interface CounterState {
  count: number
}

// 2. Create the store with initial data
const counterStore = createKtnGitLikeStore<CounterState>({
  storageKey: 'counter-example',
  initialData: { count: 0 },
  persistence: 'none', // No persistence for this simple example
})

// 3. Create React hook for the store
const useCounter = createKtnGitLikeHook(counterStore)

/**
 * Counter component demonstrating git-like state management.
 */
export default function CounterPage() {
  // 4. Use the hook to access store data and methods
  const { stashData, commitData, stash, commit, discard } = useCounter()

  // 5. Helper functions to update the counter
  const increment = () => {
    stash({ count: stashData.count + 1 })
  }

  const decrement = () => {
    stash({ count: stashData.count - 1 })
  }

  const reset = () => {
    stash({ count: 0 })
  }

  // 6. Check if there are uncommitted changes
  const hasChanges = stashData.count !== commitData.count

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Example 1: Basic Counter
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Demonstrates stash, commit, and discard operations with a simple counter.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Current State Display */}
        <Box sx={{ mb: 4 }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="overline" color="text.secondary">
                Working Copy (stashData)
              </Typography>
              <Typography variant="h2" component="div" color="primary">
                {stashData.count}
              </Typography>
            </Box>

            <Box>
              <Typography variant="overline" color="text.secondary">
                Saved Copy (commitData)
              </Typography>
              <Typography variant="h3" component="div" color="text.secondary">
                {commitData.count}
              </Typography>
            </Box>

            {hasChanges && (
              <Box sx={{ p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
                <Typography variant="body2" color="warning.dark">
                  ⚠️ You have uncommitted changes! (Difference: {stashData.count - commitData.count}
                  )
                </Typography>
              </Box>
            )}
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Counter Controls */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Modify Working Copy (stash)
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" onClick={decrement}>
              - Decrement
            </Button>
            <Button variant="outlined" onClick={increment}>
              + Increment
            </Button>
            <Button variant="outlined" onClick={reset}>
              Reset to 0
            </Button>
          </Stack>
        </Box>

        {/* Git-like Operations */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Git-like Operations
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" color="success" onClick={commit} disabled={!hasChanges}>
              Commit Changes
            </Button>
            <Button variant="contained" color="error" onClick={discard} disabled={!hasChanges}>
              Discard Changes
            </Button>
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Explanation */}
        <Box sx={{ p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            How it works:
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2 }}>
            <li>
              <Typography variant="body2">
                <strong>stash()</strong>: Updates working copy (stashData)
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>commit()</strong>: Saves stashData → commitData
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>discard()</strong>: Reverts stashData ← commitData
              </Typography>
            </li>
          </Box>
        </Box>
      </Paper>

      {/* Code Example */}
      <Paper elevation={1} sx={{ mt: 4, p: 3, bgcolor: 'grey.50' }}>
        <Typography variant="subtitle2" gutterBottom>
          Code Example:
        </Typography>
        <Box
          component="pre"
          sx={{
            fontSize: '0.875rem',
            overflow: 'auto',
            bgcolor: 'grey.900',
            color: 'grey.100',
            p: 2,
            borderRadius: 1,
          }}
        >
          {`// 1. Create store
const store = createKtnGitLikeStore({
  storageKey: 'counter',
  initialData: { count: 0 },
})

// 2. Create React hook
const useCounter = createKtnGitLikeHook(store)

// 3. Use in component
const { stashData, commitData, stash, commit, discard } = useCounter()

// 4. Update working copy
stash({ count: stashData.count + 1 })

// 5. Save changes
commit()

// 6. Discard changes
discard()`}
        </Box>
      </Paper>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Button variant="text" href="/ktn-store">
          ← Back to ktn-store Examples
        </Button>
      </Box>
    </Container>
  )
}
