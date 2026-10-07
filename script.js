/* ================================================================
   TopLap – Cyber-Luxe High-Tech Application Logic
   ================================================================ */

// ========== COMPREHENSIVE PRODUCT CATALOG ==========
const PRODUCTS = [
  // LAPTOPS
  { 
    id: 1, 
    name: "Dell XPS 15 OLED", 
    category: "laptops", 
    brand: "dell", 
    price: 149999, 
    oldPrice: 175000, 
    rating: 4.9, 
    reviews: 312, 
    image: "images/laptop.png", 
    badge: "New", 
    stock: 4,
    specsSummary: "Intel Core i9 14th Gen | 32GB DDR5 | 1TB NVMe | RTX 4060",
    specs: {
      cpu: "Intel Core i9-14900H (14-core, up to 5.4 GHz)",
      gpu: "NVIDIA GeForce RTX 4060 8GB GDDR6",
      ram: "32GB DDR5 5600MHz",
      storage: "1TB M.2 PCIe Gen4 NVMe SSD",
      display: "15.6\" 3.5K (3456x2160) OLED InfinityEdge Touch 500 nits",
      battery: "86Whr with 130W Type-C Fast Charging (up to 10 hrs)",
      os: "Windows 11 Pro 64-bit",
      weight: "1.92 kg"
    },
    variants: [
      { ram: "16GB RAM / 512GB SSD", priceOffset: -18000 },
      { ram: "32GB RAM / 1TB SSD", priceOffset: 0 },
      { ram: "64GB RAM / 2TB SSD", priceOffset: 28000 }
    ]
  },
  { 
    id: 2, 
    name: "ASUS ROG Zephyrus G16", 
    category: "laptops", 
    brand: "asus", 
    price: 189999, 
    oldPrice: 220000, 
    rating: 4.8, 
    reviews: 245, 
    image: "images/laptop2.png", 
    badge: "Hot", 
    stock: 3,
    specsSummary: "AMD Ryzen 9 8945HS | 32GB RAM | 1TB SSD | RTX 4080",
    specs: {
      cpu: "AMD Ryzen 9 8945HS with Ryzen AI (up to 5.2 GHz)",
      gpu: "NVIDIA GeForce RTX 4080 12GB GDDR6 (115W TGP)",
      ram: "32GB LPDDR5X 7467MHz",
      storage: "1TB PCIe 4.0 NVMe M.2 Performance SSD",
      display: "16.0\" 2.5K 240Hz 0.2ms ROG Nebula OLED G-SYNC Display",
      battery: "90Whr 4-cell Li-ion with 100W PD charging",
      os: "Windows 11 Home",
      weight: "1.85 kg"
    },
    variants: [
      { ram: "16GB RAM / 1TB SSD", priceOffset: -15000 },
      { ram: "32GB RAM / 1TB SSD", priceOffset: 0 },
      { ram: "32GB RAM / 2TB SSD", priceOffset: 16000 }
    ]
  },
  { 
    id: 3, 
    name: "Lenovo ThinkPad X1 Carbon Gen 12", 
    category: "laptops", 
    brand: "lenovo", 
    price: 124999, 
    oldPrice: 145000, 
    rating: 4.7, 
    reviews: 187, 
    image: "images/laptop.png", 
    badge: "Sale", 
    stock: 7,
    specsSummary: "Intel Core Ultra 7 155H | 16GB RAM | 512GB SSD | 14\" IPS",
    specs: {
      cpu: "Intel Core Ultra 7 155H (16-core with Intel AI Boost)",
      gpu: "Intel Arc Graphics Integrated",
      ram: "16GB LPDDR5X 6400MHz",
      storage: "512GB M.2 2280 PCIe Gen4 SSD",
      display: "14.0\" 2.8K OLED Anti-Glare 120Hz 400 nits HDR500",
      battery: "57Whr Rapid Charge (80% in 60 min)",
      os: "Windows 11 Pro",
      weight: "1.09 kg"
    },
    variants: [
      { ram: "16GB RAM / 512GB SSD", priceOffset: 0 },
      { ram: "32GB RAM / 1TB SSD", priceOffset: 21000 }
    ]
  },
  { 
    id: 4, 
    name: "Dell Inspiron 14 Plus", 
    category: "laptops", 
    brand: "dell", 
    price: 79999, 
    oldPrice: 95000, 
    rating: 4.5, 
    reviews: 423, 
    image: "images/laptop2.png", 
    badge: null, 
    stock: 12,
    specsSummary: "Intel Core i5 13th Gen | 16GB RAM | 512GB SSD | 14\" FHD",
    specs: {
      cpu: "Intel Core i5-13500H (12 cores, up to 4.7 GHz)",
      gpu: "Intel Iris Xe Graphics",
      ram: "16GB LPDDR5 4800MHz",
      storage: "512GB M.2 PCIe NVMe SSD",
      display: "14.0\" 2.2K (2240x1400) 16:10 300 nits ComfortView Plus",
      battery: "64Whr with ExpressCharge",
      os: "Windows 11 Home + MS Office 2021",
      weight: "1.66 kg"
    },
    variants: [
      { ram: "16GB RAM / 512GB SSD", priceOffset: 0 },
      { ram: "16GB RAM / 1TB SSD", priceOffset: 8000 }
    ]
  },
  { 
    id: 5, 
    name: "ASUS VivoBook Pro 16X", 
    category: "laptops", 
    brand: "asus", 
    price: 64999, 
    oldPrice: 75000, 
    rating: 4.4, 
    reviews: 536, 
    image: "images/laptop.png", 
    badge: "Sale", 
    stock: 9,
    specsSummary: "AMD Ryzen 7 7735HS | 16GB RAM | 512GB SSD | 16\" FHD+",
    specs: {
      cpu: "AMD Ryzen 7 7735HS 8-Core (up to 4.75 GHz)",
      gpu: "NVIDIA GeForce RTX 3050 4GB GDDR6",
      ram: "16GB DDR5 4800MHz",
      storage: "512GB M.2 NVMe PCIe 3.0 SSD",
      display: "16.0\" WUXGA 16:10 120Hz NanoEdge IPS-level",
      battery: "70Whr 3-cell Li-ion",
      os: "Windows 11 Home",
      weight: "1.90 kg"
    },
    variants: [
      { ram: "16GB RAM / 512GB SSD", priceOffset: 0 },
      { ram: "16GB RAM / 1TB SSD", priceOffset: 7000 }
    ]
  },
  { 
    id: 6, 
    name: "Lenovo IdeaPad Gaming 3", 
    category: "laptops", 
    brand: "lenovo", 
    price: 54999, 
    oldPrice: 69999, 
    rating: 4.6, 
    reviews: 712, 
    image: "images/laptop2.png", 
    badge: "Hot", 
    stock: 14,
    specsSummary: "AMD Ryzen 5 6600H | 8GB RAM | 512GB SSD | RTX 3050",
    specs: {
      cpu: "AMD Ryzen 5 6600H 6-Core (up to 4.5 GHz)",
      gpu: "NVIDIA GeForce RTX 3050 4GB GDDR6 (85W)",
      ram: "16GB DDR5 4800MHz (upgradable)",
      storage: "512GB SSD M.2 2242 PCIe 4.0x4 NVMe",
      display: "15.6\" FHD (1920x1080) IPS 120Hz 250 nits",
      battery: "45Whr with Rapid Charge Boost",
      os: "Windows 11 Home",
      weight: "2.31 kg"
    },
    variants: [
      { ram: "8GB RAM / 512GB SSD", priceOffset: -4000 },
      { ram: "16GB RAM / 512GB SSD", priceOffset: 0 },
      { ram: "16GB RAM / 1TB SSD", priceOffset: 6500 }
    ]
  },

  // MACBOOKS
  { 
    id: 7, 
    name: "MacBook Pro 14\" M3 Pro", 
    category: "macbooks", 
    brand: "apple", 
    price: 199999, 
    oldPrice: 219999, 
    rating: 5.0, 
    reviews: 892, 
    image: "images/macbook.png", 
    badge: "Flagship", 
    stock: 5,
    specsSummary: "Apple M3 Pro (11-CPU/14-GPU) | 18GB Unified | 512GB SSD",
    specs: {
      cpu: "Apple M3 Pro chip (11-core CPU with 5 performance cores)",
      gpu: "14-core GPU with hardware-accelerated ray tracing",
      ram: "18GB Unified Memory (150GB/s bandwidth)",
      storage: "512GB Ultra-fast PCIe SSD",
      display: "14.2\" Liquid Retina XDR (3024x1964) ProMotion 120Hz 1600 nits peak",
      battery: "70Whr Li-Polymer (up to 18 hours wireless web)",
      os: "macOS Sonoma (upgradable to Sequoia)",
      weight: "1.61 kg"
    },
    variants: [
      { ram: "18GB Unified / 512GB SSD", priceOffset: 0 },
      { ram: "18GB Unified / 1TB SSD", priceOffset: 20000 },
      { ram: "36GB Unified / 1TB SSD", priceOffset: 45000 }
    ]
  },
  { 
    id: 8, 
    name: "MacBook Air 15\" M3", 
    category: "macbooks", 
    brand: "apple", 
    price: 149999, 
    oldPrice: 164999, 
    rating: 4.9, 
    reviews: 1043, 
    image: "images/macbook.png", 
    badge: "Hot", 
    stock: 8,
    specsSummary: "Apple M3 (8-CPU/10-GPU) | 16GB Unified | 512GB SSD",
    specs: {
      cpu: "Apple M3 chip (8-core CPU with 4 performance cores)",
      gpu: "10-core GPU with Neural Engine (16-core)",
      ram: "16GB Unified Memory",
      storage: "512GB SSD Storage",
      display: "15.3\" Liquid Retina display with True Tone (500 nits)",
      battery: "66.5Whr Li-Po (up to 18 hours battery life)",
      os: "macOS Sonoma (fanless silent architecture)",
      weight: "1.51 kg"
    },
    variants: [
      { ram: "8GB Unified / 256GB SSD", priceOffset: -25000 },
      { ram: "16GB Unified / 512GB SSD", priceOffset: 0 },
      { ram: "24GB Unified / 512GB SSD", priceOffset: 22000 }
    ]
  },
  { 
    id: 9, 
    name: "MacBook Pro 16\" M3 Max", 
    category: "macbooks", 
    brand: "apple", 
    price: 299999, 
    oldPrice: 329999, 
    rating: 5.0, 
    reviews: 421, 
    image: "images/macbook.png", 
    badge: "Flagship", 
    stock: 2,
    specsSummary: "Apple M3 Max (14-CPU/30-GPU) | 36GB Unified | 1TB SSD",
    specs: {
      cpu: "Apple M3 Max (14-core CPU with 10 performance cores)",
      gpu: "30-core GPU with Dynamic Caching & Ray Tracing",
      ram: "36GB Unified Memory (300GB/s bandwidth)",
      storage: "1TB Superfast PCIe SSD",
      display: "16.2\" Liquid Retina XDR (3456x2234) ProMotion 120Hz",
      battery: "100Whr Li-Po (up to 22 hours video playback)",
      os: "macOS Sonoma / Studio Grade Mics / 6-speaker system",
      weight: "2.16 kg"
    },
    variants: [
      { ram: "36GB Unified / 1TB SSD", priceOffset: 0 },
      { ram: "48GB Unified / 1TB SSD", priceOffset: 45000 },
      { ram: "64GB Unified / 2TB SSD", priceOffset: 95000 }
    ]
  },
  { 
    id: 10, 
    name: "MacBook Air 13\" M2", 
    category: "macbooks", 
    brand: "apple", 
    price: 114999, 
    oldPrice: 124999, 
    rating: 4.9, 
    reviews: 2341, 
    image: "images/macbook.png", 
    badge: "Sale", 
    stock: 11,
    specsSummary: "Apple M2 (8-CPU/8-GPU) | 8GB Unified | 256GB SSD",
    specs: {
      cpu: "Apple M2 chip 8-core CPU (4 performance & 4 efficiency)",
      gpu: "8-core GPU with 100GB/s memory bandwidth",
      ram: "8GB Unified Memory",
      storage: "256GB SSD Storage",
      display: "13.6\" Liquid Retina display with LED-backlit IPS (500 nits)",
      battery: "52.6Whr Li-Po (up to 18 hours Apple TV app movie playback)",
      os: "macOS Sonoma (MagSafe 3 charging)",
      weight: "1.24 kg"
    },
    variants: [
      { ram: "8GB Unified / 256GB SSD", priceOffset: 0 },
      { ram: "16GB Unified / 512GB SSD", priceOffset: 24000 }
    ]
  },

  // TABLETS
  { 
    id: 11, 
    name: "iPad Pro 13\" M4 OLED", 
    category: "tablets", 
    brand: "apple", 
    price: 119999, 
    oldPrice: 139999, 
    rating: 4.9, 
    reviews: 654, 
    image: "images/tablet.png", 
    badge: "New", 
    stock: 4,
    specsSummary: "Apple M4 Chip | 8GB RAM | 256GB | Tandem Ultra Retina XDR",
    specs: {
      cpu: "Apple M4 chip (9-core CPU with 3 performance cores)",
      gpu: "10-core GPU with hardware-accelerated mesh shading",
      ram: "8GB RAM (120GB/s memory bandwidth)",
      storage: "256GB High-Speed Flash Storage",
      display: "13.0\" Tandem OLED Ultra Retina XDR (2752x2064) 1000 nits full-screen",
      battery: "38.99Whr rechargeable lithium-polymer (up to 10 hrs Wi-Fi)",
      os: "iPadOS 18 with Apple Intelligence",
      weight: "579 g (thinnest Apple product at 5.1mm)"
    },
    variants: [
      { ram: "256GB Wi-Fi", priceOffset: 0 },
      { ram: "512GB Wi-Fi", priceOffset: 20000 },
      { ram: "1TB Wi-Fi + Cellular", priceOffset: 55000 }
    ]
  },
  { 
    id: 12, 
    name: "iPad Air 11\" M2", 
    category: "tablets", 
    brand: "apple", 
    price: 74999, 
    oldPrice: 84999, 
    rating: 4.8, 
    reviews: 876, 
    image: "images/tablet2.png", 
    badge: "Hot", 
    stock: 6,
    specsSummary: "Apple M2 | 8GB RAM | 128GB | 11\" Liquid Retina",
    specs: {
      cpu: "Apple M2 chip 8-core CPU",
      gpu: "9-core GPU with 16-core Neural Engine",
      ram: "8GB RAM",
      storage: "128GB Flash Storage",
      display: "11.0\" Liquid Retina display with P3 wide color (500 nits)",
      battery: "28.93Whr rechargeable lithium-polymer",
      os: "iPadOS 18 (Supports Apple Pencil Pro)",
      weight: "462 g"
    },
    variants: [
      { ram: "128GB Wi-Fi", priceOffset: 0 },
      { ram: "256GB Wi-Fi", priceOffset: 10000 },
      { ram: "512GB Wi-Fi", priceOffset: 28000 }
    ]
  },
  { 
    id: 13, 
    name: "Samsung Galaxy Tab S9 Ultra", 
    category: "tablets", 
    brand: "samsung", 
    price: 109999, 
    oldPrice: 124999, 
    rating: 4.7, 
    reviews: 432, 
    image: "images/tablet.png", 
    badge: "Flagship", 
    stock: 5,
    specsSummary: "Snapdragon 8 Gen 2 | 12GB RAM | 256GB | 14.6\" Dynamic AMOLED 2X",
    specs: {
      cpu: "Qualcomm Snapdragon 8 Gen 2 for Galaxy (4nm)",
      gpu: "Adreno 740 GPU",
      ram: "12GB LPDDR5X",
      storage: "256GB UFS 4.0 (MicroSD expandable up to 1TB)",
      display: "14.6\" Dynamic AMOLED 2X (2960x1848) 120Hz HDR10+ with S Pen",
      battery: "11,200mAh with 45W Fast Charging",
      os: "Android 14 with One UI 6.1 and Galaxy AI",
      weight: "732 g (IP68 water/dust resistant)"
    },
    variants: [
      { ram: "256GB Wi-Fi + S-Pen", priceOffset: 0 },
      { ram: "512GB Wi-Fi + 5G", priceOffset: 22000 }
    ]
  },
  { 
    id: 14, 
    name: "Samsung Galaxy Tab S9 FE+", 
    category: "tablets", 
    brand: "samsung", 
    price: 44999, 
    oldPrice: 52999, 
    rating: 4.5, 
    reviews: 321, 
    image: "images/tablet2.png", 
    badge: null, 
    stock: 9,
    specsSummary: "Exynos 1380 | 8GB RAM | 128GB | 12.4\" 90Hz WQXGA",
    specs: {
      cpu: "Samsung Exynos 1380 5nm Octa-Core",
      gpu: "Mali-G68 MP5",
      ram: "8GB RAM",
      storage: "128GB internal (expandable to 1TB)",
      display: "12.4\" LCD 90Hz WQXGA (2560x1600) with IP68 S-Pen included",
      battery: "10,090mAh with 45W Super Fast Charging",
      os: "Android 14 with One UI 6",
      weight: "627 g"
    },
    variants: [
      { ram: "128GB Wi-Fi", priceOffset: 0 },
      { ram: "256GB 5G", priceOffset: 12000 }
    ]
  },
  { 
    id: 15, 
    name: "Lenovo Tab P12 Pro Gen 2", 
    category: "tablets", 
    brand: "lenovo", 
    price: 64999, 
    oldPrice: 74999, 
    rating: 4.6, 
    reviews: 218, 
    image: "images/tablet.png", 
    badge: "Sale", 
    stock: 8,
    specsSummary: "Snapdragon 870 | 8GB RAM | 256GB | 12.6\" AMOLED 120Hz",
    specs: {
      cpu: "Qualcomm Snapdragon 870 5G (up to 3.2 GHz)",
      gpu: "Adreno 650",
      ram: "8GB LPDDR5",
      storage: "256GB UFS 3.1",
      display: "12.6\" 2K (2560x1600) AMOLED 120Hz Dolby Vision 600 nits",
      battery: "10,200mAh with Quick Charge 4.0",
      os: "Android 13 (with Precision Pen 3)",
      weight: "565 g"
    },
    variants: [
      { ram: "8GB RAM / 256GB SSD", priceOffset: 0 }
    ]
  }
];

