
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Connection } from './Connection'
import { ConnectionStatusProvider } from '../../contextProvider/ConnectionStatusContextProvider'

// Mock the context
const mockSetConnectionAttributes = vi.fn()
const mockConnectionAttributes = {
  invalidConnection: true,
  adminConnection: false,
  invalidToken: false
}

vi.mock('../../contextProvider/ConnectionStatusContextProvider', () => ({
  useConnectionStatus: () => ({
    connectionAttributes: mockConnectionAttributes,
    setConnectionAttributes: mockSetConnectionAttributes
  }),
  ConnectionStatusProvider: ({ children }) => <div>{children}</div>
}))

// Setup component wrapper with required providers
const renderComponent = () => {
  return render(
    <BrowserRouter>
      <ConnectionStatusProvider>
        <Connection />
      </ConnectionStatusProvider>
    </BrowserRouter>
  )
}

describe('Connection Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock the environment variable
    vi.stubGlobal('import.meta', { env: { VITE_API_URL: 'localhost:3000' } })
    // Reset fetch mock
    global.fetch = vi.fn()
    // Clear localStorage
    localStorage.clear()
  })

  it('should render login form when invalidConnection is true', () => {
    renderComponent()
    
    expect(screen.getByLabelText(/Votre Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Mot de Passe/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument()
  })

  it('should handle user input correctly', () => {
    renderComponent()
    
    const emailInput = screen.getByLabelText(/Votre Email/i)
    const passwordInput = screen.getByLabelText(/Mot de Passe/i)
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    
    expect(emailInput.value).toBe('test@example.com')
    expect(passwordInput.value).toBe('password123')
  })

  it('should handle successful login', async () => {
    const mockUser = {
      userFirstName: 'John',
      adminStatus: false
    }
    const mockToken = 'mock-token'

    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ user: mockUser, token: mockToken })
    })

    renderComponent()
    
    const emailInput = screen.getByLabelText(/Votre Email/i)
    const passwordInput = screen.getByLabelText(/Mot de Passe/i)
    const loginButton = screen.getByRole('button', { name: /Login/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(mockSetConnectionAttributes).toHaveBeenCalledWith({
        connectedUserFirstName: 'John',
        adminConnection: false,
        invalidToken: false
      })
    })

    expect(localStorage.getItem('token')).toBe(mockToken)
    expect(JSON.parse(localStorage.getItem('connectionAttributes'))).toEqual({
      connectedUserFirstName: 'John',
      adminConnection: false,
      invalidToken: false
    })
  })

  it('should handle failed login', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 400
    })

    renderComponent()
    
    const emailInput = screen.getByLabelText(/Votre Email/i)
    const passwordInput = screen.getByLabelText(/Mot de Passe/i)
    const loginButton = screen.getByRole('button', { name: /Login/i })

    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } })
    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(mockSetConnectionAttributes).toHaveBeenCalledWith(expect.objectContaining({
        invalidConnection: true
      }))
    })

    expect(screen.getByText(/Compte Inconnu ou password Incorrect/i)).toBeInTheDocument()
  })

  it('should handle admin login', async () => {
    const mockUser = {
      userFirstName: 'Admin',
      adminStatus: true
    }
    const mockToken = 'admin-token'

    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ user: mockUser, token: mockToken })
    })

    renderComponent()
    
    const emailInput = screen.getByLabelText(/Votre Email/i)
    const passwordInput = screen.getByLabelText(/Mot de Passe/i)
    const loginButton = screen.getByRole('button', { name: /Login/i })

    fireEvent.change(emailInput, { target: { value: 'admin@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'adminpass' } })
    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(mockSetConnectionAttributes).toHaveBeenCalledWith({
        connectedUserFirstName: 'Admin',
        adminConnection: true,
        invalidToken: false
      })
    })
  })

  it('should clear input fields on focus when invalidConnection is true', () => {
    renderComponent()
    
    const emailInput = screen.getByLabelText(/Votre Email/i)
    const passwordInput = screen.getByLabelText(/Mot de Passe/i)

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    
    fireEvent.focus(emailInput)
    fireEvent.focus(passwordInput)

    expect(emailInput.value).toBe('')
    expect(passwordInput.value).toBe('')
  })
})