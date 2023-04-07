require("dotenv").config();
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
const jwt = require("jsonwebtoken");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstname: {
        type: String,
          default: ''
      },
      lastname: {
        type: String,
          default: ''
      },
      password: {
        type: String,
        max: 20
      },
      email: {
        type: String,
        unique: true
      },                  
      admin: {                  //whether the user is admin or not
        type: Boolean,
        default: false
    },
});

// removed the generate function from the authenticate js and made method for the schema
UserSchema.methods.generateAuthToken = async function()
{
  const user = this;
  
  const token = jwt.sign({ _id: user._id.toString() }, process.env.secretKey,{expiresIn:process.env.expiresIn});
  
  return token;
}

UserSchema.methods.getPublicProfile = async function()
{
  const user = this;
  
  const data = {firstname:user.firstname,lastname:user.lastname,admin:user.admin,email:user.email,_id:user._id};
  return data;
}

// plugin used for automatic hasing salting and password storage.
UserSchema.plugin(passportLocalMongoose,{usernameField:"email"});
module.exports = mongoose.model('User', UserSchema);