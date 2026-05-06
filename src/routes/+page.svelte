<h1>📚 StudyFlow</h1>
<p class="subtitle">Organisiere deine Lernaufgaben effizient</p>

<div class="buttons">
  <a href="/tasks" class="btn primary">Zu Aufgaben</a>
  <a href="/tasks/new" class="btn secondary">Neue Aufgabe</a>
</div>

<style>
  .subtitle {
    text-align: center;
    margin-bottom: 2rem;
  }

  .buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .btn {
    padding: 0.8rem 1.5rem;
    border-radius: 10px;
    font-weight: bold;
    transition: 0.2s;
  }

  .primary {
    background: #4CAF50;
    color: white;
  }

  .secondary {
    background: #2196F3;
    color: white;
  }

  .btn:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }
</style>