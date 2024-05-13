let addProductForm = document.querySelector("#add-product-form");
let productImage = document.querySelector("#product-image");
let model = document.querySelector("#model");
let msg = document.getElementById("msg");
let price = document.querySelector("#price");
let product = document.querySelector(".modern-wear");

addProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("button clicked");
    formValidation();
});

let formValidation = () => {
    if (productImage.files.length === 0) {
        msg.innerHTML = "Please select an image.";
        console.log("failed");
    } else {
        msg.innerHTML = "";
        console.log("success");
        acceptData();
    }
};

let data = {};

let acceptData = () => {
    // Get the image file
    let imageFile = productImage.files[0];

    // Read the image file as a data URL
    let reader = new FileReader();
    reader.onload = function(event) {
        // Store the data URL in the data object
        data["Image"] = event.target.result;
        
        // Call the function to handle the rest of the data
        handleOtherData();
        createProduct();
    };
    reader.readAsDataURL(imageFile);
};

let handleOtherData = () => {
    // Extract other data
    data["Price"] = parseFloat(price.value);
    data["Model"] = model.value;
};

let createProduct = () => {
    product.innerHTML += `
    <div class="product">
        <div class="product-part1">
            <img src="${data.Image}" alt="Product Image">
        </div>
        <div class="product-part2">
            <h4>${data.Model}</h4>
            <h4 class="price">${data.Price}</h4>
            <div class="checkout">
                <button><a href=""><h3>Buy Now</h3></a></button>
                <button><a href=""><h3>Add to Cart</h3></a></button>
                <button type="button" onclick="editProduct(this)"><h3>Edit</h3></button>
                <button type="button" onclick="deleteProduct(this)"><a href=""><h3>Delete</h3></a></button>
            </div>
        </div>
    </div>`;
    resetForm();  
};

let deleteProduct= (e)=>{
    e.parentElement.parentElement.parentElement.remove();
}

let previousImageSrc; // Variable to store the previous image source
let editProduct = (e) => {
    // Get the selected product element
    let selectedProduct = e.parentElement.parentElement.parentElement;
    
    // Get the image source, price, and model values from the selected product
    previousImageSrc = selectedProduct.querySelector(".product-part1 img").src; // Store the previous image source
    let priceText = selectedProduct.querySelector(".price").textContent;
    let modelText = selectedProduct.querySelector("h4").textContent;
    
    // Set the image source, price, and model values in the form fields
    productImage.src = previousImageSrc; // Set the image source
    price.value = priceText; // Set the price value
    model.value = modelText; // Set the model value

    // Remove the selected product from the DOM
    selectedProduct.remove();
};

let resetForm = () => {
    price.value = '';
    model.value = '';
    productImage.value = ''; // Clear the input element value
    productImage.src = ''; // Reset the src attribute of the image element
};
