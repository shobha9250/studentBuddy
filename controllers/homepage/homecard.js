const HomeCard = require("../../models/homepage/homecard");
const { createContributor } = require("./contributor");

//create homecard
exports.createHomeCards = async (req,res) => {

     const homecard = new HomeCard(req.body);
     try {
        const data = await homecard.save();
        createContributor(req.user._id, 8);
        res.json(data);
     } catch (error) {
        return res.status(400).json({
            error:"Unable to save this card !!",
            desc:error
     })      
    };    
};

//get all homecards
exports.getHomeCards = (req,res) => {
    HomeCard.find({})
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err)=>{
        if(err) 
        return res.status(500).json({error: err});
    })
};
exports.getHomeCardbyId = (req,res) => {
    HomeCard.findById(req.params.cardId)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err)=>{
        if(err) 
        return res.status(500).json({error: err});
    })
};

//update a homecard
exports.updateHomeCards = async (req,res) => {
    if(!req.body.title || !req.body.seemore || !req.body.desc)
      return res.status(400).json({error:"fill all the fields"});

      let card;
    try 
    {
        card=await HomeCard.findByIdAndUpdate(req.params.cardId,{$set: req.body}, {new: true});
        if(!card)
          return res.status(400).json({error:"Card not found !!"});

    }
    catch(err) {
        res.status(400).json({error: err});
    }
    res.status(202).json({
        msg:"Card Updated !!",
        "desc":card
    });
};

//delete a homecard
exports.deleteHomeCards = (req,res) => {
    HomeCard.findByIdAndRemove(req.params.cardId)
    .then((card) => {
        if(!card)
          return res.status(400).json({error:"Card not found !!"});
       res.status(200).json(card);
    })
    .catch((err) =>{
        if(err) 
        return res.status(500).json({error: "Card not found !!",desc: err});
    })
}