// ========== UTILITY HELPERS ==========
function formatPrice(n) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

function starsHTML(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(Math.max(0, 5 - full - half));
}

// ========== BACKEND API CONFIGURATION ==========
const API_BASE = (window.location.protocol === 'http:' || window.location.protocol === 'https:')
  ? '/api'
  : 'http://localhost:5000/api';

// ========== GLOBAL STORAGE STATE ==========
let cart = JSON.parse(localStorage.getItem("toplap_cart") || "[]");
let wishlist = JSON.parse(localStorage.getItem("toplap_wishlist") || "[]");
let comparisonList = JSON.parse(localStorage.getItem("toplap_compare") || "[]");
let activeCoupon = null; // e.g. { code: 'TOPLAP10', discountPercent: 10 }

function saveCart() { 
  localStorage.setItem("toplap_cart", JSON.stringify(cart)); 
}
function saveWishlist() { 
  localStorage.setItem("toplap_wishlist", JSON.stringify(wishlist)); 
}
function saveComparison() { 
  localStorage.setItem("toplap_compare", JSON.stringify(comparisonList)); 
}

// ========== PRODUCT CARD BUILDER ==========
function buildProductCard(p) {
  const isWishlisted = wishlist.includes(p.id);
  const isCompared = comparisonList.includes(p.id);
  const discountPercent = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;

  let badgeClass = "";
  if (p.badge === "Sale") badgeClass = "sale";
  else if (p.badge === "Hot") badgeClass = "hot";
  else if (p.badge === "Flagship") badgeClass = "flagship";

  return `
    <div class="product-card" data-id="${p.id}" data-cat="${p.category}" data-brand="${p.brand}">
      ${p.badge ? `<div class="product-badge ${badgeClass}">${p.badge}</div>` : ""}
      
      <div class="product-img">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        <div class="product-actions">
          <button class="action-btn" title="Quick View" onclick="openQuickView(${p.id})">👁️</button>
          <button class="action-btn ${isWishlisted ? 'active-heart' : ''}" title="Wishlist" onclick="toggleWishlist(${p.id}, this)">
            ${isWishlisted ? '♥' : '♡'}
          </button>
        </div>
      </div>

      <div class="product-info">
        <div class="product-category-brand">
          <span>${p.brand.toUpperCase()}</span>
          <span class="product-stock-tag">In Stock (${p.stock})</span>
        </div>

        <h3>${p.name}</h3>
        <p class="product-specs-summary">${p.specsSummary}</p>

        <div class="product-meta">
          <span class="stars">${starsHTML(p.rating)}</span>
          <span class="rating-count">(${p.reviews})</span>
        </div>

        <div class="product-price">
          <span class="price-current">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="price-old">${formatPrice(p.oldPrice)}</span>` : ""}
          ${discountPercent > 0 ? `<span class="price-discount-pill">-${discountPercent}%</span>` : ""}
        </div>

        <div class="product-card-bottom-actions">
          <button class="add-to-cart-btn" onclick="addToCart(${p.id})">
            🛒 Add to Cart
          </button>
          <button class="compare-toggle-btn ${isCompared ? 'active' : ''}" title="Compare Specs" onclick="toggleComparison(${p.id}, this)">
            ${isCompared ? '✓ Compare' : '+ Compare'}
          </button>
        </div>
      </div>
    </div>
  `;
}

// ========== TOAST NOTIFICATION ==========
let toastTimer;
function showToast(msg) {
  const t = document.getElementById("toast");
  const tMsg = document.getElementById("toastMsg");
  if (!t || !tMsg) return;
  tMsg.innerHTML = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 3200);
}

// ========== CART SYSTEM ==========
function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartUI() {
  const count = getCartCount();
  document.querySelectorAll("#cartCount, .cart-count").forEach(el => {
    el.textContent = count;
  });

  const cartItemsEl = document.getElementById("cartItems");
  const cartFooterEl = document.getElementById("cartFooter");
  const cartTotalEl = document.getElementById("cartTotal");

  if (!cartItemsEl) return;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="drawer-empty-state">
        <div class="empty-icon">🛒</div>
        <h3>Your Cart is Empty</h3>
        <p style="margin-top:6px;font-size:0.9rem;">Explore our high-performance laptops & tablets.</p>
        <a href="shop.html" class="btn-primary" style="margin-top:1.5rem;" onclick="closeCart()">Browse Shop →</a>
      </div>
    `;
    if (cartFooterEl) cartFooterEl.style.display = "none";
    return;
  }

  if (cartFooterEl) cartFooterEl.style.display = "block";

  let html = "";
  let subtotal = 0;

  cart.forEach(item => {
    const p = PRODUCTS.find(x => x.id === item.id);
    if (!p) return;
    const itemPrice = item.customPrice || p.price;
    const itemTotal = itemPrice * item.qty;
    subtotal += itemTotal;

    html += `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${p.image}" alt="${p.name}" />
        </div>
        <div class="cart-item-info">
          <h4>${p.name}</h4>
          ${item.variant ? `<p style="font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;">${item.variant}</p>` : ''}
          <div class="cart-item-price">${formatPrice(itemPrice)}</div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="changeQty(${p.id}, -1)">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${p.id}, 1)">+</button>
          </div>
        </div>
        <button class="remove-item-btn" onclick="removeFromCart(${p.id})" title="Remove item">🗑️</button>
      </div>
    `;
  });

  cartItemsEl.innerHTML = html;
  if (cartTotalEl) cartTotalEl.textContent = formatPrice(subtotal);
}

