// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport.js");
var flash = require("connect-flash");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.redirect("/signup");
  });

  // app.post("/api/login", function(req, res) {
  //   // console.log("backend console", JSON.stringify(req.body))
  //   res.json(req.user);
  // });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    // console.log('this is the data' + JSON.stringify(req.body, null, 2));

    if (req.body.password === req.body.confirmPassword) {
      console.log("good");

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
    // console.log(req.user);

    if (!req.user) {
      // console.log("error");
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
    console.log("Route hit");
    console.log(req.body);
    var recommendedMovie = {};
    var topCheck = 0;
    var favMovie = req.body.favoritemovie;
    var age = req.body.age;
    var actor = req.body.celebrity;
    var genre = req.body.movietype;
    console.log(genre)
    console.log(age);
    console.log(favMovie);
    console.log(actor);

    // for(var i = 0; i < )
  }); /*
          
            var recommendedMovie = {};
            var topChecks = 0
            for (length of movies.FavGenre) {
              let currentChecker = 0;
              axios.get(omdb + movies.favgenre[i], function(err, res) {
                if (res.Rated === "PG-13" && (userAge === 13-19 || userAge === 20+)) {
                  currentChecker++
                })
                if (res.Rated === "R" && userAge === 20+) {
                  currentChecker++
                }
                let actorsArr = res.Actors.toLowerCase().split(', ')
                if (actorsArr.includes(userFavActor.toLowerCase()) {
                  currentChecker++
                }
                if (currentChecker>topChecks) {
                  recommendedMovie = res[i]
                }
              })
            }
            res.json(recommendMovie)
            
            
            
            */ // app.post("/survey/results"), function(req, res){ // req.body has the data // based on favGenre grab the data of our favorite movies in that genre (ex: movies.action) // our favMovies = ["Batman", "Die Hard", "Fast and the Furious", "The Bourne Identity"] // do axios to omdb with these movies--one at a time //each time check to see if the rating is alright based on age // then check to see if response.actors.split(', ').includes(favActor) //if so get another check // compare these checks to past checks // whichever movie is most checks gets res.json(bestRecommadation) // with favGenre do a genre filter // with the data do an axios to omdb // with age selection do a movie rating filter // with favActor do a actor
};
