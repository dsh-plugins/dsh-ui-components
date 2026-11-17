<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import enUS from '@arco-design/web-vue/es/locale/lang/en-us'
import * as UI from '../../src/index'
import statesText from '../comparison/states.json?raw'
import ComparisonFeedback from './ComparisonFeedback.vue'

const props = defineProps<{ panel: string; theme: 'light' | 'dark' }>()
const tooltipQuery = new URLSearchParams(location.search)
const tooltipPosition = (['top', 'bottom', 'left', 'right'].find(value => value === tooltipQuery.get('tooltip-position')) ?? 'top') as 'top' | 'bottom' | 'left' | 'right'
const tooltipColor = tooltipQuery.get('tooltip-color') ?? undefined
const interactive = tooltipQuery.has('interactive')
const confirmSave = () => new Promise<boolean>(resolve => { setTimeout(() => resolve(true), 300) })
const states: { id: string; label: string }[] = JSON.parse(statesText)
const entry = states.find(state => state.id === props.panel)
if (!entry) {
  throw new Error(`未知展开态：${props.panel}`)
}
const empty = props.panel.endsWith('empty')
const search = empty ? '不存在' : '均'
const transferData = [{value:'fast',label:'快速',disabled:false},{value:'offline',label:'离线',disabled:true},{value:'balanced',label:'均衡',disabled:false},...(tooltipQuery.has('transfer-long') ? Array.from({length:18},(_,index)=>({value:`mode-${index+1}`,label:`模式 ${index+1}`,disabled:false})) : [])]
const options = [{ value: 'fast', label: '快速' }, { value: 'balanced', label: '均衡' }, { value: 'deep', label: '深入' }, { value: 'offline', label: '离线', disabled: true }]
const searchedOptions = empty ? [] : options.filter(option => option.value === 'balanced')
const trigger = { popupVisible: true, position: 'bl' as const, hideEmpty: false }
let observer: MutationObserver | undefined

onMounted(() => {
  if (props.panel.startsWith('scroll-shadow-')) {
    const viewport = document.querySelector<HTMLElement>('.dsh-scroll-shadow .arco-scrollbar-container')
    if (viewport) { viewport.scrollTop = props.panel.endsWith('end') ? viewport.scrollHeight : props.panel.endsWith('middle') ? 120 : 0 }
  }
  if (props.panel !== 'date-year' && props.panel !== 'calendar-year' && props.panel !== 'date-range-preview') {
    return
  }
  const setupState = () => {
    if (props.panel === 'date-year' || props.panel === 'calendar-year') {
      const year = Array.from(document.querySelectorAll<HTMLElement>('.arco-picker-header-label')).find(node => node.textContent?.includes('2026'))
      if (!year) { return false }
      year.click()
    } else {
      const cells = Array.from(document.querySelectorAll<HTMLElement>('.arco-picker-cell'))
      const start = cells.find(node => node.textContent?.trim() === '12')
      const end = cells.find(node => node.textContent?.trim() === '16')
      if (!start || !end) { return false }
      start.click()
      requestAnimationFrame(() => end.dispatchEvent(new MouseEvent('mouseenter', { bubbles: false })))
    }
    return true
  }
  if (!setupState()) {
    observer = new MutationObserver(() => { if (setupState()) { observer?.disconnect() } })
    observer.observe(document.body, { childList: true, subtree: true })
  }
})
onUnmounted(() => observer?.disconnect())
</script>

