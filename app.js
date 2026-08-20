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

function switchPage(pageName) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(p => p.classList.remove('active'));

  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(n => n.classList.remove('active'));

  const targetPage = document.getElementById(`page-${pageName}`);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  const targetNav = document.getElementById(`nav-${pageName}`);
  if (targetNav) {
    targetNav.classList.add('active');
  }

  if (pageName === 'store') renderCustomerProducts();
  if (pageName === 'cart') renderCart();
  if (pageName === 'admin') renderAdminProducts();
}

function selectRole(role) {
  selectedRole = role;
  if (role === 'admin') {
    switchPage('admin');
    showToast('Beralih ke Mode Admin');
  } else {
    switchPage('store');
    showToast('Beralih ke Mode Pembeli');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderCustomerProducts();
});