function addToCart(id, variantName = null, customPrice = null) {
  const item = cart.find(i => i.id === id && (!variantName || i.variant === variantName));
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;

  if (item) {
    item.qty++;
  } else {
    cart.push({
      id,
      qty: 1,
      variant: variantName,
      customPrice: customPrice || p.price
    });
  }

  saveCart();
  updateCartUI();
  showToast(`⚡ <strong>${p.name}</strong> added to your cart!`);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartUI();
  showToast(`Removed from cart.`);
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateCartUI();
}

function openCart() {
  document.getElementById("cartSidebar")?.classList.add("open");
  document.getElementById("cartOverlay")?.classList.add("open");
}

function closeCart() {
  document.getElementById("cartSidebar")?.classList.remove("open");
  document.getElementById("cartOverlay")?.classList.remove("open");
}

// ========== WISHLIST SYSTEM ==========
function updateWishlistCount() {
  const count = wishlist.length;
  document.querySelectorAll("#wishlistCount").forEach(el => el.textContent = count);
}

function toggleWishlist(id, btnElement = null) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;

  const index = wishlist.indexOf(id);
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast(`🤍 Removed <strong>${p.name}</strong> from Wishlist.`);
    if (btnElement) {
      btnElement.classList.remove("active-heart");
      btnElement.textContent = "♡";
    }
  } else {
    wishlist.push(id);
    showToast(`💙 Saved <strong>${p.name}</strong> to your Wishlist!`);
    if (btnElement) {
      btnElement.classList.add("active-heart");
      btnElement.textContent = "♥";
    }
  }

  saveWishlist();
  updateWishlistCount();
  renderWishlistItems();
}

function renderWishlistItems() {
  const listEl = document.getElementById("wishlistItems");
  if (!listEl) return;

  if (wishlist.length === 0) {
    listEl.innerHTML = `
      <div class="drawer-empty-state">
        <div class="empty-icon">💙</div>
        <h3>Your Wishlist is Empty</h3>
        <p style="margin-top:6px;font-size:0.9rem;">Click the heart icon on any device to save it for later.</p>
        <a href="shop.html" class="btn-primary" style="margin-top:1.5rem;" onclick="closeWishlist()">Browse Devices →</a>
      </div>
    `;
    return;
  }

  let html = "";
  wishlist.forEach(id => {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;

    html += `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${p.image}" alt="${p.name}" />
        </div>
        <div class="cart-item-info">
          <h4>${p.name}</h4>
          <div class="cart-item-price">${formatPrice(p.price)}</div>
          <button class="btn-primary" style="padding:6px 14px;font-size:0.8rem;margin-top:4px;" onclick="addToCart(${p.id}); toggleWishlist(${p.id});">
            Move to Cart 🛒
          </button>
        </div>
        <button class="remove-item-btn" onclick="toggleWishlist(${p.id})" title="Remove">✕</button>
      </div>
    `;
  });

  listEl.innerHTML = html;
}

function openWishlist() {
  renderWishlistItems();
  document.getElementById("wishlistSidebar")?.classList.add("open");
  document.getElementById("wishlistOverlay")?.classList.add("open");
}

function closeWishlist() {
  document.getElementById("wishlistSidebar")?.classList.remove("open");
  document.getElementById("wishlistOverlay")?.classList.remove("open");
}

// ========== DEVICE COMPARISON SYSTEM ==========
function updateComparisonDock() {
  const dock = document.getElementById("compareDock");
  const preview = document.getElementById("dockItemsPreview");
  const countEl = document.getElementById("dockCount");

  if (!dock) return;

  if (comparisonList.length === 0) {
    dock.classList.remove("visible");
    return;
  }

  dock.classList.add("visible");
  if (countEl) countEl.textContent = comparisonList.length;

  if (preview) {
    preview.innerHTML = comparisonList.map(id => {
      const p = PRODUCTS.find(x => x.id === id);
      if (!p) return "";
      return `
        <div class="dock-item-circle">
          <img src="${p.image}" alt="${p.name}" />
          <span class="dock-remove-item" onclick="event.stopPropagation(); toggleComparison(${p.id});" title="Remove">✕</span>
        </div>
      `;
    }).join("");
  }
}

