const viewCoupon = document.querySelectorAll(".view-coupon");

viewCoupon.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
        const couponId = await event.target.getAttribute("data-coupon-id");

        try {
            const response = await fetch(`/adminhome/coupon/${couponId}`);
            if (response.ok) {
                const coupondata = await response.json();

                const viewData = document.getElementById("couponbody");
                viewData.innerHTML = ` <form id="couponForm">
        <div class="form-group">
        <label for="promoCode">Promo Code</label>
        <input type="text" class="form-control" id="promoCode" placeholder="Promo Code"
            name="promoCode" style="border: 1px solid black;" value="${coupondata.promoCode}" readonly>
    </div>
    <div class="form-group">
        <label for="couponType" class="form-label">coupon Type</label><br>
        <input type="text" id="couponType" name="couponType" class="form-control" style="border: 1px solid black;" value="${coupondata.couponType}" readonly>

        
    </div>

    <div class="form-group">
        <label for="profit">Coupon profit</label><br>
        <input type="text" id="profit" name="profit" class="form-control" style="border: 1px solid black;" value="${coupondata.profit}" readonly>
    </div>

    <div class="form-group">
        <label for="startDate">startDate</label><br>
        <input type="text" id="startDate" name="startDate" class="form-control" style="border: 1px solid black;" value="${coupondata.startDate}" readonly>
    </div>

    <div class="form-group">
        <label for="expDate">Expire Date</label><br>
        <input type="text" id="expDate" name="expDate" class="form-control" style="border: 1px solid black;" value="${coupondata.expDate}" readonly>
    </div>
            
            
        </form>`;
                const showModal = new bootstrap.Modal(
                    document.getElementById("couponmodal")
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

//edit view part//
const editcoupon = document.querySelectorAll(".edit-coupon");
editcoupon.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
        const couponId = await event.target.getAttribute("data-coupon-id");

        try {
            const response = await fetch(`/adminhome/coupon/update/${couponId}`);

            if (response.ok) {
                const coupondata = await response.json();

                document.getElementById(
                    "editcoupon"
                ).innerHTML = `<form id="updatecouponForm" >
                <input type="text" class="form-control" hidden value="${coupondata._id}" name="id">
                                    <div class="form-group">
                                        <label for="promoCode">Promo Code</label>
                                        <input type="text" class="form-control" id="promoCode" placeholder="Promo Code"
                                            name="promoCode" style="border: 1px solid black;" value="${coupondata.promoCode}">
                                    </div>
                                    <div class="form-group">
                                        <label for="couponType" class="form-label">coupon Type</label><br>
                                        <select id="couponType" class="form-select form-control" name="couponType" style="border: 1px solid black; width:100%" >
                                            <option selected>%</option>
                                            
                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label for="profit">Coupon profit</label><br>
                                        <input type="text" id="profit" name="profit" class="form-control" style="border: 1px solid black;" value="${coupondata.profit}">
                                    </div>

                                    <div class="form-group">
                                        <label for="startDate">startDate</label><br>
                                        <input type="date" id="startDate" name="startDate" class="form-control" style="border: 1px solid black;" value="${coupondata.startDate}">
                                    </div>

                                    <div class="form-group">
                                        <label for="expDate">Expire Date</label><br>
                                        <input type="date" id="expDate" name="expDate" class="form-control" style="border: 1px solid black;" value="${coupondata.expDate}">
                                    </div>

                                    <button type="button"  class="btn btn-dark" onclick="couponEdit()">Submit</button>
                                    </form>`;
                                const showModal = new bootstrap.Modal(
                                document.getElementById("couponeditmodal")
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


//edit function//

function couponEdit() {
    const couponEditedData = document.getElementById("updatecouponForm");
    const couponData = new FormData(couponEditedData);
    console.log(Object.fromEntries(couponData));


    fetch(`/adminhome/coupon/update`, {
        method: "PUT",

        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(couponData)),
    })
        .then((response) => {
            if (response.ok) {
                window.location.href = "/adminhome/coupon";
            }
            throw new Error("not ok");
        })

        .catch((error) => {
            console.log(error);
        });
}



//delete part view//

const deletebutton = document.querySelectorAll(".delete-coupon");
deletebutton.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
        const couponId = await event.target.getAttribute("data-coupon-id");

        try {
            const response = await fetch(`/adminhome/coupon/delete_coupon/${couponId}`);
            if (response.ok) {
                const couponData = await response.json();
                document.getElementById(
                    "deletebody"
                ).innerHTML = `<div id="deletealert"><h5> Are you confirm to delete this Coupon </h5> </div>
        <form id="deletecouponForm">
        <input type="text" class="form-control" hidden value="${couponData._id}" name="id">
        <div class="col-sm-10">
        <button type="button" class="btn btn-dark"  onclick="deletecoupon()" id="deleteButton">yes</button>
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

function deletecoupon() {
    const couponDeleteData = document.getElementById("deletecouponForm");
    const myDeleteData = new FormData(couponDeleteData);

    fetch(`/adminhome/coupon/delete_coupon`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(myDeleteData)),
    })
        .then((response) => {
            if (response.ok) {
                window.location.href = "/adminhome/coupon";
            }
            throw new Error("not ok");
        })

        .catch((error) => {
            console.log(error);
        });
}