import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { ConnectionStatusContextProvider } from './components/contextProvider/ConnectionStatusContextProvider.jsx'
import { CollectionElementInformationsContextProvider } from './components/contextProvider/CollectionElementInformationsContextProvider.jsx'
import { CollectionElementInformationsToUpdateContextProvider } from './components/contextProvider/CollectionElementInformationsToUpdateContextProvider.jsx'
import { CollectionElementInformationsToUpdateDeleteContextProvider } from './components/contextProvider/CollectionElementInformationsToUpdateDeleteContextProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <ConnectionStatusContextProvider>
        
        <CollectionElementInformationsToUpdateDeleteContextProvider>
          <CollectionElementInformationsContextProvider>
            <CollectionElementInformationsToUpdateContextProvider>
              <App/>
            </CollectionElementInformationsToUpdateContextProvider>
          </CollectionElementInformationsContextProvider>
        </CollectionElementInformationsToUpdateDeleteContextProvider>
        
      </ConnectionStatusContextProvider>
    </BrowserRouter>

)
