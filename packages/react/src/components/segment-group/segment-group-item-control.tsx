import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context'

export type SegmentGroupItemControlBaseProps = {}
export interface SegmentGroupItemControlProps
  extends HTMLArkProps<'div'>,
    SegmentGroupItemControlBaseProps {}

export const SegmentGroupItemControl = forwardRef<HTMLDivElement, SegmentGroupItemControlProps>(
  (props, ref) => {
    const segmentGroup = useSegmentGroupContext()
    const itemProps = useSegmentGroupItemPropsContext()
    const mergedProps = mergeProps(
      segmentGroup.getItemControlProps(itemProps),
      segmentGroupAnatomy.build().itemControl.attrs as Record<string, string>,
      props,
    )

    return <ark.div {...mergedProps} ref={ref} />
  },
)

SegmentGroupItemControl.displayName = 'SegmentGroupItemControl'
