<script lang="ts">
  import { storage } from "@/app/lib/storage";
  import { Button, Input, Label, Helper, Alert, Checkbox} from "flowbite-svelte";
  export let authToken: string = "";
  export let databaseId: string = "";
  export let isAutoInsert: boolean = true;

  let successMessage: string | null = null;

  function save() {
    storage.set({ authToken, databaseId, isAutoInsert }).then(() => {
      successMessage = "保存しました";
      setTimeout(() => {
        successMessage = null;
      }, 1500);
    });
  }
</script>

<div class="container">
  {#if successMessage}
    <Alert color="green">
      <span class="font-medium">{successMessage}</span>
    </Alert>
  {/if}

  <div >
    <h1 class="text-2xl font-bold">Notion To Github PR Title Options</h1>
  </div>

  <form class="forms mt-4">
    <div>
      <Label for="authToken" class="mb-2">Notion API Key</Label>
      <Input
        bind:value={authToken}
        type="text"
        id="authToken"
        required
        placeholder="APITokenを入力してください"
      />
      <Helper class="mt-2">
        <p>
          NotionAPIキーは<a
            href="https://www.notion.so/my-integrations"
            class='link'
            target="_blank">こちら</a
          >から入手できます
        </p>
        <p>例: 「secret_****************************」</p>
      </Helper>
    </div>

    <div>
      <Label for="databaseId" class="mb-2">Notion Task DataBase ID</Label>
      <Input
        bind:value={databaseId}
        type="text"
        id="databaseId"
        required
        placeholder="Database IDを入力してください"
      />
      <Helper class="mt-2">
        <p>
          例:
          https://www.notion.so/5f13a2e971ac4cec98cef9fb83599f63pの場合は「5f13a2e971ac4cec98cef9fb83599f63p」がDatabase IDになります
        </p>
      </Helper>
    </div>

    <div>
      <Checkbox
        bind:checked={isAutoInsert}
      >自動入力モード</Checkbox>
      <Helper class="mt-2">
        <p>
          無効にすると自動でPRタイトルを入力されなくなります。
        </p>
      </Helper>
    </div>

    <Button on:click={save} size="lg" color="dark" class="w-50">保存</Button>
  </form>
</div>

<style>
  .container {
    min-width: 500px;
    padding: 20px;
  }

  .link {
    font-weight: bold;
  }

  .forms {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>
