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

  switch (request.action) {
    case "getBranchName": {
      const extractedBranch = extractBranch(request.branchName);

      if (!extractedBranch) {
        branchError();
        return false;
      }

      const { uniqueId, taskId } = extractedBranch;

      const title = await getTaskTitle({ uniqueId: uniqueId });
      setTitle(title + `[${taskId}]`);
      return true;
    }
    default: {
      console.error("Invalid action");
      return false;
    }
  }
});

const extractBranch = (branchName: string) => {
  const extractedBranchName = extractBranchName(branchName);

  if (!extractedBranchName) {
    console.error("Branch suffix not found");
    return undefined;
  }

  const { uniqueId, taskId, suffix } = extractedBranchName;
  console.log(
    `suffix: 「${suffix}」 uniqueId: 「${uniqueId}」 taskId: 「${taskId}」`,
  );

  if (!uniqueId) {
    console.error("uniqueId not found");
    return undefined;
  }

  return { uniqueId, taskId, suffix };
};

const setTitle = (title: string) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0].id) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "setTitle", title },
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
};

const branchError = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0].id) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "branchError" },
      );
    }
  });
};

const extractBranchName = (branchName: string) => {
  console.log(`Branch name: ${branchName}`);

  const match = branchName.match(/(SGN)-(\d+)/);

  console.log(`Match: ${match}`);

  return match
    ? { taskId: match[0], suffix: match[1], uniqueId: Number(match[2]) }
    : null;
};
