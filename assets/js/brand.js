const viewBrand = document.querySelectorAll(".view-brand");
viewBrand.forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    const brandId = await event.target.getAttribute("data-brand-id");

    try {
      const response = await fetch(`/adminhome/brands/${brandId}`);
      if (response.ok) {
        const branddata = await response.json();

        const brandData = document.getElementById("brandbody");
        brandData.innerHTML = ` <form id="brandForm">
                <div class="mb-4">
            <img src="${branddata.logo}" alt="Brand Logo" style="max-width: 100px;">
            </div>
            <div class="mb-4">
            <label for="name">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter Name" 
                    name="name" value="${branddata.name}" readonly>
            </div>
            <div class="mb-4">
            <label for="description">Description</label>
                <input type="text" class="form-control" id="description" 
                    name="description" value="${branddata.description}" readonly>
            </div>
            
            
        </form>`;
        const showModal = new bootstrap.Modal(
          document.getElementById("brandmodal")
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

const editbrand = document.querySelectorAll(".edit-brand");

editbrand.forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    const brandId = await event.target.getAttribute("data-brand-id");

    try {
      const response = await fetch(`/adminhome/brands/update/${brandId}`);

      if (response.ok) {
        const branddata = await response.json();

        document.getElementById(
          "editbrand"
        ).innerHTML = `<form id="updatebrandForm" >
                <input type="text" class="form-control" hidden value="${branddata._id}" name="id">
                <div class="form-group row">
                    <img src="${branddata.logo}" alt="Brand Logo" style="max-width: 100px;">
                    <div class="col-sm-10">
                    <input type="file" class="form-control" id="editlogo" name="editlogo" accept="image/*"  >
                    <img id="croppededitlogo" name="croppededitlogo" hidden src="#"  alt="Cropped Logo">

                    </div>
                </div>
                <div class="form-group row">
                  <label for="name" class="col-sm-2 col-form-label">Name</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="name" 
                                        name="name" value="${branddata.name}" >
                  </div>
                </div>
                <div class="form-group row">
                  <label for="description" class="col-sm-2 col-form-label">Description</label>
                  <div class="col-sm-10">
                    <input type="description" class="form-control" id="description" 
                                         name="description" value="${branddata.description}">
                  </div>
                </div>
                          
                <div class="form-group row">
                  <div class="col-sm-10">
                    <button type="button" class="btn btn-dark"  onclick="brandEdit()" id="brandUpdateButton">Submit</button>
                  </div>
                </div>
                </form>`;
        const showModal = new bootstrap.Modal(
          document.getElementById("brandeditmodal")
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

function brandEdit() {
  const BrandEditedData = document.getElementById("updatebrandForm");
  const myBrandData = new FormData(BrandEditedData);
  console.log(Object.fromEntries(myBrandData));
  

  fetch(`/adminhome/brands/update`, {
    method: "PUT",

    body: myBrandData,
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/adminhome/brands";
      }
      throw new Error("not ok");
    })

    .catch((error) => {
      console.log(error);
    });
}

//delete part view//

const deletebutton = document.querySelectorAll(".delete-brand");
deletebutton.forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    const brandId = await event.target.getAttribute("data-brand-id");

    try {
      const response = await fetch(`/adminhome/brands/delete_brand/${brandId}`);
      if (response.ok) {
        const brandData = await response.json();
        document.getElementById(
          "deletebody"
        ).innerHTML = `<div id="deletealert"><h5> Are you confirm to delete this brand </h5> </div>
        <form id="deletebrandForm">
        <input type="text" class="form-control" hidden value="${brandData._id}" name="id">
        <div class="col-sm-10">
        <button type="button" class="btn btn-dark"  onclick="deletebrand()" id="deleteButton">yes</button>
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

function deletebrand() {
  const brandDeleteData = document.getElementById("deletebrandForm");
  const myDeleteData = new FormData(brandDeleteData);

  fetch(`/adminhome/brands/delete_brand`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(myDeleteData)),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/adminhome/brands";
      }
      throw new Error("not ok");
    })

    .catch((error) => {
      console.log(error);
    });
}
