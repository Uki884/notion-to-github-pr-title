type Storage = {
  authToken: string;
  databaseId: string;
  isAutoInsert: boolean;
};

const defaultStorage: Storage = {
  authToken: "",
  databaseId: "",
  isAutoInsert: false,
};

export const storage = {
  get: (): Promise<Storage> =>
    chrome.storage.sync.get(defaultStorage) as Promise<Storage>,
  set: (value: Storage): Promise<void> => chrome.storage.sync.set(value),
};
