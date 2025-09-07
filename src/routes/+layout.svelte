<script>
    import { SyncLoader } from 'svelte-loading-spinners';
    import { page, navigating } from '$app/stores';

    // import { dev } from '$app/environment';
    // import { inject } from '@vercel/analytics';
 
    // inject({ mode: dev ? 'development' : 'production' });
</script>

<style>
    .container {
        padding: var(--spacing-lg) var(--spacing-md);
        max-width: 800px;
        margin: 0 auto;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }

    .content {
        flex: 1;
        margin-top: var(--spacing-xl);
    }

    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: var(--accent-light);
        backdrop-filter: blur(10px);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-xl);
        padding: var(--spacing-md) var(--spacing-lg);
        box-shadow: var(--shadow-lg);
        position: sticky;
        top: var(--spacing-md);
        z-index: 100;
        margin-bottom: var(--spacing-lg);
    }

    .nav-brand {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
    }

    .title {
        font-weight: 800;
        font-size: 1.5rem;
        color: var(--primary-color);
        margin: 0;
    }

    .nav-links {
        display: flex;
        gap: var(--spacing-sm);
    }

    a {
        color: var(--text-secondary);
        text-decoration: none;
        font-weight: 500;
        padding: var(--spacing-sm) var(--spacing-md);
        border-radius: var(--radius-md);
        transition: all var(--transition-fast);
        position: relative;
        overflow: hidden;
        min-height: var(--touch-target-min);
        min-width: var(--touch-target-min);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    a:hover {
        color: var(--primary-color);
        background-color: var(--accent-color);
        transform: translateY(-1px);
    }

    a.active {
        color: var(--accent-light);
        background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
        box-shadow: var(--shadow-md);
    }

    a.active:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
    }

    footer {
        margin-top: auto;
        padding: var(--spacing-lg) 0;
        text-align: center;
        color: var(--text-muted);
        border-top: 1px solid var(--border-color);
    }

    footer p {
        margin: 0;
        font-size: 0.875rem;
        font-weight: 500;
    }

    .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 200px;
    }

    /* Mobile-first responsive design */
    @media (max-width: 768px) {
        .container {
            padding: var(--mobile-padding);
            max-width: 100%;
        }
        
        .content {
            margin-top: var(--spacing-lg);
        }
        
        nav {
            flex-direction: column;
            gap: var(--spacing-md);
            padding: var(--spacing-md);
            margin: var(--spacing-sm);
            border-radius: var(--radius-lg);
        }
        
        .nav-links {
            width: 100%;
            justify-content: center;
            gap: var(--spacing-md);
        }
        
        .title {
            font-size: 1.25rem;
        }
        
        a {
            flex: 1;
            padding: var(--spacing-md);
            font-size: 0.875rem;
        }
        
        a:hover {
            transform: none;
        }
        
        a.active:hover {
            transform: none;
        }
    }

    @media (max-width: 480px) {
        .container {
            padding: var(--spacing-sm);
        }
        
        nav {
            margin: var(--spacing-xs);
            padding: var(--spacing-sm);
        }
        
        .nav-links {
            gap: var(--spacing-sm);
        }
        
        a {
            padding: var(--spacing-sm) var(--spacing-md);
            font-size: 0.8rem;
        }
        
        .title {
            font-size: 1.125rem;
        }
    }

    /* Landscape mobile optimization */
    @media (max-width: 768px) and (orientation: landscape) {
        nav {
            flex-direction: row;
            gap: var(--spacing-md);
        }
        
        .nav-links {
            width: auto;
        }
    }
</style>

<nav>
    <div class="nav-brand">
        <div class="title">🏈 NFL 2025</div>
    </div>
    <div class="nav-links">
        <a href="/" data-sveltekit-preload-data class:active={$page.url.pathname==='/'}>Standings</a>
    </div>
</nav>

<div class="container">
    <div class="content">
        {#if $navigating}
            <div class="loading">
                <SyncLoader size="60" color="var(--primary-color)" unit="px" duration="1s" />
            </div>
        {:else}
            <slot />
        {/if}
    </div>
</div>

<footer>
    <p>twelveminusfive</p>
</footer>