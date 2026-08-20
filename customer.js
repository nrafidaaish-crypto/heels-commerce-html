function renderCustomerProducts(list = products) {
  const container = document.getElementById('customer-product-grid');
  if (!container) return;
  container.innerHTML = '';

  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => addToCart(p.id);
    card.innerHTML = `
      <img src="${p.img}" class="product-img" alt="${p.name}">
      <div class="product-info">
        <span class="badge-store">In Stock (${p.stock})</span>
        <div class="product-title">${p.name}</div>
        <div class="product-price">${formatRupiah(p.price)}</div>
        <div class="product-meta">
          <span>Terjual ${p.sold}</span>
          <i class="fa-solid fa-cart-plus" style="color: var(--primary);"></i>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function filterProducts() {
  const query = document.getElementById('customer-search').value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderCustomerProducts(filtered);
}

function addToCart(productId) {
  const item = products.find(p => p.id === productId);
  if (item) {
    cart.push(item);
    document.getElementById('cart-count').innerText = cart.length;
    showToast(`${item.name} masuk keranjang`);
  }
}

function renderCart() {
  const container = document.getElementById('cart-items-container');
  if (!container) return;
  container.innerHTML = '';

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const cartCard = document.createElement('div');
    cartCard.className = 'cart-item';
    cartCard.innerHTML = `
      <img src="${item.img}" class="cart-img">
      <div class="cart-details">
        <h4 style="font-size:12px; color:var(--text-dark);">${item.name}</h4>
        <div style="font-size:13px; font-weight:700; color:var(--primary); margin-top:4px;">${formatRupiah(item.price)}</div>
      </div>
      <button onclick="removeFromCart(${index})" style="background:none; border:none; color:#e74c3c; cursor:pointer;">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;
    container.appendChild(cartCard);
  });

  document.getElementById('cart-total-amount').innerText = formatRupiah(total);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  document.getElementById('cart-count').innerText = cart.length;
  renderCart();
  showToast('Item dihapus');
}

function checkoutCart() {
  if (cart.length === 0) {
    showToast('Keranjang masih kosong!');
    return;
  }
  cart = [];
  document.getElementById('cart-count').innerText = '0';
  renderCart();
  showToast('Pesanan berhasil dibuat!');
}
