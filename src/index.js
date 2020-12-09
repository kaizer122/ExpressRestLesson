import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import path from "path";
import connectDB from "./config/db";
import errorHandler from "./middleware/errorHandler";
import bootcampsRouter from "./routes/bootcamps";
import categoriesRouter from "./routes/categories";
import usersRouter from "./routes/users";

dotenv.config({ path: "src/config/config.env" });
connectDB();
const app = express();
// to accept json data in post requests
app.use(express.json());
// to accept xwww- data in post requests
app.use(express.urlencoded({ extended: true }));
// to accept cross origin requests.
app.use(cors());
// to log requests
app.use(morgan("dev"));

// express fileUpload middleware https://attacomsian.com/blog/uploading-files-nodejs-express?fbclid=IwAR2oQ3C3BNwf7P1YzXBgSjtQW3vlVWJiy2B3wZFz8Hmoae1eRMuznBJm74w

app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 2 * 1024 * 1024 * 1024, //2MB max file(s) size,
    },
  })
);

// to make public directory public
app.use("/public", express.static(path.join(__dirname, "../public")));

app.use("/categories", categoriesRouter);
app.use("/bootcamps", bootcampsRouter);

app.use("/users", usersRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("listening......"));

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
