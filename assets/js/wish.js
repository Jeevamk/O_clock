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
            if (response.status === 200) {
              Toastify({
                text: "Product Added Successfully...",
                className: "info",
                style: {
                  color :"white",
                  background :"black"
                  
                },
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
              }).showToast();
            }
          } else if (response.status === 304 ) {
            console.log(response.error);
            alert("Please Login and try again...")
            window.location.href = '/user';
          }
          else if (response.status === 400){
            Toastify({
              text: "Product is already in wishlist!!",
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: "top", 
              position: "right", 
              stopOnFocus: true, 
              style: {
                color :"red",
                background :"black",
                
              },  
          }).showToast();

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
      const CartProduct = {
        productId: productId,
        quantity: quantity,

      };

      fetch("/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(CartProduct),
      })
        .then(async(response) => {
          if (response.ok) {
            if (response.status === 200) {
              const message = await response.json()
              Toastify({
                text: message.msg,
                duration: 2500,
                className: "info",
                style: {
                  color :"white",
                  background :"black",
                  
                },
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
              }).showToast();
              
            }
          } else if (response.status === 304) {
            console.log(response.error);
            alert("Please Login and try again...")
            window.location.href = '/user';
          } else {
            console.log(response);
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



//add to cart from wishlist page//
document.addEventListener('DOMContentLoaded', () => {
  const wishToCart = document.querySelectorAll('.wishToCart');
  Array.from(wishToCart).forEach((button) => {
    button.addEventListener('click', async () => {
      const productId = button.getAttribute('data-product-id');

      const cartItem = {
        productId: productId,

      };

      await fetch('/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartItem)
      })
        .then(async(response) => {
          if (response.ok) {
            const message = await response.json()
            Toastify({
              text: message.msg,
              // className: "info",
              style: {
                color :"white",
                background :"black",
                
              },
              newWindow: true,
              close: true,
              gravity: "top",
              position: "right",
              stopOnFocus: true,
            }).showToast();
            
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



//buy now//

document.addEventListener("DOMContentLoaded", () => {
  const buynowProduct = document.getElementById("buyNow");
  if (buynowProduct) {
    buynowProduct.addEventListener("click", () => {
      const productId = buynowProduct.getAttribute("data-product-id");
      const quantity = document.getElementById('quantity').value;
      
      fetch(`/checkout/buynow/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({quantity}),
      })
        .then((response) => {
          if (response.ok) {
            window.location.href = '/checkout';
          } 
           else {
            console.error(
              "Error adding in buynow",
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
