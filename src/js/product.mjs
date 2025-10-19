import { formatPrice, setLocalStorage, getLocalStorage, updateCartCount, setupMobileMenu } from './utils.mjs';

//hambutton
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.nav-menu');

    if (mobileMenuBtn && mainNav) {
        setupMobileMenu(mobileMenuBtn, mainNav);
    } else {
        console.warn('Mobile menu elements not found.');
    }
});
// Products Page Functionality

document.addEventListener('DOMContentLoaded', function () {
    // Initialize variables
    let currentPage = 1;
    const productsPerPage = 9;
    let allProducts = [];
    let filteredProducts = [];



    // DOM Elements
    const productsGrid = document.querySelector('.products-grid');
    const prevPageBtn = document.querySelector('#prev-page');
    const nextPageBtn = document.querySelector('#next-page');
    const pageInfo = document.querySelector('#page-info');
    const searchInput = document.querySelector('#search-input');
    const searchBtn = document.querySelector('#search-btn');
    const categoryFilter = document.querySelector('#category-filter');
    const priceFilter = document.querySelector('#price-filter');

    const sortBy = document.querySelector('#sort-by');


    // Update cart count in header
    /*function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelector('.cart-count').textContent = count;
    }*/

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
        var productarray;
        const response = await fetch("https://scout-amazon-data.p.rapidapi.com/Amazon-Search-Data?query=toys&region=US&sort_by=RELEVANCE&page=1", {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "e60a9d86cemsh8b4e1f6d4cef00fp165b60jsneed46343db87",
                "X-RapidAPI-Host": "scout-amazon-data.p.rapidapi.com"//x-rapidapi-host: 
            }
        }).then(res => res.json())
            .then(data => {
                productarray = data;
                if (data && data.data) {
                    container.innerHTML = data.data.map(item => `
                    <div >
                        <img src="${item.image}" alt="${item.title}" style="width:100%; height:auto;" />
                        <h4>True${item.title}</h4>
                        <p>Price: ${item.price}</p>
                    </div>`
                    ).join("");
                }
            })
            .catch(err => console.error(err));
        return productarray.products;

    }

    async function initialize() {
        // Try to load from cache first
        const cachedProducts = localStorage.getItem('cachedProducts');
        // console.log(getLocalStorage('cart'));
        if (cachedProducts) {
            allProducts = JSON.parse(cachedProducts);
            filteredProducts = [...allProducts];

            renderProducts();
        } else {

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
        var productsToDisplay = filteredProducts.slice(startIndex, endIndex);
        /*productsToDisplay = [
            {
                "asin": "B0CSFPL6JN",
                "product_title": "HEX BOTS Wall Crawler Gecko with Official Wall Climber Technology, Rechargeable Remote Control Robot Kids Toys, Prank Toys for Boys & Girls Ages 4 & Up",
                "product_price": "$24.97",
                "product_original_price": "$32.99",
                "product_star_rating": "4.4",
                "product_num_ratings": "",
                "product_image": "https://m.media-amazon.com/images/I/81bJ65CAFIL._AC_UL320_.jpg",
                "is_prime": true,
                "amount_sold": "20K+ bought in past month",
                "delivery_info": "FREE delivery Thu, Oct 23 on $35 of items shipped by Amazon Or fastest delivery Tomorrow, Oct 19",
                "productStatus": "Best Seller"
            },
            {
                "asin": "B08FCRF2Q3",
                "product_title": "Kinetic Sand Scents, Ice Cream Treats Playset with 3 Colors Scented Play Sand & 6 Tools, Sensory Toys, Holiday Gifts & Stocking Stuffers for Kids Ages 3 and up",
                "product_price": "$9.48",
                "product_original_price": "$15.99",
                "product_star_rating": "4.7",
                "product_num_ratings": "",
                "product_image": "https://m.media-amazon.com/images/I/91M86uflhuL._AC_UL320_.jpg",
                "is_prime": true,
                "amount_sold": "7K+ bought in past month",
                "delivery_info": "FREE delivery Thu, Oct 23 on $35 of items shipped by Amazon Or fastest delivery Tomorrow, Oct 19",
                "productStatus": "Overall Pick"
            },
            {
                "asin": "B0BGLTYW59",
                "product_title": "Magnetic Tiles Kids Toys STEM Magnet Toy for Toddler Magnetic Blocks Building Preschool Learning Sensory Montessori Toys for 3+ Year Old Boys and Girls, Safe Creativity Toddler Kids Toy 40PCS",
                "product_price": "$17.98",
                "product_original_price": "$29.98",
                "product_star_rating": "4.8",
                "product_num_ratings": "",
                "product_image": "https://m.media-amazon.com/images/I/81a666v83iL._AC_UL320_.jpg",
                "is_prime": true,
                "amount_sold": "10K+ bought in past month",
                "delivery_info": "FREE delivery Thu, Oct 23 on $35 of items shipped by Amazon Or fastest delivery Mon, Oct 20",
                "productStatus": "Best Seller"
            },
            {
                "asin": "B0FGXMYVYQ",
                "product_title": "Toddler Toy 10 Pcs Interactive Retriever Robot Dog Toy - Walking & Stuffed Puppy with Stethoscope for Vet Role Play, Educational Toddler Gifts for 3 Year Old Girl",
                "product_price": "$5.99",
                "product_original_price": "",
                "product_star_rating": "4.3",
                "product_num_ratings": "",
                "product_image": "https://m.media-amazon.com/images/I/71JNAY+pJmL._AC_UL320_.jpg",
                "is_prime": true,
                "amount_sold": "800+ bought in past month",
                "delivery_info": "FREE delivery Thu, Oct 23 on $35 of items shipped by Amazon Or fastest delivery Tomorrow, Oct 19",
                "productStatus": "New Arrival Pick"
            },
            {
                "asin": "B0DG2VRFV7",
                "product_title": "30 Pack Squishy Toys, Kawaii Squishies Party Favors for Kids 4-8 8-12 Treasure Box Toys for Classroom Birthday Xmas Gifts Goodie Bag Mini Animals Mochi Squishy Stress Relief Sensory Toys Random",
                "product_price": "$7.99",
                "product_original_price": "$9.99",
                "product_star_rating": "4.6",
                "product_num_ratings": "",
                "product_image": "https://m.media-amazon.com/images/I/71HXqi9myuL._AC_UL320_.jpg",
                "is_prime": true,
                "amount_sold": "20K+ bought in past month",
                "delivery_info": "FREE delivery Thu, Oct 23 on $35 of items shipped by Amazon Or fastest delivery Tomorrow, Oct 19",
                "productStatus": "Limited time deal"
            },
            {
                "asin": "B01B1V10KA",
                "product_title": "Melissa & Doug Wooden Scoop & Serve Ice Cream Counter, Pretend Play Store, 28 Toy Food & Play Kitchen Accessories, Preschool Toys for Girls & Boys 3+",
                "product_price": "$39.97",
                "product_original_price": "$70.99",
                "product_star_rating": "4.9",
                "product_num_ratings": "",
                "product_image": "https://m.media-amazon.com/images/I/7106ox8f2jL._AC_UL320_.jpg",
                "is_prime": true,
                "amount_sold": "10K+ bought in past month",
                "delivery_info": "FREE delivery Thu, Oct 23 Or fastest delivery Tomorrow, Oct 19",
                "productStatus": "Best Seller"
            },
            {
                "asin": "B0FTMSQGZ4",
                "product_title": "Chuckle & Roar The Pop It! Book: Colors",
                "product_price": "$24.99",
                "product_original_price": "",
                "product_star_rating": "",
                "product_num_ratings": "",
                "product_image": "https://m.media-amazon.com/images/I/81HiHA9KGNL._AC_UL320_.jpg",
                "is_prime": true,
                "amount_sold": "",
                "delivery_info": "FREE delivery Nov 6 - 18 on $35 of items shipped by Amazon Or fastest delivery Nov 6 - 16",
                "productStatus": ""
            },
            {
                "asin": "B0CP41C4QN",
                "product_title": "POTATO HEAD Create Your Family Set with 44 Parts and Pieces, Creative Toddler and Preschool Toys for 2 Year Old Girls and Boys and Up (Amazon Exclusive)",
                "product_price": "$19.99",
                "product_original_price": "",
                "product_star_rating": "4.8",
                "product_num_ratings": "",
                "product_image": "https://m.media-amazon.com/images/I/71+v2oqAK3L._AC_UL320_.jpg",
                "is_prime": true,
                "amount_sold": "10K+ bought in past month",
                "delivery_info": "FREE delivery Thu, Oct 23 on $35 of items shipped by Amazon Or fastest delivery Tomorrow, Oct 19",
                "productStatus": "Best Seller"
            },
            {
                "asin": "B0CC5GTSQF",
                "product_title": "Goody King Magnetic Blocks |100PCS Magnetic Building Cube Game, Constructions Toys for Boys & Girls Age 3-4, 5 6 7 8 9 10, STEM Montessori Stacking Toy, Sensory Tiles Building Birthday for Toddlers",
                "product_price": "$21.62",
                "product_original_price": "$34.99",
                "product_star_rating": "4.6",
                "product_num_ratings": "",
                "product_image": "https://m.media-amazon.com/images/I/91RR+Mh95tL._AC_UL320_.jpg",
                "is_prime": true,
                "amount_sold": "3K+ bought in past month",
                "delivery_info": "FREE delivery Thu, Oct 23 on $35 of items shipped by Amazon Or fastest delivery Tomorrow, Oct 19",
                "productStatus": "Limited time deal"
            }
        ]*/
        console.log("Fixed Product Price that was causing display errors");
        productsGrid.innerHTML = productsToDisplay.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.product_image}" alt="${product.product_title}" onerror="this.src='images/placeholder-toy.jpg'">
                    <a href="/src/products/product-details.html" class="quick-view" data-id="${product.asin}">Quick View</a>
                </div>
                <div class="product-info">
                    <h3>${product.product_title}</h3>
                    <div class="product-price">${formatPrice(product.product_price.replace("$", ""))}</div>
                    <div class="product-rating">
                        ${'★'.repeat(Math.round(product.product_star_rating))}${'☆'.repeat(5 - Math.round(product.product_star_rating))} 
                        <span class="review-count">(${product.product_num_ratings})</span>
                    </div>
                    <button class="btn btn-primary add-to-cart" data-id="${product.asin}" id="${product.asin}" name="${product.asin}">
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
        const sortOption = sortBy.value;

        filteredProducts = allProducts.filter(product => {
            var ProductPrice = product.product_price.substring(1, product.product_price.length);
            // Search filter
            const matchesSearch = product.product_title.toLowerCase().includes(searchTerm) ||
                product.product_title.toLowerCase().includes(searchTerm);

            // Category filter
            const matchesCategory = !category || product.category === category;

            // Price filter
            let matchesPrice = true;

            if (priceRange) {
                const [min, max] = priceRange.split('-').map(Number);
                if (max) {
                    matchesPrice = ProductPrice >= min && ProductPrice <= max;

                } else {
                    matchesPrice = ProductPrice >= min;
                }
            }


            return matchesSearch && matchesCategory && matchesPrice;
        });

        // Sort products
        switch (sortOption) {
            case 'price-low':
                filteredProducts.sort((a, b) => {
                    const priceA = parseFloat(a.product_price.replace('$', '')) || 0;
                    const priceB = parseFloat(b.product_price.replace('$', '')) || 0;
                    return priceA - priceB;
                });
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => {
                    const priceA = parseFloat(a.product_price.replace('$', '')) || 0;
                    const priceB = parseFloat(b.product_price.replace('$', '')) || 0;
                    return priceA - priceB;
                });
                break;
            case 'rating':
                filteredProducts.sort((a, b) => b.product_num_ratings - a.product_num_ratings);
                break;
            case 'newest':
                filteredProducts.sort((a, b) => b.asin - a.asin);
                break;
            default:
                // Featured (default sorting)
                filteredProducts.sort((a, b) => b.product_star_rating * b.product_num_ratings - a.product_star_rating * a.product_num_ratings);
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
        var productId = e.target.id;

        const product = allProducts.find(p =>
            p.asin === productId);

        try {
            console.log(product);
            setLocalStorage('cart', product);
            updateCartCount();

        } catch (error) {
            console.log(error);
        }
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
    // ageFilter.addEventListener('change', filterProducts);
    sortBy.addEventListener('change', filterProducts);

    // Initialize the page


    initialize();
});