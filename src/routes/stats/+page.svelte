<script lang="ts">
  export let data;
</script>

<h1 class="text-center mb-4">📊 Statistik</h1>

<div class="container">

  <div class="row text-center mb-4">
    <div class="col-md-6">
      <div class="card p-4">
        <h3>⏱ Lernzeit</h3>
        <p class="display-6">{data.totalMinutes} Minuten</p>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card p-4">
        <h3>🔁 Sessions</h3>
        <p class="display-6">{data.totalSessions}</p>
      </div>
    </div>
  </div>

</div>