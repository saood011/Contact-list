require("./model/db");
const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const bodyparser = require("body-parser");
const multer = require("multer");
const contactController = require("./controller/contactController");

// view engine
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partial");

app.use(express.static(path.join(__dirname, "public")));
app.use(
  bodyparser.urlencoded({
    extended: true
  })
);
app.use(bodyparser.json());

app.use("/", contactController);

const port = process.env.PORT || 4960;
app.listen(port, () => {
  console.log(`Server started on port : ${port}`);
});
