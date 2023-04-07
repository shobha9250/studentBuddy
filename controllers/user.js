require("dotenv").config();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
var validator = require('validator');
const passport = require("passport");


//only admin can get list of all users
exports.getUser = async (req, res) => {
  await User.find({})
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      throw new Error
    });
};

//anyone can register
exports.registerUser = async (req, res) => {
        if ( !req.body.password || !req.body.email) {
          return res.status(400).json({ error: "Either password/Email field is empty" });
        } 
     
        if(!validator.isEmail(req.body.email))
        {
          return res.status(400).json({error:"Invalid email !!"});
        }
        
        else {
             
              var newUser = new User({
                email: req.body.email,
               
                firstname: req.body.firstname,
                lastname: req.body.lastname,
              });
              await User.register(
                newUser,
                req.body.password,
                async (err, user) => {
                  if (err) {
                    console.log({error: err});
                    return res.status(400).json({error:"Email already exits"});
                  }

                 
                  user.salt=undefined;
                  user.tokens=undefined;
                  user.hash=undefined;
                  try {
                    return res.status(200).json({
                      status: "success",
                      msg:
                        "Thanks for Registering ",
                      user: user,
                    });
                    
                  } catch (err) {
                    if (err) {
                      res.status(500).json({error: "Something went Wrong !!",desc: err});
                      return;
                    }
                  }
                }
              );
        }
};




exports.loginUser = async (req, res) => {

    try {
      const { user } = await User.authenticate()(
        req.body.email,
        req.body.password
      );
      if (!user) {
        return res.status(404).json({ error: "Invalid Credentials !!" });
      }
      req.user = user;
      var token = await req.user.generateAuthToken();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        status: "success",
        msg: "You are successfully logged In !!",
        token: token,
        admin: user.admin,
        userId: user._id,
      });
      return;
      
    } catch (error) {
        console.log(error);
  
      return res.status(400).json({error:"User Not found "});
      
    }
  };