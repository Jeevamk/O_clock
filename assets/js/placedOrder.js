function orderPlaced() {
    const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');

    if (selectedPaymentMethod) {
        const paymentMethodValue = selectedPaymentMethod.value;
        console.log(paymentMethodValue);


        return true;
    } else {
        console.log('Please select a payment method.');
        return false;
    }
}


function orderConfirm() {
    const paymentForm = document.getElementById("paymentMethods");
    const formData = new FormData(paymentForm);

    try {
        fetch("/orderplaced", {
            method: "POST",
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Success:", data);
                
                window.location.href = `/orderplaced/${data._id}`;
                
            })
            .catch((error) => {
                console.error("Error:", error);
            })
    } catch (error) {
        console.error("Error:", error);
        
    }
}




