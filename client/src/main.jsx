import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { ConnectionStatusContextProvider } from './components/contextProvider/ConnectionStatusContextProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <ConnectionStatusContextProvider>

          <App/>

      </ConnectionStatusContextProvider>
    </BrowserRouter>

)
