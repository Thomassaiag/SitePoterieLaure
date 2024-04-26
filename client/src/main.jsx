import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { ConnectionContext } from './components/context/ConnectionContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <ConnectionContext>
        <App />
    </ConnectionContext>
    </BrowserRouter>

)
