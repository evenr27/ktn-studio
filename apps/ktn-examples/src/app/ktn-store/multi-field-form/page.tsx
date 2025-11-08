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
  Chip,
} from '@mui/material'
import { createKtnGitLikeStore } from '@ktn-store/factories'
import { createKtnGitLikeHook } from '@ktn-store/adapters'

/**
 * Example 4: Multi-field Form with Selector Optimization
 *
 * This example demonstrates:
 * - subscribeSelector for fine-grained reactivity
 * - Preventing unnecessary re-renders
 * - Performance optimization with selectors
 * - Render count tracking to show optimization benefits
 *
 * Key concept: Components only re-render when THEIR selected data changes,
 * not when the entire store updates.
 */

// 1. Define the state shape
interface ProfileFormState {
  personalInfo: {
    firstName: string
    lastName: string
    birthDate: string
  }
  contactInfo: {
    email: string
    phone: string
    address: string
  }
  preferences: {
    newsletter: boolean
    notifications: boolean
    theme: 'light' | 'dark'
  }
  renderCount: number // Track re-renders for demonstration
}

// 2. Create the store
const profileFormStore = createKtnGitLikeStore<ProfileFormState>({
  storageKey: 'profile-form-example',
  initialData: {
    personalInfo: {
      firstName: 'Jane',
      lastName: 'Smith',
      birthDate: '1990-05-15',
    },
    contactInfo: {
      email: 'jane.smith@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, San Francisco, CA 94102',
    },
    preferences: {
      newsletter: true,
      notifications: false,
      theme: 'light',
    },
    renderCount: 0,
  },
  persistence: 'local',
})

// 3. Create base hook
const useProfileForm = createKtnGitLikeHook(profileFormStore)

/**
 * Optimized component that ONLY re-renders when personalInfo changes.
 * Uses subscribeSelector to subscribe to a specific slice of state.
 */
const PersonalInfoSection: React.FC = () => {
  const renderCountRef = React.useRef(0)
  renderCountRef.current++

  // This component only subscribes to personalInfo, not the entire store
  const [personalInfo, setPersonalInfo] = React.useState(profileFormStore.getStash().personalInfo)

  React.useEffect(() => {
    // Subscribe only to personalInfo changes
    const unsubscribe = profileFormStore.subscribeSelector(
      (state) => state.stashData.personalInfo,
      (newPersonalInfo) => {
        setPersonalInfo(newPersonalInfo)
      }
    )
    return unsubscribe
  }, [])

  const updateField = (field: keyof typeof personalInfo, value: string) => {
    profileFormStore.stash((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }))
  }

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h6">Personal Information</Typography>
        <Chip label={`Renders: ${renderCountRef.current}`} size="small" color="primary" />
      </Stack>

      <Stack spacing={2}>
        <TextField
          label="First Name"
          value={personalInfo.firstName}
          onChange={(e) => updateField('firstName', e.target.value)}
          fullWidth
        />
        <TextField
          label="Last Name"
          value={personalInfo.lastName}
          onChange={(e) => updateField('lastName', e.target.value)}
          fullWidth
        />
        <TextField
          label="Birth Date"
          type="date"
          value={personalInfo.birthDate}
          onChange={(e) => updateField('birthDate', e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Stack>
    </Paper>
  )
}

/**
 * Optimized component that ONLY re-renders when contactInfo changes.
 */
const ContactInfoSection: React.FC = () => {
  const renderCountRef = React.useRef(0)
  renderCountRef.current++

  const [contactInfo, setContactInfo] = React.useState(profileFormStore.getStash().contactInfo)

  React.useEffect(() => {
    const unsubscribe = profileFormStore.subscribeSelector(
      (state) => state.stashData.contactInfo,
      (newContactInfo) => {
        setContactInfo(newContactInfo)
      }
    )
    return unsubscribe
  }, [])

  const updateField = (field: keyof typeof contactInfo, value: string) => {
    profileFormStore.stash((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value,
      },
    }))
  }

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h6">Contact Information</Typography>
        <Chip label={`Renders: ${renderCountRef.current}`} size="small" color="secondary" />
      </Stack>

      <Stack spacing={2}>
        <TextField
          label="Email"
          type="email"
          value={contactInfo.email}
          onChange={(e) => updateField('email', e.target.value)}
          fullWidth
        />
        <TextField
          label="Phone"
          value={contactInfo.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          fullWidth
        />
        <TextField
          label="Address"
          value={contactInfo.address}
          onChange={(e) => updateField('address', e.target.value)}
          multiline
          rows={2}
          fullWidth
        />
      </Stack>
    </Paper>
  )
}

