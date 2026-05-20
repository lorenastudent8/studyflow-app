<script lang="ts">
  export let data;
</script>

<h1 class="dashboard-title">📊 Dashboard</h1>

<!-- CARDS -->
<div class="cards">

  <a href="/tasks" class="dashboard-card">
    <div class="card text-center clickable">
      <div>📚 Aufgaben gesamt</div>
      <h3>{data.total}</h3>
    </div>
  </a>

  <a href="/tasks?filter=done" class="dashboard-card">
    <div class="card text-center clickable">
      <div>✅ Erledigt</div>
      <h3>{data.done}</h3>
    </div>
  </a>

  <a href="/tasks?filter=open" class="dashboard-card">
    <div class="card text-center clickable">
      <div>⏳ Offen</div>
      <h3>{data.open}</h3>
    </div>
  </a>

</div>

<!-- PROGRESS -->
<div class="progress-box">
  <h3>Fortschritt</h3>

  <div class="progress-bar">
    <div
      class="progress-fill"
      style="width: {(data.doneCount / data.total) * 100 || 0}%">
    </div>
  </div>

  <p>
    {Math.round((data.doneCount / data.total) * 100) || 0}% erledigt
  </p>
</div>

<!-- BUTTONS UNTEN -->
<div class="dashboard-actions-bottom">

  <a href="/tasks" class="btn-dashboard secondary">
    📋 Zu Aufgaben
  </a>

  <a href="/tasks/new" class="btn-dashboard primary">
    ➕ Neue Aufgabe
  </a>

</div>
