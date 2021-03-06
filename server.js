const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const sessionConfig = require('./sessionConfig');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const indexRoutes = require('./routes/indexRoutes');
const profileRoutes = require('./routes/profileRoutes')
const employedRoutes = require('./routes/employedRoutes')
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bcrypt = require('bcryptjs');
const checkAuth = require('./middlewares/checkAuth');
const port = 3000;
const mustacheExpress = require('mustache-express');

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(session(sessionConfig));

mongoose.Promise = bluebird;
mongoose.connect("mongodb://localhost:27017/robotData");

app.use('/', indexRoutes);
app.use('/profile', profileRoutes);
app.use('/employment', employedRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(port, () => {
    console.log(`Welcome to port ${port}!`);
});
