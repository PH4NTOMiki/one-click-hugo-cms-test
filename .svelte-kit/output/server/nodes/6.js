import * as server from '../entries/pages/glasanje/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/glasanje/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/glasanje/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.BRAx0acE.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CXJWxXjp.js","_app/immutable/chunks/D9iyWlf1.js","_app/immutable/chunks/Bq5wUYFV.js","_app/immutable/chunks/-raVBbL2.js","_app/immutable/chunks/BatmWDM5.js","_app/immutable/chunks/yKc_73iq.js","_app/immutable/chunks/RL9zNp0A.js","_app/immutable/chunks/DPGshX3i.js","_app/immutable/chunks/DUteiBSa.js","_app/immutable/chunks/avF7ZwZk.js"];
export const stylesheets = [];
export const fonts = [];
