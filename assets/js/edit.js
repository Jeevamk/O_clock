function fun() {

    const userData = document.getElementById('myForm');
    const myformData = new FormData(userData)
    fetch('/adminhome/update', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(myformData)),
    })
    .then(response => {
        if (response.ok) {
            return response.json()
           
        }
        if (response.redirected) {
           
        } 
        else {
            // Handle errors here
        }
    })
    .catch(error => {
        // Handle network or other errors here
    });
};