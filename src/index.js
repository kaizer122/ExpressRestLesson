import express from "express";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import categoriesRouter from "./routes/categories";
import usersRouter from "./routes/users";
import connectDB from "./config/db";
import errorHandler from "./middleware/errorHandler";
import bootcampsRouter from "./routes/bootcamps";

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

// to give make a directory public
app.use(express.static(path.join(__dirname, "public")));

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
