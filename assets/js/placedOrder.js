
var orderId;
        $(document).ready(function () {
            var settings = {
                "url": "/payment/create/orderId",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "amount": "50000",


                }),
            }
        })


function orderPlaced() {
    const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');

    if (selectedPaymentMethod) {
        const paymentMethodValue = selectedPaymentMethod.value;
        console.log(paymentMethodValue);

        if(paymentMethodValue === "razorpay") {
            let orderId;
            fetch(`/payment/create/orderId`, {
                method : "POST",
                headers : {
                    'Content-Type':'application/json'
                },

            }).then(response => response.json())
            .then(data => {
                console.log(data);
                 orderId = data.orderId;
            })
            console.log(orderId);

            var options = {
                "key": "rzp_test_gvhn8x6joCBy7N", // Enter the Key ID generated from the Dashboard
                "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "O_Clock",
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "handler": function (response) {
                    alert(response.razorpay_payment_id);
                    alert(response.razorpay_order_id);
                    alert(response.razorpay_signature)

                    var settings = {
                    "url": "/payment/payment/verify",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "data": JSON.stringify({ response }),
                }
                },
            "theme": {
            "color": "#000000"
            }
            }

   
    var rzp1 = new Razorpay(options);

    rzp1.on('payment.failed', function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
    });

    rzp1.open();
    e.preventDefault();
                    

    $.ajax(settings).done(function (response) {

        orderId = response.orderId;
        console.log(orderId);
        $("button").show();
    });


    }

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




