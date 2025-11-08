import * as React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDEHeaderMenuBar } from './IDEHeaderMenuBar'

describe('IDEHeaderMenuBar', () => {
  it('should render all menu buttons', () => {
    render(<IDEHeaderMenuBar />)

    expect(screen.getByText('File')).toBeInTheDocument()
    expect(screen.getByText('Edit')).toBeInTheDocument()
    expect(screen.getByText('View')).toBeInTheDocument()
    expect(screen.getByText('Help')).toBeInTheDocument()
  })

  describe('File Menu', () => {
    it('should open File menu on click', async () => {
      render(<IDEHeaderMenuBar />)

      const fileButton = screen.getByText('File')
      fireEvent.click(fileButton)

      await waitFor(() => {
        expect(screen.getByText('New')).toBeInTheDocument()
        expect(screen.getByText('Open')).toBeInTheDocument()
        expect(screen.getByText('Save')).toBeInTheDocument()
        expect(screen.getByText('Save As...')).toBeInTheDocument()
        expect(screen.getByText('Close')).toBeInTheDocument()
      })
    })

    it('should call onFileNew when New is clicked', async () => {
      const onFileNew = jest.fn()
      render(<IDEHeaderMenuBar onFileNew={onFileNew} />)

      fireEvent.click(screen.getByText('File'))

      await waitFor(() => {
        expect(screen.getByText('New')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('New'))
      expect(onFileNew).toHaveBeenCalledTimes(1)
    })

    it('should call onFileOpen when Open is clicked', async () => {
      const onFileOpen = jest.fn()
      render(<IDEHeaderMenuBar onFileOpen={onFileOpen} />)

      fireEvent.click(screen.getByText('File'))

      await waitFor(() => {
        expect(screen.getByText('Open')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Open'))
      expect(onFileOpen).toHaveBeenCalledTimes(1)
    })

    it('should call onFileSave when Save is clicked', async () => {
      const onFileSave = jest.fn()
      render(<IDEHeaderMenuBar onFileSave={onFileSave} />)

      fireEvent.click(screen.getByText('File'))

      await waitFor(() => {
        expect(screen.getByText('Save')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Save'))
      expect(onFileSave).toHaveBeenCalledTimes(1)
    })

    it('should call onFileSaveAs when Save As is clicked', async () => {
      const onFileSaveAs = jest.fn()
      render(<IDEHeaderMenuBar onFileSaveAs={onFileSaveAs} />)

      fireEvent.click(screen.getByText('File'))

      await waitFor(() => {
        expect(screen.getByText('Save As...')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Save As...'))
      expect(onFileSaveAs).toHaveBeenCalledTimes(1)
    })

    it('should call onFileClose when Close is clicked', async () => {
      const onFileClose = jest.fn()
      render(<IDEHeaderMenuBar onFileClose={onFileClose} />)

      fireEvent.click(screen.getByText('File'))

      await waitFor(() => {
        expect(screen.getByText('Close')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Close'))
      expect(onFileClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('Edit Menu', () => {
    it('should open Edit menu on click', async () => {
      render(<IDEHeaderMenuBar />)

      const editButton = screen.getByText('Edit')
      fireEvent.click(editButton)

      await waitFor(() => {
        expect(screen.getByText('Undo')).toBeInTheDocument()
        expect(screen.getByText('Redo')).toBeInTheDocument()
        expect(screen.getByText('Cut')).toBeInTheDocument()
        expect(screen.getByText('Copy')).toBeInTheDocument()
        expect(screen.getByText('Paste')).toBeInTheDocument()
        expect(screen.getByText('Delete')).toBeInTheDocument()
      })
    })

    it('should call onEditUndo when Undo is clicked', async () => {
      const onEditUndo = jest.fn()
      render(<IDEHeaderMenuBar onEditUndo={onEditUndo} />)

      fireEvent.click(screen.getByText('Edit'))

      await waitFor(() => {
        expect(screen.getByText('Undo')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Undo'))
      expect(onEditUndo).toHaveBeenCalledTimes(1)
    })

    it('should call onEditRedo when Redo is clicked', async () => {
      const onEditRedo = jest.fn()
      render(<IDEHeaderMenuBar onEditRedo={onEditRedo} />)

      fireEvent.click(screen.getByText('Edit'))

      await waitFor(() => {
        expect(screen.getByText('Redo')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Redo'))
      expect(onEditRedo).toHaveBeenCalledTimes(1)
    })

    it('should call onEditCut when Cut is clicked', async () => {
      const onEditCut = jest.fn()
      render(<IDEHeaderMenuBar onEditCut={onEditCut} />)

      fireEvent.click(screen.getByText('Edit'))

      await waitFor(() => {
        expect(screen.getByText('Cut')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Cut'))
      expect(onEditCut).toHaveBeenCalledTimes(1)
    })

    it('should call onEditCopy when Copy is clicked', async () => {
      const onEditCopy = jest.fn()
      render(<IDEHeaderMenuBar onEditCopy={onEditCopy} />)

      fireEvent.click(screen.getByText('Edit'))

      await waitFor(() => {
        expect(screen.getByText('Copy')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Copy'))
      expect(onEditCopy).toHaveBeenCalledTimes(1)
    })

    it('should call onEditPaste when Paste is clicked', async () => {
      const onEditPaste = jest.fn()
      render(<IDEHeaderMenuBar onEditPaste={onEditPaste} />)

      fireEvent.click(screen.getByText('Edit'))

      await waitFor(() => {
        expect(screen.getByText('Paste')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Paste'))
      expect(onEditPaste).toHaveBeenCalledTimes(1)
    })

    it('should call onEditDelete when Delete is clicked', async () => {
      const onEditDelete = jest.fn()
      render(<IDEHeaderMenuBar onEditDelete={onEditDelete} />)

      fireEvent.click(screen.getByText('Edit'))

      await waitFor(() => {
        expect(screen.getByText('Delete')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Delete'))
      expect(onEditDelete).toHaveBeenCalledTimes(1)
    })
  })

  describe('View Menu', () => {
    it('should open View menu on click', async () => {
      render(<IDEHeaderMenuBar />)

      const viewButton = screen.getByText('View')
      fireEvent.click(viewButton)

      await waitFor(() => {
        expect(screen.getByText('Toggle Panels')).toBeInTheDocument()
        expect(screen.getByText('Zoom In')).toBeInTheDocument()
        expect(screen.getByText('Zoom Out')).toBeInTheDocument()
        expect(screen.getByText('Fit to Screen')).toBeInTheDocument()
      })
    })

    it('should call onViewTogglePanels when Toggle Panels is clicked', async () => {
      const onViewTogglePanels = jest.fn()
      render(<IDEHeaderMenuBar onViewTogglePanels={onViewTogglePanels} />)

      fireEvent.click(screen.getByText('View'))

      await waitFor(() => {
        expect(screen.getByText('Toggle Panels')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Toggle Panels'))
      expect(onViewTogglePanels).toHaveBeenCalledTimes(1)
    })

    it('should call onViewZoomIn when Zoom In is clicked', async () => {
      const onViewZoomIn = jest.fn()
      render(<IDEHeaderMenuBar onViewZoomIn={onViewZoomIn} />)

      fireEvent.click(screen.getByText('View'))

      await waitFor(() => {
        expect(screen.getByText('Zoom In')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Zoom In'))
      expect(onViewZoomIn).toHaveBeenCalledTimes(1)
    })

    it('should call onViewZoomOut when Zoom Out is clicked', async () => {
      const onViewZoomOut = jest.fn()
      render(<IDEHeaderMenuBar onViewZoomOut={onViewZoomOut} />)

      fireEvent.click(screen.getByText('View'))

      await waitFor(() => {
        expect(screen.getByText('Zoom Out')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Zoom Out'))
      expect(onViewZoomOut).toHaveBeenCalledTimes(1)
    })

    it('should call onViewFitToScreen when Fit to Screen is clicked', async () => {
      const onViewFitToScreen = jest.fn()
      render(<IDEHeaderMenuBar onViewFitToScreen={onViewFitToScreen} />)

      fireEvent.click(screen.getByText('View'))

      await waitFor(() => {
        expect(screen.getByText('Fit to Screen')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Fit to Screen'))
      expect(onViewFitToScreen).toHaveBeenCalledTimes(1)
    })
  })

  describe('Help Menu', () => {
    it('should open Help menu on click', async () => {
      render(<IDEHeaderMenuBar />)

      const helpButton = screen.getByText('Help')
      fireEvent.click(helpButton)

      await waitFor(() => {
        expect(screen.getByText('Documentation')).toBeInTheDocument()
        expect(screen.getByText('About')).toBeInTheDocument()
      })
    })

    it('should call onHelpDocumentation when Documentation is clicked', async () => {
      const onHelpDocumentation = jest.fn()
      render(<IDEHeaderMenuBar onHelpDocumentation={onHelpDocumentation} />)

      fireEvent.click(screen.getByText('Help'))

      await waitFor(() => {
        expect(screen.getByText('Documentation')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Documentation'))
      expect(onHelpDocumentation).toHaveBeenCalledTimes(1)
    })

    it('should call onHelpAbout when About is clicked', async () => {
      const onHelpAbout = jest.fn()
      render(<IDEHeaderMenuBar onHelpAbout={onHelpAbout} />)

      fireEvent.click(screen.getByText('Help'))

      await waitFor(() => {
        expect(screen.getByText('About')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('About'))
      expect(onHelpAbout).toHaveBeenCalledTimes(1)
    })
  })

  it('should apply custom className', () => {
    const { container } = render(<IDEHeaderMenuBar className="custom-class" />)
    const menuBar = container.firstChild as HTMLElement
    expect(menuBar).toHaveClass('custom-class')
  })
})
