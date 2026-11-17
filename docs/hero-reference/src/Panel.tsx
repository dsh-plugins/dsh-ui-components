import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import {
  Accordion, Alert, Autocomplete, Badge, Button, ButtonGroup, Checkbox, CheckboxGroup, Label, Link, Separator, Spinner, NumberField, Pagination, Form, TextField, FieldError, Description, Heading, Paragraph, EmptyState, InputOTP, Calendar, ColorArea, ColorField, ColorPicker,
  ColorSlider, ColorSwatch, ComboBox, DateField, DatePicker, DateRangePicker, Drawer,
  I18nProvider, Input, InputGroup, ListBox, Menu, Modal, Popover, RangeCalendar,
  ScrollShadow, SearchField, Select, Tooltip, Dropdown, Tag, TagGroup, ProgressCircle, Avatar, Surface, Toast, parseColor, ToggleButton, ToggleButtonGroup,
} from '@heroui/react'
import { parseDate } from '@internationalized/date'
import states from '../../comparison/states.json'

const date = parseDate('2026-11-16')
const start = parseDate('2026-11-12')
const color = parseColor('#2563EB')
const options = [
  { id: 'fast', label: '快速' }, { id: 'balanced', label: '均衡' },
  { id: 'deep', label: '深入' }, { id: 'offline', label: '离线', disabled: true },
]

function Lines() {
  return <>{Array.from({ length: 30 }, (_, index) => <p key={index} style={{ margin: '0 0 12px' }}>配置项 {index + 1}：主题与通知选项。</p>)}</>
}

function Options({ empty = false, filtered = false }: { empty?: boolean; filtered?: boolean }) {
  const items = empty ? [] : filtered ? options.filter(option => option.id === 'balanced') : options
  return <ListBox aria-label="运行模式" renderEmptyState={() => '无结果'}>
    {items.map(option => <ListBox.Item key={option.id} id={option.id} textValue={option.label} isDisabled={option.disabled}>{option.label}<ListBox.ItemIndicator /></ListBox.Item>)}
  </ListBox>
}

function DateInput({ slot }: { slot?: 'start' | 'end' }) {
  return <DateField slot={slot}><DateField.Input>{segment => <DateField.Segment segment={segment} />}</DateField.Input></DateField>
}

function DateCalendar({ year = false }: { year?: boolean }) {
  return <Calendar aria-label="日期" defaultValue={date} defaultFocusedValue={date} isYearPickerOpen={year}>
    <Calendar.Header><Calendar.NavButton slot="previous" /><Calendar.YearPickerTrigger><Calendar.YearPickerTriggerHeading /><Calendar.YearPickerTriggerIndicator /></Calendar.YearPickerTrigger><Calendar.NavButton slot="next" /></Calendar.Header>
    <Calendar.Grid><Calendar.GridHeader>{day => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}</Calendar.GridHeader><Calendar.GridBody>{value => <Calendar.Cell date={value} />}</Calendar.GridBody></Calendar.Grid>
    {year && <Calendar.YearPickerGrid><Calendar.YearPickerGridBody>{({ year: value }) => <Calendar.YearPickerCell year={value} />}</Calendar.YearPickerGridBody></Calendar.YearPickerGrid>}
  </Calendar>
}

function RangeAnchor({ state }: { state: { setAnchorDate: (value: typeof date) => void; setFocusedDate: (value: typeof date) => void } }) {
  useEffect(() => { state.setAnchorDate(start); state.setFocusedDate(date) }, [])
  return null
}

function RangePanel({ preview }: { preview: boolean }) {
  return <RangeCalendar aria-label="日期范围" defaultFocusedValue={date} visibleDuration={{ months: 2 }} style={{ width: 528, maxWidth: 528 }}>
    {({ state }) => <>
      {preview && <RangeAnchor state={state} />}
      <RangeCalendar.Header><RangeCalendar.NavButton slot="previous" /><RangeCalendar.Heading /><RangeCalendar.NavButton slot="next" /></RangeCalendar.Header>
      <div style={{ display: 'flex', gap: 24 }}>
        {[0, 1].map(offset => <RangeCalendar.Grid key={offset} offset={{ months: offset }}><RangeCalendar.GridHeader>{day => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}</RangeCalendar.GridHeader><RangeCalendar.GridBody>{value => <RangeCalendar.Cell date={value} />}</RangeCalendar.GridBody></RangeCalendar.Grid>)}
      </div>
    </>}
  </RangeCalendar>
}

function ComboOpen({ state }: { state: { open: (strategy: null, trigger: 'manual') => void } }) {
  useEffect(() => { state.open(null, 'manual') }, [state])
  return null
}

function ScrollSample({ panel }: { panel: string }) {
  useEffect(() => {
    const viewport = document.querySelector<HTMLElement>('.scroll-shadow')
    if (viewport) { viewport.scrollTop = panel.endsWith('end') ? viewport.scrollHeight : panel.endsWith('middle') ? 120 : 0 }
  }, [panel])
  return <ScrollShadow hideScrollBar style={{ width: 280, height: 120 }}><Lines /></ScrollShadow>
}

function TagSample({ multiple }: { multiple: boolean }) {
  const [items, setItems] = useState(multiple ? ['快速', '均衡', '深入'] : ['均衡'])
  return <TagGroup aria-label="运行模式" onRemove={keys => setItems(current => current.filter(item => !keys.has(item)))}><TagGroup.List>{items.map(item => <Tag key={item} id={item} textValue={item}>{item}<Tag.RemoveButton /></Tag>)}</TagGroup.List></TagGroup>
}

