import { useEffect } from "react";
import { useChromeStorage } from "../../hooks/useChromeStorage";
import { useSpaceStore } from "../../stores/spaceStore";
import { useBookmarkStore } from "../../stores/bookmarkStore";

export const WorkSpaceSelect = () => {
  const { bucket } = useChromeStorage();
  const fetchSpaces = useSpaceStore((state) => state.fetchSpaces)
  const fetchBookmarks = useBookmarkStore((state) => state.fetchBookmarks)
  const spaces = useSpaceStore((state) => state.spaces)

  useEffect(() => {
    fetchSpaces();
  }, []);

  const handleSpaceClick = async (space: any) => {
    await fetchBookmarks(space.view.spaceViewId);
    await bucket.set({ selectedSpaceId: space.view.spaceViewId });
  };

  return (
    <>
      {spaces.map((space: any) => {
        return (<div key={space.id}>
          { space.icon && <img src={space.icon} alt={space.name} height={20} width={20} />}
          <button onClick={() => handleSpaceClick(space)}>{space.name}</button>
        </div>)
      })}
    </>
  )
};