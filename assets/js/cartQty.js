//quantity button//
// document.addEventListener('DOMContentLoaded', () => {
//     const quantityItems = document.querySelectorAll('.quantity');
//     const buttonAdds = document.querySelectorAll('.buttonadd');
//     const buttonSubs = document.querySelectorAll('.buttonsub');

//     buttonAdds.forEach((buttonAdd, index) => {
//         buttonAdd.addEventListener('click', () => {
//             quantityItems[index].value = parseInt(quantityItems[index].value, 10) ;
//         });
//     });

//     buttonSubs.forEach((buttonSub, index) => {
//         buttonSub.addEventListener('click', () => {
//             quantityItems[index].value = Math.max(1, parseInt(quantityItems[index].value, 10) - 1);
//         });
//     });
// });


//delete product from cart//
const deleteCart = document.querySelectorAll(".deleteCartProduct");
deleteCart.forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    const Idproduct = await event.target.getAttribute("data-user-id");

    try {
      const response = await fetch(`/cart/delete/${Idproduct}`);
      if (response.ok) {
        const productData = await response.json();
        document.getElementById(
          "cartDelete"
        ).innerHTML = `<div id="deletealert"><h5> Are you confirm to delete this product from Cart</h5> </div>
        <form id="deleteProductData">
        <input type="text" class="form-control" hidden value="${productData._id}" name="id">
        <div class="col-sm-10">
        <button type="button" class="btn btn-dark"  onclick="deletecart()" id="deleteButton">yes</button>
      </div>
      </form>
        `;
        const showModal = new bootstrap.Modal(
          document.getElementById("deleteCart")
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


function deletecart() {
    const DeleteData = document.getElementById("deleteProductData");
    const myDeleteData = new FormData(DeleteData);
  
    fetch(`/cart/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(myDeleteData)),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "/cart";
        }
        throw new Error("not ok");
      })
  
      .catch((error) => {
        console.log(error);
      });
  }
  

//update quantity//
function updateQuantity(id, changeQty) {

  const quantityInput = document.querySelector(`.quantity[data-cart-id="${id}"]`);

  const priceElement = document.querySelector(`.price[data-cart-id="${id}"]`);

  const netPriceElement = document.querySelectorAll(`.netprice[data-cart-id="${id}"]`);

  if (quantityInput) {
    let newQuantity = parseInt(quantityInput.value) + changeQty;
    newQuantity = Math.max(0, newQuantity);
    
    if (newQuantity <=0 ){
      return;
    }

    // if (newQuantity > countStock) {
    //   alert(`Sorry, only ${countStock} items are available.`);
    //   return;
    // }


    quantityInput.value = newQuantity;
    let price = parseFloat(priceElement.textContent.replace('/-', ''));

    let netPrice = newQuantity * price;
    console.log("dfusdhfu",netPrice);

    netPriceElement.textContent = netPrice.toFixed(2);

    fetch('/cart/updateQuantity', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId: id, newQuantity }),
    })

  }
  
  
}

