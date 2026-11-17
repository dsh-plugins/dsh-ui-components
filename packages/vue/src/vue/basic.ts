import { defineComponent, h, inject, mergeProps, onBeforeUnmount, onMounted, onUpdated, shallowRef, useId, type App, type Component, type ComponentPublicInstance } from 'vue'
import { configProviderInjectionKey } from '@arco-design/web-vue/es/config-provider/context.js'
import { Alert as ArcoAlert, Progress as ArcoProgress, Spin as ArcoSpin, InputNumber as ArcoInputNumber, InputTag as ArcoInputTag, Tag as ArcoTag, Result as ArcoResult, Tree as ArcoTree, Table as ArcoTable } from '@arco-design/web-vue'

const progress = defineComponent({
  name: 'DshProgress',
  inheritAttrs: false,
  props: ArcoProgress.props,
  setup(props, { attrs, slots }) {
    const progressProps = props as InstanceType<typeof ArcoProgress>['$props']
    const config = inject(configProviderInjectionKey, undefined)
    const circle = () => progressProps.type === 'circle' && progressProps.showText === false && !slots.text && !progressProps.steps && progressProps.width === undefined && ((progressProps.size ?? config?.size) === undefined || (progressProps.size ?? config?.size) === 'medium')
    return () => h(ArcoProgress, {
      ...attrs,
      ...props,
      class: [attrs.class, { 'dsh-hero-progress-circle': circle(), 'dsh-hero-progress-circle-default-stroke': circle() && progressProps.strokeWidth === undefined }],
      width: circle() ? 36 : progressProps.width,
      strokeWidth: progressProps.strokeWidth ?? (progressProps.type === 'line' && !progressProps.steps ? 8 : undefined),
    }, slots)
  },
})

type InstallableComponent = Component & { install: typeof ArcoProgress.install }

function installComponent<C extends InstallableComponent>(wrapped: Component, original: C): C {
  return Object.assign(wrapped, {
    install(app: App, options?: Parameters<typeof ArcoProgress.install>[1]) {
      function component(name: string): Component | undefined
      function component(name: string, definition: Component): App
      function component(name: string, definition?: Component): Component | App | undefined {
        if (definition === undefined) {
          return app.component(name)
        }
        return app.component(name, definition === original ? wrapped : definition)
      }
      original.install({ ...app, component }, options)
    },
  }) as C
}

/** 保留 Arco 进度组件参数，线性进度采用 HeroUI 的默认轨道厚度。 */
export const Progress = installComponent(progress, ArcoProgress)

/** 表格滚动时临时显示滑块，保留 Arco 的参数、插槽和公开实例方法。 */
export const Table = installComponent(defineComponent({
  name: 'DshTable', inheritAttrs: false,
  setup(_, { attrs, slots, expose }) {
    const instance = shallowRef<ComponentPublicInstance>()
    const scrolling = shallowRef(false)
    let hideTimer: ReturnType<typeof setTimeout> | undefined
    expose(new Proxy({}, {
      get: (_, key) => (instance.value as unknown as Record<string | symbol, unknown> | undefined)?.[key],
      has: (_, key) => instance.value !== undefined && key in instance.value,
    }))
    onBeforeUnmount(() => clearTimeout(hideTimer))
    return () => h(ArcoTable, mergeProps(attrs, {
      ref: instance, class: 'dsh-scroll-table', 'data-scrolling': scrolling.value || undefined,
      onScrollCapture() {
        scrolling.value = true
        clearTimeout(hideTimer)
        hideTimer = setTimeout(() => { scrolling.value = false }, 900)
      },
    }), slots)
  },
}), ArcoTable)

/** 标签输入单独标记主题范围，避免修改选择器内部复用的 Arco 标签输入。 */
export const InputTag = installComponent(defineComponent({
  name: 'DshInputTag', inheritAttrs: false,
  setup(_, { attrs, slots, expose }) {
    const instance = shallowRef<ComponentPublicInstance>()
    expose(new Proxy({}, {
      get: (_, key) => (instance.value as unknown as Record<string | symbol, unknown> | undefined)?.[key],
      has: (_, key) => instance.value !== undefined && key in instance.value,
    }))
    return () => h(ArcoInputTag, { ...attrs, ref: instance, class: ['dsh-hero-input-tag', attrs.class] }, slots)
  },
}), ArcoInputTag)

export const alertIcons = {
  info: 'M8 13.5a5.5 5.5 0 1 0 0-11a5.5 5.5 0 0 0 0 11M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m1-9.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-.25 3a.75.75 0 0 0-1.5 0V11a.75.75 0 0 0 1.5 0z',
  success: 'M13.5 8a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0m-3.9-1.55a.75.75 0 1 0-1.2-.9L7.419 8.858L6.03 7.47a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.13-.08z',
  warning: 'M7.134 2.994L2.217 11.5a1 1 0 0 0 .866 1.5h9.834a1 1 0 0 0 .866-1.5L8.866 2.993a1 1 0 0 0-1.732 0m3.03-.75c-.962-1.665-3.366-1.665-4.329 0L.918 10.749c-.963 1.666.24 3.751 2.165 3.751h9.834c1.925 0 3.128-2.085 2.164-3.751zM8 5a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2A.75.75 0 0 1 8 5m1 5.75a1 1 0 1 1-2 0a1 1 0 0 1 2 0',
  error: 'M8 13.5a5.5 5.5 0 1 0 0-11a5.5 5.5 0 0 0 0 11M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m1-4.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0M8.75 5a.75.75 0 0 0-1.5 0v2.5a.75.75 0 0 0 1.5 0z',
}

