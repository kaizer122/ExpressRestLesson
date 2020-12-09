import { Schema, model } from "mongoose";
import moment from "moment";
const BootcampSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    minlength: [3, "The bootcamp name must have atleast 3 characters."],
  },
  category: {
    type: Schema.ObjectId,
    ref: "BootcampCategory",
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  rating: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5],
    default: 0,
  },
  startsAt: {
    type: Number,
    default: moment().valueOf(),
  },
  createdAt: {
    type: Number,
    default: moment().valueOf(),
  },
  updatedAt: Number,
});

// BootcampSchema.pre("save", (next) => {
//   if (this.isNew || this.isModified("startsAt")) {
//     this.updatedAt = moment().valueOf();
//   }
//   next();
// });

export default model("Bootcamp", BootcampSchema);
