function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(number);
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  toastText.innerText = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

function navigateTo(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
  }

  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(n => n.classList.remove('active'));
  const activeNav = document.getElementById(`nav-${pageId}`);
  if (activeNav) activeNav.classList.add('active');

  if (pageId === 'customer-home') renderCustomerProducts();
  if (pageId === 'cart-page') renderCart();
  if (pageId === 'admin-dashboard-page') renderAdminProducts();
}

function setupLayoutForUser() {
  const header = document.getElementById('main-header');
  const nav = document.getElementById('main-nav');
  
  if (currentUser) {
    header.style.display = 'flex';
    if (currentUser.role === 'customer') {
      nav.style.display = 'flex';
    } else {
      nav.style.display = 'none'; // Admin pakai tombol logout di atas
    }
  } else {
    header.style.display = 'none';
    nav.style.display = 'none';
  }
}
