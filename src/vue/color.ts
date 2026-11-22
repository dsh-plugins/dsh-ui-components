import { defineComponent, h, shallowRef, type App, type ComponentPublicInstance } from 'vue'
import * as Arco from '@arco-design/web-vue'
import { ColorPicker as ScopedColor } from './popup.js'
import { colorVariables } from './color-model.js'

/** 原始颜色交互保留在 Arco，默认面板采用 HeroUI 色面、滑块与 Hex 输入布局。 */
export const ColorPicker = defineComponent({
  name: 'DshColorPicker', inheritAttrs: false,
  props: { showFormatControls: Boolean },
  setup(props, { attrs, slots, expose }) {
    const current = shallowRef(attrs.defaultValue ?? attrs['default-value'])
    const instance = shallowRef<ComponentPublicInstance>()
    expose(new Proxy({}, { get: (_, key) => (instance.value as unknown as Record<string | symbol, unknown> | undefined)?.[key], has: (_, key) => instance.value !== undefined && key in instance.value }))
    return () => {
      const { class: className, style, ...pickerAttrs } = attrs
      const value = attrs.modelValue ?? attrs['model-value'] ?? current.value
      const disabledAlpha = attrs.disabledAlpha ?? attrs['disabled-alpha']
      const variables = colorVariables(value, disabledAlpha !== undefined && disabledAlpha !== false)
      const trigger = (attrs.triggerProps ?? attrs['trigger-props'] ?? {}) as Record<string, unknown>
      const advanced = props.showFormatControls || attrs.format === 'rgb'
      const hideTrigger = attrs.hideTrigger ?? attrs['hide-trigger']
      const inline = hideTrigger !== undefined && hideTrigger !== false
      return h('span', {
        class: ['dsh-color-trigger', inline && 'dsh-color-panel', inline && advanced && 'dsh-color-panel--advanced', !inline && className],
        style: inline ? variables : [variables, style],
      }, [h(ScopedColor, {
        ...pickerAttrs, ref: instance,
        ...(inline ? { class: className, style } : {}),
        triggerProps: { ...trigger, contentClass: [trigger.contentClass, 'dsh-color-panel', { 'dsh-color-panel--advanced': advanced }], contentStyle: { ...variables, ...(trigger.contentStyle as object) } },
        'onUpdate:modelValue': (next: string) => {
          current.value = next
          const listener = attrs['onUpdate:modelValue']
          if (typeof listener === 'function') { listener(next) }
        },
      }, slots)])
    }
  },
}) as unknown as typeof Arco.ColorPicker & (new () =>
  Omit<InstanceType<typeof Arco.ColorPicker>, '$props'> & {
    $props: InstanceType<typeof Arco.ColorPicker>['$props'] & { showFormatControls?: boolean }
  })

Object.assign(ColorPicker, { install(app: App, options?: { componentPrefix?: string }) { app.component(`${options?.componentPrefix ?? 'A'}ColorPicker`, ColorPicker) } })
