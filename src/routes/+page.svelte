<script lang="ts">
	import type { Standings } from "$lib/types";
    import { slide } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import StandingsTable from "$lib/components/standings-table/StandingsTable.svelte";

    export let data: Standings;
</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
    }

    .page-header {
        text-align: center;
        margin-bottom: var(--spacing-xl);
    }

    .page-title {
        font-size: 2.5rem;
        font-weight: 800;
        color: var(--primary-color);
        margin: 0 0 var(--spacing-sm) 0;
    }

    .page-subtitle {
        color: var(--text-secondary);
        font-size: 1.125rem;
        margin: 0;
    }

    .standings-grid {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
    }

    .member-card {
        background: var(--accent-light);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-md);
        border: 1px solid var(--border-color);
        overflow: hidden;
        transition: all var(--transition-normal);
        cursor: pointer;
        min-height: var(--touch-target-min);
    }

    .member-card:hover {
        box-shadow: var(--shadow-lg);
        transform: translateY(-2px);
    }

    .member-card.expanded {
        box-shadow: var(--shadow-xl);
    }

    .member-header {
        padding: var(--spacing-lg);
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-light) 100%);
        border-bottom: 1px solid var(--border-color);
    }

    .member-info {
        display: flex;
        align-items: center;
        gap: var(--spacing-lg);
    }

    .position-badge {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3rem;
        height: 3rem;
        background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
        color: white;
        border-radius: var(--radius-lg);
        font-weight: 800;
        font-size: 1.25rem;
        box-shadow: var(--shadow-md);
        flex-shrink: 0;
    }

    .member-details {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);
        flex: 1;
        min-width: 0;
    }

    .member-name {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .member-stats {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        color: var(--text-secondary);
        font-weight: 500;
        flex-wrap: wrap;
    }

    .record-badge {
        background: var(--success-color);
        color: white;
        padding: var(--spacing-xs) var(--spacing-sm);
        border-radius: var(--radius-md);
        font-weight: 600;
        font-size: 0.875rem;
        white-space: nowrap;
    }

    .games-behind {
        background: var(--warning-color);
        color: white;
        padding: var(--spacing-xs) var(--spacing-sm);
        border-radius: var(--radius-md);
        font-weight: 600;
        font-size: 0.875rem;
        white-space: nowrap;
    }

    .expand-icon {
        color: var(--text-muted);
        transition: transform var(--transition-fast);
        font-size: 1.5rem;
        flex-shrink: 0;
        width: var(--touch-target-min);
        height: var(--touch-target-min);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .member-card.expanded .expand-icon {
        transform: rotate(180deg);
    }

    .team-container {
        padding: var(--spacing-lg);
        background: var(--accent-light);
    }

    /* Mobile-first responsive design */
    @media (max-width: 768px) {
        .page-title {
            font-size: 2rem;
        }
        
        .page-subtitle {
            font-size: 1rem;
        }
        
        .member-header {
            padding: var(--spacing-md);
            flex-direction: row;
            gap: var(--spacing-md);
            text-align: left;
        }
        
        .member-info {
            flex-direction: row;
            gap: var(--spacing-md);
            width: auto;
            flex: 1;
        }
        
        .member-stats {
            flex-direction: row;
            gap: var(--spacing-sm);
            width: auto;
        }
        
        .member-name {
            font-size: 1.25rem;
            text-align: left;
        }
        
        .position-badge {
            width: 2.5rem;
            height: 2.5rem;
            font-size: 1rem;
        }
        
        .expand-icon {
            width: 2.5rem;
            height: 2.5rem;
            font-size: 1.25rem;
        }
        
        .team-container {
            padding: var(--spacing-md);
        }
        
        .member-card:hover {
            transform: none;
        }
    }

    @media (max-width: 480px) {
        .page-title {
            font-size: 1.75rem;
        }
        
        .page-subtitle {
            font-size: 0.875rem;
        }
        
        .member-header {
            padding: var(--spacing-sm);
            gap: var(--spacing-sm);
        }
        
        .member-info {
            gap: var(--spacing-sm);
        }
        
        .member-name {
            font-size: 1.125rem;
        }
        
        .position-badge {
            width: 2rem;
            height: 2rem;
            font-size: 0.875rem;
        }
        
        .expand-icon {
            width: 2rem;
            height: 2rem;
            font-size: 1rem;
        }
        
        .team-container {
            padding: var(--spacing-sm);
        }
        
        .record-badge,
        .games-behind {
            font-size: 0.75rem;
            padding: var(--spacing-xs);
        }
        
        .member-stats {
            gap: var(--spacing-xs);
        }
    }

    /* Landscape mobile optimization */
    @media (max-width: 768px) and (orientation: landscape) {
        .member-header {
            flex-direction: row;
            text-align: left;
        }
        
        .member-info {
            flex-direction: row;
            width: auto;
        }
        
        .member-stats {
            flex-direction: row;
            width: auto;
        }
        
        .member-name {
            text-align: left;
        }
    }
</style>

<div class="container">
    <!-- <div class="page-header">
        <h1 class="page-title">🏈 Standings</h1>
        <p class="page-subtitle">College Football 2025 Season</p>
    </div> -->

    <div class="standings-grid">
        {#each data.members as member, i}
            <div 
                class="member-card"
                class:expanded={!member.collapsed}
                role="button"
                tabindex="0"
                on:click={() => member.collapsed = !member.collapsed}
                on:keydown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        member.collapsed = !member.collapsed;
                    }
                }}
            >
                <div class="member-header">
                    <div class="member-info">
                        <div class="position-badge">
                            {i + 1}
                        </div>
                        <div class="member-details">
                            <h3 class="member-name">{member.name}</h3>
                            <div class="member-stats">
                                <span class="record-badge">{member.wins}-{member.losses}</span>
                                {#if member.gamesBehind > 0}
                                    <span class="games-behind">{member.gamesBehind} GB</span>
                                {/if}
                            </div>
                        </div>
                    </div>
                    <div class="expand-icon">
                        ▼
                    </div>
                </div>
                
                {#if !member.collapsed}
                    <div class="team-container" transition:slide={{ duration: 300, easing: quintOut }}>
                        <StandingsTable {member} />
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</div>