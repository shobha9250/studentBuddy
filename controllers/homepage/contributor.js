const Contributor = require("../../models/homepage/contributor");
const User = require("../../models/userModel");

// create a contributor
exports.createContributor =async (userId,cnt)=>{
    
    try {
        const contributor = await Contributor.findOne({ user: userId });
        
        if(contributor)
        {

           await contributor.updateOne({
                $inc:{
                    count:cnt
                }
            });
            await contributor.save();
            console.log("contributor updated");
            
        }
        else
        {

            const contributor = new Contributor({
                user:userId,
                count:cnt
            });
            await contributor.save();
            console.log("new contributor added");
            
        }
        
    } catch (error) {
        console.log("error");
        console.log(error);
        
    }

   
    
};

// fetch all contributors
exports.getContributors = async (req,res)=>{

    try {
        const data = Contributor.find().populate("user","firstname").exec();
        return res.status(200).json(data);
    } catch (err) {
        return res.status(401).json({error:err});
    }

};

// delete contributor
exports.deleteContributor = (req, res) => {
  Contributor.findByIdAndRemove(req.params.contId)
    .then((contributor) => {
      if (!contributor) return res.status(400).json({ error: "Contributor not found !!" });
      res.status(200).json(contributor);
    })
    .catch((err) => {
      if (err) return res.status(500).json({ error: "contributor not found !!", desc: err });
    });
};
