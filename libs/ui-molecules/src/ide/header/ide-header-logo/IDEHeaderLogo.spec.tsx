import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDEHeaderLogo } from './IDEHeaderLogo'

describe('IDEHeaderLogo', () => {
  it('should render default logo with "K" text', () => {
    render(<IDEHeaderLogo />)

    expect(screen.getByText('K')).toBeInTheDocument()
  })

  it('should render custom children instead of default logo', () => {
    render(
      <IDEHeaderLogo>
        <div>Custom Logo</div>
      </IDEHeaderLogo>
    )

    expect(screen.getByText('Custom Logo')).toBeInTheDocument()
    expect(screen.queryByText('K')).not.toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(<IDEHeaderLogo className="custom-logo-class" />)

    const logoBox = container.querySelector('.custom-logo-class')
    expect(logoBox).toBeInTheDocument()
  })

  it('should render Box component as container', () => {
    const { container } = render(<IDEHeaderLogo />)

    const box = container.querySelector('.MuiBox-root')
    expect(box).toBeInTheDocument()
  })

  it('should render default circular logo', () => {
    render(<IDEHeaderLogo />)

    const logoCircle = screen.getByText('K').closest('div')
    expect(logoCircle).toBeInTheDocument()
  })

  it('should support image as children', () => {
    render(
      <IDEHeaderLogo>
        <img src="/logo.png" alt="Logo" />
      </IDEHeaderLogo>
    )

    expect(screen.getByAltText('Logo')).toBeInTheDocument()
  })

  it('should support complex children elements', () => {
    render(
      <IDEHeaderLogo>
        <div>
          <img src="/icon.png" alt="Icon" />
          <span>Brand</span>
        </div>
      </IDEHeaderLogo>
    )

    expect(screen.getByAltText('Icon')).toBeInTheDocument()
    expect(screen.getByText('Brand')).toBeInTheDocument()
  })

  it('should render null children as default logo', () => {
    render(<IDEHeaderLogo>{null}</IDEHeaderLogo>)

    // When children is null, it should fall back to default logo
    expect(screen.getByText('K')).toBeInTheDocument()
  })

  it('should render undefined children as default logo', () => {
    render(<IDEHeaderLogo>{undefined}</IDEHeaderLogo>)

    // When children is undefined, it should fall back to default logo
    expect(screen.getByText('K')).toBeInTheDocument()
  })
})
