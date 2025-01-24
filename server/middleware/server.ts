export default defineEventHandler((event) => {
	const port = process.env.PORT || 3000;
	process.env.NITRO_PORT = String(port);
	process.env.PORT = String(port);
});
