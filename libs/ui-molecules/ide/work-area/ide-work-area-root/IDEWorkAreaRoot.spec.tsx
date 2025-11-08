import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDEWorkAreaRoot } from './IDEWorkAreaRoot'

describe('IDEWorkAreaRoot', () => {
  it('should render children', () => {
    render(
      <IDEWorkAreaRoot>
        <div>Root Content</div>
      </IDEWorkAreaRoot>
    )

    expect(screen.getByText('Root Content')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(
      <IDEWorkAreaRoot className="custom-class">
        <div>Content</div>
      </IDEWorkAreaRoot>
    )

    const root = container.querySelector('.custom-class')
    expect(root).toBeInTheDocument()
  })

  it('should render multiple children', () => {
    render(
      <IDEWorkAreaRoot>
        <div>Section 1</div>
        <div>Section 2</div>
        <div>Section 3</div>
      </IDEWorkAreaRoot>
    )

    expect(screen.getByText('Section 1')).toBeInTheDocument()
    expect(screen.getByText('Section 2')).toBeInTheDocument()
    expect(screen.getByText('Section 3')).toBeInTheDocument()
  })

  it('should render complex children', () => {
    render(
      <IDEWorkAreaRoot>
        <div>
          <h3>Work Area</h3>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
      </IDEWorkAreaRoot>
    )

    expect(screen.getByText('Work Area')).toBeInTheDocument()
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('should render with className and children', () => {
    const { container } = render(
      <IDEWorkAreaRoot className="custom-root">
        <div>Content with class</div>
      </IDEWorkAreaRoot>
    )

    expect(screen.getByText('Content with class')).toBeInTheDocument()
    const root = container.querySelector('.custom-root')
    expect(root).toBeInTheDocument()
  })

  it('should render nested components', () => {
    render(
      <IDEWorkAreaRoot>
        <div>
          <span>Nested</span>
          <span>Elements</span>
        </div>
      </IDEWorkAreaRoot>
    )

    expect(screen.getByText('Nested')).toBeInTheDocument()
    expect(screen.getByText('Elements')).toBeInTheDocument()
  })

  it('should render with multiple levels of nesting', () => {
    render(
      <IDEWorkAreaRoot>
        <div>
          <div>
            <div>Deeply nested content</div>
          </div>
        </div>
      </IDEWorkAreaRoot>
    )

    expect(screen.getByText('Deeply nested content')).toBeInTheDocument()
  })
})
