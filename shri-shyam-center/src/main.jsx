import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './router/index.jsx'
import { ToastProvider } from './components/ui/Toast.jsx'
import { seedDatabase } from './lib/utils.js'

// Seed database on first load
seedDatabase()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <AppRouter />
    </ToastProvider>
  </StrictMode>,
)
