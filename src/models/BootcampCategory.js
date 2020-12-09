import moment from "moment";
import { model, Schema } from "mongoose";
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

export default model("BootcampCategory", BootcampCategory);