function toggleComparison(id, btnElement = null) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;

  const index = comparisonList.indexOf(id);
  if (index > -1) {
    comparisonList.splice(index, 1);
    showToast(`Removed <strong>${p.name}</strong> from comparison.`);
    if (btnElement) {
      btnElement.classList.remove("active");
      btnElement.textContent = "+ Compare";
    }
  } else {
    if (comparisonList.length >= 3) {
      showToast(`⚠️ You can compare up to 3 devices simultaneously.`);
      return;
    }
    comparisonList.push(id);
    showToast(`Added <strong>${p.name}</strong> to comparison dock!`);
    if (btnElement) {
      btnElement.classList.add("active");
      btnElement.textContent = "✓ Compare";
    }
  }

  saveComparison();
  updateComparisonDock();
}

function openComparisonModal() {
  if (comparisonList.length === 0) {
    showToast("Select at least 1 device to compare.");
    return;
  }

  const modal = document.getElementById("compareModal");
  const container = document.getElementById("compareTableContainer");
  if (!modal || !container) return;

  const productsToCompare = comparisonList.map(id => PRODUCTS.find(x => x.id === id)).filter(Boolean);

  let html = `
    <table class="compare-table">
      <thead>
        <tr>
          <th>Device</th>
          ${productsToCompare.map(p => `
            <th>
              <div class="compare-prod-header">
                <img src="${p.image}" alt="${p.name}" />
                <h4>${p.name}</h4>
                <div class="compare-price">${formatPrice(p.price)}</div>
                <button class="add-to-cart-btn" style="margin:8px auto 0;padding:6px 14px;font-size:0.8rem;" onclick="addToCart(${p.id})">Add to Cart</button>
              </div>
            </th>
          `).join("")}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Processor</td>
          ${productsToCompare.map(p => `<td>${p.specs.cpu}</td>`).join("")}
        </tr>
        <tr>
          <td>Graphics (GPU)</td>
          ${productsToCompare.map(p => `<td>${p.specs.gpu}</td>`).join("")}
        </tr>
        <tr>
          <td>Memory (RAM)</td>
          ${productsToCompare.map(p => `<td>${p.specs.ram}</td>`).join("")}
        </tr>
        <tr>
          <td>Storage</td>
          ${productsToCompare.map(p => `<td>${p.specs.storage}</td>`).join("")}
        </tr>
        <tr>
          <td>Display</td>
          ${productsToCompare.map(p => `<td>${p.specs.display}</td>`).join("")}
        </tr>
        <tr>
          <td>Battery & Power</td>
          ${productsToCompare.map(p => `<td>${p.specs.battery}</td>`).join("")}
        </tr>
        <tr>
          <td>Operating System</td>
          ${productsToCompare.map(p => `<td>${p.specs.os}</td>`).join("")}
        </tr>
        <tr>
          <td>Weight</td>
          ${productsToCompare.map(p => `<td>${p.specs.weight}</td>`).join("")}
        </tr>
        <tr>
          <td>Action</td>
          ${productsToCompare.map(p => `
            <td>
              <button class="clear-filters" style="padding:6px 12px;font-size:0.75rem;" onclick="toggleComparison(${p.id}); openComparisonModal();">Remove</button>
            </td>
          `).join("")}
        </tr>
      </tbody>
    </table>
  `;

  container.innerHTML = html;
  modal.classList.add("open");
}

function closeComparisonModal() {
  document.getElementById("compareModal")?.classList.remove("open");
}

// ========== PRODUCT QUICK VIEW MODAL ==========
let activeQuickViewProduct = null;
let selectedVariantOffset = 0;
let selectedVariantName = null;

function openQuickView(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;

  activeQuickViewProduct = p;
  selectedVariantOffset = 0;
  selectedVariantName = p.variants ? p.variants[0].ram : null;

  const modal = document.getElementById("quickViewModal");
  if (!modal) return;

  document.getElementById("qvImg").src = p.image;
  document.getElementById("qvImg").alt = p.name;
  document.getElementById("qvTitle").textContent = p.name;
  document.getElementById("qvBrand").textContent = `${p.brand.toUpperCase()} • ${p.category.toUpperCase()}`;
  document.getElementById("qvStars").innerHTML = starsHTML(p.rating);
  document.getElementById("qvReviews").textContent = `(${p.reviews} verified reviews)`;
  
  updateQuickViewPrice();

  // Populate Specs Table
  const table = document.getElementById("qvSpecsTable");
  if (table) {
    table.innerHTML = `
      <tr><td>Processor</td><td>${p.specs.cpu}</td></tr>
      <tr><td>Graphics</td><td>${p.specs.gpu}</td></tr>
      <tr><td>Memory</td><td>${p.specs.ram}</td></tr>
      <tr><td>Storage</td><td>${p.specs.storage}</td></tr>
      <tr><td>Display</td><td>${p.specs.display}</td></tr>
      <tr><td>Battery</td><td>${p.specs.battery}</td></tr>
      <tr><td>Weight</td><td>${p.specs.weight}</td></tr>
    `;
  }

  // Populate Variant Buttons
  const variantsContainer = document.getElementById("qvVariantsContainer");
  if (variantsContainer) {
    if (p.variants && p.variants.length > 0) {
      variantsContainer.style.display = "block";
      const pillsRow = document.getElementById("qvVariantPills");
      pillsRow.innerHTML = p.variants.map((v, i) => `
        <button class="qv-pill-btn ${i === 0 ? 'active' : ''}" onclick="selectQvVariant(${i})">
          ${v.ram}
        </button>
      `).join("");
    } else {
      variantsContainer.style.display = "none";
    }
  }

  modal.classList.add("open");
}

function selectQvVariant(index) {
  if (!activeQuickViewProduct || !activeQuickViewProduct.variants) return;
  const v = activeQuickViewProduct.variants[index];
  selectedVariantOffset = v.priceOffset;
  selectedVariantName = v.ram;

  document.querySelectorAll(".qv-pill-btn").forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
  });

  updateQuickViewPrice();
}

function updateQuickViewPrice() {
  if (!activeQuickViewProduct) return;
  const finalPrice = activeQuickViewProduct.price + selectedVariantOffset;
  const priceEl = document.getElementById("qvPriceCurrent");
  const oldPriceEl = document.getElementById("qvPriceOld");
  
  if (priceEl) priceEl.textContent = formatPrice(finalPrice);
  if (oldPriceEl) {
    if (activeQuickViewProduct.oldPrice) {
      oldPriceEl.textContent = formatPrice(activeQuickViewProduct.oldPrice + selectedVariantOffset);
      oldPriceEl.style.display = "inline";
    } else {
      oldPriceEl.style.display = "none";
    }
  }
}

function addCurrentQuickViewToCart() {
  if (!activeQuickViewProduct) return;
  const finalPrice = activeQuickViewProduct.price + selectedVariantOffset;
  addToCart(activeQuickViewProduct.id, selectedVariantName, finalPrice);
  closeQuickView();
}

function closeQuickView() {
  document.getElementById("quickViewModal")?.classList.remove("open");
  activeQuickViewProduct = null;
}

// ========== GLOBAL LIVE SEARCH MODAL (Ctrl+K or /) ==========
function openSearchModal() {
  const modal = document.getElementById("searchModal");
  if (!modal) return;
  modal.classList.add("open");
  const input = document.getElementById("globalSearchInput");
  if (input) {
    input.value = "";
    input.focus();
    renderSearchResults("");
  }
}

function closeSearchModal() {
  document.getElementById("searchModal")?.classList.remove("open");
}

