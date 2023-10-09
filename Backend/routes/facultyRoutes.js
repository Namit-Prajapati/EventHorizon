const express = require("express");
const router = express.Router();
const multer = require("multer");
const facultyController = require("../controllers/faculty");
const venueController = require("../controllers/venue");
const academicEventsController = require("../controllers/academicEvents");
const multerFunctions = require("../middleware/multer")
const eventController = require("../controllers/events")

const uploadlogobanner = multer({
  storage: multerFunctions.eventLogoBannerStorage,
  fileFilter: multerFunctions.imageFileFilter,
}).fields([{ name: 'logo', maxCount: 1 }, { name: 'banner', maxCount: 1 }]);

///////////////////////////////////////////
///////// ***GET Venue data*** ////////////
///l//////0///////r///////|)/////////M/////

// GET route for fetching acad events using ID
router.get("/getvenue/:id", venueController.getVenueById);

// GET route for getting all of the academic events
router.get("/getallvenue", venueController.getAllVenue);

// GET route for checking if venue is available for a particular date or not
// It uses venueId, date in request body
router.get("/check-availability", venueController.checkVenueAvailability);

// GET route for getting all of the dates on which a venue is booked using venueId in req param
router.get("/getbooked-dates/:venueId", venueController.getBookedDates);

///////////////////////////////////////////
//////// **GET Academic Events** //////////
///l//////0///////r///////|)/////////M/////

// GET route for fetching acad events using ID
router.get("/getacadevent/:id", academicEventsController.getAcademicEventById);

// GET route for fetching acad events happening on selected date
router.get(
  "/acadeventcurrdate/:date",
  academicEventsController.getAcademicEventsOnCurrDate
);

// GET route for fetching acad events happening on or after selected date
router.get(
  "/acadeventafterdate/:date",
  academicEventsController.getAcademicEventsAfterDate
);

// GET route for getting all of the academic events
router.get("/getallacadevent", academicEventsController.getAllAcademicEvent);

///////////////////////////////////////////
//////// **Faculty Controllers** //////////
///l//////0///////r///////|)/////////M/////

//I have changed func name change that name in route
router.get("/getclubsoffaculty/:id", facultyController.getClubsOfFaculty);

// POST route to add new access for students
// using studentEmail, facultyId, eventId from req body
router.post("/createstudentaccess", facultyController.createStudentAccess);

// GET route to fetch ALL students who have access to given event
// event id is taken in req param
router.get("/getstudentaccess/:id", facultyController.getStudentAccess);

// POST route to toggle student access
// req body has studentAccessId
router.post("/editstudentaccess", facultyController.editStudentAccess);

//I have changed func name change that name in route
router.get("/eventsbyclub/:id", facultyController.getEventsByClub);






// POST route to create an event 
router.post("/createevent",uploadlogobanner, eventController.createEvent);

module.exports = router;
