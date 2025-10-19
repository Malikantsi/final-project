import { updateCartCount } from './utils.mjs';



// hero-container 
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.nav-dot');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Show the selected slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    // Function to go to next slide
    function nextSlide() {
        let newSlide = currentSlide + 1;
        if (newSlide >= slides.length) {
            newSlide = 0;
        }
        showSlide(newSlide);
    }

    // Set up automatic rotation
    let slideTimer = setInterval(nextSlide, slideInterval);

    // Pause on hover
    const slideshow = document.querySelector('.hero-slideshow');
    slideshow.addEventListener('mouseenter', () => {
        clearInterval(slideTimer);
    });

    slideshow.addEventListener('mouseleave', () => {
        slideTimer = setInterval(nextSlide, slideInterval);
    });

    // Click on dots to navigate
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideTimer);
            showSlide(index);
            slideTimer = setInterval(nextSlide, slideInterval);
        });
    });
});

// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.querySelector('.nav-menu');
const cartBtn = document.querySelector('.cart-btn');
const cartCount = document.querySelector('.cart-count');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('show');
    console.log("I totally agree");
});

window.addEventListener('resize', () => {
    const element = document.querySelector('header');
    var ElementHeight = element.offsetHeight;
    mainNav.style.top = `${ElementHeight}px`;
});



// Initialize cart count
updateCartCount(cartCount);



// Fetch API Helper
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Load Featured Products on Homepage
if (document.querySelector('.products-grid')) {
    async function loadFeaturedProducts() {
        const products = await fetchData('https://scout-amazon-data.p.rapidapi.com/search?keyword=toys');
        if (products && products.products) {
            renderProducts(products.products, '.products-grid');
        }
    }

    function renderProducts(products, containerSelector) {
        const container = document.querySelector(containerSelector);
        container.innerHTML = products.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.thumbnail}" alt="${product.title}">
                    <button class="quick-view" data-id="${product.id}">Quick View</button>
                </div>
                <div class="product-info">
                    <h3>${product.title}</h3>
                    <div class="product-price">${formatPrice(product.price)}</div>
                    <div class="product-rating">${'★'.repeat(Math.round(product.rating))} ${'☆'.repeat(5 - Math.round(product.rating))}</div>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `).join('');

        // Add event listeners to "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }


    loadFeaturedProducts();
}

// Load Testimonials
if (document.querySelector('.testimonial-slider')) {
    const testimonials = [
        {
            name: "Sarah J.",
            role: "Parent of two",
            content: "WonderNest Finds has become my go-to for birthday gifts. The quality is always excellent and the kids love them!",
            rating: 5
        },
        {
            name: "Michael T.",
            role: "Grandfather",
            content: "I appreciate the educational toys selection. My grandson is learning while having fun - perfect combination!",
            rating: 4
        },
        {
            name: "Lisa M.",
            role: "Teacher",
            content: "I regularly purchase classroom toys from WonderNest. The prices are fair and the products hold up well with lots of use.",
            rating: 5
        }
    ];

    function renderTestimonials() {
        const slider = document.querySelector('.testimonial-slider');
        slider.innerHTML = testimonials.map(testimonial => `
        <div class="testimonial">
            <div class="testimonial-rating">
                ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}
            </div>
            <p class="testimonial-content">"${testimonial.content}"</p>
            <div class="testimonial-author">
                <strong>${testimonial.name}</strong>
                <span>${testimonial.role}</span>
            </div>
        </div>
    `).join('');
    }

    renderTestimonials();
}
