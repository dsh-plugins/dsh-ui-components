/** 与 Arco 一致：局部 undefined 采用全局值，显式忽略全局配置时保留实例参数。 */
export function componentProps<P extends object>(props: P, defaults: Partial<P> | undefined): P {
  const merged = { ...props }
  if ((props as { _ignorePropsFromGlobal?: boolean })._ignorePropsFromGlobal) { return merged }
  for (const key of Object.keys(defaults ?? {}) as (keyof P)[]) {
    if (merged[key] === undefined) { merged[key] = defaults![key] as P[keyof P] }
  }
  return merged
}
