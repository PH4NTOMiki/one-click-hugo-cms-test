import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.C3hvp9r4.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CXJWxXjp.js","_app/immutable/chunks/D4XZ-XBO.js","_app/immutable/chunks/DPGshX3i.js","_app/immutable/chunks/D9iyWlf1.js","_app/immutable/chunks/jkBdmERN.js","_app/immutable/chunks/-raVBbL2.js","_app/immutable/chunks/Bq5wUYFV.js","_app/immutable/chunks/DUteiBSa.js","_app/immutable/chunks/RL9zNp0A.js","_app/immutable/chunks/449Ceg6K.js","_app/immutable/chunks/avF7ZwZk.js"];
export const stylesheets = ["_app/immutable/assets/0.8vC86NgN.css"];
export const fonts = [];
