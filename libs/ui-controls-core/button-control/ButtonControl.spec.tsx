import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ButtonControl } from './ButtonControl'

describe('ButtonControl', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<ButtonControl />)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Button')
    })

    it('should render with custom label', () => {
      render(<ButtonControl label="Submit" />)
      const button = screen.getByRole('button', { name: 'Submit' })
      expect(button).toBeInTheDocument()
    })

    it('should render as disabled', () => {
      render(<ButtonControl label="Test" disabled={true} />)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('should render with contained variant (default)', () => {
      const { container } = render(<ButtonControl label="Test" />)
      const button = container.querySelector('.MuiButton-contained')
      expect(button).toBeInTheDocument()
    })

    it('should render with outlined variant', () => {
      const { container } = render(<ButtonControl label="Test" variant="outlined" />)
      const button = container.querySelector('.MuiButton-outlined')
      expect(button).toBeInTheDocument()
    })

    it('should render with text variant', () => {
      const { container } = render(<ButtonControl label="Test" variant="text" />)
      const button = container.querySelector('.MuiButton-text')
      expect(button).toBeInTheDocument()
    })

    it('should render with primary color (default)', () => {
      const { container } = render(<ButtonControl label="Test" />)
      const button = container.querySelector('.MuiButton-colorPrimary')
      expect(button).toBeInTheDocument()
    })

    it('should render with secondary color', () => {
      const { container } = render(<ButtonControl label="Test" color="secondary" />)
      const button = container.querySelector('.MuiButton-colorSecondary')
      expect(button).toBeInTheDocument()
    })

    it('should render with error color', () => {
      const { container } = render(<ButtonControl label="Test" color="error" />)
      const button = container.querySelector('.MuiButton-colorError')
      expect(button).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('should call onClick when button is clicked', () => {
      const handleClick = jest.fn()
      render(<ButtonControl label="Test" onClick={handleClick} />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should not call onClick when disabled', () => {
      const handleClick = jest.fn()
      render(<ButtonControl label="Test" disabled={true} onClick={handleClick} />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(handleClick).not.toHaveBeenCalled()
    })

    it('should handle multiple clicks', () => {
      const handleClick = jest.fn()
      render(<ButtonControl label="Test" onClick={handleClick} />)

      const button = screen.getByRole('button')
      fireEvent.click(button)
      fireEvent.click(button)
      fireEvent.click(button)

      expect(handleClick).toHaveBeenCalledTimes(3)
    })
  })

  describe('CSS classes', () => {
    it('should apply custom className', () => {
      const { container } = render(<ButtonControl label="Test" className="custom-class" />)

      const button = container.querySelector('.custom-class')
      expect(button).toBeInTheDocument()
    })
  })

  describe('Variants and colors combination', () => {
    it('should render outlined secondary button', () => {
      const { container } = render(
        <ButtonControl label="Test" variant="outlined" color="secondary" />
      )

      const button = container.querySelector('.MuiButton-outlined.MuiButton-colorSecondary')
      expect(button).toBeInTheDocument()
    })

    it('should render text error button', () => {
      const { container } = render(<ButtonControl label="Test" variant="text" color="error" />)

      const button = container.querySelector('.MuiButton-text.MuiButton-colorError')
      expect(button).toBeInTheDocument()
    })
  })
})
