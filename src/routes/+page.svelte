<script lang="ts">
  export let data: any;
</script>

<h1 class="dashboard-title">📊 Dashboard</h1>

<div class="cards">
  <div class="card">
    <h3>📚 Aufgaben gesamt</h3>
    <p>{data.total}</p>
  </div>

  <div class="card">
    <h3>✅ Erledigt</h3>
    <p>{data.done}</p>
  </div>

  <div class="card">
    <h3>⏳ Offen</h3>
    <p>{data.total - data.done}</p>
  </div>
</div>

<div class="progress-box">
  <h3>Fortschritt</h3>
  <div class="progress-bar">
    <div
      class="progress"
      style="width: {(data.done / data.total) * 100 || 0}%">
    </div>
  </div>
  <p>{Math.round((data.done / data.total) * 100) || 0}% erledigt</p>
</div>

<div class="actions">
  <a href="/tasks" class="btn primary">Zu Aufgaben</a>
  <a href="/tasks/new" class="btn secondary">Neue Aufgabe</a>
</div>

<style>
.dashboard-title {
  text-align: center;
  margin-bottom: 2rem;
}

.cards {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  width: 180px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.card h3 {
  margin-bottom: 0.5rem;
}

.card p {
  font-size: 2rem;
  font-weight: bold;
}

.progress-box {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  max-width: 500px;
  margin: 0 auto 2rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.progress-bar {
  background: #eee;
  border-radius: 20px;
  overflow: hidden;
  height: 20px;
  margin: 1rem 0;
}

.progress {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  height: 100%;
  transition: 0.3s;
}

.actions {
  text-align: center;
}
</style>