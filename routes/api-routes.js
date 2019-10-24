var axios = require("axios");
var keys = require("../keys");

console.log(keys);

var db = require("../models");
var passport = require("../config/passport.js");
var flash = require("connect-flash");
var moviesArr = require("../data/movieArr");
var movieKey = keys.movieKey.key;

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    if (req.body.password === req.body.confirmPassword) {
      db.User.create({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.fName,
        lastName: req.body.lName,
        phone: req.body.phone
      })
        .then(function() {
          res.redirect(307, "/api/login");
        })
        .catch(function(err) {
          res.status(401).json(err);
        });
    } else {
      console.log("bad");

      res.json({ message: "make sure you enter the same password" });
    }
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({
        message: "please make sure you enter right email or password"
      });
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        id: req.user.id
      });
    }
  });

  app.post("/api/survey", function(req, res) {
    var recommendedMovie = {};
    var topCheck = 0;
    var favMovie = req.body.favoritemovie;
    var age = req.body.age;
    var actor = req.body.celebrity;
    var genre = req.body.movietype.toLowerCase();
    var director = "";
    var favWriters;
    let movieCollection = moviesArr[genre];

    axios
      .get(
        "http://www.omdbapi.com/?t=" +
          favMovie.replace(/[ ]/g, "%20") +
          "&y=&plot=short&apikey=" +
          movieKey
      )
      .then(function(favMovieData) {
        // get director and writers of their favorite movie
        director = favMovieData.data.Director;
        favWriters = favMovieData.data.Writer.split(", ");
      })
      .then(function() {
        for (let movieName of movieCollection) {
          var queryUrl =
            "http://www.omdbapi.com/?t=" +
            movieName.replace(/[ ]/g, "%20") +
            "&y=&plot=short&apikey=" +
            movieKey;

          axios
            .get(queryUrl)
            .then(function(res) {
              var currentChecker = 0;
              // AGE BASED CALCULATIONS
              if (age === "13-19" && res.data.Rated !== "R") {
                currentChecker++;
              }
              if (age === "19 and above" && res.data.Rated === "R") {
                currentChecker++;
              }
              if (age === "0-13" && res.data.Rated === "PG") {
                currentChecker++;
              }

              //ACTOR BASED CALCULATIONS

              // if (
              //   res.data.Actors.toLowerCase()
              //     .split(", ")
              //     .includes(actor.toLowerCase())
              // ) {
              //   currentChecker++;
              // }

              if (director === res.data.Director) {
                currentChecker++
              };


              // WRITER CHECK
              if (res.data.Writer.split(', '.includes(favWriters[0]))) {
                currentChecker++
              }

              // CHECK TO SEE IF ITS THE BEST MOVIE RECOMMENDATION
              if (currentChecker > topCheck) {
                topCheck = currentChecker;
                recommendedMovie = res.data;
              }
            })
            .then(function() {
              res.json(recommendedMovie);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
  });
};
