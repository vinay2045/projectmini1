document.addEventListener('DOMContentLoaded', function() {
    const modernWearContainer = document.querySelector('.modern-wear');

    // Handle form submission for adding a new product
    document.getElementById('add-product-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        const formData = new FormData(this);
        const imageFile = formData.get('product-image');
        const imageURL = URL.createObjectURL(imageFile);

        // Convert image to Base64 string
        convertImageToBase64(imageFile)
            .then(base64String => {
                const product = {
                    id: Date.now(), // Generate a unique ID for each product
                    image: base64String, // Store the Base64 string of the image
                    model: formData.get('model'),
                    price: formData.get('price')
                };

                // Save product to local storage
                saveProduct(product);

                // Reset form fields
                this.reset();

                // Reload products in the "Modern-Wear" section
                loadProducts();
            })
            .catch(error => {
                console.error('Error converting image to Base64:', error);
            });
    });

    // Handle click events on the "Delete" and "Edit" buttons
    modernWearContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-product')) {
            const productId = event.target.closest('.product').dataset.id;
            deleteProduct(productId);
            loadProducts();
        } else if (event.target.classList.contains('edit-product')) {
            const productId = event.target.closest('.product').dataset.id;
            const product = getProductById(productId);
            displayEditForm(product);
        }
    });

    function saveProduct(product) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
    }

    function loadProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        modernWearContainer.innerHTML = '';

        products.forEach(product => {
            const productElement = createProductElement(product);
            modernWearContainer.appendChild(productElement);
        });
    }

    function createProductElement(product) {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.dataset.id = product.id;

        productElement.innerHTML = `
            <div class="product-part1">
                <img src="${product.image}" alt="Product Image">
            </div>
            <div class="product-part2">
                <h4>${product.model}</h4>
                <h4 class="price">Price: ${product.price}rs</h4>
                <div class="checkout">
                    <button class="edit-product" data-id="${product.id}"><h3>Edit</h3></button>
                    <button class="delete-product" data-id="${product.id}"><h3>Delete</h3></button>
                </div>
            </div>
        `;

        return productElement;
    }

    function deleteProduct(productId) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products = products.filter(product => product.id != productId);
        localStorage.setItem('products', JSON.stringify(products));
    }

    function getProductById(productId) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        return products.find(product => product.id == productId);
    }

    function displayEditForm(product) {
        // Implement the functionality to display a form with existing product details for editing
        // Populate the form fields with existing product details
        console.log('Editing product:', product);
    }

    // Function to convert image file to Base64 string
    function convertImageToBase64(imageFile) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = function(event) {
                resolve(event.target.result);
            };

            reader.onerror = function(error) {
                reject(error);
            };

            reader.readAsDataURL(imageFile);
        });
    }

    loadProducts();
});
