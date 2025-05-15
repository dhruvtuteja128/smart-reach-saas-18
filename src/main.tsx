
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/ThemeProvider.tsx'
import { Toaster } from '@/components/ui/toaster'
import { OpenAIProvider } from './contexts/OpenAIContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <OpenAIProvider>
          <App />
          <Toaster />
        </OpenAIProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
