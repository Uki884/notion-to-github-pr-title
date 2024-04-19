import { useEffect, useState } from 'react'
import './App.css'
import { NotionData } from './providers/NotionDataProvider';
import { notionApi } from './libs';
import { getBucket } from '@extend-chrome/storage';

type Props = {
  notionData: NotionData;
};

interface MyBucket {
  selectedSpaceId: string | null;
}

const bucket = getBucket<MyBucket>('my_bucket', 'sync');

function App({ notionData }: Props) {
  const [spaces, setSpaces] = useState([] as any)
  const [selectedSpaceId, setSelectedSpaceId] = useState<string>("" as string)
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const { getUserSpaces, getBookmarks } = notionApi({
    token: notionData.token,
    notionUserId: notionData.notionUserId,
  });

  useEffect(() => {
    (async () => {
      const value = await bucket.get();
      console.log('selectedSpaceId', selectedSpaceId)
      if (value.selectedSpaceId) {
        setSelectedSpaceId(value.selectedSpaceId);
      }
    })();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const data = await getUserSpaces();
      setSpaces(data)
    }
    fetch()
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (!selectedSpaceId) {
        return;
      }
      const data = await getBookmarks({ spaceViewId: selectedSpaceId });
      setBookmarks(data);
    };
    fetch();
  }, [selectedSpaceId]);

  const handleSpaceClick = async (space: any) => {
    // TODO: chromeのstorageに保存
    bucket.set({ selectedSpaceId: space.view.spaceViewId });
    setSelectedSpaceId(space.view.spaceViewId);
  };

  return (
    <div className="App">
      {spaces.map((space: any) => (
        <div key={space.id}>
          {/* <img src={space.icon} alt={space.name} /> */}
          <button onClick={() => handleSpaceClick(space)}>{space.name}</button>
        </div>
      ))}
      {bookmarks.map((bookmark) => {
        const title = bookmark?.properties ? bookmark?.properties?.title[0][0] : "";
        return (
          <div key={bookmark.id}>
            <a
              href={`https://www.notion.so/${bookmark.id.replace(/-/g, "")}`}
              target="_blank"
              rel="noreferrer"
            >
              { title }
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default App
