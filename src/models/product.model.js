const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product."],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      validate: {
        validator: (value) => {
          if (value === "" || validator.isURL(value)) {
            return true;
          }
          return false;
        },
      },
    },
    otherImages: [
      {
        type: String,
        validate: {
          validator: (value) => {
            if (value === "" || validator.isURL(value)) {
              return true;
            }
            return false;
          },
        },
      },
    ],
    category: {
      type: String,
      required: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: false,
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs/bag",
      },
    },
    stock: {
      type: Number,
      required: false,
      min: [0, "Stock cannot be negative."],
    },
    brand: {
      type: String,
      required: false,
      lowercase: true,
    },
    color: [
      {
        type: String,
        lowercase: true,
      },
    ],
    size: [
      {
        type: String,
        lowercase: true,
      },
    ],
    rating: {
      type: Number,
      required: false,
      min: [1, "Rating must be at least 1."],
      max: [5, "Rating cannot exceed 5."],
    },
    reviews: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          rating: {
            type: Number,
            required: true,
            min: [1, "Rating must be at least 1."],
            max: [5, "Rating cannot exceed 5."],
          },
          comment: {
            type: String,
            required: true,
          },
          user: {
            type: ObjectId,
            ref: "User",
            required: false,
          },
        },
      ],
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamp: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
