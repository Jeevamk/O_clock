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

//  function validateForm() {
//   var correct_way=/^[A-Z a-z]+$/;
//     var a =document.getElementById("name").value;
//     if (a=="") {
//         document.getElementById ("error").innerHTML="**please fill user name";
//         return false;
//     }
//     if (a.length<3) {
//         document.getElementById ("error").innerHTML="**User name must have be 3 characters";
//         return false;
//     }
//     if (a.length>20) {
//         document.getElementById ("error").innerHTML="**User name must have be less than 20 characters";
//         return false;
//     }
//     if (a.match (correct_way)) {
//         true;
//     }
//         else{
//             document.getElementById ("error").innerHTML="**only alpabets are allowed";
//             return false;
//         }
//         aError.innerHTML = "";

//     var b =document.myform.email.value;
//     if (b=="") {
//         document.getElementById ("error1").innerHTML="**please fill email";
//         return false;
//     }
//     if (b.indexOf ('@')<=0) {
//         document.getElementById("error1").innerHTML="**invalid @ position";
//         return false;
//     }
//     if ((b.charAt(b.length-4)!='.') && (b.charAt(b.length)!='.')) {
//         document.getElementById("error1").innerHTML="**invalid position at 3 & 4";
//         return false;
//     }

//     var c=document.myform.phone.value;

//     if (c=="") {
//         document.getElementById ("error2").innerHTML="**Please fill the mobile number"
//         return false;
//     }
//     if (isNaN(c)) {
//         document.getElementById("error2").innerHTML="**only numbers allowed";
//         return false;
//     }
//     if (c.length <10 ) {
//         document.getElementById ("error2").innerHTML="**mobile numbers must be 10 digits";
//         return false;

//     }

//     var d=document.myform.password.value;
//     if (d=="") {
//       document.getElementById ("error3").innerHTML="**Please fill the password"
//       return false;
//     }

//     if (d.length <6 ) {
//       document.getElementById ("error3").innerHTML="**password must be 6 numbers";
//       return false;

//   }

//   return true;

//  }

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
