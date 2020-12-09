import asyncHandler from "../middleware/asyncHandler";
import Bootcamp from "../models/Bootcamp";
import BootcampCategory from "../models/BootcampCategory";

export const addBootcamp = asyncHandler(async (req, res, next) => {
  const count = await BootcampCategory.countDocuments({
    _id: req.body.category,
  });
  if (count === 0)
    return res
      .status(500)
      .send({ success: false, error: "Category not found" });
  const bootcamp = new Bootcamp(req.body);
  await bootcamp.save();
  res.send({ success: true, data: bootcamp });
});

export const getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find().populate("category").lean();
  res.send({ success: true, data: bootcamps });
});
