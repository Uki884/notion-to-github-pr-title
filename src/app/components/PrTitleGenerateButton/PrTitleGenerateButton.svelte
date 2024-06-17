<script lang="ts">
  import { Button, Spinner } from "flowbite-svelte";
  import { onMount } from "svelte";

  let isLoading = false;
  let errorMessage = "";

  const handleGenerate = () => {
    isLoading = true;
    const selector = document.querySelector("#head-ref-selector");
    const element = selector?.querySelector(
      ".Button-label .css-truncate-target",
    ) as HTMLElement;
    const branchName = element ? element.textContent : null;
    console.log("branchName", branchName);

    if (branchName) {
      chrome.runtime.sendMessage({ action: "getBranchName", branchName });
    }
  };

  onMount(() => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      console.log("request", request);
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
        isLoading = false; // メッセージ受信後にローディングを終了
      }

      if (request.action === "branchError") {
        isLoading = false; // エラー時にローディングを終了
        errorMessage = 'ブランチ名からタスクIDが取得できませんでした。';
      }
    });
  });
</script>

<div class="container">
  <Button color="dark" on:click={handleGenerate} size="sm" {isLoading}>
    {#if isLoading}
      <Spinner class="me-3" size="4" color="white" />生成中...
    {:else}
      PRタイトル生成
    {/if}
  </Button>
  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}
</div>

<style>
  .container {
    width: 160px;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
  }

  .error {
    font-size: 12px;
    color: red;
    margin: 0;
    margin-top: 4px;
  }
</style>
