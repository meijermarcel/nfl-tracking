<script lang="ts">
    import type { GameTeam } from "$lib/types";

    export let team: GameTeam;
</script>

<style>
    .member-container {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-xs) var(--spacing-sm);
        background: var(--accent-light);
        border-radius: var(--radius-md);
        border: 1px solid var(--border-color);
        transition: all var(--transition-fast);
    }

    .member-container:hover {
        background: var(--accent-color);
        transform: translateY(-1px);
    }

    .member-container.win {
        background: var(--success-color);
        color: white;
        border-color: var(--success-color);
    }

    .member-container.win:hover {
        background: var(--success-color);
        filter: brightness(1.1);
    }

    .team-logo {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: var(--radius-sm);
        object-fit: contain;
        background: white;
        padding: 2px;
        flex-shrink: 0;
    }

    .member-name {
        font-weight: 600;
        font-size: 0.875rem;
        color: var(--text-primary);
        white-space: nowrap;
    }

    .member-container.win .member-name {
        color: white;
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
        .member-container {
            padding: var(--spacing-xs);
            gap: var(--spacing-xs);
        }

        .team-logo {
            width: 1.25rem;
            height: 1.25rem;
        }

        .member-name {
            font-size: 0.8rem;
        }
    }

    @media (max-width: 480px) {
        .member-container {
            padding: var(--spacing-xs);
        }

        .team-logo {
            width: 1rem;
            height: 1rem;
        }

        .member-name {
            font-size: 0.75rem;
        }
    }
</style>

{#if team.member_name}
    <div class="member-container" class:win={team.result === 'win'}>
        <img 
            class="team-logo" 
            src="{team.img}" 
            alt="{team.name} logo"
            on:error={(e) => {
                const target = e.target as HTMLImageElement;
                if (target) target.style.display = 'none';
            }}
        />
        <span class="member-name">{team.member_name}</span>
    </div>
{/if}