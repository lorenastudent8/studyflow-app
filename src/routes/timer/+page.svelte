<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let seconds = 1500;
  let interval: ReturnType<typeof setInterval>;
  let running = false;

  let mode: 'focus' | 'break' = 'focus';

  let focusMinutes = 25;
  let breakMinutes = 5;

  let title = 'Timer';
  let taskId: string | null = null;
  let initialSeconds = 0;
  let saved = false;

  onMount(() => {
    const params = new URLSearchParams(window.location.search);

    const m = Number(params.get('minutes'));
    const id = params.get('id');
    const t = params.get('title');

    if (m) {
      focusMinutes = m;
      seconds = m * 60;
    }

    if (id) taskId = id;
    if (t) title = t;
  });

  function start() {
    if (running) return;

    initialSeconds = seconds;
    running = true;

    interval = setInterval(async () => {
      if (seconds > 0) {
        seconds--;
      } else {
        clearInterval(interval);
        running = false;

        // 🔁 Wechsel zwischen Fokus und Pause
        if (mode === 'focus') {
          mode = 'break';
          seconds = breakMinutes * 60;
        } else {
          mode = 'focus';
          seconds = focusMinutes * 60;
        }

        start(); // 🔥 automatisch weiter
      }
    }, 1000);
  }

 async function saveSession() {
  if (!taskId || saved) return;

  saved = true;

  const duration = Math.max(1, Math.floor((initialSeconds - seconds) / 60));

  await fetch('/tasks?/completeFromTimer', {
    method: 'POST',
    body: new URLSearchParams({
      id: taskId,
      duration: String(duration)
    })
  });
}

 async function pause(): Promise<void> {
  if (!running) return;

  running = false;
  clearInterval(interval);

  await saveSession();
}

  async function reset(): Promise<void> {
  if (running) {
    await saveSession();
  }

  running = false;
  clearInterval(interval);

  seconds = focusMinutes * 60;
}

  function formatTime(sec: number) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  onDestroy(() => clearInterval(interval));
</script>

<div class="container mt-5">

  <h1 class="text-center mb-2">⏱️ Timer</h1>
  <p class="text-center text-muted mb-4">
    {title}
  </p>

  <!-- TIMER CARD -->
  <div class="card p-5 text-center shadow-sm mx-auto" style="max-width: 600px; border-radius: 20px;">

  <!-- MODE -->
  <h4 class="mb-3">
    {mode === 'focus' ? '🧠 Fokus' : '☕ Pause'}
  </h4>

  <!-- TIME -->
  <div class="display-1 fw-bold mb-4" style="letter-spacing: 2px;">
    {formatTime(seconds)}
  </div>

  <!-- BUTTONS -->
  <div class="d-flex justify-content-center gap-3">

    <button class="btn btn-success px-4" on:click={start}>
      ▶ Start
    </button>

    <button class="btn btn-dark px-4" on:click={pause}>
      ⏸ Pause
    </button>

    <button class="btn btn-danger px-4" on:click={reset}>
      ⏹ Reset
    </button>

  </div>

</div>

  <!-- SETTINGS -->
  <div class="row mt-4 justify-content-center">

    <div class="col-md-5">
      <div class="card p-3 shadow-sm">

        <label for="method" class="form-label">Lernmethode</label>
        <select id="method" class="form-select">
          <option>Pomodoro</option>
          <option>Custom</option>
        </select>

      </div>
    </div>

    <div class="col-md-5">
      <div class="card p-3 shadow-sm">

        <label for="mode" class="form-label">Timer-Modus</label>
        <select id="mode" class="form-select">
          <option>Timer</option>
          <option>Countdown</option>
        </select>

      </div>
    </div>

  </div>

  <!-- INPUT -->
<div class="card p-4 shadow-sm mt-4 mx-auto" style="max-width: 600px;">

  <div class="row text-center">

    <div class="col">
      <label for="focus">Fokus (Min)</label>
      <input
        id="focus"
        type="number"
        bind:value={focusMinutes}
        class="form-control text-center"
      />
    </div>

    <div class="col">
      <label for="break">Pause (Min)</label>
      <input
        id="break"
        type="number"
        bind:value={breakMinutes}
        class="form-control text-center"
      />
    </div>

  </div>

</div>

</div>