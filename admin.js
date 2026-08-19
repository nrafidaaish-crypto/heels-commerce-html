function renderAdminDashboard() {
  document.getElementById('stat-products').innerText = products.length;
  document.getElementById('stat-orders').innerText = orders.length;
  document.getElementById('stat-suppliers').innerText = suppliers.length;
  
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  document.getElementById('stat-sales').innerText = `Rp ${totalSales.toLocaleString('id-ID')}`;

  const recentContainer = document.getElementById('admin-dashboard-recent-orders');
  if (!recentContainer) return;

  if (orders.length === 0) {
    recentContainer.innerHTML = `<p style="font-size:12px; color:var(--text-muted);">Belum ada pembelian masuk.</p>`;
    return;
  }

  recentContainer.innerHTML = orders.map(order => `
    <div class="order-card" style="flex-direction:column;">
      <div class="flex-between" style="font-size:12px; font-weight:600;">
        <span>Pembeli: ${order.customer}</span>
        <span style="color:var(--primary);">${order.id}</span>
      </div>
      <div style="font-size:11px; color:var(--text-muted); margin:4px 0;">
        ${order.items.map(i => `${i.product.name} (${i.color}) x${i.qty}`).join(', ')}
      </div>
      <div class="flex-between" style="font-size:12px;">
        <span>Total Pembelian: Rp ${order.total.toLocaleString('id-ID')}</span>
        <span class="badge-store">${order.status}</span>
      </div>
    </div>
  `).join('');
}

// POPULASI DROPDOWN SUPPLIER DI FORM INPUT PRODUK
function populateSupplierDropdown() {
  const selectEl = document.getElementById('input-prod-supplier');
  if (!selectEl) return;
  selectEl.innerHTML = suppliers.map(s => `<option value="${s.name}">${s.name} (${s.productsSupplied})</option>`).join('');
}

