import type { ComponentMeta } from './types'
import { categories } from './types'
import { generalLayoutNavComponents } from './cat-general-layout-nav'
import { dataEntryComponents } from './cat-data-entry'
import { displayFeedbackComponents } from './cat-display-feedback'

export type { ComponentDemo, ComponentMeta } from './types'
export { categories }

export const allComponents: ComponentMeta[] = [
  ...generalLayoutNavComponents,
  ...dataEntryComponents,
  ...displayFeedbackComponents,
]

export function getComponentBySlug(slug: string): ComponentMeta | undefined {
  return allComponents.find((c) => c.slug === slug)
}
