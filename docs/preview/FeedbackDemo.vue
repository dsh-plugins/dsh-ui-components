<script setup lang="ts">
import { h } from 'vue'
import { Button, Card, useDialog, useFeedback, useToast } from '../../src/index'

const { message, notification } = useFeedback()
const { modal } = useDialog()
const toast = useToast()
const positions = ['top', 'topLeft', 'topRight', 'bottom', 'bottomLeft', 'bottomRight'] as const

function showConfirm() {
  modal.confirm({
    title: '确认批量更新',
    content: () => h('div', Array.from({ length: 18 }, (_, index) =>
      h('p', { key: index }, `配置项 ${index + 1}：更新工作区主题与组件设置，确认后应用这些更改。`))),
  })
}
</script>

<template>
  <Card title="命令式反馈">
    <div class="preview-row">
      <Button @click="message.success('消息已显示')">显示消息</Button>
      <Button variant="outline" @click="notification.info({ title: '通知', content: '独立主题通知', id: 'preview-notification' })">显示通知</Button>
      <Button variant="outline" @click="showConfirm">打开长确认</Button>
      <Button variant="outline" @click="positions.forEach(position => toast.show({ content: position, position, duration: 0, id: position }))">显示六个位置</Button>
      <Button variant="ghost" @click="toast.clear()">清除提示</Button>
    </div>
  </Card>
</template>
