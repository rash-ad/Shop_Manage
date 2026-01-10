document.addEventListener("DOMContentLoaded", function() {
  const apiURL = "https://dummyjson.com/products";

  // DOM Elements
  const addProductBtn = document.getElementById("addProductBtn");
  const modal = document.getElementById("modal");
  const cancelBtn = document.getElementById("cancelBtn");
  const productForm = document.getElementById("productForm");
  const productGrid = document.getElementById("productGrid");
  const modalTitle = document.getElementById("modalTitle");

  let editingProductId = null; // track edit

  // Open modal for Add
  addProductBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    modalTitle.innerText = "Add Product";
    productForm.reset();
    
  });

  // Close modal
  cancelBtn.addEventListener("click", () => modal.classList.add("hidden"));

  // Fetch products
  function getProducts() {
    return fetch(apiURL + "?limit=10")
      .then(res => res.json())
      .then(data => data.products);
  }

  // Show products in grid
  function showProducts() {
    getProducts().then(products => {
      productGrid.innerHTML = "";
      products.forEach(p => {
        const card = document.createElement("div");
        card.className = "bg-white p-4 rounded-lg shadow";
        card.innerHTML = `
          <img src="${p.thumbnail || 'https://via.placeholder.com/300'}" class="w-full h-40 rounded object-cover">
          <h2 class="font-bold mt-2">${p.title}</h2>
          <p>Price: $${p.price}</p>
          <p class="text-sm text-gray-500">${p.category}</p>
          <div class="flex justify-between mt-2">
            <button class="bg-yellow-500 text-white px-3 py-1 rounded" onclick="editProduct(${p.id})">Edit</button>
            <button class="bg-red-500 text-white px-3 py-1 rounded" onclick="deleteProduct(${p.id})">Delete</button>
          </div>
        `;
        productGrid.appendChild(card);
      });
    });
  }

  // Delete product
  window.deleteProduct = function(id) {
    fetch(apiURL + "/" + id, { method: "DELETE" })
      .then(res => res.json())
      .then(() => showProducts());
  }

  // Edit product
  window.editProduct = function(id) {
    fetch(apiURL + "/" + id)
      .then(res => res.json())
      .then(p => {
        modal.classList.remove("hidden");
        modalTitle.innerText = "Edit Product";
        document.getElementById("productName").value = p.title;
        document.getElementById("productPrice").value = p.price;
        document.getElementById("productCategory").value = p.category;
        editingProductId = id;
      });
  }

  // Form submit
  productForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const product = {
      title: document.getElementById("productName").value,
      price: Number(document.getElementById("productPrice").value),
      category: document.getElementById("productCategory").value,
      description: "New product"
    };

    if (editingProductId) {
      // PUT update
      fetch(apiURL + "/" + editingProductId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
      })
      .then(res => res.json())
      .then(() => {
        modal.classList.add("hidden");
        productForm.reset();
        editingProductId = null;
        showProducts();
      });
    } else {
      // POST add
      fetch(apiURL + "/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
      })
      .then(res => res.json())
      .then(() => {
        modal.classList.add("hidden");
        productForm.reset();
        showProducts();
      });
    }
  });

  // Initial load
  showProducts();
});
