import moment from "moment";
import { model, Schema } from "mongoose";
import Bootcamp from "./Bootcamp";
const BootcampCategory = new Schema({
  name: {
    type: String,
    required: [true, "Please add a category name"],
    minlength: [3, "The bootcamp name must have atleast 3 characters."],
  },
  createdAt: {
    type: Number,
    default: moment().valueOf(),
  },
});

// Cascade delete courses when a bootcamp is deleted
BootcampCategory.pre("findOneAndDelete", async function (next) {
  const res = await Bootcamp.deleteMany({ category: this._conditions._id });
  console.log(
    `${res.deletedCount} Bootcamps being removed because category ${this._conditions._id} was deleted`
  );
  next();
});

export default model("BootcampCategory", BootcampCategory);
