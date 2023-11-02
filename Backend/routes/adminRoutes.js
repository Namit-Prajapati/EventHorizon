const express = require("express");
const router = express.Router();
const multer = require("multer");

const multerFunctions = require("../middleware/multer");

const uploadVenueImages = multer({
  storage: multerFunctions.venueImageStorage,
  fileFilter: multerFunctions.imageFileFilter,
}).array("image");

const uploadStudentExcel = multer({
  storage: multerFunctions.studentExcelStorage,
  fileFilter: multerFunctions.xlsxFilter,
}).single("studentexcel");

const uploadFacultyExcel = multer({
  storage: multerFunctions.facultyExcelStorage,
  fileFilter: multerFunctions.xlsxFilter,
}).single("facultyexcel");

const uploadlogobanner = multer({
  storage: multerFunctions.eventLogoBannerStorage,
  fileFilter: multerFunctions.imagePdfFileFilter,
}).fields([
  { name: "logo", maxCount: 1 },
  { name: "banner", maxCount: 1 },
  { name: "images"},
  { name: "reportFile", maxCount: 1 },
]);

const adminController = require("../controllers/admin");
const venueController = require("../controllers/venue");
const academicEventsController = require("../controllers/academicEvents");
const eventController = require("../controllers/events");
const qrController = require("../controllers/qrGenerator");
///////////////////////////////////////////
//////// **Academic Event CRUD** //////////
///////////////////////////////////////////
// POST route for creating acad event
router.post("/addacadevent", adminController.createAcademicEvent);

// POST route for editing acad event by ID
router.post("/editacadevent/:id", adminController.editAcademicEvent);

// DELETE route for deleting acad event by ID
router.post("/deleteacadevent/:id", adminController.deleteAcademicEvent);

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
//////// **VENUE CRUD** ///////////////////
///////////////////////////////////////////
// POST route for creating venue
router.post("/addvenue", uploadVenueImages, adminController.createVenue);

router.post(
  "/addVenueImage/:id",
  uploadVenueImages,
  adminController.addVenueImage
);

router.post(
  "/deleteVenueImage/:id",
  uploadVenueImages,
  adminController.deleteVenueImage
);

// POST route for editing venue by ID
router.post("/editvenue/:id", uploadVenueImages, adminController.editVenue);

// DELETE route for deleting venue by ID
router.post("/deletevenue/:id", adminController.deleteVenue);

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
////////// ** Creating User ** ////////////
///l//////0///////r///////|)/////////M/////

// Creating multiple Students from excel file with pass 'acro123'
// excel file should have only one worksheet and dept names should be from schema
router.post(
  "/studentexcel",
  uploadStudentExcel,
  adminController.createStudentsFromExcel
);

// Creating multiple Faculty from excel file with pass 'acrofaculty123'
// excel file should have only one worksheet and dept names should be from schema
router.post(
  "/facultyexcel",
  uploadFacultyExcel,
  adminController.createFacultyFromExcel
);

// Creating single users
router.post("/createuser", adminController.createUser);

router.post("/createQrUser", qrController.createUser);

///////////////////////////////////////////
//////////// ***Club CRUD*** //////////////
///l//////0///////r///////|)/////////M/////

// POST route for creating a Club
router.post("/createclub", adminController.createClub);

// POST route for editing club name by ID
router.post("/editclubname/:id", adminController.editClubName);

// POST route for adding faculty in club using ID
//ek time pr ek hi
router.post("/addfacultyclub/:id", adminController.addFacultyInClub);

// DELETE route for deleting faculty from club using facultyID
//ek time pr ek hi
router.post("/deletefacultyclub/:id", adminController.deleteFacultyFromClub);

// DELETE route for deleting entire club using clubId
router.post("/deleteclub/:id", adminController.deleteClub);

// GET route for fetching acad events using ID
router.get("/getclubbyid/:id", adminController.getClubById);

// GET route for getting all of the clubs
router.get("/getallclub", adminController.getAllClub);

///////////////////////////////////////////
////////////*Approve  Events*//////////////
///l//////0///////r///////|)/////////M/////

// GET route to get all requested events
router.get("/requested", adminController.getRequestedEvents);

// POST route to approve an event
router.post("/approve", adminController.approveEvent);

// POST route to reject an event
router.post("/reject", adminController.declineEvent);

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
