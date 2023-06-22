const mongoose = require("mongoose");
const validator = require("validator");

const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a brand name"],
      unique: true,
    },

    imageUrl: {
      type: String,
      validate: [validator.isURL, "Please provide a valid URL"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
