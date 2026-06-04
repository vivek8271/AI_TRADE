import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import Nav from './components/navbar.jsx'
import TradingViewWidget from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Nav /> */}
    <TradingViewWidget />
  </StrictMode>,
)
