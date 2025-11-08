'use client'

import * as React from 'react'
import {
  IDELayoutRoot,
  IDELayoutHeader,
  IDELayoutBody,
  IDELayoutLeftPanel,
  IDELayoutCenter,
  IDELayoutRightPanel,
} from '@ktn/ui-molecules'

export type IDELayoutProps = {
  header?: React.ReactNode
  leftPanel?: React.ReactNode
  center?: React.ReactNode
  rightPanel?: React.ReactNode
  leftPanelWidth?: number
  rightPanelWidth?: number
}

/**
 * IDELayout - Complete IDE layout with header and three-column body
 *
 * @example
 * ```tsx
 * <IDELayout
 *   header={<IDEHeader title="..." subtitle="..." />}
 *   leftPanel={<ComponentPalette />}
 *   center={<Canvas />}
 *   rightPanel={<PropertiesPanel />}
 *   leftPanelWidth={260}
 *   rightPanelWidth={340}
 * />
 * ```
 */
export const IDELayout: React.FC<IDELayoutProps> = ({
  header,
  leftPanel,
  center,
  rightPanel,
  leftPanelWidth = 260,
  rightPanelWidth = 340,
}) => {
  return (
    <IDELayoutRoot>
      {header && <IDELayoutHeader>{header}</IDELayoutHeader>}

      <IDELayoutBody>
        {leftPanel && <IDELayoutLeftPanel width={leftPanelWidth}>{leftPanel}</IDELayoutLeftPanel>}

        {center && <IDELayoutCenter>{center}</IDELayoutCenter>}

        {rightPanel && (
          <IDELayoutRightPanel width={rightPanelWidth}>{rightPanel}</IDELayoutRightPanel>
        )}
      </IDELayoutBody>
    </IDELayoutRoot>
  )
}
