

const loadAllProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => displayProducts(data));
};

const displayProducts = (products) => {
  const productDiv = document.getElementById("product-card-parent");
  productDiv.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.innerHTML = `<div class="border border-gray-100 rounded-xl overflow-hidden group hover:shadow-md transition">
        <div class="bg-gray-50 h-64 flex items-center justify-center p-6">
          <img src="${product.image}" class="max-h-full mix-blend-multiply group-hover:scale-110 transition duration-500">
        </div>
        <div class="p-4">
          <div class="flex justify-between items-center mb-2">
            <span class="text-[10px] font-bold text-[#5542f6] bg-indigo-50 px-2 py-0.5 rounded">${product.category}</span>
            <span class="text-xs text-yellow-500 font-bold">${product.rating.rate} (${product.rating.count})</span>
          </div>
          <h3 class="font-bold text-gray-800 text-sm truncate">${product.title}</h3>
          <p class="text-lg font-bold text-gray-900 mt-1 mb-4">${product.price}</p>
          <div class="flex space-x-3">
            <button class="flex-1 details-btn flex items-center justify-center border border-gray-200 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              Details
            </button>
            <button class="flex-1 flex items-center justify-center bg-[#5542f6] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#4335c7] transition">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              Add
            </button>
          </div>
        </div>
      </div>`;
    card.querySelector(".details-btn").addEventListener("click", () => {
      openModal(product);
    });
    productDiv.append(card);
  });
};
loadAllProducts();

const getAllCategory = () => {
  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((data) => showAllCategory(data));
};
const showAllCategory = (categories) => {
  const categoryParent = document.getElementById("category-parent");
  const allCategoryBtn = document.createElement("button");
  allCategoryBtn.className =
    "px-5 py-1.5 category-btn rounded-full border border-gray-200 category-active text-white text-sm font-medium hover:bg-gray-50 transition";
  allCategoryBtn.textContent = "All";
  allCategoryBtn.addEventListener("click", function () {
loadAllProducts();

    // Remove active class from all buttons
    document
      .querySelectorAll(".category-btn")
      .forEach((btn) => btn.classList.remove("category-active", "text-white"));

    // Add active class to clicked button
    this.classList.add("category-active", "text-white");
  });
  categoryParent.append(allCategoryBtn);

  categories.forEach((category) => {
    const btn = document.createElement("button");

    btn.className =
      "px-5 py-1.5 category-btn rounded-full border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition";
    btn.textContent = category;
    btn.addEventListener("click", function () {
      getProductByCategory(category, this);
    });
    categoryParent.append(btn);
  });
};
getAllCategory();

const getProductByCategory = (category, btn) => {
  const url = `https://fakestoreapi.com/products/category/${category}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayProducts(data));

  // Remove active class from all buttons
  document
    .querySelectorAll(".category-btn")
    .forEach((btn) => btn.classList.remove("category-active", "text-white"));

  // Add active class to clicked button
  btn.classList.add("category-active", "text-white");
};

// for modal
const modal = document.getElementById("productModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

function openModal(product) {
  const modal = document.getElementById("productModal");
  const modalContent = document.getElementById("modalContent");

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  modalContent.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      
      <!-- Image -->
      <div class="bg-gray-50 p-6 rounded-xl flex items-center justify-center">
        <img src="${product.image}" 
             class="max-h-64 md:max-h-80 w-auto object-contain mix-blend-multiply" 
             loading="lazy" />
      </div>

      <!-- Info -->
      <div>
        <span class="text-xs font-bold text-[#5542f6] bg-indigo-50 px-3 py-1 rounded-full">
          ${product.category}
        </span>

        <h2 class="text-lg md:text-2xl font-bold mt-4">
          ${product.title}
        </h2>

        <p class="text-gray-600 text-sm md:text-base mt-4 leading-relaxed">
          ${product.description}
        </p>

        <div class="mt-4 md:mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0">
          <p class="text-2xl md:text-3xl font-bold text-gray-900">
            $${product.price.toFixed(2)}
          </p>

          <p class="text-yellow-500 font-bold text-sm md:text-base">
            ⭐ ${product.rating?.rate || 0} (${product.rating?.count || 0} reviews)
          </p>
        </div>

        <!-- Buttons -->
        <div class="mt-6 flex flex-col md:flex-row gap-3 md:gap-4">
          <button id="addToCartBtn"
                  class="flex-1 bg-[#5542f6] text-white py-3 rounded-xl font-bold hover:bg-[#4335c7] transition">
            Add to Cart
          </button>

          <button id="buyNowBtn"
                  class="flex-1 border border-gray-300 py-3 rounded-xl font-bold hover:bg-gray-100 transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  `;

  // Button actions
  document.getElementById("addToCartBtn").addEventListener("click", () => {
    console.log("Added to cart:", product.title);
  });

  document.getElementById("buyNowBtn").addEventListener("click", () => {
    console.log("Buying:", product.title);
  });
}
// Close modal function
function closeModalFunc() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

closeModal.addEventListener("click", closeModalFunc);

// Close on outside click
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModalFunc();
  }
});

// Close on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModalFunc();
  }
});
