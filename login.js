// LOGIKA AKUN & AUTENTIKASI (LOGIN / LOGOUT / PERAN)

function chooseRole(role) {
  selectedRole = role;
  const roleTitle = document.getElementById('login-role-title');
  const roleSubtitle = document.getElementById('login-role-subtitle');
  const userLabel = document.getElementById('login-user-label');
  
  const userInput = document.getElementById('login-username');
  const emailInput = document.getElementById('login-email');
  const phoneInput = document.getElementById('login-phone');
  const passInput = document.getElementById('login-password');

  userInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  passInput.value = "";

  if (role === 'admin') {
    roleTitle.innerText = "Login Admin (Penjual)";
    roleSubtitle.innerText = "Silakan masukkan kredensial Admin Pretty Heels";
    userLabel.innerText = "Username Admin";
  } else {
    roleTitle.innerText = "Login Pelanggan";
    roleSubtitle.innerText = "Silakan masukkan data akun Anda";
    userLabel.innerText = "Username Pelanggan";
  }

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('login-page').classList.add('active');
}

function goToRoleSelection() {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('role-selection-page').classList.add('active');
}

function handleLogin(e) {
  e.preventDefault();
  const u = document.getElementById('login-username').value.trim();
  const email = document.getElementById('login-email').value.trim();
  const phone = document.getElementById('login-phone').value.trim();
  const p = document.getElementById('login-password').value.trim();

  if (selectedRole === 'admin') {
    if (u === 'Hiraya Georgienne' && p === 'prettyheelsSt' && email === 'hirayagienne@gmail.com' && phone === '082839103746') {
      currentUser = { 
        role: 'admin', 
        name: 'Hiraya Georgienne',
        email: 'hirayagienne@gmail.com',
        phone: '082839103746'
      };
      showWelcomeScreen();
    } else {
      showToast("Kredensial Admin Salah! Periksa kembali data Anda.");
    }
  } else {
    currentUser = { 
      role: 'customer', 
      name: u || 'Seraphine Azellie',
      email: email || 'seraphineazellie@gmail.com',
      phone: phone || '08123456789'
    };
    showWelcomeScreen();
  }
}

function showWelcomeScreen() {
  historyStack = [];
  const heading = document.getElementById('welcome-heading');
  const subtext = document.getElementById('welcome-subtext');

  if (currentUser.role === 'admin') {
    heading.innerText = "Selamat Datang, Admin!";
    subtext.innerHTML = `Selamat bertugas di Pretty Heels Store, <br><strong style="font-size:18px; color:var(--primary);">${currentUser.name}</strong>`;
  } else {
    heading.innerText = "Selamat Datang!";
    subtext.innerHTML = `Selamat datang di Pretty Heels Store, <br><strong style="font-size:18px; color:var(--primary);">${currentUser.name}</strong>`;
  }

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('welcome-page').classList.add('active');
  document.getElementById('main-header').style.display = 'none';
  document.getElementById('main-nav').style.display = 'none';
}

function proceedToMainApp() {
  const toast = document.getElementById('toast');
  if (toast) toast.classList.remove('show');

  if (currentUser.role === 'admin') {
    completeLogin('admin-dashboard-page', "Selamat bertugas Admin!");
  } else {
    completeLogin('customer-home', `Selamat berbelanja, ${currentUser.name}!`);
  }
}

function completeLogin(targetPage, message) {
  historyStack = [];
  setupLayoutForUser();
  showToast(message);
  navigateTo(targetPage);
}

function handleLogout() {
  currentUser = null;
  document.getElementById('main-header').style.display = 'none';
  document.getElementById('main-nav').style.display = 'none';
  
  goToRoleSelection();
  historyStack = [];
  showToast("Anda telah keluar dari akun");
}
