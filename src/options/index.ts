import "flowbite/dist/flowbite.css";

import Options from "@/app/components/Options/Options.svelte";
import { storage } from "@/app/lib/storage";

function render() {
  const target = document.getElementById("app");

  if (target) {
    storage.get().then(({ authToken = "", databaseId = "", isAutoInsert = true }) => {
      new Options({
        target,
        props: { authToken, databaseId, isAutoInsert },
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", render);
