<script lang="ts">
  export let form: { error?: string };
</script>

<div class="container py-5">

  <div class="card p-4 shadow mx-auto" style="max-width: 400px;">
    
    <h2 class="text-center mb-4">🔐 Login</h2>

    {#if form?.error}
      <div class="alert alert-danger">
        {form.error}
      </div>
    {/if}

    <form method="POST">

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input id="email" name="email" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Passwort</label>
        <input id="password" type="password" name="password" class="form-control" required />
      </div>

      <button class="btn btn-success w-100">
        Login
      </button>

    </form>

  </div>

</div>