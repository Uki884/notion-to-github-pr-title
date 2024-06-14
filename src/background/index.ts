import { getTitle } from '../../libs/notionhqClient';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getBranchName") {
    const branchName = request.branchName;
    const branchSuffix = extractBranchSuffix(branchName);
    if (!branchSuffix) {
      console.error('Branch suffix not found');
      return false;
    }

    const match = branchName.match(/\d+/);
    const uniqueId = Number(match[0]);
    
    getTitle({ uniqueId: uniqueId }).then((title) => {
      
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0].id) {
          chrome.tabs.sendMessage(tabs[0].id, { action: "setTitle", title: title + `[${branchSuffix}]` }, (response) => {
            if (response.status === 'success') {
              console.log('Title set successfully');
            } else {
              console.error('Error setting title:', response.message);
            }
          });
        }
      });
    });

    return true;
  }
});

const extractBranchSuffix = (branchName: string): string | null => {
  const match = branchName.match(/SGN-\d+/);
  return match ? match[0] : null;
};