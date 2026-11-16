import { createRoot } from 'react-dom/client'
import { App } from './App'
import './style.css'

const params = new URLSearchParams(window.location.search)
const theme = params.get('theme') === 'dark' ? 'dark' : 'light'
document.documentElement.dataset.theme = theme
document.documentElement.classList.add(theme)
document.documentElement.dataset.reduceMotion = 'true'

const root = document.getElementById('root')
if (!root) {
  throw new Error('找不到组件对照页面根节点')
}
createRoot(root).render(<App theme={theme} showModal={params.get('state') === 'modal'} />)
