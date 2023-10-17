function validateForm() {
    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const phoneInput = document.querySelector("#phone");
    const passwordInput = document.querySelector("#password");
  

    if (nameInput.value === "" || emailInput.value === "" || passwordInput.value === "" || phoneInput.value === "") {
      alert("Please fill in all the required fields.");
      return false;
    }

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(emailInput.value)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (phoneInput.value.length < 10) {
        alert("phone number must be at least 10 characters long.");
        return false;
      }
  

    if (passwordInput.value.length < 6) {
      alert("Password must be at least 6 characters long.");
      return false;
    }

    return true;
  }
