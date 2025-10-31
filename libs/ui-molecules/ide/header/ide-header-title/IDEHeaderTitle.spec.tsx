import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDEHeaderTitle } from './IDEHeaderTitle'

describe('IDEHeaderTitle', () => {
  it('should render default title "Untitled form"', () => {
    render(<IDEHeaderTitle />)

    expect(screen.getByText('Untitled form')).toBeInTheDocument()
  })

  it('should render custom children as title', () => {
    render(<IDEHeaderTitle>Custom Title</IDEHeaderTitle>)

    expect(screen.getByText('Custom Title')).toBeInTheDocument()
    expect(screen.queryByText('Untitled form')).not.toBeInTheDocument()
  })

  it('should render subtitle when provided', () => {
    render(<IDEHeaderTitle subtitle="My subtitle">Title</IDEHeaderTitle>)

    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('My subtitle')).toBeInTheDocument()
  })

  it('should not render subtitle when not provided', () => {
    const { container } = render(<IDEHeaderTitle>Title</IDEHeaderTitle>)

    const subtitleElement = container.querySelector('.MuiTypography-caption')
    expect(subtitleElement).not.toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(<IDEHeaderTitle className="custom-title-class">Title</IDEHeaderTitle>)

    const titleBox = container.querySelector('.custom-title-class')
    expect(titleBox).toBeInTheDocument()
  })

  it('should render Box component as container', () => {
    const { container } = render(<IDEHeaderTitle>Title</IDEHeaderTitle>)

    const box = container.querySelector('.MuiBox-root')
    expect(box).toBeInTheDocument()
  })

  it('should render title as Typography body2 variant', () => {
    const { container } = render(<IDEHeaderTitle>My Title</IDEHeaderTitle>)

    const titleTypography = container.querySelector('.MuiTypography-body2')
    expect(titleTypography).toBeInTheDocument()
    expect(titleTypography).toHaveTextContent('My Title')
  })

  it('should render subtitle as Typography caption variant', () => {
    const { container } = render(<IDEHeaderTitle subtitle="Subtitle text">Title</IDEHeaderTitle>)

    const subtitleTypography = container.querySelector('.MuiTypography-caption')
    expect(subtitleTypography).toBeInTheDocument()
    expect(subtitleTypography).toHaveTextContent('Subtitle text')
  })

  it('should support complex children in title', () => {
    render(
      <IDEHeaderTitle subtitle="Subtitle">
        <strong>Bold Title</strong>
      </IDEHeaderTitle>
    )

    expect(screen.getByText('Bold Title')).toBeInTheDocument()
    expect(screen.getByText('Subtitle')).toBeInTheDocument()
  })

  it('should render with both title and subtitle together', () => {
    render(<IDEHeaderTitle subtitle="Description">Main Heading</IDEHeaderTitle>)

    expect(screen.getByText('Main Heading')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
  })

  it('should handle empty subtitle string', () => {
    const { container } = render(<IDEHeaderTitle subtitle="">Title</IDEHeaderTitle>)

    // Empty subtitle should not render caption
    const subtitleTypography = container.querySelector('.MuiTypography-caption')
    expect(subtitleTypography).not.toBeInTheDocument()
  })

  it('should render null children as default', () => {
    render(<IDEHeaderTitle>{null}</IDEHeaderTitle>)

    expect(screen.getByText('Untitled form')).toBeInTheDocument()
  })

  it('should render undefined children as default', () => {
    render(<IDEHeaderTitle>{undefined}</IDEHeaderTitle>)

    expect(screen.getByText('Untitled form')).toBeInTheDocument()
  })
})
