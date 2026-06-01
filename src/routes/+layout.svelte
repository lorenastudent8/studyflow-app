<script lang="ts">
  import '$lib/app.css';
  export let data: {
  user: {
    email: string;
  } | null;
};
</script>

<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>

<nav class="navbar navbar-expand-lg navbar-dark bg-success px-4">
  <a class="navbar-brand fw-bold" href="/">📚 StudyFlow</a>

<div class="ms-auto d-flex gap-4 align-items-center">

  <a class="nav-link text-white" href="/">Dashboard</a>
  <a class="nav-link text-white" href="/timer">⏱ Timer</a>
  <a class="nav-link text-white" href="/tasks">📋 Aufgaben</a>
  <a class="nav-link text-white" href="/stats">📊 Aktivitäten</a>
  <a class="nav-link text-white" href="/methods">🧠 Methoden</a>
  <a class="nav-link text-white" href="/journal">📖 Tagebuch</a>

  {#if data.user}
    <span class="text-white me-2">
      👋 {data.user.email}
    </span>

    <form method="POST" action="/logout">
      <button class="btn btn-sm btn-light">Logout</button>
    </form>
  {:else}
    <a class="nav-link text-white" href="/login">Login</a>
    <a class="btn btn-light btn-sm" href="/register">
      Registrieren
    </a>
  {/if}

</div>
</nav>

<main>
  <slot />
</main>