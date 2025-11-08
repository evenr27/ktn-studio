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
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Alert,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { createKtnGitLikeStore } from '@ktn-store/factories'
import { createKtnGitLikeHook } from '@ktn-store/adapters'

/**
 * Example 3: Todo List with localStorage Persistence
 *
 * This example demonstrates:
 * - Working with arrays in ktn-store
 * - localStorage persistence (survives page refresh and browser close)
 * - Complex state updates with updater functions
 * - Practical CRUD operations (Create, Read, Update, Delete)
 */

// 1. Define the state shape
interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

interface TodoListState {
  todos: Todo[]
}

// 2. Create the store with localStorage persistence
const todoListStore = createKtnGitLikeStore<TodoListState>({
  storageKey: 'todo-list-example',
  initialData: {
    todos: [
      {
        id: '1',
        text: 'Try adding a new todo',
        completed: false,
        createdAt: Date.now() - 1000 * 60 * 5,
      },
      {
        id: '2',
        text: 'Mark a todo as completed',
        completed: false,
        createdAt: Date.now() - 1000 * 60 * 3,
      },
      {
        id: '3',
        text: 'Delete a todo',
        completed: false,
        createdAt: Date.now() - 1000 * 60,
      },
    ],
  },
  persistence: 'local', // Persists across browser sessions
})

// 3. Create React hook for the store
const useTodoList = createKtnGitLikeHook(todoListStore)

/**
 * Todo list component demonstrating array operations and persistence.
 */
export default function TodoListPage() {
  // 4. Use the hook to access store data and methods
  const { stashData, commitData, stash, commit, discard, resetAll } = useTodoList()
  const [newTodoText, setNewTodoText] = React.useState('')

  // 5. Helper functions for CRUD operations
  const addTodo = () => {
    if (!newTodoText.trim()) return

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: newTodoText.trim(),
      completed: false,
      createdAt: Date.now(),
    }

    // Use updater function for arrays
    stash((prev) => ({
      todos: [...prev.todos, newTodo],
    }))

    setNewTodoText('')
  }

  const toggleTodo = (id: string) => {
    stash((prev) => ({
      todos: prev.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }))
  }

  const deleteTodo = (id: string) => {
    stash((prev) => ({
      todos: prev.todos.filter((todo) => todo.id !== id),
    }))
  }

  const clearCompleted = () => {
    stash((prev) => ({
      todos: prev.todos.filter((todo) => !todo.completed),
    }))
  }

  // 6. Check if there are uncommitted changes
  const hasChanges = JSON.stringify(stashData) !== JSON.stringify(commitData)

  // 7. Stats
  const totalTodos = stashData.todos.length
  const completedTodos = stashData.todos.filter((t) => t.completed).length
  const pendingTodos = totalTodos - completedTodos

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Example 3: Todo List
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Todo list with localStorage persistence. Your todos survive page refresh and browser
          close!
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Stats */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Paper variant="outlined" sx={{ p: 2, flex: 1, textAlign: 'center' }}>
            <Typography variant="h4" color="primary">
              {totalTodos}
            </Typography>
            <Typography variant="caption">Total</Typography>
          </Paper>
          <Paper variant="outlined" sx={{ p: 2, flex: 1, textAlign: 'center' }}>
            <Typography variant="h4" color="warning.main">
              {pendingTodos}
            </Typography>
            <Typography variant="caption">Pending</Typography>
          </Paper>
          <Paper variant="outlined" sx={{ p: 2, flex: 1, textAlign: 'center' }}>
            <Typography variant="h4" color="success.main">
              {completedTodos}
            </Typography>
            <Typography variant="caption">Completed</Typography>
          </Paper>
        </Stack>

        {/* Uncommitted Changes Alert */}
        {hasChanges && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            You have uncommitted changes. Click "Save to localStorage" to persist your changes.
          </Alert>
        )}

        {/* Add Todo Form */}
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          <TextField
            label="New Todo"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') addTodo()
            }}
            fullWidth
            placeholder="What needs to be done?"
          />
          <Button variant="contained" onClick={addTodo} disabled={!newTodoText.trim()}>
            Add
          </Button>
        </Stack>

        {/* Todo List */}
        <Paper variant="outlined" sx={{ mb: 3 }}>
          {stashData.todos.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography color="text.secondary">No todos yet. Add one above!</Typography>
            </Box>
          ) : (
            <List>
              {stashData.todos.map((todo, index) => (
                <ListItem
                  key={todo.id}
                  divider={index < stashData.todos.length - 1}
                  secondaryAction={
                    <IconButton edge="end" onClick={() => deleteTodo(todo.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    color="success"
                  />
                  <ListItemText
                    primary={todo.text}
                    secondary={new Date(todo.createdAt).toLocaleString()}
                    sx={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: todo.completed ? 'text.secondary' : 'text.primary',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>

        {/* Actions */}
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          <Button variant="outlined" onClick={clearCompleted} disabled={completedTodos === 0}>
            Clear Completed
          </Button>
          <Button variant="outlined" color="error" onClick={resetAll}>
            Reset All
          </Button>
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
            Save to localStorage
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

        {/* Explanation */}
        <Box sx={{ p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            Key Features:
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2 }}>
            <li>
              <Typography variant="body2">
                <strong>localStorage Persistence</strong>: Todos survive page refresh and browser
                close
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Updater Functions</strong>: Use <code>stash((prev) =&gt; ...)</code> for
                arrays
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>CRUD Operations</strong>: Add, toggle, delete todos with array operations
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Git-like Workflow</strong>: Changes are staged until you commit to
                localStorage
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
          {`// 1. Create store with localStorage
const store = createKtnGitLikeStore({
  storageKey: 'todo-list',
  initialData: { todos: [] },
  persistence: 'local', // Persists across sessions
})

// 2. Add todo (use updater function for arrays)
const addTodo = (text: string) => {
  stash((prev) => ({
    todos: [...prev.todos, { id: Date.now(), text, completed: false }]
  }))
}

// 3. Toggle todo
const toggleTodo = (id: string) => {
  stash((prev) => ({
    todos: prev.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  }))
}

// 4. Delete todo
const deleteTodo = (id: string) => {
  stash((prev) => ({
    todos: prev.todos.filter(todo => todo.id !== id)
  }))
}

// 5. Save to localStorage
commit()`}
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
