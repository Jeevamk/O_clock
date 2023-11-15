//cropper brand add//
document.addEventListener("DOMContentLoaded", () => {
  const logoInput = document.getElementById("logo");
  const logoContainer = document.getElementById("logoContainer");
  const croppedlogo = document.getElementById("croppedlogo");
  let cropper;

  logoInput.addEventListener("change", (e) => {
    const input = e.target;
    const reader = new FileReader();

    reader.onload = (event) => {
      if (cropper) {
        cropper.destroy();
      }

      croppedlogo.src = event.target.result;
      cropper = new Cropper(croppedlogo, {
        aspectRatio: 1,
        viewMode: 2,
      });
    };

    reader.readAsDataURL(input.files[0]);
  });

  const brandform = document.getElementById("brandAddForm");
  brandform.addEventListener("submit", (event) => {
    event.preventDefault();

    const croppedData = cropper.getCroppedCanvas().toDataURL();

    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "croppedData";
    hiddenInput.value = croppedData;

    
    brandform.appendChild(hiddenInput);

    brandform.submit();
  });
});

//cropper edit brand
document.addEventListener("DOMContentLoaded", () => {
  const logoEdit = document.getElementById("logo");
  const ContainerLogo = document.getElementById("ContainerLogo");
  const croppedLogo = document.getElementById("croppedLogo");
  let cropper;

  logoEdit.addEventListener("change", (e) => {
    const cropinput = e.target;
    const reader = new FileReader();

    reader.onload = (event) => {
      if (cropper) {
        cropper.destroy();
      }

      croppedLogo.src = event.target.result;
      cropper = new Cropper(croppedLogo, {
        aspectRatio: 1,
        viewMode: 2,
      });
    };

    reader.readAsDataURL(cropinput.files[0]);
  });

  const brandEditform = document.getElementById("updatebrandForm");
  brandEditform.addEventListener("submit", (event) => {
    event.preventDefault();

    const croppedLogoData = cropper.getCroppedCanvas().toDataURL();

    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "croppedLogoData";
    hiddenInput.value = croppedLogoData;

    
    brandEditform.appendChild(hiddenInput);

    brandEditform.submit();
  });
});


// //add product-main image//
document.addEventListener("DOMContentLoaded", () => {
  const productInput = document.getElementById("images");
  const croppedimage = document.getElementById("croppedimage");
  let cropper;

  productInput.addEventListener("change", (e) => {
    const input = e.target;
    const reader = new FileReader();

    reader.onload = (event) => {
      if (cropper) {
        cropper.destroy();
      }

      croppedimage.src = event.target.result;
      cropper = new Cropper(croppedimage, {
        aspectRatio: 1,
        viewMode: 2,
      });
    };

    reader.readAsDataURL(input.files[0]);
  });

  const productform = document.getElementById("productAddForm");
  productform.addEventListener("submit", (event) => {
    event.preventDefault();

    const croppedProductData = cropper.getCroppedCanvas().toDataURL();

    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "croppedProductData";
    hiddenInput.value = croppedProductData;

    
    productform.appendChild(hiddenInput);

    productform.submit();
  });
});
//image1/
document.addEventListener("DOMContentLoaded", () => {
  const product1Input = document.getElementById("images1");
  const croppedimage1 = document.getElementById("croppedimage1");
  let cropper;

  product1Input.addEventListener("change", (e) => {
    const input = e.target;
    const reader = new FileReader();

    reader.onload = (event) => {
      if (cropper) {
        cropper.destroy();
      }

      croppedimage1.src = event.target.result;
      cropper = new Cropper(croppedimage1, {
        aspectRatio: 1,
        viewMode: 2,
      });
    };

    reader.readAsDataURL(input.files[0]);
  });

  const productform = document.getElementById("productAddForm");
  productform.addEventListener("submit", (event) => {
    event.preventDefault();

    const croppedProduct1Data = cropper.getCroppedCanvas().toDataURL();

    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "croppedProduct1Data";
    hiddenInput.value = croppedProduct1Data;

    
    productform.appendChild(hiddenInput);

    productform.submit();
  });
});

