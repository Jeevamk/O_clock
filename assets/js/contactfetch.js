const viewContact = document.querySelectorAll(".view-contact");

viewContact.forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    const contactId = await event.target.getAttribute("data-contact-id");

    try {
      const response = await fetch(`/adminhome/contact/${contactId}`);
      if (response.ok) {
        const contactdata = await response.json();
        const viewContactData = document.getElementById("contactviewbody");
        viewContactData.innerHTML = ` <form id="viewcontactForm">
            <div class="mb-4">
            <label for="name">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter Name" 
                    name="name" value="${contactdata.name}" readonly>
            </div>
            <div class="mb-4">
            <label for="email">Email Address</label>
                <input type="email" class="form-control" id="email" placeholder="Enter Email"
                    name="email" value="${contactdata.email}" readonly>
            </div>
            <div class="mb-4">
            <label for="subject">Subject</label>
                <input type="text" class="form-control" id="user-phone" placeholder="subject"
                    name="subject" value="${contactdata.subject}" readonly>
            </div>
            <div class="mb-4">
            <label for="message">Message</label>
                <input type="text" class="form-control" id="message" placeholder="message"
                    name="message" value="${contactdata.message}" readonly>
            </div>
            
        </form>`;
        const showModal = new bootstrap.Modal(
          document.getElementById("contactviewmodal")
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


//delete//

const deletecontactbtn = document.querySelectorAll(".delete-contact");
deletecontactbtn.forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    const contactId = await event.target.getAttribute("data-contact-id");

    try {
      const response = await fetch(`/adminhome/contact/delete_message/${contactId}`)
      if (response.ok) {
        const contactdata = await response.json();
        document.getElementById("deletecontactbody").innerHTML= `<div id="deletealert"><h5> Are you confirm to delete this Message Details</h5> </div>
        <form id="deletecontactForm">
        <input type="text" class="form-control" hidden value="${contactdata._id}" name="id">
        <div class="col-sm-10">
        <button type="button" class="btn btn-dark"  onclick="deletecontact()" id="deletecontactButton">yes</button>
      </div>
      </form>
        `;
        const showModal = new bootstrap.Modal(
          document.getElementById("deletecontactmodal")
        );
        showModal.show();

      }else {
        console.error("Error fetching user data:", error);
      }
    }catch (error) {
      console.error("Error fetching user data:", error);
    }
  })
})


//delete part//

function deletecontact() {
  const contactDeleteData = document.getElementById("deletecontactForm");
  const myDeleteData = new FormData(contactDeleteData);

  fetch(`/adminhome/contact/delete_contact`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(myDeleteData)),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/adminhome/contact";
      }
      throw new Error("not ok");
    })

    .catch((error) => {
      console.log(error);
    });
}
