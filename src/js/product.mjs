// Products Page Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Initialize variables
    let currentPage = 1;
    const productsPerPage = 9;
    let allProducts = [];
    let filteredProducts = [];

    // DOM Elements
    const productsGrid = document.querySelector('.products-grid');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const ageFilter = document.getElementById('age-filter');
    const sortBy = document.getElementById('sort-by');

    // Utility function to format price
    function formatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    }

    // Update cart count in header
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelector('.cart-count').textContent = count;
    }

    // Show alert message
    function showAlert(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'api-alert';
        alertDiv.textContent = message;
        document.body.prepend(alertDiv);
        setTimeout(() => alertDiv.remove(), 3000);
    }

    // Fetch products from Best Buy API
    document.addEventListener('DOMContentLoaded', async function () {
        // DOM elements
        const productsGrid = document.querySelector('.products-grid');
        const loadingIndicator = document.getElementById('loading');

        // Show loading state
        loadingIndicator.style.display = 'block';
        productsGrid.innerHTML = '';

        try {
            // Try to fetch from API
            let products = await fetchToys();

            // If empty, use fallback
            if (!products || products.length === 0) {
                products = getFallbackToys();
                showAlert("Showing demo data - API unavailable");
            }

            // Render products
            renderProducts(products);

            // Cache for offline use
            localStorage.setItem('cachedToys', JSON.stringify(products));
        } catch (error) {
            console.error("Error:", error);
            renderProducts(getFallbackToys());
            showAlert("⚠️ Using offline demo data");
        } finally {
            loadingIndicator.style.display = 'none';
        }
    });

    // Fetch from Walmart affiliate API (demo mode)
    async function fetchToys() {
        const response = await fetch(`https://api.bluecartapi.com/request?api_key=7F5D6834A13048A282098FCBE16A9998&type=search&search_term=toys&sort_by=best_seller&size=12`);

        const data = await response.json();

        return data.search_results.map((item, index) => ({
            id: item.product.item_id || index,
            title: item.product.title,
            price: item.offers.primary?.price || (Math.random() * 50 + 10).toFixed(2),
            description: item.product.description || "Popular children's toy",
            image: item.product.images?.[0] || `https://via.placeholder.com/300?text=Toy+${index + 1}`,
            rating: Math.min(5, (Math.random() * 1.5 + 3.5)).toFixed(1), // 3.5-5 stars
            category: ['educational', 'plush', 'outdoor', 'arts'][index % 4]
        }));
    }


    // Helper functions for toy data
    function getRandomToyCategory() {
        const categories = ['educational', 'plush', 'outdoor', 'building', 'arts'];
        return categories[Math.floor(Math.random() * categories.length)];
    }

    function getRandomAgeGroup() {
        const ageGroups = ['0-1', '1-3', '3-5', '5-8', '8-12'];
        return ageGroups[Math.floor(Math.random() * ageGroups.length)];
    }

    function getRandomMaterials() {
        const materials = ['Plastic', 'Wood', 'Plush fabric', 'Rubber', 'Metal'];
        const count = Math.floor(Math.random() * 2) + 2; // 2-3 materials
        return materials
            .sort(() => 0.5 - Math.random())
            .slice(0, count)
            .join(', ');
    }

    // Fallback data if API fails
    function getFallbackToys() {
        return [
            {
                id: 1,
                title: "LEGO Classic Creative Brick Box",
                price: 29.99,
                description: "Build anything you can imagine with these colorful bricks!",
                category: "building",
                ageGroup: "5-8",
                rating: { rate: 4.8, count: 120 },
                image: "images/lego-bricks.jpg",
                stock: 35,
                materials: "Plastic",
                safetyInfo: "Non-toxic, BPA-free materials"
            },
            {
                id: 2,
                title: "Cuddly Teddy Bear",
                price: 19.99,
                description: "Soft and huggable teddy bear for bedtime comfort",
                category: "plush",
                ageGroup: "0-1",
                rating: { rate: 4.5, count: 85 },
                image: "images/teddy-bear.jpg",
                stock: 42,
                materials: "Plush fabric, Polyester filling",
                safetyInfo: "Machine washable, hypoallergenic"
            },
            {
                id: 3,
                title: "Junior Scientist Kit",
                price: 34.99,
                description: "Fun experiments to spark scientific curiosity",
                category: "educational",
                ageGroup: "8-12",
                rating: { rate: 4.7, count: 65 },
                image: "images/science-kit.jpg",
                stock: 18,
                materials: "Plastic, Paper",
                safetyInfo: "Adult supervision recommended"
            }
        ];
    }

    // Render products based on current page and filters
    function renderProducts() {
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

        productsGrid.innerHTML = productsToDisplay.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}" onerror="this.src='images/placeholder-toy.jpg'">
                    <a href="/src/products/product-details.html" class="quick-view" data-id="${product.id}">Quick View</a>
                </div>
                <div class="product-info">
                    <h3>${product.title}</h3>
                    <div class="product-price">${formatPrice(product.price)}</div>
                    <div class="product-rating">
                        ${'★'.repeat(Math.round(product.rating.rate))}${'☆'.repeat(5 - Math.round(product.rating.rate))} 
                        <span class="review-count">(${product.rating.count})</span>
                    </div>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');

        // Update pagination info
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;

        // Add event listeners
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', addToCart);
        });

        document.querySelectorAll('.quick-view').forEach(btn => {
            btn.addEventListener('click', quickView);
        });
    }

    // Filter products based on selected filters
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const priceRange = priceFilter.value;
        const ageGroup = ageFilter.value;
        const sortOption = sortBy.value;

        filteredProducts = allProducts.filter(product => {
            // Search filter
            const matchesSearch = product.title.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm);

            // Category filter
            const matchesCategory = !category || product.category === category;

            // Price filter
            let matchesPrice = true;
            if (priceRange) {
                const [min, max] = priceRange.split('-').map(Number);
                if (max) {
                    matchesPrice = product.price >= min && product.price <= max;
                } else {
                    matchesPrice = product.price >= min;
                }
            }

            // Age group filter
            const matchesAge = !ageGroup || product.ageGroup === ageGroup;

            return matchesSearch && matchesCategory && matchesPrice && matchesAge;
        });

        // Sort products
        switch (sortOption) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
                break;
            case 'newest':
                filteredProducts.sort((a, b) => b.id - a.id);
                break;
            default:
                // Featured (default sorting)
                filteredProducts.sort((a, b) => b.rating.rate * b.rating.count - a.rating.rate * a.rating.count);
                break;
        }

        currentPage = 1;
        renderProducts();
    }

    // Quick view functionality
    function quickView(e) {
        const productId = e.target.dataset.id;
        window.location.href = `product-detail.html?id=${productId}`;
    }

    // Add to cart functionality
    function addToCart(e) {
        const productId = parseInt(e.target.dataset.id);
        const product = allProducts.find(p => p.id === productId);

        if (!product) return;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if product already in cart
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();

        // Show feedback
        const btn = e.target;
        const originalText = btn.textContent;
        btn.textContent = 'Added!';
        btn.classList.add('added');
        setTimeout(() => {
            btn.textContent = originalText;
            btn.classList.remove('added');
        }, 2000);
    }

    // Pagination handlers
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderProducts();
        }
    });

    // Filter event listeners
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') filterProducts();
    });

    searchBtn.addEventListener('click', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('change', filterProducts);
    ageFilter.addEventListener('change', filterProducts);
    sortBy.addEventListener('change', filterProducts);

    // Initialize the page
    async function initialize() {
        // Try to load from cache first
        const cachedProducts = localStorage.getItem('cachedProducts');
        if (cachedProducts) {
            allProducts = JSON.parse(cachedProducts);
            filteredProducts = [...allProducts];
            renderProducts();
        }

        // Fetch fresh data
        const products = await fetchToys();

        if (products.length > 0) {
            allProducts = products;
            filteredProducts = [...products];
            localStorage.setItem('cachedProducts', JSON.stringify(products));
        } else {
            allProducts = getFallbackToys();
            filteredProducts = [...allProducts];
            showAlert("⚠️ Using demo data - API may be unavailable");
        }

        renderProducts();
        updateCartCount();
    }

    initialize();
});