<script lang="ts">
	import type { Standings } from '$lib/types';
	import { slide } from 'svelte/transition';
	import { browser } from '$app/environment';
	import StandingsTable from '$lib/components/standings-table/StandingsTable.svelte';

	export let data: Standings;

	const reduceMotion = browser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const slideDuration = reduceMotion ? 0 : 180;

	$: maxGames = Math.max(1, ...data.members.map((m) => m.wins + m.losses + m.ties));

	const toggle = (i: number) => {
		data.members[i].collapsed = !data.members[i].collapsed;
	};

	const gamesBehindLabel = (gb: number, index: number) => {
		if (index === 0) return 'Leader';
		if (gb === 0) return 'Even';
		return `${gb} back`;
	};
</script>

<ol class="sheet">
	{#each data.members as member, i (member.name)}
		{@const winShare = (member.wins / maxGames) * 100}
		{@const lossShare = (member.losses / maxGames) * 100}
		<li class="member" class:leader={i === 0} class:open={!member.collapsed}>
			<button
				class="row"
				type="button"
				aria-expanded={!member.collapsed}
				aria-controls={`teams-${member.name}`}
				on:click={() => toggle(i)}
			>
				<span class="rank">{i + 1}</span>
				<span class="name">{member.name}</span>
				<span class="record">{member.wins}-{member.losses}-{member.ties}</span>

				<span class="bar" aria-hidden="true">
					<span class="bar-wins" style={`width: ${winShare}%`}></span>
					<span class="bar-losses" style={`width: ${lossShare}%`}></span>
				</span>
				<span class="behind">{gamesBehindLabel(member.gamesBehind, i)}</span>

				<svg class="chevron" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
					<path
						d="M3 6l5 5 5-5"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>

			{#if !member.collapsed}
				<div
					class="teams"
					id={`teams-${member.name}`}
					transition:slide={{ duration: slideDuration }}
				>
					<StandingsTable {member} />
				</div>
			{/if}
		</li>
	{/each}
</ol>

<style>
	.sheet {
		list-style: none;
		margin: 0;
		padding: 0;
		border-radius: 6px;
		overflow: hidden;
		box-shadow: 0 1px 0 var(--silver-light);
	}

	.member {
		background: var(--white);
		border-top: 1px solid var(--silver-light);
	}

	.member:first-child {
		border-top: 0;
	}

	.row {
		display: grid;
		grid-template-columns: 2.25rem 1fr auto 1.25rem;
		grid-template-rows: auto auto;
		grid-template-areas:
			'rank name record chevron'
			'rank bar behind chevron';
		column-gap: 0.75rem;
		row-gap: 0.4rem;
		align-items: center;
		width: 100%;
		padding: 1rem 1rem 1rem 0.75rem;
		border: 0;
		background: transparent;
		color: inherit;
		font: inherit;
		text-align: left;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}

	.row:hover {
		background: var(--silver-pale);
	}

	.row:focus-visible {
		outline-offset: -3px;
	}

	.rank {
		grid-area: rank;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.75rem;
		line-height: 1;
		color: var(--silver);
		text-align: center;
	}

	.name {
		grid-area: name;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.6rem;
		line-height: 1;
		letter-spacing: 0.005em;
	}

	.record {
		grid-area: record;
		justify-self: end;
		font-family: var(--font-display);
		font-weight: 800;
		font-size: 1.6rem;
		line-height: 1;
		letter-spacing: -0.01em;
	}

	.bar {
		grid-area: bar;
		display: flex;
		height: 6px;
		border-radius: 3px;
		background: var(--silver-light);
		overflow: hidden;
	}

	.bar-wins {
		background: var(--blue);
	}

	.bar-losses {
		background: var(--silver);
	}

	.behind {
		grid-area: behind;
		justify-self: end;
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--muted);
	}

	.chevron {
		grid-area: chevron;
		justify-self: end;
		color: var(--silver);
		transition: transform 180ms ease;
	}

	.open .chevron {
		transform: rotate(180deg);
	}

	.teams {
		padding: 0 1rem 1rem 3rem;
	}

	.leader .teams {
		--table-muted: rgba(255, 255, 255, 0.75);
		--table-rule: rgba(255, 255, 255, 0.25);
		--table-rule-soft: rgba(255, 255, 255, 0.12);
		--table-accent: var(--white);
		--table-logo-bg: rgba(255, 255, 255, 0.2);
	}

	/* Leader row */
	.leader {
		background: var(--blue);
		color: var(--white);
	}

	.leader .row:hover {
		background: var(--blue-deep);
	}

	.leader .row:focus-visible {
		outline-color: var(--white);
	}

	.leader .rank,
	.leader .chevron {
		color: rgba(255, 255, 255, 0.7);
	}

	.leader .behind {
		color: rgba(255, 255, 255, 0.85);
	}

	.leader .bar {
		background: rgba(255, 255, 255, 0.2);
	}

	.leader .bar-wins {
		background: var(--white);
	}

	.leader .bar-losses {
		background: rgba(255, 255, 255, 0.45);
	}

	.leader .name,
	.leader .record {
		font-size: 1.9rem;
	}

	.leader .row {
		padding-top: 1.25rem;
		padding-bottom: 1.25rem;
	}

	@media (max-width: 360px) {
		.name,
		.record {
			font-size: 1.35rem;
		}

		.leader .name,
		.leader .record {
			font-size: 1.6rem;
		}

		.teams {
			padding-left: 1rem;
		}
	}
</style>
