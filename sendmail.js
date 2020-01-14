var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "saoodheart@gmail.com",
    pass: "tnumdqnravpvrcfb"
  }
});

const sendMail = (email, subject, text, cb) => {
  const mailOptions = {
    from: "saoodheart@yahoo.com",
    to: email,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      cb(error, null);
    } else {
      cb(null, info);
    }
  });
};
/* sendMail("saood011@yahoo.com", "hi", "hello", function(err, info) {
  if (err) {
    console.log(err);
  } else {
    console.log(info);
  }
}); */
module.exports = sendMail;
