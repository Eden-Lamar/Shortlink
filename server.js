// create server and entry point to app

// import npm dependencies
const express = require("express");
const morgan = require("morgan");
require("colors")

// import files dependencies
const transcode = require("./routes/routes.js")

const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use("/", transcode)


const port = process.env.PORT || 3000;

// Create server
app.listen(port, () => {
	console.log(`\nTHE FORCE IS WITH YOU ON PORT ${port}...\n`.blue.bold)
})