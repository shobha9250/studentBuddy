const express= require("express");
require("dotenv").config();
const { registerUser, getUser, loginUser} = require("../controllers/user");
const router = express.Router();
const passport = require('passport');
const User = require("../models/userModel");
const { verifyAdmin, verifyUser, verifyToken } = require("../authenticate");

router.post("/signup",registerUser);
router.get("/all",verifyUser,verifyAdmin,getUser);

router.post("/login",(req,res,next) => {
    if(!req.body.email || !req.body.password)
  {
    res.status(400).json({msg: "Either email or password field is empty"});
  }
  else
   next();
  },loginUser);             
// router.get("/logout",verifyUser,logoutUser);

router.get("/auth",verifyToken);

module.exports =router;