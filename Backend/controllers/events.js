const Event = require("../models/event");
const User = require("../models/user");
const Club = require("../models/club");
const Venue = require("../models/venue");

// GET route to get venue and club details before creating event
// takes faculty id in req paran
exports.getPreEventFormData = async (req, res, next) => {
  try {
    //fetching clubs associated with the faculty
    const { id } = req.params; //facultyId
    const clubs = await Club.find();
    let facultyClubs = [];
    clubs.forEach((club) => {
      let facultys = club.facultyId;
      for (let facid of facultys) {
        if (facid.toString() === id) {
          facultyClubs.push({ clubId: club._id, clubName: club.name });
          // console.log(facultyClubs);
        }
      }
    });
    if (facultyClubs.length === 0) {
      return res.status(403).json({ message: "No clubs found!" });
    }

    //fetching all venues with booking dates past today
    const venues = await Venue.find();
    if (!venues.length) {
      return res.status(404).json({ message: "Venue not found" });
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Filter and sort booked dates greater than or equal to today
    const datedVenues = venues.map((venue) => {
      venue.bookedOn
        .filter((date) => new Date(date) >= today)
        .sort((a, b) => new Date(a) - new Date(b));

      return { id: venue._id, name: venue.name, bookedOn: venue.bookedOn };
    });

    res.status(200).json({
      message: `Clubs and venues`,
      clubs: facultyClubs,
      venues: datedVenues,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
};

// POST route to create an event
exports.createEvent = async (req, res, next) => {
  try {
    const {
      name,
      description,
      targetedDept,
      venueId,
      clubId,
      facultyId,
      registrationDeadline,
      startDate,
      endDate,
    } = req.body;

    // req.files.map((file) => {
    //   venueImages.push(file.path.split("\\").join("/"));
    // });

    const logoImage = req.files["logo"][0].path.split("\\").join("/");
    const bannerImage = req.files["banner"][0].path.split("\\").join("/");

    const targetedDeptArray = targetedDept.split(",");

    const startD = new Date(startDate);
    startD.setHours(0, 0, 0, 0);

    const endD = new Date(endDate);
    endD.setHours(23, 59, 59);

    const deadD = new Date(registrationDeadline);
    deadD.setHours(23, 59, 59);

    const newEvent = new Event({
      name: name,
      description: description,
      targetedDept: targetedDeptArray,
      banner: bannerImage,
      logo: logoImage,
      venueId: venueId,
      clubId: clubId,
      facultyId: facultyId,
      registrationDeadline: deadD,
      startDate: startD,
      endDate: endD,
      status: "requested",
    });

    await newEvent.save();
    // console.log(newEvent._id);

    const club = await Club.findById(clubId);
    club.organizedEvents.push(newEvent._id);
    await club.save();

    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while creating Event" });
  }
};

// POST route to edit event
exports.editEvent = async (req, res, Error) => {
  try {
    if (req.error) {
      res.status(404).json({ error: req.error });
    }
    const { id, description, targetedDept, registrationDeadline } = req.body;

    // req.files.map((file) => {
    //   venueImages.push(file.path.split("\\").join("/"));
    // });

    const logoImage = req.files["logo"][0].path.split("\\").join("/");
    const bannerImage = req.files["banner"][0].path.split("\\").join("/");
    const reportImages = [];
    req.files["images"].map((file) => {
      reportImages.push(file.path.split("\\").join("/"));
    });
    const reportFile = req.files["reportFile"][0].path.split("\\").join("/");

    const targetedDeptArray = targetedDept.split(",");

    const deadD = new Date(registrationDeadline);
    deadD.setHours(23, 59, 59);

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        description: description,
        targetedDept: targetedDeptArray,
        banner: bannerImage,
        logo: logoImage,
        registrationDeadline: deadD,
        reportImages: reportImages,
        reportFile: reportFile,
      },
      { new: true }
    );

    res
      .status(201)
      .json({ message: "Event Updated successfully", event: updatedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating Event" });
  }
};

// GET route for fetching events using ID
exports.getEventById = async (req, res, next) => {
  try {
    const { userId, eventId } = req.query; //get event ID and userId from request query
    // console.log(userId, eventId);
    const event = await Event.findById(eventId);
    const user = await User.findById(userId);
    const venue = await Venue.findById(event.venueId);
    const club = await Club.findById(event.clubId);

    const venueName = venue.name;
    const clubName = club.name;
    const today = new Date();

    if (!event) {
      return res.status(404).json({ error: "Event not found!!" });
    }
    let hasAccess = false;

    if (event.facultyId === userId) {
      hasAccess = true;
      return res.status(200).json({ event, venueName, clubName, hasAccess });
    }

    if (club.facultyId.includes(userId)) {
      hasAccess = true;
      return res.status(200).json({ event, venueName, clubName, hasAccess });
    }

    return res.status(200).json({ event, venueName, clubName, hasAccess });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the event" });
  }
};

// GET route for getting all of the events
exports.getAllEvent = async (req, res, next) => {
  try {
    const events = await Event.find({
      status: { $in: ["completed", "upcoming"] },
      // $or: [{ status: "upcoming" }, { status: "completed" }],
    }).populate([
      { path: "venueId", select: "name" },
      { path: "clubId", select: "name" },
      { path: "facultyId", select: "name" },
    ]);
    res.status(200).json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while retrieving all events",
    });
  }
};

// GET route for getting events by status
exports.getEventsbyStatus = async (req, res, next) => {
  try {
    const { status } = req.params;
    const events = await Event.find({ status: `${status}` }).populate([
      { path: "venueId", select: "name" },
      { path: "clubId", select: "name" },
      { path: "facultyId", select: "name" },
    ]);
    res.status(200).json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while retrieving all events",
    });
  }
};

// GET route for fetching events happening on given date
exports.getEventsOnCurrDate = async (req, res) => {
  try {
    const targetDate = new Date(req.params.date); // Get target date from request param
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const events = await Event.find({
      status: { $in: ["completed", "upcoming"] },
      startDate: { $lte: targetDate },
      endDate: { $gte: targetDate },
    }).populate([
      { path: "venueId", select: "name" },
      { path: "clubId", select: "name" },
      { path: "facultyId", select: "name" },
    ]);

    res.status(200).json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching events" });
  }
};

// GET route for fetching events happening on or after today
exports.getUpcomingEvents = async (req, res) => {
  try {
    const targetDate = new Date();
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const events = await Event.find({
      status: "upcoming",
      endDate: { $gte: targetDate },
    }).populate([
      { path: "venueId", select: "name" },
      { path: "clubId", select: "name" },
      { path: "facultyId", select: "name" },
    ]);

    res.status(200).json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching events" });
  }
};

// GET route to get past events return only event name, logo, startDate, endDate, regDeadline, lub name
exports.getPastEvents = async (req, res) => {
  try {
    const targetDate = new Date();
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const events = await Event.find({
      status:"completed",
      endDate: { $lt: targetDate },
    }).populate([
      { path: "venueId", select: "name" },
      { path: "clubId", select: "name" },
      { path: "facultyId", select: "name" },
    ]);

    res.status(200).json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching events" });
  }
};
