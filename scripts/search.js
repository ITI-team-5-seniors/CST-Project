// search.js
function initializeSearch() {
    const searchInput = document.getElementById('navbarSearch');
    const searchResults = document.getElementById('search-results');

    if (!searchInput || !searchResults) {
        console.error('Search elements not found');
        return;
    }

    // Debounce the search to prevent too many lookups while typing
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchQuery = e.target.value.toLowerCase().trim();
            
            try {
                const products = JSON.parse(localStorage.getItem('products') || '[]');
                
                if (!searchQuery) {
                    searchResults.style.display = 'none';
                    return;
                }

                const filteredProducts = products.filter(product => 
                    product.name.toLowerCase().includes(searchQuery) ||
                    product.description?.toLowerCase().includes(searchQuery) ||
                    product.type?.toLowerCase().includes(searchQuery)
                );

                searchResults.innerHTML = '';

                if (filteredProducts.length === 0) {
                    searchResults.innerHTML = `
                        <li class="list-group-item">No products found matching "${searchQuery}"</li>
                    `;
                } else {
                    // Only show first 5 results to keep the dropdown manageable
                    filteredProducts.slice(0, 5).forEach(product => {
                        const li = document.createElement('li');
                        li.className = 'list-group-item d-flex align-items-center';
                        li.innerHTML = `
                            <img src="${product.image}" alt="${product.name}" style="width: 40px; height: 40px; object-fit: contain; margin-right: 10px;">
                            <div class="flex-grow-1">
                                <div class="fw-bold">${product.name}</div>
                                <small class="text-muted">${product.type} - $${product.price}</small>
                            </div>
                            <button class="btn btn-sm btn-primary view-product" 
                                    data-id="${product.id}">View</button>
                        `;
                        
                        const viewButton = li.querySelector('.view-product');
                        viewButton.addEventListener('click', () => {
                            window.location.href = `Product_Info.html?id=${product.id}`;
                        });
                        
                        searchResults.appendChild(li);
                    });

                    // Add a "Show all results" link if there are more than 5 matches
                    if (filteredProducts.length > 5) {
                        const showAllLi = document.createElement('li');
                        showAllLi.className = 'list-group-item text-center text-primary';
                        showAllLi.style.cursor = 'pointer';
                        showAllLi.textContent = `Show all ${filteredProducts.length} results`;
                        showAllLi.addEventListener('click', () => {
                            window.location.href = `Product_Listing.html?search=${encodeURIComponent(searchQuery)}`;
                        });
                        searchResults.appendChild(showAllLi);
                    }
                }

                searchResults.style.display = 'block';
            } catch (error) {
                console.error('Error processing search:', error);
                searchResults.innerHTML = `
                    <li class="list-group-item text-danger">
                        An error occurred while searching. Please try again.
                    </li>
                `;
                searchResults.style.display = 'block';
            }
        }, 300); // 300ms delay
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSearch);

export { initializeSearch };