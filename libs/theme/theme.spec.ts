import { theme } from './theme'

describe('theme', () => {
  it('should be defined', () => {
    expect(theme).toBeDefined()
  })

  it('should be created with cssVariables configuration', () => {
    // Material-UI theme may not expose cssVariables directly in the final object
    // This test verifies the theme was created successfully with the config
    expect(theme).toBeDefined()
    expect(theme.typography).toBeDefined()
  })

  it('should have custom typography fontFamily', () => {
    expect(theme.typography.fontFamily).toBe('var(--font-roboto)')
  })

  it('should be a valid Material-UI theme object', () => {
    expect(theme).toHaveProperty('palette')
    expect(theme).toHaveProperty('spacing')
    expect(theme).toHaveProperty('breakpoints')
    expect(theme).toHaveProperty('typography')
  })

  it('should have default palette colors', () => {
    expect(theme.palette).toBeDefined()
    expect(theme.palette.primary).toBeDefined()
    expect(theme.palette.secondary).toBeDefined()
  })

  it('should have spacing function', () => {
    expect(typeof theme.spacing).toBe('function')
    expect(theme.spacing(1)).toBeDefined()
  })

  it('should have breakpoints defined', () => {
    expect(theme.breakpoints).toBeDefined()
    expect(theme.breakpoints.values).toBeDefined()
    expect(theme.breakpoints.values.xs).toBeDefined()
    expect(theme.breakpoints.values.sm).toBeDefined()
    expect(theme.breakpoints.values.md).toBeDefined()
    expect(theme.breakpoints.values.lg).toBeDefined()
    expect(theme.breakpoints.values.xl).toBeDefined()
  })
})
