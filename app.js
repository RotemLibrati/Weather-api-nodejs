const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const morgan = require('morgan');
const weatherRoutes = require('./api/routes/weather');

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
})); 
app.use(bodyParser.raw());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET");
        return res.status(200).json({});
    }
    next();
});

app.use('/weather', weatherRoutes);



app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;