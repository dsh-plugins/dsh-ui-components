import { Arco, ButtonGroup } from './arco.js'
import * as Basic from './basic/index.js'
import * as Data from './data/index.js'
import * as Display from './display/index.js'
import * as Foundation from './foundation/index.js'
import * as Navigation from './navigation/index.js'

/** 包装器沿用自己的 props，只附加对应上游组件公开的静态 API。 */
function withMembers<C extends object, S extends object, K extends keyof S>(component: C, source: S, ...keys: K[]): C & Pick<S, K> {
  for (const key of keys) {
    const descriptor = Object.getOwnPropertyDescriptor(source, key)
    if (descriptor) { Object.defineProperty(component, key, descriptor) }
  }
  return component as C & Pick<S, K>
}

export const Button: typeof Basic.Button & { Group: typeof ButtonGroup } = Object.assign(Basic.Button, { Group: ButtonGroup })
export const AutoComplete: typeof Basic.AutoComplete & Pick<typeof Arco.AutoComplete, 'Option' | 'OptGroup'> =
  withMembers(Basic.AutoComplete, Arco.AutoComplete, 'Option', 'OptGroup')
export const Checkbox: typeof Basic.Checkbox & Pick<typeof Arco.Checkbox, 'Group' | 'useCheckbox'> =
  withMembers(Basic.Checkbox, Arco.Checkbox, 'Group', 'useCheckbox')
export const Form: typeof Basic.Form & Pick<typeof Arco.Form, 'Provider' | 'Item' | 'List' | 'Control' | 'useForm' | 'useFormContext' | 'useWatch' | 'useFormState' | 'FormContext'> =
  withMembers(Basic.Form, Arco.Form, 'Provider', 'Item', 'List', 'Control', 'useForm', 'useFormContext', 'useWatch', 'useFormState', 'FormContext')
export const Input: typeof Basic.Input & Pick<typeof Arco.Input, 'Search' | 'TextArea' | 'Password' | 'Group'> =
  withMembers(Basic.Input, Arco.Input, 'Search', 'TextArea', 'Password', 'Group')
export const Radio: typeof Basic.Radio & Pick<typeof Arco.Radio, 'Group' | 'GroupContext'> =
  withMembers(Basic.Radio, Arco.Radio, 'Group', 'GroupContext')
export const Select: typeof Basic.Select & Pick<typeof Arco.Select, 'Option' | 'OptGroup'> =
  withMembers(Basic.Select, Arco.Select, 'Option', 'OptGroup')
export const Avatar: typeof Display.Avatar & Pick<typeof Arco.Avatar, 'Group'> =
  withMembers(Display.Avatar, Arco.Avatar, 'Group')
export const Card: typeof Display.Card & Pick<typeof Arco.Card, 'Meta' | 'Grid'> =
  withMembers(Display.Card, Arco.Card, 'Meta', 'Grid')
export const Collapse: typeof Display.Collapse & Pick<typeof Arco.Collapse, 'Item'> =
  withMembers(Display.Collapse, Arco.Collapse, 'Item')
export const Typography: typeof Display.Typography & Pick<typeof Arco.Typography, 'Title' | 'Text' | 'Paragraph' | 'Ellipsis'> =
  withMembers(Display.Typography, Arco.Typography, 'Title', 'Text', 'Paragraph', 'Ellipsis')
export const Statistic: typeof Data.Statistic & Pick<typeof Arco.Statistic, 'Countdown'> =
  withMembers(Data.Statistic, Arco.Statistic, 'Countdown')
export const Tree: typeof Data.Tree & Pick<typeof Arco.Tree, 'Node' | 'SHOW_PARENT' | 'SHOW_ALL' | 'SHOW_CHILD'> =
  withMembers(Data.Tree, Arco.Tree, 'Node', 'SHOW_PARENT', 'SHOW_ALL', 'SHOW_CHILD')
export const TreeSelect: typeof Data.TreeSelect & Pick<typeof Arco.TreeSelect, 'Node' | 'SHOW_ALL' | 'SHOW_PARENT' | 'SHOW_CHILD'> =
  withMembers(Data.TreeSelect, Arco.TreeSelect, 'Node', 'SHOW_ALL', 'SHOW_PARENT', 'SHOW_CHILD')
export const Breadcrumb: typeof Navigation.Breadcrumb & Pick<typeof Arco.Breadcrumb, 'Item'> =
  withMembers(Navigation.Breadcrumb, Arco.Breadcrumb, 'Item')
export const Dropdown: typeof Navigation.Dropdown & Pick<typeof Arco.Dropdown, 'Button'> =
  withMembers(Navigation.Dropdown, Arco.Dropdown, 'Button')
export const Menu: typeof Navigation.Menu & Pick<typeof Arco.Menu, 'Item' | 'SubMenu' | 'ItemGroup'> =
  withMembers(Navigation.Menu, Arco.Menu, 'Item', 'SubMenu', 'ItemGroup')
export const Icon: typeof Foundation.Icon & Pick<typeof Arco.Icon, 'addFromIconFontCn'> =
  withMembers(Foundation.Icon, Arco.Icon, 'addFromIconFontCn')

export const Modal: typeof Arco.Modal = Arco.Modal
