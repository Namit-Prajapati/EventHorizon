const express = require("express");
const router = express.Router();
const facultyController = require("../controllers/faculty");
const venueController = require("../controllers/venue");
const academicEventsController = require("../controllers/academicEvents");

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

router.get("/getclubsoffaculty/:id", facultyController.getClubsOfFaculty);

router.post("/createstudentaccess", facultyController.createStudentAccess);
router.get("/getStudentAccess", facultyController.getStudentAccess);
router.post("/editStudentAccess", facultyController.editStudentAccess);
router.get("/eventsbyclub", facultyController.getEventsByClub);

module.exports = router;
