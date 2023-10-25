const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var clubSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    facultyId: [
      {
        type: Schema.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    organizedEvents: [{ type: Schema.ObjectId, ref: "Event" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Club", clubSchema);
