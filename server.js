const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const sessionConfig = require('./sessionConfig');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const dbUrl = "mongodb://localhost:27017/robotData"
const MongoClient = mongo.MongoClient;
const ObjectId = mongo.ObjectID;
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const indexRoutes = require('./routes/indexRoutes');
const profileRoutes = require('./routes/profileRoutes')
const bcrypt = require('bcryptjs');
const port = 3000;
const mustacheExpress = require('mustache-express');
let DB;
let Robots;

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

MongoClient.connect(dbUrl, (err, db) => {
    if (err) {
        return console.log("Error connecting to mongo", err);
    }
    DB = db;
    Robots = db.collection("robots");
});

mongoose.Promise = bluebird;
mongoose.connect("mongodb://localhost:27017/robotData");

app.use('/', indexRoutes);
app.use('/profile', profileRoutes);








app.listen(port, () => {
    console.log(`Welcome to port ${port}!`);
});
