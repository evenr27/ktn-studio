import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDEPropertiesPanelHeader } from './IDEPropertiesPanelHeader'

describe('IDEPropertiesPanelHeader', () => {
  it('should render default title "Properties"', () => {
    render(<IDEPropertiesPanelHeader />)

    expect(screen.getByText('Properties')).toBeInTheDocument()
  })

  it('should render custom title', () => {
    render(<IDEPropertiesPanelHeader title="Component Properties" />)

    expect(screen.getByText('Component Properties')).toBeInTheDocument()
    expect(screen.queryByText('Properties')).not.toBeInTheDocument()
  })

  it('should render children instead of title when provided', () => {
    render(
      <IDEPropertiesPanelHeader title="Properties">
        <div>Custom Header Content</div>
      </IDEPropertiesPanelHeader>
    )

    expect(screen.getByText('Custom Header Content')).toBeInTheDocument()
    expect(screen.queryByText('Properties')).not.toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(<IDEPropertiesPanelHeader className="custom-class" />)

    const header = container.querySelector('.custom-class')
    expect(header).toBeInTheDocument()
  })

  it('should render with proper typography styles', () => {
    render(<IDEPropertiesPanelHeader />)

    const typography = screen.getByText('Properties')
    expect(typography).toBeInTheDocument()
  })

  it('should render complex children', () => {
    render(
      <IDEPropertiesPanelHeader>
        <div>
          <span>Title</span>
          <button>Action</button>
        </div>
      </IDEPropertiesPanelHeader>
    )

    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
  })
})
