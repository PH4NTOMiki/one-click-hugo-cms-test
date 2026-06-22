
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
	export const unstable_restarts: string;
	export const treekill: string;
	export const npm_config_npm_globalconfig: string;
	export const env: string;
	export const filter_env: string;
	export const NODE: string;
	export const NODE_OPTIONS: string;
	export const namespace: string;
	export const NODE_EXTRA_CA_CERTS: string;
	export const npm_config_verify_deps_before_run: string;
	export const npm_config__jsr_registry: string;
	export const restart_time: string;
	export const TURBO_ENV_MODE: string;
	export const npm_config_globalconfig: string;
	export const axm_options: string;
	export const vizion_running: string;
	export const PWD: string;
	export const PM2_USAGE: string;
	export const npm_config_global_dir: string;
	export const exec_interpreter: string;
	export const PM2_HOME: string;
	export const NPM_CONFIG_CAFILE: string;
	export const HOME: string;
	export const NODE_APP_INSTANCE: string;
	export const GIT_SSL_CAINFO: string;
	export const pm_id: string;
	export const npm_package_version: string;
	export const pm_uptime: string;
	export const km_link: string;
	export const pm_cwd: string;
	export const CARGO_HTTP_CAINFO: string;
	export const pnpm_config_verify_deps_before_run: string;
	export const autostart: string;
	export const axm_monitor: string;
	export const instance_var: string;
	export const pmx: string;
	export const INIT_CWD: string;
	export const __NEXT_NODE_NATIVE_TS_LOADER_ENABLED: string;
	export const npm_lifecycle_script: string;
	export const unique_id: string;
	export const npm_package_name: string;
	export const __VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS: string;
	export const vizion: string;
	export const npm_config_prefix: string;
	export const username: string;
	export const npm_config_frozen_lockfile: string;
	export const TURBO_UI: string;
	export const CURL_CA_BUNDLE: string;
	export const watch: string;
	export const windowsHide: string;
	export const instances: string;
	export const automation: string;
	export const axm_actions: string;
	export const npm_config_global_bin_dir: string;
	export const npm_lifecycle_event: string;
	export const SHLVL: string;
	export const npm_config_user_agent: string;
	export const PNPM_SCRIPT_SRC_DIR: string;
	export const npm_execpath: string;
	export const SSL_CERT_FILE: string;
	export const NODE_PATH: string;
	export const PM2_INTERACTOR_PROCESSING: string;
	export const PIP_CERT: string;
	export const REQUESTS_CA_BUNDLE: string;
	export const NODE_USE_SYSTEM_CA: string;
	export const npm_package_json: string;
	export const created_at: string;
	export const merge_logs: string;
	export const pm_pid_path: string;
	export const AWS_CA_BUNDLE: string;
	export const PATH: string;
	export const npm_config_node_gyp: string;
	export const pm_err_log_path: string;
	export const npm_config_registry: string;
	export const kill_retry_time: string;
	export const axm_dynamic: string;
	export const autorestart: string;
	export const node_args: string;
	export const exec_mode: string;
	export const npm_config_cafile: string;
	export const GRPC_DEFAULT_SSL_ROOTS_FILE_PATH: string;
	export const pm_exec_path: string;
	export const npm_node_execpath: string;
	export const status: string;
	export const name: string;
	export const pm_out_log_path: string;
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
		unstable_restarts: string;
		treekill: string;
		npm_config_npm_globalconfig: string;
		env: string;
		filter_env: string;
		NODE: string;
		NODE_OPTIONS: string;
		namespace: string;
		NODE_EXTRA_CA_CERTS: string;
		npm_config_verify_deps_before_run: string;
		npm_config__jsr_registry: string;
		restart_time: string;
		TURBO_ENV_MODE: string;
		npm_config_globalconfig: string;
		axm_options: string;
		vizion_running: string;
		PWD: string;
		PM2_USAGE: string;
		npm_config_global_dir: string;
		exec_interpreter: string;
		PM2_HOME: string;
		NPM_CONFIG_CAFILE: string;
		HOME: string;
		NODE_APP_INSTANCE: string;
		GIT_SSL_CAINFO: string;
		pm_id: string;
		npm_package_version: string;
		pm_uptime: string;
		km_link: string;
		pm_cwd: string;
		CARGO_HTTP_CAINFO: string;
		pnpm_config_verify_deps_before_run: string;
		autostart: string;
		axm_monitor: string;
		instance_var: string;
		pmx: string;
		INIT_CWD: string;
		__NEXT_NODE_NATIVE_TS_LOADER_ENABLED: string;
		npm_lifecycle_script: string;
		unique_id: string;
		npm_package_name: string;
		__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS: string;
		vizion: string;
		npm_config_prefix: string;
		username: string;
		npm_config_frozen_lockfile: string;
		TURBO_UI: string;
		CURL_CA_BUNDLE: string;
		watch: string;
		windowsHide: string;
		instances: string;
		automation: string;
		axm_actions: string;
		npm_config_global_bin_dir: string;
		npm_lifecycle_event: string;
		SHLVL: string;
		npm_config_user_agent: string;
		PNPM_SCRIPT_SRC_DIR: string;
		npm_execpath: string;
		SSL_CERT_FILE: string;
		NODE_PATH: string;
		PM2_INTERACTOR_PROCESSING: string;
		PIP_CERT: string;
		REQUESTS_CA_BUNDLE: string;
		NODE_USE_SYSTEM_CA: string;
		npm_package_json: string;
		created_at: string;
		merge_logs: string;
		pm_pid_path: string;
		AWS_CA_BUNDLE: string;
		PATH: string;
		npm_config_node_gyp: string;
		pm_err_log_path: string;
		npm_config_registry: string;
		kill_retry_time: string;
		axm_dynamic: string;
		autorestart: string;
		node_args: string;
		exec_mode: string;
		npm_config_cafile: string;
		GRPC_DEFAULT_SSL_ROOTS_FILE_PATH: string;
		pm_exec_path: string;
		npm_node_execpath: string;
		status: string;
		name: string;
		pm_out_log_path: string;
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
