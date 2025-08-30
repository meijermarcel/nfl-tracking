<script lang="ts">
	import type { MemberStanding } from "$lib/types";

    export let member: MemberStanding;
</script>

<style>
    .table-container {
        background: var(--accent-light);
        border-radius: var(--radius-lg);
        overflow: hidden;
        border: 1px solid var(--border-color);
    }

    table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.875rem;
    }

    thead {
        background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
        color: white;
    }

    thead th {
        padding: var(--spacing-md);
        text-align: left;
        font-weight: 600;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    tbody tr {
        border-bottom: 1px solid var(--border-color);
        transition: background-color var(--transition-fast);
    }

    tbody tr:hover {
        background-color: var(--accent-color);
    }

    tbody tr:last-child {
        border-bottom: none;
    }

    td {
        padding: var(--spacing-md);
        vertical-align: middle;
    }

    .team-name {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        font-weight: 600;
        color: var(--text-primary);
    }

    .team-logo {
        width: 2rem;
        height: 2rem;
        border-radius: var(--radius-sm);
        object-fit: contain;
        background: var(--accent-color);
        padding: 2px;
        flex-shrink: 0;
    }

    .record {
        text-align: center;
        font-weight: 600;
        color: var(--text-secondary);
        white-space: nowrap;
    }

    .totals-row {
        background: linear-gradient(135deg, var(--secondary-color), var(--secondary-light));
        border-top: 2px solid var(--primary-color);
        font-weight: 700;
    }

    .totals-row td {
        color: var(--accent-light);
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .games-played {
        text-align: center;
        color: var(--text-muted);
        font-size: 0.75rem;
        font-weight: 500;
    }

    /* Mobile-first responsive design */
    @media (max-width: 768px) {
        .table-container {
            border-radius: var(--radius-md);
        }
        
        thead th,
        td {
            padding: var(--spacing-sm);
        }
        
        .team-name {
            gap: var(--spacing-sm);
        }
        
        .team-logo {
            width: 1.5rem;
            height: 1.5rem;
        }
        
        table {
            font-size: 0.8rem;
        }
        
        thead th {
            font-size: 0.7rem;
            padding: var(--spacing-sm) var(--spacing-xs);
        }
        
        .record {
            font-size: 0.75rem;
        }
        
        .games-played {
            font-size: 0.7rem;
        }
    }

    @media (max-width: 480px) {
        thead th,
        td {
            padding: var(--spacing-xs);
        }
        
        .team-name {
            gap: var(--spacing-xs);
        }
        
        .team-logo {
            width: 1.25rem;
            height: 1.25rem;
        }
        
        table {
            font-size: 0.75rem;
        }
        
        thead th {
            font-size: 0.65rem;
            padding: var(--spacing-xs);
        }
        
        .record {
            font-size: 0.7rem;
        }
        
        .games-played {
            font-size: 0.65rem;
        }
    }

    /* Landscape mobile optimization */
    @media (max-width: 768px) and (orientation: landscape) {
        thead th,
        td {
            padding: var(--spacing-sm);
        }
        
        .team-logo {
            width: 1.75rem;
            height: 1.75rem;
        }
        
        table {
            font-size: 0.8rem;
        }
    }
</style>

{#if member}
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Team</th>
                    <th style="text-align: center;">Record</th>
                </tr>
            </thead>
            <tbody>
                {#each member.teams as team}
                    <tr>
                        <td>
                            <div class="team-name">
                                <img 
                                    class="team-logo" 
                                    src="{team.img}" 
                                    alt="{team.name} logo" 
                                    on:error={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        if (target) target.style.display = 'none';
                                    }}
                                />
                                <span>{team.name}</span>
                            </div>
                        </td>
                        <td class="record">{team.wins} - {team.losses}</td>
                    </tr>
                {/each}
                <tr class="totals-row">
                    <td class="games-played">{member.wins + member.losses} Games Played</td>
                    <td class="record">{member.wins} - {member.losses}</td>
                </tr>
            </tbody>
        </table>
    </div>
{/if}