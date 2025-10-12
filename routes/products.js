const express = require("express");
const router = express.Router();
const axios = require("axios");

const API_URL = "https://dummyjson.com/products"; // ✅ Free API with more product data

router.get("/", async (req, res) => {
    try {
        const response = await axios.get(API_URL);

        if (!response.data || !response.data.products) {
            throw new Error("Invalid API response format");
        }

        console.log("API Response:", JSON.stringify(response.data, null, 3));

        const products = response.data.products; // Extract product list

        // ✅ Organize products into categories
        const categories = [];
        const categoryMap = {};

        products.forEach(product => {
            const categoryName = product.category || "Uncategorized";

            if (!categoryMap[categoryName]) {
                categoryMap[categoryName] = {
                    name: categoryName,
                    products: [],
                };
                categories.push(categoryMap[categoryName]);
            }

            categoryMap[categoryName].products.push({
                id: product.id,
                name: product.title || "No Name",
                description: product.description || "No description available",
                price: `$${product.price.toFixed(2)}` || "N/A",
                image: product.thumbnail || "https://via.placeholder.com/150",
                brand: product.brand || "Unknown Brand",
                stock: product.stock || "N/A",
                rating: product.rating ? product.rating.toFixed(1) : "N/A"
            });
        });

        console.log("Processed Categories:", JSON.stringify(categories, null, 2));

        res.render("products", { categories });

    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).send("Error loading products. Please try again later.");
    }
});

module.exports = router;
