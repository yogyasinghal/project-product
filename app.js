var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');

var app = express();
// var axios = require('axios');
require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var mongoose = require('mongoose');
var mongoDB = `mongodb+srv://yogya:${process.env.DB_PASS}@cluster0.ebsn2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// axios.get(`http://localhost:8000/users`)
//    .then(res=>{
//      console.log("axios get successfull");
//      console.log(res.data);
//    })
//    .catch(err=>{
//      console.log("axios get unsuccessfull");
//      console.log(err);
//    })

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products',productRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
  console.log("listening on port 8000");
})


module.exports = app;
