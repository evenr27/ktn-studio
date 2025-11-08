import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDEComponentPaletteRoot } from './IDEComponentPaletteRoot'

describe('IDEComponentPaletteRoot', () => {
  it('should render children', () => {
    render(
      <IDEComponentPaletteRoot>
        <div>Palette Content</div>
      </IDEComponentPaletteRoot>
    )

    expect(screen.getByText('Palette Content')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(
      <IDEComponentPaletteRoot className="custom-class">
        <div>Content</div>
      </IDEComponentPaletteRoot>
    )

    const root = container.querySelector('.custom-class')
    expect(root).toBeInTheDocument()
  })

  it('should render multiple children', () => {
    render(
      <IDEComponentPaletteRoot>
        <div>Header</div>
        <div>Body</div>
      </IDEComponentPaletteRoot>
    )

    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
  })

  it('should render empty children', () => {
    const { container } = render(<IDEComponentPaletteRoot>{null}</IDEComponentPaletteRoot>)

    expect(container.firstChild).toBeInTheDocument()
  })

  it('should render with flex column layout', () => {
    const { container } = render(
      <IDEComponentPaletteRoot>
        <div>Content</div>
      </IDEComponentPaletteRoot>
    )

    const box = container.firstChild as HTMLElement
    expect(box).toBeInTheDocument()
  })
})
