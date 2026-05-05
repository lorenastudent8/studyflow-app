<script lang="ts">
import TaskForm from '$lib/components/TaskForm.svelte';
  let { data, form }: { data: any; form?: { error?: string } } = $props();
</script>

<h1>Aufgabe bearbeiten</h1>
<p>Hier kannst du eine bestehende Aufgabe anpassen.</p>

<form method="POST">
  <TaskForm task={data.task} submitLabel="Änderungen speichern" />
</form>

{#if form?.error}
  <p style="color: red;">{form.error}</p>
{/if}

<p><a href="/tasks">Zurück zur Aufgabenübersicht</a></p>