import { useEffect, useState } from 'react'
import './App.css'
import { NotionData } from './providers/NotionDataProvider';
import { notionApi } from './libs';
import { WorkSpaceSelect } from './features/WorkSpaceSelect';
import { useChromeStorage } from './hooks/useChromeStorage';
import { BookmarkList } from './features/BookmarkList';

type Props = {
  notionData: NotionData;
};

function App({ notionData }: Props) {
  const [spaces, setSpaces] = useState([] as any)
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const { bucket } = useChromeStorage();
  const { getUserSpaces, getBookmarks } = notionApi({
    token: notionData.token,
    notionUserId: notionData.notionUserId,
  });

  const handleFetchBookMarks = async (selectedSpaceId: string) => {
    if (!selectedSpaceId) {
      return;
    }
    const data = await getBookmarks({ spaceViewId: selectedSpaceId });
    setBookmarks(data);
  };

  useEffect(() => {
    (async () => {
      const value = await bucket.get();
      if (value.selectedSpaceId) {
        const data = await Promise.all([
          getUserSpaces(),
          handleFetchBookMarks(value.selectedSpaceId),
        ])
        setSpaces(data[0])
      }
    })();
  }, []);

  return (
    <div className="App">
      <WorkSpaceSelect spaces={spaces} onFetchBookMarks={handleFetchBookMarks} />
      <BookmarkList bookmarks={bookmarks} />
    </div>
  );
}

export default App
