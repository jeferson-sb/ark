import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useComboboxContext } from './use-combobox-context'

export type ComboboxPositionerBaseProps = {}
export interface ComboboxPositionerProps extends HTMLArkProps<'div'>, ComboboxPositionerBaseProps {}

export const ComboboxPositioner = forwardRef<HTMLDivElement, ComboboxPositionerProps>(
  (props, ref) => {
    const combobox = useComboboxContext()
    const presence = usePresenceContext()
    const mergedProps = mergeProps(combobox.getPositionerProps(), props)

    if (presence.unmounted) {
      return null
    }

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ComboboxPositioner.displayName = 'ComboboxPositioner'
