
function editAddress(addressId, name, phone, email, address, area, pincode, city, state, optionaladdress) {
  document.getElementById('addressId').value = addressId;
  document.getElementById('name').value = name;
  document.getElementById('phone').value = phone;
  document.getElementById('email').value = email;
  document.getElementById('address').value = address;
  document.getElementById('area').value = area;
  document.getElementById('pincode').value = pincode;
  document.getElementById('city').value = city;
  document.getElementById('state').value = state;
  document.getElementById('optionaladdress').value = optionaladdress;


}


//delete//

document.querySelectorAll(".deleteAddress").forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    const IdAddress = await event.target.getAttribute("data-address-id");

    try {
      const response = await fetch(`/checkout/delete/${IdAddress}`);
      if (response.ok) {
        const addressData = await response.json();
        document.getElementById(
          "addressDelete"
        ).innerHTML = `<div id="deletealert"><h5> Are you confirm to delete the Address </h5> </div>
                <form id="deleteAddressData">
                <input type="text" class="form-control" hidden value="${addressData._id}" name="id">
                <div class="col-sm-10">
                <button type="button" class="btn btn-dark"  onclick="deleteAddress()" id="deleteButton">yes</button>
              </div>
              </form>
                `;

        // Show the modal
        const showModal = new bootstrap.Modal(
          document.getElementById("deleteAddress")
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


function deleteAddress() {
  const form = document.getElementById("deleteAddressData");
  const formData = new FormData(form);
  fetch("/checkout/delete", {
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
      window.location.href = "/checkout";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}



document.querySelectorAll('.checkoutorder').forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    const addressId = await event.target.getAttribute("data-address-id");
    const couponCode= await event.target.getAttribute("couponId");
    console.log(addressId);
    const checkoutData = {
      addressId: addressId,
      couponCode
    };

    try {
      const response = await fetch('/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(checkoutData)
      });

      if (response.ok) {
        const data = await response.json(); 
        console.log("Success:", data); 
        window.location.href = `/payment/${data._id}`
      } 
    } catch (error) {
      console.error("Error:", error); 
    }
  });
});



//delete from user//

document.querySelectorAll(".dltAddress").forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    const IdAddress = await event.target.getAttribute("data-address-id");

    try {
      const response = await fetch(`/myaddress/delete/${IdAddress}`);
      if (response.ok) {
        const addressData = await response.json();
        document.getElementById(
          "addressDelete"
        ).innerHTML = `<div id="deletealert"><h5> Are you confirm to delete the Address </h5> </div>
                <form id="deleteAddressData">
                <input type="text" class="form-control" hidden value="${addressData._id}" name="id">
                <div class="col-sm-10">
                <button type="button" class="btn btn-dark"  onclick="dltAddress()" id="deleteButton">yes</button>
              </div>
              </form>
                `;

        // Show the modal
        const showModal = new bootstrap.Modal(
          document.getElementById("deleteAddress")
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


function dltAddress() {
  const form = document.getElementById("deleteAddressData");
  const formData = new FormData(form);
  fetch("/checkout/delete", {
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
      window.location.href = "/myaddress";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

 
//coupon//

async function applyCoupon() {
  const grandTotal = document.getElementById("grand").textContent;
  console.log("grandTotal",grandTotal);
  const promoCode = document.getElementById("promoCode").value;
  try{
    const response = await fetch(`/checkout/coupon/${promoCode}`);
    if (response.ok){
      const couponData = await response.json();
      console.log(couponData);
      let discount;
      let Total;
      discount = parseInt((grandTotal*couponData.profit)/100);
      Total = grandTotal-discount;
      console.log("Total",Total);
      document.getElementById("grand").innerHTML = Total;
      document.getElementById("discount").innerHTML = discount;
      document.getElementById("couponInput").style.display="none";
      const buttons = document.querySelectorAll('.checkoutorder');
      buttons.forEach(button => {
        button.setAttribute('couponId', couponData._id);
      });

    }

  }catch(error){

  }

}