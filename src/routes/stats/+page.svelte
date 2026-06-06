<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  export let data: {
  totalMinutes: number;
  totalSessions: number;
  streak: number;

  completedTasks: number;
  openTasks: number;
  avgSession: number;

  bestDay: {
    date: string;
    minutes: number;
  };

  chartData: {
    date: string;
    minutes: number;
  }[];
};

  let chartCanvas: HTMLCanvasElement;

  const weeklyGoal = 300;

  $: percent = Math.min(
  100,
  Math.round((data.totalMinutes / weeklyGoal) * 100)
);

  onMount(() => {
    new Chart(chartCanvas, {
      type: 'line',
      data: {
        labels: data.chartData.map((d) => d.date),
        datasets: [
          {
            data: data.chartData.map((d) => d.minutes),
            borderWidth: 3,
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  });
</script>

<div class="stats-page">
  <h1>📊 Dein Lernfortschritt</h1>
  <p class="subtitle">Bleib dran – du machst Fortschritte 💪</p>

  <!-- CARDS -->
<!-- CARDS -->
<div class="cards">

  <div class="card">
    <h3>⏱ Lernzeit</h3>
    <div class="big">{data.totalMinutes}</div>
    <span>Minuten heute</span>
  </div>

  <div class="card">
    <h3>📚 Sessions</h3>
    <div class="big">{data.totalSessions}</div>
    <span>gesamt</span>
  </div>

  <div class="card">
    <h3>🔥 Streak</h3>
    <div class="big">{data.streak}</div>
    <span>Tage in Folge</span>
  </div>

  <div class="card">
    <h3>📊 Durchschnitt</h3>
    <div class="big">{data.avgSession}</div>
    <span>Minuten pro Session</span>
  </div>

  <div class="card">
    <h3>✅ Erledigt</h3>
    <div class="big">{data.completedTasks}</div>
    <span>Aufgaben erledigt</span>
  </div>

  <div class="card">
  <h3>📋 Offen</h3>
  <div class="big">{data.openTasks}</div>
  <span>Aufgaben offen</span>
</div>

  <div class="card">
    <h3>🏆 Bester Tag</h3>
    <div class="big">{data.bestDay?.date ?? '-'}</div>
    <span>{data.bestDay?.minutes ?? 0} Minuten</span>
  </div>

</div>

  <!-- CHART -->
  <div class="chart-card">
    <h3>📈 Lernverlauf (7 Tage)</h3>
    <canvas bind:this={chartCanvas}></canvas>
  </div>

  <!-- PROGRESS -->
  <div class="progress-card">
  <h3>🎯 Wochenziel</h3>

  <div class="progress-bar">
    <div class="fill" style="width: {percent}%"></div>
  </div>

  <p>{data.totalMinutes} / {weeklyGoal} Minuten</p>
  <p>
  <strong>{percent}% des Wochenziels erreicht</strong>
</p>

<hr style="margin:20px 0">

<h3>📋 Aufgabenfortschritt</h3>

<div class="progress-bar">
  <div
    class="fill"
    style="width: {
      (data.completedTasks /
        (data.completedTasks + data.openTasks || 1)) * 100
    }%"
  ></div>
</div>

<p>
  {data.completedTasks} von
  {data.completedTasks + data.openTasks}
  Aufgaben erledigt
</p>
</div>
</div>

<style>
  .stats-page {
    max-width: 1100px;
    margin: 0 auto;
    text-align: center;
  }

  h1 {
    margin-bottom: 5px;
  }

  .subtitle {
    color: #777;
    margin-bottom: 30px;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 30px;
  }

  .card {
    background: white;
    padding: 25px;
    border-radius: 18px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.08);
    transition: 0.2s;
  }

  .card:hover {
    transform: translateY(-3px);
  }

  .big {
    font-size: 32px;
    font-weight: bold;
    color: #2e7d32;
    margin: 10px 0;
  }

  .chart-card,
  .progress-card {
    background: white;
    padding: 25px;
    border-radius: 20px;
    margin-bottom: 30px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.08);
  }

  canvas {
    max-height: 350px;
  }

  .progress-bar {
    height: 18px;
    background: #ddd;
    border-radius: 999px;
    overflow: hidden;
    margin: 15px 0;
  }

  .fill {
    height: 100%;
    background: linear-gradient(
      90deg,
      #43a047,
      #2e7d32
    );
  }

  @media (max-width: 900px) {
    .cards {
      grid-template-columns: 1fr;
    }
  }
</style>