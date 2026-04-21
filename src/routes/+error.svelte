<script lang="ts">
  import { resolve } from '$app/paths';

	export let data;
	$: error = data.error;
</script>

<svelte:head>
  <title>Melty API</title>
</svelte:head>

<main>
  <header>
    <div class="wordmark">Melty<span class="accent">API</span></div>
  </header>

  <section class="hero">
    <div class="status-bar">
      <span class="dot-error"></span>
      <code>error</code>
      <span class="status-text">{data.error}</span>
    </div>
  </section>

	<div class="grid-bg" aria-hidden="true"></div>
		<h1>
			Something went<br />
			<span class="accent">wrong</span>
		</h1>

		<p class="description">
			{error?.message ?? 'An unexpected error occurred.'}
		</p>

		<div class="links-grid">
			<a href={resolve("/")} class="link-card">
				<span class="link-name">Go Home</span>
				<span class="link-desc">Return to the main page</span>
			</a>
		</div>

  <footer>
    <span>© 2026 nuomibinggao · CC-NC-ND 4.0</span>
    <span>Made with ♥</span>
  </footer>
</main>