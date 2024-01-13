

async function func() {
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

// function change() {
//   const passchange = document.getElementById("changepassword");
//   const changedata = new FormData(passchange);
//   console.log(changedata);
//   fetch('/password-change', {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(Object.fromEntries(changedata)),
//   })
//     .then((response) => {
//       if (response.ok) {
//         alert("Password updated successfully");
//         return window.location.href = "/user"
//       } else if(response.message==400) {
//         alert("New password and confirm password do not match");

//       } else if(response.message == 401) {
//         alert("Current password is incorrect")
//       }else{
//         alert("Password change failed")
//       }
//       // throw new Error("not ok");
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }


function change() {
  const passchange = document.getElementById("changepassword");
  const changedata = new FormData(passchange);

  fetch('/password-change', {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(changedata)),
  })
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        alert("Password updated successfully");
        window.location.href = "/user";
      } else if (response.status === 400) {
        alert("New password and confirm password do not match");
      } else if (response.status === 401) {
        alert("Current password is incorrect");
      } else {
        alert("Password change failed");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}


//delete user//
async function deleteuser(){
  try {
    const response = await fetch(`/delete`);
    if (response.ok) {
      const userId = await response.json();

      document.getElementById(
        "deletebody"
      ).innerHTML = `<div id="deletealert"><h5> Are you sure to delete this Account......</h5> 
       <p>It will delete the all details</p>
      </div>
      <form id="deleteUsr">
      <div class="col-sm-10">
      <button type="button" class="btn btn-dark"  onclick="deleteUser()" id="deleteBtn">yes</button>
    </div>
    </form>
      `;
      const showModal = new bootstrap.Modal(
        document.getElementById("deletemodal")
      );
      showModal.show();
    } else {
      console.error("Error fetching user data:", error);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }}


  async function deleteUser() {
    await fetch("/delete", {
      method: "DELETE",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      window.location.href = "/user"
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }