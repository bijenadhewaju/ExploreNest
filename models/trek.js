const mongoose = require('mongoose')

const BookSchema = mongoose.Schema(
    {
        Destination: {
            type: String,
            required: [true, "Please enter the name of location"],
        },
       Location: {
            type: String,
            required: [true, "Please enter the location"],
        },
        description: {
            type: String,
            required: [true, "Please enter the location description"],
        },
        Days: {
            type: String,
            required: [true, "Please enter the day plan for whole trip"],
        },
  },
  {
    timestamps: true,
  }
)

const Book = mongoose.model("Book", BookSchema)
module.exports = Book