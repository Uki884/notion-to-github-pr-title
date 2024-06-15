import Options from "@/app/components/Options/Options.svelte";
import { storage } from "@/app/lib/storage";

function render() {
  const target = document.getElementById("app");

  if (target) {
    storage.get().then(({ count }) => {
      new Options({
          target,
          props: { count },
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", render);
