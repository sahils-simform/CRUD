/* eslint-disable no-console */
const pId = document.querySelector("#productId");
const pName = document.querySelector("#productName");
const pImage = document.querySelector("#image");
const productPrice = document.querySelector("#price");
const pDiscription = document.querySelector("#discription");
const updateButton = document.querySelector(".updateDetails");
const imgPreview = document.querySelector("#image-preview");
const key = JSON.parse(localStorage.getItem("productID"));
const editData = JSON.parse(localStorage.getItem(key));
// const p = editData.find(({ product }) => product.id === key);

// view your old data
pId.value = editData.id;
pName.value = editData.name;
imgPreview.src = editData.image;
productPrice.value = editData.price;
pDiscription.value = editData.description;


// for preview the image in form
  pImage.addEventListener("change", (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      imgPreview.src = reader.result;
    };
    reader.onerror = () => {
      const element = document.getElementById("errorMsg");
      element.value = "Couldn't load the image.";
    };
    reader.readAsDataURL(event.target.files[0]);
  });

// convert img to string
  function toBase64(file) {
    const reader = new FileReader();
    const promise = new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
    reader.readAsDataURL(file);
    return promise;
  }

// when user click on  button   
updateButton.addEventListener("click",async(e) => {
    e.preventDefault();     

   
    if(!pImage.files[0]){
        console.log("Empty Image");
    }else
    {
        editData.id = pId.value;
        editData.name = pName.value;
        editData.price = productPrice.value;
        editData.image = await toBase64(pImage.files[0]);
        editData.description = pDiscription.value;
        localStorage.setItem(key, JSON.stringify(editData));
        console.log(editData);
        localStorage.removeItem("productID")
        window.location.href = "index.html";

    }
});


// await toBase64(imgPreview.files[0]);