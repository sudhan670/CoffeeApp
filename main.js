// ============================
// SELECT ELEMENTS
// ============================
const searchBox = document.querySelector('.search-box');
const searchInput = document.querySelector('.search-box input');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('header');
const menuIcon = document.querySelector('#menu-icon');
const searchIcon = document.querySelector('#search-icon');
const cartIcon = document.querySelector('.bxs-cart');

// ============================
// MENU TOGGLE
// ============================
menuIcon.onclick = () => {
    navbar.classList.toggle('active');
    searchBox.classList.remove('active');
};

// ============================
// SEARCH TOGGLE
// ============================
searchIcon.onclick = () => {
    searchBox.classList.toggle('active');
    navbar.classList.remove('active');

    if (searchBox.classList.contains('active')) {
        searchInput.focus();
    }
};

// ============================
// CLOSE ON SCROLL
// ============================
window.onscroll = () => {
    navbar.classList.remove('active');
    searchBox.classList.remove('active');

    // Header shadow
    header.classList.toggle('shadow', window.scrollY > 0);
};

// ============================
// CLICK OUTSIDE TO CLOSE MENU
// ============================
document.addEventListener('click', (e) => {
    if (!menuIcon.contains(e.target) && !navbar.contains(e.target)) {
        navbar.classList.remove('active');
    }

    if (!searchBox.contains(e.target) && !searchIcon.contains(e.target)) {
        searchBox.classList.remove('active');
    }
});

// ============================
// ADD TO CART SYSTEM
// ============================
let cartCount = 0;

// Create cart badge
const cartBadge = document.createElement('span');
cartBadge.style.position = 'absolute';
cartBadge.style.top = '10px';
cartBadge.style.right = '10px';
cartBadge.style.background = 'red';
cartBadge.style.color = 'white';
cartBadge.style.fontSize = '12px';
cartBadge.style.padding = '2px 6px';
cartBadge.style.borderRadius = '50%';
cartBadge.innerText = '0';
cartIcon.parentElement.style.position = 'relative';
cartIcon.parentElement.appendChild(cartBadge);

// Load cart from storage
cartCount = localStorage.getItem('cartCount') || 0;
cartBadge.innerText = cartCount;

// Add to cart buttons
const addToCartBtns = document.querySelectorAll('.products-container .box a');

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        cartCount++;
        cartBadge.innerText = cartCount;

        localStorage.setItem('cartCount', cartCount);

        // small animation
        cartBadge.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartBadge.style.transform = 'scale(1)';
        }, 200);
    });
});

// ============================
// SEARCH FILTER (LIVE)
// ============================
searchInput.addEventListener('keyup', () => {
    const filter = searchInput.value.toLowerCase();
    const products = document.querySelectorAll('.products-container .box');

    products.forEach(product => {
        const title = product.querySelector('h3').innerText.toLowerCase();

        if (title.includes(filter)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

// ============================
// SMOOTH SCROLL
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
