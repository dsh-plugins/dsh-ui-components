/**
 * jsdom 环境垫片。
 *
 * jsdom 没有实现 `matchMedia` 与 `ResizeObserver`，而 Arco 的响应式组件
 * （描述列表、表格、轮播等）在挂载时会直接调用它们。这里补上最小实现：
 * `matchMedia` 恒返回「不匹配」，观察器只在订阅时记录回调、不主动触发，
 * 足以让组件完成挂载与卸载。
 *
 * 本文件只在 jsdom 环境下起作用，node 环境直接跳过。
 */
if (typeof window !== 'undefined') {
  if (typeof window.matchMedia !== 'function') {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: (query: string): MediaQueryList => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList,
    })
  }

  if (typeof globalThis.ResizeObserver !== 'function') {
    /** 不主动触发回调的观察器。 */
    class NoopResizeObserver implements ResizeObserver {
      /** 开始观察一个元素。 */
      observe(): void {}
      /** 停止观察一个元素。 */
      unobserve(): void {}
      /** 断开全部观察。 */
      disconnect(): void {}
    }
    Object.defineProperty(globalThis, 'ResizeObserver', {
      writable: true,
      configurable: true,
      value: NoopResizeObserver,
    })
  }

  if (typeof globalThis.IntersectionObserver !== 'function') {
    /** 不主动触发回调的交叉观察器。 */
    class NoopIntersectionObserver {
      /** 被观察元素。 */
      readonly root = null
      /** 根容器边距。 */
      readonly rootMargin = ''
      /** 触发阈值。 */
      readonly thresholds: readonly number[] = []
      /** 开始观察一个元素。 */
      observe(): void {}
      /** 停止观察一个元素。 */
      unobserve(): void {}
      /** 断开全部观察。 */
      disconnect(): void {}
      /** 立即取出待处理记录。 */
      takeRecords(): [] {
        return []
      }
    }
    Object.defineProperty(globalThis, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: NoopIntersectionObserver,
    })
  }
}
