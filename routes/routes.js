// Import dependencies
const express = require('express');
const { encode, decode, linkStat } = require('../controller/shortLinkCtrl');

// Create a router object
const router = express.Router();

// Endpoint to encode a URL to a short URL
router.post('/encode', encode)
// Endpoint to decode a short URL to its original URL
router.post('/decode', decode)
// Endpoint to get basic statistics of a short URL
router.get('/statistic/:id', linkStat)


module.exports = router;