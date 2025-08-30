# Node 22 Upgrade Guide

This project has been updated to support Node 22 as required by Vercel. Here are the key changes made and steps to complete the upgrade:

## Changes Made

### 1. Package.json Updates

- Updated Node engine requirement from `18.20.4` to `>=22.0.0`
- Updated SvelteKit from `^1.5.0` to `^2.0.0`
- Updated Svelte from `^3.54.0` to `^5.0.0`
- Updated Vite from `^4.2.0` to `^6.0.0` (required for SvelteKit 2.0 compatibility)
- Updated all SvelteKit adapters to latest versions
- Updated ESLint to `^9.0.0` and related plugins to compatible versions
- Updated TypeScript ESLint packages to `^8.0.0` (compatible with ESLint 9.x)
- Updated TypeScript to `^5.3.0`
- Updated other dependencies to Node 22 compatible versions
- **Removed unused dependencies**: `chart.js` and `svelte-chartjs` (not used in codebase and incompatible with Svelte 5.0)

### 2. Configuration Updates

- Updated `svelte.config.js` to use new import paths for SvelteKit 2.0
- Updated `vite.config.ts` to use Vite 6.0 imports
- Updated `.eslintrc.cjs` to use new Svelte plugin syntax
- Updated `tsconfig.json` with modern TypeScript settings

### 3. Code Compatibility Fixes

- **Cheerio imports**: Updated from default import to namespace import (`import * as cheerio from 'cheerio'`)
- **TypeScript strict mode**: Added proper type annotations for callback parameters
- **Vite config**: Removed invalid `test` property from main Vite config
- **Type definitions**: Consolidated GameTeam and GameTeamScore types for consistency
- **Accessibility**: Added proper ARIA roles and keyboard event handlers
- **CSS cleanup**: Removed unused CSS selectors

## Steps to Complete the Upgrade

### 1. Install Node 22

Make sure you have Node 22 installed:

```bash
# Using nvm (recommended)
nvm install 22
nvm use 22

# Or download from nodejs.org
```

### 2. Clean and Reinstall Dependencies

```bash
# Remove existing node_modules and lock files
rm -rf node_modules package-lock.json

# Install dependencies with Node 22
npm install
```

### 3. Regenerate SvelteKit Configuration

```bash
# This will regenerate the .svelte-kit directory with updated configs
npm run check
```

### 4. Test the Application

```bash
# Start development server
npm run dev

# Run tests
npm run test:unit

# Build for production
npm run build
```

## Breaking Changes to Address

### Svelte 5.0 Changes

- Svelte 5.0 introduces runes and other new features
- Some component syntax may need updates
- Check the [Svelte 5.0 migration guide](https://svelte.dev/docs/v5-migration) for details

### SvelteKit 2.0 Changes

- Some API changes may affect your routes
- Check the [SvelteKit 2.0 migration guide](https://kit.svelte.dev/docs/migrating-to-sveltekit-2) for details

### Vite 6.0 Changes

- Vite 6.0 introduces some breaking changes
- Check the [Vite 6.0 migration guide](https://vitejs.dev/guide/migration) for details

### ESLint 9.0 Changes

- The Svelte plugin has been updated
- TypeScript ESLint packages updated to version 8.x for compatibility
- Some linting rules may have changed

## Troubleshooting

### Dependency Conflicts

If you encounter dependency conflicts like the `svelte-chartjs`, Vite version, or ESLint compatibility issues:

- Check if dependencies are actually used in your codebase
- Remove unused dependencies that are incompatible with newer versions
- Use `npm ls` to identify dependency conflicts
- Ensure all related packages are updated to compatible versions (e.g., Vite 6.0 with SvelteKit 2.0, ESLint 9.x with TypeScript ESLint 8.x)
- Check peer dependency requirements in error messages

### Common Dependency Conflicts

1. **Svelte version conflicts**: Ensure all Svelte-related packages support Svelte 5.0
2. **Vite version conflicts**: SvelteKit 2.0 requires Vite 6.x
3. **ESLint version conflicts**: TypeScript ESLint 8.x is compatible with ESLint 9.x
4. **Unused dependencies**: Remove packages not used in your codebase

### TypeScript and Import Issues

After upgrading, you may encounter:

1. **Cheerio import errors**: Use `import * as cheerio from 'cheerio'` instead of default import
2. **Type annotation errors**: Add proper types for callback parameters (e.g., `(index: number, element: any)`)
3. **Missing type definitions**: Ensure all used types are properly defined in your types file
4. **Vite config errors**: Remove invalid properties like `test` from main Vite config

### TypeScript Errors

If you see TypeScript errors about deprecated options, run:

```bash
npm run check
```

This will regenerate the SvelteKit TypeScript configuration.

### Build Errors

If you encounter build errors:

1. Check that all dependencies are properly installed
2. Ensure you're using Node 22
3. Clear the build cache: `rm -rf .svelte-kit build`

### Vercel Deployment

The project should now deploy successfully on Vercel with Node 22. The `engines` field in `package.json` will ensure Vercel uses the correct Node version.

## Verification

After completing the upgrade:

1. ✅ Node 22 is being used (`node --version`)
2. ✅ All dependencies install without errors
3. ✅ Development server starts successfully
4. ✅ Tests pass
5. ✅ Production build completes
6. ✅ Vercel deployment succeeds
7. ✅ `npm run check` passes with 0 errors and 0 warnings
