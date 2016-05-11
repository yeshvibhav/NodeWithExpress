var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

require('./config/db');

require('./config/route');

require('./models/Posts');
require('./models/Comments');
require('./models/Users');

var passport = require('passport');
require('./config/passport');

var routes   = require('./routes/index');
var users    = require('./routes/users');
var merchant = require('./controller/MerchantController');
var userAuth = require('./controller/UserAuthController');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.get('/userList',merchant.getMerchantList);

app.get('/addUser',function(req,res){
     res.render('addUsers');
});


app.get('/homePage',function(req,res){
    res.render('homePage');
});


app.get('/adminLogout',userAuth.adminLogout);


app.get('/merchantDetails',function(req,res){

    res.render('homePage');
});



app.use('/users', users);
//app.use('/merchant', merchant);
app.use(passport.initialize());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000, function(err){
  if(err) {
    console.log('Error in listening.');
  } else {
    console.log('Server listening');
  }
});

module.exports = app;
