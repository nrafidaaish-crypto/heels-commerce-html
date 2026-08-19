// VARIABEL STATE GLOBAL
let currentUser = null;
let selectedRole = 'customer';
let historyStack = [];

// DATA PRODUK DUMMY
let products = [
  {
    id: 1,
    name: "Heels Lady Dior Mules dengan aksesoris Satin Merah Muda dan berlian",
    price: 285000000,
    stock: 50,
    rating: 4.9,
    sold: 1894,
    colors: ["PINK", "HITAM", "PUTIH", "NUDE"],
    colorMap: {
      "PINK": "Hdiorpink.jpg",
      "HITAM": "Hdiorpink.jpg",
      "PUTIH": "Hdiorpink.jpg",
      "NUDE": "Hdiorpink.jpg"
    },
    img: "Hdiorpink.jpg",
    desc: "Heels mules slide satin merah muda pucat yang feminim dengan tumit stiletto tipis dan terbuka di bagian depan. Detail tali yang dihiasi berlian imitasi (rhinestones) berkilau dan busur satin kecil. Insole kulit merah muda dengan logo Dior perak yang besar.",
    reviews: [
      { name: "Seraphine Azellie", rating: 5, date: "02 Ags 2026", variant: "Warna: PINK", comment: "Bagus banget heelsnya! Sol dalamnya empuk dan gak bikin kaki lecet ❤️❤️" },
      { name: "Rylee Karlanna", rating: 5, date: "28 Jul 2026", variant: "Warna: NUDE", comment: "Sangat elegan untuk dipakai ke acara pernikahan atau pesta. " }
    ]
  },
  {
    id: 2,
    name: "Saint Laurent Opyum Pumps Heels berwarna Burgundy dengan Tumit Logo YSL",
    price: 320000000,
    stock: 35,
    rating: 5.0,
    sold: 1420,
    colors: ["PINK", "PUTIH", "HITAM"],
    colorMap: {
      "PINK": "Hysl.jpg",
      "PUTIH": "Hysl.jpg",
      "HITAM": "Hysl.jpg"
    },
    img: "Hysl.jpg",
    desc: "Ini adalah heels kulit berwarna burgundy yang sangat mengilap dengan ujung jari kaki runcing klasik. Fitur yang paling menonjol dan ikonik adalah tumit stiletto logam emasnya yang dibentuk menjadi inisial 'YSL' vertikal. Hadir lengkap dengan kotak hitam Saint Laurent Paris.",
    reviews: [
      { name: "Narea debora", rating: 5, date: "07 des 2026", variant: "Warna: PINK", comment: "bentuk heels nya ikonik banget, dan orang-orang akan langsung mengenali tumit logo YSL-nya. Warna paten burgundy-nya luar biasa dan terlihat sangat mewah." }, 
      { name: "Vathea Anassya", rating: 5, date: "03 Ags 2026", variant: "Warna: PINK", comment: "Sumpah warna Burgundy nya nambahin kesan mewah bangettt, bikin kaki kelihatan cantik!" }
    ]
  },
  {
    id: 3,
    name: "Valentino Garavani Vlogo heels",
    price: 195000000,
    stock: 60,
    rating: 4.8,
    sold: 2130,
    colors: ["NUDE", "HITAM", "PINK"],
    colorMap: {
      "NUDE": "Hvalentino.jpg",
      "HITAM": "Hvalentino.jpg",
      "PINK": "Hvalentino.jpg"
    },
    img: "Hvalentino.jpg",
    desc: "Korean Ankle Valentino Heels dengan hak 5cm yang sangat simple dan nyaman dipakai seharian tanpa pegal.",
    reviews: [
      { name: "Yesava Maureen", rating: 5, date: "04 sept 2026", variant: "Warna: NUDE", comment: "Tingginya pas banget buat dipake kerja seharian, ga bikin capek dan design yang classic cocok untuk dipakai di acara apapun" }
    ]
  },
  {
    id: 4,
    name: "Prada Catwalk Heels putih dengan pita biru muda soft",
    price: 450000000,
    stock: 28,
    rating: 4.7,
    sold: 9215,
    colors: ["BLUE", "HITAM", "PINK"],
    colorMap: {
      "BLUE": "Hprada.jpg",
      "HITAM": "Hprada.jpg",
      "PINK": "Hprada.jpg"
    },
    img: "Hprada.jpg",
    desc: "Heels Prada dengan ujung runcing, kulit berwarna putih dan Fitur uniknya adalah pita kain logo 'PRADA' biru muda dengan tulisan hitam pada bagian jari kaki dan tali pergelangan kaki.",
    reviews: [
      { name: "Clarissa Devina", rating: 5, date: "10 Feb 2026", variant: "Warna: BLUE", comment: "Bahannya nyaman banget untuk dipakai sehari hari! perpaduan classic dan cute modern" }
    ]
  },
  {
    id: 5,
    name: "Gucci Heels dengan aksen Maroon dan rantai emas", 
    price: 260000000,
    stock: 40,
    rating: 4.9,
    sold: 1650,
    colors: ["NUDE", "HITAM"],
    colorMap: {
      "NUDE": "Hgucci.jpg",
      "HITAM": "Hgucci.jpg"
    },
    img: "Hgucci.jpg",
    desc: "Heels dengan ujung runcing dari kulit paten merah tua yang elegan. Tumit stiletto tipis berbalut paten serasi. Detail slingback menampilkan kombinasi rantai logam emas dan paten. Insole kulit netral dengan logo Gucci emas.",
    reviews: [
      { name: "Ralyn Audrey", rating: 5, date: "29 Jul 2026", variant: "Warna: NUDE", comment: "Mewah sekali, tidak terasa capek saat dipakai ke acara berjam-jam." }
    ]
  },
  {
    id: 6,
    name: "Valentino Garavani Pointed Slingbacks dengan Pita & VLogo",
    price: 380000000,
    stock: 20,
    rating: 5.0,
    sold: 8875,
    colors: ["HITAM", "COKLAT CREAM"],
    colorMap: {
      "HITAM": "Hvalentino2.jpg",
      "COKLAT CREAM": "Hvalentino2.jpg"
    },
    img: "Hvalentino2.jpg",
    desc: "Koleksi khusus pesta Pernikahan dengan aksen mutiara asli yang dirangkai cermat.",
    reviews: [
      { name: "Nadia Vanessa", rating: 5, date: "25 Jul 2026", variant: "Warna: HITAM", comment: "Perpaduan yang sempurna untuk aku pakai di acara pernikahan dengan gaun pengantin ku! Terima kasih Pretty Heels." }
    ]
  },
  {
    id: 7,
    name: "Satin Ribbon Bow Slingback Heels 8cm",
    price: 310000000,
    stock: 3500,
    rating: 4.9,
    sold: 6370,
    colors: ["HITAM", "PUTIH", "BEIGE"],
    colorMap: {
      "PINK": "Hgucci2.jpg",
      "PUTIH": "Hgucci2.jpg"
    },
    img: "Hgucci2.jpg",
    desc: "GUCCI heels dengan tumit blok yang kokoh dan ujung jari kaki membulat nyaman. Terbuat dari kulit paten dalam empat warna: beige muda, hitam mengilap, putih pudar, dan burgundy tua. Setiap pasangan menampilkan detail rantai horsebit logam emas ikonik Gucci di bagian depan. Insole kulit dengan logo Gucci.",
    reviews: [
      { name: "Gisca Amelia", rating: 5, date: "05 Ags 2026", variant: "Warna: PUTIH", comment: "Pitanya manis banget! Bikin penampilan makin standout." }
    ]
  },
  {
    id: 8,
    name: "Christian Dior Olive Green & Pink Lace-Up Pumps", 
    price: 350000000,
    stock: 22,
    rating: 4.8,
    sold: 1100,
    colors: ["GREEN", "PINK"],
    colorMap: {
      "GREEN": "matchadior.jpg",
      "PINK": "matchadior.jpg"
    },
    img: "matchadior.jpg",
    desc: "High heels pointed toe dari Dior dengan paduan warna yang sangat unik dan romantis: bahan fabric/suede berwarna hijau olive/army yang dipadukan dengan tali kulit tipis berwarna soft pink/nude. Dilengkapi detail pita pink mungil di atas jari kaki serta tali lace-up panjang yang dapat dililitkan di pergelangan kaki.",
    reviews: [
      { name: "Lianna Felicia", rating: 5, date: "14 Mei 2026", variant: "Warna: GREEN", comment: "Sangat feminin dengan nuansa coquette/vintage ala Galliano-era Dior! Perpaduan warna hijau olive dan soft pink terlihat sangat artistik." }
    ]
  },
  {
    id: 9,
    name: "Prada pretty black dengan pita coklat",
    price: 225000090,
    stock: 45,
    rating: 4.7,
    sold: 198,
    colors: ["HITAM", "NUDE"],
    colorMap: {
      "CLEAR": "prada.jpg",
      "NUDE": "prada.jpg"
    },
    img: "prada.jpg",
    desc: "Tren Sepatu heels dari Prada dengan kombinasi warna hitam dan cokelat yang sangat elegan. Memiliki potongan vamp berbentuk V-cut (sweetheart line) yang unik dan mempercantik siluet kaki, ujung jari runcing (pointed toe), serta hak stiletto tipis yang anggun. Bagian depan dipermanis dengan aksen pita kain satin/velvet berwarna cokelat moka.",
    reviews: [
      { name: "Shafira Aris", rating: 5, date: "06 Jun 2026", variant: "Warna: HITAM", comment: "Potongan V-cut dan bentuk pointed toe-nya memberikan efek kaki terlihat lebih jenjang dan langsing. Kombinasi warna hitam dan aksen pita cokelatnya memberikan kesan vintage 90s chic yang sangat estetik dan tidak pasaran." }
    ]
  },
  {
    id: 10,
    name: "Channel Two-tone strappy Heels Vintage",
    price: 275000000,
    stock: 38,
    rating: 4.9,
    sold: 1240,
    colors: ["BLACK", "BROWN"],
    colorMap: {
      "BLACK": "channel.jpg",
      "BROWN": "channel.jpg"
    },
    img: "channel.jpg",
    desc: "Sepatu heels slingback dari Chanel dengan interpretasi modern dari konsep two-tone ikonik mereka. Bagian toe cap berwarna cream/nude berbahan kulit halus dengan aksen logo mini CC emas yang mewah di depan. Dipadukan dengan tali-tali kulit berwarna cokelat tua (dark brown) yang menyilang anggun di atas punggung kaki hingga pergelangan.",
    reviews: [
      { name: "Aurelia Cinta", rating: 5, date: "30 Nov 2026", variant: "Warna: BLACK", comment: "Suka banget sama model tali silangnya, terkesan ramping di kaki." }
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
    total: 570000,
    payment: 'Transfer Bank (BCA)',
    status: 'Diproses'
  },
  {
    id: 'PHS-882911',
    date: '07 Ags 2026',
    category: 'harian',
    customer: 'Rylee Karlanna',
    items: [{ product: products[1], color: 'PUTIH', qty: 1 }],
    total: 325000,
    payment: 'E-Wallet (Gopay)',
    status: 'Selesai'
  },
  {
    id: 'PHS-882890',
    date: '02 Ags 2026',
    category: 'bulanan',
    customer: 'Vathea Anasya',
    items: [{ product: products[2], color: 'NUDE', qty: 2 }],
    total: 390000,
    payment: 'Transfer Bank (Mandiri)',
    status: 'Selesai'
  },
  {
    id: 'PHS-882855',
    date: '28 Jul 2026',
    category: 'bulanan',
    customer: 'Clarissa Devi',
    items: [{ product: products[3], color: 'BLUE', qty: 1 }],
    total: 245000,
    payment: 'COD (Bayar di Tempat)',
    status: 'Selesai'
  },
  {
    id: 'PHS-881200',
    date: '15 Mei 2026',
    category: 'tahunan',
    customer: 'Audrey Tampi',
    items: [{ product: products[4], color: 'BEIGE', qty: 3 }],
    total: 780000,
    payment: 'E-Wallet (ShopeePay)',
    status: 'Selesai'
  },
  {
    id: 'PHS-880512',
    date: '10 Jan 2026',
    category: 'tahunan',
    customer: 'Nadia Vanessa',
    items: [{ product: products[5], color: 'PUTIH', qty: 1 }],
    total: 380000,
    payment: 'Transfer Bank (BCA)',
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
