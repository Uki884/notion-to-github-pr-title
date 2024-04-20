import { create } from 'zustand'
import { notionApi } from '../libs';
import { useNotionStore } from './notionStore';

type Space = {
  id: string
  name: string
  icon: string
  view: {
    spaceViewId: string
  }
}

type SpaceStoreState = {
  spaces: Space[]
  selectedSpaceId: string
  setSelectedSpaceId: (selectedSpaceId: string) => void
  fetchSpaces: () => Promise<void>
}

export const useSpaceStore = create<SpaceStoreState>((set) => ({
  spaces: [],
  selectedSpaceId: '',
  setSelectedSpaceId: (selectedSpaceId: string) => set({ selectedSpaceId }),
  fetchSpaces: async () => {
    const notionStoreState = useNotionStore.getState();
    const { getUserSpaces } = notionApi({ authToken: notionStoreState.authToken, notionUserId: notionStoreState.notionUserId});
    const spaces = await getUserSpaces();
    if (!spaces) {
      set({ spaces: [] });
      return;
    }
    set({ spaces });
  }
}))
