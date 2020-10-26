const { log } = console;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
require("dotenv").config();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// View engine setup
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/", (req, res) => {});

app.get("/dude", (req, res) => {
  res.sendFile(__dirname + "/public/views/dude-start.html");
});

// app.get("/dude/wars", (req, res) => {
//   res.sendfile(__dirname + "/public/html/dude-easter-egg.html");
// });

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/public/views/about-me.html");
});

app.get("/contact", (req, res) => {
  res.render(__dirname + "/public/views/contact.handlebars", { layout: false });
});

app.get("/portfolio", (req, res) => {
  res.sendFile(__dirname + "/public/views/portfolio.html");
});

app.get("/robin", (req, res) => {
  res.sendFile(__dirname + "/public/views/robin-tribute.html");
});

app.get("/tech_doc", (req, res) => {
  res.sendFile(__dirname + "/public/views/tech-doc.html");
});

app.get("/game_survey", (req, res) => {
  res.render(__dirname + "/public/views/game-survey.handlebars", {
    layout: false,
  });
});

let transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Code for contact form to send to email
app.post("/send", (req, res) => {
  const output = `
  <p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>
  <li>Name: ${req.body.name}</li>
  <li>Email: ${req.body.email}</li>
  <li>Phone Number: ${req.body.number}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.message}</p>
  `;

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Contact Form from Website"' + "<" + process.env.MAILGUN_USER + ">",
    to: process.env.GMAIL,
    subject: "Contact Form From My Website",
    text: "Hello world?",
    html: output,
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render(__dirname + "/public/views/contact.handlebars", {
      layout: false,
      msg: "Message sent. Thanks and I'll contact you back shortly!",
    });
  });
});

// Code for survey form
app.post("/game_send", (req, res) => {
  const output = `
  <p>New game survey filled out</p>
  <h3>Game Survey</h3>
  <ul>
  <li>Name: ${req.body.name}</li>
  <li>Email: ${req.body.email}</li>
  <li>Favorite Game: ${req.body.favorite}</li>
  <li>Favorite System: ${req.body.system}</li>
  <li>Single Player or Multiplayer: ${req.body.singlemulti}</li>
  <li>Favorite Genre: ${req.body.genre}</li>

  </ul>
  <h3>Favorite Game Explanation</h3>
  <p>${req.body.explain}</p>
  `;

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Game Survey Form"' + "<" + process.env.MAILGUN_USER + ">",
    to: process.env.GMAIL,
    subject: "Game Survey Form Submission",
    text: "Hello world?",
    html: output,
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render(
      __dirname + "/public/views/game-survey-confirmation.handlebars",
      {
        layout: false,
      }
    );
  });
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server started on port 3001");
});
