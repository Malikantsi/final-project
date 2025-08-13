document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const orderNumber = document.getElementById('order-number');
    const orderDate = document.getElementById('order-date');
    const orderTotal = document.getElementById('order-total');
    const paymentMethod = document.getElementById('payment-method');
    const printBtn = document.getElementById('print-receipt');

    // Load order from localStorage
    const order = JSON.parse(localStorage.getItem('currentOrder'));

    if (!order) {
        // If no order found, redirect to home
        window.location.href = 'index.html';
        return;
    }

    // Display order details
    orderNumber.textContent = `#${order.id}`;
    orderDate.textContent = new Date(order.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    orderTotal.textContent = order.total;
    paymentMethod.textContent = `Credit Card ending in ${order.payment.last4}`;

    // Print receipt
    printBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.print();
    });

    // Update cart count (should be 0 now)
    document.querySelector('.cart-count').textContent = '0';
});