// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

/* app.get("/api/:date?", function (req, res, next) {
  let date_string = req.params.date;
  let date_regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  if (!req.params.date) {
    res.json({ unix: new Date().getTime(), utc: new Date().toUTCString() });
  } else if (date_string == 1451001600000) {
    res.send({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
  } else if (date_regex.test(date_string)) {
    let utcDate = new Date(date_string);
    res.send({ unix: Date.parse(date_), utc: utcDate.toUTCString() });
  } else {
    res.send({
      error: "Invalid Date",
    });
  }
});
 */
app.get("/api", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});

app.get("/api/:date", (req, res) => {
  let dateString = req.params.date;

  //A 4 digit number is a valid ISO-8601 for the beginning of that year

  //5 digits or more must be a unix time, until we reach a year 10,000 problem

  if (/\d{5,}/.test(dateString)) {
    const dateInt = parseInt(dateString);

    //Date regards numbers as unix timestamps, strings are processed differently

    res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
  } else {
    let dateObject = new Date(dateString);

    if (dateObject.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
    }
  }
});
// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
