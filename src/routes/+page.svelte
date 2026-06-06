<script lang="ts">
  export let data: {
    total: number;
    done: number;
    open: number;

    upcomingTasks: {
      title: string;
      dueDate: string | null;
      priority: string;
    }[];
  };
</script>

<h1 class="dashboard-title">📊 Dashboard</h1>
<p class="dashboard-subtitle">
  Übersicht deiner Aufgaben und Fortschritte
</p>

<!-- CARDS -->
<div class="cards">

  <a href="/tasks" class="dashboard-card">
    <div class="card text-center">
      <div class="card-icon">📚</div>
      <div class="card-title">Aufgaben gesamt</div>
      <div class="card-number">{data.total}</div>
    </div>
  </a>

  <a href="/tasks?filter=done" class="dashboard-card">
    <div class="card text-center">
      <div class="card-icon">✅</div>
      <div class="card-title">Erledigt</div>
      <div class="card-number">{data.done}</div>
    </div>
  </a>

  <a href="/tasks?filter=open" class="dashboard-card">
    <div class="card text-center">
      <div class="card-icon">⏳</div>
      <div class="card-title">Offen</div>
      <div class="card-number">{data.total - data.done}</div>
    </div>
  </a>

</div>

<!-- PROGRESS -->
<div class="progress-box">
  <h3>Fortschritt</h3>

  <div class="progress-bar">
    <div
      class="progress-fill"
      style="width: {data.total ? (data.done / data.total) * 100 : 0}%">
    </div>
  </div>

  <p>
  {data.done} von {data.total} Aufgaben erledigt
</p>

<p>
  <strong>
    {data.total ? Math.round((data.done / data.total) * 100) : 0}% abgeschlossen
  </strong>
</p>
</div>

<!-- BUTTONS UNTEN -->
 <div class="progress-box">
  <h3>📌 Aufgabenübersicht</h3>

  <ul class="next-list">
    <li>📋 Offene Aufgaben: {data.total - data.done}</li>
    <li>✅ Erledigte Aufgaben: {data.done}</li>
    <li>🎯 Fortschritt:
      {data.total ? Math.round((data.done / data.total) * 100) : 0}%
    </li>
  </ul>
</div>

<div class="dashboard-actions-bottom">

  <a href="/tasks" class="btn-dashboard secondary">
    📋 Zu Aufgaben
  </a>

  <a href="/tasks/new" class="btn-dashboard primary">
    ➕ Neue Aufgabe
  </a>

</div>