function renderSearchResults(query) {
  const container = document.getElementById("searchResultsList");
  if (!container) return;

  const cleanQuery = query.toLowerCase().trim();
  let matches = PRODUCTS;

  if (cleanQuery) {
    matches = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(cleanQuery) ||
      p.brand.toLowerCase().includes(cleanQuery) ||
      p.specsSummary.toLowerCase().includes(cleanQuery) ||
      p.category.toLowerCase().includes(cleanQuery)
    );
  } else {
    // Show top 5 recommended devices when input is blank
    matches = PRODUCTS.slice(0, 5);
  }

  if (matches.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:2.5rem 1rem;color:var(--text-muted);">
        <p style="font-size:1.2rem;margin-bottom:6px;">🔍 No devices found matching "${query}"</p>
        <p style="font-size:0.85rem;">Try searching for "MacBook", "RTX", "OLED", or "Lenovo".</p>
      </div>
    `;
    return;
  }

  container.innerHTML = matches.map(p => `
    <div class="search-result-item" onclick="openQuickView(${p.id}); closeSearchModal();">
      <div class="search-result-thumb">
        <img src="${p.image}" alt="${p.name}" />
      </div>
      <div class="search-result-info">
        <h4>${p.name}</h4>
        <p>${p.specsSummary}</p>
      </div>
      <div class="search-result-price">${formatPrice(p.price)}</div>
    </div>
  `).join("");
}

// ========== MULTI-STEP CHECKOUT SYSTEM ==========
let currentCheckoutStep = 1;
let checkoutCustomer = {};

function handleCheckout() {
  if (cart.length === 0) {
    showToast("Your cart is empty!");
    return;
  }
  closeCart();
  currentCheckoutStep = 1;
  activeCoupon = null;
  openCheckoutModal();
}

function openCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  if (!modal) return;
  modal.classList.add("open");
  renderCheckoutStep();
}

function closeCheckoutModal() {
  document.getElementById("checkoutModal")?.classList.remove("open");
}

function renderCheckoutStep() {
  const contentEl = document.getElementById("checkoutStepContent");
  const pills = document.querySelectorAll(".checkout-step-pill");
  pills.forEach((p, idx) => {
    p.classList.toggle("active", idx + 1 <= currentCheckoutStep);
  });

  const cartSubtotal = cart.reduce((sum, item) => {
    const p = PRODUCTS.find(x => x.id === item.id);
    return sum + ((item.customPrice || (p ? p.price : 0)) * item.qty);
  }, 0);

  let discountAmount = 0;
  if (activeCoupon) {
    if (activeCoupon.discountPercent) {
      discountAmount = Math.round(cartSubtotal * (activeCoupon.discountPercent / 100));
    } else if (activeCoupon.flatDiscount) {
      discountAmount = activeCoupon.flatDiscount;
    }
  }

  const finalTotal = Math.max(0, cartSubtotal - discountAmount);

  if (currentCheckoutStep === 1) {
    contentEl.innerHTML = `
      <h3 style="font-size:1.4rem;margin-bottom:0.4rem;">Step 1: Shipping & Delivery Details</h3>
      <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1.5rem;">Enter your contact information for order confirmation and tracking.</p>
      <form id="shippingForm" onsubmit="submitStep1(event)">
        <div class="form-row">
          <div class="form-group">
            <label>Full Name *</label>
            <input type="text" id="shipName" required placeholder="e.g. Aryan Sharma" value="${checkoutCustomer.name || ''}" />
          </div>
          <div class="form-group">
            <label>Phone Number *</label>
            <input type="tel" id="shipPhone" required placeholder="+91 98765 43210" value="${checkoutCustomer.phone || ''}" />
          </div>
        </div>
        <div class="form-group">
          <label>Email Address *</label>
          <input type="email" id="shipEmail" required placeholder="aryan@example.com" value="${checkoutCustomer.email || ''}" />
        </div>
        <div class="form-group">
          <label>Street Address *</label>
          <input type="text" id="shipAddress" required placeholder="Apartment, Studio, or Floor & Street" value="${checkoutCustomer.address || ''}" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>City *</label>
            <input type="text" id="shipCity" required placeholder="Bengaluru" value="${checkoutCustomer.city || ''}" />
          </div>
          <div class="form-group">
            <label>PIN Code *</label>
            <input type="text" id="shipPin" required placeholder="560001" value="${checkoutCustomer.pin || ''}" />
          </div>
        </div>
        <div style="display:flex;justify-content:flex-end;margin-top:1.5rem;">
          <button type="submit" class="btn-primary" style="padding:12px 30px;">
            Continue to Delivery & Voucher →
          </button>
        </div>
      </form>
    `;
  } else if (currentCheckoutStep === 2) {
    contentEl.innerHTML = `
      <h3 style="font-size:1.4rem;margin-bottom:0.4rem;">Step 2: Delivery & Promo Voucher</h3>
      <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1.5rem;">Apply discount coupons and select delivery speed.</p>
      
      <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:1.4rem;margin-bottom:1.5rem;">
        <h4 style="font-size:1rem;margin-bottom:8px;">Have a Promo Code?</h4>
        <div class="promo-apply-row">
          <input type="text" id="promoInput" placeholder="Try TOPLAP10 or TECH2025" value="${activeCoupon ? activeCoupon.code : ''}" />
          <button type="button" onclick="applyPromoCode()">Apply Code</button>
        </div>
        ${activeCoupon ? `<p style="color:var(--emerald-stock);font-size:0.85rem;margin-top:8px;font-weight:600;">✓ Voucher ${activeCoupon.code} applied successfully!</p>` : ''}
      </div>

      <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:1.4rem;margin-bottom:1.5rem;">
        <h4 style="font-size:1rem;margin-bottom:12px;">Order Cost Summary</h4>
        <div class="drawer-price-row"><span>Items Subtotal:</span><span>${formatPrice(cartSubtotal)}</span></div>
        <div class="drawer-price-row"><span>Express Delivery:</span><span style="color:var(--emerald-stock);">FREE</span></div>
        ${discountAmount > 0 ? `<div class="drawer-price-row" style="color:var(--emerald-stock);"><span>Discount:</span><span>-${formatPrice(discountAmount)}</span></div>` : ''}
        <div class="drawer-total-row" style="margin-top:10px;margin-bottom:0;">
          <span>Net Payable:</span><span>${formatPrice(finalTotal)}</span>
        </div>
      </div>

      <div style="display:flex;justify-content:space-between;margin-top:1.5rem;">
        <button type="button" class="btn-outline" onclick="currentCheckoutStep = 1; renderCheckoutStep();">← Back</button>
        <button type="button" class="btn-primary" onclick="currentCheckoutStep = 3; renderCheckoutStep();">Proceed to Payment →</button>
      </div>
    `;
  } else if (currentCheckoutStep === 3) {
    contentEl.innerHTML = `
      <h3 style="font-size:1.4rem;margin-bottom:0.4rem;">Step 3: Secure Payment</h3>
      <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1.2rem;">Choose your preferred instant payment method.</p>
      
      <div class="payment-options-grid">
        <div class="payment-card-opt selected" onclick="selectPaymentMethod('upi', this)">
          <span style="font-size:1.8rem;">📱</span>
          <div>
            <h4 style="font-size:0.95rem;">Instant UPI</h4>
            <p style="font-size:0.78rem;color:var(--text-muted);">GPay, PhonePe, Paytm, BHIM</p>
          </div>
        </div>
        <div class="payment-card-opt" onclick="selectPaymentMethod('card', this)">
          <span style="font-size:1.8rem;">💳</span>
          <div>
            <h4 style="font-size:0.95rem;">Credit / Debit Card</h4>
            <p style="font-size:0.78rem;color:var(--text-muted);">Visa, MasterCard, RuPay, Amex</p>
          </div>
        </div>
        <div class="payment-card-opt" onclick="selectPaymentMethod('netbanking', this)">
          <span style="font-size:1.8rem;">🏦</span>
          <div>
            <h4 style="font-size:0.95rem;">Net Banking</h4>
            <p style="font-size:0.78rem;color:var(--text-muted);">All major Indian banks</p>
          </div>
        </div>
        <div class="payment-card-opt" onclick="selectPaymentMethod('cod', this)">
          <span style="font-size:1.8rem;">📦</span>
          <div>
            <h4 style="font-size:0.95rem;">Cash on Delivery</h4>
            <p style="font-size:0.78rem;color:var(--text-muted);">Pay upon physical arrival</p>
          </div>
        </div>
      </div>

      <div id="upiPreviewBox" style="margin-top:1.5rem;background:var(--bg-card);border:1px solid var(--border-glow);border-radius:var(--radius-md);padding:1.4rem;text-align:center;">
        <p style="font-size:0.88rem;color:var(--text-light);margin-bottom:8px;">Scan with any UPI App or use UPI ID: <strong>toplap.pay@icici</strong></p>
        <div style="display:inline-block;background:#fff;padding:12px;border-radius:10px;margin:8px 0;">
          <span style="font-size:4rem;">🏁</span>
        </div>
        <p style="font-size:0.8rem;color:var(--text-muted);">Total: <strong>${formatPrice(finalTotal)}</strong> (256-bit Encrypted SSL)</p>
      </div>

      <div style="display:flex;justify-content:space-between;margin-top:2rem;">
        <button type="button" class="btn-outline" onclick="currentCheckoutStep = 2; renderCheckoutStep();">← Back</button>
        <button type="button" class="btn-primary" onclick="confirmOrder(${finalTotal})">
          Authorize & Place Order (${formatPrice(finalTotal)}) 🚀
        </button>
      </div>
    `;
  }
}

function submitStep1(e) {
  e.preventDefault();
  checkoutCustomer = {
    name: document.getElementById("shipName").value,
    phone: document.getElementById("shipPhone").value,
    email: document.getElementById("shipEmail").value,
    address: document.getElementById("shipAddress").value,
    city: document.getElementById("shipCity").value,
    pin: document.getElementById("shipPin").value,
  };
  currentCheckoutStep = 2;
  renderCheckoutStep();
}

async function applyPromoCode() {
  const code = document.getElementById("promoInput")?.value.trim().toUpperCase();
  if (!code) return;

  const cartSubtotal = cart.reduce((sum, item) => {
    const p = PRODUCTS.find(x => x.id === item.id);
    return sum + ((item.customPrice || (p ? p.price : 0)) * item.qty);
  }, 0);

  try {
    const res = await fetch(`${API_BASE}/coupons/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, subtotal: cartSubtotal })
    });
    const data = await res.json();
    if (data.success && data.coupon) {
      activeCoupon = data.coupon;
      showToast(`🎉 Promo code ${data.coupon.code} verified! ${data.coupon.discountPercent ? data.coupon.discountPercent + '% discount added.' : '₹' + data.coupon.flatDiscount + ' discount added.'}`);
      renderCheckoutStep();
      return;
    } else {
      showToast(`❌ ${data.message || 'Invalid coupon code.'}`);
      return;
    }
  } catch (err) {
    // Offline fallback
    if (code === "TOPLAP10") {
      activeCoupon = { code: "TOPLAP10", discountPercent: 10 };
      showToast("🎉 Promo code TOPLAP10 applied! 10% discount added.");
    } else if (code === "TECH2025") {
      activeCoupon = { code: "TECH2025", flatDiscount: 5000 };
      showToast("🎉 Promo code TECH2025 applied! ₹5,000 flat discount added.");
    } else {
      showToast("❌ Invalid promo code. Try TOPLAP10 or TECH2025.");
      return;
    }
    renderCheckoutStep();
  }
}

