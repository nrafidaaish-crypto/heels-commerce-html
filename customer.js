// FITUR INTERAKSI PELANGGAN (KATALOG, DETAIL, KERANJANG, CHECKOUT, RIWAYAT)

function renderCustomerProducts() {
  const grid = document.getElementById('customer-product-list');
  if (!grid) return;
  grid.innerHTML = products.map(p => `
    <div class="product-card" onclick="openProductDetail(${p.id})">
      <img src="${p.img}" class="product-img" alt="${p.name}">
      <div class="product-info">
        <span class="badge-store">Pretty Heels</span>
        <div class="product-title">${p.name}</div>
        <div class="product-price">Rp ${p.price.toLocaleString('id-ID')}</div>
        <div class="product-meta">
          <span><i class="fa-solid fa-star" style="color:#FFB800;"></i> ${p.rating}</span>
          <span>${p.sold} Terjual</span>
        </div>
      </div>
    </div>
  `).join('');
}

function openProductDetail(id) {
  selectedDetailProduct = products.find(p => p.id === id);
  if (!selectedDetailProduct) return;

  selectedColor = selectedDetailProduct.colors[0];
  selectedQuantity = 1;

  const initialImg = selectedDetailProduct.colorMap?.[selectedColor] || selectedDetailProduct.img;

  const container = document.getElementById('detail-content');
  container.innerHTML = `
    <img src="${initialImg}" id="main-detail-img" class="detail-img" alt="${selectedDetailProduct.name}">
    <div class="detail-container">
      <span class="badge-store">Pretty Heels Store • Jakarta Selatan</span>
      <h2 style="font-size:17px; margin:4px 0 8px; color:var(--text-dark);">${selectedDetailProduct.name}</h2>
      <div style="font-size:20px; font-weight:700; color:var(--primary); margin-bottom:4px;">
        Rp ${selectedDetailProduct.price.toLocaleString('id-ID')}
      </div>
      <div style="font-size:11px; color:var(--text-muted); margin-bottom:16px;">
        <span>Stok Tersedia: ${selectedDetailProduct.stock} pair</span> | 
        <span><i class="fa-solid fa-truck-fast" style="color: #27ae60;"></i> Pengiriman 2-3 Hari</span>
      </div>

      <hr style="border:none; border-top:1px solid var(--border-light); margin:12px 0;">

      <h4 style="font-size:13px; margin-bottom:6px; color:var(--text-dark);">Deskripsi Lengkap Heels</h4>
      <p style="font-size:12px; color:#555; line-height:1.6; margin-bottom:20px;">${selectedDetailProduct.desc}</p>

      <hr style="border:none; border-top:1px solid var(--border-light); margin:12px 0;">

      <div class="flex-between" style="margin-bottom:10px;">
        <h4 style="font-size:14px; font-weight:700; color:var(--text-dark);">
          ${selectedDetailProduct.rating} <i class="fa-solid fa-star" style="color:#FFB800;"></i> Penilaian Pembeli (${selectedDetailProduct.reviews ? selectedDetailProduct.reviews.length : 0})
        </h4>
      </div>

      <div id="reviews-list">
        ${renderReviews(selectedDetailProduct.reviews)}
      </div>

      <div style="display:flex; gap:10px; margin-top:24px;">
        <button class="btn btn-outline" onclick="openVariantSheetForCart()"><i class="fa-solid fa-cart-plus"></i> + Keranjang</button>
        <button class="btn btn-primary" onclick="openVariantSheetForBuy()">Beli Sekarang</button>
      </div>
    </div>
  `;
  navigateTo('product-detail-page');
}

function renderReviews(reviews) {
  if (!reviews || reviews.length === 0) {
    return `<p style="font-size:12px; color:var(--text-muted);">Belum ada ulasan untuk produk ini.</p>`;
  }
  return reviews.map(r => `
    <div class="review-card">
      <div class="review-header">
        <span class="review-user">${r.name}</span>
        <span class="review-date">${r.date}</span>
      </div>
      <div style="color:#FFB800; font-size:10px; margin-bottom:2px;">
        ${'<i class="fa-solid fa-star"></i>'.repeat(r.rating)}
      </div>
      <div class="review-variant">${r.variant || 'Variasi: Standard'}</div>
      <p class="review-comment">${r.comment}</p>
    </div>
  `).join('');
}

