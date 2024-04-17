type Props = {
  token: string;
  notionUserId: string;
};

type ApiPaths = 'getSpaces' | 'getUserHomePages' | 'getPublicSpaceData';

export const notionApi = ({ token, notionUserId }: Props) => {

  const apiCall = async ({ apiPath, body }: { apiPath: ApiPaths, body?: object }) => {
    const res =  await fetch(
      `https://www.notion.so/api/v3/${apiPath}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          cookie: `token_v2=${token}`,
          'x-notion-active-user-header': notionUserId,
        },
        body: body ? JSON.stringify(body) : undefined,
      }
    );
    return await res.json();
  }

  const getSpaces = async () => {
    const res =  await apiCall({ apiPath: 'getSpaces' });
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
    console.log('spaceViews', spaceViews)
    const currentUserSpaceIds = Object.keys(currentUserSpace.space).map((key) => currentUserSpace.space[key]).map((space) => space.value.id)
    const speceViews = Object.keys(currentUserSpace.space_view).map((key) => ({ spaceViewId: key, spaceId: spaceViews[key].value.space_id}))

    const userSpaces = await Promise.all(currentUserSpaceIds.map(async (spaceId) => {
      const spaceData = await getSpace({ spaceId });
      return {
        ...spaceData,
        views: speceViews.find((view) => view.spaceId === spaceId)
      }
    }));  
  
    return userSpaces
  };

  const getSpace = async ({ spaceId }: { spaceId: string }) => {
    const res =  await apiCall({ apiPath: 'getPublicSpaceData', body: { spaceIds: [spaceId], type: "space-ids" } });
    return res.results[0];
  };

  return {
    getSpaces,
    getUserSpaces
  }
};
