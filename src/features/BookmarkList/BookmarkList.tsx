type Props = {
  bookmarks: any[];
};

export const BookmarkList = ({ bookmarks }: Props) => {
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
