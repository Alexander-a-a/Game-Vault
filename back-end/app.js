var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./models');



var testRouter = require('./routes/test');


const { sequelize } = db;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/test', testRouter);


// 404 handler 
app.use((req, res) => {
  return res.status(404).json({
    status: "error",
    statuscode: 404,
    data: { 
      result: "Not found" 
    }
  });
});

// Central error handler 
app.use((err, req, res, next) => {
  const status = err.httpStatus || 500;

  if (status >= 400 && status < 500) {
    return res.status(status).json({
      status: "error",
      statuscode: status,
      data: {
        result: err.message || "Request failed"
      }
    });
  }

  
  return res.status(status).json({
    status: "error",
    statuscode: status,
    data: {
      result: "Internal Server Error",
      code: err.code || undefined
    }
  });
});

module.exports = app;
