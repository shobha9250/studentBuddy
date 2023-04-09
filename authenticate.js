require("dotenv").config();
var passport = require("passport");
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("./models/userModel");
const jwt = require("jsonwebtoken");

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // toe get token from the auth header
  secretOrKey: process.env.secretKey, // secret key
  passReqToCallback: true, //to pass req to the callback
};

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, async (req, jwt_payload, done) => {
    try {
      const user = await User.findOne({id: jwt_payload.sub});

      if (user) {
        req.token = opts.jwtFromRequest(req);
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

passport.serializeUser(function (user, done) {
  console.log("I should have jack ");
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  console.log("I wont have jack shit");
  done(null, obj);
});

exports.verifyUser = passport.authenticate("jwt", { session: false });

exports.verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (user.admin) {
      next(); //move ahead only if user is admin
    } else {
      res.status(403).json({ error: "Admin access required !!" });
      return next(res);
    }
  } catch (error) {
    next(error);
  }
};

exports.verifyToken = (req, res) => {
  if (!opts.jwtFromRequest(req)) {
    return res.status(404).json({ success: false, error: "Token Missing !!" });
  } else {
    jwt.verify(
      opts.jwtFromRequest(req),
      process.env.secretKey,
      (err, decoded) => {
        if (err) {
          return res
            .status(401)
            .json({ success: false, error: err.message, status: err.name });
        }
        if (!decoded) {
          return res
            .status(500)
            .json({ success: false, error: "Something went wrong" });
        }
        return res
          .status(200)
          .json({ success: true, status: "Token Valid !!", user: decoded._id });
      }
    );
  }
};
