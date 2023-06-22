const Tutorial = require("../models/tutorial");
const { createContributor } = require("./contributor");

//create tutorials
exports.createTutorials = async (req, res) => {
  const tutorial = new Tutorial(req.body);

  try {
    const data = await tutorial.save();

    createContributor(req.user._id, 8);
    res.json({
      msg: "Tutorial Added !!",
      desc: data,
    });
  } catch (error) {
    return res.status(400).json({
      error: "Unable to save this tutorial !!",
      desc: error,
    });
  }
};

//get all tutorials
exports.getTutorials = (req, res) => {
  Tutorial.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      if (err) return res.status(500).json({ error: err });
    });
};
//get  tutorial by id
exports.getTutorialsbyId = (req, res) => {
  Tutorial.findById(req.params.tutId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      if (err) return res.status(500).json({ error: err });
    });
};

//update a tutorial
exports.updateTutorials = async (req, res) => {
  if (!req.body.title || !req.body.link || !req.body.category)
    return res.status(400).json({ error: "fill all the fields" });
  let tut;
  try {
    tut = await Tutorial.findByIdAndUpdate(
      req.params.tutId,
      { $set: req.body },
      { new: true }
    );
    if (!tut) return res.status(400).json({ error: "Tutorial not found !!" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
  res.status(202).json({
    msg: "Tutorial Updated !!",
    desc: tut,
  });
};

//delete a tutorial
exports.deleteTutorials = (req, res) => {
  Tutorial.findByIdAndRemove(req.params.tutId)
    .then((tut) => {
      if (!tut) return res.status(400).json({ error: "Tutorial not found !!" });
      res.status(200).json(tut);
    })
    .catch((err) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Tutorial not found !!", desc: err });
    });
};

exports.markTutorials = (req, res) => {
  Tutorial.findById(req.params.tutId)
    .then((tut) => {
      if (!tut) return res.status(400).json({ error: "Tutorial not found !!" });
      if (req.body.flag === true)
        //likes incremented
        tut.likes = tut.likes + 1;
      else tut.likes = tut.likes - 1; //likes decremented
      tut.save();
      return res.status(202).json({
        msg: "Tutorial Updated !!",
        desc: tut,
      });
    })
    .catch((err) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Tutorial not found !!", desc: err });
    });
};
