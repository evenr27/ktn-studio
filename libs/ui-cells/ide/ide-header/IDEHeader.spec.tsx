import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDEHeader } from './IDEHeader'

// Mock the ui-molecules components
jest.mock('@ktn/ui-molecules', () => ({
  IDEHeaderRoot: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="header-root">{children}</div>
  ),
  IDEHeaderLogo: () => <div data-testid="header-logo">Logo</div>,
  IDEHeaderTitle: ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
    <div data-testid="header-title">
      <div>{children}</div>
      {subtitle && <div data-testid="subtitle">{subtitle}</div>}
    </div>
  ),
  IDEHeaderActions: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="header-actions">{children}</div>
  ),
}))

describe('IDEHeader', () => {
  it('should render with default props', () => {
    render(<IDEHeader />)

    expect(screen.getByTestId('header-root')).toBeInTheDocument()
    expect(screen.getByTestId('header-logo')).toBeInTheDocument()
    expect(screen.getByTestId('header-title')).toBeInTheDocument()
    expect(screen.getByTestId('header-actions')).toBeInTheDocument()
  })

  it('should render with default title "KTN Form"', () => {
    render(<IDEHeader />)

    expect(screen.getByText('KTN Form')).toBeInTheDocument()
  })

  it('should render with default subtitle "Form builder"', () => {
    render(<IDEHeader />)

    expect(screen.getByTestId('subtitle')).toHaveTextContent('Form builder')
  })

  it('should render with custom title', () => {
    render(<IDEHeader title="Custom Form" />)

    expect(screen.getByText('Custom Form')).toBeInTheDocument()
    expect(screen.queryByText('KTN Form')).not.toBeInTheDocument()
  })

  it('should render with custom subtitle', () => {
    render(<IDEHeader subtitle="Custom builder" />)

    expect(screen.getByTestId('subtitle')).toHaveTextContent('Custom builder')
  })

  it('should render default action buttons (Save and Preview)', () => {
    render(<IDEHeader />)

    expect(screen.getByText('Save')).toBeInTheDocument()
    expect(screen.getByText('Preview')).toBeInTheDocument()
  })

  it('should render custom rightSlot instead of default buttons', () => {
    const customSlot = <button>Custom Action</button>

    render(<IDEHeader rightSlot={customSlot} />)

    expect(screen.getByText('Custom Action')).toBeInTheDocument()
    expect(screen.queryByText('Save')).not.toBeInTheDocument()
    expect(screen.queryByText('Preview')).not.toBeInTheDocument()
  })

  it('should render all sub-components together', () => {
    render(<IDEHeader title="Test Form" subtitle="Test subtitle" />)

    expect(screen.getByTestId('header-root')).toBeInTheDocument()
    expect(screen.getByTestId('header-logo')).toBeInTheDocument()
    expect(screen.getByTestId('header-title')).toBeInTheDocument()
    expect(screen.getByTestId('header-actions')).toBeInTheDocument()
    expect(screen.getByText('Test Form')).toBeInTheDocument()
    expect(screen.getByTestId('subtitle')).toHaveTextContent('Test subtitle')
  })

  it('should support complex rightSlot content', () => {
    const complexSlot = (
      <>
        <button>Action 1</button>
        <button>Action 2</button>
        <div>Extra content</div>
      </>
    )

    render(<IDEHeader rightSlot={complexSlot} />)

    expect(screen.getByText('Action 1')).toBeInTheDocument()
    expect(screen.getByText('Action 2')).toBeInTheDocument()
    expect(screen.getByText('Extra content')).toBeInTheDocument()
  })
})
