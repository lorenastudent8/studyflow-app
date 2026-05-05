<script lang="ts">
import TaskForm from '$lib/components/TaskForm.svelte';
  let { form }: { form?: { error?: string } } = $props();
</script>

<h1>Neue Aufgabe</h1>
<p>Hier erfassen Nutzer:innen eine neue Lernaufgabe.</p>

<form method="POST">
  <TaskForm submitLabel="Speichern" />
</form>

{#if form?.error}
  <p style="color: red;">{form.error}</p>
{/if}

<p><a href="/tasks">Zurück zur Aufgabenübersicht</a></p>