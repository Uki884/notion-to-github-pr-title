import { useEffect } from "react";
import { useBookmarkStore } from "../../stores/bookmarkStore";
import { useSpaceStore } from "../../stores/spaceStore";
import { NavLink } from "@mantine/core";

export const BookmarkList = () => {
  const fetchBookmarks = useBookmarkStore((state) => state.fetchBookmarks)
  const bookmarks = useBookmarkStore((state) => state.bookmarks)
  const selectedSpaceId = useSpaceStore((state) => state.selectedSpaceId);

  useEffect(() => {
    fetchBookmarks(selectedSpaceId);
  }, [selectedSpaceId]);

  const pageIcon = (iconString?: string) => {
    // 何もない場合は何も表示しない
    if (!iconString) {
      return null
    }

    // urlの場合は何も表示しない
    if (iconString.match(/http/)) {
      return null
    }

    return <div>{iconString}</div>
  }

  return (
    <>
      {bookmarks.map((bookmark) => {
        console.log('bookmark', bookmark)
        const title = bookmark?.properties ? bookmark?.properties?.title[0][0] : "";
        return (
          <NavLink
            href={`https://www.notion.so/${bookmark.id.replace(/-/g, "")}`}
            label={ title }
            target="_blank"
            leftSection={pageIcon(bookmark?.format?.page_icon)}
          />
        );
      })}
    </>
  )
};
