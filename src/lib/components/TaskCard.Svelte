<script lang="ts">
  let {
    task
  }: {
    task: {
      id: string;
      title: string;
      course: string;
      minutes: number;
      done: boolean;
    };
  } = $props();
</script>

<div class:done={task.done}>
  <strong>{task.title}</strong><br />
  {task.minutes} Min – {task.course}
  {#if task.done}
    <span> (erledigt)</span>
  {/if}
</div>

<style>
  .done {
    color: green;
  }
</style>