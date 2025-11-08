import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDELayoutRoot } from './IDELayoutRoot'

describe('IDELayoutRoot', () => {
  it('should render children', () => {
    render(
      <IDELayoutRoot>
        <div>Test Content</div>
      </IDELayoutRoot>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(
      <IDELayoutRoot className="custom-class">
        <div>Content</div>
      </IDELayoutRoot>
    )

    const layoutRoot = container.querySelector('.custom-class')
    expect(layoutRoot).toBeInTheDocument()
  })

  it('should support multiple children', () => {
    render(
      <IDELayoutRoot>
        <div>First Panel</div>
        <div>Second Panel</div>
        <div>Third Panel</div>
      </IDELayoutRoot>
    )

    expect(screen.getByText('First Panel')).toBeInTheDocument()
    expect(screen.getByText('Second Panel')).toBeInTheDocument()
    expect(screen.getByText('Third Panel')).toBeInTheDocument()
  })

  it('should render with flex display', () => {
    const { container } = render(
      <IDELayoutRoot>
        <div>Content</div>
      </IDELayoutRoot>
    )

    const box = container.firstChild as HTMLElement
    expect(box).toBeInTheDocument()
  })

  it('should render empty children', () => {
    const { container } = render(<IDELayoutRoot>{null}</IDELayoutRoot>)

    expect(container.firstChild).toBeInTheDocument()
  })
})
