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
    { label: 'Home — Terminated', path: '/home/home-terminated.html',   dot: '#00B894', sub: true },

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

  // All screen paths in order (for export)
  const exportPages = screens.filter(s => s.path).map(s => s.path);

  const currentPath = window.location.pathname;

  // ── Build sidebar HTML ──────────────────────────────────────
  function buildSidebar() {
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';

    const title = document.createElement('div');
    title.className = 'sidebar-title';

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

    // Export button
    const exportBtn = document.createElement('button');
    exportBtn.id = 'r2o-export-btn';
    exportBtn.textContent = '⬇ Export PDF';
    exportBtn.style.cssText = `
      margin: 16px 12px 8px;
      width: calc(100% - 24px);
      padding: 9px 0;
      background: #00B894;
      color: #fff;
      border: none;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 700;
      font-family: 'Nunito', sans-serif;
      cursor: pointer;
      letter-spacing: 0.3px;
      transition: background 0.2s;
    `;
    exportBtn.onmouseenter = () => exportBtn.style.background = '#00997a';
    exportBtn.onmouseleave = () => exportBtn.style.background = '#00B894';
    exportBtn.onclick = startExport;
    sidebar.appendChild(exportBtn);

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

  // ── Export modal ────────────────────────────────────────────
  function buildModal() {
    const overlay = document.createElement('div');
    overlay.id = 'r2o-export-overlay';
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 99999;
      background: rgba(0,0,0,0.75);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Nunito', sans-serif;
    `;

    overlay.innerHTML = `
      <div style="
        background: #1A1A2E; border-radius: 16px; padding: 32px 36px;
        width: 340px; text-align: center; box-shadow: 0 24px 60px rgba(0,0,0,0.5);
        border: 1px solid rgba(255,255,255,0.08);
      ">
        <div style="font-size:28px; margin-bottom:12px">📄</div>
        <div style="color:#fff; font-size:16px; font-weight:800; margin-bottom:6px">Exporting PDF</div>
        <div id="r2o-export-status" style="color:rgba(255,255,255,0.5); font-size:12px; margin-bottom:20px; min-height:18px">
          Preparing...
        </div>
        <div style="background:rgba(255,255,255,0.08); border-radius:99px; height:8px; overflow:hidden; margin-bottom:10px">
          <div id="r2o-export-bar" style="height:100%; width:0%; background:#00B894; border-radius:99px; transition:width 0.3s ease"></div>
        </div>
        <div id="r2o-export-count" style="color:#00B894; font-size:11px; font-weight:700">0 / ${exportPages.length}</div>
      </div>
    `;

    document.body.appendChild(overlay);
    return overlay;
  }

  // ── Main export function ────────────────────────────────────
  async function startExport() {
    // Load html2pdf if not already loaded
    if (!window.html2pdf) {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js');
    }

    const overlay = buildModal();
    const statusEl = document.getElementById('r2o-export-status');
    const barEl    = document.getElementById('r2o-export-bar');
    const countEl  = document.getElementById('r2o-export-count');

    // Hidden iframe for rendering
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position:fixed;left:-9999px;top:0;width:430px;height:920px;border:none;visibility:hidden;pointer-events:none;';
    document.body.appendChild(iframe);

    const capturedCanvases = [];

    for (let i = 0; i < exportPages.length; i++) {
      const path = exportPages[i];
      const label = screens.find(s => s.path === path)?.label || path;

      statusEl.textContent = `Rendering: ${label}`;
      countEl.textContent  = `${i + 1} / ${exportPages.length}`;
      barEl.style.width    = `${Math.round(((i + 1) / exportPages.length) * 90)}%`;

      try {
        await loadPageInIframe(iframe, path);
        const canvas = await captureIframe(iframe);
        capturedCanvases.push({ canvas, label });
      } catch (e) {
        console.warn('Failed to capture:', path, e);
      }

      // Small delay to avoid overwhelming browser
      await sleep(200);
    }

    iframe.remove();

    statusEl.textContent = 'Building PDF...';
    barEl.style.width = '95%';

    await sleep(300);

    // Build PDF using jsPDF (bundled inside html2pdf)
    const { jsPDF } = window.jspdf || await importJsPDF();

    // Page size: phone frame approx 390x844 pt → use A4-ish portrait
    const PDF_W = 210; // mm A4 width
    const PDF_H = 297; // mm A4 height

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    capturedCanvases.forEach(({ canvas, label }, idx) => {
      if (idx > 0) pdf.addPage();

      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      // Scale to fit A4 with padding
      const MARGIN = 12; // mm
      const maxW = PDF_W - MARGIN * 2;
      const maxH = PDF_H - 24; // leave room for label

      const canvasAspect = canvas.height / canvas.width;
      let imgW = maxW;
      let imgH = imgW * canvasAspect;

      // If too tall, scale down from height
      if (imgH > maxH) {
          imgH = maxH;
          imgW = imgH / canvasAspect;
      }

      const x = (PDF_W - imgW) / 2;
      const y = 18;

      // Page label
      pdf.setFontSize(7);
      pdf.setTextColor(160, 160, 160);
      pdf.text(`${idx + 1}  ·  ${label}`, PDF_W / 2, 12, { align: 'center' });

      pdf.addImage(imgData, 'JPEG', x, y, imgW, imgH);
  });

    barEl.style.width = '100%';
    statusEl.textContent = 'Done! Downloading...';

    await sleep(400);

    pdf.save('R2O_Client_App_Mockup.pdf');

    overlay.remove();
  }

  // ── Helpers ─────────────────────────────────────────────────
  function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function loadPageInIframe(iframe, path) {
      return new Promise((resolve, reject) => {
          const timeout = setTimeout(() => reject(new Error('Timeout: ' + path)), 12000);
          iframe.onload = () => {
              clearTimeout(timeout);
              // Wait longer for fonts + animations to settle
              setTimeout(resolve, 1200);
          };
          iframe.onerror = () => { clearTimeout(timeout); reject(new Error('Load error: ' + path)); };
          iframe.src = path;
      });
  }

  async function captureIframe(iframe) {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    // Hide sidebar + home btn
    const sidebar = iframeDoc.querySelector('.sidebar');
    const homeBtn = iframeDoc.querySelector('.home-btn');
    if (sidebar) sidebar.style.display = 'none';
    if (homeBtn) homeBtn.style.display = 'none';

    // Reset body padding
    iframeDoc.body.style.paddingLeft  = '0';
    iframeDoc.body.style.paddingRight = '0';
    iframeDoc.body.style.margin       = '0';
    iframeDoc.body.style.display      = 'flex';
    iframeDoc.body.style.justifyContent = 'center';
    iframeDoc.body.style.background   = '#1A1A2E';

    if (!window.html2canvas) {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
    }

    // Small wait for layout to settle after style changes
    await sleep(300);

    // Capture full scrollable body
    const fullWidth  = iframeDoc.body.scrollWidth  || 430;
    const fullHeight = iframeDoc.body.scrollHeight || 900;

    const canvas = await window.html2canvas(iframeDoc.body, {
        useCORS:         true,
        allowTaint:      true,
        scale:           2,
        backgroundColor: '#1A1A2E',
        width:           fullWidth,
        height:          fullHeight,
        windowWidth:     fullWidth,
        windowHeight:    fullHeight,
        scrollX:         0,
        scrollY:         0,
        x:               0,
        y:               0,
        logging:         false,
        imageTimeout:    8000,
    });

    return canvas;
  }

  async function importJsPDF() {
    if (window.jspdf) return window.jspdf;
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
    return window.jspdf;
  }

  // ── Inject ──────────────────────────────────────────────────
  document.body.insertBefore(buildSidebar(), document.body.firstChild);
  document.body.appendChild(buildHomeBtn());

})();