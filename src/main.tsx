import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { NotionDataProvider } from './providers/NotionDataProvider'
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider>
      <NotionDataProvider>
        <App />
      </NotionDataProvider>
    </MantineProvider>
  </React.StrictMode>
)
