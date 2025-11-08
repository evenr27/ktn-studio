'use client'

import * as React from 'react'
import { IDEWorkAreaRoot, IDEWorkAreaBody } from '@ktn/ui-molecules'

export type IDEWorkAreaProps = {
  children?: React.ReactNode
  placeholder?: string
  className?: string
}

/**
 * IDEWorkArea - Properties panel for IDE with header and scrollable body
 *
 * @example
 * ```tsx
 * <IDEWorkArea
 *   placeholder="Canvas / Work Area"
 * >
 *   <div>Dynamic property forms go here</div>
 * </IDEWorkArea>
 * ```
 */
export const IDEWorkArea: React.FC<IDEWorkAreaProps> = ({
  children,
  placeholder = 'Canvas / Work Area',
  className,
}) => {
  return (
    <IDEWorkAreaRoot className={className}>
      <IDEWorkAreaBody placeholder={placeholder}>{children}</IDEWorkAreaBody>
    </IDEWorkAreaRoot>
  )
}
