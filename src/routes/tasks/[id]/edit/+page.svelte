<script lang="ts">
  export let data: {
    task: {
      id: string;
      title: string;
      course: string;
      description: string;
      minutes: number;
      dueDate: string;
      priority: string;
    };
  };

</script>

<div class="edit-page">

  <h1>✏️ Aufgabe bearbeiten</h1>
  <p class="subtitle">Passe deine Aufgabe an</p>

  <div class="form-card">

    <form method="POST">

      <!-- TITLE -->
      <div class="form-group">
        <label for="title">📘 Titel der Aufgabe</label>
        <input
          id="title"
          name="title"
          value={data.task.title}
          required
        />
      </div>

      <!-- COURSE -->
      <div class="form-group">
        <label for="course">📗 Kurs / Fach</label>
        <input
          id="course"
          name="course"
          value={data.task.course}
        />
      </div>

      <!-- DESCRIPTION -->
      <div class="form-group">
        <label for="description">📝 Beschreibung</label>
        <textarea
          id="description"
          name="description"
        >{data.task.description}</textarea>
      </div>

      <!-- ROW -->
      <div class="row">

        <div class="form-group">
          <label for="dueDate">📅 Fälligkeitsdatum</label>
          <input
            id="dueDate"
            type="date"
            name="dueDate"
            value={data.task.dueDate?.slice(0,10) || ''}
          />
        </div>

        <div class="form-group">
          <label for="minutes">⏱️ Dauer (Minuten)</label>
          <input
            id="minutes"
            type="number"
            name="minutes"
            value={data.task.minutes}
            min="1"
            required
          />
        </div>

      </div>

      <!-- PRIORITY -->
      <fieldset class="form-group">
        <legend>🚩 Priorität</legend>

        <div class="priority">

          <label class="prio low">
            <input
              type="radio"
              name="priority"
              value="low"
              checked={data.task.priority === 'low'}
            />
            🟢 Niedrig
          </label>

          <label class="prio mid">
            <input
              type="radio"
              name="priority"
              value="medium"
              checked={data.task.priority === 'medium'}
            />
            🟡 Mittel
          </label>

          <label class="prio high">
            <input
              type="radio"
              name="priority"
              value="high"
              checked={data.task.priority === 'high'}
            />
            🔴 Hoch
          </label>

        </div>
      </fieldset>

      <!-- BUTTON -->
      <button class="btn-save">
        💾 Änderungen speichern
      </button>

      <a href="/tasks" class="btn-back">
        ← Zurück
      </a>

    </form>

  </div>

</div>