export default defineEventHandler(async (event) => ({ preview: await readBody(event), persisted: false }));
