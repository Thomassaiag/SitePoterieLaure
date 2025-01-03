import { describe, it, expect, vi, beforeEach } from 'vitest'
import {fetchNextPreviousCollection} from './CollectionElement'

describe('fetchNextPreviousCollection', () => {
  const apiUrl = 'example.com'
  const newId = '123'
  const setPreviousCollectionPicture = vi.fn()
  const setNextCollectionPicture = vi.fn()
  
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should set previous and next collection pictures when API returns valid data', async () => {
    const mockData = [{ id: 'prev' }, { id: 'next' }]
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData)
    })

    await fetchNextPreviousCollection()

    expect(fetch).toHaveBeenCalledWith(`http://${apiUrl}/collections/${newId}/collection`)
    expect(setPreviousCollectionPicture).toHaveBeenCalledWith(mockData[0])
    expect(setNextCollectionPicture).toHaveBeenCalledWith(mockData[1])
  })

  it('should throw error when API response is not ok', async () => {
    const consoleSpy = vi.spyOn(console, 'error')
    global.fetch = vi.fn().mockResolvedValue({
      ok: false
    })

    await fetchNextPreviousCollection()

    expect(consoleSpy).toHaveBeenCalled()
    expect(setPreviousCollectionPicture).not.toHaveBeenCalled()
    expect(setNextCollectionPicture).not.toHaveBeenCalled()
  })

  it('should throw error when API returns invalid data format', async () => {
    const consoleSpy = vi.spyOn(console, 'error')
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([])  // Empty array
    })

    await fetchNextPreviousCollection()

    expect(consoleSpy).toHaveBeenCalled()
    expect(setPreviousCollectionPicture).not.toHaveBeenCalled()
    expect(setNextCollectionPicture).not.toHaveBeenCalled()
  })
})