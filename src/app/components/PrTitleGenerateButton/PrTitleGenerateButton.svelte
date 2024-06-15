<script lang="ts">
  import { Button } from 'flowbite-svelte';

  const handleGenerate = () => {
    const selector = document.querySelector("#head-ref-selector");
    const element = selector?.querySelector(
      ".Button-label .css-truncate-target",
    ) as HTMLElement;
    const branchName = element ? element.textContent : null;
    console.log('branchName', branchName);

    if (branchName) {
      chrome.runtime.sendMessage({ action: "getBranchName", branchName });
    }
  }
</script>

<style>
  .container {
    width: 160px;
    display: flex;
    justify-content: flex-end;
  }
</style>

<div class="container">
  <Button color="dark" on:click={handleGenerate} size="sm">タイトル自動入力</Button>
</div>

