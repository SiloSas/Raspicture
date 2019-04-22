const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();

const multer = require('multer');
var upload = multer({ dest:  __dirname + '/Front/Images' });

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err);
    const dbase = database.db("test");
    require('./app/routes')(app, dbase, upload);

    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
})