---
title: Table 表格
---

<ComponentHeader slug="table" />

## 代码演示与属性效果

### 基础数据表格

<DemoBlockById slug="table" demoId="table-basic" />

### 声明式子组件

Vue 可在 `columns` 插槽中使用 `Table.Column` 声明列。自定义表格结构时，可在默认插槽中组合 `Table.Thead`、`Table.Tbody`、`Table.Tr`、`Table.Th` 和 `Table.Td`。

```vue
<Table :data="[{ key: 1, name: 'Button' }]" :pagination="false">
  <template #columns>
    <Table.Column title="组件" data-index="name" />
  </template>
</Table>
```

React 可通过 `summary` 接收当前页数据，使用 `Table.Summary.Row` 和 `Table.Summary.Cell` 绘制汇总行。

```tsx
<Table
  columns={[{ title: '组件', dataIndex: 'name' }]}
  data={[{ key: 1, name: 'Button' }]}
  summary={(rows) => (
    <Table.Summary>
      <Table.Summary.Row>
        <Table.Summary.Cell>共 {rows?.length ?? 0} 项</Table.Summary.Cell>
      </Table.Summary.Row>
    </Table.Summary>
  )}
/>
```

## API 文档

### Table Props

<ApiSectionById slug="table" sectionId="api-table-props" />

### TableColumn Props

<ApiSectionById slug="table" sectionId="api-table-column-props" />

### Table Events

<ApiSectionById slug="table" sectionId="api-table-events" />
