/**
 * Component Metadata Types
 *
 * Defines the structure for component metadata used in the component palette.
 * This metadata is used for:
 * - Registering components in the palette
 * - Organizing components by category
 * - Providing default props for component instances
 *
 * NOTE: This is for VISUAL/PRESENTATIONAL purposes only.
 * Business logic and validation will be added in future phases.
 */

/**
 * Component categories for palette organization
 */
export type ComponentCategory = 'text-inputs' | 'selection-controls' | 'buttons'

/**
 * TextField variants (all use TextFieldControl component with different type prop)
 */
export type TextFieldVariant = 'text' | 'number' | 'email' | 'phone' | 'alphanumeric' | 'date'

/**
 * Component types available in the palette
 */
export type ComponentType =
  | 'text-field'
  | 'number-field'
  | 'email-field'
  | 'phone-field'
  | 'alphanumeric-field'
  | 'date-field'
  | 'radio-button'
  | 'checkbox'
  | 'button'

/**
 * Base props that all components support
 */
export interface BaseComponentProps {
  label?: string
  disabled?: boolean
  required?: boolean
}

/**
 * Props specific to TextField components
 */
export interface TextFieldProps extends BaseComponentProps {
  type: TextFieldVariant
  placeholder?: string
  value?: string
}

/**
 * Props specific to RadioButton component
 */
export interface RadioButtonProps extends BaseComponentProps {
  options?: Array<{ label: string; value: string }>
  value?: string
}

/**
 * Props specific to CheckBox component
 */
export interface CheckBoxProps extends BaseComponentProps {
  checked?: boolean
}

/**
 * Props specific to Button component
 */
export interface ButtonProps {
  label?: string
  variant?: 'text' | 'outlined' | 'contained'
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  disabled?: boolean
}

/**
 * Union type for all component props
 */
export type ComponentProps = TextFieldProps | RadioButtonProps | CheckBoxProps | ButtonProps

/**
 * Metadata for a single component in the palette
 */
export interface ComponentMetadata {
  /**
   * Unique identifier for the component
   */
  id: ComponentType

  /**
   * Display name shown in the palette
   */
  name: string

  /**
   * Category for organizing in the palette
   */
  category: ComponentCategory

  /**
   * Brief description of the component (optional)
   */
  description?: string

  /**
   * Default props when component is added to canvas
   */
  defaultProps: ComponentProps

  /**
   * Component implementation path (for future reference)
   */
  componentPath: string
}

/**
 * Palette category metadata
 */
export interface CategoryMetadata {
  /**
   * Category identifier
   */
  id: ComponentCategory

  /**
   * Display name for the category
   */
  name: string

  /**
   * Whether category should be expanded by default
   */
  defaultExpanded?: boolean

  /**
   * Display order in palette
   */
  order: number
}
