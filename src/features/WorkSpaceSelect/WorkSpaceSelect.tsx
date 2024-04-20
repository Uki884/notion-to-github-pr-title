import { useState } from "react";
import { useChromeStorage } from "../../hooks/useChromeStorage";

type Props = {
  spaces: any[];
  onFetchBookMarks: (selectedSpaceId: string) => void;
}

export const WorkSpaceSelect = ({ spaces, onFetchBookMarks }: Props) => {
  const { bucket } = useChromeStorage();

  const handleSpaceClick = async (space: any) => {
    bucket.set({ selectedSpaceId: space.view.spaceViewId });
    onFetchBookMarks(space.view.spaceViewId);
  };

  return (
    <>
      {spaces.map((space: any) => (
        <div key={space.id}>
          {/* <img src={space.icon} alt={space.name} /> */}
          <button onClick={() => handleSpaceClick(space)}>{space.name}</button>
        </div>
      ))}
    </>
  )
};