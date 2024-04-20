import { useEffect } from "react";
import { useBookmarkStore } from "../../stores/bookmarkStore";
import { useSpaceStore } from "../../stores/spaceStore";

export const BookmarkList = () => {
  const fetchBookmarks = useBookmarkStore((state) => state.fetchBookmarks)
  const bookmarks = useBookmarkStore((state) => state.bookmarks)
  const selectedSpaceId = useSpaceStore((state) => state.selectedSpaceId);

  useEffect(() => {
    fetchBookmarks(selectedSpaceId);
  }, [selectedSpaceId]);

  return (
    <>
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
    </>
  )
};
