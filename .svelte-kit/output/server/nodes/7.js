import * as server from '../entries/pages/price/_page.server.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/price/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/price/+page.server.ts";
export const imports = ["_app/immutable/nodes/7.B6NdzznD.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/BcGmjZuA.js","_app/immutable/chunks/BzpXGMbD.js","_app/immutable/chunks/BVu0bHin.js","_app/immutable/chunks/_Hi3jACY.js","_app/immutable/chunks/DopgUOz9.js","_app/immutable/chunks/Cs28cK4r.js","_app/immutable/chunks/V76sW0YR.js","_app/immutable/chunks/CYrc3xdm.js"];
export const stylesheets = [];
export const fonts = [];
