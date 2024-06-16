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

mountGenerateButton();
