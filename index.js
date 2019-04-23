const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
const exec = require('child_process').exec;


const multer = require('multer');
var upload = multer({ dest:  __dirname + '/Front/Images' });

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err);
    const dbase = database.db("test");
    require('./app/routes')(app, dbase, upload);

    app.listen(port, () => {
        console.log('We are live on ' + port);
        exec("chromium --start-fullscreen ./Front/Index.html")
    });
})