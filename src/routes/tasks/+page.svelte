<script lang="ts">
  export let data: {
  tasks: Task[];
  total: number;
  doneCount: number;
  filter?: string;
};

  type Task = {
  id: string;
  title: string;
  course: string;
  minutes: number;
  done: boolean;
  dueDate?: string | null;
  priority?: string;
  description?: string; 
};

  function getDateStatus(date: string | null | undefined) {
  if (!date) return null;

  const today = new Date();
  const due = new Date(date);

  if (isNaN(due.getTime())) return null;

  today.setHours(0,0,0,0);
  due.setHours(0,0,0,0);

  const diff = (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  if (diff === 0) return 'today';
  if (diff === 1) return 'tomorrow';
  if (diff < 0) return 'overdue';

  return 'future';
}
</script>

<div class="tasks-page">

  <h1>📋 Aufgaben</h1>

  <!-- FILTER -->
  <div class="filters">
    <a href="/tasks" class="filter all { !data.filter ? 'active' : '' }">
      📋 Alle <span>{data.total}</span>
    </a>

    <a href="/tasks?filter=open" class="filter open { data.filter === 'open' ? 'active' : '' }">
      ⏰ Offen <span>{data.total - data.doneCount}</span>
    </a>

    <a href="/tasks?filter=done" class="filter done { data.filter === 'done' ? 'active' : '' }">
      ✅ Erledigt <span>{data.doneCount}</span>
    </a>
  </div>

  <!-- PROGRESS -->
  <p class="progress-text">
    {data.doneCount} von {data.total} Aufgaben erledigt
    ({Math.round((data.doneCount / data.total) * 100) || 0}%)
  </p>

  <div class="progress-bar">
    <div
      class="progress-fill"
      style="width: {(data.doneCount / data.total) * 100 || 0}%"
    ></div>
  </div>

  <!-- TASK LIST -->
  <div class="task-list">

  {#each data.tasks as task}

    <div class="task-row {task.done ? 'done' : ''} {getDateStatus(task.dueDate) || ''}">

      <!-- CHECK -->
      <form method="POST" action="?/toggleDone">
        <input type="hidden" name="id" value={task.id} />
        <button class="check-btn">
          {task.done ? "✔" : ""}
        </button>
      </form>

      <!-- CONTENT -->
      <div class="task-content">
        <div class="title">{task.title}</div>

        <div class="meta">
  {task.course} • {task.minutes} Min

  {#if task.description && task.description.trim() !== ''}
  <div class="desc">
    📝 {task.description.slice(0, 80)}
  </div>
{/if}
</div>

        <!-- PRIORITY -->
        <div class="priority {task.priority || 'low'}">
          {#if task.priority === 'low'}
            🟢 Niedrig
          {:else if task.priority === 'medium'}
            🟡 Mittel
          {:else if task.priority === 'high'}
            🔴 Hoch
          {:else}
            🟢 Niedrig
          {/if}
        </div>
      </div>

      <!-- DATE -->
      <div class="date">
        {#if task.dueDate}
          <div class="date-main">
            📅 {new Date(task.dueDate).toLocaleDateString()}
          </div>

          {#if getDateStatus(task.dueDate) === 'today'}
            <div class="badge today">✔ Heute</div>

          {:else if getDateStatus(task.dueDate) === 'tomorrow'}
            <div class="badge tomorrow">● Morgen</div>

          {:else if getDateStatus(task.dueDate) === 'overdue'}
            <div class="badge overdue">● Überfällig</div>

          {:else if getDateStatus(task.dueDate) === 'future'}
            <div class="badge future">
              📅 In {Math.ceil((new Date(task.dueDate).getTime() - Date.now()) / (1000*60*60*24))} Tagen
            </div>
          {/if}
        {/if}
      </div>

      <!-- ACTIONS (JETZT RICHTIG IM LOOP) -->
      <div class="actions">

        <a href={`/tasks/${task.id}/edit`} class="btn-icon edit">✏️</a>

        <a
          href={`/timer?id=${task.id}&title=${task.title}&minutes=${task.minutes}`}
          class="btn-icon timer"
        >
          ⏱️
        </a>

        <form method="POST" action="?/deleteTask">
          <input type="hidden" name="id" value={task.id} />
          <button class="btn-icon delete">🗑️</button>
        </form>

      </div>

    </div>

  {/each}

</div>

  <a href="/tasks/new" class="btn-add">
    ➕ Neue Aufgabe
  </a>

</div>