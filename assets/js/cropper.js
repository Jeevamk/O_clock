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


// //add product//
// document.addEventListener("DOMContentLoaded", () => {
//   const imageInput = document.getElementById("images");
//   const ImageContainer = document.getElementById("ImageContainer");
//   let croppers = [];

//   imageInput.addEventListener("change", (e) => {
//     const input = e.target;
//     const files = input.files;

//     croppers.forEach(cropper => cropper.destroy());
//     croppers = [];

//     // Display each selected image and initialize cropper
//     for (let i = 0; i < files.length; i++) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const img = document.createElement('img');
//         img.src = event.target.result;
//         ImageContainer.appendChild(img);
//         const cropper = new Cropper(img, {
//           aspectRatio: 1,
//           viewMode: 2,
//         });
//         croppers.push(cropper);
//       };
//       reader.readAsDataURL(files[i]);
//     }
//   });

//   const productAddForm = document.getElementById("productAddForm");
//   productAddForm.addEventListener("submit", () => {
//     const croppedDataArray = [];

//     // Retrieve cropped data for each image
//     croppers.forEach(cropper => {
//       const croppedCanvas = cropper.getCroppedCanvas();
//       if (croppedCanvas) {
//         croppedDataArray.push(croppedCanvas.toDataURL('image/jpeg'));
//       }
//     });

//     // You can now send croppedDataArray to the server or perform further actions

//     console.log(croppedDataArray);
//   });
// });


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