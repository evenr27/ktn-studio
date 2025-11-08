import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDEWorkAreaHeader } from './IDEWorkAreaHeader'

describe('IDEWorkAreaHeader', () => {
  it('should render children', () => {
    render(
      <IDEWorkAreaHeader>
        <div>Header Content</div>
      </IDEWorkAreaHeader>
    )

    expect(screen.getByText('Header Content')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(
      <IDEWorkAreaHeader className="custom-class">
        <div>Content</div>
      </IDEWorkAreaHeader>
    )

    const header = container.querySelector('.custom-class')
    expect(header).toBeInTheDocument()
  })

  it('should render multiple children', () => {
    render(
      <IDEWorkAreaHeader>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </IDEWorkAreaHeader>
    )

    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
  })

  it('should render with null children', () => {
    const { container } = render(<IDEWorkAreaHeader>{null}</IDEWorkAreaHeader>)

    expect(container.firstChild).toBeInTheDocument()
  })

  it('should render complex children', () => {
    render(
      <IDEWorkAreaHeader>
        <div>
          <h3>Header Title</h3>
          <button>Action Button</button>
        </div>
      </IDEWorkAreaHeader>
    )

    expect(screen.getByText('Header Title')).toBeInTheDocument()
    expect(screen.getByText('Action Button')).toBeInTheDocument()
  })

  it('should render without children', () => {
    const { container } = render(<IDEWorkAreaHeader />)

    expect(container.firstChild).toBeInTheDocument()
  })

  it('should render with empty string as children', () => {
    const { container } = render(<IDEWorkAreaHeader>{''}</IDEWorkAreaHeader>)

    expect(container.firstChild).toBeInTheDocument()
  })

  it('should render children with className', () => {
    const { container } = render(
      <IDEWorkAreaHeader className="custom-header">
        <div>Header with class</div>
      </IDEWorkAreaHeader>
    )

    expect(screen.getByText('Header with class')).toBeInTheDocument()
    const header = container.querySelector('.custom-header')
    expect(header).toBeInTheDocument()
  })

  it('should render nested components', () => {
    render(
      <IDEWorkAreaHeader>
        <div>
          <span>Nested</span>
          <span>Components</span>
        </div>
      </IDEWorkAreaHeader>
    )

    expect(screen.getByText('Nested')).toBeInTheDocument()
    expect(screen.getByText('Components')).toBeInTheDocument()
  })
})
