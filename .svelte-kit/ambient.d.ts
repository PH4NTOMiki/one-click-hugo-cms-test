
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
	export const AI_GATEWAY_API_KEY: string;
	export const SUPABASE_URL: string;
	export const POSTGRES_USER: string;
	export const SUPABASE_JWT_SECRET: string;
	export const POSTGRES_HOST: string;
	export const POSTGRES_DATABASE: string;
	export const SUPABASE_SECRET_KEY: string;
	export const SUPABASE_PUBLISHABLE_KEY: string;
	export const POSTGRES_URL_NON_POOLING: string;
	export const SUPABASE_ANON_KEY: string;
	export const POSTGRES_PRISMA_URL: string;
	export const SUPABASE_SERVICE_ROLE_KEY: string;
	export const POSTGRES_URL: string;
	export const POSTGRES_PASSWORD: string;
	export const VERCEL_WEB_ANALYTICS_ID: string;
	export const VERCEL_OIDC_TOKEN: string;
	export const V0_RUNTIME_URL: string;
	export const V0_CALLBACK_URL: string;
	export const npm_command: string;
	export const npm_config_npm_globalconfig: string;
	export const NODE: string;
	export const NODE_OPTIONS: string;
	export const NODE_EXTRA_CA_CERTS: string;
	export const npm_config_verify_deps_before_run: string;
	export const npm_config__jsr_registry: string;
	export const TURBO_ENV_MODE: string;
	export const npm_config_globalconfig: string;
	export const PWD: string;
	export const npm_config_global_dir: string;
	export const NPM_CONFIG_CAFILE: string;
	export const HOME: string;
	export const GIT_SSL_CAINFO: string;
	export const npm_package_version: string;
	export const CARGO_HTTP_CAINFO: string;
	export const DEV_PORT: string;
	export const pnpm_config_verify_deps_before_run: string;
	export const INIT_CWD: string;
	export const __NEXT_NODE_NATIVE_TS_LOADER_ENABLED: string;
	export const npm_lifecycle_script: string;
	export const npm_package_name: string;
	export const __VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS: string;
	export const npm_config_prefix: string;
	export const npm_config_frozen_lockfile: string;
	export const TURBO_UI: string;
	export const CURL_CA_BUNDLE: string;
	export const npm_config_global_bin_dir: string;
	export const npm_lifecycle_event: string;
	export const SHLVL: string;
	export const npm_config_user_agent: string;
	export const PNPM_SCRIPT_SRC_DIR: string;
	export const npm_execpath: string;
	export const SSL_CERT_FILE: string;
	export const NODE_PATH: string;
	export const PIP_CERT: string;
	export const REQUESTS_CA_BUNDLE: string;
	export const NODE_USE_SYSTEM_CA: string;
	export const npm_package_json: string;
	export const AWS_CA_BUNDLE: string;
	export const PATH: string;
	export const npm_config_node_gyp: string;
	export const npm_config_registry: string;
	export const npm_config_cafile: string;
	export const GRPC_DEFAULT_SSL_ROOTS_FILE_PATH: string;
	export const npm_node_execpath: string;
	export const OLDPWD: string;
	export const NODE_ENV: string;
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
	export const NEXT_PUBLIC_SUPABASE_URL: string;
	export const NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
	export const NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL: string;
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
		AI_GATEWAY_API_KEY: string;
		SUPABASE_URL: string;
		POSTGRES_USER: string;
		SUPABASE_JWT_SECRET: string;
		POSTGRES_HOST: string;
		POSTGRES_DATABASE: string;
		SUPABASE_SECRET_KEY: string;
		SUPABASE_PUBLISHABLE_KEY: string;
		POSTGRES_URL_NON_POOLING: string;
		SUPABASE_ANON_KEY: string;
		POSTGRES_PRISMA_URL: string;
		SUPABASE_SERVICE_ROLE_KEY: string;
		POSTGRES_URL: string;
		POSTGRES_PASSWORD: string;
		VERCEL_WEB_ANALYTICS_ID: string;
		VERCEL_OIDC_TOKEN: string;
		V0_RUNTIME_URL: string;
		V0_CALLBACK_URL: string;
		npm_command: string;
		npm_config_npm_globalconfig: string;
		NODE: string;
		NODE_OPTIONS: string;
		NODE_EXTRA_CA_CERTS: string;
		npm_config_verify_deps_before_run: string;
		npm_config__jsr_registry: string;
		TURBO_ENV_MODE: string;
		npm_config_globalconfig: string;
		PWD: string;
		npm_config_global_dir: string;
		NPM_CONFIG_CAFILE: string;
		HOME: string;
		GIT_SSL_CAINFO: string;
		npm_package_version: string;
		CARGO_HTTP_CAINFO: string;
		DEV_PORT: string;
		pnpm_config_verify_deps_before_run: string;
		INIT_CWD: string;
		__NEXT_NODE_NATIVE_TS_LOADER_ENABLED: string;
		npm_lifecycle_script: string;
		npm_package_name: string;
		__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS: string;
		npm_config_prefix: string;
		npm_config_frozen_lockfile: string;
		TURBO_UI: string;
		CURL_CA_BUNDLE: string;
		npm_config_global_bin_dir: string;
		npm_lifecycle_event: string;
		SHLVL: string;
		npm_config_user_agent: string;
		PNPM_SCRIPT_SRC_DIR: string;
		npm_execpath: string;
		SSL_CERT_FILE: string;
		NODE_PATH: string;
		PIP_CERT: string;
		REQUESTS_CA_BUNDLE: string;
		NODE_USE_SYSTEM_CA: string;
		npm_package_json: string;
		AWS_CA_BUNDLE: string;
		PATH: string;
		npm_config_node_gyp: string;
		npm_config_registry: string;
		npm_config_cafile: string;
		GRPC_DEFAULT_SSL_ROOTS_FILE_PATH: string;
		npm_node_execpath: string;
		OLDPWD: string;
		NODE_ENV: string;
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
		NEXT_PUBLIC_SUPABASE_URL: string;
		NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
		NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL: string;
		[key: `NEXT_PUBLIC_${string}`]: string | undefined;
	}
}
