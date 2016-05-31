//Requirement
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = process.env.MONGOD_URI || 'mongodb://localhost/wishlist_app';
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var morgan = require('morgan');
var port = process.env.PORT || 3000;
var mongo = require('mongodb');

// MIDDLEWARE
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));


// DATABASE
mongoose.connect(db);

//Controllers
var wishController = require('./controllers/wishlist.js')
app.use('/wishlist', wishController);


//Listen
app.listen(port);
console.log('========================================');
console.log('Port: ' + port + " is up and running. ");
console.log(process.env.SHARED_SECRET);
console.log(process.env.KEYSTRING);
console.log('========================================');