function updateCategories() {
    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    console.log(categories);  // only for check
    const categoriesContainer = document.getElementById('categories-dynamic');
    categoriesContainer.innerHTML = '';  
    categories.forEach(category => {
        const card = `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card">
                    <div class="card-img-container">
                        <img class="card-img-top" src="${category.typeimage}" alt="${category.type}">
                    </div>
                    <div class="card-body">
                        <h1 class="card-title">${category.type}</h1>
                        <a href="${category.path}" class="btn">See More</a>
                    </div>
                </div>
            </div>
        `;
        categoriesContainer.innerHTML += card;
    });
}

document.addEventListener('DOMContentLoaded', updateCategories);
