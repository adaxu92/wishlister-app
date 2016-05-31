//Requirements
var mongoose = require('mongoose');

//Schemas
var userSchema = new mongoose.Schema({
	username: String,
	plan: String
});


var Users = mongoose.model('Users', userSchema);

module.exports = Users;