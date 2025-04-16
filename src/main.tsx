import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from "@react-oauth/google";
import '@/styles/globals.css'
import { MainRoutes } from '@/routes/MainRoutes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={'GID-asda3'}>

    <MainRoutes />
    </GoogleOAuthProvider>
  </StrictMode>,
)
