<script lang="ts">
    import type { PageData } from "./$types";
    import ScoreCard from "$lib/components/score-card/ScoreCard.svelte";
    import { page } from "$app/stores";

    export let data: PageData;
</script>

<style>
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

    .scores-container {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xl);
    }

    .section {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
    }

    .section-header {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        padding: var(--spacing-md) var(--spacing-lg);
        background: var(--accent-light);
        border-radius: var(--radius-lg);
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-sm);
    }

    .section-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0;
    }

    .section-badge {
        background: var(--success-color);
        color: white;
        padding: var(--spacing-xs) var(--spacing-sm);
        border-radius: var(--radius-md);
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        white-space: nowrap;
    }

    .section-badge.scheduled {
        background: var(--warning-color);
    }

    .section-badge.final {
        background: var(--text-muted);
    }

    .game-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: var(--spacing-md);
    }

    .empty-state {
        text-align: center;
        padding: var(--spacing-2xl);
        color: var(--text-muted);
        background: var(--accent-light);
        border-radius: var(--radius-lg);
        border: 1px solid var(--border-color);
    }

    .empty-state h3 {
        margin: 0 0 var(--spacing-md) 0;
        color: var(--text-secondary);
    }

    /* Mobile-first responsive design */
    @media (max-width: 768px) {
        .page-title {
            font-size: 2rem;
        }
        
        .page-subtitle {
            font-size: 1rem;
        }
        
        .scores-container {
            gap: var(--spacing-lg);
        }
        
        .section {
            gap: var(--spacing-md);
        }
        
        .section-header {
            padding: var(--spacing-md);
            flex-direction: column;
            gap: var(--spacing-sm);
            text-align: center;
        }
        
        .section-title {
            font-size: 1.25rem;
        }
        
        .game-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-sm);
        }
        
        .empty-state {
            padding: var(--spacing-xl);
        }
    }

    @media (max-width: 480px) {
        .page-title {
            font-size: 1.75rem;
        }
        
        .page-subtitle {
            font-size: 0.875rem;
        }
        
        .section-header {
            padding: var(--spacing-sm);
            gap: var(--spacing-xs);
        }
        
        .section-title {
            font-size: 1.125rem;
        }
        
        .section-badge {
            font-size: 0.7rem;
            padding: var(--spacing-xs);
        }
        
        .game-grid {
            gap: var(--spacing-xs);
        }
        
        .empty-state {
            padding: var(--spacing-lg);
        }
        
        .empty-state h3 {
            font-size: 1.125rem;
        }
    }

    /* Landscape mobile optimization */
    @media (max-width: 768px) and (orientation: landscape) {
        .section-header {
            flex-direction: row;
            text-align: left;
        }
        
        .game-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }
    }

    /* Tablet optimization */
    @media (min-width: 769px) and (max-width: 1024px) {
        .game-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }
    }
</style>

<div class="page-header">
    <h1 class="page-title">📺 Live Scores</h1>
    <p class="page-subtitle">Week {$page.params.slug} • College Football 2025</p>
</div>

<div class="scores-container">
    {#if data.live_games.length > 0}
        <div class="section">
            <div class="section-header">
                <h2 class="section-title">Live Games</h2>
                <span class="section-badge">{data.live_games.length}</span>
            </div>
            <div class="game-grid">
                {#each data.live_games as game}
                    <ScoreCard {game} />
                {/each}
            </div>
        </div>
    {/if}

    {#if data.scheduled_games.length > 0}
        <div class="section">
            <div class="section-header">
                <h2 class="section-title">Scheduled Games</h2>
                <span class="section-badge scheduled">{data.scheduled_games.length}</span>
            </div>
            <div class="game-grid">
                {#each data.scheduled_games as game}
                    <ScoreCard {game} />
                {/each}
            </div>
        </div>
    {/if}

    {#if data.final_games.length > 0}
        <div class="section">
            <div class="section-header">
                <h2 class="section-title">Final Scores</h2>
                <span class="section-badge final">{data.final_games.length}</span>
            </div>
            <div class="game-grid">
                {#each data.final_games as game}
                    <ScoreCard {game} />
                {/each}
            </div>
        </div>
    {/if}

    {#if data.live_games.length === 0 && data.scheduled_games.length === 0 && data.final_games.length === 0}
        <div class="empty-state">
            <h3>No games found</h3>
            <p>There are no games scheduled for this week.</p>
        </div>
    {/if}
</div>