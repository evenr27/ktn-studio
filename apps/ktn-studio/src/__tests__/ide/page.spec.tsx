import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Page from '../../app/ide/page'

// Mock the IDEShell component from ui-features
jest.mock('@ktn/ui-features/ide-shell', () => ({
  IDEShell: () => <div data-testid="ide-shell">IDEShell Component</div>,
}))

describe('IDE Page', () => {
  it('should render without crashing', () => {
    render(<Page />)

    expect(screen.getByTestId('ide-shell')).toBeInTheDocument()
  })

  it('should render IDEShell component', () => {
    render(<Page />)

    expect(screen.getByText('IDEShell Component')).toBeInTheDocument()
  })

  it('should be a valid React component', () => {
    const { container } = render(<Page />)

    expect(container).toBeTruthy()
    expect(container.firstChild).toBeTruthy()
  })

  it('should only render IDEShell without extra wrappers', () => {
    const { container } = render(<Page />)

    const ideShell = screen.getByTestId('ide-shell')
    expect(ideShell).toBe(container.firstChild)
  })
})
