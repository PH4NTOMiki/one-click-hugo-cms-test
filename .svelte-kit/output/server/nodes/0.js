import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.DeXbQ4k-.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/BcGmjZuA.js","_app/immutable/chunks/BWn82y1R.js","_app/immutable/chunks/BzpXGMbD.js","_app/immutable/chunks/NW3E00rx.js","_app/immutable/chunks/_Hi3jACY.js","_app/immutable/chunks/BVu0bHin.js","_app/immutable/chunks/V76sW0YR.js"];
export const stylesheets = ["_app/immutable/assets/0.DDgSLQr_.css"];
export const fonts = [];
