import './App.css';
import { WorkSpaceSelect } from './features/WorkSpaceSelect';
import { BookmarkList } from './features/BookmarkList';
import { useEffect } from 'react';
import { useChromeStorage } from './hooks/useChromeStorage';
import { useSpaceStore } from './stores/spaceStore';

function App() {
  const { bucket } = useChromeStorage();
  const setSelectedSpaceId = useSpaceStore((state) => state.setSelectedSpaceId);

  useEffect(() => {
    (async () => {
      const value = await bucket.get();
      if (value.selectedSpaceId) {
        setSelectedSpaceId(value.selectedSpaceId)
      }
    })();
  }, []);

  return (
    <div className="App">
      <WorkSpaceSelect />
      <BookmarkList />
    </div>
  );
}

export default App
