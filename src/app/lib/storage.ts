type Storage = {
  count: number;
};

const defaultStorage: Storage = {
  count: 0,
};

export const storage = {
  get: (): Promise<Storage> =>
      chrome.storage.sync.get(defaultStorage) as Promise<Storage>,
  set: (value: Storage): Promise<void> => chrome.storage.sync.set(value),
};
