/**
 * R2O Mockup — Shared Navigator
 * Injects sidebar + home button into every page automatically.
 * Include this script at the bottom of every HTML file.
 */

(function() {
  // ── Screen map ──────────────────────────────────────────────
  const screens = [
    { section: 'Onboarding' },
    { label: 'Splash',         path: '/onboarding/ob1-splash.html',     dot: '#FFD166' },
    { label: 'What is R2O',    path: '/onboarding/ob2-whatis.html',     dot: '#FFD166', sub: true },
    { label: 'Benefits',       path: '/onboarding/ob3-benefits.html',   dot: '#FFD166', sub: true },
    { label: 'Get Started',    path: '/onboarding/ob4-getstarted.html', dot: '#FFD166', sub: true },

    { section: 'Login' },
    { label: 'Login',          path: '/login/login.html',               dot: '#74B9FF' },
    { label: 'Enter PIN',      path: '/login/pin-login.html',           dot: '#74B9FF', sub: true },
    { label: 'Login Success',  path: '/login/login-success.html',       dot: '#74B9FF', sub: true },
    { label: 'Forgot PIN',     path: '/login/forgot-pin.html',          dot: '#74B9FF', sub: true },
    { label: 'Forgot OTP',     path: '/login/forgot-otp.html',          dot: '#74B9FF', sub: true },
    { label: 'New PIN',        path: '/login/new-pin.html',             dot: '#74B9FF', sub: true },

    { section: 'Sign Up' },
    { label: 'Sign Up Form',   path: '/signup/signup.html',             dot: '#A29BFE' },
    { label: 'OTP Verify',     path: '/signup/otp.html',                dot: '#A29BFE', sub: true },
    { label: 'Signup Success', path: '/signup/signup-success.html',     dot: '#A29BFE', sub: true },
    { label: 'Set PIN',        path: '/signup/set-pin.html',            dot: '#A29BFE', sub: true },
    { label: 'PIN Success',    path: '/signup/pin-success.html',        dot: '#A29BFE', sub: true },

    { section: 'Home' },
    { label: 'Home Dashboard', path: '/home/home.html',                 dot: '#00B894' },

    { section: 'Loan' },
    { label: 'Loan Detail',    path: '/loan/loan-detail.html',          dot: '#FD79A8' },
    { label: 'Contract PDF',   path: '/loan/contract-pdf.html',         dot: '#FD79A8', sub: true },
    { label: 'Schedule',       path: '/loan/loan-schedule.html',        dot: '#FD79A8', sub: true },
    { label: 'Pay Instructions',path: '/loan/payment-tips.html',        dot: '#FD79A8', sub: true },

    { section: 'Payment' },
    { label: 'Payment',        path: '/payment/payment.html',           dot: '#FDCB6E' },
    { label: 'KBZ Confirm',    path: '/payment/payment-confirm.html',   dot: '#FDCB6E', sub: true },
    { label: 'KBZ Pay',        path: '/payment/payment-kpay.html',      dot: '#FDCB6E', sub: true },
    { label: 'Success',        path: '/payment/payment-success.html',   dot: '#FDCB6E', sub: true },
    { label: 'Other Methods',  path: '/payment/payment-confirm-other.html', dot: '#FDCB6E', sub: true },

    { section: 'Loyalty' },
    { label: 'Loyalty Loan',   path: '/loyalty/loyalty.html',           dot: '#6C5CE7' },

    { section: 'Alerts' },
    { label: 'Notifications',  path: '/alerts/alerts.html',             dot: '#E17055' },
    { label: 'Notif Detail',   path: '/alerts/notif-detail.html',       dot: '#E17055', sub: true },
    { label: 'Live Chat',      path: '/alerts/chat.html',               dot: '#E17055', sub: true },

    { section: 'Profile' },
    { label: 'Profile',        path: '/profile/profile.html',           dot: '#00CEC9' },
    { label: 'Personal Info',  path: '/profile/personal-info.html',     dot: '#00CEC9', sub: true },
  ];

  // Detect current path
  const currentPath = window.location.pathname;

  // ── Build sidebar HTML ──────────────────────────────────────
  function buildSidebar() {
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';

    const title = document.createElement('div');
    title.className = 'sidebar-title';

    // Build correct logo path based on current URL
    const isRoot = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
    const logoPath = isRoot ? 'onboarding/assets/logo.png' : '../onboarding/assets/logo.png';

    title.innerHTML = `
      <img src="${logoPath}" alt="Rent2Own"
           style="max-width:130px;max-height:44px;object-fit:contain;display:block;margin-bottom:6px"
           onerror="this.style.display='none';document.getElementById('sb-logo-fb').style.display='block'"/>
      <div id="sb-logo-fb" style="display:none;color:#00B894;font-family:'Nunito',sans-serif;font-weight:900;font-size:16px">R2O</div>
      <span style="font-size:9px;color:rgba(255,255,255,0.3);display:block;font-weight:600">Client App · Interactive Mockup</span>`;
    sidebar.appendChild(title);

    screens.forEach(s => {
      if (s.section) {
        const sec = document.createElement('div');
        sec.className = 'sidebar-section';
        sec.textContent = s.section;
        sidebar.appendChild(sec);
        return;
      }
      const a = document.createElement('a');
      a.href = s.path;
      a.className = 'sidebar-item' + (s.sub ? ' sub' : '');
      if (currentPath.endsWith(s.path) || currentPath === s.path) {
        a.classList.add('active');
      }
      a.innerHTML = `
        <span class="sidebar-dot" style="background:${s.dot}"></span>
        ${s.label}`;
      sidebar.appendChild(a);
    });

    return sidebar;
  }

  // ── Build home button ───────────────────────────────────────
  function buildHomeBtn() {
    const btn = document.createElement('a');
    btn.href = '/index.html';
    btn.className = 'home-btn';
    btn.innerHTML = `
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M1.5 5.5L6.5 1.5L11.5 5.5V11.5C11.5 11.776 11.276 12 11 12H8.5V8.5H4.5V12H2C1.724 12 1.5 11.776 1.5 11.5V5.5Z"
              stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
      </svg>
      Restart`;
    return btn;
  }

  // ── Inject ──────────────────────────────────────────────────
  document.body.insertBefore(buildSidebar(), document.body.firstChild);
  document.body.appendChild(buildHomeBtn());

})();