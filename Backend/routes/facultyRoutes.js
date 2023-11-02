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
  fileFilter: multerFunctions.imagePdfFileFilter,
}).fields([
  { name: "logo", maxCount: 1 },
  { name: "banner", maxCount: 1 },
  { name: "images"},
  { name: "reportFile", maxCount: 1 },
]);

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

// GET route to get all of the academic events targeted to a particular department
router.get(
  "/academiceventbydept/:department",
  academicEventsController.getAcademicEventByDept
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

///////////////////////////////////////////
///////////*Events Controller*/////////////
///l//////0///////r///////|)/////////M/////

// POST route to create an event
router.post("/createevent", uploadlogobanner, eventController.createEvent);

// GET route to get venue and club details before creating event
router.get("/geteventformdata/:id", eventController.getPreEventFormData);

// POST route to edit an event
router.post("/editevent", uploadlogobanner, eventController.editEvent);

// GET route for fetching events using ID
router.get("/geteventbyid", eventController.getEventById);

// GET route for getting all of the events
router.get("/getallevent", eventController.getAllEvent);

// GET route for getting events by status
router.get("/geteventsbystatus/:status", eventController.getEventsbyStatus);

// GET route for fetching events happening on given date
router.get("/geteventoncurrentdate/:date", eventController.getEventsOnCurrDate);

// GET route for fetching events happening on or after today
router.get("/getupcomingevents", eventController.getUpcomingEvents);

// GET route to get past events return only event name, logo, startDate, endDate, regDeadline, lub name
router.get("/getpastevents", eventController.getPastEvents);


module.exports = router;
