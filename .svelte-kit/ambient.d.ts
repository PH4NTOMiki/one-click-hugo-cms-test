
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/private';
 * 
 * console.log(ENVIRONMENT); // => "production"
 * console.log(PUBLIC_BASE_URL); // => throws error during build
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/private' {
	export const NODE_ENV: string;
	export const GRPC_DEFAULT_SSL_ROOTS_FILE_PATH: string;
	export const NODE_PATH: string;
	export const npm_config_user_agent: string;
	export const SUPABASE_SECRET_KEY: string;
	export const POSTGRES_USER: string;
	export const SUPABASE_ANON_KEY: string;
	export const OLDPWD: string;
	export const CURL_CA_BUNDLE: string;
	export const __VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS: string;
	export const VERCEL_OIDC_TOKEN: string;
	export const __NEXT_NODE_NATIVE_TS_LOADER_ENABLED: string;
	export const V0_CODE_SERVER_CALLBACK_TOKEN: string;
	export const PWD: string;
	export const SUPABASE_JWT_SECRET: string;
	export const NPM_CONFIG_CAFILE: string;
	export const V0_CODE_SERVER_CALLBACK_URL: string;
	export const PNPM_PACKAGE_NAME: string;
	export const SHLVL: string;
	export const SUPABASE_PUBLISHABLE_KEY: string;
	export const NODE_OPTIONS: string;
	export const REQUESTS_CA_BUNDLE: string;
	export const SSL_CERT_FILE: string;
	export const POSTGRES_PRISMA_URL: string;
	export const POSTGRES_PASSWORD: string;
	export const npm_config_verify_deps_before_run: string;
	export const POSTGRES_HOST: string;
	export const SVELTEKIT_FORK: string;
	export const PATH: string;
	export const DEV_PORT: string;
	export const npm_command: string;
	export const V0_RUNTIME_URL: string;
	export const POSTGRES_URL_NON_POOLING: string;
	export const AWS_CA_BUNDLE: string;
	export const TURBO_UI: string;
	export const NODE_EXTRA_CA_CERTS: string;
	export const AI_GATEWAY_API_KEY: string;
	export const SUPABASE_SERVICE_ROLE_KEY: string;
	export const TURBO_ENV_MODE: string;
	export const CARGO_HTTP_CAINFO: string;
	export const POSTGRES_DATABASE: string;
	export const HOME: string;
	export const PIP_CERT: string;
	export const NODE_USE_SYSTEM_CA: string;
	export const SUPABASE_URL: string;
	export const V0_CALLBACK_URL: string;
	export const VERCEL_WEB_ANALYTICS_ID: string;
	export const POSTGRES_URL: string;
	export const GIT_SSL_CAINFO: string;
	export const pnpm_config_verify_deps_before_run: string;
}

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/public';
 * 
 * console.log(ENVIRONMENT); // => throws error during build
 * console.log(PUBLIC_BASE_URL); // => "http://site.com"
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/public' {
	export const NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: string;
	export const NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL: string;
	export const NEXT_PUBLIC_SUPABASE_URL: string;
	export const NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * 
 * console.log(env.ENVIRONMENT); // => "production"
 * console.log(env.PUBLIC_BASE_URL); // => undefined
 * ```
 */
declare module '$env/dynamic/private' {
	export const env: {
		NODE_ENV: string;
		GRPC_DEFAULT_SSL_ROOTS_FILE_PATH: string;
		NODE_PATH: string;
		npm_config_user_agent: string;
		SUPABASE_SECRET_KEY: string;
		POSTGRES_USER: string;
		SUPABASE_ANON_KEY: string;
		OLDPWD: string;
		CURL_CA_BUNDLE: string;
		__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS: string;
		VERCEL_OIDC_TOKEN: string;
		__NEXT_NODE_NATIVE_TS_LOADER_ENABLED: string;
		V0_CODE_SERVER_CALLBACK_TOKEN: string;
		PWD: string;
		SUPABASE_JWT_SECRET: string;
		NPM_CONFIG_CAFILE: string;
		V0_CODE_SERVER_CALLBACK_URL: string;
		PNPM_PACKAGE_NAME: string;
		SHLVL: string;
		SUPABASE_PUBLISHABLE_KEY: string;
		NODE_OPTIONS: string;
		REQUESTS_CA_BUNDLE: string;
		SSL_CERT_FILE: string;
		POSTGRES_PRISMA_URL: string;
		POSTGRES_PASSWORD: string;
		npm_config_verify_deps_before_run: string;
		POSTGRES_HOST: string;
		SVELTEKIT_FORK: string;
		PATH: string;
		DEV_PORT: string;
		npm_command: string;
		V0_RUNTIME_URL: string;
		POSTGRES_URL_NON_POOLING: string;
		AWS_CA_BUNDLE: string;
		TURBO_UI: string;
		NODE_EXTRA_CA_CERTS: string;
		AI_GATEWAY_API_KEY: string;
		SUPABASE_SERVICE_ROLE_KEY: string;
		TURBO_ENV_MODE: string;
		CARGO_HTTP_CAINFO: string;
		POSTGRES_DATABASE: string;
		HOME: string;
		PIP_CERT: string;
		NODE_USE_SYSTEM_CA: string;
		SUPABASE_URL: string;
		V0_CALLBACK_URL: string;
		VERCEL_WEB_ANALYTICS_ID: string;
		POSTGRES_URL: string;
		GIT_SSL_CAINFO: string;
		pnpm_config_verify_deps_before_run: string;
		[key: `NEXT_PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://example.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.ENVIRONMENT); // => undefined, not public
 * console.log(env.PUBLIC_BASE_URL); // => "http://example.com"
 * ```
 * 
 * ```
 * 
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: string;
		NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL: string;
		NEXT_PUBLIC_SUPABASE_URL: string;
		NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
		[key: `NEXT_PUBLIC_${string}`]: string | undefined;
	}
}
