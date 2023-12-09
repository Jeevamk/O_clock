//delete//
const deletebutton = document.querySelectorAll(".delete-order");
deletebutton.forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    const orderId = await event.target.getAttribute("data-order-id");

    try {
      const response = await fetch(`/adminhome/order/delete_order/${orderId}`);
      if (response.ok) {
        const orderData = await response.json();
        document.getElementById(
          "deletebody"
        ).innerHTML = `<div id="deletealert"><h5> Are you confirm to delete this Order </h5> </div>
        <form id="deleteorderForm">
        <input type="text" class="form-control" hidden value="${orderData._id}" name="id">
        <div class="col-sm-10">
        <button type="button" class="btn btn-dark"  onclick="deleteorder()" id="deleteButton">yes</button>
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

function deleteorder() {
  const orderDeleteData = document.getElementById("deleteorderForm");
  const myDeleteData = new FormData(orderDeleteData);

  fetch(`/adminhome/order/delete_order`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(myDeleteData)),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/adminhome/order";
      }
      throw new Error("not ok");
    })

    .catch((error) => {
      console.log(error);
    });
}


//update orderstatus//
const editorder = document.querySelectorAll(".edit-order");

editorder.forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    const orderId = await event.target.getAttribute("data-order-id");

    try {
      const response = await fetch(`/adminhome/order/update/${orderId}`);

      if (response.ok) {
        const orderdata = await response.json();

        document.getElementById(
          "editorder"
        ).innerHTML = `<form id="updateorderForm" >
                <input type="text" class="form-control" hidden value="${orderdata._id}" name="id">
            
                <div class="form-group row">
                  <label for="description" class="col-sm-2 col-form-label">Status</label>
                  <div class="col-sm-10">
                    <input type="description" class="form-control" id="orderStatus" 
                                         name="orderStatus" value="${orderdata.orderStatus}">
                  </div>
                </div>
                          
                <div class="form-group row">
                  <div class="col-sm-10">
                    <button type="button" class="btn btn-dark"  onclick="orderEdit()" id="orderUpdateButton">Submit</button>
                  </div>
                </div>
                </form>`;
        const showModal = new bootstrap.Modal(
          document.getElementById("ordereditmodal")
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


function orderEdit() {
    const orderEditedData = document.getElementById("updateorderForm");
    const myOrderData = new FormData(orderEditedData);
    console.log(Object.fromEntries(myOrderData));
    
  
    fetch(`/adminhome/order/update`, {
      method: "PUT",
  
      body: myOrderData,
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "/adminhome/order";
        }
        throw new Error("not ok");
      })
  
      .catch((error) => {
        console.log(error);
      });
  }
  