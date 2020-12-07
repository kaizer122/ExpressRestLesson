import express from "express";
var path = require("path");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/users", usersRouter);

app.get("/zzz", (req, res) => {
  res.status(200).send({ x: "azzaa" });
});
app.listen(5000, () => console.log("listening......"));

module.exports = app;
