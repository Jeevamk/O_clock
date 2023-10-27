function func() {
  const UserData = document.getElementById("editForm");
  const myeditData = new FormData(UserData);
  fetch("/edit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(myeditData)),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("not ok");
    })
    .then((data) => {
      if (document.cookie.includes("editToken")) {
        window.location.href = "/profile";
      }
    })

    .catch((error) => {
      console.log(error);
    });
}

//change password//

function change() {
  const passchange = document.getElementById("changepassword");
  const changedata = new FormData(passchange);
  console.log(changedata);
  fetch('/password-change', {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(changedata)),
  })
    .then((response) => {
      if (response.ok) {
        return window.location.href = "/user"
      }
      throw new Error("not ok");
    })
    .catch((error) => {
      console.log(error);
    });
}
