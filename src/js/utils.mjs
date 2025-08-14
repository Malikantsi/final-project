// Cart Count Update (will be enhanced later)
export function updateCartCount(cartCount) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}