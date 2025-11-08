import * as React from 'react'
import { renderHook } from '@testing-library/react'
import { useKeyboardShortcuts, KeyboardShortcutHandlers } from './useKeyboardShortcuts'

describe('useKeyboardShortcuts', () => {
  const createKeyboardEvent = (key: string, options: Partial<KeyboardEvent> = {}) => {
    const event = new KeyboardEvent('keydown', {
      key,
      ctrlKey: options.ctrlKey || false,
      metaKey: options.metaKey || false,
      shiftKey: options.shiftKey || false,
      bubbles: true,
      cancelable: true,
    })
    Object.defineProperty(event, 'preventDefault', {
      value: jest.fn(),
      writable: true,
    })
    return event
  }

  it('should call onFileNew when Ctrl+N is pressed', () => {
    const handlers: KeyboardShortcutHandlers = {
      onFileNew: jest.fn(),
    }

    renderHook(() => useKeyboardShortcuts(handlers))

    const event = createKeyboardEvent('n', { ctrlKey: true })
    window.dispatchEvent(event)

    expect(handlers.onFileNew).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should call onFileOpen when Ctrl+O is pressed', () => {
    const handlers: KeyboardShortcutHandlers = {
      onFileOpen: jest.fn(),
    }

    renderHook(() => useKeyboardShortcuts(handlers))

    const event = createKeyboardEvent('o', { ctrlKey: true })
    window.dispatchEvent(event)

    expect(handlers.onFileOpen).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should call onFileSave when Ctrl+S is pressed', () => {
    const handlers: KeyboardShortcutHandlers = {
      onFileSave: jest.fn(),
    }

    renderHook(() => useKeyboardShortcuts(handlers))

    const event = createKeyboardEvent('s', { ctrlKey: true })
    window.dispatchEvent(event)

    expect(handlers.onFileSave).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should call onFileSaveAs when Ctrl+Shift+S is pressed', () => {
    const handlers: KeyboardShortcutHandlers = {
      onFileSaveAs: jest.fn(),
    }

    renderHook(() => useKeyboardShortcuts(handlers))

    const event = createKeyboardEvent('s', { ctrlKey: true, shiftKey: true })
    window.dispatchEvent(event)

    expect(handlers.onFileSaveAs).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should call onFileClose when Ctrl+W is pressed', () => {
    const handlers: KeyboardShortcutHandlers = {
      onFileClose: jest.fn(),
    }

    renderHook(() => useKeyboardShortcuts(handlers))

    const event = createKeyboardEvent('w', { ctrlKey: true })
    window.dispatchEvent(event)

    expect(handlers.onFileClose).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should call onEditUndo when Ctrl+Z is pressed', () => {
    const handlers: KeyboardShortcutHandlers = {
      onEditUndo: jest.fn(),
    }

    renderHook(() => useKeyboardShortcuts(handlers))

    const event = createKeyboardEvent('z', { ctrlKey: true })
    window.dispatchEvent(event)

    expect(handlers.onEditUndo).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should call onEditRedo when Ctrl+Y is pressed', () => {
    const handlers: KeyboardShortcutHandlers = {
      onEditRedo: jest.fn(),
    }

    renderHook(() => useKeyboardShortcuts(handlers))

    const event = createKeyboardEvent('y', { ctrlKey: true })
    window.dispatchEvent(event)

    expect(handlers.onEditRedo).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should call onEditCut when Ctrl+X is pressed', () => {
    const handlers: KeyboardShortcutHandlers = {
      onEditCut: jest.fn(),
    }

    renderHook(() => useKeyboardShortcuts(handlers))

    const event = createKeyboardEvent('x', { ctrlKey: true })
    window.dispatchEvent(event)

    expect(handlers.onEditCut).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should call onEditCopy when Ctrl+C is pressed', () => {
    const handlers: KeyboardShortcutHandlers = {
      onEditCopy: jest.fn(),
    }

    renderHook(() => useKeyboardShortcuts(handlers))

    const event = createKeyboardEvent('c', { ctrlKey: true })
    window.dispatchEvent(event)

    expect(handlers.onEditCopy).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should call onEditPaste when Ctrl+V is pressed', () => {
    const handlers: KeyboardShortcutHandlers = {
      onEditPaste: jest.fn(),
    }

    renderHook(() => useKeyboardShortcuts(handlers))

    const event = createKeyboardEvent('v', { ctrlKey: true })
    window.dispatchEvent(event)

    expect(handlers.onEditPaste).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should call onEditDelete when Delete is pressed', () => {
    const handlers: KeyboardShortcutHandlers = {
      onEditDelete: jest.fn(),
    }

    renderHook(() => useKeyboardShortcuts(handlers))

    const event = createKeyboardEvent('Delete')
    window.dispatchEvent(event)

    expect(handlers.onEditDelete).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should call onViewTogglePanels when Ctrl+B is pressed', () => {
    const handlers: KeyboardShortcutHandlers = {
      onViewTogglePanels: jest.fn(),
    }

    renderHook(() => useKeyboardShortcuts(handlers))

    const event = createKeyboardEvent('b', { ctrlKey: true })
    window.dispatchEvent(event)

    expect(handlers.onViewTogglePanels).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should call onViewZoomIn when Ctrl++ is pressed', () => {
    const handlers: KeyboardShortcutHandlers = {
      onViewZoomIn: jest.fn(),
    }

    renderHook(() => useKeyboardShortcuts(handlers))

    const event = createKeyboardEvent('+', { ctrlKey: true })
    window.dispatchEvent(event)

    expect(handlers.onViewZoomIn).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should call onViewZoomIn when Ctrl+= is pressed', () => {
    const handlers: KeyboardShortcutHandlers = {
      onViewZoomIn: jest.fn(),
    }

    renderHook(() => useKeyboardShortcuts(handlers))

    const event = createKeyboardEvent('=', { ctrlKey: true })
    window.dispatchEvent(event)

    expect(handlers.onViewZoomIn).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should call onViewZoomOut when Ctrl+- is pressed', () => {
    const handlers: KeyboardShortcutHandlers = {
      onViewZoomOut: jest.fn(),
    }

    renderHook(() => useKeyboardShortcuts(handlers))

    const event = createKeyboardEvent('-', { ctrlKey: true })
    window.dispatchEvent(event)

    expect(handlers.onViewZoomOut).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should call onViewFitToScreen when Ctrl+0 is pressed', () => {
    const handlers: KeyboardShortcutHandlers = {
      onViewFitToScreen: jest.fn(),
    }

    renderHook(() => useKeyboardShortcuts(handlers))

    const event = createKeyboardEvent('0', { ctrlKey: true })
    window.dispatchEvent(event)

    expect(handlers.onViewFitToScreen).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should call onHelpDocumentation when F1 is pressed', () => {
    const handlers: KeyboardShortcutHandlers = {
      onHelpDocumentation: jest.fn(),
    }

    renderHook(() => useKeyboardShortcuts(handlers))

    const event = createKeyboardEvent('F1')
    window.dispatchEvent(event)

    expect(handlers.onHelpDocumentation).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should support Cmd key on Mac instead of Ctrl', () => {
    const handlers: KeyboardShortcutHandlers = {
      onFileSave: jest.fn(),
    }

    renderHook(() => useKeyboardShortcuts(handlers))

    const event = createKeyboardEvent('s', { metaKey: true })
    window.dispatchEvent(event)

    expect(handlers.onFileSave).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should cleanup event listener on unmount', () => {
    const handlers: KeyboardShortcutHandlers = {
      onFileNew: jest.fn(),
    }

    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')

    const { unmount } = renderHook(() => useKeyboardShortcuts(handlers))

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))

    removeEventListenerSpy.mockRestore()
  })

  it('should not call handler if it is not provided', () => {
    const handlers: KeyboardShortcutHandlers = {}

    renderHook(() => useKeyboardShortcuts(handlers))

    const event = createKeyboardEvent('n', { ctrlKey: true })

    // Should not throw error
    expect(() => window.dispatchEvent(event)).not.toThrow()
  })
})
