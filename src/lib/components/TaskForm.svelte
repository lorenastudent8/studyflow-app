<script lang="ts">
  let {
    task = {
      title: '',
      course: '',
      minutes: 0
    },
    submitLabel = 'Speichern'
  }: {
    task?: {
      title: string;
      course: string;
      minutes: number;
    };
    submitLabel?: string;
  } = $props();
</script>

<div>
  <label for="title">Titel</label><br />
  <input id="title" name="title" type="text" value={task.title} />
</div>

<br />

<div>
  <label for="course">Fach / Kategorie</label><br />
  <input id="course" name="course" type="text" value={task.course} />
</div>

<br />

<div>
  <label for="minutes">Dauer</label><br />
  <input id="minutes" name="minutes" type="number" value={task.minutes} />
</div>

<br />

<button type="submit">{submitLabel}</button>