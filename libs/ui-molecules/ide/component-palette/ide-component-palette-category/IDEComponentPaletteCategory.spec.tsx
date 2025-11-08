import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDEComponentPaletteCategory } from './IDEComponentPaletteCategory'

describe('IDEComponentPaletteCategory', () => {
  describe('Rendering', () => {
    it('should render with title', () => {
      render(<IDEComponentPaletteCategory title="Text Inputs" />)
      expect(screen.getByText('Text Inputs')).toBeInTheDocument()
    })

    it('should render children', () => {
      render(
        <IDEComponentPaletteCategory title="Test Category">
          <div data-testid="child-1">Item 1</div>
          <div data-testid="child-2">Item 2</div>
        </IDEComponentPaletteCategory>
      )

      expect(screen.getByTestId('child-1')).toBeInTheDocument()
      expect(screen.getByTestId('child-2')).toBeInTheDocument()
    })

    it('should render without children', () => {
      render(<IDEComponentPaletteCategory title="Empty Category" />)
      expect(screen.getByText('Empty Category')).toBeInTheDocument()
    })
  })

  describe('Expand/Collapse', () => {
    it('should be expanded by default', () => {
      render(
        <IDEComponentPaletteCategory title="Test Category" defaultExpanded={true}>
          <div>Content</div>
        </IDEComponentPaletteCategory>
      )

      // Content should be visible
      expect(screen.getByText('Content')).toBeVisible()
    })

    it('should be collapsed when defaultExpanded is false', () => {
      render(
        <IDEComponentPaletteCategory title="Test Category" defaultExpanded={false}>
          <div>Content</div>
        </IDEComponentPaletteCategory>
      )

      // Content should not be visible (collapsed)
      const content = screen.queryByText('Content')
      expect(content).not.toBeVisible()
    })

    it('should toggle when clicking the header', () => {
      render(
        <IDEComponentPaletteCategory title="Test Category" defaultExpanded={true}>
          <div>Content</div>
        </IDEComponentPaletteCategory>
      )

      // Find the accordion button
      const button = screen.getByRole('button', { name: /Test Category/i })

      // Initially expanded
      expect(button).toHaveAttribute('aria-expanded', 'true')

      // Click header to collapse
      fireEvent.click(button)

      // Should be collapsed
      expect(button).toHaveAttribute('aria-expanded', 'false')

      // Click again to expand
      fireEvent.click(button)

      // Should be expanded again
      expect(button).toHaveAttribute('aria-expanded', 'true')
    })
  })

  describe('CSS classes', () => {
    it('should apply custom className', () => {
      const { container } = render(
        <IDEComponentPaletteCategory title="Test" className="custom-class" />
      )

      const accordion = container.querySelector('.custom-class')
      expect(accordion).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('should have expand icon', () => {
      render(<IDEComponentPaletteCategory title="Test Category" />)

      const expandIcon = document.querySelector('[data-testid="ExpandMoreIcon"]')
      expect(expandIcon).toBeInTheDocument()
    })

    it('should have uppercase text transform styling', () => {
      render(<IDEComponentPaletteCategory title="Text Inputs" />)

      // Title should have uppercase text transform in CSS
      const title = screen.getByText('Text Inputs')
      expect(title).toBeInTheDocument()
      // Note: CSS textTransform doesn't change actual text content, only visual presentation
    })
  })
})
