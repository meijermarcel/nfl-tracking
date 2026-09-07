<script lang="ts">
	import type { MemberStanding } from '$lib/types';

	export let member: MemberStanding;
</script>

{#if member}
	<table>
		<caption class="sr-only">{member.name}'s teams</caption>
		<thead>
			<tr>
				<th scope="col">Team</th>
				<th scope="col" class="num">W</th>
				<th scope="col" class="num">L</th>
				<th scope="col" class="num">T</th>
			</tr>
		</thead>
		<tbody>
			{#each member.teams as team (team.name)}
				<tr>
					<th scope="row">
						<span class="team">
							{#if team.img}
								<img src={team.img} alt="" width="22" height="22" loading="lazy" />
							{:else}
								<span class="logo-blank" aria-hidden="true"></span>
							{/if}
							<span>{team.name}</span>
						</span>
					</th>
					<td class="num">{team.wins}</td>
					<td class="num">{team.losses}</td>
					<td class="num">{team.ties}</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th scope="row">{member.wins + member.losses + member.ties} played</th>
				<td class="num">{member.wins}</td>
				<td class="num">{member.losses}</td>
				<td class="num">{member.ties}</td>
			</tr>
		</tfoot>
	</table>
{/if}

<style>
	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.95rem;
	}

	th,
	td {
		padding: 0.45rem 0;
		text-align: left;
		font-weight: 500;
	}

	thead th {
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--table-muted, var(--muted));
		border-bottom: 1px solid var(--table-rule, var(--silver-light));
		padding-bottom: 0.35rem;
	}

	.num {
		text-align: right;
		width: 2.25rem;
		font-family: var(--font-display);
		font-size: 1.1rem;
		font-weight: 600;
	}

	thead .num {
		font-family: var(--font-body);
		font-size: 0.75rem;
		font-weight: 500;
	}

	tbody tr + tr th,
	tbody tr + tr td {
		border-top: 1px solid var(--table-rule-soft, var(--silver-pale));
	}

	.team {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
	}

	img,
	.logo-blank {
		display: block;
		width: 22px;
		height: 22px;
	}

	.logo-blank {
		border-radius: 50%;
		background: var(--table-logo-bg, var(--silver-light));
	}

	tfoot th,
	tfoot td {
		border-top: 2px solid var(--table-accent, var(--blue));
		padding-top: 0.55rem;
		font-weight: 700;
	}

	tfoot th {
		font-family: var(--font-body);
		font-size: 0.85rem;
		color: var(--table-muted, var(--muted));
	}

	tfoot .num {
		color: var(--table-accent, var(--blue));
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
	}
</style>
