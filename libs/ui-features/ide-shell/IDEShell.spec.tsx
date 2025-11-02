import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDEShell } from './IDEShell'

// Mock the ui-cells IDEHeader component
jest.mock('@ktn/ui-cells', () => ({
  IDEHeader: ({ title, subtitle }: { title?: string; subtitle?: string }) => (
    <div data-testid="ide-header">
      <div data-testid="header-title">{title}</div>
      <div data-testid="header-subtitle">{subtitle}</div>
    </div>
  ),
}))

describe('IDEShell', () => {
  it('should render without crashing', () => {
    render(<IDEShell />)

    expect(screen.getByTestId('ide-header')).toBeInTheDocument()
  })

  it('should render IDEHeader with correct props', () => {
    render(<IDEShell />)

    expect(screen.getByTestId('header-title')).toHaveTextContent('KTN Studio')
    expect(screen.getByTestId('header-subtitle')).toHaveTextContent('Visual Form IDE')
  })

  it('should render navigation menu with Designer, JSON, and Preview buttons', () => {
    render(<IDEShell />)

    expect(screen.getByText('Designer')).toBeInTheDocument()
    expect(screen.getByText('JSON')).toBeInTheDocument()
    expect(screen.getByText('Preview')).toBeInTheDocument()
  })

  it('should render left panel with Components title', () => {
    render(<IDEShell />)

    expect(screen.getByText('Components')).toBeInTheDocument()
  })

  it('should render component placeholders in left panel', () => {
    render(<IDEShell />)

    expect(screen.getByText('Form')).toBeInTheDocument()
    expect(screen.getByText('Text')).toBeInTheDocument()
    expect(screen.getByText('Select')).toBeInTheDocument()
  })

  it('should render center canvas area', () => {
    render(<IDEShell />)

    expect(screen.getByText('Canvas / Work Area')).toBeInTheDocument()
  })

  it('should render right panel with Properties title', () => {
    render(<IDEShell />)

    expect(screen.getByText('Properties')).toBeInTheDocument()
  })

  it('should render properties placeholder message', () => {
    render(<IDEShell />)

    expect(screen.getByText('Select a component to edit.')).toBeInTheDocument()
  })

  it('should have three main sections: left panel, canvas, right panel', () => {
    render(<IDEShell />)

    // Check for main layout structure
    expect(screen.getByText('Components')).toBeInTheDocument() // Left panel
    expect(screen.getByText('Canvas / Work Area')).toBeInTheDocument() // Center
    expect(screen.getByText('Properties')).toBeInTheDocument() // Right panel
  })

  it('should render header and navigation menu separately', () => {
    render(<IDEShell />)

    // Header components
    expect(screen.getByTestId('ide-header')).toBeInTheDocument()

    // Navigation menu is separate from header
    expect(screen.getByText('Designer')).toBeInTheDocument()
  })

  it('should render all three menu buttons', () => {
    const { container } = render(<IDEShell />)

    const buttons = container.querySelectorAll('nav button')
    expect(buttons.length).toBe(3)
  })

  it('should render all component types in left panel', () => {
    render(<IDEShell />)

    const components = ['Form', 'Text', 'Select']

    components.forEach((component) => {
      expect(screen.getByText(component)).toBeInTheDocument()
    })
  })
})
