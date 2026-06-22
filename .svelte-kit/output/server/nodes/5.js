import * as server from '../entries/pages/admin/login/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/login/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/login/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.CZbnKOhu.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/BcGmjZuA.js","_app/immutable/chunks/BzpXGMbD.js","_app/immutable/chunks/BVu0bHin.js","_app/immutable/chunks/_Hi3jACY.js","_app/immutable/chunks/CYrc3xdm.js","_app/immutable/chunks/BVaPcx1G.js","_app/immutable/chunks/BDd8DIJz.js"];
export const stylesheets = [];
export const fonts = [];
