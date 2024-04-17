import { useEffect, useState } from "react";
import { getCookies } from "../utils";


export type NotionData = {
  token: string;
  notionUserId: string;
};

type Props = {
  children: ({ notionData }: { notionData: NotionData }) => React.ReactNode;
}

export const NotionDataProvider = ({ children }: Props) => {
  const [notionData, setNotionData] = useState<NotionData>({ token: '', notionUserId: '' });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getToken = async () => {
      getCookies('https://www.notion.so', (cookie) => {
        const token = cookie.find((c) => c.name === 'token_v2')?.value || '';
        const notionUserId = cookie.find((c) => c.name === 'notion_user_id')?.value || '';
        setNotionData({ token, notionUserId });
        setLoading(false);
      });
    };

    getToken();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;  // または他のローディング表示
  }

  if (!notionData.token || !notionData.notionUserId) {
    return <div>Notion data not found</div>;
  }

  return <>{children({ notionData })}</>;
};
