document.addEventListener('DOMContentLoaded', () => {
    const addWishList = document.getElementById('addWishList');
    if(addWishList){
        addWishList.addEventListener('click', () => {
        const productId = addWishList.getAttribute('data-product-id');
        const wishProduct = {
            productId: productId,
          };
    
          fetch('/wish', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(wishProduct)
          })
          .then(response => {
            if (response.ok) {
              addWishList.style.color = 'red'; 
            } else {
              console.error('Error adding product to wishlist:', response.statusText);
            }
          })
          .catch(error => {
            console.error('Fetch error:', error);
          });
        });
    }
  
    });