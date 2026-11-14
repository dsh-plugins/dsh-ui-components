/**
 * 演示站入口。
 *
 * 演示站的作用是把组件放进真实浏览器里核对：Arco 的样式表由这里手工注入
 * （真实宿主由 dsh-loader 负责），DSH 的令牌由 `host-tokens.css` 提供宿主
 * 样式表里同名的一套取值，让组件在浏览器里表现为宿主中的样子。
 */
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import '@arco-design/web-react/dist/css/arco.min.css'
import './host-tokens.css'
import './preview.css'
import { App } from './App.js'

const container = document.getElementById('root')
if (container === null) throw new Error('缺少 #root 容器')

createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
