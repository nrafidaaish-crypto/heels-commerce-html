// UTILITAS UMUM & NAVIGASI APLIKASI

function showToast(message) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-text').innerText = message;
  toast.classList.add('show');
  setTimeout(() => { toast.classList.remove('show'); }, 3000);
}

function navigateTo(pageId, pushToHistory = true) {
  if (pushToHistory && historyStack[historyStack.length - 1] !== pageId) {
    historyStack.push(pageId);
  }

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  const activePage = document.getElementById(pageId);
  if (activePage) activePage.classList.add('active');

  const pageTitleEl = document.getElementById('page-title');
  const backBtn = document.getElementById('back-btn');

  if (historyStack.length > 1 && pageId !== 'customer-home' && pageId !== 'admin-dashboard-page' && pageId !== 'welcome-page') {
    backBtn.style.display = 'block';
  } else {
    backBtn.style.display = 'none';
  }

  switch(pageId) {
    case 'customer-home':
      pageTitleEl.innerText = "Pretty Heels Store";
      renderCustomerProducts();
      break;
    case 'product-detail-page':
      pageTitleEl.innerText = "Detail Heels";
      break;
    case 'cart-page':
      pageTitleEl.innerText = "Keranjang Belanja";
      renderCart();
      break;
    case 'checkout-page':
      pageTitleEl.innerText = "Checkout Pesanan";
      renderCheckout();
      break;
    case 'customer-orders-page':
      pageTitleEl.innerText = "Riwayat Pesanan Saya";
      renderCustomerOrders();
      break;
    case 'customer-profile-page':
      pageTitleEl.innerText = "Profil Pelanggan";
      break;
    case 'admin-dashboard-page':
      pageTitleEl.innerText = "Admin Dashboard";
      renderAdminDashboard();
      break;
    case 'admin-input-page':
      pageTitleEl.innerText = document.getElementById('input-prod-id').value ? "Edit Heels" : "Input Heels Baru";
      break;
    case 'admin-products-page':
      pageTitleEl.innerText = "Kelola Produk Heels";
      renderAdminProducts();
      break;
    case 'admin-reports-page':
      pageTitleEl.innerText = "Laporan Penjualan";
      switchReportTab('harian');
      break;
    case 'admin-profile-page':
      pageTitleEl.innerText = "Profil Admin & Store Manager";
      break;
  }

  updateNavActiveState(pageId);
  window.scrollTo(0,0);
}

function goBack() {
  if (historyStack.length > 1) {
    historyStack.pop();
    const prevPage = historyStack[historyStack.length - 1];
    navigateTo(prevPage, false);
  }
}

function updateNavActiveState(pageId) {
  document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
  const navs = document.querySelectorAll('.nav-item');
  if (currentUser?.role === 'customer') {
    if (pageId === 'customer-home') navs[0]?.classList.add('active');
    if (pageId === 'customer-orders-page') navs[1]?.classList.add('active');
    if (pageId === 'customer-profile-page') navs[2]?.classList.add('active');
  } else if (currentUser?.role === 'admin') {
    if (pageId === 'admin-dashboard-page') navs[0]?.classList.add('active');
    if (pageId === 'admin-input-page') navs[1]?.classList.add('active');
    if (pageId === 'admin-products-page') navs[2]?.classList.add('active');
    if (pageId === 'admin-reports-page') navs[3]?.classList.add('active');
    if (pageId === 'admin-profile-page') navs[4]?.classList.add('active');
  }
}

function setupLayoutForUser() {
  document.getElementById('main-header').style.display = 'flex';
  const nav = document.getElementById('main-nav');
  nav.style.display = 'flex';
  const cartBtn = document.getElementById('header-actions');

  if (currentUser.role === 'customer') {
    cartBtn.style.display = 'block';
    nav.innerHTML = `
      <button class="nav-item" onclick="navigateTo('customer-home')"><i class="fa-solid fa-shoe-prints"></i>Marketplace</button>
      <button class="nav-item" onclick="navigateTo('customer-orders-page')"><i class="fa-solid fa-receipt"></i>Pesanan Saya</button>
      <button class="nav-item" onclick="navigateTo('customer-profile-page')"><i class="fa-solid fa-user"></i>Profil</button>
    `;
    const nameEl = document.getElementById('profile-display-name');
    const emailEl = document.getElementById('profile-display-email');
    const phoneEl = document.getElementById('profile-display-phone');
    if (nameEl) nameEl.innerText = currentUser.name;
    if (emailEl) emailEl.innerText = currentUser.email;
    if (phoneEl) phoneEl.innerText = currentUser.phone;
  } else {
    cartBtn.style.display = 'none';
    nav.innerHTML = `
      <button class="nav-item" onclick="navigateTo('admin-dashboard-page')"><i class="fa-solid fa-chart-pie"></i>Dashboard</button>
      <button class="nav-item" onclick="resetForm(); navigateTo('admin-input-page')"><i class="fa-solid fa-plus-circle"></i>Input</button>
      <button class="nav-item" onclick="navigateTo('admin-products-page')"><i class="fa-solid fa-boxes-stacked"></i>Produk</button>
      <button class="nav-item" onclick="navigateTo('admin-reports-page')"><i class="fa-solid fa-file-invoice"></i>Laporan</button>
      <button class="nav-item" onclick="navigateTo('admin-profile-page')"><i class="fa-solid fa-user-gear"></i>Profil Admin</button>
    `;
    const nameAdmin = document.getElementById('admin-profile-name');
    const emailAdmin = document.getElementById('admin-profile-email');
    const phoneAdmin = document.getElementById('admin-profile-phone');
    if (nameAdmin) nameAdmin.innerText = currentUser.name;
    if (emailAdmin) emailAdmin.innerText = currentUser.email;
    if (phoneAdmin) phoneAdmin.innerText = currentUser.phone;
  }
}

