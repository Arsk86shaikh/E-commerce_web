import express from "express";
import axios from "axios";
import fs from "fs";
import path from "path";
import session from "express-session";
import productsRouter from "./routes/products.js"; // Ensure file uses ESM and has `.js` extension

import { fileURLToPath } from "url";
import { dirname } from "path";

// To replace __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Set up EJS view engine and static files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: true
}));

let productsData={
    "categore": [
        {
            "id": 1,
            "name": "Electronics",
            "products": [
                {
                    "id": 101,
                    "name": "Vivo v40 Pro",
                    "description": "V40 Pro 12GB+512GB Ganges Blue ZEISS Multifocal Portrait ZEISS Telephoto Portrait Camera ZEISS Style Portrait India’s slimmest smartphone in the 5500mAh battery category [2] Ultra-Slim 3D Curved Display IP68 Dust & Water Resistance ZEISS Cinematic Portrait Video AI Eraser",
                    "price": 53999,
                    "image": "/images/smartphone.png"
                },
                {
                    "id": 102,
                    "name": "Laptop",
                    "description": "Processor:13th Gen Intel® Core™ i9-13900HX (36 MB cache, 24 cores, 32 threads, up to 5.40 GHz Turbo) , Operating: Windows 11 Home Single Language, English Graphics: NVIDIA® GeForce RTX™ 4060, 8 GB GDDR6 Memory: 16 GB: 2 x 8 GB, DDR5, 4800 MT/s Storage:1TB, M.2, PCIe NVMe, SSD, Display: 16 QHD+ 2560x1600, 240Hz, Non-Touch, 100% DCI-P3, 3ms, ComfortView Plus, NVIDIA G-SYNC + DDS Metallic Nightshade with Black thermal shelf US English 1-Zone RGB Backlit Keyboard with G-Key",
                    "price": 40999,
                    "image": "/images/laptop.avif"
                },
                {
                    "id": 103,
                    "name": "HeadPhone",
                    "description": "Headphones are a pair of small loudspeaker drivers worn on or around the head over a user's ears. They are electroacoustic transducers, which convert an electrical signal to a corresponding sound.A headset is a combination of headphone and microphone. Talking Time: 19-22 Hours Music Playback: 19-22 Hours Full Charged: 4-5 hours Standby Time: Up to 22 Hours WIRELESS BLUETOOTH HEADPHONES Wireless Active Noise Cancellation | Supports Bluetooth version 4.0 | Aux-in Port Answer/End Calls, Play/Pause Music, Change Tracks, and Control Volume with a simple tap on the headphone.",
                    "price": 1259.99,
                    "image": "/images/headphone.jpg"
                },
                {
                    "id": 104,
                    "name": "Digital Camera",
                    "description": "Additional Info 24.3MP FX-Format CMOS Sensor | EXPEED 6 Image Processor | UHD 4K and Full HD Video Recording | 3.6m-Dot OLED Electronic Viewfinder | Limited 2-Year Warranty  Compact and capable, the Nikon Z 5 is an FX-format mirrorless camera with a well-rounded feature-set to suit both photo and video needs. Its 24.3MP CMOS sensor and EXPEED 6 processor afford wide sensitivity to ISO 51200, quick shooting at 4.5 fps, and UHD 4K video at 30 fps.",
                    "price": 60999,
                    "image": "/images/camera.jpeg"
                },
                {
                    "id": 105,
                    "name": "LCD Smart Tv",
                    "description": "Product Name: 32-Inch Full HD Smart Android LED TV Screen Type: LED Color: Black Panel Material: IPS Resolution: Full HD (1080p) Warranty: 1-Year Service Warranty Model Name/Number: 32-Inch LED TV Features: Smart TV with the latest Android version Pre-downloaded apps: YouTube, Netflix, Amazon ,Prime Video Screen mirroring: Mobile to TV wireless connection Slim design Full HD display (1080p)",
                    "price": 25999,
                    "image": "/images/Product1.jpeg"
                },
                {
                    "id": 106,
                    "name": "Wireless Earbuds",
                    "description": "Samsung Galaxy Buds 3 AI True Wireless Active Noise Cancelling Earbuds - Silver-  Condition:UsedUsed “Gently Used | Retail Box May Have Some Wear or Damage | Originally Packaged Accessories Included”",
                    "price": 8190.74,
                    "image": "https://i.ebayimg.com/images/g/xU8AAOSwCVFnfY4o/s-l1600.webp"
                }
            ]
        },
        {
            "id": 2,
            "name": "Fashion",
            "products": [
                {
                    "id": 201,
                    "name": "Sneakers",
                    "description": "Flexible rubber soles, comfortable build, and often more casual, fashionable design. Ensuring your comfort is not compromised, the SoftFoam+ sockliner nestles your feet in plush cushioning that lasts all day.",
                    "price": 1599,
                    "image": "/images/sneakers.jpg"
                },
                {
                    "id": 202,
                    "name": "Jacket",
                    "description": "Warm and trendy jacket with a stylish design, suitable for casual and formal wear.",
                    "price": 1119.99,
                    "image": "/images/jacket.jpg"
                },
                {
                    "id": 203,
                    "name": "Ladies Bags",
                    "description": "Stylish and spacious tote bag, perfect for carrying essentials with multiple compartments.",
                    "price": 709.99,
                    "image": "/images/bags.webp"
                },
                {
                    "id": 204,
                    "name": "Ladies Sandal",
                    "description": "Lightweight, open footwear designed for comfort and style, perfect for summer outings.",
                    "price": 2129,
                    "image": "/images/sandal.webp"
                },
                {
                    "id": 205,
                    "name": "Formal Combo",
                    "description": "A complete formal wear set, including a shirt and trousers, perfect for office and meetings.",
                    "price": 3019.99,
                    "image": "/images/combo.jpg"
                },
                {
                    "id": 206,
                    "name": "Loose Fit Printed T-shirt",
                    "description": "New Arrival T-shirt in midweight cotton jersey with print motifs, round, rib-trimmed neckline, dropped shoulders and a straight-cut hem. Loose fit for a generous but not oversized silhouette. Size: XS: Width: 100 cm, Length: 66 cm S: Width: 1.08 m, Length: 67 cm M: Width: 1.16 m, Length: 68 cm L: Width: 1.24 m, Length: 70 cm XL: Width: 1.32 m, Length: 71 cm XXL: Width: 1.40 m, Length: 72 cm",
                    "price": 799.00,
                    "image": "https://image.hm.com/assets/hm/be/f3/bef369b180af09f89ee09cc8c54c2bc8428548f9.jpg?imwidth=1260"
                },
                {
                    "id": 207,
                    "name": "Spykar",
                    "description": "Material typeCotton StyleClassic Closure typeButton Care instructionsMachine Wash Fit typeRegular Fit Rise styleMid Rise Country of OriginIndia",
                    "price": 1369,
                    "image": "https://m.media-amazon.com/images/I/61KkFzT7sXL._SX679_.jpg"
                }
            ]
        },
        {
            "id": 3,
            "name": "Living Items",
            "products": [
                {
                    "id": 301,
                    "name": "Sofa",
                    "description": "Comfortable and stylish sofa for your living room, available in multiple colors.",
                    "price": 24499.99,
                    "image": "/images/sofa.webp"
                },
                {
                    "id": 302,
                    "name": "Dining Table",
                    "description": "5x3 feet teak wood dining table set with six chairs, offering durability and elegance.",
                    "price": 1399.99,
                    "image": "/images/dining table.webp"
                },
                {
                    "id": 303,
                    "name": "Wooden Shelf",
                    "description": "Set of 4 stylish wooden floating shelves, easy to mount, and perfect for home decor.",
                    "price": 24499.99,
                    "image": "/images/wooden.jpg"
                },
                {
                    "id": 304,
                    "name": "FLANGES",
                    "description": "Durable flanges available in multiple sizes, ideal for home improvement and construction.",
                    "price": 1399.99,
                    "image": "/images/flanges.webp"
                },
                {
                    "id": 305,
                    "name": "Kitchen Furniture",
                    "description": "Modular kitchen cabinets with ample storage space, perfect for modern kitchens.",
                    "price": 1399.99,
                    "image": "/images/kitchen.webp"
                },
                {
                    "id": 306,
                    "name": "Bed Frame",
                    "description": "Jeometri Cairo Metal Platform Queen Bed Frame with Steel Slat Support for Living & Guest Room, Noise-Free, Extra Storage, Easy Assembly, 350kg Load Capacity, Portable & Storable, 1-Year Warranty  Size	Standard .Material	Metal Product Dimensions	2.04L x 1.51W x 0.97H Meters Special Feature	Metal Colour	Queen Finish Type	Powder Coated",
                    "price": 9999,
                    "image": "https://m.media-amazon.com/images/I/611267jWVLL._SX679_.jpg"
                },
                {
                    "id": 307,
                    "name": "Wardrobe",
                    "description": "Organza Plus 4 Door Wardrobe with Drawer and 1 Hanging Space (Dark Brown) ",
                    "price": 17410,
                    "image": "https://ik.imagekit.io/2xkwa8s1i/img/wardrobes/r1/WWRB4DH1ORGANZAPDBR1/1.jpg?tr=w-1200"
                }
            ]
        }
    ]
}


