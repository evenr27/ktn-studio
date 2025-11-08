import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDELayoutBody } from './IDELayoutBody'

describe('IDELayoutBody', () => {
  it('should render children', () => {
    render(
      <IDELayoutBody>
        <div>Body Content</div>
      </IDELayoutBody>
    )

    expect(screen.getByText('Body Content')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(
      <IDELayoutBody className="custom-class">
        <div>Content</div>
      </IDELayoutBody>
    )

    const body = container.querySelector('.custom-class')
    expect(body).toBeInTheDocument()
  })

  it('should render multiple children (three-column layout)', () => {
    render(
      <IDELayoutBody>
        <div>Left Panel</div>
        <div>Center Panel</div>
        <div>Right Panel</div>
      </IDELayoutBody>
    )

    expect(screen.getByText('Left Panel')).toBeInTheDocument()
    expect(screen.getByText('Center Panel')).toBeInTheDocument()
    expect(screen.getByText('Right Panel')).toBeInTheDocument()
  })

  it('should render empty children', () => {
    const { container } = render(<IDELayoutBody>{null}</IDELayoutBody>)

    expect(container.firstChild).toBeInTheDocument()
  })

  it('should render complex body structure', () => {
    render(
      <IDELayoutBody>
        <aside>Sidebar</aside>
        <main>Main Content</main>
        <aside>Properties</aside>
      </IDELayoutBody>
    )

    expect(screen.getByText('Sidebar')).toBeInTheDocument()
    expect(screen.getByText('Main Content')).toBeInTheDocument()
    expect(screen.getByText('Properties')).toBeInTheDocument()
  })
})
