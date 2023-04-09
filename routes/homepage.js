const express= require("express");
const { verifyUser, verifyAdmin } = require("../authenticate");
const { getContributors } = require("../controllers/homepage/contributor");
const { createEvent, updateEvent, getEventbyId, deleteEvent, getEvent } = require("../controllers/homepage/event");
const { createHomeCards, getHomeCardbyId, getHomeCards, updateHomeCards, deleteHomeCards } = require("../controllers/homepage/homecard");
const { createWorkshop, getWorkshop, updateWorkshop, getWorkshopbyId, deleteWorkshop } = require("../controllers/homepage/workshop");
const router = express.Router();
router.get("/contributor",getContributors);


// event routes
router.post("/event",verifyUser, createEvent);
router.get("/event", getEvent);
router.put("/event/:eventId",verifyUser,verifyAdmin ,updateEvent);
router.get("/event/:eventId", verifyUser,verifyAdmin,getEventbyId);
router.delete("/event/:eventId", verifyUser,verifyAdmin,deleteEvent);


// home card
router.post("/homecard",verifyUser,verifyAdmin,createHomeCards);
router.get("/homecard",getHomeCards);
router.get("/homecard/:cardId",verifyUser,verifyAdmin,getHomeCardbyId);
router.put("/homecard/:cardId",verifyUser,verifyAdmin,updateHomeCards);
router.delete("/homecard/:cardId",verifyUser,verifyAdmin,deleteHomeCards);

// workshop

router.post("/workshop",verifyUser ,createWorkshop);
router.get("/workshop", getWorkshop);
router.put("/workshop/:workshopId", verifyUser,verifyAdmin,updateWorkshop);
router.get("/workshop/:workshopId",verifyUser,verifyAdmin ,getWorkshopbyId);
router.delete("/workshop/:workshopId",verifyUser,verifyAdmin ,deleteWorkshop);


module.exports =router;