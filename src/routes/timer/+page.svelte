<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let minutes = 25;
  let secondsInput = 0;

  let totalSeconds = 1500;
  let interval: ReturnType<typeof setInterval>;
  let running = false;

  let method = 'pomodoro';
  let taskTitle = '';

  onMount(() => {
    const params = new URLSearchParams(window.location.search);

    const m = Number(params.get('minutes'));
    taskTitle = params.get('title') || '';

    if (m) {
      minutes = m;
      totalSeconds = m * 60;
    }
  });

  function start() {
    if (running) return;

    running = true;

    interval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
      } else {
        clearInterval(interval);
        running = false;
      }
    }, 1000);
  }

  function pause() {
    running = false;
    clearInterval(interval);
  }

  function reset() {
    running = false;
    clearInterval(interval);

    totalSeconds = minutes * 60 + secondsInput;
  }

  function applyMethod() {
    if (method === 'pomodoro') {
      minutes = 25;
    } else if (method === 'deep') {
      minutes = 50;
    } else if (method === 'quick') {
      minutes = 15;
    }

    reset();
  }

  function formatTime(sec: number) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;

    return `${h.toString().padStart(2, '0')}:${m
      .toString()
      .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<div class="page">
  <h1>⏱ Timer</h1>
  <p class="subtitle">Verfolgen Sie Ihre Lernzeit und Aktivitäten</p>

  {#if taskTitle}
    <div class="active-task">
      📚 Aktive Aufgabe:
      <strong>{taskTitle}</strong>
    </div>
  {/if}

  <div class="timer-card">
    <div class="time">{formatTime(totalSeconds)}</div>

    <div class="buttons">
      <button class="start" on:click={start}>▶ Start</button>
      <button class="pause" on:click={pause}>⏸ Pause</button>
      <button class="reset" on:click={reset}>■ Reset</button>
    </div>
  </div>

  <div class="settings">
    <div class="top-row">
      <div class="field">
        <label for="method">Lernmethode</label>
        <select id="method" bind:value={method} on:change={applyMethod}>
          <option value="pomodoro">Pomodoro (25/5)</option>
          <option value="deep">Deep Work (50/10)</option>
          <option value="quick">Quick Session (15/3)</option>
        </select>
      </div>
    </div>

    <div class="bottom-row">
      <div class="field small">
        <label for="minutes">Minuten</label>
        <input id="minutes" type="number" bind:value={minutes} />
      </div>

      <div class="field small">
        <label for="seconds">Sekunden</label>
        <input id="seconds" type="number" bind:value={secondsInput} />
      </div>

      <button class="reset-btn" on:click={reset}>
        ↺ Zurücksetzen
      </button>
    </div>
  </div>
</div>

<style>
  .page {
    text-align: center;
    padding: 40px 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  h1 {
    font-size: 48px;
    margin-bottom: 5px;
  }

  .subtitle {
    color: #666;
    margin-bottom: 40px;
    font-size: 18px;
  }

  .timer-card {
    background: white;
    padding: 50px;
    border-radius: 25px;
    max-width: 1000px;
    margin: 0 auto 40px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  }

  .time {
    font-size: 100px;
    font-weight: bold;
    margin-bottom: 30px;
    letter-spacing: 2px;
  }

  .buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  .buttons button {
    padding: 15px 30px;
    border-radius: 12px;
    border: none;
    font-size: 18px;
    color: white;
    cursor: pointer;
  }

  .start {
    background: #2e7d32;
  }

  .pause {
    background: #2c2c2c;
  }

  .reset {
    background: #e53935;
  }

  .settings {
    background: white;
    padding: 40px;
    border-radius: 25px;
    max-width: 1000px;
    margin: 0 auto;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  }

  .top-row {
    margin-bottom: 30px;
  }

  .bottom-row {
    display: flex;
    gap: 20px;
    align-items: flex-end;
  }

  .field {
    flex: 1;
    text-align: left;
  }

  .field.small {
    max-width: 150px;
  }

  label {
    display: block;
    margin-bottom: 6px;
    font-size: 14px;
    color: #555;
  }

  select,
  input {
    width: 100%;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #ccc;
  }

  .reset-btn {
    padding: 12px 25px;
    border-radius: 12px;
    border: 1px solid #ccc;
    background: #f5f5f5;
    cursor: pointer;
  }

  .active-task {
    background: white;
    padding: 15px;
    border-radius: 15px;
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 500;
    box-shadow: 0 8px 20px rgba(0,0,0,0.08);
  }
</style>