// Cart logic
let cart = [];

// 🏠 Home route
app.get("/", (req, res) => {
    res.render("home", { categore: productsData.categore });
});

// 👤 Login route (GET)
app.get("/login", (req, res) => {
    res.render("login", { error: null });
});

// 👤 Login route (POST)
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email === "admin@example.com" && password === "password") {
        req.session.user = { email };
        res.redirect("/profile");
    } else {
        res.render("login", { error: "Invalid email or password" });
    }
});

// 👤 Profile route (protected)
app.get("/profile", (req, res) => {
    if (!req.session.user) return res.redirect("/login");
    res.send(`<h2>Welcome, ${req.session.user.email}!</h2><a href="/logout">Logout</a>`);
});

// 🚪 Logout
app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

// 🛒 Buy Now route
app.post("/buy/:productId", (req, res) => {
    const productId = parseInt(req.params.productId);
    const product = productsData.categore
        .flatMap(cat => cat.products)
        .find(p => p.id === productId);

    if (!product) {
        return res.status(404).render("error", {
            message: "Product not found",
            error: {}
        });
    }

    const user = {
        _id: "dummyUserId",
        name: "John Doe"
    };

    const newOrder = {
        _id: "dummyOrderId",
        user: user._id,
        products: [{ product: product.id, quantity: 1 }],
        totalAmount: product.price,
        status: "Pending"
    };

    res.render("buy", { order: newOrder, product, user });
});

