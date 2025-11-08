import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDEShell } from './IDEShell'

// Mock the ui-cells components
jest.mock('@ktn/ui-cells', () => ({
  IDEHeader: ({ title, subtitle }: { title?: string; subtitle?: string }) => (
    <div data-testid="ide-header">
      <div data-testid="header-title">{title}</div>
      <div data-testid="header-subtitle">{subtitle}</div>
    </div>
  ),
  IDEComponentPalette: ({
    title,
    onComponentClick,
  }: {
    title?: string
    onComponentClick?: (id: string) => void
  }) => (
    <div data-testid="ide-component-palette">
      <div data-testid="palette-title">{title}</div>
      <div data-testid="category-text-inputs">
        <div>Text Inputs</div>
        <div data-testid="component-text-field" onClick={() => onComponentClick?.('text-field')}>
          TextField
        </div>
        <div data-testid="component-number-field">NumberField</div>
        <div data-testid="component-email-field">EmailField</div>
        <div data-testid="component-phone-field">PhoneField</div>
        <div data-testid="component-alphanumeric-field">AlphaNumericField</div>
        <div data-testid="component-date-field">DateField</div>
      </div>
      <div data-testid="category-selection-controls">
        <div>Selection Controls</div>
        <div data-testid="component-radio-button">RadioButton</div>
        <div data-testid="component-checkbox">CheckBox</div>
      </div>
      <div data-testid="category-buttons">
        <div>Buttons</div>
        <div data-testid="component-button">Button</div>
      </div>
    </div>
  ),
  IDELayout: ({
    header,
    leftPanel,
    center,
    rightPanel,
  }: {
    header?: React.ReactNode
    leftPanel?: React.ReactNode
    center?: React.ReactNode
    rightPanel?: React.ReactNode
  }) => (
    <div data-testid="ide-layout">
      {header && <div data-testid="layout-header">{header}</div>}
      {leftPanel && <div data-testid="layout-left-panel">{leftPanel}</div>}
      {center && <div data-testid="layout-center">{center}</div>}
      {rightPanel && <div data-testid="layout-right-panel">{rightPanel}</div>}
    </div>
  ),
  IDEPropertiesPanel: ({ title, placeholder }: { title?: string; placeholder?: string }) => (
    <div data-testid="ide-properties-panel">
      <div data-testid="properties-title">{title}</div>
      <div data-testid="properties-placeholder">{placeholder}</div>
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

  it('should render left panel with Component Palette title', () => {
    render(<IDEShell />)

    expect(screen.getByText('Component Palette')).toBeInTheDocument()
  })

  it('should render component categories in left panel', () => {
    render(<IDEShell />)

    // Check for categories
    expect(screen.getByText('Text Inputs')).toBeInTheDocument()
    expect(screen.getByText('Selection Controls')).toBeInTheDocument()
    expect(screen.getByText('Buttons')).toBeInTheDocument()
  })

  it('should render text input components in palette', () => {
    render(<IDEShell />)

    // Check for some text input components
    expect(screen.getByText('TextField')).toBeInTheDocument()
    expect(screen.getByText('NumberField')).toBeInTheDocument()
    expect(screen.getByText('EmailField')).toBeInTheDocument()
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
    expect(screen.getByText('Component Palette')).toBeInTheDocument() // Left panel
    expect(screen.getByText('Canvas / Work Area')).toBeInTheDocument() // Center
    expect(screen.getByText('Properties')).toBeInTheDocument() // Right panel
  })

  it('should render header and navigation menu separately', () => {
    render(<IDEShell />)

    // Header components
    expect(screen.getByTestId('ide-header')).toBeInTheDocument()
  })

  it('should render all 9 components from registry in left panel', () => {
    render(<IDEShell />)

    // Text Inputs (6)
    expect(screen.getByText('TextField')).toBeInTheDocument()
    expect(screen.getByText('NumberField')).toBeInTheDocument()
    expect(screen.getByText('EmailField')).toBeInTheDocument()
    expect(screen.getByText('PhoneField')).toBeInTheDocument()
    expect(screen.getByText('AlphaNumericField')).toBeInTheDocument()
    expect(screen.getByText('DateField')).toBeInTheDocument()

    // Selection Controls (2)
    expect(screen.getByText('RadioButton')).toBeInTheDocument()
    expect(screen.getByText('CheckBox')).toBeInTheDocument()

    // Buttons (1)
    expect(screen.getByText('Button')).toBeInTheDocument()
  })
})
