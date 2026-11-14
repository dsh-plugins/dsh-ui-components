<div align="center">

# dsh-ui-components

**A React component library that restyles Arco Design with DeepSeek Harness design tokens and exposes the full IconPark icon set by name.**

English | [简体中文](README.zh_CN.md)

</div>

## What this is

Plugins in the DSH family each hand-roll their own buttons, inputs and dialogs, so the same product ends up with three different border radii. This package is the shared answer: the semantics and keyboard behavior of [Arco Design](https://arco.design), skinned with the DeepSeek Harness `--dsw-*` design tokens, plus the [IconPark](https://iconpark.oceanengine.com) icon set.

It ships as an unbundled ESM source library. Your plugin's bundler inlines it, so React and Arco stay the single instances the host already owns, and no CSS pipeline is needed on your side.

## Install

```sh
npm install @dsh-plugin/dsh-ui-components
```

`react`, `react-dom` and `@dsh-plugin/dsh-loader` are peer dependencies; the host provides all three.

## Use

Wrap your plugin's React root once, then import components from the package root.

```tsx
import { DshProvider, Card, Field, Input, Button, Switch } from '@dsh-plugin/dsh-ui-components'

export function SettingsPage() {
  return (
    <DshProvider>
      <Card title="Proxy">
        <Field label="Host" description="Affects requests made through global fetch." htmlFor="host">
          <Input id="host" mono placeholder="127.0.0.1" />
        </Field>
        <Field label="Enabled" layout="inline">
          <Switch defaultChecked />
        </Field>
        <Button variant="primary">Save</Button>
      </Card>
    </DshProvider>
  )
}
```

`DshProvider` injects the skin, mounts icon defaults, and routes every Arco overlay through a container that carries the same CSS variables. Components render without it, but popups would then attach to `body` and lose the skin.

In your `tsdown` config, keep these three external:

```js
const CLIENT_EXTERNALS = [
  'react',
  'react/jsx-runtime',
  'react-dom',
  'react-dom/client',
  '@dsh-plugin/dsh-loader/client',
]
```

## Theming

Colours are not configurable props and do not need to be. The skin is a single CSS variable bridge that rebinds Arco's own variables onto DSH semantic tokens, so light and dark follow the host's `body[data-ds-dark-theme]` attribute with no JavaScript involved and no theme branching in component code.

The bridge sits on a `.dsh-ui` class rather than on `body`, which keeps the host's own Arco theme untouched. `scripts/verify-tokens.mjs` checks every host variable referenced by this package against the host stylesheets, so a rename in DSH fails offline instead of silently dropping styles.

## Icons

Three channels, because inlining all 2658 icons into every plugin would be indefensible:

```tsx
// 1. Curated set, intent-named (~110 icons, tree-shaken to what you use)
import { Icon, Icons } from '@dsh-plugin/dsh-ui-components'
<Icon name="Settings" size={18} />
<Icons.GitBranch />

// 2. Any of the 2658 icons, by subpath — only that icon enters your bundle
import Rocket from '@dsh-plugin/dsh-ui-components/icons/Rocket'
<Icon of={Rocket} size={18} />

// 3. Full metadata for pickers and search, imports no icon modules
import { ICON_INDEX } from '@dsh-plugin/dsh-ui-components/icons-index'
```

Subpath names are the PascalCase form of the IconPark name: `a-cane` is `ACane`, `setting` is `Setting`. Every entry in `ICON_INDEX` carries `name`, `pascal`, `title`, `titleZh`, `category`, `tags` and `rtl`.

Icons inherit `currentColor`, so they follow the surrounding text colour automatically.

## Components

| Group | Exports |
|---|---|
| Foundation | `DshProvider`, `Icon`, `Icons`, `ICON_NAMES`, `DshIconProvider`, `G`, `cx`, `ICON_INDEX` |
| Buttons | `Button`, `IconButton` |
| Inputs | `Input`, `Textarea`, `InputNumber`, `Select`, `AutoComplete` |
| Toggles | `Checkbox`, `CheckboxGroup`, `Radio`, `RadioGroup`, `Switch`, `Slider`, `Rate` |
| Form | `Form`, `FormItem`, `Field` |
| Display | `Card`, `Tag`, `Pill`, `Avatar`, `Badge`, `Divider`, `Descriptions`, `Typography`, `Text`, `Paragraph`, `Empty`, `Skeleton`, `Spin`, `Tooltip`, `Popover`, `HoverCard`, `Collapse`, `CollapseItem` |
| Feedback | `Alert`, `Progress`, `Result`, `Popconfirm`, `Modal`, `confirm`, `Drawer`, `Message`, `Notification`, `message`, `messageSuccess`, `messageError`, `messageWarning` |
| Navigation | `Menu`, `MenuItem`, `Dropdown`, `Tabs`, `TabPane`, `Breadcrumb`, `BreadcrumbItem`, `Pagination`, `Steps`, `Step`, `SegmentedControl`, `DisclosureRow`, `StateDot` |
| Data | `Table`, `List`, `ListItem`, `Tree`, `DatePicker`, `TimePicker`, `Cascader`, `TreeSelect`, `Transfer`, `Statistic`, `Timeline`, `TimelineItem`, `Calendar`, `Carousel`, `Image` |
| DSH composites | `SettingsCard`, `SettingsRow`, `PanelShell`, `MenuSelect`, `JsonTree`, `CodeBlockShell`, `FileTypeBadge`, `StatusLine` |

Every control forwards native props and `className`, so escaping the defaults never requires forking a component.

`SettingsCard` + `SettingsRow` render the host's settings-page card. `PanelShell` is a plain overlay shell that already satisfies the 120px top and bottom margin rule and scrolls its body through the host's `Scrollbar`. `MenuSelect` is the self-drawn dropdown for settings pages, where a native `<select>` popup cannot follow the DSH theme.

## Preview

```sh
npm run gen:tokens   # copy the host token sheets into docs/preview/
npm run preview      # http://localhost:5178
```

The preview site renders every component against the host's own token values, with a light/dark switch and a searchable index over all 2658 icons. It reads the package source directly, so a change shows up on refresh without a build.

## Development

```sh
npm install
npm run gen:icons     # regenerate the 2658 icon modules and metadata
npm run typecheck
npm run build
npm test
npm run verify        # token names, icon channels, literal colours, package size
```

`npm run verify:tokens` needs the DSH host stylesheets. Point `DSH_UI_THEME_DIR` at `packages/client/ui-theme/src/styles` of a DSH checkout, or keep one at `.dsh/temp/session-tree-harness` in the parent directory.

See [PLAN.md](PLAN.md) for the batch scope and current progress, and [docs/tokens.md](docs/tokens.md) for the token mapping table.

## License

MIT. IconPark artwork is Apache-2.0; see [NOTICE](NOTICE).
