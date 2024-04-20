import './App.css';
import { WorkSpaceSelect } from './features/WorkSpaceSelect';
import { BookmarkList } from './features/BookmarkList';

function App() {
  return (
    <div className="App">
      <WorkSpaceSelect />
      <BookmarkList />
    </div>
  );
}

export default App
