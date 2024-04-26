import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { ContextProvider } from './components/contextProvider/ContextProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <ContextProvider>
        <App />
    </ContextProvider>
    </BrowserRouter>

)
