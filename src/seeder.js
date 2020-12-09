import connectDB from "./config/db";
import dotenv from "dotenv";
import faker from "faker/locale/en";
import Bootcamp from "./models/Bootcamp";
import BootcampCategory from "./models/BootcampCategory";
dotenv.config({ path: "src/config/config.env" });

connectDB();

const generateBootcamps = async () => {
  const generatedBootcamps = [];
  const categories = await BootcampCategory.find().lean();
  const categIds = categories.map((c) => c._id);
  console.log(categIds);
  for (let i = 0; i < 100; i++) {
    const name = faker.name.findName();
    const rating = faker.random.arrayElement([0, 1, 2, 3, 4, 5]);
    const price = faker.random.number(5000);
    const category = faker.random.arrayElement(categIds);
    generatedBootcamps.push(
      new Bootcamp({ name, rating, price, category }).save()
    );
  }
  Promise.all(generatedBootcamps)
    .then(() => console.log("ok"))
    .catch((e) => console.log(e));
};
generateBootcamps();
