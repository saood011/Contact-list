const mongoose = require("mongoose");

var contactSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true
  },
  Email: {
    type: String
  },
  phone: {
    type: String
  },
  city: {
    type: String
  },
  Image: {
    type: String
  },
  Created: {
    type: Date,
    default: Date.now()
  }
});

mongoose.model("contact", contactSchema);
