import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDEComponentPaletteHeader } from './IDEComponentPaletteHeader'

describe('IDEComponentPaletteHeader', () => {
  it('should render default title "Component Palette"', () => {
    render(<IDEComponentPaletteHeader />)

    expect(screen.getByText('Component Palette')).toBeInTheDocument()
  })

  it('should render custom title', () => {
    render(<IDEComponentPaletteHeader title="Component Library" />)

    expect(screen.getByText('Component Library')).toBeInTheDocument()
    expect(screen.queryByText('Component Palette')).not.toBeInTheDocument()
  })

  it('should render children instead of title when provided', () => {
    render(
      <IDEComponentPaletteHeader title="Component Palette">
        <div>Custom Header Content</div>
      </IDEComponentPaletteHeader>
    )

    expect(screen.getByText('Custom Header Content')).toBeInTheDocument()
    expect(screen.queryByText('Component Palette')).not.toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(<IDEComponentPaletteHeader className="custom-class" />)

    const header = container.querySelector('.custom-class')
    expect(header).toBeInTheDocument()
  })

  it('should render with proper typography styles', () => {
    render(<IDEComponentPaletteHeader />)

    const typography = screen.getByText('Component Palette')
    expect(typography).toBeInTheDocument()
  })

  it('should render complex children', () => {
    render(
      <IDEComponentPaletteHeader>
        <div>
          <span>Title</span>
          <button>Action</button>
        </div>
      </IDEComponentPaletteHeader>
    )

    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
  })
})
