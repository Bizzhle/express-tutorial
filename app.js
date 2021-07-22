var createError = require("http-errors"); // Create HTTP errors where needed (for express error handling).
// import express module and create an express application
var express = require("express");
// path module allows us to work with directories and file paths, which we need when we serve
// static assets such as images, for instance.
var path = require("path");
//middleware is used fo tasks from serving sttic files to error handling to compressing http responses
var cookieParser = require("cookie-parser"); // Used to parse the cookie header and populate req.cookies (essentially provides a convenient method for accessing cookie information).
var logger = require("morgan"); // this is installed with npm install morgan and allows us use middlewares

// require the catalog route
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var catalogRouter = require("./routes/catalog"); //Import routes for "catalog" area of site

var app = express();

//Set up moongoose connection
var mongoose = require("mongoose");
var mongoDB =
  "mongodb+srv://exp-local-lib:d6gsKKivDifDlvCF@cluster0.egiz1.mongodb.net/local_library?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// add the catalog route to the middleware stack
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter); // Add catalog routes to middleware chain.

// catch 404 and forward to error handler
// this is a middle ware because it has the argument next
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

// install mongodb npm install mongodb

// to restart automatically npm install --save-dev nodemon
// npm install mongoose
