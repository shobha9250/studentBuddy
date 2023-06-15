require('dotenv').config();
const express = require("express");
const app = express();
require("./utils/dbConnection");
require(".");
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
const workShopRoutes = require("./routes/workShop");
const projectRoutes = require("./routes/projectNotes")
const queryRoutes = require("./routes/query")
const tutorialRoutes = require("./routes/tutorial")

// routes use
app.use("/api/v1/",userRoutes);
app.use("/api/v1",homePageRoutes);
app.use("/api/v1",projectRoutes);
app.use("/api/v1",queryRoutes);
app.use("/api/v1",tutorialRoutes);
const port = process.env.PORT || 3000;



app.use(errorHandler);
app.listen(port,()=>{
    console.log(`process started @port: ${port}`)
})

