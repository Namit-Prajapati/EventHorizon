const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var venueSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    bookedOn: [{ type: Date, unique: true, }],
    venueImages: [{ type: String }],
    description: {
      type: String,
      trim: true,
    },
    capacity: {
      type: Number,
    },
    hostedEvents: [{ type: Schema.ObjectId, ref: "Event" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Venue", venueSchema);
