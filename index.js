require('dotenv').config();
const express = require("express");
const app = express();


// middle wares

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));




// routes import
const testRoute = require("./routes/router");

// routes use

app.use("/api/v1",testRoute);
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`process started @port: ${port}`)
})

