const mongoose = require("mongoose");

//1- Create Schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Required"],
      unique: [true, "Category Unique"],
      minlength: [3, "to short category name"],
      maxlength: [32, "to long category name"],
    },
    // A and B => shoping.com/a-and-b
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

//2- Create Model
const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
