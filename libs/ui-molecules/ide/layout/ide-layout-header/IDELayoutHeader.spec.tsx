import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDELayoutHeader } from './IDELayoutHeader'

describe('IDELayoutHeader', () => {
  it('should render children', () => {
    render(
      <IDELayoutHeader>
        <div>Header Content</div>
      </IDELayoutHeader>
    )

    expect(screen.getByText('Header Content')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(
      <IDELayoutHeader className="custom-class">
        <div>Content</div>
      </IDELayoutHeader>
    )

    const header = container.querySelector('.custom-class')
    expect(header).toBeInTheDocument()
  })

  it('should render multiple children', () => {
    render(
      <IDELayoutHeader>
        <div>Header Item 1</div>
        <div>Header Item 2</div>
        <div>Header Item 3</div>
      </IDELayoutHeader>
    )

    expect(screen.getByText('Header Item 1')).toBeInTheDocument()
    expect(screen.getByText('Header Item 2')).toBeInTheDocument()
    expect(screen.getByText('Header Item 3')).toBeInTheDocument()
  })

  it('should render empty children', () => {
    const { container } = render(<IDELayoutHeader>{null}</IDELayoutHeader>)

    expect(container.firstChild).toBeInTheDocument()
  })

  it('should render complex header structure', () => {
    render(
      <IDELayoutHeader>
        <div>
          <h1>Title</h1>
          <nav>Navigation</nav>
        </div>
      </IDELayoutHeader>
    )

    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Navigation')).toBeInTheDocument()
  })
})
