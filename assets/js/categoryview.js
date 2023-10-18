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

const editcategory = document.querySelectorAll('.edit-cat');

editcategory.forEach(btn => {
    btn.addEventListener('click', async (event) => {
        const catId = await event.target.getAttribute('data-cat-id');

        try {
            const response = await fetch(`/adminhome/category/update/${catId}`)
    
            if (response.ok) {
                const catdata = await response.json()

                document.getElementById('editcat').innerHTML =
                `<form id="updatecatForm" >
                <input type="text" class="form-control" hidden value="${catdata._id}" name="id">
                <div class="form-group row">
                  <label for="name" class="col-sm-2 col-form-label">Name</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="name" 
                                        name="name" value="${catdata.name}" >
                  </div>
                </div>
                <div class="form-group row">
                  <label for="description" class="col-sm-2 col-form-label">Description</label>
                  <div class="col-sm-10">
                    <input type="description" class="form-control" id="description" 
                                         name="description" value="${catdata.description}">
                  </div>
                </div>
                          
                <div class="form-group row">
                  <div class="col-sm-10">
                    <button type="button" class="btn btn-dark"  onclick="catEdit()" id="catUpdateButton">Submit</button>
                  </div>
                </div>
                </form>`
                const showModal = new bootstrap.Modal(document.getElementById('cateditmodal'))
                showModal.show()

            } else {
                console.error('Error fetching user data:', error);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    })
})

//put//

function catEdit () {
    const CategoryEditedData = document.getElementById('updatecatForm')
    const mycategoryData = new FormData(CategoryEditedData)

        fetch(`/adminhome/category/update`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.fromEntries(mycategoryData)),
        })
            .then((response) => {
                if (response.ok) {
                    window.location.href = "/adminhome/category"
                    
                }
                throw new Error("not ok")
            })
    
            .catch(error => {
                console.log(error);
            });
    };





 
    
    