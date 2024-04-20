import { useEffect } from "react";
import { useBookmarkStore } from "../../stores/bookmarkStore";
import { useChromeStorage } from "../../hooks/useChromeStorage";

export const BookmarkList = () => {
  const { bucket } = useChromeStorage();
  const fetchBookmarks = useBookmarkStore((state) => state.fetchBookmarks)
  const bookmarks = useBookmarkStore((state) => state.bookmarks)

  useEffect(() => {
    (async () => {
      const value = await bucket.get();
      if (value.selectedSpaceId) {
        await fetchBookmarks(value.selectedSpaceId);
      }
    })();
  }, []);

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
