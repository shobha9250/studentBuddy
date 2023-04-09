require('dotenv').config();
const express = require("express");
const app = express();
require("./utils/dbConnection");
require("./authenticate");
const passport = require('passport');

// middle wares

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.use(passport.initialize());




// routes import
const userRoutes = require("./routes/users");
const errorHandler = require('./middlewares/errorHandler');
const homePageRoutes = require("./routes/homepage");

// routes use
app.use("/api/v1/",userRoutes);
app.use("/api/v1",homePageRoutes);

const port = process.env.PORT || 3000;



app.use(errorHandler);
app.listen(port,()=>{
    console.log(`process started @port: ${port}`)
})

