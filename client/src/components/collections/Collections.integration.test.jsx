import React from 'react'
import { Collections } from './Collections'
import { CollectionDeletionStatusContextProvider } from '../../contextProvider/CollectionDeletionStatusContextProvider';
import {rest} from 'msw'
import { setupServer } from 'msw/node'
import {waitForElementToBeRemoved, screen, render} from '@testing-library/react'

const apiUrl = globalThis.importMetaEnv.VITE_API_URL;
console.log("API URL", apiUrl)

const collectionsMockedData=[
    {
        collection_uid:1,
        collection_title: "collection1",
        collection_description: "collection1_description",
        collection_picture_url: "collection1_picture_url",
        collection_picture_alt: "collection1_picture_alt",
        collection_deletionflag: "collection1_deletionflag"
    },
        {
        collection_uid:2,
        collection_title: "collection2",
        collection_description: "collection2_description",
        collection_picture_url: "collection2_picture_url",
        collection_picture_alt: "collection2_picture_alt",
        collection_deletionflag: "collection2_deletionflag"
    },
]   

const server = setupServer(

    rest.get(`http://${apiUrl}/collections`, (req, res, ctx)=>{
        return res(ctx.json({collectionList: collectionsMockedData}))
    })
)

beforeAll(()=>server.listen())
afterEach(()=>server.resetHandlers())
afterAll(()=>server.close())

describe('Collections integration test suites',()=>{

    it('should display different collections after loader is gone',()=>{
        render(
        <CollectionDeletionStatusContextProvider>
            <Collections/>
        </CollectionDeletionStatusContextProvider>)


    })

})