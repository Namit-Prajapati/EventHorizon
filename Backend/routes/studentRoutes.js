const express=require('express')
const router=express.Router()
const studentController=require("../controllers/student")
const academicEventsController = require("../controllers/academicEvents");

///////////////////////////////////////////
//////// **GET Academic Events** //////////
///l//////0///////r///////|)/////////M/////

// GET route for fetching acad events using ID
router.get("/getacadevent/:id", academicEventsController.getAcademicEventById);

// GET route for fetching acad events happening on selected date
router.get("/acadeventcurrdate/:date", academicEventsController.getAcademicEventsOnCurrDate);

// GET route for fetching acad events happening on or after selected date
router.get("/acadeventafterdate/:date", academicEventsController.getAcademicEventsAfterDate);

// GET route for getting all of the academic events
router.get("/getallacadevent", academicEventsController.getAllAcademicEvent);

module.exports=router