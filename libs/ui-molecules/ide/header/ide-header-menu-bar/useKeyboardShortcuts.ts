import * as React from 'react'

export type KeyboardShortcutHandlers = {
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
}

/**
 * Hook to handle keyboard shortcuts for IDE menus
 * @param handlers - Object with callback functions for each shortcut
 */
export const useKeyboardShortcuts = (handlers: KeyboardShortcutHandlers) => {
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { ctrlKey, metaKey, shiftKey, key } = event
      const cmdOrCtrl = ctrlKey || metaKey

      // File menu shortcuts
      if (cmdOrCtrl && !shiftKey && key.toLowerCase() === 'n') {
        event.preventDefault()
        handlers.onFileNew?.()
        return
      }

      if (cmdOrCtrl && !shiftKey && key.toLowerCase() === 'o') {
        event.preventDefault()
        handlers.onFileOpen?.()
        return
      }

      if (cmdOrCtrl && !shiftKey && key.toLowerCase() === 's') {
        event.preventDefault()
        handlers.onFileSave?.()
        return
      }

      if (cmdOrCtrl && shiftKey && key.toLowerCase() === 's') {
        event.preventDefault()
        handlers.onFileSaveAs?.()
        return
      }

      if (cmdOrCtrl && !shiftKey && key.toLowerCase() === 'w') {
        event.preventDefault()
        handlers.onFileClose?.()
        return
      }

      // Edit menu shortcuts
      if (cmdOrCtrl && !shiftKey && key.toLowerCase() === 'z') {
        event.preventDefault()
        handlers.onEditUndo?.()
        return
      }

      if (cmdOrCtrl && !shiftKey && key.toLowerCase() === 'y') {
        event.preventDefault()
        handlers.onEditRedo?.()
        return
      }

      if (cmdOrCtrl && !shiftKey && key.toLowerCase() === 'x') {
        event.preventDefault()
        handlers.onEditCut?.()
        return
      }

      if (cmdOrCtrl && !shiftKey && key.toLowerCase() === 'c') {
        event.preventDefault()
        handlers.onEditCopy?.()
        return
      }

      if (cmdOrCtrl && !shiftKey && key.toLowerCase() === 'v') {
        event.preventDefault()
        handlers.onEditPaste?.()
        return
      }

      if (key === 'Delete') {
        event.preventDefault()
        handlers.onEditDelete?.()
        return
      }

      // View menu shortcuts
      if (cmdOrCtrl && !shiftKey && key.toLowerCase() === 'b') {
        event.preventDefault()
        handlers.onViewTogglePanels?.()
        return
      }

      if (cmdOrCtrl && !shiftKey && (key === '+' || key === '=')) {
        event.preventDefault()
        handlers.onViewZoomIn?.()
        return
      }

      if (cmdOrCtrl && !shiftKey && key === '-') {
        event.preventDefault()
        handlers.onViewZoomOut?.()
        return
      }

      if (cmdOrCtrl && !shiftKey && key === '0') {
        event.preventDefault()
        handlers.onViewFitToScreen?.()
        return
      }

      // Help menu shortcuts
      if (key === 'F1') {
        event.preventDefault()
        handlers.onHelpDocumentation?.()
        return
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handlers])
}
