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
         <button
          type="submit"
          class="btn {task.done ? 'secondary' : 'primary'}">
            {#if task.done}
              Als offen markieren
            {:else}
              Als erledigt markieren
            {/if}
          </button>
        </form>

        <a href={`/tasks/${task.id}/edit`} class="edit-btn">
        Bearbeiten
        </a>
      </div>
    </li>
  {/each}
</ul>

<p><a href="/tasks/new">Neue Aufgabe erstellen</a></p>

<style>
 .task-item {
  background: white;
  padding: 1.2rem;
  margin-bottom: 1rem;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.1);
  transition: 0.2s;
}

.task-item:hover {
  transform: translateY(-3px);
}

.done {
  opacity: 0.6;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.btn:hover {
  transform: scale(1.05);
}

.edit-btn {
  margin-left: 0.7rem;
  padding: 0.5rem 1rem;
  background: #2196F3;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
}

.edit-btn:hover {
  background: #1976D2;
}
</style>