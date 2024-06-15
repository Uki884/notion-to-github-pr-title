<script lang="ts">
  import { storage } from "@/app/lib/storage";

  export let authToken: string = "";
  export let databaseId: string = "";

  let successMessage: string | null = null;

  function save() {
    storage.set({ authToken, databaseId }).then(() => {
      successMessage = "Options saved!";
      setTimeout(() => {
          successMessage = null;
      }, 1500);
    });
  }
  
</script>

<div class="container">
  <div>
      <label for="authToken">Notion API Key</label>
      <input type="text" id="authToken" bind:value={authToken} placeholder="enter your token" />
  </div>
  <div>
      <label for="databaseId">Notion DataBase ID</label>
      <input type="text" id="databaseId" bind:value={databaseId} placeholder="enter your database id" />
  </div>
  <button on:click={save}>Save</button>
  {#if successMessage}<span class="success">{successMessage}</span>{/if}
</div>

<style>
  .container {
      min-width: 250px;
  }

  button {
      border-radius: 2px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
      background-color: #2ecc71;
      color: #ecf0f1;
      transition: background-color 0.3s;
      padding: 5px 10px;
      border: none;
  }

  button:hover,
  button:focus {
      background-color: #27ae60;
  }

  .success {
      color: #2ecc71;
      font-weight: bold;
  }
</style>
