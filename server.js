const express = require('express');
var app = express();

// Body-parser Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Global variables
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

// Path
const path = require('path');

// Serve Static Resources
app.use('/public', express.static('public'));

// Database
const { sequelize } = require('./config/database');
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const excelRoutes = require('./routes/api');
app.use(excelRoutes)


// Server listen
var PORT = process.env.PORT || 5000;
var HOST = process.env.HOST || '127.0.0.1';
app.listen(PORT, HOST, (error) => {
    if (error) throw error;
    console.log(`Express server started at http://${HOST}:${PORT}`);
});