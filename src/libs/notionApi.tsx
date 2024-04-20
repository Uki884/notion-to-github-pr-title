import { useNotionStore } from "../stores/notionStore";

type ApiPaths = 'getSpaces' | 'getUserHomePages' | 'getPublicSpaceData' | 'getRecordValues';

export const notionApi = () => {
  const authToken = useNotionStore((state) => state.authToken)
  const notionUserId = useNotionStore((state) => state.notionUserId)

  const getSpaces = async () => {
    const res =  await apiCall('getSpaces');
    return res;
  };

  const getUserSpaces = async () => {
    const spaces = await getSpaces();
    const currentUserSpaceId = Object.keys(spaces).find((key) => key == notionUserId);
    if (!currentUserSpaceId) {
      return;
    }

    const currentUserSpace = spaces[currentUserSpaceId];
    const spaceViews = currentUserSpace.space_view;
    const currentUserSpaces = Object.keys(currentUserSpace.space_view).map((spaceViewId) => ({ spaceViewId: spaceViewId, spaceId: spaceViews[spaceViewId].value.space_id}))
    const speceViews = Object.keys(currentUserSpace.space_view).map((key) => ({ spaceViewId: key, spaceId: spaceViews[key].value.space_id}))

    const userSpaces = await Promise.all(currentUserSpaces.map(async (space) => {
      const spaceData = await getSpace({ spaceId: space.spaceId });
      return {
        ...spaceData,
        view: speceViews.find((view) => view.spaceId === space.spaceId)
      }
    }));

    return userSpaces
  };

  const getSpace = async ({ spaceId }: { spaceId: string }) => {
    const res =  await apiCall('getPublicSpaceData', { spaceIds: [spaceId], type: "space-ids" });
    return res.results[0];
  };

  const getBookmarks = async ({ spaceViewId }: { spaceViewId: string }) => {
    const res = await apiCall('getUserHomePages',{ spaceViewId });
    const bookmarkPageIds: any[] =
      res?.recordMap?.space_view[spaceViewId]?.value?.bookmarked_pages || [];

    const results = await getRecordValues(
      bookmarkPageIds.map((id) => ({ table: "block", id }))
    ) as any[];

    const pages = (results || [])
      .filter((result) => result.value)
      .map((result) => result.value);

    console.log("results", pages);

    return pages;
  };

  const getRecordValues = async (
    body: Array<{
      table: string;
      id: string;
    }>
  ) => {
    const response = await apiCall("getRecordValues", { requests: body });
    return response.results;
  }

    const apiCall = async (apiPath: ApiPaths, body?: object) => {
      const res = await fetch(`https://www.notion.so/api/v3/${apiPath}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          cookie: `token_v2=${authToken}`,
          "x-notion-active-user-header": notionUserId,
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      return await res.json();
    };

  return {
    getSpaces,
    getUserSpaces,
    getBookmarks,
  };
};