<template>
  <UI.DshProvider :theme="theme" :rtl="panel.endsWith('rtl')" :locale="enUS" :reduced-motion="true">
    <main id="comparison" class="comparison" :data-theme="theme" :data-panel="panel">
      <h1 class="comparison-heading">展开组件像素对照</h1><p class="comparison-note">{{ entry.label }} · 相同内容与画布</p>
      <div id="comparison-anchor" :style="{ position: 'absolute', left: '480px', top: '240px', width: '280px' }">
        <ComparisonFeedback v-if="panel.startsWith('message') || panel.startsWith('notification')" :notification="panel.startsWith('notification')" :panel="panel" />
        <UI.Transfer v-else-if="panel.startsWith('transfer')" :data="transferData" :default-value="['balanced']" :default-selected="panel === 'transfer-selected' ? ['fast'] : panel === 'transfer-target-selected' ? ['balanced'] : []" :title="['可用模式','已启用']" :disabled="panel === 'transfer-disabled'" />
        <UI.Tree v-else-if="panel.startsWith('tree')" :data="[{key:'workspace',title:'工作区',children:[{key:'theme',title:'主题设置'},{key:'notification',title:'通知设置'}]},{key:'model',title:'模型设置',disabled:panel === 'tree-disabled'}]" :default-expanded-keys="panel === 'tree' || panel === 'tree-expand-click' ? [] : ['workspace']" :default-selected-keys="panel === 'tree-selected' ? ['theme'] : []" :checkable="panel.startsWith('tree-checkable') || panel === 'tree-checked' || panel === 'tree-check-click'" :default-checked-keys="panel.startsWith('tree-checkable') ? ['theme'] : panel === 'tree-checked' ? ['workspace'] : []" :animation="false" block-node />
        <UI.Rate v-else-if="panel.startsWith('rate')" :default-value="panel === 'rate-empty' ? 0 : panel.startsWith('rate-half') ? 2.5 : 3" :allow-half="panel.startsWith('rate-half')" :disabled="panel === 'rate-disabled'" :readonly="panel === 'rate-readonly'"><template v-if="panel === 'rate-custom'" #character><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21 2 11 12 1l10 10Z"/></svg></template></UI.Rate>
        <UI.Steps v-else-if="panel.startsWith('steps')" :style="{width:'520px'}" :current="2" :direction="panel.startsWith('steps-vertical') ? 'vertical' : 'horizontal'" :label-placement="panel === 'steps-label-vertical' ? 'vertical' : 'horizontal'" :small="panel === 'steps-small'" :status="panel === 'steps-error' ? 'error' : 'process'" :line-less="panel === 'steps-lineless'">
          <UI.Step v-for="(title,index) in ['创建','配置','完成']" :key="title" :title="title" :description="['工作区','主题设置','保存配置'][index]" :disabled="panel === 'steps-disabled' && index === 2"><template v-if="panel === 'steps-custom' && index === 1" #icon><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"/><path d="M12 8v8m-4-4h8"/></svg></template></UI.Step>
        </UI.Steps>
        <UI.Anchor v-else-if="panel.startsWith('anchor')" :affix="false" :change-hash="false" :smooth="false" :line-less="panel === 'anchor-lineless'"><UI.AnchorLink href="#anchor-workspace" title="工作区"><template v-if="panel === 'anchor-custom'" #default><span :style="{display:'inline-flex',alignItems:'center',gap:'8px'}"><svg width="32" height="64" viewBox="0 0 32 64" fill="none" stroke="currentColor"><rect x="1" y="1" width="30" height="62" rx="8"/></svg>工作区</span></template><template v-if="panel === 'anchor-nested'" #sublist><UI.AnchorLink href="#anchor-theme" title="主题设置" /></template></UI.AnchorLink><UI.AnchorLink href="#anchor-notification" title="通知设置"/><UI.AnchorLink href="#anchor-model" title="模型设置"/></UI.Anchor>
        <UI.Timeline v-else-if="panel.startsWith('timeline')" :direction="panel.includes('horizontal') ? 'horizontal' : 'vertical'" :mode="panel.includes('alternate') ? 'alternate' : panel === 'timeline-right' ? 'right' : panel === 'timeline-horizontal-bottom' ? 'bottom' : 'left'" :label-position="panel.includes('relative') ? 'relative' : 'same'" :reverse="panel === 'timeline-reverse'" :pending="panel === 'timeline-pending' ? '同步中' : false">
          <template v-if="panel === 'timeline-pending'" #dot><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v9l6 3"/><circle cx="12" cy="12" r="10"/></svg></template>
          <UI.TimelineItem v-for="(item,index) in ['创建工作区','更新主题','保存配置']" :key="item" :dot-type="panel === 'timeline-hollow' ? 'hollow' : 'solid'" :label="['10:30','10:32','10:35'][index]" :dot-color="panel === 'timeline-custom' ? 'var(--success)' : undefined" :line-color="panel === 'timeline-custom' ? 'var(--accent)' : undefined" :line-type="panel === 'timeline-pending' && index === 2 ? 'dashed' : panel === 'timeline-custom' ? index === 0 ? 'dashed' : 'dotted' : 'solid'">
            <template v-if="panel === 'timeline-custom' && index === 1" #dot><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 4 4L19 6"/></svg></template>{{ item }}
          </UI.TimelineItem>
        </UI.Timeline>
        <UI.Space v-else-if="panel === 'space'"><UI.Button>编辑</UI.Button><UI.Button>复制</UI.Button><UI.Button>保存</UI.Button></UI.Space>
        <UI.Row v-else-if="panel === 'grid'" :gutter="16"><UI.Col :span="12"><UI.Surface :style="{padding:'12px'}">工作区</UI.Surface></UI.Col><UI.Col :span="12"><UI.Surface :style="{padding:'12px'}">通知</UI.Surface></UI.Col></UI.Row>
        <UI.Layout v-else-if="panel === 'layout'"><UI.LayoutHeader :style="{padding:'12px'}">工作区</UI.LayoutHeader><UI.Layout :style="{minHeight:'80px'}"><UI.LayoutSider :width="80" :style="{padding:'12px'}">导航</UI.LayoutSider><UI.LayoutContent :style="{padding:'12px'}">配置与通知</UI.LayoutContent></UI.Layout><UI.LayoutFooter :style="{padding:'12px'}">已保存</UI.LayoutFooter></UI.Layout>
        <UI.List v-else-if="panel === 'list'" :data="['主题设置','通知设置','模型设置']"><template #header>工作区</template><template #item="{ item }"><UI.ListItem>{{ item }}</UI.ListItem></template></UI.List>
        <UI.InputTag v-else-if="panel.startsWith('input-tag')" :default-value="panel === 'input-tag-empty' ? [] : ['快速','均衡']" :error="panel === 'input-tag-error'" :disabled="panel === 'input-tag-disabled'" :readonly="panel === 'input-tag-readonly'" :placeholder="panel === 'input-tag-empty' ? '添加标签' : undefined" aria-label="添加标签"><template v-if="panel === 'input-tag-prefix'" #prefix>标签</template></UI.InputTag>
        <UI.PageHeader v-else-if="panel === 'page-header'" :show-back="false" title="工作区" subtitle="配置与通知"><template #extra><UI.Button size="sm">保存</UI.Button></template></UI.PageHeader>
        <UI.Result v-else-if="panel === 'result'" status="success" title="设置已保存" subtitle="工作区配置已更新"><template #extra><UI.Button>返回工作区</UI.Button></template></UI.Result>
        <UI.Statistic v-else-if="panel === 'statistic'" title="已完成任务" :value="1280.62" :precision="2" show-group-separator extra="较昨日增加 12%" />
        <UI.Descriptions v-else-if="panel === 'descriptions'" title="工作区信息" :column="1" :data="[{ label: '名称', value: '示例工作区' }, { label: '状态', value: '运行中' }]" />
        <UI.Comment v-else-if="panel === 'comment'" author="DSH 用户" datetime="2026-11-16" content="主题与通知选项已更新。"><template #avatar><UI.Avatar>DS</UI.Avatar></template><template #actions><UI.Link href="#reply">回复</UI.Link></template></UI.Comment>
        <UI.Calendar v-else-if="panel === 'calendar' || panel === 'calendar-year'" panel :default-value="new Date(2026, 10, 16)" />
        <UI.Progress v-else-if="panel === 'progress-circle'" type="circle" :percent=".62" :show-text="false" aria-label="进度" />
        <div v-else-if="panel === 'tag-removable' || panel === 'tag-group'" :style="{ display: 'flex', flexWrap: 'wrap', gap: '6px' }"><UI.Tag v-for="item in panel === 'tag-group' ? ['快速', '均衡', '深入'] : ['均衡']" :key="item" closable>{{ item }}</UI.Tag></div>
        <UI.Popconfirm v-else-if="panel === 'popconfirm'" :popup-visible="interactive ? undefined : true" :on-before-ok="interactive ? confirmSave : undefined" position="bl" content="保存工作区设置？" cancel-text="取消" ok-text="保存"><UI.Button>确认操作</UI.Button></UI.Popconfirm>
        <UI.Form v-else-if="panel === 'form' || panel === 'form-error'" layout="vertical" :model="{}"><UI.FormItem label="工作区名称" :validate-status="panel === 'form-error' ? 'error' : undefined" :help="panel === 'form-error' ? '请输入有效名称' : undefined" :extra="panel === 'form' ? '用于区分多个配置' : undefined"><UI.Input default-value="示例工作区" /></UI.FormItem></UI.Form>
        <UI.ScrollShadow v-else-if="panel.startsWith('scroll-shadow-')" :style="{width:'280px',height:'120px'}"><p v-for="n in 30" :key="n" :style="{margin:'0 0 12px'}">配置项 {{ n }}：主题与通知选项。</p></UI.ScrollShadow>
        <UI.InputNumber v-else-if="panel === 'input-number'" :default-value="16" mode="button" aria-label="数量" />
        <UI.Pagination v-else-if="panel === 'pagination'" :total="30" :default-current="1" :page-size="10" />
        <div v-else-if="panel === 'typography'"><UI.TypographyTitle :heading="3">工作区设置</UI.TypographyTitle><UI.TypographyParagraph>主题与通知选项</UI.TypographyParagraph></div>
        <UI.Empty v-else-if="panel === 'empty'" description="暂无数据" />
        <UI.VerificationCode v-else-if="panel === 'verification-code'" model-value="123456" :length="6" aria-label="验证码" />
        <UI.ButtonGroup v-else-if="panel === 'button-group'"><UI.Button>编辑</UI.Button><UI.Button>复制</UI.Button><UI.Button>保存</UI.Button></UI.ButtonGroup>
        <UI.Link v-else-if="panel === 'link'" href="#workspace">工作区设置</UI.Link>
        <UI.Divider v-else-if="panel === 'divider'" />
        <UI.Badge v-else-if="panel === 'badge'" :count="8"><UI.Button>通知</UI.Button></UI.Badge>
        <UI.Spin v-else-if="panel === 'spin'" />
        <UI.CheckboxGroup v-else-if="panel === 'checkbox-group'" :default-value="['cache']" direction="vertical" aria-label="选项"><UI.Checkbox value="cache">启用缓存</UI.Checkbox><UI.Checkbox value="notification">启用通知</UI.Checkbox></UI.CheckboxGroup>
        <UI.Select v-else-if="panel.startsWith('select-')" class="comparison-wide" :multiple="panel === 'select-multiple'" :model-value="panel === 'select-multiple' ? ['fast', 'balanced'] : 'balanced'" :options="options" :popup-visible="true" :trigger-props="trigger" aria-label="运行模式" />
        <UI.Select v-else-if="panel.startsWith('autocomplete-')" class="comparison-wide" model-value="balanced" :input-value="search" :options="searchedOptions" :filter-option="false" allow-search :popup-visible="true" :trigger-props="trigger" aria-label="运行模式"><template #empty>无结果</template></UI.Select>
        <UI.AutoComplete v-else-if="panel.startsWith('combobox-')" class="comparison-wide" :model-value="search" :data="empty ? [] : ['均衡']" :filter-option="false" :trigger-props="trigger" aria-label="输入建议"><template #empty>无结果</template></UI.AutoComplete>
        <UI.Dropdown v-else-if="panel.startsWith('dropdown-')" :popup-visible="true" position="bl">
          <UI.Button>操作</UI.Button><template #content><UI.Doption value="edit">编辑</UI.Doption><UI.Dsubmenu v-if="panel === 'dropdown-submenu'" value="more" :popup-visible="true" position="rt"><template #default>更多</template><template #content><UI.Doption value="copy">复制</UI.Doption><UI.Doption value="export">导出</UI.Doption></template></UI.Dsubmenu><UI.Doption v-else value="copy">复制</UI.Doption><UI.Doption value="delete" disabled>删除</UI.Doption></template>
        </UI.Dropdown>
        <UI.Tooltip v-else-if="panel.startsWith('tooltip')" :popup-visible="true" content="主题与通知选项" :position="tooltipPosition" :background-color="tooltipColor" :show-arrow="panel === 'tooltip-arrow'"><UI.Button>查看提示</UI.Button></UI.Tooltip>
        <UI.Popover v-else-if="panel.startsWith('popover')" :popup-visible="true" title="工作区设置" position="bl" :show-arrow="false"><UI.Button>查看详情</UI.Button><template #content><UI.ScrollShadow v-if="panel === 'popover-long'" :style="{ width: '248px', height: '240px' }"><p v-for="n in 30" :key="n" :style="{ margin: '0 0 12px' }">配置项 {{ n }}：主题与通知选项。</p></UI.ScrollShadow><p v-else>主题与通知选项</p><UI.Button size="sm">保存</UI.Button></template></UI.Popover>
        <UI.DatePicker v-else-if="panel === 'date-picker' || panel === 'date-year'" class="comparison-wide" model-value="2026-11-16" picker-value="2026-11-16" format="MM/DD/YYYY" value-format="YYYY-MM-DD" :popup-visible="true" :show-now-btn="false" :allow-clear="false" :trigger-props="trigger" />
        <UI.RangePicker v-else-if="panel.startsWith('date-range')" class="comparison-wide" :model-value="panel === 'date-range' ? ['2026-11-12', '2026-11-16'] : undefined" :picker-value="['2026-11-16', '2026-12-16']" format="MM/DD/YYYY" value-format="YYYY-MM-DD" :popup-visible="true" :allow-clear="false" :trigger-props="trigger" />
        <UI.ColorPicker v-else-if="panel === 'color-picker'" model-value="#2563EB" format="hex" :show-history="false" :show-preset="false" :trigger-props="trigger" />
        <UI.Menu v-else-if="panel === 'menu'" :selected-keys="['edit']"><UI.MenuItem key="edit">编辑</UI.MenuItem><UI.MenuItem key="copy">复制</UI.MenuItem><UI.MenuItem key="delete" disabled>删除</UI.MenuItem></UI.Menu>
        <UI.Modal v-else-if="panel.startsWith('modal')" :visible="true" title="工作区设置"><template #trigger><UI.Button>打开对话框</UI.Button></template><template v-if="panel === 'modal-long'"><p v-for="n in 30" :key="n" :style="{ margin: '0 0 12px' }">配置项 {{ n }}：主题与通知选项。</p></template><template v-else>主题与通知选项</template><template #footer><UI.Button variant="secondary">取消</UI.Button><UI.Button>保存</UI.Button></template></UI.Modal>
        <UI.Drawer v-else-if="panel.startsWith('drawer-')" :visible="true" title="工作区设置" :placement="panel === 'drawer-right' ? 'right' : 'bottom'"><template #trigger><UI.Button>打开抽屉</UI.Button></template><template v-if="panel === 'drawer-right'"><p v-for="n in 30" :key="n" :style="{ margin: '0 0 12px' }">配置项 {{ n }}：主题与通知选项。</p></template><template v-else>主题与通知选项</template><template #footer><UI.Button variant="secondary">取消</UI.Button><UI.Button>保存</UI.Button></template></UI.Drawer>
        <UI.Collapse v-else :active-key="panel === 'accordion-multiple' ? ['workspace', 'notification'] : ['workspace']"><UI.CollapseItem key="workspace" header="工作区设置">主题与通知选项</UI.CollapseItem><UI.CollapseItem key="notification" header="通知设置">任务完成后通知</UI.CollapseItem></UI.Collapse>
      </div>
    </main>
  </UI.DshProvider>
</template>
