import asyncHandler from "../middleware/asyncHandler";
import Bootcamp from "../models/Bootcamp";
import BootcampCategory from "../models/BootcampCategory";
import ErrorResponse from "../utils/ErrorResponse";

export const addBootcamp = asyncHandler(async (req, res, next) => {
  const count = await BootcampCategory.countDocuments({
    _id: req.body.category,
  });
  // check if category exists
  if (count === 0) return next(new ErrorResponse("Category not found", 400));

  const bootcamp = new Bootcamp({ ...req.body, creator: req.user._id });
  //validate before file upload
  await bootcamp.validate();
  if (req.files && req.files.image) {
    req.files.image.mv("./public/uploads/bootcamps/" + req.files.image.name);
    bootcamp.imageUrl =
      process.env.PUBLIC_URL + "/uploads/bootcamps/" + req.files.image.name;
  }
  await bootcamp.save();
  res.send({ success: true, data: bootcamp });
});

export const getBootcamps = asyncHandler(async (req, res) => {
  const {
    category = "",
    creator = "",
    searchQuery = "",
    skip = 0,
    limit = 20,
  } = req.query;

  const query = {};

  if (String(searchQuery).trim() !== "") {
    query.name = { $regex: String(searchQuery), $options: "mi" };
  }

  if (String(category).trim() !== "") query.category = category;
  if (String(creator).trim() !== "") query.creator = creator;

  const bootcamps = await Bootcamp.find(query)
    .populate(["category", "creator"])
    .skip(Number(skip))
    .limit(Number(limit))
    .sort({ createdAt: -1 })
    .lean();
  res.send({ success: true, data: bootcamps });
});

export const getBootcamp = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const bootcamp = await Bootcamp.findById(id)
    .populate(["category", "creator"])
    .lean();
  res.send({ success: true, data: bootcamp });
});

export const updateBootcamp = asyncHandler(async (req, res, next) => {
  const { category } = req.body;
  if (category && category.length > 0) {
    const count = await BootcampCategory.countDocuments({
      _id: req.body.category,
    });
    // check if category exists
    if (count === 0) return next(new ErrorResponse("Category not found", 400));
  }
  const updates = { ...req.body };
  if (req.files && req.files.image) {
    req.files.image.mv("./public/uploads/bootcamps/" + req.files.image.name);
    updates.imageUrl =
      process.env.PUBLIC_URL + "/uploads/bootcamps/" + req.files.image.name;
  }
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    lean: true,
    runValidators: true,
  });
  res.send({ success: true, data: bootcamp });
});

export const deleteBootcamp = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await Bootcamp.findByIdAndDelete(id);
  res.status(200).send({ success: true });
});
