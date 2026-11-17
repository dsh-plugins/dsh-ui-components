<script setup lang="ts">
import { reactive, ref } from 'vue'
import * as UI from '../../src/index'
import FeedbackDemo from './FeedbackDemo.vue'

const theme = ref<'light' | 'dark'>('light')
const radius = ref<'none' | 'sm' | 'md' | 'lg' | 'full'>('md')
const reducedMotion = ref(false)
const modal = ref(false)
const drawer = ref(false)
const alertDialog = ref(false)
const enabled = ref(true)
const code = ref('')
const completedCode = ref('')
const selected = ref('balanced')
const layout = ref('grid')
const tags = ref([{ value: 'vue', label: 'Vue 3' }, { value: 'arco', label: 'Arco Design' }, { value: 'hero', label: 'HeroUI 风格' }])
const slider = ref(64)
const form = reactive({ name: '设计工作区', email: '', description: '', mode: 'balanced', count: 3 })
const options = [
  { value: 'fast', label: '快速', description: '轻量任务，优先响应速度' },
  { value: 'balanced', label: '均衡', description: '日常工作，兼顾速度与质量' },
  { value: 'quality', label: '深入', description: '复杂任务，充分分析后作答' },
  { value: 'offline', label: '离线', description: '当前不可用', disabled: true },
]
const treeData = [{ key: 'workspace', title: '工作区', children: [{ key: 'src', title: 'src', children: [{ key: 'app', title: 'App.vue' }, { key: 'theme', title: 'theme.css' }] }, { key: 'docs', title: 'docs' }] }]
const transferData = ['界面设计', '代码审查', '文档维护', '自动化任务'].map((label, index) => ({ value: String(index), label, disabled: false }))
const transferValue = ref(['0'])
const columns = [{ title: '组件', dataIndex: 'name' }, { title: '分类', dataIndex: 'category' }, { title: '状态', dataIndex: 'status' }]
const rows = [
  { key: '1', name: 'Button', category: '基础操作', status: '已启用' },
  { key: '2', name: 'InputOTP', category: '表单输入', status: '已启用' },
  { key: '3', name: 'TreeSelect', category: '数据选择', status: '已启用' },
]
const links = [['actions', '操作'], ['fields', '输入'], ['selection', '选择'], ['display', '展示'], ['navigation', '导航'], ['data', '数据'], ['overlays', '浮层'], ['feedback', '反馈']]
const buttonVariants = ['primary', 'secondary', 'tertiary', 'outline', 'ghost', 'danger', 'danger-soft'] as const
</script>

