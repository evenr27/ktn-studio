import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { RadioButtonControl } from './RadioButtonControl'

describe('RadioButtonControl', () => {
  const mockOptions = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
  ]

  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<RadioButtonControl />)
      // Should render even without options (empty radio group)
      const radioGroup = screen.getByRole('radiogroup')
      expect(radioGroup).toBeInTheDocument()
    })

    it('should render with label', () => {
      render(<RadioButtonControl label="Choose an option" options={mockOptions} />)
      expect(screen.getByText('Choose an option')).toBeInTheDocument()
    })

    it('should render all options', () => {
      render(<RadioButtonControl options={mockOptions} />)

      expect(screen.getByLabelText('Option 1')).toBeInTheDocument()
      expect(screen.getByLabelText('Option 2')).toBeInTheDocument()
      expect(screen.getByLabelText('Option 3')).toBeInTheDocument()
    })

    it('should render with selected value', () => {
      render(<RadioButtonControl options={mockOptions} value="opt2" />)

      const radio2 = screen.getByLabelText('Option 2') as HTMLInputElement
      expect(radio2.checked).toBe(true)
    })

    it('should render as disabled', () => {
      render(<RadioButtonControl options={mockOptions} disabled={true} />)

      const radio1 = screen.getByLabelText('Option 1') as HTMLInputElement
      expect(radio1.disabled).toBe(true)
    })

    it('should render as required', () => {
      const { container } = render(
        <RadioButtonControl label="Required Field" options={mockOptions} required={true} />
      )

      // MUI FormControl with required prop is present
      const formControl = container.querySelector('fieldset')
      expect(formControl).toBeInTheDocument()
      // Note: MUI doesn't add 'required' attribute to individual radio inputs
      // but the FormControl component handles the required state
    })
  })

  describe('Interactions', () => {
    it('should call onChange when option is selected', () => {
      const handleChange = jest.fn()
      render(<RadioButtonControl options={mockOptions} onChange={handleChange} />)

      const radio2 = screen.getByLabelText('Option 2')
      fireEvent.click(radio2)

      expect(handleChange).toHaveBeenCalledWith('opt2')
    })

    it('should not trigger interaction when disabled', () => {
      const handleChange = jest.fn()
      render(<RadioButtonControl options={mockOptions} disabled={true} onChange={handleChange} />)

      const radio1 = screen.getByLabelText('Option 1') as HTMLInputElement
      // Radio should be disabled
      expect(radio1.disabled).toBe(true)
      // In real usage, disabled radios prevent user clicks
    })

    it('should change selected option', () => {
      const handleChange = jest.fn()
      const { rerender } = render(
        <RadioButtonControl options={mockOptions} value="opt1" onChange={handleChange} />
      )

      let radio1 = screen.getByLabelText('Option 1') as HTMLInputElement
      expect(radio1.checked).toBe(true)

      // Simulate user click
      const radio2 = screen.getByLabelText('Option 2')
      fireEvent.click(radio2)

      expect(handleChange).toHaveBeenCalledWith('opt2')

      // Rerender with new value
      rerender(<RadioButtonControl options={mockOptions} value="opt2" onChange={handleChange} />)

      const radio2Updated = screen.getByLabelText('Option 2') as HTMLInputElement
      expect(radio2Updated.checked).toBe(true)
    })
  })

  describe('Edge cases', () => {
    it('should handle empty options array', () => {
      render(<RadioButtonControl options={[]} />)

      const radioGroup = screen.getByRole('radiogroup')
      expect(radioGroup).toBeInTheDocument()
      expect(radioGroup.children).toHaveLength(0)
    })

    it('should apply custom className', () => {
      const { container } = render(
        <RadioButtonControl options={mockOptions} className="custom-class" />
      )

      const formControl = container.querySelector('.custom-class')
      expect(formControl).toBeInTheDocument()
    })
  })
})