function updateCartBadge() {
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cart-badge-count').innerText = totalQty;
}

// FUNGSI SHEET VARIASI WARNA MODAL
function openSheetGeneric(productObj, currentColor, currentQty, buttonLabel) {
  selectedDetailProduct = productObj;
  selectedColor = currentColor || productObj.colors[0];
  selectedQuantity = currentQty || 1;

  document.getElementById('sheet-prod-img').src = selectedDetailProduct.colorMap?.[selectedColor] || selectedDetailProduct.img;
  document.getElementById('sheet-prod-price').innerText = `Rp ${selectedDetailProduct.price.toLocaleString('id-ID')}`;
  document.getElementById('sheet-prod-stock').innerText = `Stok: ${selectedDetailProduct.stock}`;
  document.getElementById('sheet-qty-val').innerText = selectedQuantity;
  document.getElementById('sheet-action-btn').innerText = buttonLabel;

  const optsContainer = document.getElementById('sheet-variant-options');
  optsContainer.innerHTML = selectedDetailProduct.colors.map((c) => {
    const thumbImg = selectedDetailProduct.colorMap?.[c] || selectedDetailProduct.img;
    const isActive = c === selectedColor ? 'active' : '';
    return `
      <div class="variant-card-btn ${isActive}" onclick="selectSheetColor('${c}', this, '${thumbImg}')">
        <img src="${thumbImg}" alt="${c}">
        <span>${c.toUpperCase()}</span>
      </div>
    `;
  }).join('');

  document.getElementById('variant-sheet-modal').classList.add('active');
}

function closeVariantSheet() {
  document.getElementById('variant-sheet-modal').classList.remove('active');
}

function selectSheetColor(color, el, imgUrl) {
  selectedColor = color;
  document.querySelectorAll('#sheet-variant-options .variant-card-btn').forEach(btn => btn.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('sheet-prod-img').src = imgUrl;
}

function updateSheetQty(change) {
  selectedQuantity += change;
  if (selectedQuantity < 1) selectedQuantity = 1;
  if (selectedQuantity > selectedDetailProduct.stock) selectedQuantity = selectedDetailProduct.stock;
  document.getElementById('sheet-qty-val').innerText = selectedQuantity;
}

function confirmSheetAction() {
  const activeImg = selectedDetailProduct.colorMap?.[selectedColor] || selectedDetailProduct.img;

  if (sheetActionMode === 'add_to_cart') {
    const existing = cart.find(item => item.product.id === selectedDetailProduct.id && item.color === selectedColor);
    if (existing) {
      existing.qty += selectedQuantity;
    } else {
      cart.push({ product: selectedDetailProduct, color: selectedColor, selectedImg: activeImg, qty: selectedQuantity });
    }
    updateCartBadge();
    showToast("Heels berhasil ditambahkan ke keranjang!");
  } else if (sheetActionMode === 'buy_now') {
    cart = [{ product: selectedDetailProduct, color: selectedColor, selectedImg: activeImg, qty: selectedQuantity }];
    updateCartBadge();
    navigateTo('checkout-page');
  } else if (sheetActionMode === 'edit_cart' && sheetTargetIndex !== null) {
    cart[sheetTargetIndex].color = selectedColor;
    cart[sheetTargetIndex].selectedImg = activeImg;
    cart[sheetTargetIndex].qty = selectedQuantity;
    renderCart();
    updateCartBadge();
    showToast("Rincian keranjang diperbarui!");
  }

  closeVariantSheet();
}
