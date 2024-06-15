import "flowbite/dist/flowbite.css";

import PrTitleGenerateButton from "@/app/components/PrTitleGenerateButton/PrTitleGenerateButton.svelte";
import { waitForElement } from "./waitForElement";

console.log("Notion To Github PR Title loaded");

async function mountGenerateButton() {
  const targetElement = await waitForElement("#pull_request_title_header");
  console.log("targetElement", targetElement);

  if (targetElement) {
    targetElement.style.display = "flex";
    targetElement.style.justifyContent = "space-between";
    targetElement.style.alignItems = "center";

    const mountPoint = document.createElement("div");
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

mountGenerateButton();