// KELOLA PRODUK DENGAN RINCIAN HARGA & QUICK ACTION DI SEBELAH RATING
function renderAdminProducts() {
  const container = document.getElementById('admin-product-list');
  if (!container) return;

  container.innerHTML = products.map(p => {
    const cost = p.costPrice || (p.price * 0.75);
    const margin = p.price - cost;
    return `
      <div class="cart-item" style="flex-direction:row; align-items:flex-start;">
        <img src="${p.img}" class="cart-img" alt="${p.name}">
        <div class="cart-details">
          <div style="font-weight:600; font-size:13px;">${p.name}</div>
          
          <!-- RATING & QUICK ACTION: UBAH DESKRIPSI & HAPUS PRODUK -->
          <div class="rating-action-bar">
            <span style="color:#FFB800; font-weight:700;"><i class="fa-solid fa-star"></i> ${p.rating}</span>
            <span style="color:var(--border-light);">|</span>
            <button class="btn-action-icon btn-action-edit" onclick="editProductDescription(${p.id})">
              <i class="fa-solid fa-pen-to-square"></i> Ubah Deskripsi
            </button>
            <button class="btn-action-icon btn-action-delete" onclick="deleteProduct(${p.id})">
              <i class="fa-solid fa-trash"></i> Hapus
            </button>
          </div>

          <!-- RINCIAN HARGA BARANG (MODAL VS JUAL) -->
          <div class="price-breakdown">
            <div>Harga Beli (Modal): <strong>Rp ${cost.toLocaleString('id-ID')}</strong></div>
            <div>Harga Jual Toko: <strong style="color:var(--primary);">Rp ${p.price.toLocaleString('id-ID')}</strong></div>
            <div style="color:#27ae60; font-weight:600;">Est. Keuntungan: +Rp ${margin.toLocaleString('id-ID')}</div>
            <div style="font-size:10px; color:var(--text-muted);">Pemasok: ${p.supplier || 'PT Shoe Luxe Supplier'}</div>
          </div>

          <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">Stok: ${p.stock} pair | Terjual: ${p.sold} pair</div>
          
          <div style="display:flex; gap:8px; margin-top:6px;">
            <button onclick="editProduct(${p.id})" class="btn btn-secondary" style="padding:4px 8px; font-size:11px;"><i class="fa-solid fa-gear"></i> Edit Lengkap</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// EDIT DESKRIPSI BARANG SECARA LANGSUNG
function editProductDescription(id) {
  const prod = products.find(p => p.id === id);
  if (!prod) return;

  const newDesc = prompt("Masukkan deskripsi baru untuk Heels ini:", prod.desc);
  if (newDesc !== null && newDesc.trim() !== "") {
    prod.desc = newDesc.trim();
    renderAdminProducts();
    renderCustomerProducts();
    showToast("Deskripsi barang berhasil diubah!");
  }
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
  const costPrice = parseInt(document.getElementById('input-prod-cost').value);
  const price = parseInt(document.getElementById('input-prod-price').value);
  const supplier = document.getElementById('input-prod-supplier').value;
  const stock = parseInt(document.getElementById('input-prod-stock').value);
  const img = document.getElementById('input-prod-img').value;
  const desc = document.getElementById('input-prod-desc').value;

  if (id) {
    const prod = products.find(p => p.id == id);
    if (prod) {
      Object.assign(prod, { name, colors, costPrice, price, supplier, stock, img, desc });
      if (!prod.colorMap) prod.colorMap = {};
      colors.forEach(c => {
        if (!prod.colorMap[c]) prod.colorMap[c] = img;
      });
      showToast("Data Heels berhasil diperbarui!");
    }
  } else {
    const newProd = {
      id: Date.now(),
      name, colors, costPrice, price, supplier, stock, img, desc,
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
  document.getElementById('input-prod-cost').value = prod.costPrice || (prod.price * 0.75);
  document.getElementById('input-prod-price').value = prod.price;
  document.getElementById('input-prod-stock').value = prod.stock;
  document.getElementById('input-prod-img').value = prod.img;
  document.getElementById('input-prod-desc').value = prod.desc;

  populateSupplierDropdown();
  if (prod.supplier) {
    document.getElementById('input-prod-supplier').value = prod.supplier;
  }

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

// FITUR MANAJEMEN SUPPLIER
function renderAdminSuppliers() {
  const container = document.getElementById('admin-supplier-list');
  if (!container) return;

  if (suppliers.length === 0) {
    container.innerHTML = `<p style="font-size:12px; color:var(--text-muted);">Belum ada data supplier.</p>`;
    return;
  }

  container.innerHTML = suppliers.map(s => `
    <div style="background:rgba(255, 255, 255, 0.94); padding:12px; border-radius:var(--radius); margin-bottom:10px; font-size:12px; border:1px solid var(--border-light); box-shadow:var(--shadow-card);">
      <div class="flex-between" style="border-bottom:1px dashed var(--border-light); padding-bottom:6px; margin-bottom:6px;">
        <strong style="color:var(--primary); font-size:13px;">${s.name}</strong>
        <button onclick="deleteSupplier(${s.id})" style="border:none; background:none; color:#FF3B30; font-size:11px; cursor:pointer;"><i class="fa-solid fa-trash"></i> Hapus</button>
      </div>
      <div><i class="fa-solid fa-phone" style="color:var(--primary);"></i> Kontak: ${s.phone}</div>
      <div><i class="fa-solid fa-location-dot" style="color:var(--primary);"></i> Alamat: ${s.address}</div>
      <div style="margin-top:4px; font-size:11px; color:var(--text-muted);">Kategori Pasokan: <strong>${s.productsSupplied}</strong></div>
    </div>
  `).join('');
}

function saveSupplier(e) {
  e.preventDefault();
  const name = document.getElementById('sup-name').value;
  const phone = document.getElementById('sup-phone').value;
  const address = document.getElementById('sup-address').value;
  const productsSupplied = document.getElementById('sup-product').value;

  suppliers.push({ id: Date.now(), name, phone, address, productsSupplied });
  document.getElementById('supplier-form').reset();
  
  renderAdminSuppliers();
  renderAdminDashboard();
  showToast("Supplier baru berhasil ditambahkan!");
}

function deleteSupplier(id) {
  if (confirm("Hapus supplier ini dari daftar?")) {
    suppliers = suppliers.filter(s => s.id !== id);
    renderAdminSuppliers();
    renderAdminDashboard();
    showToast("Supplier berhasil dihapus!");
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
      <div>Pembeli: <strong>${o.customer}</strong></div>
      <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">
        Item Pembelian: ${o.items.map(i => `${i.product.name} (${i.color}) x${i.qty}`).join(', ')}
      </div>
      <div class="flex-between" style="font-size:11px; background:var(--color-cream); padding:6px 8px; border-radius:6px; margin-top:6px;">
        <span>Omset: Rp ${o.total.toLocaleString('id-ID')}</span>
        <span style="color:#27ae60; font-weight:700;">Net: Rp ${(o.total - Math.round(o.total * 0.03)).toLocaleString('id-ID')}</span>
      </div>
    </div>
  `).join('');
}
