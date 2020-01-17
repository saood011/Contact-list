const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://saood-data:1234@cluster0-p1lze.mongodb.net/test?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true },
  err => {
    if (!err) {
      console.log("MongoDB connected!!!");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);
require("./contact.model");
