import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDEWorkAreaBody } from './IDEWorkAreaBody'

describe('IDEWorkAreaBody', () => {
  it('should render children', () => {
    render(
      <IDEWorkAreaBody>
        <div>Work Area Content</div>
      </IDEWorkAreaBody>
    )

    expect(screen.getByText('Work Area Content')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(
      <IDEWorkAreaBody className="custom-class">
        <div>Content</div>
      </IDEWorkAreaBody>
    )

    const body = container.querySelector('.custom-class')
    expect(body).toBeInTheDocument()
  })

  it('should render multiple children', () => {
    render(
      <IDEWorkAreaBody>
        <div>Section 1</div>
        <div>Section 2</div>
        <div>Section 3</div>
      </IDEWorkAreaBody>
    )

    expect(screen.getByText('Section 1')).toBeInTheDocument()
    expect(screen.getByText('Section 2')).toBeInTheDocument()
    expect(screen.getByText('Section 3')).toBeInTheDocument()
  })

  it('should render placeholder when no children provided', () => {
    render(<IDEWorkAreaBody />)

    expect(screen.getByText('Canvas / Work Area')).toBeInTheDocument()
  })

  it('should render custom placeholder', () => {
    render(<IDEWorkAreaBody placeholder="Drop components here" />)

    expect(screen.getByText('Drop components here')).toBeInTheDocument()
  })

  it('should render placeholder when children is null', () => {
    render(<IDEWorkAreaBody>{null}</IDEWorkAreaBody>)

    expect(screen.getByText('Canvas / Work Area')).toBeInTheDocument()
  })

  it('should render placeholder when children is empty string', () => {
    render(<IDEWorkAreaBody>{''}</IDEWorkAreaBody>)

    // Empty string is falsy, so placeholder should be displayed
    expect(screen.getByText('Canvas / Work Area')).toBeInTheDocument()
  })

  it('should render complex children', () => {
    render(
      <IDEWorkAreaBody>
        <div>
          <h3>Canvas Header</h3>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
      </IDEWorkAreaBody>
    )

    expect(screen.getByText('Canvas Header')).toBeInTheDocument()
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('should not render placeholder when children is provided', () => {
    render(
      <IDEWorkAreaBody>
        <div>Canvas Content</div>
      </IDEWorkAreaBody>
    )

    expect(screen.queryByText('Canvas / Work Area')).not.toBeInTheDocument()
  })

  it('should render custom placeholder with className', () => {
    const { container } = render(
      <IDEWorkAreaBody className="custom-class" placeholder="Custom Placeholder" />
    )

    expect(screen.getByText('Custom Placeholder')).toBeInTheDocument()
    const body = container.querySelector('.custom-class')
    expect(body).toBeInTheDocument()
  })
})
