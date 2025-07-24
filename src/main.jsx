import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'
import { CarritoProvider } from './context/CarritoContext'
import ErrorBoundary from './components/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </ErrorBoundary>
  </React.StrictMode>
)
