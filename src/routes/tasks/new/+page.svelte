<script>
</script>

<div class="new-task-page">

  <div class="icon">+</div>

  <h1>Neue Aufgabe</h1>
  <p class="subtitle">
    Erstelle eine neue Aufgabe und bleibe organisiert
  </p>

  <div class="form-card">

  <form method="POST" action="?/createTask">

      <!-- TITLE -->
      <div class="form-group">
        <label for="title">📘 Titel der Aufgabe</label>
        <input
          id="title"
          name="title"
          placeholder="z.B. Mathe Übungsaufgaben lösen..."
          required
        />
      </div>

      <!-- COURSE -->
      <div class="form-group">
        <label for="course">📗 Kurs / Fach</label>
        <input
          id="course"
          name="course"
          placeholder="z.B. Mathematik, UX Design..."
        />
      </div>

      <!-- DESCRIPTION -->
      <div class="form-group">
        <label for="description">📝 Beschreibung (optional)</label>
        <textarea
          id="description"
          name="description"
          placeholder="Füge eine Beschreibung hinzu..."
        ></textarea>
      </div>

      <!-- ROW -->
      <div class="row">

        <div class="form-group">
          <label for="dueDate">📅 Fälligkeitsdatum</label>
          <input id="dueDate" type="date" name="dueDate" />
        </div>

        <div class="form-group">
          <label for="minutes">⏱️ Dauer (Minuten)</label>
         <input 
  id="minutes"
  type="number"
  name="minutes"
  placeholder="z.B. 30"
  min="1"
  step="1"
  required
/>
        </div>

      </div>

      <!-- PRIORITY -->
      <fieldset class="form-group">
  <legend>🚩 Priorität</legend>

  <div class="priority">
    <label class="prio low">
      <input type="radio" name="priority" value="low" checked />
      Niedrig
    </label>

    <label class="prio mid">
      <input type="radio" name="priority" value="medium" />
      Mittel
    </label>

    <label class="prio high">
      <input type="radio" name="priority" value="high" />
      Hoch
    </label>
  </div>
</fieldset>

      <!-- BUTTON -->
      <button class="btn-save">
        ➕ Aufgabe erstellen
      </button>

      <a href="/tasks" class="btn-back">
        ← Zurück
      </a>

    </form>

  </div>

</div>