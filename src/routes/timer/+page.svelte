<script lang="ts">
  let seconds: number = 1500;
  let interval: ReturnType<typeof setInterval>;
  let running: boolean = false;

  function start(): void {
    if (running) return;
    running = true;

    interval = setInterval(() => {
      if (seconds > 0) seconds--;
      else clearInterval(interval);
    }, 1000);
  }

  function pause(): void {
    running = false;
    clearInterval(interval);
  }

  function reset(): void {
    seconds = 1500;
    pause();
  }

  function addMinute(): void {
    seconds += 60;
  }

  function formatTime(sec: number): string {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  import { onDestroy } from 'svelte';

onDestroy(() => {
  clearInterval(interval);
});

</script>

<div class="container text-center mt-5">

  <h1>⏱️ Fokus Timer</h1>

  <div class="display-1 my-4 fw-bold">
    {formatTime(seconds)}
  </div>

  <div class="d-flex justify-content-center gap-3 flex-wrap">

    <button class="btn btn-success" on:click={start}>Start</button>
    <button class="btn btn-warning" on:click={pause}>Pause</button>
    <button class="btn btn-danger" on:click={reset}>Reset</button>
    <button class="btn btn-primary" on:click={addMinute}>+1 Min</button>

  </div>

</div>