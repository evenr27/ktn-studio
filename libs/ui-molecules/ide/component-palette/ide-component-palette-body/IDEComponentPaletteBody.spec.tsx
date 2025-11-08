import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDEComponentPaletteBody } from './IDEComponentPaletteBody'

describe('IDEComponentPaletteBody', () => {
  it('should render children', () => {
    render(
      <IDEComponentPaletteBody>
        <div>Category Content</div>
      </IDEComponentPaletteBody>
    )

    expect(screen.getByText('Category Content')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(
      <IDEComponentPaletteBody className="custom-class">
        <div>Content</div>
      </IDEComponentPaletteBody>
    )

    const body = container.querySelector('.custom-class')
    expect(body).toBeInTheDocument()
  })

  it('should render multiple children', () => {
    render(
      <IDEComponentPaletteBody>
        <div>Category 1</div>
        <div>Category 2</div>
        <div>Category 3</div>
      </IDEComponentPaletteBody>
    )

    expect(screen.getByText('Category 1')).toBeInTheDocument()
    expect(screen.getByText('Category 2')).toBeInTheDocument()
    expect(screen.getByText('Category 3')).toBeInTheDocument()
  })

  it('should render empty children', () => {
    const { container } = render(<IDEComponentPaletteBody>{null}</IDEComponentPaletteBody>)

    expect(container.firstChild).toBeInTheDocument()
  })

  it('should render complex children', () => {
    render(
      <IDEComponentPaletteBody>
        <div>
          <h3>Category</h3>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
      </IDEComponentPaletteBody>
    )

    expect(screen.getByText('Category')).toBeInTheDocument()
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })
})
