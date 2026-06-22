import * as server from '../entries/pages/glasanje/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/glasanje/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/glasanje/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.BCSDnYKK.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/BcGmjZuA.js","_app/immutable/chunks/BzpXGMbD.js","_app/immutable/chunks/BVu0bHin.js","_app/immutable/chunks/_Hi3jACY.js","_app/immutable/chunks/DopgUOz9.js","_app/immutable/chunks/CYrc3xdm.js","_app/immutable/chunks/Cs28cK4r.js","_app/immutable/chunks/V76sW0YR.js","_app/immutable/chunks/pK6643e_.js"];
export const stylesheets = [];
export const fonts = [];
