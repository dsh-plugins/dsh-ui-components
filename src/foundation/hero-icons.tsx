import * as React from 'react'

/** HeroUI 3.2.7 的展开图标；保持官方路径以统一控件的像素几何。 */
export function HeroChevronDown(props: React.SVGProps<SVGSVGElement>): React.ReactElement {
  return <svg aria-hidden="true" fill="none" width={16} height={16} viewBox="0 0 16 16" {...props}>
    <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M2.97 5.47a.75.75 0 0 1 1.06 0L8 9.44l3.97-3.97a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 0-1.06" />
  </svg>
}

/** HeroUI 3.2.7 的层级分隔图标。 */
export function HeroChevronRight(props: React.SVGProps<SVGSVGElement>): React.ReactElement {
  return <svg aria-hidden="true" fill="none" width={16} height={16} viewBox="0 0 16 16" {...props}>
    <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M5.47 2.97a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06L9.44 8 5.47 4.03a.75.75 0 0 1 0-1.06Z" />
  </svg>
}
