<script>
  import '$lib/app.css';
</script>

<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>

<nav class="navbar navbar-expand-lg navbar-dark bg-success px-4">
  <a class="navbar-brand fw-bold" href="/">📚 StudyFlow</a>

  <form method="POST" action="/logout">
  <button class="btn btn-sm btn-light">Logout</button>
</form>

  <div class="ms-auto d-flex gap-3">
    <a class="nav-link text-white" href="/">Home</a>
    <a class="nav-link text-white" href="/tasks">Aufgaben</a>
    <a class="nav-link text-white" href="/tasks/new">Neu</a>
    <a class="nav-link text-white" href="/timer">Timer</a>
    <a class="nav-link text-white" href="/login">Login</a>
  </div>
</nav>

<main>
  <slot />
</main>