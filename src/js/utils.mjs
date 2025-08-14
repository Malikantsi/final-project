// Cart Count Update (will be enhanced later)
export function updateCartCount(cartCount) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}
// Utility Functions
export function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem("so-cart-count", JSON.stringify(getLocalStorage("so-cart")?.length || 0));
}
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
} ``