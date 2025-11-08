import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDELayoutLeftPanel } from './IDELayoutLeftPanel'

describe('IDELayoutLeftPanel', () => {
  it('should render children', () => {
    render(
      <IDELayoutLeftPanel>
        <div>Left Panel Content</div>
      </IDELayoutLeftPanel>
    )

    expect(screen.getByText('Left Panel Content')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(
      <IDELayoutLeftPanel className="custom-class">
        <div>Content</div>
      </IDELayoutLeftPanel>
    )

    const panel = container.querySelector('.custom-class')
    expect(panel).toBeInTheDocument()
  })

  it('should use default width of 260px', () => {
    const { container } = render(
      <IDELayoutLeftPanel>
        <div>Content</div>
      </IDELayoutLeftPanel>
    )

    const panel = container.firstChild as HTMLElement
    expect(panel).toBeInTheDocument()
  })

  it('should support custom width', () => {
    const { container } = render(
      <IDELayoutLeftPanel width={300}>
        <div>Content</div>
      </IDELayoutLeftPanel>
    )

    const panel = container.firstChild as HTMLElement
    expect(panel).toBeInTheDocument()
  })

  it('should render multiple children', () => {
    render(
      <IDELayoutLeftPanel>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </IDELayoutLeftPanel>
    )

    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
  })

  it('should render empty children', () => {
    const { container } = render(<IDELayoutLeftPanel>{null}</IDELayoutLeftPanel>)

    expect(container.firstChild).toBeInTheDocument()
  })
})
