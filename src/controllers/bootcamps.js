import asyncHandler from "../middleware/asyncHandler";
import Bootcamp from "../models/Bootcamp";
import BootcampCategory from "../models/BootcampCategory";
import ErrorResponse from "../utils/ErrorResponse";

export const addBootcamp = asyncHandler(async (req, res, next) => {
  const count = await BootcampCategory.countDocuments({
    _id: req.body.category,
  });
  // check if category exists
  if (count === 0) return new ErrorResponse("Category not found", 400);

  const bootcamp = new Bootcamp(req.body);
  //validate before file upload
  await bootcamp.validate();
  console.log(req.files.image);
  if (req.files && req.files.image) {
    req.files.image.mv("./public/uploads/bootcamps/" + req.files.image.name);
    bootcamp.imageUrl =
      process.env.PUBLIC_URL + "/uploads/bootcamps/" + req.files.image.name;
  }
  await bootcamp.save();
  res.send({ success: true, data: bootcamp });
});

export const getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find().populate("category").lean();
  res.send({ success: true, data: bootcamps });
});
