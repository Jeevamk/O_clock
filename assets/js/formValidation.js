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
  const minLength = 3;
  const maxLength = 15;

  if (name.length < minLength) {
    nameError.innerHTML = `**Name must be at least ${minLength} characters**`;
    return false;
  }

  if (name.length > maxLength) {
    nameError.innerHTML = `**Name must be at most ${maxLength} characters**`;
    return false;
  }
  if (!/^[a-zA-Z]+$/.test(name)) {
    nameError.innerHTML = "**Name must only contain letters**";
    return false;
  }

  nameError.innerHTML = "";

  if (email === "") {
    emailError.innerHTML = "**Please fill in your email**";
    return false;
  }
  if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
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

  if (!/(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}/.test(password)) {
    passwordError.innerHTML = "**Password must contain at least one alphanumeric character,special character and minimum 6 characters**";
    return false;
  }
  passwordError.innerHTML = "";

  if (confirmPassword === "") {
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

  var forgotemailError = document.getElementById("forgotemailError");

  if (forgotemail === "") {
    forgotemailError.innerHTML = "**Please fill the email**";
    return false;
  }

  forgotemailError.innerHTML = "";

  return true;
}

//token//

function token() {
  var forgottoken = document.forms["tokenbox"]["token"].value;

  var forgotetokenError = document.getElementById("tokenmsg");

  if (forgottoken === "") {
    forgotetokenError.innerHTML = "**Please fill the token**";
    return false;
  }


  return true;
}


//reset password//
function resetpassword() {
  var newresetPass = document.forms["reset"]["newpass"].value;
  var confirmresetPass = document.forms["reset"]["cpass"].value;

  var newresetPassError = document.getElementById("newpas");
  var confirmresetPassError = document.getElementById("conpas")

  if (newresetPass === "") {
    newresetPassError.innerHTML = "**Please fill the new password**";
    return false;
  }
  if (!/(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}/.test(newresetPass)) {
    newresetPassError.innerHTML = "**Password must contain at least one alphanumeric character,special character and minimum 6 characters**";
    return false;
  }
  newresetPassError.innerHTML = "";

  if (confirmresetPass === "") {
    confirmresetPassError.innerHTML = "**Please fill the confirm password**";
    return false;
  }
  confirmresetPassError.innerHTML = "";

  if (confirmresetPass !== newresetPass) {
    confirmresetPassError.innerHTML = "**Passwords do not match**";
    return false;
  }
  confirmresetPassError.innerHTML = "";




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
  if (name.length < 3) {
    cnameError.innerHTML = "**name must be at  3 characters**";
    return false;
  }

  cnameError.innerHTML = "";

  if (email === "") {
    cemailError.innerHTML = "**Please fill in your email**";
    return false;
  }
  email = email.charAt(0).toLowerCase() + email.slice(1);
  // if (
  //   email.indexOf("@") <= 0 ||
  //    (email.match(
  //       /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //     ))
  // ) {
  //   cemailError.innerHTML = "**Invalid email format**";
  //   return false;
  // }
  cemailError.innerHTML = "";

  if (subject === "") {
    csubjectError.innerHTML = "**Please fill the subject**";
    return false;
  }

  csubjectError.innerHTML = "";

  return true;
}