function selectPaymentMethod(type, element) {
  document.querySelectorAll(".payment-card-opt").forEach(el => el.classList.remove("selected"));
  element.classList.add("selected");
}

async function confirmOrder(amount) {
  let orderData = null;
  const paymentMethod = document.querySelector(".payment-card-opt.selected h4")?.textContent || "UPI";

  try {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: checkoutCustomer,
        items: cart,
        paymentMethod: paymentMethod.toLowerCase(),
        promoCode: activeCoupon ? activeCoupon.code : null,
        total: amount
      })
    });
    const data = await res.json();
    if (data.success && data.order) {
      orderData = data.order;
    }
  } catch (err) {
    console.warn("Backend offline, utilizing local order processing:", err);
  }

  const randomId = orderData ? orderData.orderId : ("TL-" + Math.floor(100000 + Math.random() * 900000));
  const deliveryStr = orderData ? orderData.estimatedDelivery : (() => {
    const d = new Date(); d.setDate(d.getDate() + 3);
    return d.toLocaleDateString("en-IN", { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });
  })();

  // Clear cart
  cart = [];
  saveCart();
  updateCartUI();

  const contentEl = document.getElementById("checkoutStepContent");
  contentEl.innerHTML = `
    <div class="celebration-box">
      <div class="celebration-icon">🎉</div>
      <h2 style="font-size:2rem;margin-bottom:0.6rem;">Order Confirmed!</h2>
      <p style="color:var(--text-light);max-width:500px;margin:0 auto 1.2rem;">
        Thank you for shopping with TopLap, <strong>${checkoutCustomer.name || 'Valued Customer'}</strong>. Your device is being prepared with premium shock-absorbent packaging.
      </p>
      <div class="celebration-order-id">Order ID: #${randomId}</div>
      <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:1.4rem;max-width:440px;margin:1.5rem auto;text-align:left;">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:0.9rem;">
          <span style="color:var(--text-muted)">Amount Paid:</span>
          <span style="font-weight:700;color:var(--primary);">${formatPrice(amount)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:0.9rem;">
          <span style="color:var(--text-muted)">Delivery Estimate:</span>
          <span style="font-weight:700;">${deliveryStr}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:0.9rem;">
          <span style="color:var(--text-muted)">Shipping To:</span>
          <span>${checkoutCustomer.city || 'Bengaluru'}, ${checkoutCustomer.pin || '560001'}</span>
        </div>
      </div>
      <div style="display:flex;justify-content:center;gap:12px;margin-top:2rem;">
        <button class="btn-primary" onclick="closeCheckoutModal()">Back to Browsing</button>
        <button class="btn-outline" onclick="window.print()">Print Receipt 🖨️</button>
      </div>
    </div>
  `;
}

// ========== INTERACTIVE TECH FINDER QUIZ (Homepage) ==========
let quizAnswers = { purpose: null, budget: null, os: null };
let currentQuizStep = 1;

function initTechQuiz() {
  const container = document.getElementById("quizContent");
  if (!container) return;
  renderQuizStep();
}

function renderQuizStep() {
  const container = document.getElementById("quizContent");
  if (!container) return;

  // Update progress bullets
  document.querySelectorAll(".quiz-step-bullet").forEach((bullet, idx) => {
    bullet.classList.toggle("active", idx + 1 === currentQuizStep);
    bullet.classList.toggle("completed", idx + 1 < currentQuizStep);
  });

  if (currentQuizStep === 1) {
    container.innerHTML = `
      <div class="quiz-question-title">Step 1 of 3: What is your primary use case?</div>
      <div class="quiz-options-grid">
        <div class="quiz-opt-btn ${quizAnswers.purpose === 'gaming' ? 'selected' : ''}" onclick="selectQuizAnswer('purpose', 'gaming')">
          <div class="quiz-opt-icon">🎮</div>
          <div class="quiz-opt-info">
            <h4>Hardcore Gaming & Streaming</h4>
            <p>High FPS, Ray Tracing, Dedicated RTX graphics</p>
          </div>
        </div>
        <div class="quiz-opt-btn ${quizAnswers.purpose === 'creative' ? 'selected' : ''}" onclick="selectQuizAnswer('purpose', 'creative')">
          <div class="quiz-opt-icon">🎨</div>
          <div class="quiz-opt-info">
            <h4>Creative Pro & Video Editing</h4>
            <p>4K Color-accurate displays, high RAM & rendering power</p>
          </div>
        </div>
        <div class="quiz-opt-btn ${quizAnswers.purpose === 'coding' ? 'selected' : ''}" onclick="selectQuizAnswer('purpose', 'coding')">
          <div class="quiz-opt-icon">💻</div>
          <div class="quiz-opt-info">
            <h4>Software Engineering & AI</h4>
            <p>Fast multicore compiling, Docker, Unix/Linux flexibility</p>
          </div>
        </div>
        <div class="quiz-opt-btn ${quizAnswers.purpose === 'mobility' ? 'selected' : ''}" onclick="selectQuizAnswer('purpose', 'mobility')">
          <div class="quiz-opt-icon">✈️</div>
          <div class="quiz-opt-info">
            <h4>Business & All-Day Mobility</h4>
            <p>Ultra-thin, 15+ hour battery life, featherweight design</p>
          </div>
        </div>
      </div>
      <div class="quiz-nav-btns" style="justify-content:flex-end;">
        <button class="btn-primary" onclick="proceedQuizStep(2)">Next Step →</button>
      </div>
    `;
  } else if (currentQuizStep === 2) {
    container.innerHTML = `
      <div class="quiz-question-title">Step 2 of 3: What is your targeted budget?</div>
      <div class="quiz-options-grid">
        <div class="quiz-opt-btn ${quizAnswers.budget === 'budget' ? 'selected' : ''}" onclick="selectQuizAnswer('budget', 'budget')">
          <div class="quiz-opt-icon">🏷️</div>
          <div class="quiz-opt-info">
            <h4>Under ₹75,000</h4>
            <p>Outstanding value without breaking the bank</p>
          </div>
        </div>
        <div class="quiz-opt-btn ${quizAnswers.budget === 'mid' ? 'selected' : ''}" onclick="selectQuizAnswer('budget', 'mid')">
          <div class="quiz-opt-icon">⚡</div>
          <div class="quiz-opt-info">
            <h4>₹75,000 – ₹1,50,000</h4>
            <p>The sweet spot of performance and luxury build</p>
          </div>
        </div>
        <div class="quiz-opt-btn ${quizAnswers.budget === 'premium' ? 'selected' : ''}" onclick="selectQuizAnswer('budget', 'premium')">
          <div class="quiz-opt-icon">💎</div>
          <div class="quiz-opt-info">
            <h4>₹1,50,000+</h4>
            <p>No compromises. Top-tier flagship silicon</p>
          </div>
        </div>
        <div class="quiz-opt-btn ${quizAnswers.budget === 'any' ? 'selected' : ''}" onclick="selectQuizAnswer('budget', 'any')">
          <div class="quiz-opt-icon">👑</div>
          <div class="quiz-opt-info">
            <h4>Sky is the Limit</h4>
            <p>Show me the most powerful machine available</p>
          </div>
        </div>
      </div>
      <div class="quiz-nav-btns">
        <button class="btn-outline" onclick="proceedQuizStep(1)">← Back</button>
        <button class="btn-primary" onclick="proceedQuizStep(3)">Next Step →</button>
      </div>
    `;
  } else if (currentQuizStep === 3) {
    container.innerHTML = `
      <div class="quiz-question-title">Step 3 of 3: Preferred Ecosystem / Platform</div>
      <div class="quiz-options-grid">
        <div class="quiz-opt-btn ${quizAnswers.os === 'macos' ? 'selected' : ''}" onclick="selectQuizAnswer('os', 'macos')">
          <div class="quiz-opt-icon">🍎</div>
          <div class="quiz-opt-info">
            <h4>macOS (Apple Silicon)</h4>
            <p>Seamless iPhone ecosystem & unmatched battery efficiency</p>
          </div>
        </div>
        <div class="quiz-opt-btn ${quizAnswers.os === 'windows' ? 'selected' : ''}" onclick="selectQuizAnswer('os', 'windows')">
          <div class="quiz-opt-icon">🪟</div>
          <div class="quiz-opt-info">
            <h4>Windows 11</h4>
            <p>Ultimate PC gaming & enterprise compatibility</p>
          </div>
        </div>
        <div class="quiz-opt-btn ${quizAnswers.os === 'tablet' ? 'selected' : ''}" onclick="selectQuizAnswer('os', 'tablet')">
          <div class="quiz-opt-icon">📱</div>
          <div class="quiz-opt-info">
            <h4>iPadOS / Android Tablet</h4>
            <p>Stylus drawing, touchscreen notes & extreme portability</p>
          </div>
        </div>
        <div class="quiz-opt-btn ${quizAnswers.os === 'any' ? 'selected' : ''}" onclick="selectQuizAnswer('os', 'any')">
          <div class="quiz-opt-icon">✨</div>
          <div class="quiz-opt-info">
            <h4>Flexible / Recommend Best</h4>
            <p>I care most about the absolute best experience</p>
          </div>
        </div>
      </div>
      <div class="quiz-nav-btns">
        <button class="btn-outline" onclick="proceedQuizStep(2)">← Back</button>
        <button class="btn-primary" onclick="computeQuizRecommendation()">Discover My Perfect Match ✨</button>
      </div>
    `;
  }
}

