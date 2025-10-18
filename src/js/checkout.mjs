// DOM Elements
const paymentForm = document.getElementById('payment-form');
const orderItemsContainer = document.querySelector('.order-items');
const orderSubtotal = document.getElementById('order-subtotal');
const orderShipping = document.getElementById('order-shipping');
const orderTax = document.getElementById('order-tax');
const orderTotal = document.getElementById('order-total');
const stateSelect = document.getElementById('state');
const usStates = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
    'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

document.addEventListener('DOMContentLoaded', function () {
    // Load cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    //Load states dropdown list with values
    usStates.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });



    var OrderSum = JSON.parse(localStorage.getItem('OrderSummary'));
    console.log(OrderSum);
    document.getElementById("order-subtotal").textContent = OrderSum[0];
    document.getElementById("order-shipping").textContent = OrderSum[1];
    document.getElementById("order-tax").textContent = OrderSum[2];
    document.getElementById("order-total").textContent = OrderSum[3];
    // Example: Handle checkout form submission
    paymentForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const customerName = document.querySelector("#full-name").value;
        const customerEmail = document.querySelector("#email").value;
        const orderTotal = OrderSum[3];
        sendOrderEmail(customerName, customerEmail, orderTotal);
        alert("Thank you for your purchase! Confirmation email sent.");
        window.location.href = '/src/checkout/thankyou.html';
    });




    // Render order summary
    function renderOrderSummary() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
        const tax = subtotal * 0.08; // 8% tax

        orderItemsContainer.innerHTML = cart.map(item => `
            <div class="order-item">
                <img src="${item.thumbnail || 'images/placeholder-toy.jpg'}" alt="${item.title}" onerror="this.src='images/placeholder-toy.jpg'">
                <div class="order-item-details">
                    <div class="order-item-title">${item.title}</div>
                    <div class="order-item-quantity">Qty: ${item.quantity}</div>
                </div>
                <div class="order-item-price">${formatPrice(item.price * item.quantity)}</div>
            </div>
        `).join('');

        orderSubtotal.textContent = formatPrice(subtotal);
        orderShipping.textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
        orderTax.textContent = formatPrice(tax);
        orderTotal.textContent = formatPrice(subtotal + shipping + tax);
    }

    // Setup form validation
    function setupFormValidation() {
        paymentForm.addEventListener('submit', function (e) {
            e.preventDefault();


            if (this.checkValidity()) {
                submitOrder();
            } else {
                // Show validation errors
                this.reportValidity();
            }
        });

        // Format card number as user types
        document.getElementById('card-number').addEventListener('input', function (e) {
            this.value = this.value.replace(/\D/g, '');
        });

        // Format expiry date as MM/YY
        document.getElementById('expiry').addEventListener('input', function (e) {
            this.value = this.value
                .replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '$1/$2')
                .substring(0, 5);
        });
    }

    // Submit order
    function submitOrder() {
        // In a real app, you would process payment here
        // For demo purposes, we'll simulate a successful order

        // Create order object
        const order = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            items: [...cart],
            customer: {
                name: document.getElementById('full-name').value,
                email: document.getElementById('email').value,
                address: {
                    street: document.getElementById('address').value,
                    city: document.getElementById('city').value,
                    state: document.getElementById('state').value,
                    zip: document.getElementById('zip').value
                }
            },
            payment: {
                method: 'credit',
                last4: document.getElementById('card-number').value.slice(-4)
            },
            total: orderTotal.textContent
        };

        // Save order to localStorage (instead of a database)
        localStorage.setItem('currentOrder', JSON.stringify(order));
        localStorage.removeItem('cart'); // Clear cart

        // Redirect to confirmation page
        window.location.href = 'confirmation.html';
    }

    // Utility function to format price
    function formatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    }

    // Initialize

});

// Initialize EmailJS
(function () {
    emailjs.init("7gQY1_XsMluQ8vvzh");
})();

export function sendOrderEmail(customerName, customerEmail, orderTotal) {
    emailjs.send("service_frq3chr", "template_4535lub", {
        customer_name: customerName,
        email: customerEmail,
        order_total: orderTotal
    }).then(() => {
        console.log("Order confirmation email sent!");
    }).catch((error) => {
        console.error("Email send error:", error);
    });
}