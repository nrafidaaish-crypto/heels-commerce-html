// VARIABEL STATE GLOBAL
let currentUser = null;
let selectedRole = 'customer';
let historyStack = [];

// DATA SUPPLIER DUMMY (Fitur Baru)
let suppliers = [
  { id: 1, name: "PT Dior Indonesia Import", phone: "08119876543", address: "Jakarta Pusat", productsSupplied: "Heels Lady Dior" },
  { id: 2, name: "CV Premium Luxe Footwear", phone: "08128899001", address: "Bandung", productsSupplied: "Saint Laurent & Gucci" },
  { id: 3, name: "Distributor Italia Official", phone: "08137766554", address: "Surabaya", productsSupplied: "Valentino & Prada" }
];

// DATA PRODUK DUMMY (Dilengkapi dengan Harga Beli/Modal & Supplier)
let products = [
  {
    id: 1,
    name: "Heels Lady Dior Mules dengan aksesoris Satin Merah Muda dan berlian",
    price: 2850000,
    costPrice: 2100000, // Harga Beli / Modal
    supplier: "PT Dior Indonesia Import",
    stock: 50,
    rating: 4.9,
    sold: 1894,
    colors: ["PINK", "HITAM", "PUTIH", "NUDE"],
    colorMap: {
      "PINK": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=500&q=80",
      "HITAM": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=500&q=80",
      "PUTIH": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=500&q=80",
      "NUDE": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=500&q=80"
    },
    img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=500&q=80",
    desc: "Heels mules slide satin merah muda pucat yang feminim dengan tumit stiletto tipis dan terbuka di bagian depan. Detail tali yang dihiasi berlian imitasi berkilau dan busur satin kecil.",
    reviews: [
      { name: "Seraphine Azellie", rating: 5, date: "02 Ags 2026", variant: "Warna: PINK", comment: "Bagus banget heelsnya! Sol dalamnya empuk dan gak bikin kaki lecet ❤️❤️" },
      { name: "Rylee Karlanna", rating: 5, date: "28 Jul 2026", variant: "Warna: NUDE", comment: "Sangat elegan untuk dipakai ke acara pernikahan atau pesta." }
    ]
  },
  {
    id: 2,
    name: "Saint Laurent Opyum Pumps Heels berwarna Burgundy dengan Tumit Logo YSL",
    price: 3200000,
    costPrice: 2400000,
    supplier: "CV Premium Luxe Footwear",
    stock: 35,
    rating: 5.0,
    sold: 1420,
    colors: ["PINK", "PUTIH", "HITAM"],
    colorMap: {
      "PINK": "https://images.unsplash.com/photo-1596149021876-0f81d33d838b?auto=format&fit=crop&w=500&q=80",
      "PUTIH": "https://images.unsplash.com/photo-1596149021876-0f81d33d838b?auto=format&fit=crop&w=500&q=80",
      "HITAM": "https://images.unsplash.com/photo-1596149021876-0f81d33d838b?auto=format&fit=crop&w=500&q=80"
    },
    img: "https://images.unsplash.com/photo-1596149021876-0f81d33d838b?auto=format&fit=crop&w=500&q=80",
    desc: "Heels kulit berwarna burgundy yang sangat mengilap dengan ujung jari kaki runcing klasik dan tumit stiletto logo YSL.",
    reviews: [
      { name: "Narea debora", rating: 5, date: "07 Des 2026", variant: "Warna: PINK", comment: "Bentuk heels-nya ikonik banget, sangat mewah." }
    ]
  }
];

// DATA PESANAN DUMMY
let orders = [
  {
    id: 'PHS-882910',
    date: '07 Ags 2026',
    category: 'harian',
    customer: 'Seraphine Azellie',
    items: [{ product: products[0], color: 'PINK', qty: 2 }],
    total: 5715000,
    payment: 'Transfer Bank (BCA)',
    status: 'Diproses'
  },
  {
    id: 'PHS-882911',
    date: '07 Ags 2026',
    category: 'harian',
    customer: 'Rylee Karlanna',
    items: [{ product: products[1], color: 'PUTIH', qty: 1 }],
    total: 3215000,
    payment: 'E-Wallet (Gopay)',
    status: 'Selesai'
  }
];

// VARIABEL KERANJANG & MODAL VARIASI
let cart = [];
let selectedDetailProduct = null;
let selectedColor = '';
let selectedQuantity = 1;
let sheetTargetIndex = null;
let sheetActionMode = 'buy_now';