function selectQuizAnswer(category, value) {
  quizAnswers[category] = value;
  renderQuizStep();
}

function proceedQuizStep(step) {
  if (step === 2 && !quizAnswers.purpose) {
    showToast("Please choose your primary use case first.");
    return;
  }
  if (step === 3 && !quizAnswers.budget) {
    showToast("Please select your budget preference.");
    return;
  }
  currentQuizStep = step;
  renderQuizStep();
}

async function computeQuizRecommendation() {
  let matchedProduct = null;
  let matchReason = "Top hardware balance for your specific workflow.";

  try {
    const res = await fetch(`${API_BASE}/quiz/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quizAnswers)
    });
    const data = await res.json();
    if (data.success && data.match) {
      matchedProduct = data.match;
      if (data.reason) matchReason = data.reason;
    }
  } catch (err) {
    console.warn("Quiz server recommendation fallback:", err);
  }

  if (!matchedProduct) {
    if (quizAnswers.os === "macos" || (!quizAnswers.os && quizAnswers.purpose === "creative")) {
      matchedProduct = PRODUCTS.find(p => p.id === (quizAnswers.budget === "premium" ? 7 : 8));
    } else if (quizAnswers.purpose === "gaming") {
      matchedProduct = PRODUCTS.find(p => p.id === (quizAnswers.budget === "budget" ? 6 : 2));
    } else if (quizAnswers.os === "tablet") {
      matchedProduct = PRODUCTS.find(p => p.id === 11);
    } else if (quizAnswers.purpose === "mobility") {
      matchedProduct = PRODUCTS.find(p => p.id === 3);
    } else {
      matchedProduct = PRODUCTS.find(p => p.id === 1);
    }
  }

  if (!matchedProduct) matchedProduct = PRODUCTS[0];

  const container = document.getElementById("quizContent");
  container.innerHTML = `
    <div class="quiz-result-card">
      <img src="${matchedProduct.image}" alt="${matchedProduct.name}" class="quiz-result-img" />
      <div class="quiz-result-details">
        <div class="quiz-match-score">🎯 99.2% Compatibility Match for You</div>
        <h3>${matchedProduct.name}</h3>
        <p style="color:var(--text-light);font-size:0.95rem;margin-bottom:6px;">${matchedProduct.specsSummary}</p>
        <p style="color:var(--primary);font-size:0.85rem;margin-bottom:12px;font-style:italic;">💡 ${matchReason}</p>
        <div style="font-size:1.6rem;font-weight:800;color:var(--primary);margin-bottom:1.5rem;">${formatPrice(matchedProduct.price)}</div>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <button class="btn-primary" onclick="addToCart(${matchedProduct.id})">Add to Cart 🛒</button>
          <button class="btn-outline" onclick="openQuickView(${matchedProduct.id})">View Full Specs 👁️</button>
          <button class="btn-outline" onclick="currentQuizStep = 1; quizAnswers = {}; renderQuizStep();">Retake Quiz 🔄</button>
        </div>
      </div>
    </div>
  `;
}

// ========== NAVBAR LOGIC ==========
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const cartToggle = document.getElementById("cartToggle");
  const wishlistToggle = document.getElementById("wishlistToggle");
  const searchToggle = document.getElementById("searchToggle");

  window.addEventListener("scroll", () => {
    navbar?.classList.toggle("scrolled", window.scrollY > 30);
  });

  hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks?.classList.toggle("open");
  });

  cartToggle?.addEventListener("click", openCart);
  document.getElementById("cartClose")?.addEventListener("click", closeCart);
  document.getElementById("cartOverlay")?.addEventListener("click", closeCart);

  wishlistToggle?.addEventListener("click", openWishlist);
  document.getElementById("wishlistClose")?.addEventListener("click", closeWishlist);
  document.getElementById("wishlistOverlay")?.addEventListener("click", closeWishlist);

  searchToggle?.addEventListener("click", openSearchModal);
  document.getElementById("searchClose")?.addEventListener("click", closeSearchModal);

  // Global Keyboard Shortcuts
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      openSearchModal();
    } else if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
      e.preventDefault();
      openSearchModal();
    } else if (e.key === "Escape") {
      closeSearchModal();
      closeQuickView();
      closeComparisonModal();
      closeCart();
      closeWishlist();
      closeCheckoutModal();
    }
  });

  // Search input live handler
  document.getElementById("globalSearchInput")?.addEventListener("input", (e) => {
    renderSearchResults(e.target.value);
  });
}

// ========== HOMEPAGE FILTER TABS ==========
function initHomepageTabs() {
  const tabs = document.querySelectorAll(".filter-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const filter = tab.dataset.filter || "all";
      renderFeaturedGrid(filter);
    });
  });
}

function renderFeaturedGrid(filter = "all") {
  const grid = document.getElementById("featuredGrid");
  if (!grid) return;

  const filtered = filter === "all" ? PRODUCTS.slice(0, 8) : PRODUCTS.filter(p => p.category === filter).slice(0, 8);
  grid.innerHTML = filtered.map(buildProductCard).join("");
}

// ========== SHOP PAGE ADVANCED FILTERS & VIEW MODES ==========
let currentViewMode = "grid"; // 'grid' or 'list'

function initShopPage() {
  const grid = document.getElementById("shopGrid");
  if (!grid) return;

  const priceRange = document.getElementById("priceRange");
  const priceLabel = document.getElementById("priceLabel");
  const sortEl = document.getElementById("shopSort");
  const mobileSort = document.getElementById("mobileSort");
  const searchInput = document.getElementById("shopInlineSearch");
  const clearBtn = document.getElementById("clearFilters");

  function applyShopFilters() {
    const activeCats = [...document.querySelectorAll(".cat-filter:checked")].map(el => el.value);
    const activeBrands = [...document.querySelectorAll(".brand-filter:checked")].map(el => el.value);
    const maxPrice = priceRange ? parseInt(priceRange.value) : 350000;
    const sort = sortEl ? sortEl.value : "default";
    const term = searchInput ? searchInput.value.toLowerCase().trim() : "";

    let filtered = PRODUCTS.filter(p => {
      const matchCat = activeCats.length === 0 || activeCats.includes(p.category);
      const matchBrand = activeBrands.length === 0 || activeBrands.includes(p.brand);
      const matchPrice = p.price <= maxPrice;
      const matchSearch = !term || p.name.toLowerCase().includes(term) || p.specsSummary.toLowerCase().includes(term);
      return matchCat && matchBrand && matchPrice && matchSearch;
    });

    if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
    else if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);
    else if (sort === "reviews") filtered.sort((a, b) => b.reviews - a.reviews);

    renderShopResults(filtered);
    renderActiveFilterChips(activeCats, activeBrands, maxPrice, term);
  }

  function renderShopResults(products) {
    grid.className = `products-grid ${currentViewMode === 'list' ? 'list-view' : ''}`;
    if (products.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:4rem 1rem;">
          <div style="font-size:3rem;margin-bottom:1rem;">🔎</div>
          <h3 style="font-size:1.5rem;margin-bottom:0.5rem;">No Devices Match Your Filters</h3>
          <p style="color:var(--text-muted);margin-bottom:1.5rem;">Try widening your price range or clearing some category / brand filters.</p>
          <button class="btn-primary" onclick="resetShopFilters()">Reset All Filters</button>
        </div>
      `;
    } else {
      grid.innerHTML = products.map(buildProductCard).join("");
    }

    const countEl = document.getElementById("resultsCount");
    if (countEl) countEl.textContent = `Showing ${products.length} device${products.length !== 1 ? 's' : ''}`;
  }

  function renderActiveFilterChips(cats, brands, maxPrice, term) {
    const container = document.getElementById("activeFilterChips");
    if (!container) return;

    let chipsHtml = "";
    if (term) chipsHtml += `<span class="filter-chip" onclick="clearShopSearch()">Keyword: "${term}" ✕</span>`;
    cats.forEach(c => chipsHtml += `<span class="filter-chip" onclick="uncheckCat('${c}')">${c.toUpperCase()} ✕</span>`);
    brands.forEach(b => chipsHtml += `<span class="filter-chip" onclick="uncheckBrand('${b}')">${b.toUpperCase()} ✕</span>`);
    if (maxPrice < 300000) chipsHtml += `<span class="filter-chip" onclick="resetPriceFilter()">≤ ${formatPrice(maxPrice)} ✕</span>`;

    container.innerHTML = chipsHtml;
  }

  // Event Listeners
  if (priceRange) {
    priceRange.addEventListener("input", () => {
      if (priceLabel) priceLabel.textContent = formatPrice(parseInt(priceRange.value));
      applyShopFilters();
    });
  }

  document.querySelectorAll(".cat-filter, .brand-filter").forEach(cb => {
    cb.addEventListener("change", applyShopFilters);
  });

  sortEl?.addEventListener("change", () => {
    if (mobileSort) mobileSort.value = sortEl.value;
    applyShopFilters();
  });

  mobileSort?.addEventListener("change", () => {
    if (sortEl) sortEl.value = mobileSort.value;
    applyShopFilters();
  });

  searchInput?.addEventListener("input", applyShopFilters);
  clearBtn?.addEventListener("click", resetShopFilters);

  // URL Query Params Check (e.g. ?cat=macbooks)
  const urlParams = new URLSearchParams(window.location.search);
  const requestedCat = urlParams.get("cat");
  if (requestedCat) {
    document.querySelectorAll(".cat-filter").forEach(cb => {
      cb.checked = cb.value === requestedCat;
    });
  }

  applyShopFilters();
}

