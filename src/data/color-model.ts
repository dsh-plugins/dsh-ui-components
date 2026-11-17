/** 将 Arco 支持的 RGB/Hex 输入换算为 HeroUI 的色面坐标和色相滑块坐标。 */
export function colorVariables(value: unknown): Record<string, string> {
  if (typeof value !== 'string') { return {} }
  let rgba: [number, number, number, number]
  const hex = value.trim().replace(/^#/, '')
  if (/^(?:[a-f\d]{3}|[a-f\d]{4}|[a-f\d]{6}|[a-f\d]{8})$/i.test(hex)) {
    const expanded = hex.length < 5 ? [...hex].map(character => character.repeat(2)).join('') : hex
    rgba = [0, 2, 4, 6].map(offset => offset === 6 ? (expanded.length === 8 ? parseInt(expanded.slice(offset, offset + 2), 16) / 255 : 1) : parseInt(expanded.slice(offset, offset + 2), 16)) as [number, number, number, number]
  } else {
    const match = value.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+))?\s*\)$/i)
    if (!match) { return {} }
    rgba = [Number(match[1]), Number(match[2]), Number(match[3]), match[4] === undefined ? 1 : Number(match[4])]
  }
  const [red, green, blue] = rgba
  const alpha = rgba[3]
  const maximum = Math.max(red, green, blue)
  const minimum = Math.min(red, green, blue)
  const delta = maximum - minimum
  let hue = delta === 0 ? 0 : maximum === red ? ((green - blue) / delta + 6) % 6 : maximum === green ? (blue - red) / delta + 2 : (red - green) / delta + 4
  hue *= 60
  const saturation = maximum ? delta / maximum * 100 : 0
  const brightness = maximum / 255 * 100
  const color = `rgb(${red}, ${green}, ${blue})`
  return {
    '--dsh-color': color,
    '--dsh-color-current': `rgb(${red} ${green} ${blue} / ${alpha})`,
    '--dsh-color-transparent': `rgb(${red} ${green} ${blue} / 0)`,
    '--dsh-color-hue': `hsl(${hue} 100% 50%)`,
    '--dsh-color-x': `${Number(saturation.toFixed(2))}%`,
    '--dsh-color-y': `${Number((100 - brightness).toFixed(2))}%`,
    '--dsh-color-hue-x': `${Math.round(hue) / 360 * 100}%`,
    '--dsh-color-alpha-x': `${alpha * 100}%`,
  }
}
