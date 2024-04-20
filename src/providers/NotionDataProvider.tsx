import { useEffect, useState } from "react";
import { getCookies } from "../utils";
import { useNotionStore } from "../stores/notionStore";


export type NotionData = {
  token: string;
  notionUserId: string;
};

type Props = {
  children: React.ReactNode;
}

export const NotionDataProvider = ({ children }: Props) => {
  const [isLoading, setLoading] = useState(true);
  const setAuthToken = useNotionStore((state) => state.setAuthToken)
  const setNotionUserId = useNotionStore((state) => state.setNotionUserId)

  useEffect(() => {
    const getToken = async () => {
      getCookies('https://www.notion.so', (cookie) => {
        const token = cookie.find((c) => c.name === 'token_v2')?.value || '';
        const notionUserId = cookie.find((c) => c.name === 'notion_user_id')?.value || '';
        setAuthToken(token);
        setNotionUserId(notionUserId);
        setLoading(false);
      });
    };

    getToken();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;  // または他のローディング表示
  }

  return <>{children}</>;
};
