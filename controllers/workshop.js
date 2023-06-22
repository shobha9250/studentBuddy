const Workshop = require("../models/homepage/workshop");
const { createContributor } = require("./contributor");

//create Workshop
exports.createWorkshop = async (req, res) => {
  const workshop = new Workshop(req.body);
  try {
    const data = await workshop.save();
    createContributor(req.user._id, 10);
    res.json(data);
  } catch (error) {
    return res.status(400).json({
      error: "Unable to save the Workshop !!",
      desc: err,
    });
  }
};

//get all Workshop
exports.getWorkshop = (req, res) => {
  Workshop.find({})
    .then((data) => {
      
      res.status(200).json(data);
      console.log("called");
      return;
    })
    .catch((err) => {
      console.log(err);
      if (err)  res.status(400).json({error: err});
    });
};

//get workshop by id
exports.getWorkshopbyId = (req, res) => {
  Workshop.findById(req.params.workshopId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      if (err) return res.status(500).json({error: err});
    });
};

//update a Workshop
exports.updateWorkshop = async (req, res) => {
  let workshop;
//   console.log(req.params);
//   console.log(req.body);
  try {
      workshop = await Workshop.findByIdAndUpdate(
      req.params.workshopId,
      { $set: req.body },
      { new: true }
    );

    console.log(workshop);
    if (!workshop) return res.status(400).json({ error: "Workshop not found !!" });
  } 
  
  catch (err) {
    res.status(400).json({error:"Not updated",desc: err});
  }

  res.status(202).json({
    msg: "Workshop Updated !!",
    desc: workshop,
  });

};

//delete a Workshop
exports.deleteWorkshop = (req, res) => {
    console.log(req.params.workshopId);
  Workshop.findByIdAndRemove(req.params.workshopId)
    .then((workshop) => {
      if (!workshop) return res.status(400).json({ error: "Workshop not found !!" });
      res.status(200).json(workshop);
    })
    .catch((err) => {
      if (err) return res.status(500).json({ error: "Workshop not found !!" ,desc: err});
    });
};
