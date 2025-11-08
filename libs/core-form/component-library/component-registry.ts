/**
 * Component Registry
 *
 * Central registry of all available components in the component palette.
 * Each component is registered with its metadata including:
 * - ID, name, category
 * - Default props
 * - Component path for future loading
 *
 * Total components: 9
 * - Text Inputs: 6 (TextField, NumberField, EmailField, PhoneField, AlphaNumericField, DateField)
 * - Selection Controls: 2 (RadioButton, CheckBox)
 * - Buttons: 1 (Button)
 */

import type { ComponentMetadata, CategoryMetadata, ComponentCategory } from './component-metadata'

/**
 * Category definitions for the palette
 */
export const CATEGORIES: Record<ComponentCategory, CategoryMetadata> = {
  'text-inputs': {
    id: 'text-inputs',
    name: 'Text Inputs',
    defaultExpanded: true,
    order: 1,
  },
  'selection-controls': {
    id: 'selection-controls',
    name: 'Selection Controls',
    defaultExpanded: true,
    order: 2,
  },
  buttons: {
    id: 'buttons',
    name: 'Buttons',
    defaultExpanded: true,
    order: 3,
  },
}

/**
 * Component registry with metadata for all 9 components
 */
export const COMPONENT_REGISTRY: ComponentMetadata[] = [
  // ============================================================
  // TEXT INPUTS (6 components)
  // ============================================================
  {
    id: 'text-field',
    name: 'TextField',
    category: 'text-inputs',
    description: 'General text input field',
    defaultProps: {
      type: 'text',
      label: 'Text Field',
      placeholder: 'Enter text...',
      value: '',
      disabled: false,
      required: false,
    },
    componentPath: '@ktn/ui-controls-core/text-field-control',
  },
  {
    id: 'number-field',
    name: 'NumberField',
    category: 'text-inputs',
    description: 'Numeric input field',
    defaultProps: {
      type: 'number',
      label: 'Number Field',
      placeholder: 'Enter number...',
      value: '',
      disabled: false,
      required: false,
    },
    componentPath: '@ktn/ui-controls-core/text-field-control',
  },
  {
    id: 'email-field',
    name: 'EmailField',
    category: 'text-inputs',
    description: 'Email address input field',
    defaultProps: {
      type: 'email',
      label: 'Email Field',
      placeholder: 'Enter email...',
      value: '',
      disabled: false,
      required: false,
    },
    componentPath: '@ktn/ui-controls-core/text-field-control',
  },
  {
    id: 'phone-field',
    name: 'PhoneField',
    category: 'text-inputs',
    description: 'Phone number input field',
    defaultProps: {
      type: 'phone',
      label: 'Phone Field',
      placeholder: 'Enter phone...',
      value: '',
      disabled: false,
      required: false,
    },
    componentPath: '@ktn/ui-controls-core/text-field-control',
  },
  {
    id: 'alphanumeric-field',
    name: 'AlphaNumericField',
    category: 'text-inputs',
    description: 'Alphanumeric input field (letters and numbers only)',
    defaultProps: {
      type: 'alphanumeric',
      label: 'AlphaNumeric Field',
      placeholder: 'Enter alphanumeric...',
      value: '',
      disabled: false,
      required: false,
    },
    componentPath: '@ktn/ui-controls-core/text-field-control',
  },
  {
    id: 'date-field',
    name: 'DateField',
    category: 'text-inputs',
    description: 'Date input field',
    defaultProps: {
      type: 'date',
      label: 'Date Field',
      placeholder: 'Enter date...',
      value: '',
      disabled: false,
      required: false,
    },
    componentPath: '@ktn/ui-controls-core/text-field-control',
  },

  // ============================================================
  // SELECTION CONTROLS (2 components)
  // ============================================================
  {
    id: 'radio-button',
    name: 'RadioButton',
    category: 'selection-controls',
    description: 'Radio button group for single selection',
    defaultProps: {
      label: 'Radio Button',
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
      ],
      value: '',
      disabled: false,
      required: false,
    },
    componentPath: '@ktn/ui-controls-core/radio-button-control',
  },
  {
    id: 'checkbox',
    name: 'CheckBox',
    category: 'selection-controls',
    description: 'Checkbox for boolean selection',
    defaultProps: {
      label: 'CheckBox',
      checked: false,
      disabled: false,
      required: false,
    },
    componentPath: '@ktn/ui-controls-core/checkbox-control',
  },

  // ============================================================
  // BUTTONS (1 component)
  // ============================================================
  {
    id: 'button',
    name: 'Button',
    category: 'buttons',
    description: 'Standard button component',
    defaultProps: {
      label: 'Button',
      variant: 'contained',
      color: 'primary',
      disabled: false,
    },
    componentPath: '@ktn/ui-controls-core/button-control',
  },
]

/**
 * Get all components by category
 */
export function getComponentsByCategory(category: ComponentCategory): ComponentMetadata[] {
  return COMPONENT_REGISTRY.filter((component) => component.category === category)
}

/**
 * Get component metadata by ID
 */
export function getComponentById(id: string): ComponentMetadata | undefined {
  return COMPONENT_REGISTRY.find((component) => component.id === id)
}

/**
 * Get all categories sorted by order
 */
export function getCategories(): CategoryMetadata[] {
  return Object.values(CATEGORIES).sort((a, b) => a.order - b.order)
}

/**
 * Get components grouped by category
 */
export function getComponentsGroupedByCategory(): Record<ComponentCategory, ComponentMetadata[]> {
  return {
    'text-inputs': getComponentsByCategory('text-inputs'),
    'selection-controls': getComponentsByCategory('selection-controls'),
    buttons: getComponentsByCategory('buttons'),
  }
}
