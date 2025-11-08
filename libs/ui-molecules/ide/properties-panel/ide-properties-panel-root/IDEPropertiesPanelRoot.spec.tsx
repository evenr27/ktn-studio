import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDEPropertiesPanelRoot } from './IDEPropertiesPanelRoot'

describe('IDEPropertiesPanelRoot', () => {
  it('should render children', () => {
    render(
      <IDEPropertiesPanelRoot>
        <div>Panel Content</div>
      </IDEPropertiesPanelRoot>
    )

    expect(screen.getByText('Panel Content')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(
      <IDEPropertiesPanelRoot className="custom-class">
        <div>Content</div>
      </IDEPropertiesPanelRoot>
    )

    const root = container.querySelector('.custom-class')
    expect(root).toBeInTheDocument()
  })

  it('should render multiple children', () => {
    render(
      <IDEPropertiesPanelRoot>
        <div>Header</div>
        <div>Body</div>
      </IDEPropertiesPanelRoot>
    )

    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
  })

  it('should render empty children', () => {
    const { container } = render(<IDEPropertiesPanelRoot>{null}</IDEPropertiesPanelRoot>)

    expect(container.firstChild).toBeInTheDocument()
  })

  it('should render with flex column layout', () => {
    const { container } = render(
      <IDEPropertiesPanelRoot>
        <div>Content</div>
      </IDEPropertiesPanelRoot>
    )

    const box = container.firstChild as HTMLElement
    expect(box).toBeInTheDocument()
  })
})
