import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { Collections } from './Collections'
import { CollectionDeletionStatusProvider } from '../../contextProvider/CollectionDeletionStatusContextProvider'

// Create a mock for the Collection component
vi.mock('../collection/Collection', () => {
  return {
    Collection: (props) => {
      // Return a real DOM element instead of undefined
      return (
        <div data-testid="mock-collection">
          <div>{props.title}</div>
          <div>{props.imageAlt}</div>
        </div>
      )
    }
  }
})

// Mock the import.meta.env.VITE_API_URL
vi.mock('../../contextProvider/CollectionDeletionStatusContextProvider', () => ({
  useCollectionDeletionStatus: () => ({
    collectionDeletionStatus: false,
    setCollectionDeletionStatus: vi.fn()
  }),
  CollectionDeletionStatusProvider: ({ children }) => <div>{children}</div>
}))

// Set up environment variable mock
beforeEach(() => {
  vi.stubGlobal('import.meta', { env: { VITE_API_URL: 'localhost:14000' } })
})

const mockCollections = [
  {
    collection_picture_url: 'http://example.com/pic1.jpg',
    collection_title: 'Collection 1',
    collection_picture_alt: 'Alt Text 1',
    collection_uid: '1'
  },
  {
    collection_picture_url: 'http://example.com/pic2.jpg',
    collection_title: 'Collection 2',
    collection_picture_alt: 'Alt Text 2',
    collection_uid: '2'
  }
]

describe('Collections Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    window.scrollTo = vi.fn()
    global.fetch = vi.fn()
  })

  it('should show loading state initially', () => {
    global.fetch.mockRejectedValueOnce(new Error('Failed to fetch'))
    
    render(
      <CollectionDeletionStatusProvider>
        <Collections />
      </CollectionDeletionStatusProvider>
    )
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should fetch and display collections', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockCollections)
    })

    render(
      <CollectionDeletionStatusProvider>
        <Collections />
      </CollectionDeletionStatusProvider>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })

    const collectionElements = screen.getAllByTestId('mock-collection')
    expect(collectionElements).toHaveLength(2)
  })

  it('should handle fetch error gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'log')
    
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: 'Error fetching collections' })
    })

    render(
      <CollectionDeletionStatusProvider>
        <Collections />
      </CollectionDeletionStatusProvider>
    )

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching collections')
    })

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})