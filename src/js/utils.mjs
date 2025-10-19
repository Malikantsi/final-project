// Cart Count Update (will be enhanced later)
export function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    console.log('updateCartCount: Invoked');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount.textContent = cart.length;
}
// Utility Functions
export function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

export function setLocalStorage(key, data) {
    let items = JSON.parse(localStorage.getItem(key)) || [];
    items.push(data);
    localStorage.setItem(key, JSON.stringify(items));
    localStorage.setItem("product-cart-count", JSON.stringify(getLocalStorage("cart")?.length || 0));
}
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

//hambutton

// utils.mjs
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.querySelector('.nav-menu');
const cartBtn = document.querySelector('.cart-btn');

export function setupMobileMenu(mobileMenuBtn, mainNav) {
    // Toggle menu visibility when button is clicked
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('show');
    });

    // Adjust menu top position dynamically on resize
    window.addEventListener('resize', () => {
        const header = document.querySelector('header');
        const headerHeight = header.offsetHeight;
        mainNav.style.top = `${headerHeight}px`;
    });

    // Run once on load to position correctly
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
    mainNav.style.top = `${headerHeight}px`;
}
