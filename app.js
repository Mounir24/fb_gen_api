const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet')
const bodyParser = require('body-parser');
require('dotenv/config');
const cors = require('cors');
var app = express();

// IMPORT MONGODB CONNECTION FUNCTION
const dbConnection = require('./configuration/db_connection');
const DB_URI = process.env.MONGO_URI;
dbConnection(DB_URI);
//console.log(process.env.MONGO_URI);

// IMPORT UTILS / HELPERS
const httpLogger = require('./utils/logger/httpLogger'); // HTTP LOGGER UTIL

// CORS WHITELIST (DOMAINS)
const whitelist = ['http://localhost:3000', 'http://localhost:4041', 'https://fbportfoliogenerator.netlify.app'];
//CORS OPTIONS
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('ORIGIN NOT ALLOWED BY CORS :('));
        }
    },
    optionsSuccessStatus: 200
}

// ALLOW ALL REQUESTS FROM ALL DOMAINS 
app.all('/*', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

// HELMET PROTECTION MIDDLWARES
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter());
app.use(helmet.hsts({ maxAge: 24 * 60 * 60 })); // FORCE HTTPS ONLY
app.use(httpLogger)

// MIDDLEWARES ROUTES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('tiny'));
app.use(cors(corsOptions));


// IMPORT ROUTES 
const indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/client/', indexRouter);
//app.use('/users', usersRouter);

module.exports = app;
