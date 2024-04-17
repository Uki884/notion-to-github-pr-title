import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [json, setJson] = useState({} as any)

  function getCookies(domain: string, name: string, callback: any) {
    chrome.cookies.get({ url: domain, name: name }, function (cookie) {
      if (callback) {
        callback(cookie?.value);
      }
    });
  }

  useEffect(() => {
    getCookies(
      "https://www.notion.so",
      "token_v2",
      async function (token: string) {
        console.log(token);
        const res = await fetch(
          `https://www.notion.so/api/v3/getUserHomePages`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              // MEMO:Cookieいらないかも
              // cookie: `token_v2=token`,
            },
            body: JSON.stringify({
              // TODO: spaceViewIdを何らかの方法で取得する
              spaceViewId: "44aec8ed-07d7-4676-8a62-ec2153712e73",
            }),
          }
        );
        const resJson = await res.json();
        setJson(resJson);
        console.log(resJson.recordMap.space_view);
        // alert(id);
      }
    );
  }, []);


  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          data is {JSON.stringify(json?.recordMap?.space_view)}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App
