'use client'

import * as React from 'react'
import {
  IDEPropertiesPanelRoot,
  IDEPropertiesPanelHeader,
  IDEPropertiesPanelBody,
} from '@ktn/ui-molecules'

export type IDEPropertiesPanelProps = {
  title?: string
  children?: React.ReactNode
  placeholder?: string
  className?: string
}

/**
 * IDEPropertiesPanel - Properties panel for IDE with header and scrollable body
 *
 * @example
 * ```tsx
 * <IDEPropertiesPanel
 *   title="Properties"
 *   placeholder="Select a component to edit."
 * >
 *   <div>Dynamic property forms go here</div>
 * </IDEPropertiesPanel>
 * ```
 */
export const IDEPropertiesPanel: React.FC<IDEPropertiesPanelProps> = ({
  title = 'Properties',
  children,
  placeholder = 'Select a component to edit.',
  className,
}) => {
  return (
    <IDEPropertiesPanelRoot className={className}>
      <IDEPropertiesPanelHeader title={title} />
      <IDEPropertiesPanelBody placeholder={placeholder}>{children}</IDEPropertiesPanelBody>
    </IDEPropertiesPanelRoot>
  )
}
