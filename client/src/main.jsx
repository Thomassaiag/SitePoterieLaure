import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { ConnectionStatusContextProvider } from './components/contextProvider/ConnectionStatusContextProvider.jsx'
import { CollectionElementInformationsContextProvider } from './components/contextProvider/CollectionElementInformationsContextProvider.jsx'
import { CollectionElementInformationsToUpdateContextProvider } from './components/contextProvider/CollectionElementInformationsToUpdateContextProvider.jsx'
import { CollectionElementInformationsToUpdateCreateContextProvider } from './components/contextProvider/CollectionElementInformationsToUpdateCreateContextProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <ConnectionStatusContextProvider>
        <CollectionElementInformationsToUpdateCreateContextProvider>
          <CollectionElementInformationsContextProvider>
            <CollectionElementInformationsToUpdateContextProvider>
              <App/>
            </CollectionElementInformationsToUpdateContextProvider>
          </CollectionElementInformationsContextProvider>
        </CollectionElementInformationsToUpdateCreateContextProvider>
      </ConnectionStatusContextProvider>
    </BrowserRouter>

)
