const viewProduct = document.querySelectorAll(".view-product");

viewProduct.forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    const productId = await event.target.getAttribute("data-product-id");

    try {
      const response = await fetch(`/adminhome/products/${productId}`);
      if (response.ok) {
        const productdata = await response.json();

        const productData = document.getElementById("productbody");
        productData.innerHTML = ` <form id="productForm">
                <div class="mb-4">
            
            <img src="${productdata.images[0]}" alt="product image" style="max-width: 100px;" height="100px">
            <img src="${productdata.images[1]}" alt="product image" style="max-width: 100px;" height="100px">
            <img src="${productdata.images[2]}" alt="product image" style="max-width: 100px;" height="100px">
            <img src="${productdata.images[3]}" alt="product image" style="max-width: 100px;" height="100px">
            </div>
            <div class="mb-4 ">
            <label for="name">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter Name" 
                    name="name" value="${productdata.name}" readonly>
            </div>
            <div class="mb-4 ">
            <label for="price">price</label>
                <input type="number" class="form-control" id="price" 
                    name="price" value="${productdata.price}" readonly>
            </div>
            <div class="mb-4 ">
            <label for="description1">Description1</label>
                <input type="text" class="form-control" id="description1" 
                    name="description1" value="${productdata.description1}" readonly>
            </div>
            <div class="mb-4">
            <label for="description2">Description2</label>
                <input type="text" class="form-control" id="description2" 
                    name="description2" value="${productdata.description2}" readonly>
            </div>
            
            <div class="mb-4 ">
            <label for="category">category</label>
                <input type="text" class="form-control" id="category" 
                    name="category" value="${productdata.category}" readonly>
            </div>
            <div class="mb-4 ">
            <label for="brand">brand</label>
                <input type="text" class="form-control" id="brand" 
                    name="brand" value="${productdata.brand}" readonly>
            </div>
            <div class="mb-4 ">
            <label for="reviews">reviews</label>
                <input type="number" class="form-control" id="reviews" 
                    name="reviews" value="${productdata.reviews}" readonly>
            </div>
            <div class="mb-4 ">
            <label for="color">color</label>
                <input type="text" class="form-control" id="color" 
                    name="color" value="${productdata.color}" readonly>
            </div>
            <div class="mb-4 ">
            <label for="gender">gender</label>
                <input type="text" class="form-control" id="gender" 
                    name="gender" value="${productdata.gender}" readonly>
            </div>
            <div class="mb-4">
            <label for="material">material</label>
                <input type="text" class="form-control" id="material" 
                    name="material" value="${productdata.material}" readonly>
            </div>
            <div class="mb-4 ">
            <label for="createdDate">createdDate</label>
                <input type="text" class="form-control" id="createdDate" 
                    name="createdDate" value="${productdata.createdDate}" readonly>
            </div>
            <div class="mb-4 ">
            <label for="countStock">countStock</label>
                <input type="number" class="form-control" id="countStock" 
                    name="countStock" value="${productdata.countStock}" readonly>
            </div>
            
        </form>`;
        const showModal = new bootstrap.Modal(
          document.getElementById("productmodal")
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

//edit data//

const editproduct = document.querySelectorAll(".edit-product");

editproduct.forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    const productId = await event.target.getAttribute("data-product-id");

    try {
      const response = await fetch(`/adminhome/products/update/${productId}`);

      if (response.ok) {
        const productdata = await response.json();

        document.getElementById(
          "editproduct"
        ).innerHTML = ` <form id="updateproductForm">
                <input type="text" class="form-control" hidden value="${productdata._id}" name="id">
                <div class="mb-4">
            <label for="image">product image</label>
            <img src="${productdata.images[0]}" alt="product image" multiple style="max-width: 100px;">

            </div>
            <div class="mb-4 ">
            <label for="name">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter Name" 
                    name="name" value="${productdata.name}" >
            </div>
            <div class="mb-4 ">
            <label for="price">price</label>
                <input type="number" class="form-control" id="price" 
                    name="price" value="${productdata.price}" >
            </div>
            <div class="mb-4 ">
            <label for="description1">Description1</label>
                <input type="text" class="form-control" id="description1" 
                    name="description1" value="${productdata.description1}" >
            </div>
            <div class="mb-4">
            <label for="description2">Description2</label>
                <input type="text" class="form-control" id="description2" 
                    name="description2" value="${productdata.description2}" >
            </div>
            
            <div class="mb-4 ">
            <label for="category">category</label>
                <input type="text" class="form-control" id="category" 
                    name="category" value="${productdata.category}" >
            </div>
            <div class="mb-4 ">
            <label for="brand">brand</label>
                <input type="text" class="form-control" id="brand" 
                    name="brand" value="${productdata.brand}" >
            </div>
            <div class="mb-4 ">
            <label for="reviews">reviews</label>
                <input type="number" class="form-control" id="reviews" 
                    name="reviews" value="${productdata.reviews}" >
            </div>
            <div class="mb-4 ">
            <label for="color">color</label>
                <input type="text" class="form-control" id="color" 
                    name="color" value="${productdata.color}" >
            </div>
            <div class="mb-4 ">
            <label for="gender">gender</label>
                <input type="text" class="form-control" id="gender" 
                    name="gender" value="${productdata.gender}" >
            </div>
            <div class="mb-4">
            <label for="material">material</label>
                <input type="text" class="form-control" id="material" 
                    name="material" value="${productdata.material}" >
            </div>
            <div class="mb-4 ">
            <label for="createdDate">createdDate</label>
                <input type="text" class="form-control" id="createdDate" 
                    name="createdDate" value="${productdata.createdDate}" >
            </div>
            <div class="mb-4 ">
            <label for="countStock">countStock</label>
                <input type="number" class="form-control" id="countStock" 
                    name="countStock" value="${productdata.countStock}" >
            </div>
            <div class="mb-4 ">
            <button type="button" class="btn btn-dark"  onclick="productEdit()" id="productUpdateButton">Submit</button>

            </div>
            
        </form>`;
        const showModal = new bootstrap.Modal(
          document.getElementById("producteditmodal")
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

function productEdit() {
  const ProductEditedData = document.getElementById("updateproductForm");
  const myproductData = new FormData(ProductEditedData);

  fetch(`/adminhome/products/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(myproductData)),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/adminhome/products";
      }
      throw new Error("not ok");
    })

    .catch((error) => {
      console.log(error);
    });
}

//delete data//

// const productDelete = document.querySelectorAll(".delete-product");

// productDelete.forEach((btn) => {
//   btn.addEventListener("click", async (event) => {
//     const productId = await event.target.getAttribute("data-product-id");

//     try {
//       const response = await fetch(
//         `/adminhome/products/delete_product/${productId}`,
//         {
//           method: "DELETE",
//         }
//       );
//       if (response.ok) {
//         window.location.href = "/adminhome/products";
//       } else {
//         console.error("Error fetching user data:", error);
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   });
// });



//delete part view//

const productDelete = document.querySelectorAll(".delete-product");
productDelete.forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    const productId = await event.target.getAttribute("data-product-id");

    try {
      const response = await fetch(`/adminhome/products/delete_product/${productId}`)
      if (response.ok) {
        const productData = await response.json();
        document.getElementById("deletebody").innerHTML= `<div id="deletealert"><h5> Are you confirm to delete this product</h5> </div>
        <form id="deleteproductForm">
        <input type="text" class="form-control" hidden value="${productData._id}" name="id">
        <div class="col-sm-10">
        <button type="button" class="btn btn-dark"  onclick="deleteproduct()" id="deleteButton">yes</button>
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

function deleteproduct() {
  const productDeleteData = document.getElementById("deleteproductForm");
  const myDeleteData = new FormData(productDeleteData);

  fetch(`/adminhome/products/delete_product`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(myDeleteData)),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/adminhome/products";
      }
      throw new Error("not ok");
    })

    .catch((error) => {
      console.log(error);
    });
}
