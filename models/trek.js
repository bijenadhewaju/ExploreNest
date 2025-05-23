const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
  },
  { _id: false }
);

const trekSchema = mongoose.Schema(
  {
    trackName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Moderate", "Hard"],
      default: "Moderate",
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    itinerary: [itinerarySchema]
  },
  {
    timestamps: true,
  }
);
const Trek = mongoose.model("Trek", trekSchema);
module.exports = Trek;
