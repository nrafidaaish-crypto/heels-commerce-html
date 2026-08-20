function formatRupiahAdmin(amount) {
  if (typeof amount !== 'number') amount = Number(amount) || 0;
  return 'Rp ' + amount.toLocaleString('id-ID');
}

function showAdminTab(tabName) {
  document.querySelectorAll('.admin-tab-content').forEach(tab => {
    tab.style.display = 'none';
  });

  document.querySelectorAll('.admin-nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  const targetTab = document.getElementById('tab-admin-' + tabName);
  const targetBtn = document.getElementById('btn-admin-' + tabName);

  if (targetTab) targetTab.style.display = 'block';
  if (targetBtn) targetBtn.classList.add('active');

  if (tabName === 'products') renderAdminProducts();
  if (tabName === 'priceView') renderAdminPriceView();
  if (tabName === 'suppliers') renderAdminSuppliers();
  if (tabName === 'purchases') renderAdminPurchases();
  if (tabName === 'orders') renderAdminOrders();
}

function renderAdminProducts() {
  const tbody = document.getElementById('tbody-products');
  if (!tbody || typeof products === 'undefined') return;

  tbody.innerHTML = products.map(p => `
    <tr>
      <td align="center">
        <img src="${p.img}" alt="${p.name}" class="admin-thumb-img">
      </td>
      <td align="center"><strong>#${p.id}</strong></td>
      <td><strong>${p.name}</strong></td>
      <td>${formatRupiahAdmin(p.price)}</td>
      <td align="center"><strong>${p.stock}</strong> pcs</td>
      <td align="center">${p.sold} pcs</td>
      <td align="center">⭐ ${p.rating}</td>
    </tr>
  `).join('');
}

function renderAdminPriceView() {
  const tbody = document.getElementById('tbody-price-view');
  if (!tbody || typeof products === 'undefined') return;

  tbody.innerHTML = products.map(p => {
    const cost = p.costPrice || 0;
    const margin = p.price - cost;
    const supp = (typeof suppliers !== 'undefined' ? suppliers : []).find(s => s.id === p.supplierId);
    const supplierName = supp ? supp.name : 'Supplier Tidak Terdaftar';

    return `
      <tr>
        <td align="center"><strong>#${p.id}</strong></td>
        <td><strong>${p.name}</strong></td>
        <td>${formatRupiahAdmin(cost)}</td>
        <td>${formatRupiahAdmin(p.price)}</td>
        <td class="profit-text">+${formatRupiahAdmin(margin)}</td>
        <td>${supplierName}</td>
      </tr>
    `;
  }).join('');
}

function renderAdminSuppliers() {
  const tbody = document.getElementById('tbody-suppliers');
  if (!tbody || typeof suppliers === 'undefined') return;

  tbody.innerHTML = suppliers.map(s => `
    <tr>
      <td align="center"><strong>SUP-${s.id}</strong></td>
      <td><strong>${s.name}</strong></td>
      <td>${s.contact}</td>
      <td>${s.email}</td>
      <td>${s.address}</td>
    </tr>
  `).join('');
}

function renderAdminPurchases() {
  const tbody = document.getElementById('tbody-purchases');
  if (!tbody || typeof purchases === 'undefined') return;

  tbody.innerHTML = purchases.map(po => {
    const itemsFormatted = po.items.map(item => 
      `• ${item.name} (${item.qty} pcs @ ${formatRupiahAdmin(item.costPrice)})`
    ).join('<br>');

    return `
      <tr>
        <td align="center"><strong>${po.id}</strong></td>
        <td>${po.date}</td>
        <td><strong>${po.supplierName}</strong></td>
        <td>${itemsFormatted}</td>
        <td><strong>${formatRupiahAdmin(po.totalAmount)}</strong></td>
        <td align="center">
          <span class="badge badge-info">${po.status}</span>
        </td>
      </tr>
    `;
  }).join('');
}

function renderAdminOrders() {
  const tbody = document.getElementById('tbody-orders');
  if (!tbody || typeof orders === 'undefined') return;

  tbody.innerHTML = orders.map((ord, idx) => {
    const itemsFormatted = ord.items.map(item => {
      const pName = item.product ? item.product.name : 'Produk';
      return `• ${pName} (${item.color || 'Default'}) x${item.qty}`;
    }).join('<br>');

    return `
      <tr>
        <td align="center"><strong>${ord.id}</strong></td>
        <td>${ord.date}</td>
        <td><strong>${ord.customer}</strong></td>
        <td>${itemsFormatted}</td>
        <td><strong>${formatRupiahAdmin(ord.total)}</strong></td>
        <td>${ord.payment}</td>
        <td>
          <select class="admin-select-status" onchange="updateOrderStatusAdmin(${idx}, this.value)">
            <option value="Diproses" ${ord.status === 'Diproses' ? 'selected' : ''}>Diproses</option>
            <option value="Selesai" ${ord.status === 'Selesai' ? 'selected' : ''}>Selesai</option>
            <option value="Batal" ${ord.status === 'Batal' ? 'selected' : ''}>Batal</option>
          </select>
        </td>
      </tr>
    `;
  }).join('');
}

function updateOrderStatusAdmin(index, newStatus) {
  if (typeof orders !== 'undefined' && orders[index]) {
    orders[index].status = newStatus;
    alert(`Status pesanan ${orders[index].id} berhasil diubah menjadi '${newStatus}'`);
    renderAdminOrders();
  }
}

function initAdminPage() {
  showAdminTab('products');
}
