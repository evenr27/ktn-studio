import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDEWorkArea } from './IDEWorkArea'

// Mock the ui-molecules components
jest.mock('@ktn/ui-molecules', () => ({
  IDEWorkAreaRoot: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="work-area-root" className={className}>
      {children}
    </div>
  ),
  IDEWorkAreaBody: ({
    children,
    placeholder,
    className,
  }: {
    children?: React.ReactNode
    placeholder?: string
    className?: string
  }) => (
    <div data-testid="work-area-body" className={className}>
      {children || <div data-testid="work-area-placeholder">{placeholder}</div>}
    </div>
  ),
}))

describe('IDEWorkArea', () => {
  it('should render with default props', () => {
    render(<IDEWorkArea />)

    expect(screen.getByTestId('work-area-root')).toBeInTheDocument()
    expect(screen.getByTestId('work-area-body')).toBeInTheDocument()
  })

  it('should render with default placeholder', () => {
    render(<IDEWorkArea />)

    expect(screen.getByTestId('work-area-placeholder')).toHaveTextContent('Canvas / Work Area')
  })

  it('should render with custom placeholder', () => {
    render(<IDEWorkArea placeholder="Custom Canvas Area" />)

    expect(screen.getByTestId('work-area-placeholder')).toHaveTextContent('Custom Canvas Area')
  })

  it('should render children when provided', () => {
    render(
      <IDEWorkArea>
        <div>Work Area Content</div>
      </IDEWorkArea>
    )

    expect(screen.getByText('Work Area Content')).toBeInTheDocument()
    expect(screen.queryByTestId('work-area-placeholder')).not.toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(<IDEWorkArea className="custom-class" />)

    const workAreaRoot = container.querySelector('.custom-class')
    expect(workAreaRoot).toBeInTheDocument()
  })

  it('should render complex children', () => {
    render(
      <IDEWorkArea>
        <div>
          <h1>Canvas Title</h1>
          <div>Canvas Body</div>
        </div>
      </IDEWorkArea>
    )

    expect(screen.getByText('Canvas Title')).toBeInTheDocument()
    expect(screen.getByText('Canvas Body')).toBeInTheDocument()
  })

  it('should render placeholder when children is empty string', () => {
    render(<IDEWorkArea>{''}</IDEWorkArea>)

    // Empty string is falsy, so placeholder should be displayed
    expect(screen.getByTestId('work-area-placeholder')).toBeInTheDocument()
  })

  it('should work with null children', () => {
    render(<IDEWorkArea>{null}</IDEWorkArea>)

    expect(screen.getByTestId('work-area-placeholder')).toBeInTheDocument()
  })

  it('should render placeholder with custom text and no children', () => {
    render(<IDEWorkArea placeholder="Drop components here" />)

    expect(screen.getByTestId('work-area-placeholder')).toHaveTextContent('Drop components here')
  })
})
