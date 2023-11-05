const User = require("../models/user");
const Event = require("../models/event");
const Club = require("../models/club");
const Venue = require("../models/venue");
const StudentAccess = require("../models/studentAccess");

// provide student access
// get students who have access
// edit access
// club i am part of
// events organized by my club

// POST route to add new access for students
// using studentEmail, facultyId, eventId from req body
exports.createStudentAccess = async (req, res, next) => {
  try {
    const { studentEmail, facultyId, eventId } = req.body;
    const student = await User.findOne({ email: studentEmail });
    if (!student) {
      return res
        .status(403)
        .json({ message: "No student with this email found!" });
    }
    if (student.role !== "student") {
      return res
        .status(403)
        .json({ message: "Please enter a valid student email" });
    }
    const check = await StudentAccess.findOne({eventId: eventId, studentId: student._id });
    if(check){
      return res.status(404).json({ error: "User already exists" });
    }
    const newStudentAccess = new StudentAccess({
      studentId: student._id,
      facultyId,
      eventId,
      editable: true,
    });

    await newStudentAccess.save();

    res.status(200).json({
      message: `New Student Access created for ${student.name}`,
      newStudentAccess,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
};

// GET route to fetch ALL students who have access to given event
// event id is taken in req param
exports.getStudentAccess = async (req, res, next) => {
  try {
    const eventId  = req.params.id; //get event id from req param
    const studentAccess = await StudentAccess.find({ eventId: eventId }).populate([
      { path: "studentId", select: "name" },
    ]);
    if (studentAccess.length === 0) {
      return res
        .status(203)
        .json({ message: "Event does not have any student access" });
    }

    res.status(200).json({
      studentAccess,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
};

// POST route to toggle student access
// req body has studentAccessId
exports.editStudentAccess = async (req, res, next) => {
  try {
    const { studentAccessId } = req.body;
    const studentAcc = await StudentAccess.findById(studentAccessId);
    if (!studentAcc) {
      return res
        .status(403)
        .json({ message: "No student access with the Id found" });
    }

    studentAcc.editable = !studentAcc.editable;

    await studentAcc.save();

    res.status(200).json({
      message: `Student Access updated`,
      studentAcc,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
};

// GET route to fetch all of the clubs which this faculty is part of
// get faculty id from req param

///*****REMINDER ******/
//I have changed func name change that name in route
exports.getClubsOfFaculty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const clubs = await Club.find();
    let facultyClubs = [];
    clubs.forEach((club) => {
      let facultys = club.facultyId;
      for (let facid of facultys) {
        if (facid.toString() === id) {
          facultyClubs.push(club);
          // console.log(facultyClubs);
        }
      }
    });
    if (facultyClubs.length === 0) {
      return res.status(403).json({ message: "No clubs found!" });
    }

    res.status(200).json({
      message: `Clubs found`,
      facultyClubs,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
};

// GET route to get all the events organized by selected club
// get clubId from req param

///*****REMINDER ******/
//I have changed func name change that name in route
exports.getEventsByClub = async (req, res, next) => {
  try {
    const clubId  = req.params.id;

    const club = await Club.findById(clubId).populate({
      path:"organizedEvents",
      select: "name",
    });

    if (!club) {
      return res
        .status(404)
        .json({ message: "No clubs found" });
    }

    res.status(200).json(club.organizedEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error"});
  }
};
