import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDELayout } from './IDELayout'

// Mock the ui-molecules components
jest.mock('@ktn/ui-molecules', () => ({
  IDELayoutRoot: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout-root">{children}</div>
  ),
  IDELayoutHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout-header">{children}</div>
  ),
  IDELayoutBody: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout-body">{children}</div>
  ),
  IDELayoutLeftPanel: ({ children, width }: { children: React.ReactNode; width?: number }) => (
    <div data-testid="layout-left-panel" data-width={width}>
      {children}
    </div>
  ),
  IDELayoutCenter: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout-center">{children}</div>
  ),
  IDELayoutRightPanel: ({ children, width }: { children: React.ReactNode; width?: number }) => (
    <div data-testid="layout-right-panel" data-width={width}>
      {children}
    </div>
  ),
}))

describe('IDELayout', () => {
  it('should render complete layout with all panels', () => {
    render(
      <IDELayout
        leftPanel={<div>Left Content</div>}
        center={<div>Center Content</div>}
        rightPanel={<div>Right Content</div>}
      />
    )

    expect(screen.getByTestId('layout-root')).toBeInTheDocument()
    expect(screen.getByText('Left Content')).toBeInTheDocument()
    expect(screen.getByText('Center Content')).toBeInTheDocument()
    expect(screen.getByText('Right Content')).toBeInTheDocument()
  })

  it('should use default widths when not specified', () => {
    render(
      <IDELayout
        leftPanel={<div>Left</div>}
        center={<div>Center</div>}
        rightPanel={<div>Right</div>}
      />
    )

    const leftPanel = screen.getByTestId('layout-left-panel')
    const rightPanel = screen.getByTestId('layout-right-panel')

    expect(leftPanel).toHaveAttribute('data-width', '260')
    expect(rightPanel).toHaveAttribute('data-width', '340')
  })

  it('should support custom widths for panels', () => {
    render(
      <IDELayout
        leftPanel={<div>Left</div>}
        center={<div>Center</div>}
        rightPanel={<div>Right</div>}
        leftPanelWidth={300}
        rightPanelWidth={400}
      />
    )

    const leftPanel = screen.getByTestId('layout-left-panel')
    const rightPanel = screen.getByTestId('layout-right-panel')

    expect(leftPanel).toHaveAttribute('data-width', '300')
    expect(rightPanel).toHaveAttribute('data-width', '400')
  })

  it('should render only center when other panels are not provided', () => {
    render(<IDELayout center={<div>Only Center</div>} />)

    expect(screen.getByText('Only Center')).toBeInTheDocument()
    expect(screen.queryByTestId('layout-left-panel')).not.toBeInTheDocument()
    expect(screen.queryByTestId('layout-right-panel')).not.toBeInTheDocument()
  })

  it('should support two-column layout (left + center)', () => {
    render(<IDELayout leftPanel={<div>Left Panel</div>} center={<div>Center Panel</div>} />)

    expect(screen.getByText('Left Panel')).toBeInTheDocument()
    expect(screen.getByText('Center Panel')).toBeInTheDocument()
    expect(screen.queryByTestId('layout-right-panel')).not.toBeInTheDocument()
  })

  it('should support two-column layout (center + right)', () => {
    render(<IDELayout center={<div>Center Panel</div>} rightPanel={<div>Right Panel</div>} />)

    expect(screen.getByText('Center Panel')).toBeInTheDocument()
    expect(screen.getByText('Right Panel')).toBeInTheDocument()
    expect(screen.queryByTestId('layout-left-panel')).not.toBeInTheDocument()
  })

  it('should render complex content in panels', () => {
    render(
      <IDELayout
        leftPanel={
          <div>
            <h1>Palette</h1>
            <button>Component 1</button>
          </div>
        }
        center={
          <div>
            <canvas>Canvas</canvas>
          </div>
        }
        rightPanel={
          <div>
            <h2>Properties</h2>
            <input type="text" />
          </div>
        }
      />
    )

    expect(screen.getByText('Palette')).toBeInTheDocument()
    expect(screen.getByText('Component 1')).toBeInTheDocument()
    expect(screen.getByText('Properties')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should render empty layout when no panels are provided', () => {
    render(<IDELayout />)

    expect(screen.getByTestId('layout-root')).toBeInTheDocument()
    expect(screen.getByTestId('layout-body')).toBeInTheDocument()
    expect(screen.queryByTestId('layout-header')).not.toBeInTheDocument()
    expect(screen.queryByTestId('layout-left-panel')).not.toBeInTheDocument()
    expect(screen.queryByTestId('layout-center')).not.toBeInTheDocument()
    expect(screen.queryByTestId('layout-right-panel')).not.toBeInTheDocument()
  })

  it('should render header when provided', () => {
    render(<IDELayout header={<div>IDE Header Content</div>} center={<div>Center</div>} />)

    expect(screen.getByTestId('layout-header')).toBeInTheDocument()
    expect(screen.getByText('IDE Header Content')).toBeInTheDocument()
  })

  it('should not render header when not provided', () => {
    render(<IDELayout center={<div>Center</div>} />)

    expect(screen.queryByTestId('layout-header')).not.toBeInTheDocument()
  })

  it('should render complete layout with header and all panels', () => {
    render(
      <IDELayout
        header={<div>Header</div>}
        leftPanel={<div>Left</div>}
        center={<div>Center</div>}
        rightPanel={<div>Right</div>}
      />
    )

    expect(screen.getByTestId('layout-root')).toBeInTheDocument()
    expect(screen.getByTestId('layout-header')).toBeInTheDocument()
    expect(screen.getByTestId('layout-body')).toBeInTheDocument()
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Left')).toBeInTheDocument()
    expect(screen.getByText('Center')).toBeInTheDocument()
    expect(screen.getByText('Right')).toBeInTheDocument()
  })

  it('should render body even when panels are empty', () => {
    render(<IDELayout header={<div>Header Only</div>} />)

    expect(screen.getByTestId('layout-body')).toBeInTheDocument()
    expect(screen.getByText('Header Only')).toBeInTheDocument()
  })
})
