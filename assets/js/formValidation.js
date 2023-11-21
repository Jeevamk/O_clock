// function validateForm() {
//     const nameInput = document.querySelector("#name");
//     const emailInput = document.querySelector("#email");
//     const phoneInput = document.querySelector("#phone");
//     const passwordInput = document.querySelector("#password");

//     if (nameInput.value === "" || emailInput.value === "" || passwordInput.value === "" || phoneInput.value === "") {
//       alert("Please fill in all the required fields.");
//       return false;
//     }

//     const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     if (!emailRegex.test(emailInput.value)) {
//       alert("Please enter a valid email address.");
//       return false;
//     }

//     if (phoneInput.value.length < 10) {
//         alert("phone number must be at least 10 characters long.");
//         return false;
//       }

//     if (passwordInput.value.length < 6) {
//       alert("Password must be at least 6 characters long.");
//       return false;
//     }

//     return true;
//   }

//signup//

function validateForm() {
  var name = document.forms["myform"]["name"].value;
  var email = document.forms["myform"]["email"].value;
  var phone = document.forms["myform"]["phone"].value;
  var password = document.forms["myform"]["password"].value;
  var confirmPassword = document.forms["myform"]["cpassword"].value;

  var nameError = document.getElementById("error");
  var emailError = document.getElementById("error1");
  var phoneError = document.getElementById("error2");
  var passwordError = document.getElementById("error3");
  var confirmPasswordError = document.getElementById("error4");

  if (name === "") {
    nameError.innerHTML = "**Please fill in your name**";
    return false;
  }
  if (name.length <3 ) {
    nameError.innerHTML = "**name must be at  3 characters**";
    return false;
  }
 
  nameError.innerHTML = "";

  if (email === "") {
    emailError.innerHTML = "**Please fill in your email**";
    return false;
  }
  if (
    email.indexOf("@") <= 0 ||
    (email.charAt(email.length - 4) !== "." &&
      email.charAt(email.length - 3) !== ".")
  ) {
    emailError.innerHTML = "**Invalid email format**";
    return false;
  }
  emailError.innerHTML = "";

  if (phone === "") {
    phoneError.innerHTML = "**Please fill in your phone**";
    return false;
  }
  if (phone.length < 10) {
    phoneError.innerHTML = "**phone number must be at least 10 characters**";
    return false;
  }
  phoneError.innerHTML = "";

  if (password === "") {
    passwordError.innerHTML = "**Please fill in your password**";
    return false;
  }
  if (password.length < 6) {
    passwordError.innerHTML = "**Password must be at least 6 characters**";
    return false;
  }
  passwordError.innerHTML = "";

  if(confirmPassword === ""){
    confirmPasswordError.innerHTML = "**Please fill in your confirm password**"
    return false;
  }
  confirmPasswordError.innerHTML = "";

  if (confirmPassword !== password) {
    confirmPasswordError.innerHTML = "**Passwords do not match**";
    return false;
  }
  confirmPasswordError.innerHTML = "";

  return true;
}

//login form//
function loginForm() {
  var logemail = document.forms["loginform"]["email"].value;
  var logpassword = document.forms["loginform"]["password"].value;

  var logemailError = document.getElementById("msg1");
  var logpasswordError = document.getElementById("msg2");

  if (logemail === "") {
    logemailError.innerHTML = "**Please fill in your email**";
    return false;
  }
  logemailError.innerHTML = "";

  if (!logemail) {
    logemailError.innerHTML = "**Email is not found**";
    return false;
  }
  logemailError.innerHTML = "";

  if (logpassword === "") {
    logpasswordError.innerHTML = "**Please fill the password**";
    return false;
  }
  logpasswordError.innerHTML = "";
  
  
  return true;
}




//category//

function addcat() {
  const nameInput = document.querySelector("#name");
  const descriptionInput = document.querySelector("#disc");
  const availableStockInput = document.querySelector("#stock");

  if (
    nameInput.value === "" ||
    descriptionInput.value === "" ||
    availableStockInput.value === ""
  ) {
    alert("Please fill in all the required fields.");
    return false;
  }

  return true;
}


//brand//
function addbrand() {
  const nameInput = document.querySelector("#name");
  const descriptionInput = document.querySelector("#disc");
  const availableStockInput = document.querySelector("#stock");

  if (
    nameInput.value === "" ||
    descriptionInput.value === "" ||
    availableStockInput.value === ""
  ) {
    alert("Please fill in all the required fields.");
    return false;
  }

  return true;
}


//forgot password//

function forgotForm() {
  var forgotemail = document.forms["forgotform"]["email"].value;

  var forgotemailError = document.getElementById("forgoterror");

  if (forgotemail === "") {
    forgotemailError.innerHTML = "**Please fill in email**";
    return false;
  }
 
  forgotemailError.innerHTML = "";
  
  return true;


}


//contact form//
function contactForm() {
    var name = document.forms["contactform"]["name"].value;
    var email = document.forms["contactform"]["email"].value;
    var subject = document.forms["contactform"]["subject"].value;
  
    var cnameError = document.getElementById("cnameError");
    var cemailError = document.getElementById("cemailError");
    var csubjectError = document.getElementById("csubjectError");
  
    if (name === "") {
      cnameError.innerHTML = "**Please fill in your name**";
      return false;
    }
    if (name.length <3 ) {
      cnameError.innerHTML = "**name must be at  3 characters**";
      return false;
    }
   
    cnameError.innerHTML = "";
  
    if (email === "") {
      cemailError.innerHTML = "**Please fill in your email**";
      return false;
    }
    if (
      email.indexOf("@") <= 0 ||
      (email.charAt(email.length - 4) !== "." &&
        email.charAt(email.length - 3) !== ".")
    ) {
      cemailError.innerHTML = "**Invalid email format**";
      return false;
    }
    cemailError.innerHTML = "";
  
    if (subject === "") {
      csubjectError.innerHTML = "**Please fill the subject**";
      return false;
    }
    
    csubjectError.innerHTML = "";
  
    return true;
  }

