import dotenv from "dotenv";
import faker from "faker/locale/en";
import connectDB from "./config/db";
import Bootcamp from "./models/Bootcamp";
import BootcampCategory from "./models/BootcampCategory";
dotenv.config({ path: "src/config/config.env" });

connectDB();

const generateBootcamps = async () => {
  const generatedBootcamps = [];
  const categories = await BootcampCategory.find().lean();
  const categIds = categories.map((c) => c._id);
  for (let i = 0; i < 100; i++) {
    const category = faker.random.arrayElement(categIds);
    const { name: categoryName } = categories.find((c) => c._id === category);
    const name = ` ${faker.commerce.productAdjective()} ${faker.hacker.ingverb()} ${categoryName}`;
    const description = faker.commerce.productDescription();
    const rating = faker.random.arrayElement([0, 1, 2, 3, 4, 5]);
    const price = faker.commerce.price();
    const imageUrl = faker.image.imageUrl(640, 480, "tech", true, true);
    generatedBootcamps.push(
      new Bootcamp({
        name,
        rating,
        price,
        category,
        description,
        imageUrl,
      }).save()
    );
  }
  Promise.all(generatedBootcamps)
    .then(() => console.log("ok"))
    .catch((e) => console.log(e));
};
generateBootcamps();
