// document.addEventListener('DOMContentLoaded', function() {
//     const viewButtons = document.querySelectorAll('.view-button');


//     viewButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             const userId = button.getAttribute('data-id');

//             // Fetch user data for the specific user using AJAX
//             fetch(`/adminhome/users/${userId}`)
//                 .then(response => response.json())
//                 .then(data => {
//                     // document.getElementById('user-modal-title').textContent = data.name;
//                     document.getElementById('user-id').textContent = data._id;
//                     document.getElementById('user-name').textContent = data.name;
//                     document.getElementById('user-email').textContent = data.email;
//                     document.getElementById('user-phone').textContent = data.phone;
//                     document.getElementById('user-status').textContent = data.status;

//                     // Show the Bootstrap modal
//                     $('#user-modal').modal('show');
//                 })
//                 .catch(error => {
//                     console.error('Error fetching user data:', error);
//                 });
//         });
//     });
// });

// document.addEventListener('DOMContentLoaded', function() {
//     const viewButtons = document.querySelectorAll('.view-button');

//     viewButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             const userId = button.getAttribute('data-id');

//             // Fetch user data for the specific user using AJAX
//             fetch(`/adminhome/users/${userId}`)
//                 .then(response => response.json())
//                 .then(data => {
//                     if (data && data._id) {
//                         // Populate the modal with user data
//                         document.getElementById('user-id').textContent = data._id;
//                         document.getElementById('user-name').textContent = data.name;
//                         document.getElementById('user-email').textContent = data.email;
//                         document.getElementById('user-phone').textContent = data.phone;
//                         document.getElementById('user-status').textContent = data.status;

//                         // Show the Bootstrap modal
//                         $('#user-modal').modal('show');
//                     } else {
//                         console.error('User data is null or missing _id property');
//                     }
//                 })
//                 .catch(error => {
//                     console.error('Error fetching user data:', error);
//                 });
//         });
//     });
// });

// document.addEventListener('DOMContentLoaded', function() 
// {
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
