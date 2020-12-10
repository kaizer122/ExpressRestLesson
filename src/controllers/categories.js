import asyncHandler from "../middleware/asyncHandler";
import Bootcamp from "../models/Bootcamp";
import BootcampCategory from "../models/BootcampCategory";

export const getCategories = asyncHandler(async (req, res, next) => {
  const categories = await BootcampCategory.find().lean();
  res.status(200).send({ success: true, data: categories });
});

export const addCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const categ = new BootcampCategory({ name });
  await categ.save();

  res.status(200).send({ success: true, data: categ });
});

export const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const categ = await BootcampCategory.findByIdAndUpdate(
    id,
    { name },
    { new: true, lean: true, runValidators: true }
  );
  if (!categ)
    return res
      .status(500)
      .send({ success: false, error: "Cannot find category" });
  res.status(200).send({ success: true, data: categ });
});

export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await BootcampCategory.findByIdAndDelete(id);
  res.status(200).send({ success: true });
});
