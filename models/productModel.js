const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Too Short Product Title"],
      maxlength: [100, "Too Long Product Title"],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product Description Is Required"],
      minlength: [5, "Too Short Product Description"],
    },
    quantity: {
      type: Number,
      required: [true, "Product Quantity Is Required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      max: [200000, "Too Long Product Price"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],
    imageCover: {
      type: String,
      required: [true, "Product Image Cover Is Required"],
    },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product Must Be Belong To Category"],
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating Must Be Above Or Equal 1.0"],
      max: [5, "Rating Must Be Below Or Equal 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
