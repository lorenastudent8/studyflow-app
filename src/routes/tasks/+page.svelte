<script>
  export let data;
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

        <div class="task-card {task.done ? 'done' : ''}">

          <h5>{task.title}</h5>

          <p class="meta">
            {task.course} • {task.minutes} Min
          </p>

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

        </div>

      </div>

    {/each}
  {/if}

</div>

  <!-- NEW BUTTON -->
  <div class="text-center mt-5">
    <a href="/tasks/new" class="btn-add">
      ➕ Neue Aufgabe
    </a>
  </div>

</div>