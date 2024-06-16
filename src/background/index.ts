import { notionApi } from "@/notionApiClient";
import { storage } from "@/app/lib/storage";

const suffix = 'SGN';

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

    const extractedBranchName = extractBranchName(branchName);

    if (!extractedBranchName) {
      console.error("Branch suffix not found");
      return false;
    }

    const { uniqueId, taskId, suffix } = extractedBranchName;

    console.log(`suffix: 「${suffix}」 uniqueId: 「${uniqueId}」 taskId: 「${taskId}」`);

    if (!uniqueId) {
      console.error("uniqueId not found");
      return false;
    }
  
    getTaskTitle({ uniqueId: uniqueId }).then((title) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0].id) {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { action: "setTitle", title: title + `[${taskId}]` },
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

const extractBranchName = (branchName: string) => {
  console.log(`Branch name: ${branchName}`);

  const match = branchName.match(/(SGN)-(\d+)/);

  console.log(`Match: ${match}`);

  return match ? { taskId: match[0], suffix: match[1], uniqueId: Number(match[2]) } : null;
};
