import "flowbite/dist/flowbite.css";

import PrTitleGenerateButton from '@/app/components/PrTitleGenerateButton/PrTitleGenerateButton.svelte';

console.log("Notion To Github PR Title loaded");

async function mountGenerateButton() {
  const targetElement = await waitForElement('#pull_request_title_header');
  console.log('targetElement', targetElement);

  if (targetElement) {
    targetElement.style.display = 'flex';
    targetElement.style.justifyContent = 'space-between';
    targetElement.style.alignItems = 'center';

    const mountPoint = document.createElement('div');
    targetElement.appendChild(mountPoint);

    new PrTitleGenerateButton({
      target: mountPoint,
    });
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "setTitle") {
    const inputElement = document.getElementById(
      "pull_request_title",
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = request.title;
      sendResponse({ status: "success" });
    } else {
      sendResponse({ status: "error", message: "Input element not found" });
    }
  }
});

function waitForElement(selector: string): Promise<HTMLElement> {
  return new Promise((resolve) => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        const element = document.querySelector(selector);
        if (element) {
          observer.disconnect();
          resolve(element as HTMLElement);
          break;
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // なぜかうまく動かないのでコメントアウトする
    // 既に存在する場合は即座に解決
    const element = document.querySelector(selector);
    if (element) {
      observer.disconnect();
      resolve(element as HTMLElement);
    }
  });
}

mountGenerateButton();
