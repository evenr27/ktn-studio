import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDELayoutCenter } from './IDELayoutCenter'

describe('IDELayoutCenter', () => {
  it('should render children', () => {
    render(
      <IDELayoutCenter>
        <div>Center Content</div>
      </IDELayoutCenter>
    )

    expect(screen.getByText('Center Content')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(
      <IDELayoutCenter className="custom-class">
        <div>Content</div>
      </IDELayoutCenter>
    )

    const center = container.querySelector('.custom-class')
    expect(center).toBeInTheDocument()
  })

  it('should render multiple children', () => {
    render(
      <IDELayoutCenter>
        <div>Canvas Item 1</div>
        <div>Canvas Item 2</div>
        <div>Canvas Item 3</div>
      </IDELayoutCenter>
    )

    expect(screen.getByText('Canvas Item 1')).toBeInTheDocument()
    expect(screen.getByText('Canvas Item 2')).toBeInTheDocument()
    expect(screen.getByText('Canvas Item 3')).toBeInTheDocument()
  })

  it('should render empty children', () => {
    const { container } = render(<IDELayoutCenter>{null}</IDELayoutCenter>)

    expect(container.firstChild).toBeInTheDocument()
  })

  it('should render with proper structure', () => {
    const { container } = render(
      <IDELayoutCenter>
        <div>Content</div>
      </IDELayoutCenter>
    )

    const box = container.firstChild as HTMLElement
    expect(box).toBeInTheDocument()
  })
})
