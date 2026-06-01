<script lang="ts">
  export let data: {
    tasks: {
      id: string;
      title: string;
      course: string;
      minutes: number;
      done: boolean;
      dueDate: string | null;
    }[];
    total: number;
    doneCount: number;
    filter?: string;
  };
</script>

<div class="container py-5">

  <!-- TITLE -->
  <h1 class="text-center mb-4 fw-bold">📋 Aufgaben</h1>

  <!-- FILTER -->
  <div class="d-flex justify-content-center gap-2 mb-4">

    <a href="/tasks"
      class="filter-btn { !data.filter ? 'active' : '' }">
      Alle
    </a>

    <a href="/tasks?filter=open"
      class="filter-btn { data.filter === 'open' ? 'active-open' : '' }">
      Offen
    </a>

    <a href="/tasks?filter=done"
      class="filter-btn { data.filter === 'done' ? 'active-done' : '' }">
      Erledigt
    </a>
</div>

  <!-- PROGRESS -->
  <div class="text-center mb-5">
    <p class="fw-semibold mb-2">
      {data.doneCount} von {data.total} Aufgaben erledigt
      ({Math.round((data.doneCount / data.total) * 100) || 0}%)
    </p>

    <div class="progress mx-auto" style="max-width: 500px; height: 12px;">
      <div
        class="progress-bar bg-success"
        style="width: {(data.doneCount / data.total) * 100 || 0}%"
      ></div>
    </div>
  </div>

  <!-- TASK GRID -->
  <div class="row g-4">

  {#if data?.tasks}
    {#each data.tasks as task}

      <div class="col-lg-4 col-md-6">

        <div class="task-card 
  {task.done ? 'done' : ''}
  {task.dueDate && new Date(task.dueDate).setHours(0,0,0,0) === new Date().setHours(0,0,0,0) ? 'today' : ''}
  {task.dueDate && new Date(task.dueDate) < new Date() && !task.done ? 'overdue' : ''}
">

          <h5>{task.title}</h5>

          <p class="meta">
            {task.course} • {task.minutes} Min
          </p>

        {#if task.dueDate}
  <p class="due-date">
    📅 {new Date(task.dueDate).toLocaleDateString()}
  </p>
{/if}

{#if task.dueDate && new Date(task.dueDate) < new Date() && !task.done}
  <p class="overdue">
    ⚠️ Überfällig
  </p>
{/if}

{#if task.done}
  <p class="status-label status-done">✅ Erledigt</p>

{:else if task.dueDate && new Date(task.dueDate).setHours(0,0,0,0) === new Date().setHours(0,0,0,0)}
  <p class="status-label status-today">🟡 Heute fällig</p>

{:else if task.dueDate && new Date(task.dueDate) < new Date()}
  <p class="status-label status-overdue">🔴 Überfällig</p>
{/if}

<div class="actions">

  <!-- DONE -->
  <form method="POST" action="?/toggleDone">
    <input type="hidden" name="id" value={task.id} />
    <button class="btn-status {task.done ? 'open' : 'done'}">
      {task.done ? 'Offen' : 'Erledigt'}
    </button>
  </form>

  <!-- EDIT -->
  <a href={`/tasks/${task.id}/edit`} class="btn-edit">
    Bearbeiten
  </a>

   <!-- 🆕 TIMER BUTTON HIER -->
  <a
    href={`/timer?id=${task.id}&title=${task.title}&minutes=${task.minutes}`}
    class="btn-timer"
  >
    ⏱️ Start
  </a>

  <!-- DELETE -->
  <form method="POST" action="?/deleteTask">
    <input type="hidden" name="id" value={task.id} />
    <button
      class="btn-delete"
      on:click={(e) => {
        if (!confirm('Wirklich löschen?')) {
          e.preventDefault();
        }
      }}
    >
      Löschen
    </button>
  </form>

</div>
 </div> <!-- task-card -->

        </div> <!-- col -->

      {/each}
    {/if}

  </div> <!-- row -->

  <!-- NEW BUTTON -->
  <div class="text-center mt-5">
    <a href="/tasks/new" class="btn-add">
      ➕ Neue Aufgabe
    </a>
  </div>

</div>