import * as server from '../entries/pages/admin/_layout.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.CjjGhrG2.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/BcGmjZuA.js","_app/immutable/chunks/NW3E00rx.js","_app/immutable/chunks/_Hi3jACY.js"];
export const stylesheets = [];
export const fonts = [];
