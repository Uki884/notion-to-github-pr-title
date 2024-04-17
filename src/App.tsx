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
  const [selectedSpace, setSelectedSpace] = useState<string>("" as string)
  const [json, setJson] = useState({} as any)
  const { getUserSpaces } = notionApi({ token: notionData.token, notionUserId: notionData.notionUserId })

  useEffect(() => {
    const fetch = async () => {
      const data = await getUserSpaces();
      console.log('data', data)
      setSpaces(data)
    }
    fetch()
  }, []);

  useEffect(() => {

  }, [selectedSpaceId])

  return (
    <div className="App">
      { spaces.map((space: any) => (
        <div key={space.id}>
          <img src={space.icon} alt={space.name} />
          <button onClick={() => setSelectedSpaceId(space.id)}>{space.name}</button>
        </div>
      )) }
    </div>
  );
}

export default App
