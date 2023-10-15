const viewButtons = document.querySelectorAll('.view-button');

viewButtons.forEach(btn => {
    btn.addEventListener('click', async (event) => {
        const userId = await event.target.getAttribute('data-user-id');

        try {
            const response = await fetch(`/adminhome/users/${userId}`)
            if (response.ok) {
                const userdata = await response.json()

                const viewData = document.getElementById('viewbody');
                viewData.innerHTML = ` <form id="viewForm">
            <div class="mb-4">
            <label for="user-name">Name</label>
                <input type="text" class="form-control" id="user-name" placeholder="Enter Name" 
                    name="name" value="${userdata.name}" readonly>
            </div>
            <div class="mb-4">
            <label for="user-email">Email Address</label>
                <input type="email" class="form-control" id="user-email" placeholder="Enter Email"
                    name="email" value="${userdata.email}" readonly>
            </div>
            <div class="mb-4">
            <label for="user-phone">Phone Number</label>
                <input type="text" class="form-control" id="user-phone" placeholder="Phone number"
                    name="phone" value="${userdata.phone}" readonly>
            </div>
            <div class="mb-4">
            <label for="user-status">Status</label>
                <input type="text" class="form-control" id="user-status" placeholder="status"
                    name="phone" value="${userdata.status}" readonly>
            </div>
            
        </form>`
                const showModal = new bootstrap.Modal(document.getElementById('viewmodal'))
                showModal.show()

            } else {
                console.error('Error fetching user data:', error);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    })
});


//delete part//
const deleteButtons = document.querySelectorAll('.delete-button');

deleteButtons.forEach(btn => {
    btn.addEventListener('click', async (event) => {
        const userId = await event.target.getAttribute('data-user-id');

        try {
            const response = await fetch(`/adminhome/users/delete_user/${userId}`, {
                method: 'DELETE'
            })
            if (response.ok) {
                window.location.href = '/adminhome/users'
            } else {
                console.error('Error fetching user data:', error);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    })
});


//update status part//
//---------------view part--------------------//
const editButtons = document.querySelectorAll('.edit-button');

editButtons.forEach(btn => {
    btn.addEventListener('click', async (event) => {
        const userId = await event.target.getAttribute('data-user-id');

        try {
            const response = await fetch(`/adminhome/users/edit/${userId}`)
            if (response.ok) {
                const userdata = await response.json()
                document.getElementById('editbody').innerHTML =
                    ` <form id="editstatusForm" onsubmit="status()">
                    <input type="hidden" value="${userdata._id}" name="id">
            <div class="mb-2">
            <label for="user-name">Name</label>
                <input type="text" class="form-control" id="user-name" placeholder="Enter Name" 
                    name="name" value="${userdata.name}" readonly>
            </div>
            <div class="mb-2">
            <label for="user-email">Email Address</label>
                <input type="email" class="form-control" id="user-email" placeholder="Enter Email"
                    name="email" value="${userdata.email}" readonly>
            </div>
            <div class="mb-2">
            <label for="user-phone">Phone Number</label>
                <input type="text" class="form-control" id="user-phone" placeholder="Phone number"
                    name="phone" value="${userdata.phone}" readonly>
            </div>
            <div class="mb-2">
            <label for="user-status mb-2">Status</label>
            <select class="form-select form-select-sm" id="user-status" aria-label="Small select example" value="${userdata.status}">
                <option selected>Active</option>
                <option value="1">Block</option>
            </select>
            </ div>
            <div class="mb-2">
            <button type="submit" id="statusUpdateButton"  class="btn btn-primary"
                             >Save Changes</button>
            </div>
            
            
        </form>`
                const showModal = new bootstrap.Modal(document.getElementById('editmodal'))
                showModal.show()

            } else {
                console.error('Error fetching user data:', error);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    })
});

//------------------------edit part---------------------//

function status() {
    const UserStatusData = document.getElementById('editstatusForm');
    const mystatusData = new FormData(UserStatusData)
    console.log(mystatusData);
    fetch(`/adminhome/users/edit/${userId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(mystatusData)),
    })
        .then((response) => {
            if (response.ok) {
                window.location.href = "/adminhome/admin_user"
                return response.json();
            }
            throw new Error("not ok")
        })

        .catch(error => {
            console.log(error);
        });
};



