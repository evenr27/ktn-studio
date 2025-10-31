import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDEHeaderRoot } from './IDEHeaderRoot'

describe('IDEHeaderRoot', () => {
  it('should render children', () => {
    render(
      <IDEHeaderRoot>
        <div>Test Content</div>
      </IDEHeaderRoot>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(
      <IDEHeaderRoot className="custom-class">
        <div>Content</div>
      </IDEHeaderRoot>
    )

    const appBar = container.querySelector('.custom-class')
    expect(appBar).toBeInTheDocument()
  })

  it('should use elevation 0 by default', () => {
    const { container } = render(
      <IDEHeaderRoot>
        <div>Content</div>
      </IDEHeaderRoot>
    )

    // Material-UI adds MuiPaper-elevation0 class when elevation is 0
    const appBar = container.querySelector('.MuiPaper-elevation0')
    expect(appBar).toBeInTheDocument()
  })

  it('should support custom elevation', () => {
    const { container } = render(
      <IDEHeaderRoot elevation={4}>
        <div>Content</div>
      </IDEHeaderRoot>
    )

    const appBar = container.querySelector('.MuiPaper-elevation4')
    expect(appBar).toBeInTheDocument()
  })

  it('should render AppBar component', () => {
    const { container } = render(
      <IDEHeaderRoot>
        <div>Content</div>
      </IDEHeaderRoot>
    )

    const appBar = container.querySelector('.MuiAppBar-root')
    expect(appBar).toBeInTheDocument()
  })

  it('should render Toolbar component', () => {
    const { container } = render(
      <IDEHeaderRoot>
        <div>Content</div>
      </IDEHeaderRoot>
    )

    const toolbar = container.querySelector('.MuiToolbar-root')
    expect(toolbar).toBeInTheDocument()
  })

  it('should support multiple children', () => {
    render(
      <IDEHeaderRoot>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </IDEHeaderRoot>
    )

    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
    expect(screen.getByText('Third')).toBeInTheDocument()
  })

  it('should render with static position', () => {
    const { container } = render(
      <IDEHeaderRoot>
        <div>Content</div>
      </IDEHeaderRoot>
    )

    const appBar = container.querySelector('.MuiAppBar-positionStatic')
    expect(appBar).toBeInTheDocument()
  })

  it('should render empty children', () => {
    const { container } = render(<IDEHeaderRoot>{null}</IDEHeaderRoot>)

    const toolbar = container.querySelector('.MuiToolbar-root')
    expect(toolbar).toBeInTheDocument()
    expect(toolbar?.textContent).toBe('')
  })
})
