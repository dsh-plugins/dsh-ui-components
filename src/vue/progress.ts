import { defineComponent, h } from 'vue'

const progressProps = {
  value: Number,
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  label: String,
  showValue: Boolean,
}

/** 把测量值归一化为可绘制的比例，限制越界输入。 */
export function progressRatio(value: number | undefined, min: number, max: number): number {
  if (!Number.isFinite(min) || !Number.isFinite(max) || max <= min) {
    throw new RangeError('进度最大值必须大于最小值且均为有限数值')
  }
  if (value === undefined) {
    return 0
  }
  if (!Number.isFinite(value)) {
    throw new RangeError('进度值必须是有限数值')
  }
  return Math.min(1, Math.max(0, (value - min) / (max - min)))
}

/** 线性进度，省略 value 时呈现不确定进度。 */
export const ProgressBar = defineComponent({
  name: 'DshProgressBar', props: progressProps,
  setup(props, { attrs }) {
    return () => {
      const ratio = progressRatio(props.value, props.min, props.max)
      return h('div', { ...attrs, class: ['dsh-progress', attrs.class], role: 'progressbar',
        'aria-label': props.label ?? attrs['aria-label'], 'aria-valuemin': props.min, 'aria-valuemax': props.max,
        'aria-valuenow': props.value === undefined ? undefined : props.min + ratio * (props.max - props.min),
        'data-indeterminate': props.value === undefined || undefined,
      }, [props.label ? h('span', props.label) : null, h('div', { class: 'dsh-progress__track' }, [
        h('div', { class: 'dsh-progress__fill', style: { width: `${ratio * 100}%` } }),
      ]), props.showValue && props.value !== undefined ? h('span', `${Math.round(ratio * 100)}%`) : null])
    }
  },
})

/** 圆形进度采用 SVG 圆环，保持与线性进度相同的值域和无障碍语义。 */
export const ProgressCircle = defineComponent({
  name: 'DshProgressCircle', props: progressProps,
  setup(props, { attrs }) {
    return () => {
      const ratio = progressRatio(props.value, props.min, props.max)
      return h('div', { ...attrs, class: ['dsh-progress-circle', attrs.class], role: 'progressbar',
        'aria-label': props.label ?? attrs['aria-label'], 'aria-valuemin': props.min, 'aria-valuemax': props.max,
        'aria-valuenow': props.value === undefined ? undefined : props.min + ratio * (props.max - props.min),
        'data-indeterminate': props.value === undefined || undefined,
      }, [h('svg', { viewBox: '0 0 40 40', 'aria-hidden': 'true' }, [
        h('circle', { cx: 20, cy: 20, r: 17, class: 'dsh-progress-circle__track' }),
        h('circle', { cx: 20, cy: 20, r: 17, pathLength: 100, class: 'dsh-progress-circle__fill',
          'stroke-dasharray': `${props.value === undefined ? 25 : ratio * 100} 100` }),
      ]), props.showValue && props.value !== undefined ? h('span', `${Math.round(ratio * 100)}%`) : null])
    }
  },
})

/** 测量表使用原生 meter 语义，与任务进度区分。 */
export const Meter = defineComponent({
  name: 'DshMeter', props: { ...progressProps, value: { type: Number, required: true } },
  setup(props, { attrs }) {
    return () => {
      const ratio = progressRatio(props.value, props.min, props.max)
      return h('div', { ...attrs, role: 'meter', class: ['dsh-meter', attrs.class],
        'aria-label': props.label ?? attrs['aria-label'], 'aria-valuemin': props.min, 'aria-valuemax': props.max,
        'aria-valuenow': props.min + ratio * (props.max - props.min),
      }, [props.label ? h('span', props.label) : null, h('div', { class: 'dsh-progress__track' }, [
        h('div', { class: 'dsh-progress__fill', style: { width: `${ratio * 100}%` } }),
      ]), props.showValue ? h('span', String(props.value)) : null])
    }
  },
})
