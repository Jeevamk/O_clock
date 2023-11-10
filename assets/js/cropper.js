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
