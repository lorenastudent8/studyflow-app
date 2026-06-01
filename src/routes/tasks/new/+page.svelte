<div class="container mt-5">

  <div class="card p-4 shadow-sm mx-auto" style="max-width: 500px;">
    
    <h2 class="text-center mb-4">➕ Neue Aufgabe</h2>

    <form method="POST">

      <div class="mb-3">
        <label for="title" class="form-label">Titel</label>
        <input id="title" name="title" class="form-control" />
      </div>

      <div class="mb-3">
  <label for="course" class="form-label">Fach / Kategorie</label>
  <input id="course" name="course" class="form-control" required />
</div>

<div class="mb-3">
  <label for="minutes" class="form-label">Dauer (Minuten)</label>
  <input id="minutes" name="minutes" type="number" class="form-control" />
</div>

<div class="mb-3">
  <label for="dueDate" class="form-label">Fällig bis</label>
  <input
    id="dueDate"
    name="dueDate"
    type="date"
    class="form-control"
  />
</div>

      <button class="btn btn-success w-100 mb-2">
        Speichern
      </button>

      <a href="/tasks" class="btn btn-outline-secondary w-100">
        Zurück
      </a>

    </form>

  </div>

</div>