import { Client } from "@notionhq/client";

type Options = {
  databaseId: string;
  authToken: string;
};

export const notionApi = (
  { authToken, databaseId }: Options = { databaseId: "", authToken: "" },
) => {
  const notion = new Client({
    auth: authToken,
  });

  const getTaskTitle = async ({ uniqueId }: { uniqueId: number }) => {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "ID",
        unique_id: {
          equals: uniqueId,
        },
      },
    });

    const title = (response.results[0] as any).properties["タスク名"]
      .rich_text[0].plain_text as string;

    return title;
  };

  return {
    getTaskTitle,
  };
};
