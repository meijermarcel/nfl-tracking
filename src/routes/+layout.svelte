<script>
	import { navigating } from '$app/stores';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<header class="band">
	<div class="band-inner">
		<div class="brand">
			<span class="brand-season">2026</span>
			<span class="brand-name">NFL standings</span>
		</div>
	</div>
</header>

<main class="sheet-wrap">
	{#if $navigating}
		<div class="loading" role="status" aria-live="polite">
			<span class="pulse"></span>
			<span class="pulse"></span>
			<span class="pulse"></span>
			<span class="sr-only">Loading standings</span>
		</div>
	{:else}
		<slot />
	{/if}
</main>

<footer>
	<p>
		twelve <span aria-hidden="true">&#183;</span> minus <span aria-hidden="true">&#183;</span> five
	</p>
</footer>

<style>
	.band {
		background: var(--blue);
		color: var(--white);
		padding: 2rem var(--gutter) 5rem;
	}

	.band-inner {
		max-width: var(--sheet-width);
		margin: 0 auto;
	}

	.brand {
		display: flex;
		flex-direction: column;
		color: inherit;
		text-decoration: none;
		font-family: var(--font-display);
		line-height: 0.9;
		width: max-content;
	}

	.brand-season {
		font-size: 4.5rem;
		font-weight: 800;
		letter-spacing: -0.03em;
	}

	.brand-name {
		font-size: 1.5rem;
		font-weight: 600;
		letter-spacing: 0.01em;
		margin-top: 0.35rem;
	}

	.sheet-wrap {
		max-width: var(--sheet-width);
		margin: -3.5rem auto 0;
		padding: 0 var(--gutter);
	}

	.loading {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		padding: 3rem 0;
		background: var(--white);
		border-radius: 6px;
	}

	.pulse {
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 50%;
		background: var(--blue);
		animation: pulse 0.9s ease-in-out infinite;
	}

	.pulse:nth-child(2) {
		animation-delay: 0.15s;
	}

	.pulse:nth-child(3) {
		animation-delay: 0.3s;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 0.25;
			transform: scale(0.8);
		}
		50% {
			opacity: 1;
			transform: scale(1);
		}
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
	}

	footer {
		max-width: var(--sheet-width);
		margin: 2.5rem auto 3rem;
		padding: 0 var(--gutter);
	}

	footer p {
		margin: 0;
		text-align: center;
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 0.95rem;
		letter-spacing: 0.04em;
		color: var(--silver);
	}
</style>
