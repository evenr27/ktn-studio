'use client'

import * as React from 'react'
import { IDEHeader, IDEComponentPalette, IDELayout, IDEPropertiesPanel } from '@ktn/ui-cells'
import { IDEWorkArea } from '@ktn/ui-cells/ide/work-area/IDEWorkArea'

export const IDEShell: React.FC = () => {
  const leftPanelWidth = 260
  const rightPanelWidth = 340

  // Handle component click (placeholder for now)
  const handleComponentClick = (componentId: string) => {
    console.log('Component clicked:', componentId)
    // TODO: In IDE-004, this will trigger drag & drop
  }

  return (
    <IDELayout
      header={<IDEHeader title="KTN Studio" subtitle="Visual Form IDE" />}
      leftPanel={
        <IDEComponentPalette title="Component Palette" onComponentClick={handleComponentClick} />
      }
      center={<IDEWorkArea />}
      rightPanel={
        <IDEPropertiesPanel title="Properties" placeholder="Select a component to edit." />
      }
      leftPanelWidth={leftPanelWidth}
      rightPanelWidth={rightPanelWidth}
    />
  )
}
