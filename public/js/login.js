$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = loginForm.find("input.email-input");
  var passwordInput = loginForm.find("input.password-input");

  // When the form is submitted, we validate there's an email and password entered
  $(document).on("click", "#modal-submit", function(event) {
    event.preventDefault();
    // alert("Your login click");
    var userData = {
      email: $(".email-input").val().trim(),
      password: $('.password-input').val().trim()
    };
    console.log(userData)

    //only checks if a field is blank
    //maybe change to something that's not an alert after MVP
    if (!userData.email || !userData.password) {
      alert("Please fill out all form fields.")
      return; 
    }
    
    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function (res) {
        // console.log(res);
        $.get("/login").then(function (data) {
          console.log(" in get in post");
          
        })
        window.location.replace("/survey");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
    
      });
  }
});
