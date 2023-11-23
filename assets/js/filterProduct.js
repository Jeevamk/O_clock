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
const categoryCheckboxes = document.querySelectorAll(".filter_category");
const selectedCategories = [];

categoryCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", (event) => {
    if (checkbox.checked) {
      selectedCategories.push(checkbox.value);
    } else {
      selectedCategories.splice(selectedCategories.indexOf(checkbox.value), 1);
    }

    filterProducts();
    updateURL();
  });
});

function filterProducts() {
  const filteredProducts = products.filter((products) => {
    return selectedCategories.includes(products.category);
  });

  updateProductList(filteredProducts);
}

function updateURL() {
  const baseUrl = window.location.href.split("?")[0];
  const urlParams = new URLSearchParams();

  if (selectedCategories.length > 0) {
    urlParams.append("category", selectedCategories.join(","));
  }

  const newURL = baseUrl + "?" + urlParams.toString();
  window.history.pushState({}, "", newURL);
}




// document.addEventListener("DOMContentLoaded", function () {
//     const categoryCheckboxes = document.querySelectorAll(".filter_category");
//     const selectedCategories = [];
  
//     categoryCheckboxes.forEach((checkbox) => {
//       checkbox.addEventListener("change", (event) => {
//         if (checkbox.checked) {
//           selectedCategories.push(checkbox.value);
//         } else {
//           selectedCategories.splice(selectedCategories.indexOf(checkbox.value), 1);
//         }
  
//         filterProducts();
//         updateURL();
//       });
//     });
  
//     function filterProducts() {
   
//       const filteredProducts = products.filter((products) => {
//         return selectedCategories.includes(products.category);
//       });
  
     
//       updateProductList(filteredProducts);
//     }
  
//     function updateURL() {
//       const baseUrl = window.location.href.split("?")[0];
//       const urlParams = new URLSearchParams();
  
//       if (selectedCategories.length > 0) {
//         urlParams.append("category", selectedCategories.join(","));
//       }
  
//       const newURL = baseUrl + "?" + urlParams.toString();
//       window.history.pushState({}, "", newURL);
//     }
  
    
//     function updateProductList(filteredProducts) {
      
//     }
//   });
  