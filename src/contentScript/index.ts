(function() {
  const container = document.getElementById('head-ref-selector');
  if (container) {
    const element = container.querySelector('.Button-label .css-truncate-target') as HTMLElement;
    const branchName = element ? element.textContent : null;
    if (branchName) {
      chrome.runtime.sendMessage({ action: "getBranchName", branchName });
    }
  }
})();


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "setTitle") {
    const inputElement = document.getElementById('pull_request_title') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = request.title;
      sendResponse({ status: 'success' });
    } else {
      sendResponse({ status: 'error', message: 'Input element not found' });
    }
  }
});