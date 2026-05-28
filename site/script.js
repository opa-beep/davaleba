const product = {
    name: "Fall Limited Edition Sneakers",
    price: 125.00,
    thumb: "raster/image-product-1-thumbnail.jpg",
    images: [
        "raster/image-product-1.jpg",
        "raster/image-product-2.jpg",
        "raster/image-product-3.jpg",
        "raster/image-product-4.jpg"
    ]
};

let currentImage = 0;
let quantity = 0;
let cartCount = 0;

const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

const mainImage      = $("mainImage");
const lightboxImage  = $("lightboxImage");
const quantityDisplay = $("quantity");
const cartBadge      = $("cartBadge");
const cartContent    = $("cartContent");
const cartDropdown   = $("cartDropdown");
const lightbox       = $("lightbox");
const nav            = $("nav");
const overlay        = $("overlay");

const thumbs         = $$(".gallery .thumb");
const lightboxThumbs = $$(".lightbox-thumbs .thumb");

function animateClass(el, cls, duration) {
    el.classList.add(cls);
    setTimeout(() => el.classList.remove(cls), duration);
}

function updateThumbs(index) {
    thumbs.forEach(t => t.classList.toggle("active", +t.dataset.index === index));
    lightboxThumbs.forEach(t => t.classList.toggle("active", +t.dataset.index === index));
}

function showImage(index) {
    currentImage = (index + product.images.length) % product.images.length;

    mainImage.classList.add("fade-out");
    setTimeout(() => {
        mainImage.src = product.images[currentImage];
        lightboxImage.src = product.images[currentImage];
        mainImage.classList.replace("fade-out", "fade-in");
        setTimeout(() => mainImage.classList.remove("fade-in"), 300);
    }, 150);

    updateThumbs(currentImage);
}

$("prevBtn").addEventListener("click", () => showImage(currentImage - 1));
$("nextBtn").addEventListener("click", () => showImage(currentImage + 1));
$("lightboxPrev").addEventListener("click", () => showImage(currentImage - 1));
$("lightboxNext").addEventListener("click", () => showImage(currentImage + 1));

thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => showImage(+thumb.dataset.index));
});

lightboxThumbs.forEach(thumb => {
    thumb.addEventListener("click", () => showImage(+thumb.dataset.index));
});

$("minusBtn").addEventListener("click", () => {
    if (quantity <= 0) return;
    quantityDisplay.textContent = --quantity;
    animateClass(quantityDisplay, "pop", 200);
});

$("plusBtn").addEventListener("click", () => {
    quantityDisplay.textContent = ++quantity;
    animateClass(quantityDisplay, "pop", 200);
});

$("addToCartBtn").addEventListener("click", () => {
    if (quantity <= 0) return;
    cartCount = quantity;
    renderCart();
    animateClass($("addToCartBtn"), "bounce", 400);
});

function renderCart() {
    cartBadge.textContent = cartCount;
    cartBadge.classList.toggle("show", cartCount > 0);
    if (cartCount > 0) animateClass(cartBadge, "pop", 300);

    if (cartCount <= 0) {
        cartContent.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
        return;
    }

    const total = (product.price * cartCount).toFixed(2);
    cartContent.innerHTML = `
        <div class="cart-item">
            <img src="${product.thumb}" class="cart-thumb" alt="product">
            <div class="cart-item-info">
                <p>${product.name}</p>
                <p>$${product.price.toFixed(2)} x ${cartCount} <span class="total">$${total}</span></p>
            </div>
            <button class="delete-btn" id="deleteBtn">
                <img src="raster/icon-delete.svg" alt="delete">
            </button>
        </div>
        <button class="checkout-btn" id="checkoutBtn">Checkout</button>
    `;

    $("deleteBtn").addEventListener("click", () => {
        cartCount = 0;
        renderCart();
    });

    $("checkoutBtn").addEventListener("click", () => {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    });
}

$("cartBtn").addEventListener("click", () => cartDropdown.classList.toggle("show"));

$("burgerBtn").addEventListener("click", () => {
    nav.classList.add("show");
    overlay.classList.add("show");
});

const closeMenu = () => {
    nav.classList.remove("show");
    overlay.classList.remove("show");
};

$("closeBtn").addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

mainImage.addEventListener("click", () => {
    if (window.innerWidth < 768) return;
    lightboxImage.src = product.images[currentImage];
    lightbox.classList.add("show");
});

$("lightboxClose").addEventListener("click", () => lightbox.classList.remove("show"));

lightbox.addEventListener("click", e => {
    if (e.target === lightbox) lightbox.classList.remove("show");
});