function renderCart() {
  const container = document.getElementById('cart-items-container');
  const footer = document.getElementById('cart-footer');

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="text-center" style="padding:40px 0; color:var(--primary-dark);">
        <i class="fa-solid fa-shoe-prints" style="font-size:48px; color:var(--color-rose); margin-bottom:12px;"></i>
        <p style="font-weight:600;">Keranjang belanjaan heels-mu masih kosong</p>
      </div>
    `;
    footer.style.display = 'none';
    return;
  }

  let total = 0;
  container.innerHTML = cart.map((item, index) => {
    total += item.product.price * item.qty;
    return `
      <div class="cart-item">
        <img src="${item.selectedImg || item.product.img}" class="cart-img" alt="${item.product.name}">
        <div class="cart-details">
          <div style="font-weight:600; font-size:13px;">${item.product.name}</div>
          <div style="font-size:11px; color:var(--text-muted);">Warna: <strong>${item.color}</strong></div>
          <div style="font-weight:700; color:var(--primary); font-size:13px; margin-top:2px;">Rp ${item.product.price.toLocaleString('id-ID')}</div>
          <div class="flex-between" style="margin-top:6px;">
            <span style="font-size:12px;">Jumlah: <strong>${item.qty} pair</strong></span>
            <div style="display:flex; gap:6px;">
              <button onclick="openVariantSheetFromCart(${index})" class="btn btn-secondary" style="padding:4px 8px; font-size:10px;"><i class="fa-solid fa-pen"></i> Ubah Opsi</button>
              <button onclick="removeFromCart(${index})" style="border:none; background:none; color:#FF3B30; font-size:11px; cursor:pointer;"><i class="fa-solid fa-trash"></i> Hapus</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('cart-total-price').innerText = `Rp ${total.toLocaleString('id-ID')}`;
  footer.style.display = 'block';
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartBadge();
  renderCart();
  showToast("Produk dihapus dari keranjang");
}

function renderCheckout() {
  const container = document.getElementById('checkout-items');
  const nameEl = document.getElementById('checkout-cust-name');
  const phoneEl = document.getElementById('checkout-cust-phone');
  
  if (nameEl) nameEl.innerText = currentUser ? currentUser.name : 'Seraphine Azellie';
  if (phoneEl) phoneEl.innerText = currentUser ? currentUser.phone : '08123456789';

  let subtotal = 0;
  container.innerHTML = cart.map(item => {
    subtotal += item.product.price * item.qty;
    return `
      <div class="cart-item">
        <img src="${item.selectedImg || item.product.img}" class="cart-img" alt="${item.product.name}">
        <div class="cart-details">
          <div style="font-weight:600; font-size:13px;">${item.product.name}</div>
          <div style="font-size:11px; color:var(--text-muted);">Warna Terpilih: <strong>${item.color}</strong></div>
          <div class="flex-between" style="margin-top:6px;">
            <span style="font-weight:700; color:var(--primary); font-size:12px;">Rp ${item.product.price.toLocaleString('id-ID')}</span>
            <span style="font-size:12px;">x${item.qty} pair</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const shipping = 15000;
  document.getElementById('checkout-subtotal').innerText = `Rp ${subtotal.toLocaleString('id-ID')}`;
  document.getElementById('checkout-total').innerText = `Rp ${(subtotal + shipping).toLocaleString('id-ID')}`;
}

function openVariantSheetForCart() {
  sheetTargetIndex = null;
  sheetActionMode = 'add_to_cart';
  openSheetGeneric(selectedDetailProduct, selectedColor, selectedQuantity, "Masukkan ke Keranjang");
}

function openVariantSheetForBuy() {
  sheetTargetIndex = null;
  sheetActionMode = 'buy_now';
  openSheetGeneric(selectedDetailProduct, selectedColor, selectedQuantity, "Lanjut ke Checkout");
}

function openVariantSheetFromCart(index) {
  sheetTargetIndex = index;
  sheetActionMode = 'edit_cart';
  const item = cart[index];
  openSheetGeneric(item.product, item.color, item.qty, "Simpan Perubahan");
}

function processOrder() {
  if (cart.length === 0) return;
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);

  orders.unshift({
    id: 'PHS-' + Math.floor(100000 + Math.random() * 900000),
    date: '07 Ags 2026',
    category: 'harian',
    customer: currentUser ? currentUser.name : 'Seraphine Azellie',
    items: [...cart],
    total: subtotal + 15000,
    payment: document.getElementById('payment-method').value,
    status: 'Diproses'
  });

  cart = [];
  updateCartBadge();
  showToast("Pesanan Heels Berhasil Dibuat!");
  navigateTo('customer-orders-page');
}

function renderCustomerOrders() {
  const container = document.getElementById('customer-order-list');
  if (orders.length === 0) {
    container.innerHTML = `<p class="text-center" style="color:var(--primary-dark); padding:30px;">Belum ada riwayat pesanan.</p>`;
    return;
  }

  container.innerHTML = orders.map(order => `
    <div class="order-card" style="flex-direction:column;">
      <div class="flex-between" style="border-bottom:1px solid var(--border-light); padding-bottom:6px; font-size:12px;">
        <strong>${order.id}</strong>
        <span style="color:var(--primary); font-weight:600;">${order.status}</span>
      </div>
      ${order.items.map(i => `<div style="font-size:12px; margin:4px 0;">• ${i.product.name} (${i.color || 'Standard'}) x${i.qty} pair</div>`).join('')}
      <div class="flex-between" style="border-top:1px dashed var(--border-light); padding-top:6px; margin-top:6px; font-size:12px;">
        <span>Total Pembayaran:</span>
        <strong style="color:var(--primary);">Rp ${order.total.toLocaleString('id-ID')}</strong>
      </div>
    </div>
  `).join('');
}
