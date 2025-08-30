// Mock product data
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        category: "electronics",
        price: 79.99,
        originalPrice: 129.99,
        discount: 38,
        rating: 4.5,
        reviews: 128,
        image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSWcRxwludDuwgaDJOssa0Wfk5Rh28iaIhTztpRMQGNT_0rZzuLUtVe6fX092bBtw-vYNDcrN9xR_N8XbnvrmdCvcLM897xq5sUxLWbvt4",
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "Premium Cotton T-Shirt",
        category: "fashion",
        price: 24.99,
        originalPrice: 39.99,
        discount: 37,
        rating: 4.3,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "Smart Home Security Camera",
        category: "electronics",
        price: 89.99,
        originalPrice: 149.99,
        discount: 40,
        rating: 4.7,
        reviews: 203,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85c4a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "New"
    },
    {
        id: 4,
        name: "Stylish Leather Wallet",
        category: "fashion",
        price: 34.99,
        originalPrice: 49.99,
        discount: 30,
        rating: 4.4,
        reviews: 67,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        name: "Modern Table Lamp",
        category: "home",
        price: 54.99,
        originalPrice: 79.99,
        discount: 31,
        rating: 4.6,
        reviews: 92,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        name: "Anti-Aging Face Cream",
        category: "beauty",
        price: 29.99,
        originalPrice: 44.99,
        discount: 33,
        rating: 4.2,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 7,
        name: "Running Shoes",
        category: "sports",
        price: 89.99,
        originalPrice: 129.99,
        discount: 31,
        rating: 4.8,
        reviews: 312,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Hot Deal"
    },
    {
        id: 8,
        name: "Wireless Charging Pad",
        category: "electronics",
        price: 24.99,
        originalPrice: 39.99,
        discount: 37,
        rating: 4.1,
        reviews: 78,
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];

// Function to render products
function renderProducts(productsToRender, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = productsToRender.map(product => `
        <div class="product-card" data-id="${product.id}">
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-actions">
                    <button class="action-btn" title="Add to Wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="action-btn" title="Quick View">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    <div class="rating-stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                    <span class="discount">${product.discount}% off</span>
                </div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Generate star rating HTML
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Initialize products on page load
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(products, 'productGrid');
});