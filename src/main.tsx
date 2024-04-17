import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { NotionDataProvider } from './providers/NotionDataProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NotionDataProvider>
      {({ notionData }) => <App notionData={notionData} />}
    </NotionDataProvider>
  </React.StrictMode>
)
