const express = require("express");
const mongoose = require("mongoose");
var Contact = mongoose.model("contact");
var router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const sendMail = require("../sendmail");
// Storage engine
const storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  }
});

//init upload
const upload = multer({ storage: storage });

// Home route
router.get("/", (req, res) => {
  res.render("index", {
    indexTitle: "Create Contact",
    button: "Submit",
    cancelButton: false
  });
});

router.post("/", upload.single("inputPic"), (req, res) => {
  if (req.body._id == "") {
    //insertin new
    var contact = new Contact();
    contact.FullName = req.body.FullName;
    contact.Email = req.body.Email;
    if (req.file) {
      contact.Image = req.file.filename;
    } else {
      contact.Image = "avatar.jpg";
    }
    contact.phone = req.body.phone;
    contact.city = req.body.city;
    contact.Created = Date.now();
    contact.save((err, doc) => {
      if (!err) {
        res.redirect("/list");
        console.log(req.file);
        console.log(req.body);
      } else {
        console.log("Error during insertion: " + err);
      }
    });
  } else {
    // updating existing contact
    Contact.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true },
      (err, docs) => {
        if (!err) {
          res.redirect("/list");
          console.log(docs);
        } else {
          console.log("Error while updating: " + err);
        }
      }
    );
  }
});

router.get("/list", (req, res) => {
  Contact.find((err, docs) => {
    if (!err) {
      res.render("list", { list: docs });
    } else {
      console.log("Error in retrieving contact list: " + err);
    }
  });
});
router.get("/update/:id", (req, res) => {
  Contact.findById(req.params.id, (err, docs) => {
    if (!err) {
      res.render("index", {
        indexTitle: "Update Contact",
        button: "Update",
        cancelButton: true,
        contact: docs
      });
    } else {
      console.log("Error in retrieving contact list: " + err);
    }
  });
});
router.get("/delete/:id", (req, res) => {
  Contact.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      res.redirect("/list");
      // deleting image from uploads as well
      let image = docs.Image;
      fs.unlink("public/uploads/" + image, function() {
        console.log(docs);
      });
    } else {
      console.log("Error in deleting contact : " + err);
    }
  });
});

router.get("/email/:id", (req, res) => {
  Contact.findById(req.params.id, (err, docs) => {
    if (!err) {
      res.render("email", {
        indexTitle: " Email Contact",
        button: "Send",
        contact: docs
      });
    } else {
      console.log("Error in retrieving contact list: " + err);
    }
  });
});

router.post("/email/send", (req, res) => {
  console.log(req.body);
  sendMail(req.body.Email, req.body.subject, req.body.message, function(
    err,
    data
  ) {
    if (err) {
      console.log("Internal Error" + err);
    } else {
      res.send(
        `<h1>Email Sent Successfully!</h1> <a href="/list">Go to Contact List</a>`
      );
      console.log("Email sent");
    }
  });
});
module.exports = router;
