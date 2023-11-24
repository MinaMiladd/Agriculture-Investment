const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ProductModel = require("../models/productModel");
const ApiError = require("../utils/apiError");
const productModel = require("../models/productModel");
const CategoryModel = require("../models/categoryModel");

// @desc   Get List Of Products
// @route  GET  /api/v1/products
// @access Public
exports.getProducts = asyncHandler(async (req, res) => {
  // Pagination (from 10 - 12)
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const products = await ProductModel.find()
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });
  res.status(200).json({ results: products.length, page, data: products });
});

// @desc   Get Specific Product By ID
// @route  GET  /api/v1/products/:id
// @access Public
exports.getOneProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id).populate({
    path: "category",
    select: "name -_id",
  });
  if (!product) {
    // res.status(404).json({ msg: "No Product For This ID!" });
    return next(new ApiError("No Product For This ID!", 404));
  }
  res.status(200).json({ data: product });
});

// @desc   Create Product
// @route  POST  /api/v1/Products
// @access Private
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await ProductModel.create(req.body);
  res.status(201).json({ data: product });
});

// @desc   Update Specific Product
// @route  PUT  /api/v1/products/:id
// @access Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const product = await ProductModel.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError("No Product For This ID!", 404));
  }
  res.status(200).json({ data: product });
});

// @desc   Delete Specific Product
// @route  DELETE  /api/v1/Products/:id
// @access Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findOneAndDelete({ "_id" : id });
  if (!product) {
    // res.status(404).json({ msg: "No Product For This ID!" });
    return next(new ApiError("No Product For This ID!", 404));
  }
  res.status(200).send("Deleted Successfully");
});
