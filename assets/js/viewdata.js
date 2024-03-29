// const viewButtons = document.querySelectorAll(".view-button");

// viewButtons.forEach((btn) => {
//   btn.addEventListener("click", async (event) => {
//     const userId = await event.target.getAttribute("data-user-id");

//     try {
//       const response = await fetch(`/adminhome/users/${userId}`);
//       if (response.ok) {
//         const userdata = await response.json();
//         const viewData = document.getElementById("viewbody");
//         viewData.innerHTML = ` <form id="viewForm">
//             <div class="mb-4">
//             <label for="user-name">Name</label>
//                 <input type="text" class="form-control" id="user-name" placeholder="Enter Name" 
//                     name="name" value="${userdata.name}" readonly>
//             </div>
//             <div class="mb-4">
//             <label for="user-email">Email Address</label>
//                 <input type="email" class="form-control" id="user-email" placeholder="Enter Email"
//                     name="email" value="${userdata.email}" readonly>
//             </div>
//             <div class="mb-4">
//             <label for="user-phone">Phone Number</label>
//                 <input type="text" class="form-control" id="user-phone" placeholder="Phone number"
//                     name="phone" value="${userdata.phone}" readonly>
//             </div>
//             <div class="mb-4">
//             <label for="user-status">Status</label>
//                 <input type="text" class="form-control" id="user-status" placeholder="status"
//                     name="status" value="${userdata.status}" readonly>
//             </div>
            
//         </form>`;
//         const showModal = new bootstrap.Modal(
//           document.getElementById("viewmodal")
//         );
//         showModal.show();
//       } else {
//         console.error("Error fetching user data:", error);
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   });
// });


//delete part view//

const deletebtn = document.querySelectorAll(".delete-button");
deletebtn.forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    const userId = await event.target.getAttribute("data-user-id");

    try {
      const response = await fetch(`/adminhome/users/delete_user/${userId}`)
      if (response.ok) {
        const userData = await response.json();
        document.getElementById("deletebody").innerHTML= `<div id="deletealert"><h5> Are you confirm to delete this account</h5> </div>
        <form id="deleteForm">
        <input type="text" class="form-control" hidden value="${userData._id}" name="id">
        <div class="col-sm-10">
        <button type="button" class="btn btn-dark"  onclick="deleteuser()" id="deleteButton">yes</button>
      </div>
      </form>
        `;
        const showModal = new bootstrap.Modal(
          document.getElementById("deletemodal")
        );
        showModal.show();

      }else {
        console.error("Error fetching user data:", error);
      }
    }catch (error) {
      console.error("Error fetching user data:", error);
    }
  })
})


//delete part//

function deleteuser() {
  const UserDeleteData = document.getElementById("deleteForm");
  const myDeleteData = new FormData(UserDeleteData);

  fetch(`/adminhome/users/delete_user`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(myDeleteData)),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/adminhome/users";
      }
      throw new Error("not ok");
    })

    .catch((error) => {
      console.log(error);
    });
}





//update status part//
//---------------view part--------------------//
const editButtons = document.querySelectorAll(".edit-button");

editButtons.forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    const userId = await event.target.getAttribute("data-user-id");

    try {
      const response = await fetch(`/adminhome/users/edit/${userId}`);
      if (response.ok) {
        const userdata = await response.json();
        document.getElementById(
          "editbody"
        ).innerHTML = `<form id="editstatusForm" >
<input type="text" class="form-control" hidden value="${userdata._id}" name="id">
<div class="form-group row">
  <label for="user-name" class="col-sm-2 col-form-label">Name</label>
  <div class="col-sm-10">
    <input type="text" class="form-control" id="user-name" placeholder="Enter Name" 
                        name="name" value="${userdata.name}" readonly>
  </div>
</div>
<div class="form-group row">
  <label for="user-email" class="col-sm-2 col-form-label">Email</label>
  <div class="col-sm-10">
    <input type="email" class="form-control" id="user-email" placeholder="Enter Email"
                         name="email" value="${userdata.email}" readonly>
  </div>
</div>
<div class="form-group row">
  <label for="user-phone" class="col-sm-2 col-form-label">Phone Number</label>
  <div class="col-sm-10">
    <input type="text" class="form-control" id="user-phone" placeholder="Phone number"
               name="phone" value="${userdata.phone}" readonly>
  </div>
</div>
<fieldset class="form-group">
  <div class="row">
    <legend class="col-form-label col-sm-2 pt-0">Status</legend>
    <div class="col-sm-10">
      <div class="form-check">
        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="Active" checked>
        <label class="form-check-label" for="gridRadios1">
          Active
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="Block">
        <label class="form-check-label" for="gridRadios2">
          Block
        </label>
      </div>
    </div>
  </div>
</fieldset>                     
  
<div class="form-group row">
  <div class="col-sm-10">
    <button type="button" class="btn btn-dark"  onclick="status()" id="statusUpdateButton">Submit</button>
  </div>
</div>
</form>`;
        const showModal = new bootstrap.Modal(
          document.getElementById("editmodal")
        );
        showModal.show();
      } else {
        console.error("Error fetching user data:", error);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  });
});



//update status//
function status() {
  const status = document.querySelector(
    'input[name="gridRadios"]:checked'
  ).value;
  const userId = document.querySelector('input[name="id"]').value;

  const request = new XMLHttpRequest();
  request.open("PUT", `/adminhome/users/edit/${userId}`);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify({ status }));

  request.onload = function () {
    if (request.status === 200) {
      window.location.href = "/adminhome/users";
    } else {
      console.error(err);
    }
  };
}
