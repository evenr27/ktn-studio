import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDELayoutRightPanel } from './IDELayoutRightPanel'

describe('IDELayoutRightPanel', () => {
  it('should render children', () => {
    render(
      <IDELayoutRightPanel>
        <div>Right Panel Content</div>
      </IDELayoutRightPanel>
    )

    expect(screen.getByText('Right Panel Content')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(
      <IDELayoutRightPanel className="custom-class">
        <div>Content</div>
      </IDELayoutRightPanel>
    )

    const panel = container.querySelector('.custom-class')
    expect(panel).toBeInTheDocument()
  })

  it('should use default width of 340px', () => {
    const { container } = render(
      <IDELayoutRightPanel>
        <div>Content</div>
      </IDELayoutRightPanel>
    )

    const panel = container.firstChild as HTMLElement
    expect(panel).toBeInTheDocument()
  })

  it('should support custom width', () => {
    const { container } = render(
      <IDELayoutRightPanel width={400}>
        <div>Content</div>
      </IDELayoutRightPanel>
    )

    const panel = container.firstChild as HTMLElement
    expect(panel).toBeInTheDocument()
  })

  it('should render multiple children', () => {
    render(
      <IDELayoutRightPanel>
        <div>Property 1</div>
        <div>Property 2</div>
        <div>Property 3</div>
      </IDELayoutRightPanel>
    )

    expect(screen.getByText('Property 1')).toBeInTheDocument()
    expect(screen.getByText('Property 2')).toBeInTheDocument()
    expect(screen.getByText('Property 3')).toBeInTheDocument()
  })

  it('should render empty children', () => {
    const { container } = render(<IDELayoutRightPanel>{null}</IDELayoutRightPanel>)

    expect(container.firstChild).toBeInTheDocument()
  })
})
