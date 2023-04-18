// Import dependencies
const { nanoid } = require('nanoid');

const urlMap = {};

// @desc encode all links
// @route POST /api/v1/transcode/encode
// @access public
const encode = (req, res) => {
	const { url } = req.body;
	if (!url) {
		return res.status(400).json({ error: 'URL is required' });
	}
	const id = nanoid(7); // Generate a unique 7 character ID
	urlMap[id] = { url, visits: 0 }; // Store the URL and set visits to 0
	const shortUrl = `http://localhost:3000/s/${id}`;
	return res.status(201).json({
		status: success,
		shortUrl
	});
}

// @desc decode all links
// @route POST /api/v1/transcode/decode
// @access public
const decode = (req, res) => {
	const { shortUrl } = req.body;
	if (!shortUrl) {
		return res.status(400).json({ error: 'Short URL is required' });
	}
	const id = shortUrl.split('/').pop(); // Extract the ID from the short URL
	const urlObject = urlMap[id];
	if (!urlObject) {
		return res.status(404).json({ error: 'Short URL not found' });
	}
	urlObject.visits += 1; // Increment the number of visits
	return res.json({ url: urlObject.url });
}

// @desc get basic stat of link
// @route POST /api/v1/transcode/statistic/:id
// @access public
const linkStat = (req, res) => {
	const { id } = req.params;
	const urlObject = urlMap[id];
	if (!urlObject) {
		return res.status(404).json({ error: 'Short URL not found' });
	}
	const { url, visits } = urlObject;
	return res.json({ url, visits });
};

// export controllers
module.exports = {
	encode,
	decode,
	linkStat
}