/** 图标通过 Arco 的公开插槽适配，提示内容、关闭行为和自定义插槽仍由 Arco 处理。 */
export const Alert = installComponent(defineComponent({
  name: 'DshAlert',
  inheritAttrs: false,
  setup(_, { attrs, slots, expose }) {
    const instance = shallowRef<ComponentPublicInstance>()
    expose(new Proxy({}, {
      get: (_, key) => (instance.value as unknown as Record<string | symbol, unknown> | undefined)?.[key],
      has: (_, key) => instance.value !== undefined && key in instance.value,
    }))
    return () => {
      const type = attrs.type ?? 'info'
      const path = typeof type === 'string' && type in alertIcons ? alertIcons[type as keyof typeof alertIcons] : undefined
      return h(ArcoAlert, { ...attrs, ref: instance }, {
        ...slots,
        ...(path && !slots.icon ? { icon: () => h('svg', { 'aria-hidden': true, fill: 'none', height: 16, role: 'presentation', viewBox: '0 0 16 16', width: 16, xmlns: 'http://www.w3.org/2000/svg' }, [
          h('path', { 'clip-rule': 'evenodd', d: path, fill: 'currentColor', 'fill-rule': 'evenodd' }),
        ]) } : {}),
      })
    }
  },
}), ArcoAlert)

/** 状态结果复用 HeroUI 提示图标，保留 HTTP 状态插图与自定义插槽。 */
export const Result = installComponent(defineComponent({
  name: 'DshResult', inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      const status = attrs.status === undefined ? 'info' : attrs.status
      const path = typeof status === 'string' && status in alertIcons ? alertIcons[status as keyof typeof alertIcons] : undefined
      return h(ArcoResult, attrs, {
        ...slots,
        ...(path && !slots.icon ? { icon: () => h('svg', { class: 'dsh-result-icon', 'aria-hidden': true, fill: 'none', viewBox: '0 0 16 16' }, [h('path', { d: path, fill: 'currentColor', 'fill-rule': 'evenodd', 'clip-rule': 'evenodd' })]) } : {}),
      })
    }
  },
}), ArcoResult)

/** 默认加载图标采用 HeroUI 渐变圆环，显式图标、点阵和元素插槽保留 Arco 行为。 */
export const Spin = installComponent(defineComponent({
  name: 'DshSpin', inheritAttrs: false, props: ArcoSpin.props,
  setup(props, { attrs, slots }) {
    const id = useId()
    const config = inject(configProviderInjectionKey, undefined)
    const spinProps = props as InstanceType<typeof ArcoSpin>['$props']
    const icon = () => h('svg', { class: 'dsh-spinner-icon', viewBox: '0 0 24 24', 'aria-hidden': true, style: spinProps.size ? { width: `${spinProps.size}px`, height: `${spinProps.size}px` } : undefined }, [
      h('defs', {}, [
        h('linearGradient', { id: `${id}-1`, x1: '50%', x2: '50%', y1: '5.271%', y2: '91.793%' }, [h('stop', { offset: '0%', 'stop-color': 'currentColor' }), h('stop', { offset: '100%', 'stop-color': 'currentColor', 'stop-opacity': .55 })]),
        h('linearGradient', { id: `${id}-2`, x1: '50%', x2: '50%', y1: '15.24%', y2: '87.15%' }, [h('stop', { offset: '0%', 'stop-color': 'currentColor', 'stop-opacity': 0 }), h('stop', { offset: '100%', 'stop-color': 'currentColor', 'stop-opacity': .55 })]),
      ]),
      h('path', { d: 'M8.749.021a1.5 1.5 0 0 1 .497 2.958A7.5 7.5 0 0 0 3 10.375a7.5 7.5 0 0 0 7.5 7.5v3c-5.799 0-10.5-4.7-10.5-10.5C0 5.23 3.726.865 8.749.021', fill: `url(#${id}-1)`, transform: 'translate(1.5 1.625)' }),
      h('path', { d: 'M15.392 2.673a1.5 1.5 0 0 1 2.119-.115A10.48 10.48 0 0 1 21 10.375c0 5.8-4.701 10.5-10.5 10.5v-3a7.5 7.5 0 0 0 5.007-13.084a1.5 1.5 0 0 1-.115-2.118', fill: `url(#${id}-2)`, transform: 'translate(1.5 1.625)' }),
    ])
    return () => h(ArcoSpin, { ...props, ...attrs }, spinProps.dot || slots.icon || slots.element || config?.slots.loading ? slots : { ...slots, element: icon })
  },
}), ArcoSpin)

