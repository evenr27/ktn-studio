'use client'

import * as React from 'react'
import {
  IDEComponentPaletteRoot,
  IDEComponentPaletteHeader,
  IDEComponentPaletteBody,
  IDEComponentPaletteCategory,
  IDEComponentPaletteItem,
} from '@ktn/ui-molecules'
import {
  getComponentsGroupedByCategory,
  getCategories,
  type ComponentMetadata,
  type CategoryMetadata,
} from '@ktn/core-form'

type IDEComponentPaletteProps = {
  title?: string
  onComponentClick?: (componentId: string) => void
}

export const IDEComponentPalette: React.FC<IDEComponentPaletteProps> = ({
  title = 'Component Palette',
  onComponentClick,
}) => {
  // Get component data from registry
  const categories = getCategories()
  const componentsByCategory = getComponentsGroupedByCategory()

  // Handle component click
  const handleComponentClick = (componentId: string) => {
    onComponentClick?.(componentId)
  }

  return (
    <IDEComponentPaletteRoot>
      <IDEComponentPaletteHeader title={title} />
      <IDEComponentPaletteBody>
        {categories.map((category) => {
          const components = componentsByCategory[category.id]
          return (
            <IDEComponentPaletteCategory
              key={category.id}
              title={category.name}
              defaultExpanded={category.defaultExpanded}
            >
              {components.map((component) => (
                <IDEComponentPaletteItem
                  key={component.id}
                  componentId={component.id}
                  name={component.name}
                  onClick={handleComponentClick}
                />
              ))}
            </IDEComponentPaletteCategory>
          )
        })}
      </IDEComponentPaletteBody>
    </IDEComponentPaletteRoot>
  )
}