<template>
  <UI.DshProvider :theme="theme" :radius="radius" :reduced-motion="reducedMotion" class="preview-app">
    <div class="preview-frame">
      <header class="preview-top">
        <div class="preview-brand"><span class="preview-brand-mark">d</span><span>DSH / 组件实验室</span><UI.Tag>Vue</UI.Tag></div>
        <div class="preview-controls">
          <UI.Select v-model="radius" aria-label="圆角" :style="{ width: '118px' }" :options="[{ label: '无圆角', value: 'none' }, { label: '小圆角', value: 'sm' }, { label: '标准圆角', value: 'md' }, { label: '大圆角', value: 'lg' }, { label: '胶囊圆角', value: 'full' }]" />
          <UI.Checkbox v-model="reducedMotion">减少动画</UI.Checkbox>
          <UI.Button variant="outline" @click="theme = theme === 'light' ? 'dark' : 'light'">{{ theme === 'light' ? '切换深色' : '切换浅色' }}</UI.Button>
        </div>
      </header>

      <section class="preview-hero">
        <div>
          <div class="preview-eyebrow">DSH UI Components · Vue</div>
          <h1>让每一次交互，<br>都有清晰的回应。</h1>
          <p class="preview-lead">柔和的层次、明确的状态与流畅的操作。以 HeroUI 的视觉语言，构建覆盖 Arco Design 全部组件的 Vue 界面。</p>
          <div class="preview-row"><UI.Button @click="modal = true">体验工作区</UI.Button><UI.Button variant="secondary" @click="drawer = true">查看活动</UI.Button><UI.Kbd>⌘ K</UI.Kbd></div>
        </div>
        <UI.Card>
          <div class="preview-project-head"><div><div class="preview-project-title">设计工作区</div><div class="preview-note">最后更新 · 刚刚</div></div><UI.Avatar :size="40">DS</UI.Avatar></div>
          <UI.Tag color="green">运行正常</UI.Tag>
          <div class="preview-project-stats"><div class="preview-stat"><strong>24</strong><span>可用插件</span></div><div class="preview-stat"><strong>98%</strong><span>任务完成率</span></div></div>
          <div class="preview-project-head"><span>今日进度</span><span class="preview-note">8 / 10</span></div>
          <UI.Progress :percent="0.8" :show-text="false" />
          <div class="preview-form-actions"><UI.Button size="sm" @click="modal = true">继续工作</UI.Button><UI.Button size="sm" variant="ghost">工作区设置</UI.Button></div>
        </UI.Card>
      </section>

      <nav class="preview-nav" aria-label="组件分类"><a v-for="[id, title] in links" :key="id" :href="`#${id}`">{{ title }}</a></nav>

      <section id="actions" class="preview-section">
        <div class="preview-section-heading"><h2>操作与状态</h2><span>清晰的动作层级，让重要操作一眼可见。</span></div>
        <div class="preview-grid preview-grid-two">
          <UI.Card title="按钮层级"><div class="preview-row"><UI.Button v-for="variant in buttonVariants" :key="variant" :variant="variant">{{ variant }}</UI.Button></div></UI.Card>
          <UI.Card title="尺寸与反馈"><div class="preview-stack"><div class="preview-row"><UI.Button size="sm">紧凑</UI.Button><UI.Button>标准</UI.Button><UI.Button size="lg">宽松</UI.Button></div><div class="preview-row"><UI.Button loading>保存中</UI.Button><UI.Button disabled>不可用</UI.Button><UI.Button variant="outline" radius="full">胶囊按钮</UI.Button></div></div></UI.Card>
          <UI.Card title="切换与工具栏"><div class="preview-stack"><UI.ToggleButtonGroup v-model="layout" aria-label="视图" :options="[{ label: '网格', value: 'grid' }, { label: '列表', value: 'list' }, { label: '时间线', value: 'timeline' }]" /><UI.Toolbar aria-label="文本格式"><UI.ToggleButton>加粗</UI.ToggleButton><UI.ToggleButton>斜体</UI.ToggleButton><UI.Button variant="ghost" size="sm">插入链接</UI.Button></UI.Toolbar></div></UI.Card>
          <UI.Card title="组合与链接"><div class="preview-stack"><UI.ButtonGroup><UI.Button variant="outline">昨天</UI.Button><UI.Button variant="outline">今天</UI.Button><UI.Button variant="outline">明天</UI.Button></UI.ButtonGroup><div class="preview-row"><UI.Link href="#fields">查看输入组件 ↗</UI.Link><UI.Kbd>Ctrl</UI.Kbd><span>+</span><UI.Kbd>S</UI.Kbd></div></div></UI.Card>
        </div>
      </section>

      <section id="fields" class="preview-section">
        <div class="preview-section-heading"><h2>输入与表单</h2><span>从简单字段到完整表单，持续提供上下文和反馈。</span></div>
        <div class="preview-grid">
          <UI.Card title="工作区信息"><UI.Form :model="form" layout="vertical"><UI.FormItem field="name" label="工作区名称"><UI.Input v-model="form.name" placeholder="输入名称" allow-clear /></UI.FormItem><UI.FormItem field="mode" label="默认模式"><UI.Select v-model="form.mode" :options="options" /></UI.FormItem><UI.FormItem field="count" label="并行任务"><UI.InputNumber v-model="form.count" :min="1" :max="10" /></UI.FormItem></UI.Form></UI.Card>
          <UI.Card title="字段与辅助信息"><div class="preview-stack"><UI.TextField v-model="form.email" label="邮箱地址" placeholder="example@domain.com" description="用于接收工作区通知" /><UI.SearchField placeholder="搜索组件…" aria-label="搜索组件" /><UI.Input type="password" placeholder="访问密钥" aria-label="访问密钥" /><UI.Textarea v-model="form.description" placeholder="描述此工作区的用途" aria-label="工作区描述" :auto-size="{ minRows: 2, maxRows: 4 }" /></div></UI.Card>
          <UI.Card title="验证码与输入建议"><div class="preview-stack"><div><UI.Label>验证码</UI.Label><UI.InputOTP v-model="code" :length="6" aria-label="六位验证码" @complete="completedCode = $event" /><UI.Description>支持粘贴整段验证码与键盘编辑。</UI.Description><p v-if="completedCode" class="preview-complete">已输入：{{ completedCode }}</p></div><UI.AutoComplete :data="['Vue', 'Vite', 'Vitest']" placeholder="试试输入 V" aria-label="工具名称" /><UI.InputTag placeholder="输入标签后按 Enter" aria-label="标签" /><UI.Mention :data="['设计师', '开发者', '审查者']" placeholder="输入 @ 提及成员" aria-label="提及成员" /></div></UI.Card>
          <UI.Card title="日期与时间"><div class="preview-stack"><UI.DatePicker :style="{ width: '100%' }" /><UI.DateRangePicker :style="{ width: '100%' }" /><UI.TimePicker :style="{ width: '100%' }" /><UI.ColorPicker default-value="#2563eb" /></div></UI.Card>
          <UI.Card title="上传与评分"><div class="preview-stack"><UI.Upload :auto-upload="false" multiple /><UI.Rate :default-value="4" allow-half /></div></UI.Card>
          <UI.Card title="分组与校验"><UI.Fieldset><template #legend>通知偏好</template><div class="preview-stack"><UI.Checkbox>任务完成后通知我</UI.Checkbox><UI.Checkbox>每周发送工作摘要</UI.Checkbox><UI.FieldError>请至少选择一种通知渠道。</UI.FieldError></div></UI.Fieldset></UI.Card>
        </div>
      </section>

      <section id="selection" class="preview-section">
        <div class="preview-section-heading"><h2>选择与调节</h2><span>明确呈现选择、禁用与连续数值。</span></div>
        <div class="preview-grid">
          <UI.Card title="列表选择"><UI.ListBox v-model="selected" :options="options" aria-label="运行模式" /></UI.Card>
          <UI.Card title="基础选择"><div class="preview-stack"><UI.CheckboxGroup :default-value="['search']" :options="[{ label: '联网搜索', value: 'search' }, { label: '文件读写', value: 'files' }]" /><UI.RadioGroup default-value="auto"><UI.Radio value="auto">自动</UI.Radio><UI.Radio value="manual">手动</UI.Radio></UI.RadioGroup><div class="preview-row"><UI.Switch v-model="enabled" /><span>启用自动保存</span></div><UI.Slider v-model="slider" :style="{ width: '100%' }" /><UI.TagGroup v-model="tags" aria-label="技术标签" /></div></UI.Card>
          <UI.Card title="层级选择"><div class="preview-stack"><UI.TreeSelect :data="treeData" placeholder="选择工作区文件" /><UI.Cascader :options="[{ value: 'tools', label: '工具', children: [{ value: 'search', label: '搜索' }, { value: 'code', label: '代码' }] }]" placeholder="选择工具分类" /><UI.Tree :data="treeData" default-expand-all checkable /></div></UI.Card>
          <UI.Card title="穿梭选择" class="preview-span-two"><UI.Transfer v-model="transferValue" :data="transferData" :title="['可用任务', '已选择']" :style="{ width: '100%' }" /></UI.Card>
          <UI.Card title="滚动内容"><UI.ScrollShadow :style="{ height: '180px' }"><div v-for="n in 8" :key="n" class="preview-log">任务 {{ n }} · 工作区内容已同步</div></UI.ScrollShadow></UI.Card>
        </div>
      </section>

      <section id="display" class="preview-section">
        <div class="preview-section-heading"><h2>内容与层次</h2><span>表面、标识与排版遵循一致的视觉语言。</span></div>
        <div class="preview-grid">
          <UI.Card title="头像与标签"><div class="preview-stack"><div class="preview-row"><UI.Avatar :size="48">DS</UI.Avatar><UI.Avatar :size="36">林</UI.Avatar><UI.Badge :count="3"><UI.Avatar>U</UI.Avatar></UI.Badge></div><div class="preview-row"><UI.Tag color="blue">进行中</UI.Tag><UI.Tag color="green">成功</UI.Tag><UI.Tag color="orange">等待</UI.Tag><UI.Tag color="red" closable>失败</UI.Tag></div></div></UI.Card>
          <UI.Card title="语义表面"><div class="preview-stack"><UI.Surface>默认表面</UI.Surface><div class="preview-surface-grid"><UI.Surface variant="secondary">次级</UI.Surface><UI.Surface variant="tertiary">三级</UI.Surface><UI.Surface variant="transparent">透明</UI.Surface></div></div></UI.Card>
          <UI.Card title="文本与信息"><UI.TypographyTitle :heading="5">专注于有价值的工作</UI.TypographyTitle><UI.TypographyParagraph>每个控件共享颜色、圆角和焦点状态，主题切换同步覆盖弹出层。</UI.TypographyParagraph><UI.Divider /><UI.Descriptions :column="1" :data="[{ label: '框架', value: 'Vue 3' }, { label: '组件', value: 'Arco Design' }, { label: '视觉', value: 'HeroUI v3' }]" /></UI.Card>
        </div>
      </section>

      <section id="navigation" class="preview-section">
        <div class="preview-section-heading"><h2>导航与组织</h2><span>保持当前位置和操作路径清晰。</span></div>
        <div class="preview-grid preview-grid-two">
          <UI.Card title="标签与折叠"><UI.Tabs default-active-key="overview" type="capsule"><UI.TabPane key="overview" title="概览"><UI.Collapse :default-active-key="['one']"><UI.CollapseItem key="one" header="如何使用组件库？">在入口导入样式，然后用 DshProvider 包裹应用。</UI.CollapseItem><UI.CollapseItem key="two" header="支持哪些主题？">支持浅色、深色和跟随宿主主题。</UI.CollapseItem></UI.Collapse></UI.TabPane><UI.TabPane key="activity" title="活动">最近的工作区活动会显示在这里。</UI.TabPane></UI.Tabs></UI.Card>
          <UI.Card title="路径与进度"><div class="preview-stack"><UI.Breadcrumb><UI.BreadcrumbItem>工作区</UI.BreadcrumbItem><UI.BreadcrumbItem>项目</UI.BreadcrumbItem><UI.BreadcrumbItem>组件库</UI.BreadcrumbItem></UI.Breadcrumb><UI.Steps :current="2" size="small"><UI.Step>配置</UI.Step><UI.Step>预览</UI.Step><UI.Step>完成</UI.Step></UI.Steps><UI.Pagination :total="120" :default-page-size="20" simple /></div></UI.Card>
          <UI.Card title="菜单"><UI.Menu mode="horizontal" :default-selected-keys="['dashboard']"><UI.MenuItem key="dashboard">仪表盘</UI.MenuItem><UI.MenuItem key="projects">项目</UI.MenuItem><UI.SubMenu key="settings" title="设置"><UI.MenuItem key="account">账户</UI.MenuItem><UI.MenuItem key="workspace-settings">工作区</UI.MenuItem></UI.SubMenu></UI.Menu></UI.Card>
          <UI.Card title="下拉与触发"><div class="preview-row"><UI.Dropdown><UI.Button variant="outline">更多操作 ▾</UI.Button><template #content><UI.Doption>复制链接</UI.Doption><UI.Doption>导出配置</UI.Doption><UI.Doption disabled>归档项目</UI.Doption></template></UI.Dropdown><UI.Tooltip content="保存当前工作区设置"><UI.Button variant="secondary">悬停查看提示</UI.Button></UI.Tooltip><UI.Popover title="工作区说明"><UI.Button variant="ghost">查看说明</UI.Button><template #content>当前工作区已启用自动保存。</template></UI.Popover></div></UI.Card>
        </div>
      </section>

      <section id="data" class="preview-section">
        <div class="preview-section-heading"><h2>数据与布局</h2><span>保留 Arco 的完整数据能力，并统一表面和交互状态。</span></div>
        <div class="preview-grid preview-grid-two">
          <UI.Card title="表格"><UI.Table :columns="columns" :data="rows" :pagination="false" :bordered="false" /></UI.Card>
          <UI.Card title="统计与时间线"><div class="preview-row"><UI.Statistic title="本周完成" :value="128" :precision="0" /><UI.Statistic title="平均响应" :value="1.6" suffix="秒" /></div><UI.Timeline><UI.TimelineItem label="09:00">创建工作区</UI.TimelineItem><UI.TimelineItem label="09:30">加载组件</UI.TimelineItem><UI.TimelineItem label="10:00">完成主题配置</UI.TimelineItem></UI.Timeline></UI.Card>
          <UI.Card title="列表与结果"><UI.List :bordered="false"><UI.ListItem>设计规范已同步</UI.ListItem><UI.ListItem>组件状态已更新</UI.ListItem><UI.ListItem>预览页面已生成</UI.ListItem></UI.List></UI.Card>
          <UI.Card title="分割布局"><UI.Split :min="0.2" :max="0.8" :style="{ height: '160px', border: '1px solid var(--dsh-border)', borderRadius: '12px' }"><template #first><div style="padding: 20px">资源列表</div></template><template #second><div style="padding: 20px">拖动分隔条调整布局</div></template></UI.Split></UI.Card>
        </div>
      </section>

      <section id="overlays" class="preview-section">
        <div class="preview-section-heading"><h2>浮层与确认</h2><span>主题随内容进入浮层，长内容在内部滚动。</span></div>
        <UI.Card><div class="preview-row"><UI.Button @click="modal = true">打开对话框</UI.Button><UI.Button variant="secondary" @click="drawer = true">打开抽屉</UI.Button><UI.Button variant="danger-soft" @click="alertDialog = true">删除确认</UI.Button><UI.Popconfirm content="确定重置工作区设置吗？"><UI.Button variant="outline">轻量确认</UI.Button></UI.Popconfirm></div></UI.Card>
        <FeedbackDemo />
      </section>

      <section id="feedback" class="preview-section">
        <div class="preview-section-heading"><h2>反馈与加载</h2><span>及时表达进度、结果与下一步操作。</span></div>
        <div class="preview-grid">
          <UI.Card title="状态反馈"><div class="preview-stack"><UI.Alert type="success">所有更改已保存。</UI.Alert><UI.Alert type="warning">部分任务仍在运行。</UI.Alert><UI.Alert type="error">连接失败，请检查设置。</UI.Alert></div></UI.Card>
          <UI.Card title="进度与加载"><div class="preview-stack"><UI.Progress :percent="0.64" /><div class="preview-row"><UI.ProgressCircle :value="72" label="任务完成度" show-value /><UI.Spin /><span class="preview-note">正在加载工作区…</span></div><UI.ProgressBar :value="64" label="同步进度" /><UI.Meter :value="42" label="资源用量" /><UI.Skeleton :animation="true"><UI.SkeletonLine :rows="2" /></UI.Skeleton></div></UI.Card>
          <UI.Card title="空状态"><UI.Empty description="当前没有待处理任务" /><div class="preview-row" style="justify-content: center; margin-top: 20px"><UI.Button size="sm" variant="secondary" @click="modal = true">创建任务</UI.Button></div></UI.Card>
        </div>
      </section>
      <footer class="preview-footer"><span>@dsh-plugin/dsh-ui-components-vue</span><span>Arco Design 的能力 · HeroUI 的视觉语言</span></footer>
    </div>
    <UI.Modal v-model:visible="modal" title="工作区设置" @ok="modal = false">
      <UI.Form :model="form" layout="vertical"><UI.FormItem label="工作区名称"><UI.Input v-model="form.name" /></UI.FormItem><UI.FormItem label="运行模式"><UI.Select v-model="form.mode" :options="options" /></UI.FormItem></UI.Form>
      <UI.Alert>此对话框跟随页面主题、圆角和动画设置。</UI.Alert>
    </UI.Modal>
    <UI.Drawer v-model:visible="drawer" title="最近活动" :width="420" @ok="drawer = false"><div v-for="n in 18" :key="n" class="preview-log"><strong>任务 {{ n }} 已完成</strong><div class="preview-note">工作区配置与文档已同步。</div></div></UI.Drawer>
    <UI.AlertDialog v-model:visible="alertDialog" title="删除工作区？" @ok="alertDialog = false">删除后将清除工作区配置。请确认已保存需要保留的内容。</UI.AlertDialog>
  </UI.DshProvider>
</template>
