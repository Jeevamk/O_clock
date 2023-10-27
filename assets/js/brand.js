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
             

            <label for="logo">Brand Logo</label>
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

//delete data//

const brandDelete = document.querySelectorAll(".delete-brand");

brandDelete.forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    const brandId = await event.target.getAttribute("data-brand-id");

    try {
      const response = await fetch(
        `/adminhome/brands/delete_brand/${brandId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        window.location.href = "/adminhome/brands";
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
                    <input type="file" class="form-control" id="logo" name="logo" accept="image/*">
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

  fetch(`/adminhome/brands/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(myBrandData)),
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
