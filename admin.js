function showAdminTab(tabName, btnElement) {
  const tabs = document.querySelectorAll('.admin-tab-content');
  tabs.forEach(tab => tab.style.display = 'none');

  const navBtns = document.querySelectorAll('.admin-nav-btn');
  navBtns.forEach(btn => btn.classList.remove('active'));

  document.getElementById(`tab-admin-${tabName}`).style.display = 'block';
  if (btnElement) btnElement.classList.add('active');

  if (tabName === 'products') renderAdminProducts();
  if (tabName === 'priceView') renderPriceView();
  if (tabName === 'suppliers') renderSuppliers();
  if (tabName === 'purchases') renderPurchases();
  if (tabName === 'orders') renderOrders();
}

function renderAdminProducts() {
  const tbody = document.getElementById('tbody-products');
  if (!tbody) return;
  tbody.innerHTML = products.map(p => `
    <tr>
      <td><img src="${p.img}" class="admin-thumb-img"></td>
      <td>${p.name}</td>
      <td>${formatRupiah(p.price)}</td>
      <td>${p.stock}</td>
    </tr>
  `).join('');
}

function renderPriceView() {
  const tbody = document.getElementById('tbody-price-view');
  if (!tbody) return;
  tbody.innerHTML = products.map(p => {
    const margin = p.price - p.costPrice;
    return `
      <tr>
        <td>${p.name}</td>
        <td>${formatRupiah(p.costPrice)}</td>
        <td>${formatRupiah(p.price)}</td>
        <td class="profit-text">${formatRupiah(margin)}</td>
      </tr>
    `;
  }).join('');
}

function renderSuppliers() {
  const tbody = document.getElementById('tbody-suppliers');
  if (!tbody) return;
  tbody.innerHTML = suppliers.map(s => `
    <tr>
      <td>${s.id}</td>
      <td>${s.name}</td>
      <td>${s.contact}</td>
    </tr>
  `).join('');
}

function renderPurchases() {
  const tbody = document.getElementById('tbody-purchases');
  if (!tbody) return;
  tbody.innerHTML = purchases.map(po => `
    <tr>
      <td>${po.id}</td>
      <td>${po.supplierName}</td>
      <td>${formatRupiah(po.totalAmount)}</td>
      <td><span class="badge-info">${po.status}</span></td>
    </tr>
  `).join('');
}

function renderOrders() {
  const tbody = document.getElementById('tbody-orders');
  if (!tbody) return;
  tbody.innerHTML = orders.map(o => `
    <tr>
      <td>${o.id}</td>
      <td>${o.customer}</td>
      <td>${formatRupiah(o.total)}</td>
      <td><span class="badge-info">${o.status}</span></td>
    </tr>
  `).join('');
}