function TagInputSample({ panel }: { panel: string }) {
  const disabled = panel === 'input-tag-disabled'
  const readonly = panel === 'input-tag-readonly'
  const prefixed = panel === 'input-tag-prefix'
  const [items, setItems] = useState(panel === 'input-tag-empty' ? [] : ['快速', '均衡'])
  const [input, setInput] = useState('')
  return <InputGroup isDisabled={disabled} isInvalid={panel === 'input-tag-error'} style={{ width: 280, padding: '6px 8px', gap: 6, flexWrap: 'wrap' }}>{prefixed && <span style={{ color: 'var(--field-placeholder)', marginRight: 6 }}>标签</span>}{items.length > 0 && <TagGroup aria-label="运行模式" onRemove={disabled || readonly ? undefined : keys => setItems(current => current.filter(item => !keys.has(item)))}><TagGroup.List>{items.map(item => <Tag key={item} id={item} textValue={item}>{item}{!disabled && !readonly && <Tag.RemoveButton />}</Tag>)}</TagGroup.List></TagGroup>}<InputGroup.Input aria-label="添加标签" disabled={disabled} readOnly={readonly} placeholder={panel === 'input-tag-empty' ? '添加标签' : undefined} value={input} onChange={event => setInput(event.target.value)} onKeyDown={event => {
    if (disabled || readonly || event.nativeEvent.isComposing) { return }
    if (event.key === 'Enter' && input.trim() && !items.includes(input.trim())) { setItems(current => [...current, input.trim()]); setInput('') }
    if (event.key === 'Backspace' && !input) { setItems(current => current.slice(0, -1)) }
  }} style={{ padding: 0, height: 24, minWidth: 12, width: 12 }} /></InputGroup>
}

function FeedbackSample({ notification, panel }: { notification: boolean; panel: string }) {
  const [queue] = useState(() => new Toast.Queue())
  const variant = panel.endsWith('info') ? 'accent' : panel.endsWith('error') ? 'danger' : panel.endsWith('warning') ? 'warning' : panel.endsWith('normal') ? 'default' : 'success'
  const show = () => {
    queue.clear()
    const count = panel.includes('stack') ? 3 : 1
    for (let index = 1; index <= count; index++) {
      queue.add({ title: count > 1 ? `设置已保存 ${index}` : '设置已保存', description: notification ? (count > 1 && index === 2 ? '工作区配置已更新，新的主题设置会应用到此工作区内全部页面。'.repeat(2) : '工作区配置已更新') : undefined, variant, indicator: panel.endsWith('normal') ? null : undefined }, { timeout: 0 })
    }
  }
  useEffect(() => { show(); return () => queue.clear() }, [queue])
  return <><Button onPress={show}>显示提示</Button><Toast.Provider queue={queue} placement={notification ? 'bottom end' : 'bottom'} /></>
}

function AnchorSample({ panel }: { panel: string }): ReactNode {
  const [active,setActive] = useState('')
  const items = [{ id:'workspace',title:'工作区',nested:false },...(panel === 'anchor-nested' ? [{ id:'theme',title:'主题设置',nested:true }] : []),{ id:'notification',title:'通知设置',nested:false },{ id:'model',title:'模型设置',nested:false }]
  const lineless = panel === 'anchor-lineless'
  return <nav style={{ width:150,position:'relative',paddingLeft:lineless ? 0 : 16 }}>
    {!lineless && <Separator orientation="vertical" style={{position:'absolute',left:0,top:0,bottom:0,height:'auto'}}/>}
    {!lineless && active && <span style={{position:'absolute',left:0,top:items.findIndex(item=>item.id===active)*40+(panel === 'anchor-custom' && active !== 'workspace' ? 40 : 0)+8,width:2,height:24,borderRadius:2,background:'var(--accent)'}}/>}
    {items.map(item=><div key={item.id} style={{display:'flex',padding:'8px 0',marginLeft:item.nested ? 16 : 0}}><Link href={`#anchor-${item.id}`} onClick={event=>event.preventDefault()} onPress={()=>setActive(item.id)} style={{color:active===item.id ? 'var(--link)' : 'var(--muted)'}}>{panel === 'anchor-custom' && item.id === 'workspace' ? <span style={{display:'inline-flex',alignItems:'center',gap:8}}><svg width="32" height="64" viewBox="0 0 32 64" fill="none" stroke="currentColor"><rect x="1" y="1" width="30" height="62" rx="8"/></svg>工作区</span> : item.title}</Link></div>)}
  </nav>
}

