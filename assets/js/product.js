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
            <label for="image">product image</label>
            <img src="${productdata.image}" alt="product image" style="max-width: 100px;">
            </div>
            <div class="mb-4 col-md-6">
            <label for="name">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter Name" 
                    name="name" value="${productdata.name}" readonly>
            </div>
            <div class="mb-4 col-md-6">
            <label for="price">price</label>
                <input type="number" class="form-control" id="price" 
                    name="price" value="${productdata.price}" readonly>
            </div>
            <div class="mb-4 col-md-12">
            <label for="description1">Description1</label>
                <input type="text" class="form-control" id="description1" 
                    name="description1" value="${productdata.description1}" readonly>
            </div>
            <div class="mb-4ccol-md-12">
            <label for="description2">Description2</label>
                <input type="text" class="form-control" id="description2" 
                    name="description2" value="${productdata.description2}" readonly>
            </div>
            
            <div class="mb-4 col-md-6">
            <label for="category">category</label>
                <input type="text" class="form-control" id="category" 
                    name="category" value="${productdata.category}" readonly>
            </div>
            <div class="mb-4 col-md-6">
            <label for="brand">brand</label>
                <input type="text" class="form-control" id="brand" 
                    name="brand" value="${productdata.brand}" readonly>
            </div>
            <div class="mb-4 col-md-6">
            <label for="reviews">reviews</label>
                <input type="number" class="form-control" id="reviews" 
                    name="reviews" value="${productdata.reviews}" readonly>
            </div>
            <div class="mb-4 col-md-6">
            <label for="color">color</label>
                <input type="text" class="form-control" id="color" 
                    name="color" value="${productdata.color}" readonly>
            </div>
            <div class="mb-4 col-md-6">
            <label for="gender">gender</label>
                <input type="text" class="form-control" id="gender" 
                    name="gender" value="${productdata.gender}" readonly>
            </div>
            <div class="mb-4 col-md-6">
            <label for="material">material</label>
                <input type="text" class="form-control" id="material" 
                    name="material" value="${productdata.material}" readonly>
            </div>
            <div class="mb-4 col-md-6">
            <label for="createdDate">createdDate</label>
                <input type="text" class="form-control" id="createdDate" 
                    name="createdDate" value="${productdata.createdDate}" readonly>
            </div>
            <div class="mb-4 col-md-6">
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
