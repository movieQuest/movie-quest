$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var confirmPasswordInput = $("input#sign-up-password")
  var firstNameInput = $("input#firstName-input");
  var lastNameInput = $("input#lastName-input");
  var phoneInput = $("input#phone-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      confirmPassword: confirmPasswordInput.val().trim(),
      fName: firstNameInput.val().trim(),
      lName: lastNameInput.val().trim(),
      phone: phoneInput.val().trim()
    };
    console.log(userData)

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    // signUpUser(userData.email, userData.password);
    // emailInput.val("");
    // passwordInput.val("");

    $.post("/api/signup", userData)
      .then(function (data) {
        console.log(data)
        
        if (!data.message) {
          
          window.location.replace("/members");
        }
        else {
          console.log(data.message);
           alert(data.message)
          // $("#alert .message").text(err.responseJSON);
          // $("#alert").fadeIn(500);
          // window.location.reload();

        }
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  // function signUpUser(email, password, firstName, lastName, phone) {
  //   $.post("/api/signup", {
  //     email: email,
  //     password: password,
  //     fName: firstName,
  //     lName: lastName,
  //     phone: phone
  //   })
  //     .then(function (data) {
  //       window.location.replace("/members");
  //       // If there's an error, handle it by throwing up a bootstrap alert
  //     })
  //     .catch(handleLoginErr);
  // }

  function handleLoginErr(err) {
    $("#alert .message").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
