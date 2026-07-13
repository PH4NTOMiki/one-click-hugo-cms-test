export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg","najsestra-logo.jpeg","najsestra-mark.jpeg","nurse-hero.png","nurse.jpeg"]),
	mimeTypes: {".svg":"image/svg+xml",".jpeg":"image/jpeg",".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.B3l349qw.js",app:"_app/immutable/entry/app.B5yLb4rP.js",imports:["_app/immutable/entry/start.B3l349qw.js","_app/immutable/chunks/RL9zNp0A.js","_app/immutable/chunks/DPGshX3i.js","_app/immutable/chunks/CXJWxXjp.js","_app/immutable/chunks/D9iyWlf1.js","_app/immutable/entry/app.B5yLb4rP.js","_app/immutable/chunks/CXJWxXjp.js","_app/immutable/chunks/D9iyWlf1.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/DPGshX3i.js","_app/immutable/chunks/Bq5wUYFV.js","_app/immutable/chunks/-raVBbL2.js","_app/immutable/chunks/D4XZ-XBO.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js')),
			__memo(() => import('../output/server/nodes/6.js')),
			__memo(() => import('../output/server/nodes/7.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/admin/export",
				pattern: /^\/admin\/export\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/admin/export/_server.ts.js'))
			},
			{
				id: "/admin/login",
				pattern: /^\/admin\/login\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/glasanje",
				pattern: /^\/glasanje\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/price",
				pattern: /^\/price\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
