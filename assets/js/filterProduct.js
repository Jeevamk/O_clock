// const priceRange = document.querySelector("#priceRange");
// const priceValue = document.querySelector(".priceValue");

// function setPrices() {
//   const priceList = pro.map((products) => products.price);
//   const minPrice = Math.min(...priceList);
//   const maxPrice = Math.max(...priceList);
//   priceRange.min = minPrice;
//   priceRange.max = maxPrice;
//   priceValue.textContent = "Rs." + maxPrice;

//   priceRange.addEventListener("input", (e) => {
//     priceValue.textContent = "Rs." + e.target.value;
//     displayProducts(data.filter((products) => products.price <= e.target.value));
//   });
// }


// setPrices();

document.addEventListener('DOMContentLoaded', function () {
    const priceRangeInput = document.getElementById('priceRange');
    const priceValueSpan = document.querySelector('.priceValue');

    const maxPrice = getMaxPrice();
    priceRangeInput.max = maxPrice;

    priceRangeInput.addEventListener('input', function () {
        const selectedPrice = parseInt(priceRangeInput.value);
        priceValueSpan.textContent = selectedPrice;

        const products = document.querySelectorAll('.pro');
        products.forEach(product => {
            const productPrice = parseInt(product.dataset.price);
            if (productPrice <= selectedPrice) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });

    function getMaxPrice() {
        const products = document.querySelectorAll('.pro');
        let maxPrice = 10000;

        products.forEach(product => {
            const productPrice = parseInt(product.dataset.price);
            if (productPrice > maxPrice) {
                maxPrice = productPrice;
            }
        });

        return maxPrice;
    }
});