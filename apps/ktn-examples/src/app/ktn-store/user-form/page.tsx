'use client'

import * as React from 'react'
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Divider,
  Stack,
  Alert,
} from '@mui/material'
import { createKtnGitLikeStore } from '@ktn-store/factories'
import { createKtnGitLikeHook } from '@ktn-store/adapters'

/**
 * Example 2: User Form with Auto-commit and Discard
 *
 * This example demonstrates:
 * - stashField: Update individual fields without replacing entire state
 * - Multiple fields in a form scenario
 * - Visual feedback for uncommitted changes
 * - Practical use case: User profile editing
 */

// 1. Define the state shape
interface UserFormState {
  name: string
  email: string
  age: number
  bio: string
}

// 2. Create the store with initial data
const userFormStore = createKtnGitLikeStore<UserFormState>({
  storageKey: 'user-form-example',
  initialData: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 30,
    bio: 'Software developer passionate about clean architecture and state management.',
  },
  persistence: 'session', // Persists during browser session only
})

// 3. Create React hook for the store
const useUserForm = createKtnGitLikeHook(userFormStore)

/**
 * User form component demonstrating field-level updates.
 */
export default function UserFormPage() {
  // 4. Use the hook to access store data and methods
  const { stashData, commitData, stashField, commit, discard } = useUserForm()

  // 5. Helper to check if individual fields have changes
  const fieldHasChanges = (field: keyof UserFormState) => {
    return stashData[field] !== commitData[field]
  }

  const hasAnyChanges =
    stashData.name !== commitData.name ||
    stashData.email !== commitData.email ||
    stashData.age !== commitData.age ||
    stashData.bio !== commitData.bio

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Example 2: User Form
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Form with auto-commit and discard functionality using stashField for individual field
          updates.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Uncommitted Changes Alert */}
        {hasAnyChanges && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            You have uncommitted changes. Click "Save Changes" to commit or "Discard Changes" to
            revert.
          </Alert>
        )}

        {/* Form Fields */}
        <Stack spacing={3}>
          {/* Name Field */}
          <TextField
            label="Name"
            value={stashData.name}
            onChange={(e) => stashField('name', e.target.value)}
            fullWidth
            helperText={
              fieldHasChanges('name') ? `Changed from: "${commitData.name}"` : 'Your full name'
            }
            error={fieldHasChanges('name')}
          />

          {/* Email Field */}
          <TextField
            label="Email"
            type="email"
            value={stashData.email}
            onChange={(e) => stashField('email', e.target.value)}
            fullWidth
            helperText={
              fieldHasChanges('email')
                ? `Changed from: "${commitData.email}"`
                : 'Your email address'
            }
            error={fieldHasChanges('email')}
          />

          {/* Age Field */}
          <TextField
            label="Age"
            type="number"
            value={stashData.age}
            onChange={(e) => stashField('age', parseInt(e.target.value, 10) || 0)}
            fullWidth
            helperText={fieldHasChanges('age') ? `Changed from: ${commitData.age}` : 'Your age'}
            error={fieldHasChanges('age')}
          />

          {/* Bio Field */}
          <TextField
            label="Bio"
            value={stashData.bio}
            onChange={(e) => stashField('bio', e.target.value)}
            multiline
            rows={4}
            fullWidth
            helperText={fieldHasChanges('bio') ? 'Bio has been modified' : 'Tell us about yourself'}
            error={fieldHasChanges('bio')}
          />
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Action Buttons */}
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="success"
            onClick={commit}
            disabled={!hasAnyChanges}
            size="large"
          >
            Save Changes
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={discard}
            disabled={!hasAnyChanges}
            size="large"
          >
            Discard Changes
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Current State Display */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Current State:
          </Typography>
          <Stack direction="column" spacing={4}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="overline" color="text.secondary">
                Working Copy (stashData)
              </Typography>
              <Box
                component="pre"
                sx={{
                  fontSize: '0.75rem',
                  overflow: 'auto',
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                  p: 2,
                  borderRadius: 1,
                  mt: 1,
                }}
              >
                {JSON.stringify(stashData, null, 2)}
              </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="overline" color="text.secondary">
                Saved Copy (commitData)
              </Typography>
              <Box
                component="pre"
                sx={{
                  fontSize: '0.75rem',
                  overflow: 'auto',
                  bgcolor: 'grey.700',
                  color: 'grey.100',
                  p: 2,
                  borderRadius: 1,
                  mt: 1,
                }}
              >
                {JSON.stringify(commitData, null, 2)}
              </Box>
            </Box>
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Explanation */}
        <Box sx={{ p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            Key Features:
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2 }}>
            <li>
              <Typography variant="body2">
                <strong>stashField(key, value)</strong>: Updates individual field without replacing
                entire state
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Session Persistence</strong>: Data persists during browser session (try
                refreshing the page)
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Visual Feedback</strong>: Fields show red outline and display previous value
                when modified
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Bulk Operations</strong>: Save or discard all changes at once
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
          {`// 1. Create store with session persistence
const store = createKtnGitLikeStore({
  storageKey: 'user-form',
  initialData: { name: '', email: '', age: 0, bio: '' },
  persistence: 'session', // Persists during session
})

// 2. Create React hook
const useUserForm = createKtnGitLikeHook(store)

// 3. Use in component
const { stashData, stashField, commit, discard } = useUserForm()

// 4. Update individual fields
<TextField
  value={stashData.name}
  onChange={(e) => stashField('name', e.target.value)}
/>

// 5. Save all changes
<Button onClick={commit}>Save</Button>

// 6. Discard all changes
<Button onClick={discard}>Discard</Button>`}
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
