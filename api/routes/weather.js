const express = require('express');
const router = express.Router();

const { getWeather } = require('../controllers/weather');

router.post('/', getWeather);

module.exports = router;