const mongoose = require('mongoose'); 
const { Schema } = mongoose;

const userSchema = new Schema({
	googleID: String,
	profileName: String,
	firstName: String,
	lastName: String,
	email: String
}); 

mongoose.model('users', userSchema );
				//name of collection using the schema model
				//mongoose will not override  


	 