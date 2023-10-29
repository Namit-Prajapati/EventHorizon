const express=require('express')
const router=express.Router()
const studentController=require("../controllers/student")
const academicEventsController = require("../controllers/academicEvents");

///////////////////////////////////////////
//////// **GET Academic Events** //////////
///l//////0///////r///////|)/////////M/////


// GET route for fetching acad events using ID
router.get("/getacadevent/:id", studentController.getAcademicEventById);

// GET route for fetching acad events happening on selected date
router.get("/acadeventcurrdate/:date", studentController.getAcademicEventsOnCurrDate);

// GET route for fetching acad events happening on or after selected date
router.get("/acadeventafterdate/:date", studentController.getAcademicEventsAfterDate);

// GET route for getting all of the academic events
router.get("/getallacadevent", studentController.getAllAcademicEvent);


///////////////////////////////////////////
//////////// **GET  Events** //////////////
///l//////0///////r///////|)/////////M/////

// GET route to get event by event id for students
router.get("/getevent", studentController.getEventById);

// GET route to check if student has access to this particular event
router.get("/checkaccess", studentController.checkAccess);

// GET route to get all events based on targeted dept
router.get("/getallevent", studentController.getAllEvent);

// GET route to get upcoming events using dept in params
router.get("/getupcomingevent/:department", studentController.getUpcomingEvents);

// GET route to get past events using dept in params
router.get("/getpastevent/:department", studentController.getPastEvents);

// POST route to register for an event get eventId userId in req body
router.post("/registerevent", studentController.registerEvent);

// GET route to get all events registered by user return only event name, logo, startDate, endDate, regDeadline, club name
router.get("/getregisteredevent/:id", studentController.registeredEvents);

module.exports=router