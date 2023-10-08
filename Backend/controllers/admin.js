const User = require("../models/user");
const Club = require("../models/club");
const Venue = require("../models/venue");
const AcademicEvent = require("../models/academicEvent");
const xlsx = require("xlsx");

///////////////////////////////////////////
//////// **VENUE CRUD** ///////////////////
///////////////////////////////////////////

// POST route for creating venue
exports.createVenue = async (req, res, next) => {
  try {
    const { name, description, capacity } = req.body
    const venueImages = [];
    req.files.map((file) => {
      venueImages.push(file.path.split("\\").join("/"));
    });

    const newVenue = new Venue({
      name,
      venueImages,
      description,
      capacity,
    });

    await newVenue.save();

    res
      .status(201)
      .json({ message: "Venue created successfully", venue: newVenue });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the venue" });
  }
};

// POST route for editing venue by ID
exports.editVenue = async (req, res, next) => {
  try {
    const venueId = req.params.id;
    const { name, description, capacity } = req.body;

    const updatedVenue = await Venue.findByIdAndUpdate(
      venueId,
      {
        name,
        description,
        capacity,
      },
      { new: true }
    );

    if (!updatedVenue) {
      return res.status(404).json({ error: "Venue event not found" });
    }

    res.status(200).json({
      message: "Venue updated successfully",
      venue: updatedVenue,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the venue" });
  }
};

exports.addVenueImage = async (req, res, next) => {
  try {
    const venueId = req.params.id;
    const updatedImages = [];
    req.files.map((file) => {
      updatedImages.push(file.path.split("\\").join("/"));
    });

    const updatedVenue = await Venue.findById(venueId);
    if (!updatedVenue) {
      return res.status(404).json({ error: "Venue event not found" });
    }
    updatedVenue.venueImages = updatedVenue.venueImages.concat(updatedImages);
    await updatedVenue.save();

    res.status(200).json({
      message: "Venue images added successfully",
      venue: updatedVenue,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding venue images" });
  }
};

exports.deleteVenueImage = async (req, res, next) => {
  try {
    const venueId = req.params.id;
    const deletedImage = req.body.venueImagePath;
    let updatedImages = [];

    const updatedVenue = await Venue.findById(venueId);
    if (!updatedVenue) {
      return res.status(404).json({ error: "Venue event not found" });
    }

    updatedImages = updatedVenue.venueImages;
    updatedImages = updatedImages.filter((path) => {
      return path !== deletedImage;
    });

    updatedVenue.venueImages = updatedImages;
    await updatedVenue.save();

    res.status(200).json({
      message: "Venue image deleted successfully",
      venue: updatedVenue,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting venue image" });
  }
};

// DELETE route for deleting venue by ID
exports.deleteVenue = async (req, res, next) => {
  try {
    const venueId = req.params.id; // Get acad event ID from request param

    const deletedVenue = await Venue.findByIdAndDelete(venueId);

    if (!deletedVenue) {
      return res.status(404).json({ error: "Venue event not found" });
    }

    res.status(200).json({ message: "Venue event deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the venue" });
  }
};

// GET route for fetching venue using ID
exports.getVenueById = async (req, res, next) => {
  try {
    const venueId = req.params.id; //get academic event ID from request param

    const venue = await Venue.findById(venueId);

    if (!venue) {
      return res.status(404).json({ error: "Venue not found" });
    }

    res.status(200).json({ venue });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the venue" });
  }
};

// GET route for getting all of the venue
exports.getAllVenue = async (req, res, next) => {
  try {
    const venues = await Venue.find();

    res.status(200).json({ venues });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while retrieving all venues",
    });
  }
};

///////////////////////////////////////////
//////// **Academic Event CRUD** //////////
///l//////0///////r///////|)/////////M/////

// POST route for creating acad event
exports.createAcademicEvent = async (req, res, next) => {
  try {
    const { name, startDate, endDate, targetedDept } = req.body;

    const newAcademicEvent = new AcademicEvent({
      name,
      startDate,
      endDate,
      targetedDept,
    });

    await newAcademicEvent.save();

    res
      .status(201)
      .json({ message: "Academic event created successfully by Admin" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the academic event" });
  }
};

// POST route for editing acad event by ID
exports.editAcademicEvent = async (req, res, next) => {
  try {
    const academicEventId = req.params.id; // Get acad event ID from request param
    const { name, startDate, endDate, targetedDept } = req.body;

    const targetedDeptArray = targetedDept.split(",");

    const updatedAcademicEvent = await AcademicEvent.findByIdAndUpdate(
      academicEventId,
      {
        name,
        startDate,
        endDate,
        targetedDept: targetedDeptArray,
      },
      { new: true }
    );

    if (!updatedAcademicEvent) {
      return res.status(404).json({ error: "Academic event not found" });
    }

    res.status(200).json({
      message: "Academic event updated successfully",
      academicEvent: updatedAcademicEvent,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the academic event" });
  }
};

// DELETE route for deleting acad event by ID
exports.deleteAcademicEvent = async (req, res, next) => {
  try {
    const academicEventId = req.params.id; // Get acad event ID from request param

    const deletedAcademicEvent = await AcademicEvent.findByIdAndDelete(
      academicEventId
    );

    if (!deletedAcademicEvent) {
      return res.status(404).json({ error: "Academic event not found" });
    }

    res.status(200).json({ message: "Academic event deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the academic event" });
  }
};

// GET route for fetching acad events using ID
exports.getAcademicEventById = async (req, res, next) => {
  try {
    const academicEventId = req.params.id; //get academic event ID from request param

    const academicEvent = await AcademicEvent.findById(academicEventId);

    if (!academicEvent) {
      return res.status(404).json({ error: "Academic event not found" });
    }

    res.status(200).json({ academicEvent });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the academic event" });
  }
};

// GET route for getting all of the academic events
exports.getAllAcademicEvent = async (req, res, next) => {
  try {
    const academicEvents = await AcademicEvent.find();

    res.status(200).json({ academicEvents });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while retrieving all academic events",
    });
  }
};

// GET route for fetching acad events happening on selected date
exports.getAcademicEventsOnCurrDate = async (req, res) => {
  try {
    const targetDate = new Date(req.params.date); // Get target date from request param
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const academicEvents = await AcademicEvent.find({
      startDate: { $lte: targetDate },
      endDate: { $gte: targetDate },
    });

    res.status(200).json({ academicEvents });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching academic events" });
  }
};

// GET route for fetching acad events happening on or after selected date
exports.getAcademicEventsOnCurrDate = async (req, res) => {
  try {
    const targetDate = new Date(req.params.date); // Get target date from request param
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const academicEvents = await AcademicEvent.find({
      startDate: { $gte: targetDate },
    });

    res.status(200).json({ academicEvents });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching academic events" });
  }
};

///////////////////////////////////////////
////////// ** Creating User ** ////////////
///l//////0///////r///////|)/////////M/////

// Creating multiple Students from excel file with pass 'acro123'
// excel file should have only one worksheet and dept names should be from schema
exports.createStudentsFromExcel = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = xlsx.readFile(file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);

    const users = [];

    for (const row of data) {
      const newUser = new User({
        name: row.name,
        enrollmentNo: row.enrollmentNo,
        email: row.email,
        department: row.department,
        password: "acro123",
        role: "student",
      });
      users.push(newUser);
    }

    await User.insertMany(users);
    return res
      .status(201)
      .json({ message: "Users added successfully from excel sheet" });
  } catch (error) {
    console.error("Error creating users from Excel:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Creating multiple Faculty from excel file with pass 'acrofaculty123'
// excel file should have only one worksheet and dept names should be from schema
exports.createFacultyFromExcel = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = xlsx.readFile(file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);

    const users = [];

    for (const row of data) {
      const newUser = new User({
        name: row.name,
        email: row.email,
        department: row.department,
        password: "acrofaculty123",
        role: "faculty",
      });
      users.push(newUser);
    }

    await User.insertMany(users);
    return res
      .status(201)
      .json({ message: "Users added successfully from excel sheet" });
  } catch (error) {
    console.error("Error creating users from Excel:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Creating single users
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, department, enrollmentNo, role } = req.body;

    const newUser = new User({
      name,
      email,
      department,
      enrollmentNo,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: "new user created", user: newUser });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the academic event" });
  }
};

///////////////////////////////////////////
//////////// ***Club CRUD*** //////////////
///l//////0///////r///////|)/////////M/////

// POST route for creating a Club
exports.createClub = async (req, res, next) => {
    try {
      const { name, facultyEmail } = req.body;
  
      const faculty = await User.findOne({ email: facultyEmail });
  
      if (!faculty) {
        return res.status(404).json({ error: "Faculty not found" });
      }
  
      const newClub = new Club({
        name,
        facultyId: [faculty._id],
      });
  
      await newClub.save();
  
      res.status(201).json({ message: "Club created successfully by Admin" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the Club" });
    }
};
  
// POST route for editing club name by ID
exports.editClubName = async (req, res, next) => {
    try {
      const clubId = req.params.id; // Get club ID from request param
      const { name } = req.body;
  
      const updatedClub = await Club.findByIdAndUpdate(
        clubId,
        {
          name,
        },
        { new: true }
      );
  
      if (!updatedClub) {
        return res.status(404).json({ error: "Club not found" });
      }
  
      res.status(200).json({
        message: "Club name updated successfully",
        club: updatedClub,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the club name" });
    }
};
  
// POST route for adding faculty in club using ID
//ek time pr ek hi
exports.addFacultyInClub = async (req, res, next) => {
    try {
      const clubId = req.params.id; // Get club ID from request param
      const { facultyEmail } = req.body;
  
      const faculty = await User.findOne({ email: facultyEmail });
  
      if (!faculty) {
        return res.status(404).json({ error: "Faculty not found" });
      }
  
      const updatedClub = await Club.findById(clubId);
  
      if (!updatedClub) {
        return res.status(404).json({ error: "Club not found" });
      }
  
      updatedClub.facultyId.push(faculty._id);
      await updatedClub.save();
  
      res.status(200).json({
        message: "Successfully added new Faculty member to the Club",
        club: updatedClub,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error: "An error occurred while adding new faculty member to the club!",
        });
    }
};
  
// DELETE route for deleting faculty from club using facultyID
//ek time pr ek hi
exports.deleteFacultyFromClub = async (req, res, next) => {
    try {
      const clubId = req.params.id; // Get club ID from request param
      const facultyid = req.body;
      const updatedFacultyId = [];
  
      const updatedClub = await Club.findById(clubId);
  
      if (!updatedClub) {
        return res.status(404).json({ error: "Club not found" });
      }
  
      updatedFacultyId = updatedClub.facultyId;
      updatedFacultyId = updatedFacultyId.filter((path) => {
        return path !== facultyid;
      });
  
      updatedClub.facultyId = updatedFacultyId;
      await updatedClub.save();
  
      res.status(200).json({ message: "faculty deleted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error: "An error occurred while deleting the faculty from club",
        });
    }
};
  
// DELETE route for deleting entire club using clubId
exports.deleteClub = async (req, res, next) => {
    try {
      const clubId = req.params.id; // Get club ID from request param
  
      const deletedClub = await Club.findByIdAndDelete(clubId);
  
      if (!deletedClub) {
        return res.status(404).json({ error: "Club not found" });
      }
  
      res.status(200).json({ message: "Club deleted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the Club" });
    }
};
  
// GET route for fetching acad events using ID
exports.getClubById = async (req, res, next) => {
    try {
      const clubId = req.params.id; //get club ID from request param
  
      const club = await Club.findById(clubId);
  
      if (!club) {
        return res.status(404).json({ error: "Club not found" });
      }
  
      res.status(200).json({ club });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the Club" });
    }
};
  
// GET route for getting all of the clubs
exports.getAllClub = async (req, res, next) => {
    try {
      const clubs = await Club.find();
  
      res.status(200).json({ clubs });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while retrieving all Clubs",
      });
    }
};