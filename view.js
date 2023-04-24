/* eslint-disable no-console */
const backToHome = document.querySelector(".backHome");
console.log(localStorage.getItem("productID"));
const key = JSON.parse(localStorage.getItem("productID"));
const data = JSON.parse(localStorage.getItem(key));
document.getElementById("productId").value = data.id;
document.getElementById("productName").value = data.name;
document.querySelector("#image img").src = data.image;
document.getElementById("price").value = data.price;
document.getElementById("discription").value = data.description;

backToHome.addEventListener("click", (e) => {  
  e.preventDefault()
  localStorage.removeItem("productID")
    window.location.href = "./index.html";
  }); 
