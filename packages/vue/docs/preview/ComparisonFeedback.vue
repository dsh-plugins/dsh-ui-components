<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { Button, useFeedback } from '../../src/index'
const props = defineProps<{ notification: boolean; panel: string }>()
const feedback = useFeedback()
let closers: (() => void)[] = []
function show() {
  closers.forEach(close => close())
  closers = []
  const type = props.panel.endsWith('info') ? 'info' : props.panel.endsWith('warning') ? 'warning' : props.panel.endsWith('error') ? 'error' : 'success'
  const count = props.panel.includes('stack') ? 3 : 1
  for (let index = 1; index <= count; index++) {
    const title = count > 1 ? `设置已保存 ${index}` : '设置已保存'
    closers.push((props.notification
      ? feedback.notification[type]({ title, content: count > 1 && index === 2 ? '工作区配置已更新，新的主题设置会应用到此工作区内全部页面。'.repeat(2) : '工作区配置已更新', position: 'bottomRight', duration: 0 })
      : feedback.message[props.panel.endsWith('normal') ? 'normal' : type]({ content: title, position: 'bottom', duration: 0 })).close)
  }
}
onMounted(show)
onUnmounted(() => closers.forEach(close => close()))
</script>
<template><Button @click="show">显示提示</Button></template>
