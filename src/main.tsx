import './base.css'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import App from './App.tsx'
import { CurrencyProvider } from './currency'
import { theme } from './theme.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider theme={theme}>
        <Notifications />
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>,
)
