window.addEventListener("load", () => {
  waitForElementToDisplay('#head-ref-selector', () => {
    const selector = document.querySelector('#head-ref-selector');
    const element = selector?.querySelector('.Button-label .css-truncate-target') as HTMLElement;
    const branchName = element ? element.textContent : null;
    if (branchName) {
      chrome.runtime.sendMessage({ action: "getBranchName", branchName });
    }
  });
}, false);


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

function waitForElementToDisplay(selector: any, callback: (e: HTMLElement) => void) {
  console.log('waiting for element', selector);

  if(document.querySelector(selector)!=null) {
      callback(selector);
      return;
  }
  else {
    setTimeout(function() {
      waitForElementToDisplay(selector, callback);
    }, 300);
  }
}
