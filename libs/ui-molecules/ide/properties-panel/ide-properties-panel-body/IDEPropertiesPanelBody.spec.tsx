import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IDEPropertiesPanelBody } from './IDEPropertiesPanelBody'

describe('IDEPropertiesPanelBody', () => {
  it('should render default placeholder when no children', () => {
    render(<IDEPropertiesPanelBody />)

    expect(screen.getByText('Select a component to edit.')).toBeInTheDocument()
  })

  it('should render custom placeholder', () => {
    render(<IDEPropertiesPanelBody placeholder="No component selected" />)

    expect(screen.getByText('No component selected')).toBeInTheDocument()
    expect(screen.queryByText('Select a component to edit.')).not.toBeInTheDocument()
  })

  it('should render children instead of placeholder when provided', () => {
    render(
      <IDEPropertiesPanelBody>
        <div>Property Form</div>
      </IDEPropertiesPanelBody>
    )

    expect(screen.getByText('Property Form')).toBeInTheDocument()
    expect(screen.queryByText('Select a component to edit.')).not.toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(<IDEPropertiesPanelBody className="custom-class" />)

    const body = container.querySelector('.custom-class')
    expect(body).toBeInTheDocument()
  })

  it('should render multiple children', () => {
    render(
      <IDEPropertiesPanelBody>
        <div>Form Field 1</div>
        <div>Form Field 2</div>
        <div>Form Field 3</div>
      </IDEPropertiesPanelBody>
    )

    expect(screen.getByText('Form Field 1')).toBeInTheDocument()
    expect(screen.getByText('Form Field 2')).toBeInTheDocument()
    expect(screen.getByText('Form Field 3')).toBeInTheDocument()
  })

  it('should render complex children', () => {
    render(
      <IDEPropertiesPanelBody>
        <div>
          <label>Label</label>
          <input type="text" />
        </div>
      </IDEPropertiesPanelBody>
    )

    expect(screen.getByText('Label')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should render placeholder when children is empty string', () => {
    render(<IDEPropertiesPanelBody>{''}</IDEPropertiesPanelBody>)

    // Empty string is falsy, so placeholder should be displayed
    expect(screen.getByText('Select a component to edit.')).toBeInTheDocument()
  })
})
