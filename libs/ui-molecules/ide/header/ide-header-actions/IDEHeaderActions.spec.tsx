import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDEHeaderActions } from './IDEHeaderActions'

describe('IDEHeaderActions', () => {
  it('should render children', () => {
    render(
      <IDEHeaderActions>
        <button>Action 1</button>
      </IDEHeaderActions>
    )

    expect(screen.getByText('Action 1')).toBeInTheDocument()
  })

  it('should render multiple children', () => {
    render(
      <IDEHeaderActions>
        <button>Save</button>
        <button>Preview</button>
        <button>Publish</button>
      </IDEHeaderActions>
    )

    expect(screen.getByText('Save')).toBeInTheDocument()
    expect(screen.getByText('Preview')).toBeInTheDocument()
    expect(screen.getByText('Publish')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(
      <IDEHeaderActions className="custom-actions-class">
        <button>Action</button>
      </IDEHeaderActions>
    )

    const actionsBox = container.querySelector('.custom-actions-class')
    expect(actionsBox).toBeInTheDocument()
  })

  it('should render Box component as container', () => {
    const { container } = render(
      <IDEHeaderActions>
        <button>Action</button>
      </IDEHeaderActions>
    )

    const box = container.querySelector('.MuiBox-root')
    expect(box).toBeInTheDocument()
  })

  it('should render empty children', () => {
    const { container } = render(<IDEHeaderActions>{null}</IDEHeaderActions>)

    const box = container.querySelector('.MuiBox-root')
    expect(box).toBeInTheDocument()
    expect(box?.textContent).toBe('')
  })

  it('should support complex children elements', () => {
    render(
      <IDEHeaderActions>
        <div>
          <button>Nested Action</button>
          <span>Label</span>
        </div>
      </IDEHeaderActions>
    )

    expect(screen.getByText('Nested Action')).toBeInTheDocument()
    expect(screen.getByText('Label')).toBeInTheDocument()
  })

  it('should support different types of action components', () => {
    render(
      <IDEHeaderActions>
        <button>Button</button>
        <a href="#">Link</a>
        <div>Custom Element</div>
      </IDEHeaderActions>
    )

    expect(screen.getByText('Button')).toBeInTheDocument()
    expect(screen.getByText('Link')).toBeInTheDocument()
    expect(screen.getByText('Custom Element')).toBeInTheDocument()
  })

  it('should render with Material-UI Button components', () => {
    render(
      <IDEHeaderActions>
        <button className="MuiButton-root">MUI Button</button>
      </IDEHeaderActions>
    )

    const button = screen.getByText('MUI Button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('MuiButton-root')
  })

  it('should handle React fragments as children', () => {
    render(
      <IDEHeaderActions>
        <>
          <button>First</button>
          <button>Second</button>
        </>
      </IDEHeaderActions>
    )

    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
  })
})
