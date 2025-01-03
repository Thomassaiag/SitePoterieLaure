import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CreateCollection } from './CreateCollection'
import { vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { ConnectionStatusProvider } from '../../contextProvider/ConnectionStatusContextProvider'
import { CollectionElementInformationsProvider } from '../../contextProvider/CollectionElementInformationsContextProvider'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

describe('CreateCollection Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    global.fetch = vi.fn()
  })

  const renderComponent = () => {
    render(
      <BrowserRouter>
        <ConnectionStatusProvider>
          <CollectionElementInformationsProvider>
            <CreateCollection />
          </CollectionElementInformationsProvider>
        </ConnectionStatusProvider>
      </BrowserRouter>
    )
  }

  it('creates collection and collection elements successfully', async () => {
    localStorage.setItem('token', 'test-token')
    const mockCollectionResponse = {
      ok: true,
      json: () => Promise.resolve({ 
        message: { 
          collection_uid: 'test-uid',
          collection_title: 'Test Title'
        }
      })
    }
    const mockElementResponse = {
      ok: true,
      json: () => Promise.resolve({ message: 'success' })
    }

    global.fetch
      .mockImplementationOnce(() => Promise.resolve(mockCollectionResponse))
      .mockImplementationOnce(() => Promise.resolve(mockElementResponse))
      .mockImplementationOnce(() => Promise.resolve(mockElementResponse))

    renderComponent()

    // Fill main collection form
    const titleInput = screen.getByLabelText(/nom de la collection/i)
    const descInput = screen.getByLabelText(/titre de la collection/i)
    const fileInput = screen.getByLabelText(/image principale/i)

    fireEvent.change(titleInput, { target: { value: 'Test Collection' } })
    fireEvent.change(descInput, { target: { value: 'Test Description' } })
    fireEvent.change(fileInput, { target: { files: [new File(['test'], 'test.png')] } })

    // Submit main form
    const mainButton = screen.getByText(/ajouter les détails/i)
    fireEvent.click(mainButton)

    // Fill collection element form
    const descriptionArea = screen.getByLabelText(/en quelques mots/i)
    const emailInput = screen.getByLabelText(/émail/i)
    const cookingInput = screen.getByLabelText(/cuisson/i)
    const recoInput = screen.getByLabelText(/recommandations/i)

    fireEvent.change(descriptionArea, { target: { value: 'Test Description' } })
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
    fireEvent.change(cookingInput, { target: { value: 'Test Cooking' } })
    fireEvent.change(recoInput, { target: { value: 'Test Recommendation' } })

    // Submit element form
    const elementButton = screen.getByText(/ajouter les élements/i)
    fireEvent.click(elementButton)

    await waitFor(() => {
      expect(screen.getByText(/la collection a été créée avec succès/i)).toBeInTheDocument()
    })

    expect(global.fetch).toHaveBeenCalledTimes(3)
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('handles unauthorized error', async () => {
    localStorage.setItem('token', 'invalid-token')
    global.fetch.mockImplementationOnce(() => Promise.resolve({
      status: 401,
      ok: false
    }))

    renderComponent()

    // Fill and submit forms
    const mainForm = screen.getByLabelText(/nom de la collection/i)
    fireEvent.change(mainForm, { target: { value: 'Test' } })
    fireEvent.click(screen.getByText(/ajouter les détails/i))

    const elementForm = screen.getByLabelText(/en quelques mots/i)
    fireEvent.change(elementForm, { target: { value: 'Test' } })
    fireEvent.click(screen.getByText(/ajouter les élements/i))

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalled()
      expect(screen.getByText(/la collection n'a été créée/i)).toBeInTheDocument()
    })
  })
})