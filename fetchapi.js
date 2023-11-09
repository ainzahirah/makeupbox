// Function to handle the button click event
function buttonClicked() {
    // Get the brand and product type values from the input fields
    var brand = document.getElementById("searchData").value;
    var product_type = document.getElementById("searchData2").value;

    // Make an API request to fetch products based on brand and product type
    fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}&product_type=${product_type}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            // Check if any products were found
            if (data.length > 0) {
                displayProducts(data); // Call function to display products
            } else {
                // Display a message if no products were found
                document.getElementById("productList").innerHTML = "No products found for the given brand and product type.";
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            // Display an error message if there was an issue with the API request
            document.getElementById("productList").innerHTML = "Error fetching data.";
        });
}

// Function to display products in the HTML
function displayProducts(products) {
    const productList = document.getElementById("productList");
    productList.innerHTML = ''; // Clear previous product list

    // Iterate through the fetched products and display each product
    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `<b>${product.name}</b><br><br> <b>Product Type:</b> ${product.product_type} <br><br> <b>Description:</b> ${product.description}<br><br>`;

        // If an image link is available, create an image element and display the product image
        if (product.image_link) {
            const img = document.createElement('img');
            img.src = product.image_link;
            img.style.maxWidth = '200px'; // Adjust the image size if needed
            img.style.display = 'block'; // Set the image to be a block-level element
            img.style.margin = '0 auto'; // Center the image horizontally
            li.appendChild(img);
        }

        // Display the product price, or a message if the price is not available
        if (product.price) {
            li.innerHTML += `<br><br><center><b>Price:</b> ${product.price} </center><br><br>`;
        } else {
            li.innerHTML += `<b>Price:</b> Price not available <br>`;
        }

        // If a product link is available, create a link to the product page
        if (product.product_link) {
            li.innerHTML += `<center><a href="${product.product_link}" target="_blank">Product Link</a> <br></center>`;
        } else {
            li.innerHTML += `Product link not available <br>`;
        }

        li.innerHTML += '<br><br>'; // Add spacing between products
        productList.appendChild(li); // Append the product item to the product list
    });
}
