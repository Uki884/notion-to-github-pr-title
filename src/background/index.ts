import { notionApi } from "@/notionApiClient";
import { storage } from "@/app/lib/storage";

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  const storageData = await storage.get();

  if (!storageData.authToken || !storageData.databaseId) {
    console.error("Auth token or database id not found");
    return false;
  }

  const { getTaskTitle } = notionApi({
    authToken: storageData.authToken,
    databaseId: storageData.databaseId,
  });

  if (request.action === "getBranchName") {
    const branchName = request.branchName;
    const branchSuffix = extractBranchSuffix(branchName);

    if (!branchSuffix) {
      console.error("Branch suffix not found");
      return false;
    }

    const match = branchName.match(/\d+/);
    const uniqueId = Number(match[0]);
    getTaskTitle({ uniqueId: uniqueId }).then((title) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0].id) {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { action: "setTitle", title: title + `[${branchSuffix}]` },
            (response) => {
              if (response.status === "success") {
                console.log("Title set successfully");
              } else {
                console.error("Error setting title:", response.message);
              }
            },
          );
        }
      });
    });
    return true;
  }
  return true;
});

const extractBranchSuffix = (branchName: string): string | null => {
  const match = branchName.match(/SGN-\d+/);
  return match ? match[0] : null;
};
