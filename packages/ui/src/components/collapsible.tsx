import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'

const CollapsibleRoot = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

type CollapsibleProps = typeof CollapsibleRoot & {
  Trigger: typeof CollapsibleTrigger
  Content: typeof CollapsibleContent
}

const Collapsible = Object.assign(CollapsibleRoot, {
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
}) satisfies CollapsibleProps

export default Collapsible
