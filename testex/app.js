var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('./libs/auth'),
    session = require('express-session'),
    methodOverride = require('method-override'),
    MongoStore = require('connect-mongo')(session),
    api = require('./routes/api')(passport);

mongoose.connect('mongodb://localhost/testex');

var db = mongoose.connection;

db.on('error', function (err) {
    console.error('connection error:', err.message);
});
db.once('open', function callback () {
    console.info("Connected to DB!");
});

var app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(session({
	secret: "qwerty",
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 7 * 24 * 60 * 60 // = 7 days.
    }),
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', api);

module.exports = app;
