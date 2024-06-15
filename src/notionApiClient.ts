import { Client } from "@notionhq/client";

const DATABASE_ID = "5f13a2e971ac4cec98cef9fb83599f64";

type Options = {
  databaseId: string;
  authToken: string;
}

export const notionApi = ({ }: Options = {}) => {
  const notion = new Client({
    auth: "",
  });

  const getTaskTitle = async ({ uniqueId }: { uniqueId: number }) => {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        "property": "ID",
        "unique_id": {
          equals: uniqueId
        }
      },
    });
  
    const title = (response.results[0] as any).properties["タスク名"].rich_text[0]
    .plain_text as string;
  
    return title;
  };

  return {
    getTaskTitle,
  }
}


