const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const infoModel = require("../models/infoModel");
const ApiError = require("../utils/apiError");


// @desc   Get List Of infromations
// @route  GET  /api/v1/informtions
// @access Public
exports.getInformations = asyncHandler(async (req, res) => {
  // Pagination (from 10 - 12)
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const informations = await infoModel.find()
    .skip(skip)
    .limit(limit)
  res.status(200).json({ results: informations.length, page, data: informations });
});

// @desc   Get Specific info By ID
// @route  GET  /api/v1/Informations/:id
// @access Public
exports.getOneInformation = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const Information = await infoModel.findById(id);
  if (!Information) {
    // res.status(404).json({ msg: "No Product For This ID!" });
    return next(new ApiError("No Information For This ID!", 404));
  }
  res.status(200).json({ data: Information });
});

// @desc   Create Product
// @route  POST  /api/v1/Informations
// @access Private
exports.createInformation = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.name);
  const Information = await infoModel.create(req.body);
  res.status(201).json({ data: Information });
});

// @desc   Update Specific info
// @route  PUT  /api/v1/Informations/:id
// @access Private
exports.updateInformation = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }
  const Information = await infoModel.findByIdAndUpdate({ "_id" : id }, req.body, {
    new: true,
  });
  if (!Information) {
    return next(new ApiError("No information For This ID!", 404));
  }
  res.status(200).json({ data: Information });
});

// @desc   Delete Specific info
// @route  DELETE  /api/v1/Informations/:id
// @access Private
exports.deleteInformation = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const Information = await infoModel.findOneAndDelete({ "_id" : id });
  if (!Information) {
    // res.status(404).json({ msg: "No Product For This ID!" });
    return next(new ApiError("No Information For This ID!", 404));
  }
  res.status(200).send("Deleted Successfully");
});
