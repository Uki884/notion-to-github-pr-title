import { create } from 'zustand'

interface NotionStoreState {
  authToken: string
  notionUserId: string
  setAuthToken: (authToken: string) => void
  setNotionUserId: (notionUserId: string) => void
}

export const useNotionStore = create<NotionStoreState>((set) => ({
  authToken: '',
  notionUserId: '',
  setAuthToken: (authToken: string) => set({ authToken }),
  setNotionUserId: (notionUserId: string) => set({ notionUserId }),
}))
