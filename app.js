// app.js
const express = require('express');
const app = express();
const config = require('./config');

app.use(express.static('public'));
app.use(express.json());
app.use('/joke', require('./routes/joke'));

const port = process.env.PORT || config.localPort; // Heroku
app.listen(port);
console.log('Listening on port ' + port + ' ...');

module.exports = app; // test