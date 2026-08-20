let currentUser = null;
let selectedRole = 'customer';
let cart = [];

let suppliers = [
  { id: 1, name: "PT Dior Logistics Indonesia", contact: "0812-3456-7890", email: "supply@dior-indonesia.co.id" },
  { id: 2, name: "Saint Laurent Luxe Distributor", contact: "0819-8765-4321", email: "contact@ysl-luxe.id" },
  { id: 3, name: "Valentino & Co Fashion Import", contact: "0811-2233-4455", email: "import@valentino.co.id" }
];

let products = [
  {
    id: 1,
    name: "Heels Lady Dior Mules Satin Merah Muda",
    price: 285000000,
    costPrice: 200000000,
    supplierId: 1,
    stock: 50,
    sold: 1894,
    img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400"
  },
  {
    id: 2,
    name: "Saint Laurent Opyum Pumps Heels Burgundy",
    price: 320000000,
    costPrice: 230000000,
    supplierId: 2,
    stock: 35,
    sold: 1420,
    img: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=400"
  },
  {
    id: 3,
    name: "Valentino Garavani Vlogo heels Nude",
    price: 195000000,
    costPrice: 130000000,
    supplierId: 3,
    stock: 60,
    sold: 2130,
    img: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=400"
  }
];

let purchases = [
  {
    id: 'PO-2026-001',
    date: '10 Ags 2026',
    supplierName: 'PT Dior Logistics Indonesia',
    totalAmount: 4000000000,
    status: 'Selesai'
  }
];

let orders = [
  {
    id: 'PHS-882910',
    customer: 'Seraphine Azellie',
    total: 570000000,
    payment: 'Transfer Bank (BCA)',
    status: 'Diproses'
  }
];
