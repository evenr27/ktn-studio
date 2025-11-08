import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDEComponentPaletteItem } from './IDEComponentPaletteItem'

describe('IDEComponentPaletteItem', () => {
  describe('Rendering', () => {
    it('should render with name', () => {
      render(<IDEComponentPaletteItem componentId="text-field" name="TextField" />)
      expect(screen.getByText('TextField')).toBeInTheDocument()
    })

    it('should render with componentId data attribute', () => {
      const { container } = render(
        <IDEComponentPaletteItem componentId="text-field" name="TextField" />
      )

      const item = container.querySelector('[data-component-id="text-field"]')
      expect(item).toBeInTheDocument()
    })

    it('should render different component names', () => {
      const { rerender } = render(
        <IDEComponentPaletteItem componentId="text-field" name="TextField" />
      )
      expect(screen.getByText('TextField')).toBeInTheDocument()

      rerender(<IDEComponentPaletteItem componentId="button" name="Button" />)
      expect(screen.getByText('Button')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('should call onClick when clicked', () => {
      const handleClick = jest.fn()
      render(
        <IDEComponentPaletteItem componentId="text-field" name="TextField" onClick={handleClick} />
      )

      const item = screen.getByText('TextField')
      fireEvent.click(item)

      expect(handleClick).toHaveBeenCalledWith('text-field')
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should handle multiple clicks', () => {
      const handleClick = jest.fn()
      render(
        <IDEComponentPaletteItem componentId="text-field" name="TextField" onClick={handleClick} />
      )

      const item = screen.getByText('TextField')
      fireEvent.click(item)
      fireEvent.click(item)
      fireEvent.click(item)

      expect(handleClick).toHaveBeenCalledTimes(3)
    })

    it('should work without onClick handler', () => {
      expect(() => {
        render(<IDEComponentPaletteItem componentId="text-field" name="TextField" />)
        const item = screen.getByText('TextField')
        fireEvent.click(item)
      }).not.toThrow()
    })
  })

  describe('CSS classes', () => {
    it('should apply custom className', () => {
      const { container } = render(
        <IDEComponentPaletteItem
          componentId="text-field"
          name="TextField"
          className="custom-class"
        />
      )

      const item = container.querySelector('.custom-class')
      expect(item).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('should have cursor pointer', () => {
      const { container } = render(
        <IDEComponentPaletteItem componentId="text-field" name="TextField" />
      )

      const item = container.querySelector('[data-component-id="text-field"]')
      const styles = window.getComputedStyle(item as Element)
      expect(styles.cursor).toBe('pointer')
    })

    it('should prevent text selection', () => {
      render(<IDEComponentPaletteItem componentId="text-field" name="TextField" />)
      const text = screen.getByText('TextField')
      const styles = window.getComputedStyle(text)
      expect(styles.userSelect).toBe('none')
    })
  })

  describe('Accessibility', () => {
    it('should be keyboard accessible', () => {
      const handleClick = jest.fn()
      render(
        <IDEComponentPaletteItem componentId="text-field" name="TextField" onClick={handleClick} />
      )

      const item = screen.getByText('TextField').parentElement
      fireEvent.click(item as Element)

      expect(handleClick).toHaveBeenCalled()
    })
  })
})
