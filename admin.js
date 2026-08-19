// FITUR PENJUAL & PANEL ADMIN (DASHBOARD, KELOLA PRODUK, LAPORAN KEUSANGAN)

function renderAdminDashboard() {
  document.getElementById('stat-products').innerText = products.length;
  document.getElementById('stat-orders').innerText = orders.length;
  
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  document.getElementById('stat-sales').innerText = `Rp ${totalSales.toLocaleString('id-ID')}`;

  const recentContainer = document.getElementById('admin-dashboard-recent-orders');
  if (!recentContainer) return;

  if (orders.length === 0) {
    recentContainer.innerHTML = `<p style="font-size:12px; color:var(--text-muted);">Belum ada pesanan masuk.</p>`;
    return;
  }

  recentContainer.innerHTML = orders.map(order => `
    <div class="order-card" style="flex-direction:column;">
      <div class="flex-between" style="font-size:12px; font-weight:600;">
        <span>Pembeli: ${order.customer}</span>
        <span style="color:var(--primary);">${order.id}</span>
      </div>
      <div style="font-size:11px; color:var(--text-muted); margin:4px 0;">
        ${order.items.map(i => `${i.product.name} x${i.qty}`).join(', ')}
      </div>
      <div class="flex-between" style="font-size:12px;">
        <span>Total: Rp ${order.total.toLocaleString('id-ID')}</span>
        <span class="badge-store">${order.status}</span>
      </div>
    </div>
  `).join('');
}

function renderAdminProducts() {
  const container = document.getElementById('admin-product-list');
  if (!container) return;

  container.innerHTML = products.map(p => `
    <div class="cart-item">
      <img src="${p.img}" class="cart-img" alt="${p.name}">
      <div class="cart-details">
        <div style="font-weight:600; font-size:13px;">${p.name}</div>
        <div style="font-size:11px; color:var(--text-muted);">Stok: ${p.stock} | Terjual: ${p.sold}</div>
        <div style="font-weight:700; color:var(--primary); font-size:13px; margin-top:2px;">Rp ${p.price.toLocaleString('id-ID')}</div>
        <div style="display:flex; gap:8px; margin-top:8px;">
          <button onclick="editProduct(${p.id})" class="btn btn-secondary" style="padding:4px 8px; font-size:11px;"><i class="fa-solid fa-pen"></i> Edit</button>
          <button onclick="deleteProduct(${p.id})" class="btn btn-outline" style="padding:4px 8px; font-size:11px; border-color:#FF3B30; color:#FF3B30;"><i class="fa-solid fa-trash"></i> Hapus</button>
        </div>
      </div>
    </div>
  `).join('');
}

function resetForm() {
  document.getElementById('product-form').reset();
  document.getElementById('input-prod-id').value = '';
}

function saveProduct(e) {
  e.preventDefault();
  const id = document.getElementById('input-prod-id').value;
  const name = document.getElementById('input-prod-name').value;
  const colors = document.getElementById('input-prod-colors').value.split(',').map(c=>c.trim());
  const price = parseInt(document.getElementById('input-prod-price').value);
  const stock = parseInt(document.getElementById('input-prod-stock').value);
  const img = document.getElementById('input-prod-img').value;
  const desc = document.getElementById('input-prod-desc').value;

  if (id) {
    const prod = products.find(p => p.id == id);
    if (prod) {
      Object.assign(prod, { name, colors, price, stock, img, desc });
      if (!prod.colorMap) prod.colorMap = {};
      colors.forEach(c => {
        if (!prod.colorMap[c]) prod.colorMap[c] = img;
      });
      showToast("Data Heels berhasil diperbarui!");
    }
  } else {
    const newProd = {
      id: Date.now(),
      name, colors, price, stock, img, desc,
      rating: 5.0, sold: 0, reviews: [],
      colorMap: {}
    };
    colors.forEach(c => { newProd.colorMap[c] = img; });
    products.unshift(newProd);
    showToast("Heels baru berhasil ditambahkan!");
  }

  renderCustomerProducts();
  renderAdminProducts();
  renderAdminDashboard();

  resetForm();
  navigateTo('admin-products-page');
}

