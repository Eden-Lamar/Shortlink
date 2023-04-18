// Import dependencies
const request = require("supertest");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000

// Import routes
const transcode = require("./routes/routes.js")
// const { encode, decode, statistic, redirect } = require("./routes");

// Mount routes
app.use(express.json());
app.use("/", transcode)


describe("API Tests", () => {
	// Test the POST /encode endpoint
	it("should return a short URL", async () => {
		const res = await request(app)
			.post("/encode")
			.send({ url: "https://google.com" });
		expect(res.statusCode).toEqual(200);
		expect(res.body.shortUrl).toBeDefined();
	});

	// Test the POST /decode endpoint
	it("should return the original URL", async () => {
		const resEncode = await request(app)
			.post("/encode")
			.send({ url: "https://google.com" });
		const resDecode = await request(app)
			.post("/decode")
			.send({ shortUrl: resEncode.body.shortUrl });
		expect(resDecode.statusCode).toEqual(200);
		expect(resDecode.body.url).toEqual("https://google.com");
	});

	// Test the GET /statistic/:id endpoint
	it("should return the URL and visits count", async () => {
		const resEncode = await request(app)
			.post("/encode")
			.send({ url: "https://google.com" });
		const id = resEncode.body.shortUrl.split("/").pop();
		const resStat = await request(app).get(`/statistic/${id}`);
		expect(resStat.statusCode).toEqual(200);
		expect(resStat.body.url).toEqual("https://google.com");
		expect(resStat.body.visits).toBeDefined();
	});

	// Test the GET /s/:id endpoint
	it("should redirect to the original URL", async () => {
		const resEncode = await request(app)
			.post("/encode")
			.send({ url: "https://google.com" });
		const id = resEncode.body.shortUrl.split("/").pop();
		const resRedirect = await request(app).get(`/s/${id}`);
		expect(resRedirect.statusCode).toEqual(302);
		expect(resRedirect.header.location).toEqual("https://google.com");
	});
});

app.listen(port, () => {
	console.log(`\nTHE FORCE IS WITH YOU ON PORT ${port}...\n`)
});