const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    targetedDept: [{ type: String }],
    banner: {
      type: String,
      trim: true,
    },
    reportFile: {
      type: String,
      trim: true,
      default: null,
    },
    reportImages: [{ type: String }],
    logo: {
      type: String,
    },
    venueId:{
      type: Schema.ObjectId,
      ref: "Venue",
    },
    clubId: {
      type: Schema.ObjectId,
      ref: "Club",
    },
    facultyId: {
      type: Schema.ObjectId,
      ref: "User",
    },
    registrationDeadline: {
      type: Date,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
      required: true,
      enum: ["requested", "rejected", "upcoming", "completed"],
    },
    registrations: [{ type: Schema.ObjectId, ref: "User" }],
    attendees: [
      {
        attendance: [{ type: Schema.ObjectId, ref: "User" }],
        day: { type: Date },
      },
    ],
    broadcast: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