//checkout form//
function checkout() {
  var name = document.forms["checkoutForm"]["name"].value;
  var email = document.forms["checkoutForm"]["email"].value;
  var phone = document.forms["checkoutForm"]["phone"].value;
  var address = document.forms["checkoutForm"]["address"].value;
  var area = document.forms["checkoutForm"]["area"].value;
  var pincode = document.forms["checkoutForm"]["pincode"].value;
  var city = document.forms["checkoutForm"]["city"].value;


  var nameError = document.getElementById("nameAddress");
  var emailError = document.getElementById("emailAddress");
  var phoneError = document.getElementById("phoneAddress");
  var Address = document.getElementById("Address");
  var areaAddress = document.getElementById("areaAddress");
  var pinAddress = document.getElementById("pinAddress");
  var cityAddress = document.getElementById("cityAddress");



  if (name === "") {
    nameError.innerHTML = "**Please fill in your name**";
    return false;
  }
  if (name.length < 3) {
    nameError.innerHTML = "**name must be at  3 characters**";
    return false;
  }
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    nameError.innerHTML = "**Name must only contain letters**";
    return false;
  }


  nameError.innerHTML = "";

  if (phone === "") {
    phoneError.innerHTML = "**Please fill in your phone**";
    return false;
  }
  if (phone.length < 10) {
    phoneError.innerHTML = "**phone number must be at least 10 characters**";
    return false;
  }
  phoneError.innerHTML = "";

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



  if (address === "") {
    Address.innerHTML = "**Please fill in your Address**";
    return false;
  }
  if (address.length < 6) {
    Address.innerHTML = "**must be at least 6 characters**";
    return false;
  }
  Address.innerHTML = "";

  if (area === "") {
    areaAddress.innerHTML = "**Please fill in your Address**"
    return false;
  }
  areaAddress.innerHTML = "";

  if (pincode === "") {
    pinAddress.innerHTML = "**Please fill in your Pincode**";
    return false;
  }
  // if (pincode.length < 6) {
  //   pinAddress.innerHTML = "**must be at least 6 characters**";
  //   return false;
  // }
  if (!/^\d{6}$/.test(pincode)) {
    pinAddress.innerHTML = "**Pincode must  contain digits and 6 characters**";
    return false;
  }

  pinAddress.innerHTML = "";

  if (city === "") {
    cityAddress.innerHTML = "**Please fill in your city**";
    return false;
  }

  cityAddress.innerHTML = "";

  return true;
}


//payment select radio btn//
function paymentValidate() {
  var selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
  if (selectedPaymentMethod != null) {
    return true;
  } else {
    document.getElementById("paymenterror").style.display = "block";
    return false;
  }
}


//coupon//
function addcoupon() {

  var promoCode = document.forms["couponForm"]["promoCode"].value;
  var couponType = document.forms["couponForm"]["couponType"].value;
  var profit = document.forms["couponForm"]["profit"].value;
  var startDate = document.forms["couponForm"]["startDate"].value;
  var expDate = document.forms["couponForm"]["expDate"].value;

  var promoCodeError = document.getElementById("couponmsg");
  var couponTypeError = document.getElementById("couponmsg1");
  var profitError = document.getElementById("couponmsg2");
  var startDateError = document.getElementById("couponmsg3");
  var expDateError = document.getElementById("couponmsg4");


  if (promoCode === "") {
    promoCodeError.innerHTML = "**Please fill the required field**";
    return false;
  }
  if (promoCode.length < 3) {
    promoCodeError.innerHTML = "**code must be at  3 characters**";
    return false;
  }

  promoCodeError.innerHTML = "";

  if (couponType === "") {
    couponTypeError.innerHTML = "**Please fill the required field**";
    return false;
  }

  couponTypeError.innerHTML = "";

  if (profit === "") {
    profitError.innerHTML = "**Please fill the required field**";
    return false;
  }

  profitError.innerHTML = "";

  if (startDate === "") {
    startDateError.innerHTML = "**Please fill the required field**";
    return false;
  }

  startDateError.innerHTML = "";

  if (expDate === "") {
    expDateError.innerHTML = "**Please fill the required field**"
    return false;
  }
  expDateError.innerHTML = "";


  return true;

}


//edit profile//
function editprofile() {
  var name = document.forms["editform"]["name"].value;
  var email = document.forms["editform"]["email"].value;
  var phone = document.forms["editform"]["phone"].value;
  
  var nameError = document.getElementById("error");
  var emailError = document.getElementById("error1");
  var phoneError = document.getElementById("error2");
  

  if (name === "") {
    nameError.innerHTML = "**Please fill in your name**";
    return false;
  }
  const minLength = 3;
  const maxLength = 15;

  if (name.length < minLength) {
    nameError.innerHTML = `**Name must be at least ${minLength} characters**`;
    return false;
  }

  if (name.length > maxLength) {
    nameError.innerHTML = `**Name must be at most ${maxLength} characters**`;
    return false;
  }
  if (!/^[a-zA-Z]+$/.test(name)) {
    nameError.innerHTML = "**Name must only contain letters**";
    return false;
  }

  nameError.innerHTML = "";

  if (email === "") {
    emailError.innerHTML = "**Please fill in your email**";
    return false;
  }
  if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
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

  return true;
}

