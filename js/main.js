// Main application JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
            renderProducts(filteredProducts, 'productGrid');
        });
    }
    
    // Category filtering
    const categoryLinks = document.querySelectorAll('.nav-links a[data-category]');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            
            if (category === 'all') {
                renderProducts(products, 'productGrid');
            } else {
                const filteredProducts = products.filter(product => product.category === category);
                renderProducts(filteredProducts, 'productGrid');
            }
        });
    });
    
    // Sort functionality
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            let sortedProducts = [...products];
            
            switch(sortValue) {
                case 'price-low':
                    sortedProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    sortedProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'rating':
                    sortedProducts.sort((a, b) => b.rating - a.rating);
                    break;
                default:
                    // Default order
                    break;
            }
            
            renderProducts(sortedProducts, 'productGrid');
        });
    }
    
    // Load more products
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // In a real app, this would fetch more products from an API
            showToast('More products loaded!');
        });
    }
    
    // Newsletter subscription
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            showToast(`Thank you for subscribing with ${email}!`);
            this.reset();
        });
    }
    
    // Category card clicks
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent.toLowerCase();
            const filteredProducts = products.filter(product => product.category === categoryName);
            renderProducts(filteredProducts, 'productGrid');
            
            // Scroll to products section
            document.querySelector('.products').scrollIntoView({ behavior: 'smooth' });
        });
    });
});