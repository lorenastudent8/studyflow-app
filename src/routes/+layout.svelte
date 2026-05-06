<script>
  import '$lib/../app.css';
</script>

<nav class="navbar">
  <h2>📚 StudyFlow</h2>

  <div class="links">
    <a href="/">Home</a>
    <a href="/tasks">Aufgaben</a>
    <a href="/tasks/new">Neu</a>
  </div>
</nav>

<main>
  <slot />
</main>

<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #4CAF50, #45a049);
    color: white;
  }

  .links a {
    margin-left: 1rem;
    color: white;
    font-weight: bold;
  }

  main {
    padding: 2rem;
  }
</style>
