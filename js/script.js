const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productCategory = document.getElementById("productCategory");
const productDesc = document.getElementById("productDesc");
const addProductButton = document.getElementById("addProductButton");
const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("searchInput");
const productNameAlert = document.getElementById("productNameAlert");
const productPriceAlert = document.getElementById("productPriceAlert");
const productCategoryAlert = document.getElementById("productCategoryAlert");

let productList = [];
productList = JSON.parse(localStorage.getItem("CRUDS4"));
createTable(productList);

addProductButton.addEventListener("click", addProduct)

function addProduct(){
    let Product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDesc.value
    }
    productList.push(Product);
    createTable(productList);
    localStorage.setItem("CRUDS4", JSON.stringify(productList));
    clearForm();
}

function createTable(arr){
    let box = "";
    for(let i=0; i<arr.length; i++){
        box += `
        <tr>
            <td>${i+1}</td>
            <td>${arr[i].name}</td>
            <td>${arr[i].price}</td>
            <td>${arr[i].category}</td>
            <td>${arr[i].desc}</td>
            <td><button onclick="updateProduct(${i})" class="btn btn-warning">update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
        </tr>`
    }
    tableBody.innerHTML = box;
}

function clearForm(){
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDesc.value = "";

    productName.classList.remove("is-valid");
    productPrice.classList.remove("is-valid")
    productCategory.classList.remove("is-valid")
    productDesc.classList.remove("is-valid")
}

function updateProduct(num){
    productName.value = productList[num].name;
    productPrice.value = productList[num].price;
    productCategory.value = productList[num].category;
    productDesc.value = productList[num].desc;
    deleteProduct(num)
}

function deleteProduct(num){
    productList.splice(num, 1);
    createTable(productList);
    localStorage.setItem("CRUDS4", JSON.stringify(productList));
}

searchInput.addEventListener("keyup", searchProduct);
function searchProduct(){
    let term = searchInput.value.toLowerCase();
    let searchedList = [];
    for(let i=0; i<productList.length; i++){
        let listItem = productList[i].name.toLowerCase();
        if(listItem.includes(term)){
            searchedList.push(productList[i]);
        }
    }
    createTable(searchedList);
}

//product name Vallidation
let regex1 = /^[A-Z][a-z]{3,10}$/;
productName.addEventListener("blur", productNameValidate);
function productNameValidate(){
    let testRes = regex1.test(productName.value);
    if(testRes == true){
        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");
        productNameAlert.classList.add("d-none")
    }else{
        productName.classList.add("is-invalid");
        productName.classList.remove("is-valid");
        productNameAlert.classList.remove("d-none")
    }
}

//product price Vallidation
let regex2 = /^([1-9][0-9]{2,3}|10000)$/;
productPrice.addEventListener("blur", productPriceValidate);
function productPriceValidate(){
    let testRes = regex2.test(productPrice.value);
    if(testRes == true){
        productPrice.classList.add("is-valid");
        productPrice.classList.remove("is-invalid");
        productPriceAlert.classList.add("d-none")
    }else{
        productPrice.classList.add("is-invalid");
        productPrice.classList.remove("is-valid");
        productPriceAlert.classList.remove("d-none")
    }
}

//product price Vallidation
let regex3 = /^[a-zA-Z]{3,10}$/;
productCategory.addEventListener("blur", prductCategoryValidate);
function prductCategoryValidate(){
    let testRes = regex3.test(productCategory.value);
    if(testRes == true){
        productCategory.classList.add("is-valid");
        productCategory.classList.remove("is-invalid");
        productCategoryAlert.classList.add("d-none");
    }else{
        productCategory.classList.remove("is-valid");
        productCategory.classList.add("is-invalid");
        productCategoryAlert.classList.remove("d-none");
    }
}

//product desc Vallidation
let regex4 = /./;
productDesc.addEventListener("blur", prductDescValidate);
function prductDescValidate(){
    let testRes = regex4.test(productDesc.value);
    if(testRes == true){
        productDesc.classList.add("is-valid");
        productDesc.classList.remove("is-invalid");
    }else{
        productDesc.classList.remove("is-valid");
        productDesc.classList.add("is-invalid");
    }
}
