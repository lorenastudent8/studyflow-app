<script lang="ts">
  import '$lib/app.css';
</script>

<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>

<nav class="navbar">

  <!-- LEFT -->
  <div class="nav-left">
    <div class="logo">
  📊 <span>StudyFlow</span>
</div>

    <div class="nav-links">
  <a href="/">📊 Dashboard</a>
  <a href="/timer">⏱ Timer</a>
  <a href="/tasks">📋 Aufgaben</a>
  <a href="/stats">📈 Aktivitäten</a>
</div>
  </div>

  <!-- RIGHT -->
  <div class="nav-right">
  <a href="/login" class="btn-login-outline">
    👤 Login
  </a>

  <a href="/register" class="btn-login">
    ➕ Registrieren
  </a>
</div>

</nav>

<main>
  <slot />
</main>