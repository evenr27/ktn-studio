'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { useKeyboardShortcuts } from './useKeyboardShortcuts'

export type MenuItemConfig = {
  label: string
  shortcut?: string
  onClick?: () => void
  disabled?: boolean
  divider?: boolean
  icon?: React.ReactNode
}

export type IDEHeaderMenuBarProps = {
  className?: string
  enableKeyboardShortcuts?: boolean
  onFileNew?: () => void
  onFileOpen?: () => void
  onFileSave?: () => void
  onFileSaveAs?: () => void
  onFileClose?: () => void
  onEditUndo?: () => void
  onEditRedo?: () => void
  onEditCut?: () => void
  onEditCopy?: () => void
  onEditPaste?: () => void
  onEditDelete?: () => void
  onViewTogglePanels?: () => void
  onViewZoomIn?: () => void
  onViewZoomOut?: () => void
  onViewFitToScreen?: () => void
  onHelpDocumentation?: () => void
  onHelpAbout?: () => void
}

export const IDEHeaderMenuBar: React.FC<IDEHeaderMenuBarProps> = ({
  className,
  enableKeyboardShortcuts = true,
  onFileNew,
  onFileOpen,
  onFileSave,
  onFileSaveAs,
  onFileClose,
  onEditUndo,
  onEditRedo,
  onEditCut,
  onEditCopy,
  onEditPaste,
  onEditDelete,
  onViewTogglePanels,
  onViewZoomIn,
  onViewZoomOut,
  onViewFitToScreen,
  onHelpDocumentation,
  onHelpAbout,
}) => {
  const [fileMenuAnchor, setFileMenuAnchor] = React.useState<null | HTMLElement>(null)
  const [editMenuAnchor, setEditMenuAnchor] = React.useState<null | HTMLElement>(null)
  const [viewMenuAnchor, setViewMenuAnchor] = React.useState<null | HTMLElement>(null)
  const [helpMenuAnchor, setHelpMenuAnchor] = React.useState<null | HTMLElement>(null)

  // Enable keyboard shortcuts
  const keyboardHandlers = React.useMemo(
    () =>
      enableKeyboardShortcuts
        ? {
            onFileNew,
            onFileOpen,
            onFileSave,
            onFileSaveAs,
            onFileClose,
            onEditUndo,
            onEditRedo,
            onEditCut,
            onEditCopy,
            onEditPaste,
            onEditDelete,
            onViewTogglePanels,
            onViewZoomIn,
            onViewZoomOut,
            onViewFitToScreen,
            onHelpDocumentation,
          }
        : {},
    [
      enableKeyboardShortcuts,
      onFileNew,
      onFileOpen,
      onFileSave,
      onFileSaveAs,
      onFileClose,
      onEditUndo,
      onEditRedo,
      onEditCut,
      onEditCopy,
      onEditPaste,
      onEditDelete,
      onViewTogglePanels,
      onViewZoomIn,
      onViewZoomOut,
      onViewFitToScreen,
      onHelpDocumentation,
    ]
  )

  useKeyboardShortcuts(keyboardHandlers)

  const handleFileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFileMenuAnchor(event.currentTarget)
  }

  const handleEditMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setEditMenuAnchor(event.currentTarget)
  }

  const handleViewMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setViewMenuAnchor(event.currentTarget)
  }

  const handleHelpMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setHelpMenuAnchor(event.currentTarget)
  }

  const handleCloseAll = () => {
    setFileMenuAnchor(null)
    setEditMenuAnchor(null)
    setViewMenuAnchor(null)
    setHelpMenuAnchor(null)
  }

  const handleMenuItemClick = (action?: () => void) => {
    handleCloseAll()
    action?.()
  }

  const menuButtonStyles = {
    textTransform: 'none',
    color: 'rgba(226,232,240,1)',
    fontSize: 13,
    fontWeight: 400,
    minWidth: 'auto',
    px: 1.5,
    py: 0.5,
    '&:hover': {
      backgroundColor: 'rgba(15,23,42,0.6)',
    },
  }

  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
      }}
    >
      {/* File Menu */}
      <Button
        onClick={handleFileMenuOpen}
        sx={menuButtonStyles}
        aria-controls={fileMenuAnchor ? 'file-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={fileMenuAnchor ? 'true' : undefined}
      >
        File
      </Button>
      <Menu
        id="file-menu"
        anchorEl={fileMenuAnchor}
        open={Boolean(fileMenuAnchor)}
        onClose={handleCloseAll}
        MenuListProps={{
          'aria-labelledby': 'file-button',
        }}
        slotProps={{
          paper: {
            sx: {
              minWidth: 220,
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0,0,0,0.12)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            },
          },
        }}
      >
        <MenuItem
          onClick={() => handleMenuItemClick(onFileNew)}
          sx={{
            color: 'rgba(0,0,0,0.87)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.08)',
            },
          }}
        >
          <ListItemText>New</ListItemText>
          <Typography variant="body2" sx={{ ml: 2, fontSize: 11, color: 'rgba(0,0,0,0.54)' }}>
            Ctrl+N
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick(onFileOpen)}
          sx={{
            color: 'rgba(0,0,0,0.87)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.08)',
            },
          }}
        >
          <ListItemText>Open</ListItemText>
          <Typography variant="body2" sx={{ ml: 2, fontSize: 11, color: 'rgba(0,0,0,0.54)' }}>
            Ctrl+O
          </Typography>
        </MenuItem>
        <Divider sx={{ borderColor: 'rgba(0,0,0,0.12)' }} />
        <MenuItem
          onClick={() => handleMenuItemClick(onFileSave)}
          sx={{
            color: 'rgba(0,0,0,0.87)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.08)',
            },
          }}
        >
          <ListItemText>Save</ListItemText>
          <Typography variant="body2" sx={{ ml: 2, fontSize: 11, color: 'rgba(0,0,0,0.54)' }}>
            Ctrl+S
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick(onFileSaveAs)}
          sx={{
            color: 'rgba(0,0,0,0.87)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.08)',
            },
          }}
        >
          <ListItemText>Save As...</ListItemText>
          <Typography variant="body2" sx={{ ml: 2, fontSize: 11, color: 'rgba(0,0,0,0.54)' }}>
            Ctrl+Shift+S
          </Typography>
        </MenuItem>
        <Divider sx={{ borderColor: 'rgba(0,0,0,0.12)' }} />
        <MenuItem
          onClick={() => handleMenuItemClick(onFileClose)}
          sx={{
            color: 'rgba(0,0,0,0.87)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.08)',
            },
          }}
        >
          <ListItemText>Close</ListItemText>
          <Typography variant="body2" sx={{ ml: 2, fontSize: 11, color: 'rgba(0,0,0,0.54)' }}>
            Ctrl+W
          </Typography>
        </MenuItem>
      </Menu>

      {/* Edit Menu */}
      <Button
        onClick={handleEditMenuOpen}
        sx={menuButtonStyles}
        aria-controls={editMenuAnchor ? 'edit-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={editMenuAnchor ? 'true' : undefined}
      >
        Edit
      </Button>
      <Menu
        id="edit-menu"
        anchorEl={editMenuAnchor}
        open={Boolean(editMenuAnchor)}
        onClose={handleCloseAll}
        MenuListProps={{
          'aria-labelledby': 'edit-button',
        }}
        slotProps={{
          paper: {
            sx: {
              minWidth: 220,
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0,0,0,0.12)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            },
          },
        }}
      >
        <MenuItem
          onClick={() => handleMenuItemClick(onEditUndo)}
          sx={{
            color: 'rgba(0,0,0,0.87)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.08)',
            },
          }}
        >
          <ListItemText>Undo</ListItemText>
          <Typography variant="body2" sx={{ ml: 2, fontSize: 11, color: 'rgba(0,0,0,0.54)' }}>
            Ctrl+Z
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick(onEditRedo)}
          sx={{
            color: 'rgba(0,0,0,0.87)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.08)',
            },
          }}
        >
          <ListItemText>Redo</ListItemText>
          <Typography variant="body2" sx={{ ml: 2, fontSize: 11, color: 'rgba(0,0,0,0.54)' }}>
            Ctrl+Y
          </Typography>
        </MenuItem>
        <Divider sx={{ borderColor: 'rgba(0,0,0,0.12)' }} />
        <MenuItem
          onClick={() => handleMenuItemClick(onEditCut)}
          sx={{
            color: 'rgba(0,0,0,0.87)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.08)',
            },
          }}
        >
          <ListItemText>Cut</ListItemText>
          <Typography variant="body2" sx={{ ml: 2, fontSize: 11, color: 'rgba(0,0,0,0.54)' }}>
            Ctrl+X
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick(onEditCopy)}
          sx={{
            color: 'rgba(0,0,0,0.87)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.08)',
            },
          }}
        >
          <ListItemText>Copy</ListItemText>
          <Typography variant="body2" sx={{ ml: 2, fontSize: 11, color: 'rgba(0,0,0,0.54)' }}>
            Ctrl+C
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick(onEditPaste)}
          sx={{
            color: 'rgba(0,0,0,0.87)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.08)',
            },
          }}
        >
          <ListItemText>Paste</ListItemText>
          <Typography variant="body2" sx={{ ml: 2, fontSize: 11, color: 'rgba(0,0,0,0.54)' }}>
            Ctrl+V
          </Typography>
        </MenuItem>
        <Divider sx={{ borderColor: 'rgba(0,0,0,0.12)' }} />
        <MenuItem
          onClick={() => handleMenuItemClick(onEditDelete)}
          sx={{
            color: 'rgba(0,0,0,0.87)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.08)',
            },
          }}
        >
          <ListItemText>Delete</ListItemText>
          <Typography variant="body2" sx={{ ml: 2, fontSize: 11, color: 'rgba(0,0,0,0.54)' }}>
            Del
          </Typography>
        </MenuItem>
      </Menu>

      {/* View Menu */}
      <Button
        onClick={handleViewMenuOpen}
        sx={menuButtonStyles}
        aria-controls={viewMenuAnchor ? 'view-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={viewMenuAnchor ? 'true' : undefined}
      >
        View
      </Button>
      <Menu
        id="view-menu"
        anchorEl={viewMenuAnchor}
        open={Boolean(viewMenuAnchor)}
        onClose={handleCloseAll}
        MenuListProps={{
          'aria-labelledby': 'view-button',
        }}
        slotProps={{
          paper: {
            sx: {
              minWidth: 220,
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0,0,0,0.12)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            },
          },
        }}
      >
        <MenuItem
          onClick={() => handleMenuItemClick(onViewTogglePanels)}
          sx={{
            color: 'rgba(0,0,0,0.87)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.08)',
            },
          }}
        >
          <ListItemText>Toggle Panels</ListItemText>
          <Typography variant="body2" sx={{ ml: 2, fontSize: 11, color: 'rgba(0,0,0,0.54)' }}>
            Ctrl+B
          </Typography>
        </MenuItem>
        <Divider sx={{ borderColor: 'rgba(0,0,0,0.12)' }} />
        <MenuItem
          onClick={() => handleMenuItemClick(onViewZoomIn)}
          sx={{
            color: 'rgba(0,0,0,0.87)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.08)',
            },
          }}
        >
          <ListItemText>Zoom In</ListItemText>
          <Typography variant="body2" sx={{ ml: 2, fontSize: 11, color: 'rgba(0,0,0,0.54)' }}>
            Ctrl++
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick(onViewZoomOut)}
          sx={{
            color: 'rgba(0,0,0,0.87)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.08)',
            },
          }}
        >
          <ListItemText>Zoom Out</ListItemText>
          <Typography variant="body2" sx={{ ml: 2, fontSize: 11, color: 'rgba(0,0,0,0.54)' }}>
            Ctrl+-
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick(onViewFitToScreen)}
          sx={{
            color: 'rgba(0,0,0,0.87)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.08)',
            },
          }}
        >
          <ListItemText>Fit to Screen</ListItemText>
          <Typography variant="body2" sx={{ ml: 2, fontSize: 11, color: 'rgba(0,0,0,0.54)' }}>
            Ctrl+0
          </Typography>
        </MenuItem>
      </Menu>

      {/* Help Menu */}
      <Button
        onClick={handleHelpMenuOpen}
        sx={menuButtonStyles}
        aria-controls={helpMenuAnchor ? 'help-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={helpMenuAnchor ? 'true' : undefined}
      >
        Help
      </Button>
      <Menu
        id="help-menu"
        anchorEl={helpMenuAnchor}
        open={Boolean(helpMenuAnchor)}
        onClose={handleCloseAll}
        MenuListProps={{
          'aria-labelledby': 'help-button',
        }}
        slotProps={{
          paper: {
            sx: {
              minWidth: 220,
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0,0,0,0.12)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            },
          },
        }}
      >
        <MenuItem
          onClick={() => handleMenuItemClick(onHelpDocumentation)}
          sx={{
            color: 'rgba(0,0,0,0.87)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.08)',
            },
          }}
        >
          <ListItemText>Documentation</ListItemText>
          <Typography variant="body2" sx={{ ml: 2, fontSize: 11, color: 'rgba(0,0,0,0.54)' }}>
            F1
          </Typography>
        </MenuItem>
        <Divider sx={{ borderColor: 'rgba(0,0,0,0.12)' }} />
        <MenuItem
          onClick={() => handleMenuItemClick(onHelpAbout)}
          sx={{
            color: 'rgba(0,0,0,0.87)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.08)',
            },
          }}
        >
          <ListItemText>About</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  )
}
