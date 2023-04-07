//DB Connection
const mongoose = require('mongoose')
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });