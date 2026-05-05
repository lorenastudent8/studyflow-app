<script lang="ts">
  import TaskCard from '$lib/components/TaskCard.svelte';
  let { data }: { data: any } = $props();
</script>

<h1>Aufgaben</h1>

<!-- Filter -->
<p>
  <a href="/tasks" style="font-weight: {data.filter ? 'normal' : 'bold'}">Alle</a> |
  <a href="/tasks?filter=open" style="font-weight: {data.filter === 'open' ? 'bold' : 'normal'}">Offen</a> |
  <a href="/tasks?filter=done" style="font-weight: {data.filter === 'done' ? 'bold' : 'normal'}">Erledigt</a>
</p>

<!-- Fortschritt -->
<p>
  {data.doneCount} von {data.total} Aufgaben erledigt
  ({Math.round((data.doneCount / data.total) * 100) || 0}%)
</p>

<!-- Erfolgsmeldung -->
{#if data.success}
  <p style="color: green;">{data.success}</p>
{/if}

<p>Hier siehst du deine offenen Lernaufgaben.</p>

<ul class="task-list">
  {#each data.tasks as task}
    <li class:done={task.done} class="task-item">
      <TaskCard {task} />

      <div style="margin-top: 0.5rem;">
        <form method="POST" action="?/toggleDone" style="display: inline;">
          <input type="hidden" name="id" value={task.id} />
          <button type="submit">
            {#if task.done}
              Als offen markieren
            {:else}
              Als erledigt markieren
            {/if}
          </button>
        </form>

        <a href={`/tasks/${task.id}/edit`} style="margin-left: 0.75rem;">
          Bearbeiten
        </a>
      </div>
    </li>
  {/each}
</ul>

<p><a href="/tasks/new">Neue Aufgabe erstellen</a></p>

<style>
  .task-list {
    padding-left: 1.2rem;
  }

  .task-item {
    margin-bottom: 1rem;
  }

  .done {
    color: green;
  }

  button {
    margin-top: 0.25rem;
  }
</style>