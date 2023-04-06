
const router = require("express").Router();


router.get("/test",(req,res)=>{
    res.status(200).json({
        msg: "hello"
    })
})

module.exports = router;