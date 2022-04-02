<script lang="ts">
  async function fetchGIF() {
    const gif = await fetch(`/api/cat`, { method: "GET" }).then((res) => res.json());

    console.log(await gif);
  }
</script>

<div>
  <button class="btn btn-accent" on:click={async () => fetchGIF()}>German Catline</button>
  <button class="btn btn-accent">English Catline</button>
</div>

<style>
  div {
    @apply flex justify-center gap-x-5;
  }
</style>