// ➕ Add to cart route
app.post("/cart/add/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const product = productsData.categore
        .flatMap(cat => cat.products)
        .find(p => p.id === productId);

    if (!product) return res.status(404).send("Product not found");

    cart.push(product);
    res.redirect("/cart");
});

app.post("/buy/:productId", (req, res) => {
    const productId = parseInt(req.params.productId);
    const product = productsData.categore
        .flatMap(cat => cat.products)
        .find(p => p.id === productId);

    if (!product) {
        return res.status(404).render("error", {
            message: "Product not found",
            error: {}
        });
    }

    const user = {
        _id: "dummyUserId",
        name: "John Doe"
    };

    const newOrder = {
        _id: "dummyOrderId",
        user: user._id,
        products: [{ product: product.id, quantity: 1 }],
        totalAmount: product.price,
        status: "Pending"
    };

    res.render("buy", { order: newOrder, product, user });
});

// 🧺 View cart route
app.get("/cart", (req, res) => {
    res.render("cart", { cart });
});

app.post("/cart/remove/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    cart = cart.filter(item => item.id !== productId);
    res.redirect("/cart");
});
app.get('/checkout', (req, res) => {
    // Example: assuming user has multiple cart products
    const cart = req.session.cart || [];
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    const product = {
        name: "All Products",
        price: totalPrice,
        image: "/images/checkout.png" // replace with a summary image
    };
    const order = { _id: "ORD" + Date.now() };

    res.render('checkoutForm', { product, order });
});

app.post("/cart/checkout", (req, res) => {
    // const cart = req.session.cart || [];

    if (cart.length === 0) return res.send("Cart is empty");

    const user = {
        _id: "dummyUserId",
        name: "John Doe"
    };

    const newOrder = {
        _id: "dummyOrderId",
        user: user._id,
        products: cart.map(p => ({
            productDetails: {
                id: p.id,
                name: p.name,
                price: p.price,
                image: p.image
            },
            quantity: 1
        })),
        totalAmount: cart.reduce((total, p) => total + p.price, 0),
        status: "Pending"
    };

    // Clear the cart after checkout
    req.session.cart = [];

    // Render confirmation page
    res.render("confimed", { order: newOrder, user });
});






// 📦 Product route handler
app.use("/products", productsRouter);

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
