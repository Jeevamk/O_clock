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
                <input type="hidden" name="_id" value="${orderdata._id}">
                    <label for="orderStatus">order Status</label>
                    <select id="orderStatus" name="orderStatus">
                    <option>Order placed</option>
                    <option>Shipped </option>
                    <option>Out for delivery</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                    </select>
                        
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
    fetch("/adminhome/order/update", {
      method: "PUT",
      body: JSON.stringify(Object.fromEntries(myOrderData)),
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
        window.location.href = "/adminhome/order";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }


//cancel//
const cancelorder = document.getElementById("cancel");
  cancelorder.addEventListener("click", async (event) => {
        const orderId = await event.target.getAttribute("data-order-id");

        try {
            const response = await fetch(`/orderSummary/cancel/${orderId}`);

            if (response.ok) {
                const orderdata = await response.json();

                document.getElementById(
                    "cancelorder"
                ).innerHTML = `<form id="cancelorderForm" >
                <input type="hidden" name="_id" value="${orderdata._id}">
                    <label for="cancelreason">Reason for Cancellation</label>
                    <select id="cancelreason" name="cancelreason">
                    <option>Bad product</option>
                    <option>Bad service </option>
                    
                    </select>
                        
                <div class="form-group row">
                  <div class="col-sm-10">
                    <button type="button" class="btn btn-dark"  onclick="ordercancel()" id="ordercancelButton">Submit</button>
                  </div>
                </div>
                </form>`;
                const showModal = new bootstrap.Modal(
                    document.getElementById("ordercancelmodal")
                );
                showModal.show();
            } else {
                console.error("Error fetching user data:", error);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    });


function ordercancel() {
    const ordercancelData = document.getElementById("cancelorderForm");
    const myOrderData = new FormData(ordercancelData);
    fetch("/orderSummary/cancel", {
      method: "PUT",
      body: JSON.stringify(Object.fromEntries(myOrderData)),
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
        window.location.reload('/')
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }


//delete after cancellation//
const deletebtn = document.getElementById("deleteord");

deletebtn.addEventListener("click", async (event) => {
        const orderId = await event.target.getAttribute("data-order-id");

        try {
            const response = await fetch(`/orderSummary/deleteorder/${orderId}`);
            if (response.ok) {
                const orderData = await response.json();
                document.getElementById(
                    "deleteord"
                ).innerHTML = `<div id="deletealt"><h5> Are you confirm to delete this Order </h5> </div>
        <form id="deleteordForm">
        <input type="text" class="form-control" hidden value="${orderData._id}" name="id">
        <div class="col-sm-10">
        <button type="button" class="btn btn-dark"  onclick="deleteord()" id="deleteButton">yes</button>
      </div>
      </form>
        `;
                const showModal = new bootstrap.Modal(
                    document.getElementById("deleteorder")
                );
                showModal.show();
            } else {
                console.error("Error fetching user data:", error);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    });


//delete part//

function deleteord() {
    const DeleteData = document.getElementById("deleteordForm");
    const myDltData = new FormData(DeleteData);

    fetch(`/orderSummary/deleteorder`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(myDltData)),
    })
        .then((response) => {
            if (response.ok) {
                window.location.href = "/orderSummary";
            }
            throw new Error("not ok");
        })

        .catch((error) => {
            console.log(error);
        });
}