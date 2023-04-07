const errorHandler = (err,req,res,next)=>{
    if(err)
    {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = errorHandler;