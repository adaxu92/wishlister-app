//=================
// Requirement
//=================
var express = require('express');
var router = express.Router();
var request = require('request');
var Users = require('../models/user.js');
var mongoose = require('mongoose');
var mongo = require('mongodb');
var id = require('mongodb').ObjectID;

//=================
// Create a User
//=================
function newUser(userData, callback){ 
	Users.create(userData, function(err, user){ // runs through the User schema and creates 
		console.log('user has created!');
		callback(user);
	});
};
//=================
// Post User as Cookies
//=================
router.post('/createUser', function(req, res){
	var userData = req.body;
	newUser(userData, function(user){
		res.cookie('username', user.username);
		res.cookie('plan', user.plan);
		res.cookie('name', user._id);
		console.log(user._id);
		console.log(user.username)
		console.log(user.plan)
		res.redirect('/wishlist/');
	});
});

//=================
// Creating a User 
//=================
router.get('/createUser', function(req, res){ // routes to uri /wishlist/createUser
	res.render('create.ejs');
});
//=================
// Show User Page
//=================
router.get('/:id', function(req, res){
	console.log(req.params.id);
	Users.findById(req.params.id, function(err, user){
		res.render('user.ejs', {user: user})
	});
});
//=================
// Edit User
//=================
router.get('/:id/edit', function(req, res){
	var planInfo = req.cookies.plan;
	console.log(planInfo)
	var x = "https://openapi.etsy.com/v2/listings/active?api_key=" + (process.env.KEYSTRING) + "&limit=5&keywords='"+ (planInfo)+ "'";
	var response_data;
	request(x, function (error, response, body){
		if(!error && response.statusCode == 200) {
			console.log(body);		
			response_data = JSON.parse(body);
	Users.findById(req.params.id, function(err, user){
		res.render('edit.ejs', {user: user, response_data: response_data})
	})
	};
});
});

//=================
// Update User
//=================
router.put('/:id', function(req, res){
	Users.findOneAndUpdate({"_id": req.params.id}, req.body, function(err, user){
		res.cookie('plan', req.body.plan)
		res.redirect('/wishlist/' + user._id);
	});
});

//=================
// Delete User
//=================
router.delete('/:id', function(req, res){
	var deletion = Users
	.remove({_id: req.params.id})
	.exec();
	res.redirect('/wishlist/createUser');
});


//=================
// Getting Etsy API
//================= 
router.get('/etsy', function(req, res){
	var response_data;
	request("https://openapi.etsy.com/v2/listings/active?api_key=" + (process.env.KEYSTRING), function (error, keywords, body){
		if(!error && keywords.statusCode == 200) {
			console.log('====================================')
			console.log(body);
			console.log('====================================')
			response_data = JSON.parse(body);	
			res.json(response_data);
		};
	});
});
//=================
// Etsy Params
//=================
function newEtsy(etsyData, callback){
	Etsy.create(etsyData, function(err, etsy){
		console.log('===========================')
		console.log(etsy);
		console.log('===========================')
		callback(etsy);
	});
};

//================================
// Showing Etsy API Active Listing
//================================
router.get('/', function(req, res){	
	var planInfo = req.cookies.plan;
	var idInfo = req.cookies.name;
	console.log(planInfo)
	var x = "https://openapi.etsy.com/v2/listings/active?api_key=" + (process.env.KEYSTRING) + "&limit=5&keywords='"+ (planInfo)+ "'";
	var response_data;
	console.log(x);
	request(x, function (error, response, body){
		if(!error && response.statusCode == 200) {
			console.log(body);		
			response_data = JSON.parse(body);
	};
		// res.json(response_data);
		res.render('index.ejs', {response_data: response_data, user: {_id: idInfo}})
	});
});

//============================
// Showing Specific Etsy Info
//============================
router.get('/etsy/:listing_id', function(req, res){
	var listingId = req.params.listing_id;
	var x = "https://openapi.etsy.com/v2/listings/" + listingId + "/" + "?" + "api_key=" + (process.env.KEYSTRING);
	console.log(x);
	var response_data;
	request(x, function (error, response, body){
		if(!error && response.statusCode == 200) {	
			response_data = JSON.parse(body);
			console.log(response_data.results[0].title);
		res.render('show.ejs', {response_data: response_data});
	};
});
});

module.exports = router;
/*
 https://openapi.etsy.com/v2/listings/active?api_key=myKey&fields=title&limit=10&sort_on=score&keywords='skull hair clip'
 var planInfo = user.plan.toString(); planInfo is already a string value
 var y = encodeURIComponent(planInfo); does not need to be place in a uri link 
Etsy.findOne({'name': req.cookies.name})
.then(function(user){
var userInfo = { user: user.username };
console.log(userInfo);
var planInfo = user.plan;
 console.log(planInfo);
})
console.log(Users.id); undefined
console.log(req.params.id); undefined
console.log(req.body.id); undefined
console.log(req.body) // {}
console.log(req.body.name); 
console.log(req.body)
var query = {'_id': req.body._id};
Users.find(query).exec(function(err, objs){ 
	newEtsy.userId = req.users._id;
	var newEtsy = new Etsy({
		listing_id: req.body.listing_id,
		state: req.body.state,
		title: req.body.title,
		description: req.body.description,
		price: req.body.price,
		url: req.body.url,
		quantity: req.body.quantity,
		materials: req.body.materials
})
	console.log(objs) 
});
var options = {new: true};
console.log(query); req.body._id undefined
var newEtsy = Etsy.create(req.body);
console.log('*!*!*!*!*!*!*!*!*!*!*!*!**!*!*!!*');
console.log(query);	
console.log('reqbody')
console.log(req.cookies.plan);
console.log(req.cookies.username)
console.log(req.body);
console.log(req.body._id); //undefined
console.log(req.params);
console.log(req.params.id);
*/
