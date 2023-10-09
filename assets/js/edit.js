document.getElementById('submitButton').addEventListener('click', function () {

    const formData = new FormData(document.getElementById('myForm'));
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });


    fetch('/adminhome/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
    })
    .then(response => {
        if (response.ok) {
            // Handle successful response here
        } else {
            // Handle errors here
        }
    })
    .catch(error => {
        // Handle network or other errors here
    });
});