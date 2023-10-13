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
                    name="name" value="${userdata.name}">
            </div>
            <div class="mb-4">
            <label for="user-email">Email Address</label>
                <input type="email" class="form-control" id="user-email" placeholder="Enter Email"
                    name="email" value="${userdata.email}">
            </div>
            <div class="mb-4">
            <label for="user-phone">Phone Number</label>
                <input type="text" class="form-control" id="user-phone" placeholder="Phone number"
                    name="phone" value="${userdata.phone}">
            </div>
            <div class="mb-4">
            <label for="user-status">Status</label>
                <input type="text" class="form-control" id="user-status" placeholder="status"
                    name="phone" value="${userdata.status}">
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
                window.location.href='/adminhome/users'
            } else {
                console.error('Error fetching user data:', error);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    })
});

// deleteButtons.forEach(btn => {
//     btn.addEventListener('click', async (event) => {
//         const userId = event.target.getAttribute('data-user-id');
//         if (isValidObjectId(userId)) {
//             try {
//                 const response = await fetch(`/adminhome/users/${userId}`, {
//                     method: 'DELETE'
//                 });
//                 if (response.ok) {
//                     window.location.href = '/adminhome/users';
//                 } else {
//                     console.error('Error deleting user:', response.statusText);
//                 }
//             } catch (error) {
//                 console.error('Error deleting user:', error);
//             }
//         } else {
//             console.error('Invalid userId:', userId);
//         }
//     });
// });
