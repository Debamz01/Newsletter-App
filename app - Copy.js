

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("bamzy"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {

const firstName = req.body.firstName;
const lastName = req.body.surName;
const email = req.body.email;

const data = {
members: [
  {
    email_address: email,
    status: "subscribed",
  merge_fields: {
    FNAME: firstName,
    LNAME: lastName
  }
  }
]

};
const jsonData = JSON.stringify(data);

const url =   "";

const options = {
  method: "POST",
  auth: "debamz:api_key_here"
}

const request = https.request(url, options, function (response) {


if (response.statusCode === 200) {
  res.sendFile(__dirname + "/success.html");
} else {
  res.sendFile(__dirname + "/oops.html");
}

  response.on("data", function (data) {
    console.log(JSON.parse(data));
  })
})

request.write(jsonData);
request.end();

});

app.post("/oops", function (req, res) {
  res.redirect("/")
})

app.listen(process.env.PORT || 3000, function () {
  console.log("This server is running on port 3000")
})


