//wish button//
document.addEventListener("DOMContentLoaded", () => {
  const addWishList = document.getElementById("addWishList");
  if (addWishList) {
    addWishList.addEventListener("click", () => {
      const productId = addWishList.getAttribute("data-product-id");
      const wishProduct = {
        productId: productId,
      };

      fetch("/wish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wishProduct),
      })
        .then((response) => {
          if (response.ok) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Product Added Succefully...",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            console.error(
              "Error adding product to wishlist:",
              response.statusText
            );
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    });
  }
});

//delete product from wishlist//

document.querySelectorAll(".deleteWishproduct").forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    const Idproduct = await event.target.getAttribute("data-user-id");

    try {
      const response = await fetch(`/wish/delete/${Idproduct}`);
      if (response.ok) {
        const productData = await response.json();
        document.getElementById(
          "wishDelete"
        ).innerHTML = `<div id="deletealert"><h5> Are you confirm to delete this product from wishlist </h5> </div>
              <form id="deleteProductData">
              <input type="text" class="form-control" hidden value="${productData._id}" name="id">
              <div class="col-sm-10">
              <button type="button" class="btn btn-dark"  onclick="deleteWish()" id="deleteButton">yes</button>
            </div>
            </form>
              `;

        // Show the modal
        const showModal = new bootstrap.Modal(
          document.getElementById("deleteWish")
        );
        showModal.show();
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});

function deleteWish() {
  const form = document.getElementById("deleteProductData");
  const formData = new FormData(form);
  fetch("/wish/delete", {
    method: "DELETE",
    body: JSON.stringify(Object.fromEntries(formData)),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      window.location.href = "/wish";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}



//cart button post from product detials page//
document.addEventListener("DOMContentLoaded", () => {
  const addCartList = document.getElementById("addCart");
  if (addCartList) {
    addCartList.addEventListener("click", () => {
      const productId = addCartList.getAttribute("data-product-id");
      const quantity = document.getElementById('quantity').value;
      console.log(quantity);
      const CartProduct = {
        productId: productId,
        quantity:quantity,
        
       
      };

      fetch("/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(CartProduct),
      })
        .then((response) => {
          if (response.ok) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Product Added to Cart",
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            console.error(
              "Error adding product to Cart:",
              response.statusText
            );
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    });
  }
});



//add to cart from wishlist page//
document.addEventListener('DOMContentLoaded',()=> {
  const wishToCart =document.querySelectorAll('.wishToCart');
  Array.from(wishToCart).forEach((button) => {
    button.addEventListener('click', async() => {
    const productId = button.getAttribute('data-product-id');

    const cartItem = {
      productId: productId,
      
      };

    await  fetch('/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartItem)
      })
      .then((response) => {
        if (response.ok) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product Added to Cart Succefully...",
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          console.error(
            "Error adding product to wishlist:",
            response.statusText
          );
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
      
    });
});
})