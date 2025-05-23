const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    description: String,
  },
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
      required: false,
    },
    images: [
      {
        type: String,
        required: false,
      },
    ],
    itinerary: [itinerarySchema]
  },
  {
    timestamps: false,
  }
);
const Trek = mongoose.model("Trek", trekSchema);
module.exports =Trek;