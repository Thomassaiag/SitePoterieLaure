import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { NewPicture } from './NewPicture'
import { BrowserRouter } from 'react-router-dom'
import { ConnectionStatusProvider } from '../../contextProvider/ConnectionStatusContextProvider'
import { CollectionDeletionStatusProvider } from '../../contextProvider/CollectionDeletionStatusContextProvider'

// Setup fetch mock
const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

describe('NewPicture Component', () => {
  const mockCollectionUID = '123'
  const mockFile = new File(['test image'], 'test.png', { type: 'image/png' })
  
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    mockFetch.mockReset()
  })

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <ConnectionStatusProvider>
          <CollectionDeletionStatusProvider>
            <NewPicture collectionUID={mockCollectionUID} />
          </CollectionDeletionStatusProvider>
        </ConnectionStatusProvider>
      </BrowserRouter>
    )
  }

  it('renders add picture button correctly', () => {
    renderComponent()
    expect(screen.getByText('Ajouter une Photo')).toBeInTheDocument()
    expect(screen.getByAltText('Ajouter une Photo')).toBeInTheDocument()
  })

  it('handles file selection and triggers API call', async () => {
    localStorage.setItem('token', 'mock-token')
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true })
    })

    renderComponent()
    
    const input = screen.getByRole('textbox', { hidden: true })
    await fireEvent.change(input, { target: { files: [mockFile] } })

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1)
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/admin/editElement/addNewPicture'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            Authorization: 'Bearer mock-token'
          })
        })
      )
    })
  })

  it('handles unauthorized access', async () => {
    localStorage.setItem('token', 'invalid-token')
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401
    })

    renderComponent()
    
    const input = screen.getByRole('textbox', { hidden: true })
    await fireEvent.change(input, { target: { files: [mockFile] } })

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalled()
    })
  })

  it('prevents event propagation when clicking add button', () => {
    renderComponent()
    
    const addButton = screen.getByRole('img', { name: /ajouter une photo/i })
    const mockStopPropagation = vi.fn()
    
    fireEvent.click(addButton, { stopPropagation: mockStopPropagation })
    
    expect(mockStopPropagation).toHaveBeenCalled()
  })

  it('handles network errors gracefully', async () => {
    localStorage.setItem('token', 'mock-token')
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    renderComponent()
    
    const input = screen.getByRole('textbox', { hidden: true })
    await fireEvent.change(input, { target: { files: [mockFile] } })

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1)
    })
    expect(screen.getByText('Ajouter une Photo')).toBeInTheDocument()
  })
})