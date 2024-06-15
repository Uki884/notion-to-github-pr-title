import "flowbite/dist/flowbite.css";

import Options from "@/app/components/Options/Options.svelte";
import { storage } from "@/app/lib/storage";

function render() {
  const target = document.getElementById("app");

  if (target) {
    storage.get().then(({ authToken = "", databaseId = "" }) => {
      new Options({
        target,
        props: { authToken, databaseId },
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", render);
