// ================= API BASE URL =================
let shopManagementApi = "https://dummyjson.com/products";

// ================= GET PRODUCTS =================
// This function fetches products from the API
function getProducts() {
  return fetch(shopManagementApi + "?limit=5") // Get first 5 products
    .then(res => res.json())                  // Convert response to JSON
    .then(data => data.products);            // Return array of products
}

// ================= ADD PRODUCT (POST) =================
// This function adds a new product
function addProductAPI(product) {
  return fetch(shopManagementApi + "/add", {
    method: "POST",                           // POST = create
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)            // Convert product object to JSON
  })
  .then(res => res.json());                  // Return newly added product
}

// ================= DELETE PRODUCT =================
// This function deletes a product by its ID
function deleteProductAPI(id) {
  return fetch(shopManagementApi + "/" + id, {
    method: "DELETE"                          // DELETE = remove
  })
  .then(res => res.json());                  // Return response
}

// ================= UPDATE PRODUCT (PUT) =================
// This function updates a product by its ID
function updateProductAPI(id, product) {
  return fetch(shopManagementApi + "/" + id, {
    method: "PUT",                             // PUT = edit
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)             // Convert updated product to JSON
  })
  .then(res => res.json());                   // Return updated product
}
