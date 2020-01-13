const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const http = require('http');
//Models
require('./server/model/resource');

//Routes
const indexRouter = require('./server/routes/index');
const resourcesRouter = require('./server/routes/resources');

//Configs
require('./server/config/connection');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/resources', resourcesRouter);

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
  res.render('error');
});

module.exports = app;

/*
curl -X POST \
    -H 'content-type:application/json' \
    -d '{"name":"ResourceName7","context":"AnyContext7","location":"Asia/Jerusalem","ipRange":["62.219.131.0/12", "172.114.131.10/22"]}' \
    http://localhost:3000/resources
 */
/*
curl -X GET http://localhost:3000/resources/:name
 */