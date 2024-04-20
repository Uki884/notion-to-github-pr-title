import { useChromeStorage } from "../../hooks/useChromeStorage";

type Props = {
  spaces: any[];
  onFetchBookMarks: (selectedSpaceId: string) => Promise<void>;
}

export const WorkSpaceSelect = ({ spaces, onFetchBookMarks }: Props) => {
  const { bucket } = useChromeStorage();

  const handleSpaceClick = async (space: any) => {
    await onFetchBookMarks(space.view.spaceViewId);
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