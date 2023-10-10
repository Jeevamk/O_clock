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
    .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("not ok")
    })
    .then((data)=>{
        if (document.cookie.includes("updateToken")){
            window.location.href = "/adminhome"
        }
    })

    .catch(error => {
        console.log(error);
    });
};