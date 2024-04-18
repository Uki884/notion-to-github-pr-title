import { useEffect, useState } from 'react'
import './App.css'
import { NotionData } from './providers/NotionDataProvider';
import { notionApi } from './libs';

type Props = {
  notionData: NotionData;
};

function App({ notionData }: Props) {
  console.log('app token', notionData)
  const [spaces, setSpaces] = useState([] as any)
  const [selectedSpaceId, setSelectedSpaceId] = useState<string>("" as string)
  const [selectedSpace, setSelectedSpace] = useState<any>({})
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const { getUserSpaces, getBookmarks } = notionApi({
    token: notionData.token,
    notionUserId: notionData.notionUserId,
  });

  useEffect(() => {
    const fetch = async () => {
      const data = await getUserSpaces();
      console.log('data', data)
      setSpaces(data)
    }
    fetch()
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (!selectedSpace) {
        return;
      }
      const data = await getBookmarks({ spaceViewId: selectedSpace.view.spaceViewId });
      setBookmarks(data);
    };
    fetch();
  }, [selectedSpace]);

  const handleSpaceClick = async (space: any) => {
    console.log('space', space)
    // TODO: chromeのstorageに保存
    setSelectedSpace(space)
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
        return (
          <div key={bookmark.id}>
            <a
              href={`https://www.notion.so/${bookmark.id.replace(/-/g, "")}`}
              target="_blank"
              rel="noreferrer"
            >
              a
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default App
