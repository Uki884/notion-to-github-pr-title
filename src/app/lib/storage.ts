type Storage = {
  authToken: string;
  databaseId: string;
};

const defaultStorage: Storage = {
  authToken: "",
  databaseId: "",
};

export const storage = {
  get: (): Promise<Storage> =>
    chrome.storage.sync.get(defaultStorage) as Promise<Storage>,
  set: (value: Storage): Promise<void> => chrome.storage.sync.set(value),
};