function TimelineSample({ panel }: { panel: string }): ReactNode {
  const horizontal = panel.includes('horizontal')
  const alternate = panel.includes('alternate')
  const relative = panel.includes('relative')
  const custom = panel === 'timeline-custom'
  const pending = panel === 'timeline-pending'
  const items = ['创建工作区','更新主题','保存配置'].map((title,index) => ({ title, label: ['10:30','10:32','10:35'][index], pending: false }))
  if (pending) { items.push({ title: '同步中', label: '', pending: true }) }
  if (panel === 'timeline-reverse') { items.reverse() }
  return <div style={{ display: 'flex', flexDirection: horizontal ? 'row' : 'column', alignItems: horizontal && alternate ? 'center' : undefined, minHeight: horizontal && alternate ? 200 : undefined }}>
    {items.map((item,index) => {
      const opposite = panel === 'timeline-right' || panel === 'timeline-horizontal-bottom' || (alternate && index % 2 === 1)
      const lineStyle = custom ? index === 0 ? 'dashed' : 'dotted' : pending && index === 2 ? 'dashed' : 'solid'
      const dotLeft = horizontal ? 0 : alternate ? 'calc(50% - 3px)' : opposite ? 'calc(100% - 6px)' : 0
      const textStyle: CSSProperties = horizontal ? { marginTop: opposite ? 0 : 16, marginBottom: opposite ? 16 : 0 } : alternate ? { position: 'relative', left: opposite ? 0 : '50%', width: '50%', paddingLeft: opposite ? 0 : 19, paddingRight: opposite ? 19 : 0, textAlign: opposite ? 'right' : 'left' } : { marginLeft: opposite ? 0 : 16, marginRight: opposite ? 16 : 0, textAlign: opposite ? 'right' : 'left' }
      const dotStyle: CSSProperties = { position: 'absolute', left: dotLeft, top: horizontal ? opposite ? 'auto' : 0 : 11, bottom: horizontal && opposite ? 0 : undefined, width: 6, height: 6, borderRadius: '50%', background: panel === 'timeline-hollow' ? 'var(--surface)' : custom ? 'var(--success)' : 'var(--accent)', border: panel === 'timeline-hollow' ? '2px solid var(--accent)' : undefined, boxSizing: 'border-box' }
      const customDot = item.pending || (custom && index === 1)
      const labelStyle: CSSProperties = relative ? horizontal ? { position: 'absolute', top: 0, paddingBottom: 16, transform: 'translateY(-100%)', maxWidth: 100 } : alternate ? { position: 'absolute', top: 6, width: '50%', left: opposite ? '50%' : 0, paddingLeft: opposite ? 19 : 0, paddingRight: opposite ? 0 : 19, textAlign: opposite ? 'left' : 'right' } : { position: 'absolute', top: 6, left: 0, paddingRight: 16, transform: 'translateX(-100%)', maxWidth: 100, textAlign: 'right' } : {}
      return <div key={item.title} style={{ position: 'relative', boxSizing: 'border-box', minHeight: horizontal ? undefined : 78, paddingLeft: horizontal || alternate || opposite ? 0 : 6, paddingRight: !horizontal && opposite && !alternate ? 6 : 0, paddingTop: horizontal && !opposite ? 6 : 0, paddingBottom: horizontal && opposite ? 6 : 0, flex: horizontal ? 1 : undefined, marginLeft: relative && !horizontal && !alternate ? 100 : undefined, marginTop: horizontal ? alternate ? opposite ? 6 : -6 : relative ? 50 : undefined : undefined, transform: horizontal && alternate ? `translateY(${opposite ? '-50%' : '50%'})` : undefined }}>
        {index < items.length - 1 && <Separator orientation={horizontal ? 'horizontal' : 'vertical'} style={{ position: 'absolute', ...(horizontal ? { top: opposite ? 'auto' : 2.5, bottom: opposite ? 2.5 : undefined, left: 12, right: 4, width: 'auto' } : { top: 22, bottom: 0, left: opposite && !alternate ? 'calc(100% - 3.5px)' : alternate ? 'calc(50% - .5px)' : 2.5, height: 'auto' }), ...(lineStyle !== 'solid' ? { background: 'transparent', borderRadius: 0, borderLeft: `1px ${lineStyle} ${custom ? 'var(--accent)' : 'var(--separator)'}` } : custom ? { background: 'var(--accent)' } : {}) }} />}
        {customDot ? <span style={{ position: 'absolute', left: -3, top: 8, display: 'inline-flex', color: 'var(--accent)', background: 'var(--surface)' }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>{item.pending ? <><path d="M12 3v9l6 3"/><circle cx="12" cy="12" r="10"/></> : <path d="m5 12 4 4L19 6"/>}</svg></span> : <span style={dotStyle} />}
        <div style={textStyle}><Paragraph align={opposite && !horizontal ? 'end' : 'start'} style={{ marginBottom: 4 }}>{item.title}</Paragraph>{!relative && item.label && <Description elementType="div">{item.label}</Description>}</div>
        {relative && <Description elementType="div" style={labelStyle}>{item.label}</Description>}
      </div>
    })}
  </div>
}

function TransferSample({ panel }: { panel: string }): ReactNode {
  const [target,setTarget] = useState(['balanced'])
  const [selected,setSelected] = useState(new Set(panel === 'transfer-selected' ? ['fast'] : panel === 'transfer-target-selected' ? ['balanced'] : []))
  const disabled = panel === 'transfer-disabled'
  const data = [{key:'fast',title:'快速'},{key:'offline',title:'离线',disabled:true},{key:'balanced',title:'均衡'}]
  const move = (right: boolean) => { setTarget(right ? [...target,...Array.from(selected).filter(key=>!target.includes(key))] : target.filter(key=>!selected.has(key)));setSelected(new Set()) }
  const columns = [data.filter(item=>!target.includes(item.key)),data.filter(item=>target.includes(item.key))]
  const pane = (index: number) => {
    const items = columns[index]
    const valid = items.filter(item=>!item.disabled)
    const picked = items.filter(item=>selected.has(item.key))
    return <Surface style={{width:180,height:224,border:'1px solid var(--separator)',borderRadius:'var(--radius)',overflow:'hidden',display:'flex',flexDirection:'column'}}>
      <div style={{height:44,padding:'0 12px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:8,flexShrink:0,borderBottom:'1px solid var(--separator)'}}><Checkbox isDisabled={disabled} isSelected={valid.length > 0 && valid.every(item=>selected.has(item.key))} isIndeterminate={picked.length > 0 && picked.length < valid.length} onChange={checked=>{const next=new Set(selected);for(const item of valid){if(checked){next.add(item.key)}else{next.delete(item.key)}}setSelected(next)}}><Checkbox.Content><Checkbox.Control><Checkbox.Indicator/></Checkbox.Control><Label>{index === 0 ? '可用模式' : '已启用'}</Label></Checkbox.Content></Checkbox><Description>{`${picked.length} / ${items.length}`}</Description></div>
      {items.length === 0 ? <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center'}}><EmptyState>No Data</EmptyState></div> : <ListBox aria-label={index === 0 ? '可用模式' : '已启用'} selectionMode="none" style={{flex:1}}>{items.map(item=><ListBox.Item key={item.key} id={item.key} textValue={item.title} onAction={disabled || item.disabled ? undefined : ()=>{const next=new Set(selected);if(next.has(item.key)){next.delete(item.key)}else{next.add(item.key)}setSelected(next)}}><Checkbox isDisabled={disabled || item.disabled} isSelected={selected.has(item.key)} onChange={checked=>{const next=new Set(selected);if(checked){next.add(item.key)}else{next.delete(item.key)}setSelected(next)}}><Checkbox.Content><Checkbox.Control><Checkbox.Indicator/></Checkbox.Control><Label>{item.title}</Label></Checkbox.Content></Checkbox></ListBox.Item>)}</ListBox>}
    </Surface>
  }
  const arrow = (right: boolean) => <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={4}><path d={right ? 'm16 39.513 15.556-15.557L16 8.4' : 'M32 8.4 16.444 23.956 32 39.513'}/></svg>
  return <div className="comparison-transfer" style={{display:'flex',alignItems:'center',gap:12,width:416}}>{pane(0)}<div style={{display:'flex',flexDirection:'column',gap:12}}><Button isIconOnly variant="secondary" size="sm" aria-label="移入" isDisabled={disabled || !columns[0].some(item=>!item.disabled && selected.has(item.key))} onPress={()=>move(true)}>{arrow(true)}</Button><Button isIconOnly variant="secondary" size="sm" aria-label="移回" isDisabled={disabled || !columns[1].some(item=>!item.disabled && selected.has(item.key))} onPress={()=>move(false)}>{arrow(false)}</Button></div>{pane(1)}</div>
}

function TreeSample({ panel }: { panel: string }): ReactNode {
  const [expanded,setExpanded] = useState(panel !== 'tree' && panel !== 'tree-expand-click')
  const [selected,setSelected] = useState<Set<string>>(new Set(panel === 'tree-selected' ? ['theme'] : []))
  const [checked,setChecked] = useState<Set<string>>(new Set(panel.startsWith('tree-checkable') ? ['theme'] : panel === 'tree-checked' ? ['theme','notification'] : []))
  const checkable = panel.startsWith('tree-checkable') || panel === 'tree-checked' || panel === 'tree-check-click'
  const items = [{key:'workspace',title:'工作区',child:false},...(expanded ? [{key:'theme',title:'主题设置',child:true},{key:'notification',title:'通知设置',child:true}] : []),{key:'model',title:'模型设置',child:false}]
  return <ListBox aria-label="工作区目录" selectionMode="single" selectedKeys={selected} onSelectionChange={keys=>{if(keys !== 'all'){setSelected(new Set(Array.from(keys,String)))}}} disabledKeys={panel === 'tree-disabled' ? ['model'] : []}>{items.map(item=><ListBox.Item key={item.key} id={item.key} textValue={item.title}>
    {item.child && <span style={{width:24,flexShrink:0,marginInlineEnd:-12}}/>}<span style={{display:'flex',alignItems:'center',justifyContent:'center',width:16,height:20,flexShrink:0}}>{item.key === 'workspace' && <span role="button" aria-label={expanded ? '收起工作区' : '展开工作区'} onPointerDown={event=>event.stopPropagation()} onPointerUp={event=>event.stopPropagation()} onClick={event=>{event.stopPropagation();setExpanded(!expanded)}} style={{display:'flex',alignItems:'center',justifyContent:'center',width:16,height:20}}><svg width="12" height="12" viewBox="0 0 48 48" fill="currentColor" style={{transform:expanded ? 'none' : panel.endsWith('rtl') ? 'rotate(90deg)' : 'rotate(-90deg)'}}><path d="M24.938 34.829a1.2 1.2 0 0 1-1.875 0L9.56 17.949c-.628-.785-.069-1.949.937-1.949h27.007c1.006 0 1.565 1.164.937 1.95L24.937 34.829Z"/></svg></span>}</span>
    {checkable && <Checkbox aria-label={`选择${item.title}`} isSelected={item.key === 'workspace' ? checked.has('theme') && checked.has('notification') : checked.has(item.key)} isIndeterminate={item.key === 'workspace' && checked.has('theme') !== checked.has('notification')} onChange={value=>{const next=new Set(checked);for(const key of item.key === 'workspace' ? ['theme','notification'] : [item.key]){if(value){next.add(key)}else{next.delete(key)}}setChecked(next)}}><Checkbox.Content aria-label={`选择${item.title}`} onClick={event=>event.stopPropagation()}><Checkbox.Control><Checkbox.Indicator/></Checkbox.Control></Checkbox.Content></Checkbox>}
    <Label>{item.title}</Label>{!checkable && <ListBox.ItemIndicator/>}
  </ListBox.Item>)}</ListBox>
}

function RateSample({ panel }: { panel: string }): ReactNode {
  const [value,setValue] = useState(panel === 'rate-empty' ? 0 : panel.startsWith('rate-half') ? 2.5 : 3)
  const [hover,setHover] = useState(0)
  const used = hover || value
  const icon = <svg viewBox={panel === 'rate-custom' ? '0 0 24 24' : '0 0 48 48'} fill="currentColor"><path d={panel === 'rate-custom' ? 'M12 21 2 11 12 1l10 10Z' : 'M22.683 5.415c.568-1.043 2.065-1.043 2.634 0l5.507 10.098a1.5 1.5 0 0 0 1.04.756l11.306 2.117c1.168.219 1.63 1.642.814 2.505l-7.902 8.359a1.5 1.5 0 0 0-.397 1.223l1.48 11.407c.153 1.177-1.058 2.057-2.131 1.548l-10.391-4.933a1.5 1.5 0 0 0-1.287 0l-10.39 4.933c-1.073.51-2.284-.37-2.131-1.548l1.48-11.407a1.5 1.5 0 0 0-.398-1.223L4.015 20.89c-.816-.863-.353-2.286.814-2.505l11.306-2.117a1.5 1.5 0 0 0 1.04-.756l5.508-10.098Z'}/></svg>
  return <ToggleButtonGroup isDetached selectionMode="multiple" selectedKeys={Array.from({length:Math.floor(used)},(_,index)=>String(index+1))} isDisabled={panel === 'rate-disabled'} aria-label="评分" onMouseLeave={()=>setHover(0)}>{[1,2,3,4,5].map(index=><ToggleButton key={index} id={String(index)} isIconOnly variant="ghost" aria-label={`${index} 分`} onHoverStart={()=>{if(panel !== 'rate-readonly'){setHover(index)}}} onPointerMove={event=>{if(panel.startsWith('rate-half')){const r=event.currentTarget.getBoundingClientRect();const first=panel.endsWith('rtl') ? event.clientX>r.x+r.width/2 : event.clientX<r.x+r.width/2;setHover(index-(first ? 0.5 : 0))}}} onPress={()=>{if(panel !== 'rate-readonly'){setValue(hover || index)}}} style={{position:'relative',overflow:'hidden',pointerEvents:panel === 'rate-readonly' ? 'none' : undefined}}>{icon}{index-0.5 === used && <span style={{position:'absolute',insetInlineStart:0,top:0,width:'50%',height:'100%',overflow:'hidden',background:hover ? 'var(--accent-soft-hover)' : 'var(--accent-soft)',color:'var(--accent-soft-foreground)'}}><span style={{position:'absolute',insetInlineStart:10,top:10,width:16,height:16,display:'flex',alignItems:'center',justifyContent:'center'}}>{icon}</span></span>}</ToggleButton>)}</ToggleButtonGroup>
}

function StepsSample({ panel }: { panel: string }): ReactNode {
  const vertical = panel.startsWith('steps-vertical')
  const below = panel === 'steps-label-vertical'
  const size = panel === 'steps-small' ? 32 : 36
  return <div style={{display:'flex',flexDirection:vertical ? 'column' : 'row',width:520}}>{['创建','配置','完成'].map((title,index)=>{
    const disabled = panel === 'steps-disabled' && index === 2
    const icon = panel === 'steps-custom' && index === 1 ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="8"/><path d="M12 8v8m-4-4h8"/></svg> : index === 0 || (index === 1 && panel === 'steps-error') ? <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="butt" strokeLinejoin="miter"><path d={index === 0 ? 'M41.678 11.05 19.05 33.678 6.322 20.95' : 'M9.857 9.858 24 24m0 0 14.142 14.142M24 24 38.142 9.858M24 24 9.857 38.142'}/></svg> : index+1
    return <div key={title} style={{position:'relative',display:'flex',flexDirection:below ? 'column' : 'row',alignItems:below ? 'center' : undefined,flex:below || index < 2 ? 1 : 'none',minWidth:0,marginInlineEnd:vertical || below || index === 2 ? 0 : 8,minHeight:vertical && index < 2 ? 80 : undefined,overflow:vertical || below ? 'visible' : 'hidden'}}>
      {index < 2 && panel !== 'steps-lineless' && (vertical || below) && <Separator orientation={vertical ? 'vertical' : 'horizontal'} style={{position:'absolute',insetInlineStart:vertical ? (size-1)/2 : `calc(50% + ${size/2+8}px)`,top:vertical ? size+8 : (size-1)/2,bottom:vertical ? 8 : undefined,width:vertical ? 1 : `calc(100% - ${size+16}px)`,height:vertical ? 'auto' : 1}}/>}
      <Button isIconOnly isDisabled={disabled} size={size === 32 ? 'sm' : 'md'} variant={index === 0 ? 'secondary' : index === 1 ? panel === 'steps-error' ? 'danger' : 'primary' : 'tertiary'} aria-label={title} style={{flexShrink:0,marginInlineEnd:below ? 0 : 8}}>{icon}</Button>
      <div style={{minWidth:0,textAlign:below ? 'center' : 'start',opacity:disabled ? 'var(--disabled-opacity)' : undefined}}><Label elementType="div" style={{position:'relative',display:'inline-block',paddingInlineEnd:below ? 0 : 8,marginTop:below ? 8 : 0,lineHeight:below ? '20px' : `${size}px`}}>{title}{index < 2 && !vertical && !below && panel !== 'steps-lineless' && <Separator style={{position:'absolute',insetInlineStart:'100%',top:(size-1)/2,width:5000,height:1}}/>}</Label><Description elementType="div">{['工作区','主题设置','保存配置'][index]}</Description></div>
    </div>
  })}</div>
}

function PanelSample({ panel }: { panel: string }): ReactNode {
  if (panel.startsWith('transfer')) { return <TransferSample panel={panel} /> }
  if (panel.startsWith('tree')) { return <TreeSample panel={panel} /> }
  if (panel.startsWith('rate')) { return <RateSample panel={panel} /> }
  if (panel.startsWith('steps')) { return <StepsSample panel={panel} /> }
  if (panel.startsWith('anchor')) { return <AnchorSample panel={panel} /> }
  if (panel.startsWith('timeline')) { return <TimelineSample panel={panel} /> }
  if (panel.startsWith('message') || panel.startsWith('notification')) { return <FeedbackSample notification={panel.startsWith('notification')} panel={panel} /> }
  if (panel === 'space') { return <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Button>编辑</Button><Button>复制</Button><Button>保存</Button></div> }
  if (panel === 'grid') { return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}><Surface style={{ padding: 12 }}>工作区</Surface><Surface style={{ padding: 12 }}>通知</Surface></div> }
  if (panel === 'layout') { return <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--background)', color: 'var(--foreground)' }}><Surface style={{ padding: 12 }}>工作区</Surface><div style={{ display: 'flex', minHeight: 80 }}><Surface style={{ width: 80, padding: 12, flexShrink: 0 }}>导航</Surface><div style={{ flex: 1, padding: 12 }}>配置与通知</div></div><Surface style={{ padding: 12 }}>已保存</Surface></div> }
  if (panel === 'list') { return <Surface style={{ border: '1px solid var(--separator)', borderRadius: 'var(--radius)', overflow: 'hidden' }}><Label elementType="div" style={{ padding: 12, borderBottom: '1px solid var(--separator)' }}>工作区</Label>{['主题设置','通知设置','模型设置'].map((item,index)=><div key={item} style={{ padding: 12, borderBottom: index < 2 ? '1px solid var(--separator)' : undefined }}>{item}</div>)}</Surface> }
  if (panel.startsWith('input-tag')) { return <TagInputSample panel={panel} /> }
  if (panel === 'page-header') { return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}><div style={{ display: 'flex', alignItems: 'center' }}><Heading level={4}>工作区</Heading><Separator orientation="vertical" style={{ height: 16, margin: '0 12px', alignSelf: 'center' }} /><Description>配置与通知</Description></div><Button size="sm">保存</Button></div> }
  if (panel === 'result') { return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Alert status="success" style={{ display: 'contents' }}><Alert.Indicator className="[&>svg]:size-12" style={{ width: 48, height: 48, padding: 0, color: 'var(--success)', marginBottom: 16 }} /></Alert><Heading level={3}>设置已保存</Heading><Description style={{ marginTop: 8 }}>工作区配置已更新</Description><Button style={{ marginTop: 16 }}>返回工作区</Button></div> }
  if (panel === 'statistic') { return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}><Description>已完成任务</Description><Heading level={3}><span>1,280</span><span style={{ display: 'inline-block' }}>.62</span></Heading><Description>较昨日增加 12%</Description></div> }
  if (panel === 'descriptions') { return <div><Heading level={6} style={{ marginBottom: 16 }}>工作区信息</Heading><dl style={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', columnGap: 16, rowGap: 12 }}>{[['名称', '示例工作区'], ['状态', '运行中']].map(([label, value]) => <div key={label} style={{ display: 'contents' }}><Label elementType="dt">{label}</Label><Description elementType="dd">{value}</Description></div>)}</dl></div> }
  if (panel === 'comment') { return <div style={{ display: 'flex', gap: 12 }}><Avatar><Avatar.Fallback>DS</Avatar.Fallback></Avatar><div style={{ flex: 1 }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Label>DSH 用户</Label><Description>2026-11-16</Description></div><Paragraph>主题与通知选项已更新。</Paragraph><div style={{ marginTop: 8 }}><Link href="#reply">回复</Link></div></div></div> }
  if (panel === 'calendar' || panel === 'calendar-year') { return <DateCalendar year={panel === 'calendar-year'} /> }
  if (panel === 'progress-circle') { return <ProgressCircle value={62} aria-label="进度"><ProgressCircle.Track><ProgressCircle.TrackCircle /><ProgressCircle.FillCircle /></ProgressCircle.Track></ProgressCircle> }
  if (panel === 'tag-removable' || panel === 'tag-group') { return <TagSample multiple={panel === 'tag-group'} /> }
  if (panel === 'popconfirm') { return <Popover isOpen><Button>确认操作</Button><Popover.Content placement="bottom start"><Popover.Dialog><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Alert.Indicator style={{ color: 'var(--accent)', width: 16, height: 16 }} /><Popover.Heading>保存工作区设置？</Popover.Heading></div><div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}><Button size="sm" variant="secondary">取消</Button><Button size="sm">保存</Button></div></Popover.Dialog></Popover.Content></Popover> }
  if (panel === 'form' || panel === 'form-error') { return <Form><TextField defaultValue="示例工作区" isInvalid={panel === 'form-error'}><Label>工作区名称</Label><Input /><Description>用于区分多个配置</Description><FieldError>请输入有效名称</FieldError></TextField></Form> }
  if (panel.startsWith('scroll-shadow-')) { return <ScrollSample panel={panel} /> }
  if (panel === 'input-number') { return <NumberField aria-label="数量" defaultValue={16}><NumberField.Group><NumberField.DecrementButton /><NumberField.Input /><NumberField.IncrementButton /></NumberField.Group></NumberField> }
  if (panel === 'pagination') { return <Pagination><Pagination.Content><Pagination.Item><Pagination.Previous aria-label="Previous" isDisabled><Pagination.PreviousIcon /></Pagination.Previous></Pagination.Item>{[1,2,3].map(page => <Pagination.Item key={page}><Pagination.Link isActive={page === 1}>{page}</Pagination.Link></Pagination.Item>)}<Pagination.Item><Pagination.Next aria-label="Next"><Pagination.NextIcon /></Pagination.Next></Pagination.Item></Pagination.Content></Pagination> }
  if (panel === 'typography') { return <div><Heading level={3}>工作区设置</Heading><Paragraph>主题与通知选项</Paragraph></div> }
  if (panel === 'empty') { return <EmptyState>暂无数据</EmptyState> }
  if (panel === 'verification-code') { return <InputOTP maxLength={6} value="123456" aria-label="验证码"><InputOTP.Group>{Array.from({length:6},(_,index)=><InputOTP.Slot key={index} index={index} />)}</InputOTP.Group></InputOTP> }
  if (panel === 'button-group') { return <ButtonGroup><Button>编辑</Button><Button>复制</Button><Button>保存</Button></ButtonGroup> }
  if (panel === 'link') { return <Link href="#workspace">工作区设置</Link> }
  if (panel === 'divider') { return <Separator /> }
  if (panel === 'badge') { return <Badge.Anchor><Button>通知</Button><Badge placement="top-right" color="danger" variant="primary"><Badge.Label>8</Badge.Label></Badge></Badge.Anchor> }
  if (panel === 'spin') { return <Spinner /> }
  if (panel === 'checkbox-group') { return <CheckboxGroup aria-label="选项" defaultValue={['cache']}><Checkbox value="cache"><Checkbox.Content><Checkbox.Control><Checkbox.Indicator /></Checkbox.Control><Label>启用缓存</Label></Checkbox.Content></Checkbox><Checkbox value="notification"><Checkbox.Content><Checkbox.Control><Checkbox.Indicator /></Checkbox.Control><Label>启用通知</Label></Checkbox.Content></Checkbox></CheckboxGroup> }
  const empty = panel.endsWith('empty')
  if (panel.startsWith('select-')) {
    return panel === 'select-multiple'
      ? <Select aria-label="运行模式" selectionMode="multiple" defaultValue={['fast', 'balanced']} isOpen className="comparison-wide"><Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger><Select.Popover placement="bottom start"><Options /></Select.Popover></Select>
      : <Select aria-label="运行模式" defaultValue="balanced" isOpen className="comparison-wide"><Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger><Select.Popover placement="bottom start"><Options /></Select.Popover></Select>
  }
  if (panel.startsWith('autocomplete-')) {
    return <Autocomplete aria-label="运行模式" defaultValue="balanced" isOpen className="comparison-wide"><Autocomplete.Trigger><Autocomplete.Value /><Autocomplete.Indicator /></Autocomplete.Trigger><Autocomplete.Popover placement="bottom start"><Autocomplete.Filter inputValue={empty ? '不存在' : '均'}><SearchField aria-label="搜索" value={empty ? '不存在' : '均'}><SearchField.Group><SearchField.Input /></SearchField.Group></SearchField><Options empty={empty} filtered /></Autocomplete.Filter></Autocomplete.Popover></Autocomplete>
  }
  if (panel.startsWith('combobox-')) {
    return <ComboBox items={empty ? [] : options.filter(option => option.id === 'balanced')} aria-label="输入建议" inputValue={empty ? '不存在' : '均'} allowsEmptyCollection allowsCustomValue className="comparison-wide"><ComboBox.Value>{({ state }) => <ComboOpen state={state} />}</ComboBox.Value><ComboBox.InputGroup><Input /><ComboBox.Trigger /></ComboBox.InputGroup><ComboBox.Popover isOpen placement="bottom start"><ListBox items={empty ? [] : options.filter(option => option.id === 'balanced')} aria-label="输入建议" renderEmptyState={() => '无结果'}>{option => <ListBox.Item id={option.id} textValue={option.label}>{option.label}<ListBox.ItemIndicator /></ListBox.Item>}</ListBox></ComboBox.Popover></ComboBox>
  }
  if (panel.startsWith('dropdown-')) {
    return <Dropdown isOpen><Button>操作</Button><Dropdown.Popover placement="bottom start"><Dropdown.Menu aria-label="操作">
      <Dropdown.Item id="edit">编辑</Dropdown.Item>
      {panel === 'dropdown-submenu' ? <Dropdown.SubmenuTrigger><Dropdown.Item id="more">更多<Dropdown.SubmenuIndicator /></Dropdown.Item><Dropdown.Popover isOpen placement="right top"><Dropdown.Menu aria-label="更多操作"><Dropdown.Item id="copy">复制</Dropdown.Item><Dropdown.Item id="export">导出</Dropdown.Item></Dropdown.Menu></Dropdown.Popover></Dropdown.SubmenuTrigger> : <Dropdown.Item id="copy">复制</Dropdown.Item>}
      <Dropdown.Item id="delete" isDisabled>删除</Dropdown.Item>
    </Dropdown.Menu></Dropdown.Popover></Dropdown>
  }
  if (panel.startsWith('tooltip')) {
    const query = new URLSearchParams(location.search)
    const position = (['top', 'bottom', 'left', 'right'].find(value => value === query.get('tooltip-position')) ?? 'top') as 'top' | 'bottom' | 'left' | 'right'
    const backgroundColor = query.get('tooltip-color') ?? undefined
    return <Tooltip isOpen><Button>查看提示</Button><Tooltip.Content placement={position} style={{ '--overlay': backgroundColor } as CSSProperties} showArrow={panel === 'tooltip-arrow'}>{panel === 'tooltip-arrow' && <Tooltip.Arrow />}主题与通知选项</Tooltip.Content></Tooltip>
  }
  if (panel.startsWith('popover')) {
    return <Popover isOpen><Button>查看详情</Button><Popover.Content placement="bottom start"><Popover.Dialog><Popover.Heading>工作区设置</Popover.Heading>{panel === 'popover-long' ? <ScrollShadow style={{ width: 248, height: 240 }}><Lines /></ScrollShadow> : <p>主题与通知选项</p>}<Button size="sm">保存</Button></Popover.Dialog></Popover.Content></Popover>
  }
  if (panel === 'date-picker' || panel === 'date-year') {
    return <DatePicker aria-label="日期" value={date} isOpen><DateField.Group className="comparison-wide"><DateInput /><DateField.Suffix><DatePicker.Trigger><DatePicker.TriggerIndicator /></DatePicker.Trigger></DateField.Suffix></DateField.Group><DatePicker.Popover placement="bottom start"><DateCalendar year={panel === 'date-year'} /></DatePicker.Popover></DatePicker>
  }
  if (panel.startsWith('date-range')) {
    const preview = panel === 'date-range-preview'
    return <DateRangePicker aria-label="日期范围" value={preview ? null : { start, end: date }} isOpen><DateField.Group className="comparison-wide"><DateInput slot="start" /><DateRangePicker.RangeSeparator /><DateInput slot="end" /><DateField.Suffix><DateRangePicker.Trigger><DateRangePicker.TriggerIndicator /></DateRangePicker.Trigger></DateField.Suffix></DateField.Group><DateRangePicker.Popover placement="bottom start"><RangePanel preview={preview} /></DateRangePicker.Popover></DateRangePicker>
  }
  if (panel === 'color-picker') {
    return <ColorPicker value={color}><ColorPicker.Trigger><ColorSwatch color={color} /></ColorPicker.Trigger><ColorPicker.Popover isOpen placement="bottom start"><ColorArea colorSpace="hsb" xChannel="saturation" yChannel="brightness" aria-label="饱和度与亮度"><ColorArea.Thumb /></ColorArea><ColorSlider colorSpace="hsb" channel="hue" aria-label="色相"><ColorSlider.Track><ColorSlider.Thumb /></ColorSlider.Track></ColorSlider><ColorSlider channel="alpha" aria-label="透明度"><ColorSlider.Track><ColorSlider.Thumb /></ColorSlider.Track></ColorSlider><ColorField aria-label="十六进制颜色"><ColorField.Group><ColorField.Input /></ColorField.Group></ColorField></ColorPicker.Popover></ColorPicker>
  }
  if (panel === 'menu') {
    return <Menu aria-label="操作" selectionMode="single" selectedKeys={['edit']}><Menu.Item id="edit">编辑<Menu.ItemIndicator /></Menu.Item><Menu.Item id="copy">复制<Menu.ItemIndicator /></Menu.Item><Menu.Item id="delete" isDisabled>删除<Menu.ItemIndicator /></Menu.Item></Menu>
  }
  if (panel.startsWith('modal')) {
    return <Modal isOpen><Button>打开对话框</Button><Modal.Backdrop><Modal.Container placement="center" scroll="inside"><Modal.Dialog style={panel === 'modal-long' ? { maxHeight: 'calc(100dvh - 240px)' } : undefined}><Modal.CloseTrigger /><Modal.Header><Modal.Heading>工作区设置</Modal.Heading></Modal.Header><Modal.Body>{panel === 'modal-long' ? <Lines /> : '主题与通知选项'}</Modal.Body><Modal.Footer><Button variant="secondary">取消</Button><Button>保存</Button></Modal.Footer></Modal.Dialog></Modal.Container></Modal.Backdrop></Modal>
  }
  if (panel.startsWith('drawer-')) {
    return <Drawer isOpen><Button>打开抽屉</Button><Drawer.Backdrop><Drawer.Content placement={panel === 'drawer-right' ? 'right' : 'bottom'}><Drawer.Dialog><Drawer.CloseTrigger /><Drawer.Header><Drawer.Heading>工作区设置</Drawer.Heading></Drawer.Header><Drawer.Body>{panel === 'drawer-right' ? <Lines /> : '主题与通知选项'}</Drawer.Body><Drawer.Footer><Button variant="secondary">取消</Button><Button>保存</Button></Drawer.Footer></Drawer.Dialog></Drawer.Content></Drawer.Backdrop></Drawer>
  }
  return <Accordion allowsMultipleExpanded expandedKeys={panel === 'accordion-multiple' ? ['workspace', 'notification'] : ['workspace']}>
    <Accordion.Item id="workspace"><Accordion.Heading><Accordion.Trigger>工作区设置<Accordion.Indicator /></Accordion.Trigger></Accordion.Heading><Accordion.Panel><Accordion.Body>主题与通知选项</Accordion.Body></Accordion.Panel></Accordion.Item>
    <Accordion.Item id="notification"><Accordion.Heading><Accordion.Trigger>通知设置<Accordion.Indicator /></Accordion.Trigger></Accordion.Heading><Accordion.Panel><Accordion.Body>任务完成后通知</Accordion.Body></Accordion.Panel></Accordion.Item>
  </Accordion>
}

/** 官方组合部件保持默认视觉，展开态仅固定内容、坐标与受控值。 */
export function Panel({ panel, theme }: { panel: string; theme: 'light' | 'dark' }) {
  const entry = states.find(state => state.id === panel)
  if (!entry) {
    throw new Error(`未知展开态：${panel}`)
  }
  return <I18nProvider locale="en-US"><main id="comparison" className="comparison" dir={panel.endsWith('rtl') ? 'rtl' : 'ltr'} data-theme={theme} data-panel={panel}>
    <h1 className="comparison-heading">展开组件像素对照</h1><p className="comparison-note">{entry.label} · 相同内容与画布</p>
    <div id="comparison-anchor" style={{ position: 'absolute', left: 480, top: 240, width: 280 }}><PanelSample panel={panel} /></div>
  </main></I18nProvider>
}