/**
 * Main page component.
 */
export default function MultiFieldFormPage() {
  const { stashData, commitData, commit, discard } = useProfileForm()

  const hasChanges = JSON.stringify(stashData) !== JSON.stringify(commitData)

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Example 4: Multi-field Form with Selector Optimization
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Demonstrates fine-grained reactivity using subscribeSelector. Each section only re-renders
          when its data changes!
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Performance Explanation */}
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            🚀 Performance Optimization in Action
          </Typography>
          <Typography variant="body2">
            Notice the render count badges. When you edit "First Name", only the Personal
            Information section re-renders. The Contact Information section stays unchanged because
            it uses <code>subscribeSelector</code> to subscribe only to its data.
          </Typography>
        </Alert>

        {/* Uncommitted Changes Alert */}
        {hasChanges && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            You have uncommitted changes. Save to persist to localStorage.
          </Alert>
        )}

        {/* Optimized Sections */}
        <Stack spacing={3} sx={{ mb: 3 }}>
          <PersonalInfoSection />
          <ContactInfoSection />
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Git-like Operations */}
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="success"
            onClick={commit}
            disabled={!hasChanges}
            size="large"
          >
            Save Changes
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={discard}
            disabled={!hasChanges}
            size="large"
          >
            Discard Changes
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Current State Display */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Full State (for debugging):
          </Typography>
          <Box
            component="pre"
            sx={{
              fontSize: '0.75rem',
              overflow: 'auto',
              bgcolor: 'grey.900',
              color: 'grey.100',
              p: 2,
              borderRadius: 1,
            }}
          >
            {JSON.stringify(
              {
                stashData: {
                  personalInfo: stashData.personalInfo,
                  contactInfo: stashData.contactInfo,
                },
                commitData: {
                  personalInfo: commitData.personalInfo,
                  contactInfo: commitData.contactInfo,
                },
              },
              null,
              2
            )}
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Explanation */}
        <Box sx={{ p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            Key Concepts:
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2 }}>
            <li>
              <Typography variant="body2">
                <strong>subscribeSelector</strong>: Subscribe to specific slice of state
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Equality Check</strong>: Only re-renders if selected data actually changed
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Performance</strong>: Prevents unnecessary re-renders in large forms
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Custom Equality</strong>: Can provide custom equality function for complex
                comparisons
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
          {`// Component only subscribes to personalInfo slice
const PersonalInfoSection = () => {
  const [personalInfo, setPersonalInfo] = useState(
    store.getStash().personalInfo
  )

  useEffect(() => {
    // Subscribe only to personalInfo changes
    const unsubscribe = store.subscribeSelector(
      (state) => state.stashData.personalInfo,
      (newPersonalInfo) => {
        setPersonalInfo(newPersonalInfo)
      }
    )
    return unsubscribe
  }, [])

  // This component only re-renders when personalInfo changes!
  return <TextField value={personalInfo.firstName} />
}

// Custom equality function for complex comparisons
store.subscribeSelector(
  (state) => state.stashData.personalInfo,
  (newData) => setData(newData),
  (a, b) => a.firstName === b.firstName && a.lastName === b.lastName
)`}
        </Box>
      </Paper>

      {/* Comparison */}
      <Paper elevation={1} sx={{ mt: 4, p: 3, bgcolor: 'warning.light' }}>
        <Typography variant="subtitle2" gutterBottom>
          ⚠️ Without subscribeSelector:
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
          {`// BAD: Component subscribes to entire store
const PersonalInfoSection = () => {
  const { stashData } = useProfileForm() // Re-renders on ANY change!

  // This re-renders even when contactInfo changes 😱
  return <TextField value={stashData.personalInfo.firstName} />
}`}
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
