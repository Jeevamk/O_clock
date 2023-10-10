function func() {

    const UserData = document.getElementById('editForm');
    const myeditData = new FormData(UserData)
    fetch('/edit', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(myeditData)),
    })
    .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("not ok")
    })
    .then((data)=>{
        if (document.cookie.includes("editToken")){
            window.location.href = "/"
        }
    })

    .catch(error => {
        console.log(error);
    });
};