function editProduct(id) {
  const prod = products.find(p => p.id === id);
  if (!prod) return;

  document.getElementById('input-prod-id').value = prod.id;
  document.getElementById('input-prod-name').value = prod.name;
  document.getElementById('input-prod-colors').value = prod.colors.join(', ');
  document.getElementById('input-prod-price').value = prod.price;
  document.getElementById('input-prod-stock').value = prod.stock;
  document.getElementById('input-prod-img').value = prod.img;
  document.getElementById('input-prod-desc').value = prod.desc;

  navigateTo('admin-input-page');
}

function deleteProduct(id) {
  if (confirm("Apakah Anda yakin ingin menghapus Heels ini?")) {
    products = products.filter(p => p.id !== id);
    
    renderAdminProducts();
    renderCustomerProducts();
    renderAdminDashboard();
    
    showToast("Heels berhasil dihapus!");
  }
}

function switchReportTab(type, element) {
  if (element) {
    element.parentElement.querySelectorAll('.role-btn').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
  }

  let activeOrders = [];
  let titleText = "";
  let periodeText = "";

  if (type === 'harian') {
    activeOrders = orders.filter(o => o.category === 'harian');
    titleText = "Ringkasan Laporan Harian";
    periodeText = "Periode Laporan: Hari Ini (07 Ags 2026)";
  } else if (type === 'bulanan') {
    activeOrders = orders.filter(o => o.category === 'harian' || o.category === 'bulanan');
    titleText = "Ringkasan Laporan Bulanan";
    periodeText = "Periode Laporan: Agustus 2026";
  } else if (type === 'tahunan') {
    activeOrders = orders;
    titleText = "Ringkasan Laporan Tahunan";
    periodeText = "Periode Laporan: Tahun 2026";
  }

  document.getElementById('report-title').innerText = titleText;
  document.getElementById('report-periode-text').innerText = periodeText;

  let totalGross = activeOrders.reduce((sum, o) => sum + o.total, 0);
  let totalItems = activeOrders.reduce((sum, o) => sum + o.items.reduce((iSum, i) => iSum + i.qty, 0), 0);
  const adminFee = Math.round(totalGross * 0.03);

  document.getElementById('report-count').innerText = `${activeOrders.length} Pesanan`;
  document.getElementById('report-items-sold').innerText = `${totalItems} Pair`;
  document.getElementById('report-gross').innerText = `Rp ${totalGross.toLocaleString('id-ID')}`;
  document.getElementById('report-fee').innerText = `- Rp ${adminFee.toLocaleString('id-ID')}`;
  document.getElementById('report-revenue').innerText = `Rp ${(totalGross - adminFee).toLocaleString('id-ID')}`;

  const listEl = document.getElementById('report-transaction-list');
  listEl.innerHTML = activeOrders.map(o => `
    <div style="background:rgba(255, 255, 255, 0.94); padding:12px; border-radius:var(--radius); margin-bottom:10px; font-size:12px; border:1px solid var(--border-light);">
      <div class="flex-between" style="border-bottom:1px dashed var(--border-light); padding-bottom:6px; margin-bottom:6px;">
        <strong style="color:var(--primary);">${o.id}</strong>
        <span style="color:var(--text-muted); font-size:11px;">${o.date}</span>
      </div>
      <div>Pembeli: ${o.customer}</div>
      <div class="flex-between" style="font-size:11px; background:var(--color-cream); padding:6px 8px; border-radius:6px; margin-top:6px;">
        <span>Omset: Rp ${o.total.toLocaleString('id-ID')}</span>
        <span style="color:#27ae60; font-weight:700;">Bersih: Rp ${(o.total - Math.round(o.total * 0.03)).toLocaleString('id-ID')}</span>
      </div>
    </div>
  `).join('');
}
