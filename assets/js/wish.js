document.addEventListener('DOMContentLoaded', () => {
    const addWishList = document.getElementById('addWishList');
    if(addWishList){
        addWishList.addEventListener('click', () => {
        const productId = addWishList.getAttribute('data-product-id');
        const wishProduct = {
            productId: productId,
          };
    
          fetch('/wish', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(wishProduct)
          })
        //   .then(response => {
        //     if (response.ok) {
        //         alert("Product add Succefully")
        //     } else {
        //       console.error('Error adding product to wishlist:', response.statusText);
        //     }
        //   })
        //   .catch(error => {
        //     console.error('Fetch error:', error);
        //   });
        });
    }
  
    });


//delete product from wishlist//
const deletebutton = document.querySelectorAll(".deleteWishproduct");
deletebutton.forEach((btn) => {
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
        const showModal = new bootstrap.Modal(
          document.getElementById("deleteWish")
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



function deleteWish() {
    const DeleteData = document.getElementById("deleteProductData");
    const myDeleteData = new FormData(DeleteData);
  
    fetch(`/wish/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(myDeleteData)),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "/wish";
        }
        throw new Error("not ok");
      })
  
      .catch((error) => {
        console.log(error);
      });
  }