/** 按钮模式缺少图标插槽，通过组件自身 SVG 节点保留 Arco 数值与长按步进逻辑。 */
export const InputNumber = installComponent(defineComponent({
  name: 'DshInputNumber', inheritAttrs: false,
  setup(_, { attrs, slots, expose }) {
    const instance = shallowRef<ComponentPublicInstance>()
    expose(new Proxy({}, {
      get: (_, key) => (instance.value as unknown as Record<string | symbol, unknown> | undefined)?.[key],
      has: (_, key) => instance.value !== undefined && key in instance.value,
    }))
    const updateIcons = () => {
      const root = instance.value?.$el
      if (!(root instanceof HTMLElement) || !root.classList.contains('arco-input-number-mode-button')) { return }
      for (const icon of root.querySelectorAll<SVGSVGElement>('.arco-input-number-step-button :is(.arco-icon-minus,.arco-icon-plus)')) {
        const path = icon.querySelector('path')
        if (!path) { continue }
        icon.setAttribute('viewBox', '0 0 16 16')
        icon.setAttribute('stroke', 'none')
        path.setAttribute('fill', 'currentColor')
        path.setAttribute('fill-rule', 'evenodd')
        path.setAttribute('clip-rule', 'evenodd')
        path.setAttribute('d', icon.classList.contains('arco-icon-minus')
          ? 'M1.75 8a.75.75 0 0 1 .75-.75h11a.75.75 0 0 1 0 1.5h-11A.75.75 0 0 1 1.75 8'
          : 'M8 1.75a.75.75 0 0 1 .75.75v4.75h4.75a.75.75 0 0 1 0 1.5H8.75v4.75a.75.75 0 0 1-1.5 0V8.75H2.5a.75.75 0 0 1 0-1.5h4.75V2.5A.75.75 0 0 1 8 1.75')
      }
    }
    onMounted(updateIcons)
    onUpdated(updateIcons)
    return () => h(ArcoInputNumber, { ...attrs, ref: instance }, slots)
  },
}), ArcoInputNumber)

/** 默认删除图标采用 HeroUI 原始路径，自定义图标和关闭事件仍由 Arco 处理。 */
export const Tag = installComponent(defineComponent({
  name: 'DshTag', inheritAttrs: false,
  setup(_, { attrs, slots }) {
    const instance = shallowRef<ComponentPublicInstance>()
    const prepareClose = () => {
      const root = instance.value?.$el
      if (!(root instanceof HTMLElement)) { return }
      const close = root.querySelector<HTMLElement>('.arco-tag-close-btn')
      if (close && !close.hasAttribute('tabindex')) { close.tabIndex = 0 }
    }
    onMounted(prepareClose)
    onUpdated(prepareClose)
    return () => h(ArcoTag, mergeProps(attrs, { ref: instance, onKeydown: (event: KeyboardEvent) => {
      if (event.defaultPrevented || !['Enter', ' '].includes(event.key) || !(event.target instanceof HTMLElement) || !event.target.classList.contains('arco-tag-close-btn')) { return }
      event.preventDefault()
      event.target.click()
    } }), {
      ...slots,
      'close-icon': slots['close-icon'] ?? (() => h('svg', { class: 'dsh-tag-close-icon', viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': true }, [h('path', { d: 'M3.47 3.47a.75.75 0 0 1 1.06 0L8 6.94l3.47-3.47a.75.75 0 1 1 1.06 1.06L9.06 8l3.47 3.47a.75.75 0 1 1-1.06 1.06L8 9.06l-3.47 3.47a.75.75 0 0 1-1.06-1.06L6.94 8 3.47 4.53a.75.75 0 0 1 0-1.06Z', fill: 'currentColor', 'fill-rule': 'evenodd', 'clip-rule': 'evenodd' })])),
    })
  },
}), ArcoTag)

/** 通过额外节点插槽绘制半选 SVG，复用 Arco 的状态、节点插槽与实例方法。 */
export const Tree = installComponent(defineComponent({
  name: 'DshTree', inheritAttrs: false,
  setup(_, { attrs, slots, expose }) {
    const instance = shallowRef<ComponentPublicInstance>()
    expose(new Proxy({}, {
      get: (_, key) => (instance.value as unknown as Record<string | symbol, unknown> | undefined)?.[key],
      has: (_, key) => instance.value !== undefined && key in instance.value,
    }))
    return () => h(ArcoTree, { ...attrs, ref: instance }, { ...slots, extra: (node: unknown) => [
      ...(slots.extra?.(node) ?? []),
      h('svg', { class: 'dsh-tree-half-indicator', style: { display: 'none' }, 'aria-hidden': true, viewBox: '0 0 24 24', width: 12, height: 12, fill: 'none', stroke: 'currentColor', 'stroke-width': 3, 'stroke-linecap': 'round' }, [h('line', { x1: 21, x2: 3, y1: 12, y2: 12 })]),
    ] })
  },
}), ArcoTree)
