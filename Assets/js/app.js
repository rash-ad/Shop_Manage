const modal = document.getElementById("modal");

const addProductBtn = document.getElementById("addProductBtn");
const cancelBtn = document.getElementById("cancelBtn");

addProductBtn.addEventListener("click", function () {
  modal.classList.remove("hidden");
});

cancelBtn.addEventListener("click", function () {
  modal.classList.add("hidden");
});




