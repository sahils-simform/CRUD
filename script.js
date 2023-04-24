/* eslint-disable no-console */
const pId = document.querySelector("#productId");
const pName = document.querySelector("#productName");
const pImage = document.querySelector("#image");
const productPrice = document.querySelector("#price");
const pDiscription = document.querySelector("#discription");
const tableBody = document.querySelector("#employeeList");
const submitBtn = document.querySelector("#submit");
let sortBy = "id";
// const routeToEditForm = document.querySelector(".editBtn");
const imgPreview = document.querySelector("#image-preview");

// Will hold all the keys

let obj;

// for preview the image in form
function previewImage(event) {
  const reader = new FileReader();
  reader.onload = () => {
    imgPreview.src = reader.result;
  };
  reader.onerror = () => {
    const element = document.getElementById("errorMsg");
    element.value = "Couldn't load the image.";
  };
  reader.readAsDataURL(event.target.files[0]);
}

pImage.addEventListener("change", (event) => {
  previewImage(event);
});

// function for sorting
function sortFunc() {
  let filteredProducts;
  const searchProducts = [];
  for (let i = 0; i < localStorage.length; i += 1) {
    searchProducts.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }
  if (sortBy === "id") {
    filteredProducts = searchProducts
      .sort((a, b) => a.id - b.id)
      .map((item) => item.id);
    } else if (sortBy === "name") {
        filteredProducts = searchProducts
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item) => item.id);
    } else if (sortBy === "price") {
        filteredProducts = searchProducts
        .sort((a, b) => a.price - b.price)
        .map((item) => item.id);
  }
  // renderProducts(filteredProducts);
  return filteredProducts;
}


// Load products from local storage
const renderProducts = (products=[]) => {
  let productsData = sortFunc();
  // console.log(productsData);
  tableBody.innerHTML = "";

  // Get entry for each key and put it into a table row. Entry will be stored in obj and is parsed as JSON.
  if(products.length !== 0){
    productsData = products
  }
  console.log(productsData);
  productsData.forEach((product) => {
    obj = JSON.parse(localStorage.getItem(product));
    const tr = document.createElement("TR");
    tr.innerHTML = `<tr><td><p>${obj.id}</p></td>
                        <td><p>${obj.name}</p></td>  
                        <td><img src="${obj.image}" id = "list-image"alt="Product Image"></td>  
                        <td><p>${obj.price}</p></td>  
                        <td><p>${obj.description}</p></td>        
                        <td><button data-id="${obj.id}" class ="editBtn">Edit</button>        
                        <button data-id="${obj.id}" href="" class ="viewBtn">View</button>       
                        <button data-id="${obj.id}" class ="delBtn">Delete</button></td>       
                    </tr>`;

    tableBody.appendChild(tr);
  });

  // VIEW
  const viewButton = document.querySelectorAll(".viewBtn");
  viewButton.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log(e.target.dataset.id);
      localStorage.setItem("productID", e.target.dataset.id); 
      window.location.href = "./view.html";
      // renderProducts();
    });
  });

  // EDIT
  const editButton = document.querySelectorAll(".editBtn");
  editButton.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      localStorage.setItem("productID", JSON.stringify(e.target.dataset.id));
      window.location.href = "edit.html";
      // renderProducts();
    });
  });

  // DELETE
  const deleteButton = Array.from(document.querySelectorAll(".delBtn"));
  deleteButton.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      localStorage.removeItem(
        e.target.parentElement.parentElement.firstChild.firstChild.innerHTML
      );
      renderProducts();
    });
  });

  // SORT BY  ID, Name and Price
  const sortById = document.getElementById("sort");
  sortById.addEventListener("change", (e) => {
    if (e.target.value === "sortId") {
      sortBy = "id";
    } else if (e.target.value === "name") {
      sortBy = "name";
    } else sortBy = "price";
    
    renderProducts();
  });
};

// filter by id
const productIds = []
  for (let i=0; i<localStorage.length; i+=1){
    productIds.push(JSON.parse(localStorage.getItem(localStorage.key(i))).id);
  }
const searchInput = document.querySelector("#search")

searchInput.addEventListener("input", (e) => {
  console.log("In Input",e.target.value);
  const filteredIds = productIds.filter(element => element.includes(e.target.value));
  console.log(filteredIds);
  renderProducts(filteredIds);
});

renderProducts();

// convert image to string
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

// when user click submit
// Read input values, put in single object called product, push that product to localStorage and let the key be productID. Finally call renderProducts
const formsubmit = async (event) => {
  event.preventDefault();

  const pId1 = pId.value.trim();
  const pName1 = pName.value.trim();
  const pImage1 = await toBase64(pImage.files[0]);
  const price1 = productPrice.value.trim();
  const pDiscription1 = pDiscription.value.trim();
  const productsData = [];

  for (let i = 0; i < localStorage.length; i += 1) {
    productsData.push(localStorage.key(i));
  }

  // Create new user object
  const product = {
    id: pId1,
    name: pName1,
    image: pImage1,
    price: price1,
    description: pDiscription1,
  };

  // and add to users array
  const index = productsData.findIndex((p) => p.id === pId1);
  if (index === -1) {
    // productsData.push(product);
  } else {
    // productsData[index] = product;
  }

  // Update local storage with new users data
  localStorage.setItem(pId1, JSON.stringify(product));

  // clear the value
  pId.value = "";
  pName.value = "";
  pImage.value = "";
  productPrice.value = "";
  pDiscription.value = "";
  imgPreview.remove();

  renderProducts();
};
submitBtn.addEventListener("click", formsubmit);