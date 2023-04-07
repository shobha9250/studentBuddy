require('dotenv').config();
const express = require("express");
const app = express();
require("./utils/dbConnection");



// middle wares

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));




// routes import
const userRoutes = require("./routes/users");
const errorHandler = require('./middlewares/errorHandler');

// routes use
app.use("/api/v1/",userRoutes);

const port = process.env.PORT || 3000;



app.use(errorHandler);
app.listen(port,()=>{
    console.log(`process started @port: ${port}`)
})

