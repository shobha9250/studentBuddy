const express= require("express");
const { verifyUser, verifyAdmin } = require("../middlewares/authenticate");
const { getContributors } = require("../controllers/homepage/contributor");
const { createWorkshop, getWorkshop, updateWorkshop, getWorkshopbyId, deleteWorkshop } = require("../controllers/homepage/workshop");
const router = express.Router();
router.get("/contributor",getContributors);

// workshop

router.post("/workshop",verifyUser ,createWorkshop);
router.get("/workshop", getWorkshop);
router.put("/workshop/:workshopId", verifyUser,verifyAdmin,updateWorkshop);
router.get("/workshop/:workshopId",verifyUser,verifyAdmin ,getWorkshopbyId);
router.delete("/workshop/:workshopId",verifyUser,verifyAdmin ,deleteWorkshop);


module.exports =router;