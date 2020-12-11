import dotenv from "dotenv";
import faker from "faker/locale/en";
import connectDB from "./config/db";
import Bootcamp from "./models/Bootcamp";
import BootcampCategory from "./models/BootcampCategory";
import Review from "./models/Review";
import User from "./models/User";
dotenv.config({ path: "src/config/config.env" });
faker.seed(123);
connectDB();

const generateUsers = async (numberOfUsers = 20) => {
  const generatedUsers = [];
  for (let i = 0; i < numberOfUsers; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const name = firstName + " " + lastName;
    const email = faker.internet.email(firstName, lastName);
    const password = "123456";
    const avatar = faker.image.people(200, 200);
    const user = new User({ name, email, password, avatar });
    const invalid = true;
    while (invalid) {
      try {
        await user.validate();
      } catch (e) {
        user.email = faker.internet.email();
      }
      invalid = false;
    }
    generatedUsers.push(user.save());
  }
  await Promise.all(generatedUsers)
    .then(() => console.log("generated " + numberOfUsers + " users!"))
    .catch((e) => console.log(e));
};

const generateBootcamps = async (numberOfBootcamps = 100) => {
  const generatedBootcamps = [];
  const categories = await BootcampCategory.find().lean();
  const categIds = categories.map((c) => c._id);

  const users = await User.find().lean();
  const userIds = users.map((u) => u._id);
  for (let i = 0; i < numberOfBootcamps; i++) {
    const category = faker.random.arrayElement(categIds);
    const creator = faker.random.arrayElement(userIds);
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
        creator,
      }).save()
    );
  }
  await Promise.all(generatedBootcamps)
    .then(() => console.log("generated " + numberOfBootcamps + " bootcamps!"))
    .catch((e) => console.log(e));
};

const generateReviews = async (numberOfReviews = 10) => {
  const generatedReviews = [];
  const bootcamps = await Bootcamp.find();
  const bootcampIds = bootcamps.map((b) => b._id);
  const users = await User.find();
  const userIds = users.map((u) => u._id);
  for (const bootcampId of bootcampIds) {
    for (let i = 0; i < numberOfReviews; i++) {
      const text = faker.lorem.paragraph(
        faker.random.arrayElement([1, 2, 3, 4])
      );
      const user = faker.random.arrayElement(userIds);
      const rating = faker.random.arrayElement([0, 1, 2, 3, 4, 5]);
      generatedReviews.push(
        new Review({ creator: user, bootcamp: bootcampId, text, rating }).save()
      );
    }
  }
  await Promise.all(generatedReviews)
    .then(() =>
      console.log("Generated " + generatedReviews.length + " reviews!")
    )
    .catch((e) => console.log(e));
};
const generateData = async () => {
  await generateUsers(20);
  await generateBootcamps(100);
  await generateReviews(10);
};

generateData();