//images2//
document.addEventListener("DOMContentLoaded", () => {
  const product2Input = document.getElementById("images2");
  const croppedimage2 = document.getElementById("croppedimage2");
  let cropper;

  product2Input.addEventListener("change", (e) => {
    const input = e.target;
    const reader = new FileReader();

    reader.onload = (event) => {
      if (cropper) {
        cropper.destroy();
      }

      croppedimage2.src = event.target.result;
      cropper = new Cropper(croppedimage2, {
        aspectRatio: 1,
        viewMode: 2,
      });
    };

    reader.readAsDataURL(input.files[0]);
  });

  const productform = document.getElementById("productAddForm");
  productform.addEventListener("submit", (event) => {
    event.preventDefault();

    const croppedProduct2Data = cropper.getCroppedCanvas().toDataURL();

    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "croppedProduct2Data";
    hiddenInput.value = croppedProduct2Data;

    
    productform.appendChild(hiddenInput);

    productform.submit();
  });
});

//images3//
document.addEventListener("DOMContentLoaded", () => {
  const product3Input = document.getElementById("images3");
  const croppedimage3 = document.getElementById("croppedimage3");
  let cropper;

  product3Input.addEventListener("change", (e) => {
    const input = e.target;
    const reader = new FileReader();

    reader.onload = (event) => {
      if (cropper) {
        cropper.destroy();
      }

      croppedimage3.src = event.target.result;
      cropper = new Cropper(croppedimage3, {
        aspectRatio: 1,
        viewMode: 2,
      });
    };

    reader.readAsDataURL(input.files[0]);
  });

  const productform = document.getElementById("productAddForm");
  productform.addEventListener("submit", (event) => {
    event.preventDefault();

    const croppedProduct3Data = cropper.getCroppedCanvas().toDataURL();

    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "croppedProduct3Data";
    hiddenInput.value = croppedProduct3Data;

    
    productform.appendChild(hiddenInput);

    productform.submit();
  });
});


//add banner//

document.addEventListener("DOMContentLoaded", () => {
  const bannerInput = document.getElementById("bannerImg");
  const bannerContainer = document.getElementById("bannerContainer");
  const croppedbanner = document.getElementById("croppedbanner");
  let cropper;

  bannerInput.addEventListener("change", (e) => {
    const input = e.target;
    const reader = new FileReader();

    reader.onload = (event) => {
      if (cropper) {
        cropper.destroy();
      }

      croppedbanner.src = event.target.result;
      cropper = new Cropper(croppedbanner, {
        aspectRatio: 2,
        viewMode: 1,
      });
    };

    reader.readAsDataURL(input.files[0]);
  });

  const bannerform = document.getElementById("bannerAddForm");
  bannerform.addEventListener("submit", (event) => {
    event.preventDefault();

    const croppedBannerData = cropper.getCroppedCanvas().toDataURL();

    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "croppedBannerData";
    hiddenInput.value = croppedBannerData;

    
    bannerform.appendChild(hiddenInput);

    bannerform.submit();
  });
});


//cropper edit banner

document.addEventListener("DOMContentLoaded", () => {
  const bannerImgEdit = document.getElementById("bannerImg");
  const ContainerBanner = document.getElementById("ContainerBanner");
  const croppedBanner = document.getElementById("croppedBanner");
  let cropper;

  bannerImgEdit.addEventListener("change", (e) => {
    const cropinput = e.target;
    const reader = new FileReader();

    reader.onload = (event) => {
      if (cropper) {
        cropper.destroy();
      }

      croppedBanner.src = event.target.result;
      cropper = new Cropper(croppedBanner, {
        aspectRatio: 2,
        viewMode: 1,
      });
    };

    reader.readAsDataURL(cropinput.files[0]);
  });

  const bannerEditform = document.getElementById("updatebannerForm");
  bannerEditform.addEventListener("submit", (event) => {
    event.preventDefault();

    const croppedImgData = cropper.getCroppedCanvas().toDataURL();

    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "croppedImgData";
    hiddenInput.value = croppedImgData;

    
    bannerEditform.appendChild(hiddenInput);

    bannerEditform.submit();
  });
});