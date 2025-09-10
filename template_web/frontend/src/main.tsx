import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './assets/css/bootstrap.min.css'
import './assets/css/font-awesome.css'
import './assets/css/flex-slider.css'
import './assets/css/lightbox.css'
import './assets/css/templatemo-hexashop.css'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
