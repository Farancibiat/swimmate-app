import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/globals.css'
import { MainRoutes } from '@/routes/MainRoutes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainRoutes />
  </StrictMode>,
)
