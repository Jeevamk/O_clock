
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



//update quantity button//
function updateQuantity(id,changeQty) {

  const quantityInput = document.querySelector(`.quantity[data-cart-id="${id}"]`);
  const priceElement = document.querySelector(`.price[data-cart-id="${id}"]`);
  const netPriceElement = document.querySelector(`.netprice[data-cart-id="${id}"]`);
  const totalPrice = document.getElementById('totalPrice');
  const discount = document.getElementById('discount');
  const Total = document.getElementById('total');
  const countStock = document.querySelector(`.stock[data-cart-id="${id}"]`).value;
  console.log("countstock",countStock)


  if (quantityInput) {
    let newQuantity = parseInt(quantityInput.value) + changeQty;
    newQuantity = Math.max(0, Math.min(4, newQuantity));
    
  
    if (newQuantity <= 0) {
      return;
    }else if(newQuantity === 4){
      Toastify({
        text: "Quantity limit reached (3 pcs).",
        duration: 1000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
            background: "black",
        },
    }).showToast();
    return;  
    }else if(newQuantity > countStock){
      Toastify({
        text: `Only ${countStock} products are available in stock`,
        duration: 1000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
            background: "black",
        },
    }).showToast();
    return
    }


    quantityInput.value = newQuantity;
    let price = parseFloat(priceElement.textContent.replace('/-', ''));

    let netPrice = parseInt(newQuantity * price);
    netPriceElement.textContent = netPrice;

    let netPrices = document.querySelectorAll('.netprice');
    let totalsum = 0;
    netPrices.forEach((netPriceElement) => {
      totalsum += parseFloat(netPriceElement.textContent);
    });

    totalPrice.textContent = totalsum;
    let grandTotal = parseFloat(totalPrice.textContent) - parseFloat(discount.textContent);
    Total.textContent = grandTotal;
    document.getElementById("checkoutvalue").value = grandTotal

    const minusButton = document.getElementById(`minusButton${id}`);
    if (newQuantity <= 1) {
        minusButton.style.display = 'none';
    } else {
        minusButton.style.display = 'inline-block'; 
    }



    fetch('/cart/updateQuantity', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId: id, newQuantity }),
    })

  }
  
}




document.addEventListener('DOMContentLoaded', () => {
  const cartLength = (document.getElementById('cartlength').textContent)
  const quantityItems = document.querySelectorAll('.quantity');
  const priceItems = document.querySelectorAll('.price');
  const netPriceItems = document.querySelectorAll('.netPrice');
  for (let i = 0; i < cartLength; i++) {
    let price = parseFloat(priceItems[i].textContent)
    let quantity = parseInt(quantityItems[i].value)
    netPriceItems[i].textContent = price * quantity || 0;

  }
  let totalsum = 0;
  for (i = 0; i < cartLength; i++) {
    let totalSum = parseFloat(netPriceItems[i].textContent)
    totalsum = totalsum + totalSum || 0;
  }
  const totalPrice = document.getElementById('totalPrice')
  totalPrice.textContent = totalsum;
  const discount = document.getElementById('discount')
  const Total = document.getElementById('total')
  let grandTotal = parseInt(totalPrice.textContent) - parseInt(discount.textContent)
  Total.textContent = grandTotal
  document.getElementById("checkoutvalue").value = grandTotal


});