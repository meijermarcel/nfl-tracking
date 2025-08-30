<script lang="ts">
    import type { GameScore } from "$lib/types";
    import MemberView from "./member-view/MemberView.svelte";

    export let game: GameScore;

    function sanitize(score: number) {
        return isNaN(score) ? '-' : score;
    }
</script>

<style>
    .score-card {
        background: var(--accent-light);
        border-radius: var(--radius-lg);
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-md);
        overflow: hidden;
        transition: all var(--transition-normal);
        min-height: var(--touch-target-min);
    }
    
    .score-card:hover {
        box-shadow: var(--shadow-lg);
        transform: translateY(-2px);
    }

    .game-header {
        background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
        color: white;
        padding: var(--spacing-md);
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.875rem;
        font-weight: 500;
    }

    .game-status {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
    }

    .status-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--success-color);
        animation: pulse 2s infinite;
        flex-shrink: 0;
    }

    .status-indicator.scheduled {
        background: var(--warning-color);
        animation: none;
    }

    .status-indicator.final {
        background: var(--text-muted);
        animation: none;
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }

    .teams-container {
        padding: var(--spacing-lg);
    }

    .team-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--spacing-md) 0;
        border-bottom: 1px solid var(--border-color);
    }

    .team-row:last-child {
        border-bottom: none;
    }

    .team-info {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        flex: 1;
        min-width: 0;
    }

    .team-logo {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: var(--radius-md);
        object-fit: contain;
        background: var(--accent-color);
        padding: 4px;
        flex-shrink: 0;
    }

    .team-name {
        font-weight: 600;
        color: var(--text-primary);
        font-size: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .team-name.win {
        color: var(--success-color);
        font-weight: 700;
    }

    .team-name.loss {
        color: var(--text-muted);
    }

    .score-display {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        flex-shrink: 0;
    }

    .quarter-scores {
        display: flex;
        gap: var(--spacing-sm);
        font-size: 0.75rem;
        color: var(--text-muted);
    }

    .quarter-score {
        width: 1.5rem;
        text-align: center;
        padding: var(--spacing-xs);
        background: var(--accent-color);
        border-radius: var(--radius-sm);
        font-weight: 500;
    }

    .total-score {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--text-primary);
        min-width: 2rem;
        text-align: center;
    }

    .total-score.win {
        color: var(--success-color);
    }

    .member-matchup {
        padding: var(--spacing-md) 0;
        border-top: 1px solid var(--border-color);
        background: var(--accent-color);
        margin-top: var(--spacing-sm);
    }

    .member-vs {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-md);
        padding: var(--spacing-sm) var(--spacing-md);
    }

    .vs-text {
        font-weight: 600;
        color: var(--text-secondary);
        font-size: 0.875rem;
    }

    .game-info {
        background: var(--accent-color);
        padding: var(--spacing-sm) var(--spacing-md);
        border-top: 1px solid var(--border-color);
        font-size: 0.75rem;
        color: var(--text-secondary);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .channel-info {
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .time-info {
        color: var(--text-muted);
        flex-shrink: 0;
    }

    /* Mobile-first responsive design */
    @media (max-width: 768px) {
        .score-card:hover {
            transform: none;
        }
        
        .game-header {
            flex-direction: column;
            gap: var(--spacing-sm);
            text-align: center;
            padding: var(--spacing-sm);
        }
        
        .teams-container {
            padding: var(--spacing-md);
        }
        
        .team-row {
            padding: var(--spacing-sm) 0;
        }
        
        .team-info {
            gap: var(--spacing-sm);
        }
        
        .team-logo {
            width: 2rem;
            height: 2rem;
        }
        
        .team-name {
            font-size: 0.875rem;
        }
        
        .score-display {
            gap: var(--spacing-sm);
        }
        
        .quarter-scores {
            display: none;
        }
        
        .total-score {
            font-size: 1.125rem;
            min-width: 1.5rem;
        }
        
        .member-matchup {
            padding: var(--spacing-sm) 0;
        }

        .member-vs {
            gap: var(--spacing-sm);
            padding: var(--spacing-xs) var(--spacing-sm);
        }

        .vs-text {
            font-size: 0.8rem;
        }

        .game-info {
            padding: var(--spacing-xs) var(--spacing-sm);
            flex-direction: column;
            gap: var(--spacing-xs);
            text-align: center;
        }
        
        .channel-info,
        .time-info {
            font-size: 0.7rem;
        }
    }

    @media (max-width: 480px) {
        .teams-container {
            padding: var(--spacing-sm);
        }
        
        .team-row {
            padding: var(--spacing-xs) 0;
        }
        
        .team-info {
            gap: var(--spacing-xs);
        }
        
        .team-logo {
            width: 1.75rem;
            height: 1.75rem;
        }
        
        .team-name {
            font-size: 0.8rem;
        }
        
        .score-display {
            gap: var(--spacing-xs);
        }
        
        .total-score {
            font-size: 1rem;
            min-width: 1.25rem;
        }
        
        .member-matchup {
            padding: var(--spacing-xs) 0;
        }

        .member-vs {
            gap: var(--spacing-xs);
            padding: var(--spacing-xs);
        }

        .vs-text {
            font-size: 0.75rem;
        }

        .game-header {
            padding: var(--spacing-xs);
            gap: var(--spacing-xs);
        }
        
        .game-status {
            font-size: 0.8rem;
        }
        
        .status-indicator {
            width: 6px;
            height: 6px;
        }
    }

    /* Landscape mobile optimization */
    @media (max-width: 768px) and (orientation: landscape) {
        .game-header {
            flex-direction: row;
            text-align: left;
        }
        
        .game-info {
            flex-direction: row;
            text-align: left;
        }
        
        .quarter-scores {
            display: flex;
        }
        
        .team-logo {
            width: 2.25rem;
            height: 2.25rem;
        }
        
        .team-name {
            font-size: 0.9rem;
        }
    }

    /* Tablet optimization */
    @media (min-width: 769px) and (max-width: 1024px) {
        .quarter-scores {
            gap: var(--spacing-xs);
        }
        
        .quarter-score {
            width: 1.25rem;
            font-size: 0.7rem;
        }
    }
</style>

<div class="score-card">
    <div class="game-header">
        <div class="game-status">
            <div class="status-indicator" class:scheduled={game.status === 'scheduled'} class:final={game.status === 'final'}></div>
            <span>{game.status === 'live' ? 'LIVE' : game.status === 'scheduled' ? 'SCHEDULED' : 'FINAL'}</span>
        </div>
        <div class="channel-info">{game.channel || 'N/A'}</div>
    </div>

    <div class="teams-container">
        <div class="team-row">
            <div class="team-info">
                <img 
                    class="team-logo" 
                    src="{game.away_team.img}" 
                    alt="{game.away_team.name} logo"
                    on:error={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target) target.style.display = 'none';
                    }}
                />
                <div class="team-name" class:win={game.away_team.result === 'win'} class:loss={game.away_team.result === 'loss'}>
                    {game.away_team.name}
                </div>
            </div>
            <div class="score-display">
                {#if game.status === 'live'}
                    <div class="quarter-scores">
                        <div class="quarter-score">{sanitize(game.away_team.first_quarter)}</div>
                        <div class="quarter-score">{sanitize(game.away_team.second_quarter)}</div>
                        <div class="quarter-score">{sanitize(game.away_team.third_quarter)}</div>
                        <div class="quarter-score">{sanitize(game.away_team.fourth_quarter)}</div>
                    </div>
                {/if}
                {#if game.status !== 'scheduled'}
                    <div class="total-score" class:win={game.away_team.result === 'win'}>{game.away_team.total}</div>
                {/if}
            </div>
        </div>

        <div class="team-row">
            <div class="team-info">
                <img 
                    class="team-logo" 
                    src="{game.home_team.img}" 
                    alt="{game.home_team.name} logo"
                    on:error={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target) target.style.display = 'none';
                    }}
                />
                <div class="team-name" class:win={game.home_team.result === 'win'} class:loss={game.home_team.result === 'loss'}>
                    {game.home_team.name}
                </div>
            </div>
            <div class="score-display">
                {#if game.status === 'live'}
                    <div class="quarter-scores">
                        <div class="quarter-score">{sanitize(game.home_team.first_quarter)}</div>
                        <div class="quarter-score">{sanitize(game.home_team.second_quarter)}</div>
                        <div class="quarter-score">{sanitize(game.home_team.third_quarter)}</div>
                        <div class="quarter-score">{sanitize(game.home_team.fourth_quarter)}</div>
                    </div>
                {/if}
                {#if game.status !== 'scheduled'}
                    <div class="total-score" class:win={game.home_team.result === 'win'}>{game.home_team.total}</div>
                {/if}
            </div>
        </div>

        <!-- Member matchup display -->
        {#if game.away_team.member_name || game.home_team.member_name}
            <div class="member-matchup">
                <div class="member-vs">
                    {#if game.away_team.member_name}
                        <MemberView team={game.away_team} />
                    {/if}
                    {#if game.away_team.member_name && game.home_team.member_name}
                        <span class="vs-text">vs</span>
                    {/if}
                    {#if game.home_team.member_name}
                        <MemberView team={game.home_team} />
                    {/if}
                </div>
            </div>
        {/if}
    </div>

    {#if game.status !== 'final'}
        <div class="game-info">
            <div class="time-info">{game.time}</div>
        </div>
    {/if}
</div>