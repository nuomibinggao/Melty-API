<script lang="ts">

  const links = [
    { label: 'Documentation', href: '/docs', desc: 'Endpoints, types, and usage guides' },
    { label: 'GitHub', href: 'https://github.com/nuomibinggao/Melty-API', desc: 'Source code and contributions' }
  ];

  const credits = [
    { name: 'nuomibinggao', role: 'Developer', href: 'https://github.com/nuomibinggao' },
  ];
</script>

<svelte:head>
  <title>Melty API</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Chillax:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/xiaolai-font@1.0.1/css/xiaolai.min.css" rel="stylesheet" />
</svelte:head>

<main>
  <div class="grid-bg" aria-hidden="true"></div>

  <header>
    <div class="wordmark">Melty<span class="accent">API</span></div>
    <div class="badge">v2</div>
    <p class="tagline">Fast & Simple.</p>
  </header>

  <section class="hero">
    <div class="status-bar">
      <span class="dot"></span>
      <code>api.melty-studios.com</code>
      <span class="status-text">operational</span>
    </div>

    <h1>
      The universal backbone of<br />
      <span class="accent">nuomibinggao's</span><br />
      websites.
    </h1>

    <p class="description">
      A lightweight Cloudflare Worker API serving level data, assets, and CDN content
      for nuomibinggao's websites and associated projects.
    </p>
  </section>

  <section class="links-grid">
    {#each links as link (link.label)}
      <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
      <a href={link.href} class="link-card">
        <span class="link-name">{link.label}</span>
        <span class="link-desc">{link.desc}</span>
        <svg class="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    {/each}
  </section>

  <section class="credits">
    <h2 class="section-label">// credits</h2>
    <div class="credits-list">
      {#each credits as credit (credit.name)}
        <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
        <a href={credit.href} class="credit-item" target="_blank" rel="noreferrer">
          <span class="credit-name">{credit.name}</span>
          <span class="credit-role">{credit.role}</span>
        </a>
      {/each}
    </div>
  </section>

  <footer>
    <span>© 2026 nuomibinggao · CC-NC-ND 4.0</span>
    <span>Made with ♥</span>
  </footer>
</main>
