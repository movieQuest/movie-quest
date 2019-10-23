

// displayMovieInfo function re-renders the HTML to display the appropriate content
$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  

  $('#myModal').modal('toggle')

  var movie = $("#search").val();
  console.log(movie);
  var queryURLPre = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
  

  queryURL = "";
  for (var i = 0; i < queryURLPre.length; i++) {
    if (queryURLPre[i] == " ") {
      queryURL += "+"
    } else {
      queryURL += queryURLPre[i];

    }

  }
  $("#search").val("");
  console.log(queryURL);






  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    // Creating a div to hold the movie
    var movieDiv = $("<div class='movie'>");

    // Storing the rating data
    var rating = response.Rated;

    // Creating an element to have the rating displayed
    var pOne = $("<p>").text("Rating: " + rating);

    // Displaying the rating
    movieDiv.append(pOne);

    // Storing the release year
    var released = response.Released;

    // Creating an element to hold the release year
    var pTwo = $("<p>").text("Released: " + released);

    // Displaying the release year
    movieDiv.append(pTwo);

    // Storing the plot
    var plot = response.Plot;

    // Creating an element to hold the plot
    var pThree = $("<p>").text("Plot: " + plot);

    // Appending the plot
    movieDiv.append(pThree);

    // Retrieving the URL for the image
    var imgURL = response.Poster;

    // Creating an element to hold the image
    var image = $("<img>").attr("src", imgURL);

    // Appending the image
    movieDiv.append(image);
    $(".movie-search-results").html(movieDiv)

  });

});



