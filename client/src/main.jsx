import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { ConnectionStatusContextProvider } from './contextProvider/ConnectionStatusContextProvider.jsx'
import { CollectionElementInformationsContextProvider } from './contextProvider/CollectionElementInformationsContextProvider.jsx'
import { CollectionElementInformationsToUpdateContextProvider } from './contextProvider/CollectionElementInformationsToUpdateContextProvider.jsx'
import { CollectionElementInformationsToUpdateDeleteContextProvider } from './contextProvider/CollectionElementInformationsToUpdateDeleteContextProvider.jsx'
import { CollectionDeletionStatusContextProvider } from './contextProvider/CollectionDeletionStatusContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <ConnectionStatusContextProvider>
        <CollectionDeletionStatusContextProvider>
          <CollectionElementInformationsToUpdateDeleteContextProvider>
            <CollectionElementInformationsContextProvider>
              <CollectionElementInformationsToUpdateContextProvider>
                  <App/>
              </CollectionElementInformationsToUpdateContextProvider>
            </CollectionElementInformationsContextProvider>
          </CollectionElementInformationsToUpdateDeleteContextProvider>
        </CollectionDeletionStatusContextProvider>
      </ConnectionStatusContextProvider>
    </BrowserRouter>

)
