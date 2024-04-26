import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { AdminConnectionStatusContextProvider } from './components/contextProvider/AdminConnectionStatusContextProvider.jsx'
import { ConnectedUserFirstNameContextProvider } from './components/contextProvider/ConnectedUserFirstNameContextProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <AdminConnectionStatusContextProvider>
        <ConnectedUserFirstNameContextProvider>
          <App/>
        </ConnectedUserFirstNameContextProvider>
      </AdminConnectionStatusContextProvider>
    </BrowserRouter>

)
