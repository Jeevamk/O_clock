//price range//
function getVals() {
    
    var parent = this.parentNode;
    var slides = parent.getElementsByTagName("input");
    var slide1 = parseFloat(slides[0].value);
    var slide2 = parseFloat(slides[1].value);

    if (slide1 > slide2) {
        var tmp = slide2;
        slide2 = slide1;
        slide1 = tmp;
    }

    var displayElement = parent.getElementsByClassName("rangeValues")[0];
    displayElement.innerHTML = slide1 + " - " + slide2;

    filterProductsByPriceRange(slide1, slide2);
}

function filterProductsByPriceRange(minPrice, maxPrice) {
    const products = document.querySelectorAll('.pro');
    products.forEach(product => {
        const productPrice = parseInt(product.dataset.price);
        if (productPrice >= minPrice && productPrice <= maxPrice) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

window.onload = function () {
    var sliderSections = document.getElementsByClassName("range-slider");
    for (var x = 0; x < sliderSections.length; x++) {
        var sliders = sliderSections[x].getElementsByTagName("input");
        for (var y = 0; y < sliders.length; y++) {
            if (sliders[y].type === "range") {
                sliders[y].oninput = getVals;
                sliders[y].oninput();
            }
        }
    }
}


//category//

document.addEventListener('DOMContentLoaded', function () {
    const categoryCheckboxes = document.querySelectorAll('.filter_category');

    categoryCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            filterProducts();
            updateUrl();
        });
    });

    function filterProducts() {
        const selectedCategories = Array.from(categoryCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        document.querySelectorAll('.pro').forEach(function (products) {
            const productCategory = products.getAttribute('data-category');
            products.style.display = selectedCategories.length === 0 || selectedCategories.includes(productCategory)
                ? 'block'
                : 'none';
        });
    }

    function updateUrl() {
        const selectedCategories = Array.from(categoryCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        const queryString = selectedCategories.length > 0
            ? `?category=${selectedCategories.join('&category=')}`
            : '';

        const newUrl = window.location.pathname + queryString;

        history.pushState({}, '', newUrl);
    }
});

//brand//
document.addEventListener('DOMContentLoaded', function () {
    const brandCheckboxes = document.querySelectorAll('.filter_brand');

    brandCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            filterProducts();
            updateUrl();
        });
    });

    function filterProducts() {
        const selectedBrand = Array.from(brandCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        document.querySelectorAll('.pro').forEach(function (products) {
            const productBrand = products.getAttribute('data-brand');
            products.style.display = selectedBrand.length === 0 || selectedBrand.includes(productBrand)
                ? 'block'
                : 'none';
        });
    }

    function updateUrl() {
        const selectedBrand = Array.from(brandCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        const queryString = selectedBrand.length > 0
            ? `?category=${selectedBrand.join('&brand=')}`
            : '';

        const newUrl = window.location.pathname + queryString;

        history.pushState({}, '', newUrl);
    }
});




