//view single banner//
const viewBanner = document.querySelectorAll(".view-banner");
viewBanner.forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    const bannerId = await event.target.getAttribute("data-banner-id");

    try {
      const response = await fetch(`/adminhome/banner/${bannerId}`);
      if (response.ok) {
        const bannerdata = await response.json();

        const bannerData = document.getElementById("bannerbody");
        bannerData.innerHTML = ` <form id="bannerForm">
                <div class="mb-4">
            <img src="${bannerdata.bannerImg}" alt="Brand Logo" style="max-width: 100px;">
            </div>
            <div class="mb-4">
            <label for="name">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter Name" 
                    name="name" value="${bannerdata.name}" readonly>
            </div>
            <div class="mb-4">
            <label for="description">Description</label>
                <input type="text" class="form-control" id="description" 
                    name="description" value="${bannerdata.description}" readonly>
            </div>
            <div class="mb-4">
            <label for="createdDate">created Date</label>
                <input type="text" class="form-control" id="createdDate" 
                    name="createdDate" value="${bannerdata.createdDate}" readonly>
            </div>
            <div class="mb-4">
            <label for="expireDate">expire Date</label>
                <input type="text" class="form-control" id="expireDate" 
                    name="expireDate" value="${bannerdata.expireDate}" readonly>
            </div>
            <div class="mb-4">
            <label for="status">status</label>
                <input type="text" class="form-control" id="status" 
                    name="status" value="${bannerdata.status}" readonly>
            </div>
            
            
        </form>`;
        const showModal = new bootstrap.Modal(
          document.getElementById("bannermodal")
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

//update view//
const editbanner = document.querySelectorAll(".edit-banner");

editbanner.forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    const bannerId = await event.target.getAttribute("data-banner-id");

    try {
      const response = await fetch(`/adminhome/banner/update/${bannerId}`);

      if (response.ok) {
        const bannerdata = await response.json();

        document.getElementById(
          "editbanner"
        ).innerHTML = `<form id="updatebannerForm" >
                <input type="text" class="form-control" hidden value="${bannerdata._id}" name="id">
                <div class="form-group row">
                    <img src="${bannerdata.bannerImg}" alt="Brand Logo" style="max-width: 100px;">
                    <div class="col-sm-10">
                    <input type="file" class="form-control" id="logo" name="logo" accept="image/*">
                    </div>
                    <div id="ContainerBanner">
                      <img id="croppedBanner" name="croppedBanner" src="#" alt="Cropped Banner">
                    </div>
                </div>
                <div class="form-group row">
                  <label for="name" class="col-sm-2 col-form-label">Name</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="name" 
                                        name="name" value="${bannerdata.name}" >
                  </div>
                </div>
                <div class="form-group row">
                  <label for="description" class="col-sm-2 col-form-label">Description</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="description" 
                                         name="description" value="${bannerdata.description}">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="createdDate" class="col-sm-2 col-form-label">created Date</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="createdDate" 
                                         name="createdDate" value="${bannerdata.createdDate}">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="expireDate" class="col-sm-2 col-form-label">expire Date</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="expireDate" 
                                         name="expireDate" value="${bannerdata.expireDate}">
                  </div>
                </div>
                <div class="form-group row">
                <div class="form-check">
                <input class="form-check-input" type="radio" name="status"
                    id="Enable" value="Enable" checked>
                <label class="form-check-label" for="Enable">
                    Enable
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="status"
                    id="Disable" value="Disable" >
                <label class="form-check-label" for="Disable">
                    Disable
                </label>
            </div>
                </div>

                          
                <div class="form-group row">
                  <div class="col-sm-10">
                    <button type="button" class="btn btn-dark"  onclick="bannerEdit()" id="bannerUpdateButton">Submit</button>
                  </div>
                </div>
                </form>`;
        const showModal = new bootstrap.Modal(
          document.getElementById("bannereditmodal")
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

//put method//

function bannerEdit() {
    const BannerEditedData = document.getElementById("updatebannerForm");
    const myBannerData = new FormData(BannerEditedData);
    console.log(Object.fromEntries(myBannerData));
  
    fetch(`/adminhome/banner/update`, {
      method: "PUT",
  
      body: myBannerData,
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "/adminhome/banner";
        }
        throw new Error("not ok");
      })
  
      .catch((error) => {
        console.log(error);
      });
  }
  

//delete part view//
const deletebannerbutton = document.querySelectorAll(".delete-banner");
deletebannerbutton.forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    const bannerId = await event.target.getAttribute("data-banner-id");

    try {
      const response = await fetch(`/adminhome/banner/delete_banner/${bannerId}`);
      if (response.ok) {
        const bannerData = await response.json();
        document.getElementById(
          "deletebody"
        ).innerHTML = `<div id="deletealert"><h5> Are you confirm to delete this banner </h5> </div>
        <form id="deletebannerForm">
        <input type="text" class="form-control" hidden value="${bannerData._id}" name="id">
        <div class="col-sm-10">
        <button type="button" class="btn btn-dark"  onclick="deletebanner()" id="deleteButton">yes</button>
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
    }
  });
});

//delete part//
function deletebanner() {
    const bannerDeleteData = document.getElementById("deletebannerForm");
    const myDeleteData = new FormData(bannerDeleteData);
  
    fetch(`/adminhome/banner/delete_banner`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(myDeleteData)),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "/adminhome/banner";
        }
        throw new Error("not ok");
      })
  
      .catch((error) => {
        console.log(error);
      });
  }