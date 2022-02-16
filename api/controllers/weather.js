
const axios = require('axios');
const api_key = 'f7a00221dd1643c2abb234552221302';

module.exports = {
    getWeather: (req, res) => {
        const city = req.body.city;
        let config = {
            method: 'get',
            url: `http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}`,
            headers: {}
        };
        axios(config)
            .then(function (response) {
                return res.status(200).json({
                    message: response.data
                })
            })
            .catch(function (error) {
                console.log("error");
                return res.status(400).json({
                    message: "City does not exist"
                })
            });
    },
}