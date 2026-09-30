import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from '@/App'
import { scrollToTop } from '@/lib/scroll'

import '@/assets/styles/app.scss'

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

scrollToTop()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
