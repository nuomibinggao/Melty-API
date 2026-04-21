<script lang="ts">
  import { resolve } from '$app/paths';
  const endpoints = [
		{
			method: 'GET',
			path: '/get/team-plcr-website/leveldata',
			desc: 'Returns level JSON data'
		},
		{
			method: 'GET',
			path: '/cdn/[:path]',
			desc: 'Serves R2 CDN assets'
		}
	];
</script>

<svelte:head>
  <title>Melty API | Documentation</title>
</svelte:head>

<main>
	<div class="grid-bg" aria-hidden="true"></div>

	<header>
		<div class="wordmark">Melty<span class="accent">API</span></div>
		<p class="tagline">Documentation</p>
	</header>

	<section class="hero">
		<h1>
			API <span class="accent">Documentation</span>
		</h1>

		<p class="description">
			Reference for available endpoints, parameters, and responses.
		</p>
	</section>

	<section class="endpoints">
		<h2 class="section-label">// endpoints</h2>

		<div class="endpoint-list">
			{#each endpoints as ep (ep.path)}
				<div class="endpoint">
					<code class="method get">{ep.method}</code>
					<code class="path">{ep.path}</code>
					<span class="endpoint-desc">{ep.desc}</span>
				</div>
			{/each}
		</div>
	</section>

	<section class="links-grid">
		<a href={resolve("/")} class="link-card">
			<span class="link-name">Back</span>
			<span class="link-desc">Return to homepage</span>
		</a>

		<a
			href="https://github.com/nuomibinggao/Melty-API"
			target="_blank"
			rel="noreferrer"
			class="link-card"
		>
			<span class="link-name">GitHub</span>
			<span class="link-desc">View source code</span>
		</a>
	</section>

  <footer>
    <span>© 2026 nuomibinggao · CC-NC-ND 4.0</span>
    <span>Made with ♥</span>
  </footer>
</main>