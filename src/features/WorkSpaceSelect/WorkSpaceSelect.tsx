import { useEffect, useState } from "react";
import { useChromeStorage } from "../../hooks/useChromeStorage";
import { useSpaceStore } from "../../stores/spaceStore";
import { useBookmarkStore } from "../../stores/bookmarkStore";
import { Tabs, rem } from '@mantine/core';

export const WorkSpaceSelect = () => {
  const { bucket } = useChromeStorage();
  const fetchSpaces = useSpaceStore((state) => state.fetchSpaces)
  const fetchBookmarks = useBookmarkStore((state) => state.fetchBookmarks)
  const spaces = useSpaceStore((state) => state.spaces)
  const selectedSpaceId = useSpaceStore((state) => state.selectedSpaceId)
  const setSelectedSpaceId = useSpaceStore((state) => state.setSelectedSpaceId)

  useEffect(() => {
    fetchSpaces();
  }, []);

  const handleSpaceClick = async (space: any) => {
    await fetchBookmarks(space.view.spaceViewId);
    await bucket.set({ selectedSpaceId: space.view.spaceViewId });
  };

  return (
    <>
      <Tabs value={selectedSpaceId} onChange={(val) => val && setSelectedSpaceId(val)}>
        <Tabs.List>
          {spaces.map((space) => {
            return (
              <Tabs.Tab value={space.view.spaceViewId} key={space.id} onClick={() => handleSpaceClick(space)}>
                { space.icon && <img src={space.icon} alt={space.name} height={20} width={20} />}
                <div>{space.name}</div>
              </Tabs.Tab>
            )
          })}
        </Tabs.List>
      </Tabs>
    </>
  )
};