import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDEComponentPalette } from './IDEComponentPalette'

// Mock the ui-molecules components
jest.mock('@ktn/ui-molecules', () => ({
  IDEComponentPaletteRoot: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="palette-root">{children}</div>
  ),
  IDEComponentPaletteHeader: ({ title }: { title?: string }) => (
    <div data-testid="palette-header">
      <div data-testid="palette-title">{title}</div>
    </div>
  ),
  IDEComponentPaletteBody: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="palette-body">{children}</div>
  ),
  IDEComponentPaletteCategory: ({
    title,
    children,
  }: {
    title: string
    defaultExpanded?: boolean
    children: React.ReactNode
  }) => (
    <div data-testid={`category-${title}`}>
      <div>{title}</div>
      {children}
    </div>
  ),
  IDEComponentPaletteItem: ({
    componentId,
    name,
    onClick,
  }: {
    componentId: string
    name: string
    onClick?: (id: string) => void
  }) => (
    <div data-testid={`item-${componentId}`} onClick={() => onClick?.(componentId)}>
      {name}
    </div>
  ),
}))

// Mock core-form
jest.mock('@ktn/core-form', () => ({
  getCategories: () => [
    { id: 'text-inputs', name: 'Text Inputs', defaultExpanded: true },
    { id: 'selection-controls', name: 'Selection Controls', defaultExpanded: false },
  ],
  getComponentsGroupedByCategory: () => ({
    'text-inputs': [
      { id: 'text-field', name: 'TextField' },
      { id: 'number-field', name: 'NumberField' },
    ],
    'selection-controls': [
      { id: 'radio-button', name: 'RadioButton' },
      { id: 'checkbox', name: 'CheckBox' },
    ],
  }),
}))

describe('IDEComponentPalette', () => {
  it('should render with default props', () => {
    render(<IDEComponentPalette />)

    expect(screen.getByTestId('palette-root')).toBeInTheDocument()
    expect(screen.getByTestId('palette-title')).toHaveTextContent('Component Palette')
  })

  it('should render with custom title', () => {
    render(<IDEComponentPalette title="Custom Palette" />)

    expect(screen.getByTestId('palette-title')).toHaveTextContent('Custom Palette')
  })

  it('should render all categories', () => {
    render(<IDEComponentPalette />)

    expect(screen.getByTestId('category-Text Inputs')).toBeInTheDocument()
    expect(screen.getByTestId('category-Selection Controls')).toBeInTheDocument()
  })

  it('should render all components in categories', () => {
    render(<IDEComponentPalette />)

    // Text inputs
    expect(screen.getByTestId('item-text-field')).toBeInTheDocument()
    expect(screen.getByTestId('item-number-field')).toBeInTheDocument()

    // Selection controls
    expect(screen.getByTestId('item-radio-button')).toBeInTheDocument()
    expect(screen.getByTestId('item-checkbox')).toBeInTheDocument()
  })

  it('should call onComponentClick when component is clicked', () => {
    const handleClick = jest.fn()
    render(<IDEComponentPalette onComponentClick={handleClick} />)

    const textField = screen.getByTestId('item-text-field')
    fireEvent.click(textField)

    expect(handleClick).toHaveBeenCalledWith('text-field')
  })

  it('should work without onComponentClick handler', () => {
    render(<IDEComponentPalette />)

    const textField = screen.getByTestId('item-text-field')

    // Should not throw error
    expect(() => fireEvent.click(textField)).not.toThrow()
  })

  it('should render component names correctly', () => {
    render(<IDEComponentPalette />)

    expect(screen.getByText('TextField')).toBeInTheDocument()
    expect(screen.getByText('NumberField')).toBeInTheDocument()
    expect(screen.getByText('RadioButton')).toBeInTheDocument()
    expect(screen.getByText('CheckBox')).toBeInTheDocument()
  })

  it('should render category names correctly', () => {
    render(<IDEComponentPalette />)

    expect(screen.getByText('Text Inputs')).toBeInTheDocument()
    expect(screen.getByText('Selection Controls')).toBeInTheDocument()
  })
})
