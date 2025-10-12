const express = require('express');
const router = express.Router();

// Sample products data (make sure the path to products.json is correct)
const productsData = require('../data/products.json');

// Middleware for session-based cart management
router.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = [];  // Initialize the cart as an empty array in the session
    }
    next();
});



// View Cart
router.get('/', (req, res) => {
    const cart = req.session.cart;
    // Calculate total price of items in the cart
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    res.render('cart', { cart, total });
});

// Add to Cart
router.get('/cart/add/:id', (req, res) => {
    const productId = req.params.id;
    let product;

    // Find the product by its ID from the product data
    for (let category of productsData.categories) {
        product = category.products.find(p => p.id === productId);
        if (product) break; // Exit loop once product is found
    }

    // If product exists, add or update it in the cart
    if (product) {
        const cart = req.session.cart;
        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            existingProduct.quantity += 1;  // Increment quantity if already in cart
        } else {
            cart.push({ ...product, quantity: 1 });  // Add new item to cart with quantity 1
        }

        req.session.cart = cart;  // Save cart back to session
        res.redirect('/cart');  // Redirect to the cart page after adding
    } else {
        res.status(404).send('Product not found');  // Send 404 if product is not found
    }
});

// Remove from Cart
router.get('/remove-from-cart/:id', (req, res) => {
    const productId = req.params.id;
    const cart = req.session.cart;

    req.session.cart = cart.filter(item => item.id !== productId);  // Remove item from cart by ID
    res.redirect('/cart');  // Redirect to cart page after removal
});

module.exports = router;
