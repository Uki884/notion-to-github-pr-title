import { create } from 'zustand'
import { notionApi } from '../libs'
import { useNotionStore } from './notionStore'
import { useSpaceStore } from './spaceStore'

type Bookmark = {
  id: string
  properties: {
    title: [[string]]
  }
}

interface BookmarkStoreState {
  bookmarks: Bookmark[]
  fetchBookmarks: (selectedSpaceId: string) => Promise<void>
}

export const useBookmarkStore = create<BookmarkStoreState>((set) => ({
  bookmarks: [],
  fetchBookmarks: async (selectedSpaceId: string) => {
    const notionStoreState = useNotionStore.getState();
    const { getBookmarks } = notionApi({ authToken: notionStoreState.authToken, notionUserId: notionStoreState.notionUserId});
    const bookmarks = await getBookmarks({ spaceViewId: selectedSpaceId });
    set({ bookmarks });
  }
}))
