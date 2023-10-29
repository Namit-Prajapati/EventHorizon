const User = require("../models/user");
const Event = require("../models/event");
const StudentAccess = require("../models/studentAccess");
const AcademicEvent = require("../models/academicEvent");
const Club = require("../models/club");
const Venue = require("../models/venue");

///////////////////////////////////////////
////////////*  Get  Events  *//////////////
///l//////0///////r///////|)/////////M/////

// GET route to check if student has access to this particular event
exports.checkAccess = async (req, res, next) => {
  try {
    const { userId, eventId } = req.query; //get event id and user id from req query
    const studentAccess = await StudentAccess.findOne({
      eventId: eventId,
      studentId: userId,
    });
    if (studentAccess) {
      return res.status(200).json({ hasAccess: true });
    } else {
      return res.status(200).json({ hasAccess: false });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occurred while checking student access!" });
  }
};

// GET route to get event by event id for students
exports.getEventById = async (req, res, next) => {
  try {
    const { userId, eventId } = req.query; //get event ID and userId from request query
    console.log(userId, eventId);
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
    const studentAccess = await StudentAccess.findOne({
      eventId: eventId,
      studentId: userId,
    });
    let hasAccess = false;
    let isRegistered = false;
    let hasAttended = false;
    let canRegister = true;

    if (today > event.registrationDeadline) {
      canRegister = false;
    }
    if (event.registrations.includes(userId)) {
      isRegistered = true;
    }
    if (event.attendees.includes(userId)) {
      hasAttended = true;
    }
    if (studentAccess) {
      hasAccess = true;
      return res.status(200).json({
        event,
        venueName,
        clubName,
        canRegister,
        isRegistered,
        hasAttended,
        hasAccess,
      });
    }

    for (let eve of event.targetedDept) {
      if (eve === user.department) {
        return res.status(200).json({
          event,
          venueName,
          clubName,
          hasAccess,
          canRegister,
          isRegistered,
          hasAttended,
        });
      }
    }
    return res
      .status(404)
      .json({ message: "This event does not belongs to user's department" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the event" });
  }
};

// GET route to get all events based on targeted dept
exports.getAllEvent = async (req, res, next) => {
  try {
    const { department } = req.query; //get student dept from req query
    const events = await Event.find();

    let eventByDept = [];

    events.forEach((event) => {
      let departments = event.targetedDept;
      for (let eve of departments) {
        if (eve === department) {
          eventByDept.push(event);
          // console.log(acadEventByDept);
        }
      }
    });

    res.status(200).json({ eventByDept });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while retrieving all events",
    });
  }
};

// GET route to get all events registered by user return only event name, logo, startDate, endDate, regDeadline, club name
// take user id in req param
exports.registeredEvents = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).populate({
      path: "registrations",
      select: "name logo startDate endDate registrationDeadline",
      populate: { path: "clubId", select: "name" },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    if (user.registrations.length === 0) {
      return res.status(400).json({ message: "No registered events found!" });
    }

    return res.status(200).json({
      message: "registered events fetched",
      registrations: user.registrations,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "An error occurred while fetching registered events" });
  }
};

// GET route to get upcoming events using dept in params
exports.getUpcomingEvents = async (req, res) => {
  try {
    const { department } = req.params;
    const targetDate = new Date();
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const events = await Event.find({
      endDate: { $gte: targetDate },
    });

    let eventByDept = [];

    events.forEach((event) => {
      let departments = event.targetedDept;
      for (let eve of departments) {
        if (eve === department) {
          eventByDept.push(event);
          // console.log(acadEventByDept);
        }
      }
    });

    res.status(200).json({ eventByDept });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching events" });
  }
};

// GET route to get past events using dept in params
exports.getPastEvents = async (req, res) => {
  try {
    const { department } = req.params;
    const targetDate = new Date();
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const events = await Event.find({
      endDate: { $lt: targetDate },
    });

    let eventByDept = [];

    events.forEach((event) => {
      let departments = event.targetedDept;
      for (let eve of departments) {
        if (eve === department) {
          eventByDept.push(event);
          // console.log(acadEventByDept);
        }
      }
    });

    res.status(200).json({ eventByDept });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching events" });
  }
};

// POST route to register for an event get eventId userId in req body
exports.registerEvent = async (req, res, next) => {
  try {
    const { eventId, studentId } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    const today = new Date();
    if (today > event.registrationDeadline) {
      return res
        .status(404)
        .json({ error: "Event is not accepting any more Registrations" });
    }

    if (event.registrations.includes(studentId)) {
      return res
        .status(404)
        .json({ error: "User is already registered for this event" });
    }

    event.registrations.push(studentId);

    await event.save();

    return res.status(200).json({ error: "User registered for the event" });
  } catch (error) {
    return res
      .status(404)
      .json({ error: "Error registering user for the event" });
  }
};

///////////////////////////////////////////
//////*GET Academic Event for stud*////////
///l//////0///////r///////|)/////////M/////

// GET route for fetching acad events using ID
exports.getAcademicEventById = async (req, res, next) => {
  try {
    const { academicEventId, department } = req.query; //get academic event ID and targeted dept from request query

    const academicEvent = await AcademicEvent.findById(academicEventId);

    if (!academicEvent) {
      return res.status(404).json({ error: "Academic event not found" });
    }

    for (let eve of academicEvent.targetedDept) {
      if (eve === department) {
        return res.status(200).json({ academicEvent });
      }
    }

    res
      .status(404)
      .json({ error: "Academic event does not belongs to user department" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the academic event" });
  }
};

// GET route for getting all of the academic events
//get student dept from req query
exports.getAllAcademicEvent = async (req, res, next) => {
  try {
    const { department } = req.query; //get student dept from req query
    const academicEvents = await AcademicEvent.find();

    let acadEventByDept = [];

    academicEvents.forEach((event) => {
      let departments = event.targetedDept;
      for (let eve of departments) {
        if (eve === department) {
          acadEventByDept.push(event);
          // console.log(acadEventByDept);
        }
      }
    });

    res.status(200).json({ acadEventByDept });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while retrieving all academic events",
    });
  }
};

// GET route for fetching acad events happening on selected date and dept from req query
exports.getAcademicEventsOnCurrDate = async (req, res) => {
  try {
    const targetDate = new Date(req.params.date); // Get target date from request param
    const { department } = req.query; //get student dept from req query
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const academicEvents = await AcademicEvent.find({
      startDate: { $lte: targetDate },
      endDate: { $gte: targetDate },
    });

    let acadEventByDept = [];

    academicEvents.forEach((event) => {
      let departments = event.targetedDept;
      for (let eve of departments) {
        if (eve === department) {
          acadEventByDept.push(event);
          // console.log(acadEventByDept);
        }
      }
    });

    res.status(200).json({ acadEventByDept });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching academic events" });
  }
};

// GET route for fetching acad events happening on or after selected date and dept from req query
exports.getAcademicEventsAfterDate = async (req, res) => {
  try {
    const targetDate = new Date(req.params.date); // Get target date from request param
    const { department } = req.query; //get student dept from req query
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const academicEvents = await AcademicEvent.find({
      endDate: { $gte: targetDate },
    });

    let acadEventByDept = [];

    academicEvents.forEach((event) => {
      let departments = event.targetedDept;
      for (let eve of departments) {
        if (eve === department) {
          acadEventByDept.push(event);
          // console.log(acadEventByDept);
        }
      }
    });

    res.status(200).json({ acadEventByDept });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching academic events" });
  }
};