function resetShopFilters() {
  document.querySelectorAll(".cat-filter, .brand-filter").forEach(cb => cb.checked = true);
  const priceRange = document.getElementById("priceRange");
  const priceLabel = document.getElementById("priceLabel");
  if (priceRange) {
    priceRange.value = 300000;
    if (priceLabel) priceLabel.textContent = "₹3,00,000";
  }
  const searchInput = document.getElementById("shopInlineSearch");
  if (searchInput) searchInput.value = "";
  const sortEl = document.getElementById("shopSort");
  if (sortEl) sortEl.value = "default";
  
  // Re-trigger shop filter update
  document.querySelector(".cat-filter")?.dispatchEvent(new Event("change"));
}

function clearShopSearch() {
  const input = document.getElementById("shopInlineSearch");
  if (input) {
    input.value = "";
    input.dispatchEvent(new Event("input"));
  }
}

function uncheckCat(val) {
  const cb = document.querySelector(`.cat-filter[value="${val}"]`);
  if (cb) {
    cb.checked = false;
    cb.dispatchEvent(new Event("change"));
  }
}

function uncheckBrand(val) {
  const cb = document.querySelector(`.brand-filter[value="${val}"]`);
  if (cb) {
    cb.checked = false;
    cb.dispatchEvent(new Event("change"));
  }
}

function resetPriceFilter() {
  const pr = document.getElementById("priceRange");
  if (pr) {
    pr.value = 300000;
    pr.dispatchEvent(new Event("input"));
  }
}

function setViewMode(mode) {
  currentViewMode = mode;
  document.querySelectorAll(".view-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.mode === mode);
  });
  const grid = document.getElementById("shopGrid");
  if (grid) {
    grid.classList.toggle("list-view", mode === "list");
  }
}

// ========== FLASH DEAL COUNTDOWN TIMER ==========
function initCountdown() {
  const target = new Date();
  target.setHours(target.getHours() + 9, target.getMinutes() + 42, target.getSeconds() + 18);

  function tick() {
    const now = new Date();
    let diff = Math.max(0, target - now);
    const h = Math.floor(diff / 3600000); diff -= h * 3600000;
    const m = Math.floor(diff / 60000); diff -= m * 60000;
    const s = Math.floor(diff / 1000);

    const pad = n => String(n).padStart(2, "0");
    const hEl = document.getElementById("cH");
    const mEl = document.getElementById("cM");
    const sEl = document.getElementById("cS");
    if (hEl) hEl.textContent = pad(h);
    if (mEl) mEl.textContent = pad(m);
    if (sEl) sEl.textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);
}

// ========== NEWSLETTER FORM ==========
async function handleNewsletter(e) {
  e.preventDefault();
  const input = document.getElementById("nlEmail");
  if (!input || !input.value) return;
  const email = input.value;

  try {
    const res = await fetch(`${API_BASE}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    showToast(data.message || `🎉 Welcome to VIP Tech Circle! Coupon TOPLAP10 unlocked.`);
  } catch (err) {
    showToast(`🎉 Thank you for subscribing! Promo code <strong>TOPLAP10</strong> is unlocked for your first order.`);
  }
  input.value = "";
}

// ========== CONTACT PAGE TICKET GENERATOR & FAQS ==========
async function handleContactForm(e) {
  e.preventDefault();
  const name = document.getElementById("cfName")?.value || "Valued Customer";
  const email = document.getElementById("cfEmail")?.value || "";
  const phone = document.getElementById("cfPhone")?.value || "";
  const subject = document.getElementById("cfSubject")?.value || "general";
  const message = document.getElementById("cfMessage")?.value || "";

  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, subject, message })
    });
    const data = await res.json();
    if (data.ticketId) {
      showToast(`📨 Ticket #${data.ticketId} created! An advisor will reach out to ${name} within 4 business hours.`);
      e.target.reset();
      return;
    }
  } catch (err) {
    console.warn("Backend offline, using fallback ticket generator:", err);
  }

  const ticketId = "TL-TICK-" + Math.floor(1000 + Math.random() * 9000);
  showToast(`📨 Ticket #${ticketId} created! An advisor will reach out to ${name} within 4 business hours.`);
  e.target.reset();
}

function initFaqAccordion() {
  document.querySelectorAll(".faq-question").forEach(q => {
    q.addEventListener("click", () => {
      const item = q.parentElement;
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("open"));
      if (!isOpen) {
        item.classList.add("open");
      }
    });
  });
}

function switchExperienceCenter(city, btn) {
  document.querySelectorAll(".center-tab-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  const card = document.getElementById("experienceCenterCard");
  if (!card) return;

  const data = {
    bengaluru: {
      title: "Bengaluru Tech Flagship",
      address: "12, Tech Park Lane, Cyber City, Indiranagar, Bengaluru 560001",
      phone: "+91 80 2345 6789",
      hours: "Mon – Sat: 9:30 AM – 8:30 PM",
      features: "• Hands-on demo zone for RTX laptops<br>• Apple M3 Pro / M3 Max benchmark suite<br>• On-site certified hardware diagnostics"
    },
    mumbai: {
      title: "Mumbai Luxe Atelier",
      address: "Ground Floor, Bandra Kurla Complex (BKC), Mumbai 400051",
      phone: "+91 22 4567 8901",
      hours: "Mon – Sun: 10:00 AM – 9:00 PM",
      features: "• VIP Corporate workstation testing<br>• 1-on-1 personalized laptop sizing<br>• Same-day courier pickup desk"
    },
    delhi: {
      title: "Delhi NCR Experience Hub",
      address: "Sector 29, Cyber Hub Annex, Gurugram, Delhi NCR 122002",
      phone: "+91 124 345 6780",
      hours: "Mon – Sat: 10:00 AM – 8:00 PM",
      features: "• Gaming tournament live arena<br>• Ultra-wide monitor & tablet dual setup showcase<br>• Priority enterprise trade-in counter"
    }
  };

  const c = data[city] || data.bengaluru;
  card.innerHTML = `
    <div>
      <span class="section-tag" style="margin-bottom:0.8rem;">Experience Center</span>
      <h3 style="font-size:1.8rem;margin-bottom:0.8rem;">${c.title}</h3>
      <p style="color:var(--text-light);margin-bottom:1rem;">📍 ${c.address}</p>
      <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1.5rem;">📞 ${c.phone} | ⏰ ${c.hours}</p>
      <div style="background:rgba(0,240,255,0.06);border-left:3px solid var(--primary);padding:1rem;border-radius:0 8px 8px 0;font-size:0.88rem;color:var(--text-light);line-height:1.7;">
        ${c.features}
      </div>
    </div>
    <div style="background:var(--bg-card);border:1px solid var(--border-glow);border-radius:var(--radius-md);height:260px;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;padding:2rem;">
      <span style="font-size:3.5rem;margin-bottom:0.8rem;">📍</span>
      <h4 style="font-size:1.1rem;margin-bottom:4px;">Visit Our Experience Zone</h4>
      <p style="color:var(--text-muted);font-size:0.85rem;margin-bottom:1rem;">Walk-ins welcome. Complimentary tech consultation.</p>
      <a href="https://maps.google.com" target="_blank" class="btn-outline" style="padding:8px 18px;font-size:0.85rem;">Get Directions ↗</a>
    </div>
  `;
}

// ========== INITIALIZATION ON DOM READY ==========
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  updateCartUI();
  updateWishlistCount();
  updateComparisonDock();

  // Page Specific Inits
  if (document.getElementById("featuredGrid")) {
    renderFeaturedGrid();
    initHomepageTabs();
    initCountdown();
    initTechQuiz();
  }

  if (document.getElementById("shopGrid")) {
    initShopPage();
  }

  if (document.querySelector(".faq-accordion")) {
    initFaqAccordion();
  }
});
