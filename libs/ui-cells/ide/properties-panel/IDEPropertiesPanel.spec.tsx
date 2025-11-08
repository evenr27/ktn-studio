import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDEPropertiesPanel } from './IDEPropertiesPanel'

// Mock the ui-molecules components
jest.mock('@ktn/ui-molecules', () => ({
  IDEPropertiesPanelRoot: ({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) => (
    <div data-testid="properties-panel-root" className={className}>
      {children}
    </div>
  ),
  IDEPropertiesPanelHeader: ({ title }: { title?: string }) => (
    <div data-testid="properties-panel-header">{title}</div>
  ),
  IDEPropertiesPanelBody: ({
    children,
    placeholder,
  }: {
    children?: React.ReactNode
    placeholder?: string
  }) => (
    <div data-testid="properties-panel-body">
      {children || <span data-testid="placeholder">{placeholder}</span>}
    </div>
  ),
}))

describe('IDEPropertiesPanel', () => {
  it('should render with default props', () => {
    render(<IDEPropertiesPanel />)

    expect(screen.getByTestId('properties-panel-root')).toBeInTheDocument()
    expect(screen.getByTestId('properties-panel-header')).toBeInTheDocument()
    expect(screen.getByTestId('properties-panel-body')).toBeInTheDocument()
  })

  it('should render default title "Properties"', () => {
    render(<IDEPropertiesPanel />)

    expect(screen.getByText('Properties')).toBeInTheDocument()
  })

  it('should render custom title', () => {
    render(<IDEPropertiesPanel title="Component Settings" />)

    expect(screen.getByText('Component Settings')).toBeInTheDocument()
    expect(screen.queryByText('Properties')).not.toBeInTheDocument()
  })

  it('should render default placeholder when no children', () => {
    render(<IDEPropertiesPanel />)

    expect(screen.getByTestId('placeholder')).toHaveTextContent('Select a component to edit.')
  })

  it('should render custom placeholder', () => {
    render(<IDEPropertiesPanel placeholder="No selection" />)

    expect(screen.getByTestId('placeholder')).toHaveTextContent('No selection')
  })

  it('should render children instead of placeholder', () => {
    render(
      <IDEPropertiesPanel>
        <div>Property Form</div>
      </IDEPropertiesPanel>
    )

    expect(screen.getByText('Property Form')).toBeInTheDocument()
    expect(screen.queryByTestId('placeholder')).not.toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(<IDEPropertiesPanel className="custom-class" />)

    const root = container.querySelector('.custom-class')
    expect(root).toBeInTheDocument()
  })

  it('should render all sections together', () => {
    render(
      <IDEPropertiesPanel title="Settings">
        <div>Content</div>
      </IDEPropertiesPanel>
    )

    expect(screen.getByTestId('properties-panel-root')).toBeInTheDocument()
    expect(screen.getByTestId('properties-panel-header')).toBeInTheDocument()
    expect(screen.getByTestId('properties-panel-body')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('should render complex children', () => {
    render(
      <IDEPropertiesPanel>
        <div>
          <label>Field 1</label>
          <input type="text" />
        </div>
        <div>
          <label>Field 2</label>
          <input type="checkbox" />
        </div>
      </IDEPropertiesPanel>
    )

    expect(screen.getByText('Field 1')).toBeInTheDocument()
    expect(screen.getByText('Field 2')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })
})
