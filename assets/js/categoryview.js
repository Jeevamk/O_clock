const viewCategory = document.querySelectorAll('.view-cat');

viewCategory.forEach(btn => {
    btn.addEventListener('click', async (event) => {
        const catId = await event.target.getAttribute('data-cat-id');

        try {
            const response = await fetch(`/adminhome/category/${catId}`)
            if (response.ok) {
                const catdata = await response.json()

                const viewData = document.getElementById('catbody');
                viewData.innerHTML = ` <form id="catForm">
            <div class="mb-4">
            <label for="name">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter Name" 
                    name="name" value="${catdata.name}" readonly>
            </div>
            <div class="mb-4">
            <label for="description">Description</label>
                <input type="text" class="form-control" id="description" 
                    name="description" value="${catdata.description}" readonly>
            </div>
            <div class="mb-4">
            <label for="availableStock">AvailableStock</label>
                <input type="number" class="form-control" id="availableStock" 
                    name="availableStock" value="${catdata.availableStock}" readonly>
            </div>
            
        </form>`
                const showModal = new bootstrap.Modal(document.getElementById('catmodal'))
                showModal.show()

            } else {
                console.error('Error fetching user data:', error);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    })
})


//delete//
const catDelete = document.querySelectorAll('.delete-cat');

catDelete.forEach(btn => {
    btn.addEventListener('click', async (event) => {
        const catId = await event.target.getAttribute('data-cat-id');

        try {
            const response = await fetch(`/adminhome/category/delete_category/${catId}`, {
                method: 'DELETE'
            })
            if (response.ok) {
                window.location.href = '/adminhome/category'
            } else {
                console.error('Error fetching user data:', error);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    })
});


//update//
