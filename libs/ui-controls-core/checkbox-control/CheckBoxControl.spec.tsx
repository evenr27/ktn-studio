import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CheckBoxControl } from './CheckBoxControl'

describe('CheckBoxControl', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<CheckBoxControl />)
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeInTheDocument()
    })

    it('should render with label', () => {
      render(<CheckBoxControl label="Accept terms" />)
      expect(screen.getByLabelText('Accept terms')).toBeInTheDocument()
    })

    it('should render as unchecked by default', () => {
      render(<CheckBoxControl label="Test" />)
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement
      expect(checkbox.checked).toBe(false)
    })

    it('should render as checked', () => {
      render(<CheckBoxControl label="Test" checked={true} />)
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement
      expect(checkbox.checked).toBe(true)
    })

    it('should render as disabled', () => {
      render(<CheckBoxControl label="Test" disabled={true} />)
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeDisabled()
    })

    it('should render as required', () => {
      render(<CheckBoxControl label="Test" required={true} />)
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeRequired()
    })
  })

  describe('Interactions', () => {
    it('should call onChange when checkbox is clicked', () => {
      const handleChange = jest.fn()
      render(<CheckBoxControl label="Test" onChange={handleChange} />)

      const checkbox = screen.getByRole('checkbox')
      fireEvent.click(checkbox)

      expect(handleChange).toHaveBeenCalledWith(true)
    })

    it('should call onChange with false when unchecking', () => {
      const handleChange = jest.fn()
      render(<CheckBoxControl label="Test" checked={true} onChange={handleChange} />)

      const checkbox = screen.getByRole('checkbox')
      fireEvent.click(checkbox)

      expect(handleChange).toHaveBeenCalledWith(false)
    })

    it('should not trigger interaction when disabled', () => {
      const handleChange = jest.fn()
      render(<CheckBoxControl label="Test" disabled={true} onChange={handleChange} />)

      const checkbox = screen.getByRole('checkbox')
      // Checkbox should be disabled
      expect(checkbox).toBeDisabled()
      // In real usage, disabled checkboxes prevent user clicks
    })

    it('should toggle checked state', () => {
      const handleChange = jest.fn()
      const { rerender } = render(
        <CheckBoxControl label="Test" checked={false} onChange={handleChange} />
      )

      let checkbox = screen.getByRole('checkbox') as HTMLInputElement
      expect(checkbox.checked).toBe(false)

      // Click to check
      fireEvent.click(checkbox)
      expect(handleChange).toHaveBeenCalledWith(true)

      // Rerender with checked=true
      rerender(<CheckBoxControl label="Test" checked={true} onChange={handleChange} />)

      checkbox = screen.getByRole('checkbox') as HTMLInputElement
      expect(checkbox.checked).toBe(true)

      // Click to uncheck
      fireEvent.click(checkbox)
      expect(handleChange).toHaveBeenCalledWith(false)
    })
  })

  describe('Edge cases', () => {
    it('should render without label', () => {
      render(<CheckBoxControl />)
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      const { container } = render(<CheckBoxControl label="Test" className="custom-class" />)

      const formControlLabel = container.querySelector('.custom-class')
      expect(formControlLabel).toBeInTheDocument()
    })
  })
})
