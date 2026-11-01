/* =========================================================
   Masterpiece.id Finance — shell bersama
   Sidebar, sesi login, API, format, modal, toast, helper data.
   Simpan satu folder dengan semua *.html dan mp-shell.css
   ========================================================= */
(function () {
  'use strict';

  var API_URL = 'https://script.google.com/macros/s/AKfycbxC10AFdd0hg9KEme_5Y8Ec3k8jab1kk-AcCzimRaxwvg3tq9tybxYFqarSuGtv4Rcq/exec';
  var LOGO = 'data:image/png;base64,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';
  var PRIV_ROLES = ['Owner', 'Admin'];

  /* ---------- tema (diterapkan secepat mungkin) ---------- */
  function getTheme() { try { return localStorage.getItem('mp_theme') || 'light'; } catch (e) { return 'light'; } }
  function setTheme(t) {
    try { localStorage.setItem('mp_theme', t); } catch (e) {}
    document.documentElement.setAttribute('data-theme', t);
  }
  document.documentElement.setAttribute('data-theme', getTheme());

  /* ---------- sesi ---------- */
  function readUser() {
    var raw = null;
    try { raw = sessionStorage.getItem('mp_finance_user') || localStorage.getItem('mp_finance_user'); } catch (e) {}
    try { return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
  }
  var user = readUser();
  var role = user && user.role ? String(user.role) : '';
  var priv = PRIV_ROLES.indexOf(role) !== -1;

  /* ---------- keamanan: sisipkan token sesi ke setiap panggilan server ---------- */
  var _fetch = window.fetch ? window.fetch.bind(window) : null;
  var _expiring = false;
  function sessionExpired() {
    if (_expiring) return; _expiring = true;
    try { sessionStorage.removeItem('mp_finance_user'); localStorage.removeItem('mp_finance_user'); sessionStorage.setItem('mp_notice', 'Sesi Anda berakhir. Silakan login lagi.'); } catch (e) {}
    location.replace('login.html');
  }
  if (_fetch) {
    window.fetch = function (input, init) {
      var url = typeof input === 'string' ? input : (input && input.url) || '';
      if (url.indexOf(API_URL) !== 0) return _fetch(input, init);
      var tok = user && user.token ? user.token : '';
      init = init || {};
      try {
        var method = String(init.method || 'GET').toUpperCase();
        if (method === 'POST' && typeof init.body === 'string') {
          var b = JSON.parse(init.body);
          if (b.action !== 'login') { b.token = tok; init = Object.assign({}, init, { body: JSON.stringify(b) }); }
        } else if (method === 'GET' && typeof input === 'string') {
          var u = new URL(url);
          if (u.searchParams.get('action') !== 'login') { u.searchParams.set('token', tok); input = u.toString(); }
        }
      } catch (e) {}
      return _fetch(input, init).then(function (res) {
        try { res.clone().json().then(function (j) { if (j && j.code === 'AUTH') sessionExpired(); }).catch(function () {}); } catch (e) {}
        return res;
      });
    };
  }

  /* ---------- ikon ---------- */
  var ICONS = {
    dashboard: '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
    record: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
    transaksi: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
    proyek: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M8 13h8"/>',
    klien: '<rect x="4" y="3" width="16" height="18" rx="2.5"/><circle cx="12" cy="10" r="2.5"/><path d="M7.5 17c.8-2 2.4-3 4.5-3s3.7 1 4.5 3"/>',
    tools: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    vendor: '<path d="M3 9l1.5-5h15L21 9"/><path d="M4 9v11h16V9"/><path d="M3 9h18"/><path d="M9 20v-6h6v6"/>',
    kontrak: '<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4"/><path d="M9 14l2 2 4-4"/>',
    termin: '<rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M8 15l2.5 2.5L16 13"/>',
    saldo: '<path d="M12 4v16M7 20h10M5 7h14"/><path d="M5 7l-3 7a3 3 0 0 0 6 0z"/><path d="M19 7l-3 7a3 3 0 0 0 6 0z"/>',
    hutang: '<circle cx="12" cy="8" r="4"/><path d="M3 18c3-1 6-1 8 .5l5-2a1.5 1.5 0 0 1 1 2.8L11 21l-8-1.5z"/>',
    laporan: '<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',
    log: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9z"/><path d="M9 12h6M9 16h6"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.5 3.2-5.5 6.5-5.5s5.9 2 6.5 5.5"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.8c2 .7 3.2 2.6 3.5 5.2"/>',
    kategori: '<path d="M3 12V4h8l9 9-8 8z"/><circle cx="7.5" cy="8.5" r="1.3"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
    lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/>',
    chev: '<path d="M6 9l6 6 6-6"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    edit: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
    download: '<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
    print: '<path d="M7 9V3h10v6M7 17H5a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2"/><rect x="7" y="14" width="10" height="7"/>',
    transfer: '<path d="M7 7h12M15 3l4 4-4 4M17 17H5M9 13l-4 4 4 4"/>',
    arrowUpRight: '<path d="M7 17L17 7M8 7h9v9"/>',
    arrowDownLeft: '<path d="M17 7L7 17M16 17H7V8"/>',
    undo: '<path d="M4 8h11a5 5 0 0 1 0 10H8M4 8l4-4M4 8l4 4"/>',
    save: '<path d="M5 3h11l3 3v15H5z"/><path d="M8 3v5h7V3M8 21v-7h8v7"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h6M9 16h6"/>'
  };
  function icon(name, cls) {
    return '<svg viewBox="0 0 24 24" class="' + (cls || '') + '" aria-hidden="true">' + (ICONS[name] || '') + '</svg>';
  }

  /* ---------- navigasi ---------- */
  var NAV = [
    { id: 'dashboard', href: 'dashboard.html', label: 'Dashboard', icon: 'dashboard', priv: true },
    { id: 'record', href: 'record.html', label: 'Catat', icon: 'record' },
    { id: 'transaksi', href: 'transaksi.html', label: 'Transaksi', icon: 'transaksi', priv: true },
    { id: 'proyek', href: 'proyek.html', label: 'Proyek', icon: 'proyek' },
    { id: 'klien', href: 'klien.html', label: 'Klien', icon: 'klien' },
    { id: 'tools', href: 'tools.html', label: 'Tools', icon: 'tools' },
    { id: 'vendor', href: 'vendor.html', label: 'Vendor', icon: 'vendor' },
    { id: 'vendor-projects', href: 'vendor-projects.html', label: 'Proyek Vendor', icon: 'kontrak' },
    { id: 'termin', href: 'termin.html', label: 'Termin', icon: 'termin', priv: true },
    { id: 'saldo', href: 'saldo.html', label: 'Saldo', icon: 'saldo', priv: true },
    { id: 'hutang-piutang', href: 'hutang-piutang.html', label: 'Hutang & Piutang', icon: 'hutang', priv: true },
    { id: 'laporan', href: 'laporan.html', label: 'Laporan', icon: 'laporan', priv: true },
    { id: 'log', href: 'log.html', label: 'Log Aktivitas', icon: 'log', priv: true },
    { id: 'users', href: 'users.html', label: 'User', icon: 'users', priv: true },
    { id: 'kategori', href: 'kategori.html', label: 'Kategori', icon: 'kategori' },
    { id: 'settings', href: 'settings.html', label: 'Pengaturan', icon: 'settings', priv: true }
  ];
  function currentPage() {
    var f = (location.pathname.split('/').pop() || '').replace(/\.html?$/i, '');
    f = f || 'dashboard';
    if (['invoice', 'kwitansi', 'rab', 'kontrak', 'dokumen'].indexOf(f) !== -1) return 'tools';
    return f;
  }

  /* ---------- util ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function num(v) {
    if (typeof v === 'number') return isFinite(v) ? v : 0;
    var s = String(v == null ? '' : v).replace(/[^\d,-]/g, '').replace(',', '.');
    var n = parseFloat(s);
    return isFinite(n) ? n : 0;
  }
  function rupiah(n) {
    n = Math.round(Number(n) || 0);
    var s = Math.abs(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return (n < 0 ? '- ' : '') + 'Rp ' + s;
  }
  function pad2(n) { return String(n).padStart(2, '0'); }
  function isoDate(v) {
    if (!v) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(String(v))) return String(v);
    var d = new Date(v);
    if (isNaN(d)) return String(v).slice(0, 10);
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }
  function today() { return isoDate(new Date()); }
  var BLN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  function fmtDate(v) {
    var iso = isoDate(v);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return v ? String(v) : '';
    return Number(iso.slice(8)) + ' ' + BLN[Number(iso.slice(5, 7)) - 1] + ' ' + iso.slice(0, 4);
  }
  function debounce(fn, ms) { var t; return function () { var a = arguments, c = this; clearTimeout(t); t = setTimeout(function () { fn.apply(c, a); }, ms || 180); }; }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---------- API ---------- */
  function withActor(p) {
    p = p || {};
    if (user) {
      if (p.pelaku === undefined) p.pelaku = user.nama || user.loginId || '';
      if (p.actorLoginId === undefined) p.actorLoginId = user.loginId || '';
    }
    return p;
  }
  async function apiGet(action, params) {
    try {
      var url = new URL(API_URL);
      url.searchParams.set('action', action);
      var p = withActor(params);
      Object.keys(p).forEach(function (k) { if (p[k] !== undefined && p[k] !== null) url.searchParams.set(k, p[k]); });
      var res = await fetch(url.toString());
      return await res.json();
    } catch (e) {
      return { success: false, message: 'Tidak bisa terhubung ke server. Periksa internet / URL Apps Script.' };
    }
  }
  async function apiPost(action, payload) {
    try {
      var body = Object.assign({ action: action }, withActor(payload));
      var res = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(body) });
      return await res.json();
    } catch (e) {
      return { success: false, message: 'Tidak bisa terhubung ke server. Periksa internet / URL Apps Script.' };
    }
  }
  // loadAll({proyek:'getProyek', klien:'getKlien'}) -> {proyek:[...], klien:[...]}
  async function loadAll(map) {
    var keys = Object.keys(map);
    var res = await Promise.all(keys.map(function (k) { return apiGet(map[k]); }));
    var out = {}, err = null;
    keys.forEach(function (k, i) {
      var r = res[i] || {};
      out[k] = r.success === false ? [] : (r.data || []);
      if (r.success === false && !err) err = r.message || 'Gagal memuat data';
    });
    out._error = err;
    return out;
  }

  /* ---------- toast / modal / confirm ---------- */
  function toast(msg, type) {
    var box = $('.mp-toasts');
    if (!box) { box = document.createElement('div'); box.className = 'mp-toasts'; document.body.appendChild(box); }
    var t = document.createElement('div');
    t.className = 'mp-toast' + (type ? ' ' + type : '');
    t.textContent = msg;
    box.appendChild(t);
    setTimeout(function () { t.style.opacity = '0'; t.style.transition = 'opacity .25s'; setTimeout(function () { t.remove(); }, 260); }, type === 'err' ? 4200 : 2400);
  }
  // modal({title, body, wide, okText, cancelText, hideFooter, onSubmit(el, close) -> false untuk tetap terbuka})
  function modal(opt) {
    var bd = document.createElement('div');
    bd.className = 'mp-backdrop';
    var m = document.createElement('form');
    m.className = 'mp-modal' + (opt.wide ? ' wide' : '');
    m.setAttribute('novalidate', '');
    m.innerHTML = '<button type="button" class="mp-x" aria-label="Tutup">' + icon('x', '') + '</button>' +
      '<h2>' + esc(opt.title || '') + '</h2><div class="mp-body"></div>' +
      (opt.hideFooter ? '' : '<div class="mp-foot"><button type="button" class="mp-btn mp-cancel" style="border:0;background:transparent">' + esc(opt.cancelText || 'Batal') + '</button><button type="submit" class="mp-btn dark mp-ok">' + esc(opt.okText || 'Simpan') + '</button></div>');
    var body = $('.mp-body', m);
    if (typeof opt.body === 'string') body.innerHTML = opt.body; else if (opt.body) body.appendChild(opt.body);
    bd.appendChild(m); document.body.appendChild(bd);
    $$('.mp-x svg', m).forEach(function (s) { s.style.cssText = 'width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:1.9;stroke-linecap:round'; });
    function close() { bd.remove(); document.removeEventListener('keydown', onKey); }
    function onKey(e) { if (e.key === 'Escape') close(); }
    document.addEventListener('keydown', onKey);
    bd.addEventListener('mousedown', function (e) { if (e.target === bd) close(); });
    $('.mp-x', m).addEventListener('click', close);
    var cancel = $('.mp-cancel', m); if (cancel) cancel.addEventListener('click', close);
    var ok = $('.mp-ok', m);
    m.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (!opt.onSubmit) return close();
      if (ok) { ok.disabled = true; ok.dataset.t = ok.textContent; ok.textContent = 'Menyimpan…'; }
      var r; try { r = await opt.onSubmit(m, close); } catch (err) { toast(err.message || 'Terjadi kesalahan', 'err'); r = false; }
      if (ok && document.body.contains(m)) { ok.disabled = false; ok.textContent = ok.dataset.t; }
      if (r !== false) close();
    });
    setTimeout(function () { var f = $('input:not([type=hidden]),select,textarea', body); if (f && !opt.noFocus) f.focus(); }, 40);
    return { el: m, close: close };
  }
  function confirmBox(text, okText) {
    return new Promise(function (resolve) {
      var done = false;
      var mm = modal({
        title: 'Konfirmasi', body: '<p style="margin:0;font-size:14px;line-height:1.5">' + esc(text) + '</p>',
        okText: okText || 'Ya, hapus',
        onSubmit: function () { done = true; resolve(true); }
      });
      var bd = mm.el.parentNode;
      new MutationObserver(function () { if (!document.body.contains(bd) && !done) { done = true; resolve(false); } })
        .observe(document.body, { childList: true });
    });
  }

  /* ---------- input uang & foto ---------- */
  function moneyInput(el) {
    function fmt() {
      var d = String(el.value).replace(/\D/g, '');
      el.value = d ? d.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '';
    }
    el.setAttribute('inputmode', 'numeric');
    el.addEventListener('input', fmt);
    if (el.value) fmt();
    return el;
  }
  function moneyVal(el) { return Number(String(el.value || '').replace(/\D/g, '')) || 0; }
  function setMoney(el, n) { el.value = n ? String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.') : ''; }
  // baca gambar -> kompres -> {base64, mime, name}
  function readImage(file, maxPx, quality) {
    maxPx = maxPx || 1400; quality = quality || 0.82;
    return new Promise(function (resolve, reject) {
      var fr = new FileReader();
      fr.onerror = reject;
      fr.onload = function () {
        var img = new Image();
        img.onerror = function () { resolve({ base64: String(fr.result).split(',')[1], mime: file.type, name: file.name }); };
        img.onload = function () {
          var w = img.width, h = img.height, r = Math.min(1, maxPx / Math.max(w, h));
          var c = document.createElement('canvas'); c.width = Math.round(w * r); c.height = Math.round(h * r);
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
          resolve({ base64: c.toDataURL('image/jpeg', quality).split(',')[1], mime: 'image/jpeg', name: (file.name || 'foto').replace(/\.\w+$/, '') + '.jpg' });
        };
        img.src = fr.result;
      };
      fr.readAsDataURL(file);
    });
  }

  /* ---------- logika data bersama ---------- */
  function normStatus(s) {
    s = String(s || '').trim().toLowerCase();
    if (s === 'berjalan' || s === 'aktif' || s === 'active' || s === '') return 'active';
    if (s === 'selesai' || s === 'done' || s === 'completed') return 'done';
    if (s === 'ditunda' || s === 'on hold' || s === 'hold') return 'on hold';
    return s;
  }
  function matchProject(t, p) {
    var kode = String(p.kodeProyek || '').trim();
    if (kode && String(t.proyekKode || '').trim() === kode) return true;
    var nm = String(p.namaProyek || '').trim().toLowerCase();
    var tp = String(t.proyekTerkait || '').trim().toLowerCase();
    if (!tp) return false;
    if (nm && tp === nm) return true;
    if (kode && (tp === kode.toLowerCase() || tp.indexOf(kode.toLowerCase() + ' ') === 0)) return true;
    return false;
  }
  // statistik kas proyek
  function projectStats(p, trx) {
    var nilai = num(p.nilaiKontrak) || num(p.totalBiaya);
    var budget = num(p.budgetSpend) || nilai;
    var dropped = 0, spent = 0;
    (trx || []).forEach(function (t) {
      if (!matchProject(t, p)) return;
      var j = num(t.jumlah), jn = String(t.jenis || '').toLowerCase();
      if (jn === 'pemasukan' || jn === 'dropproject') dropped += j;
      else if (jn === 'returncompany') dropped -= j;
      else if (jn === 'pengeluaran') spent += j + num(t.biayaTransfer);
    });
    var pct = budget > 0 ? Math.round(spent / budget * 100) : 0;
    return { nilai: nilai, budget: budget, dropped: dropped, spent: spent, balance: dropped - spent, pct: pct, over: budget > 0 && spent > budget };
  }
  // staf hanya melihat proyek yang menamai mereka (Account Executive / Project Manager); proyek tanpa penanggung jawab terbuka untuk semua
  function canSeeProject(p) {
    if (priv) return true;
    var ae = String(p.accountExecutive || '').trim().toLowerCase(), pm = String(p.projectManager || '').trim().toLowerCase();
    if (!ae && !pm) return true;
    var me = [user && user.nama, user && user.loginId].filter(Boolean).map(function (x) { return String(x).trim().toLowerCase(); });
    return me.indexOf(ae) !== -1 || me.indexOf(pm) !== -1;
  }
  function jenisLabel(j) {
    j = String(j || '').toLowerCase();
    return { pemasukan: 'Kas Masuk', pengeluaran: 'Kas Keluar', dropproject: 'Drop ke Proyek', returncompany: 'Kembali ke Perusahaan' }[j] || j;
  }
  function projectLabel(p) { return (p.kodeProyek ? p.kodeProyek + ' · ' : '') + (p.namaProyek || ''); }

  /* ---------- ganti password ---------- */
  function changePasswordModal() {
    var mm = modal({
      title: 'Ganti password',
      body: '<div class="mp-field"><label class="mp-label">Password lama</label><input class="mp-input" type="password" name="old" autocomplete="current-password" placeholder="Kosongkan jika belum pernah diatur"></div>' +
        '<div class="mp-field"><label class="mp-label">Password baru</label><input class="mp-input" type="password" name="n1" autocomplete="new-password"></div>' +
        '<div class="mp-field"><label class="mp-label">Ulangi password baru</label><input class="mp-input" type="password" name="n2" autocomplete="new-password"></div>',
      okText: 'Simpan password',
      onSubmit: async function (f) {
        var o = f.old.value, a = f.n1.value, b = f.n2.value;
        if (a.length < 6) { toast('Password baru minimal 6 karakter', 'err'); return false; }
        if (a !== b) { toast('Pengulangan password tidak sama', 'err'); return false; }
        var r = await apiPost('changePassword', { loginId: user.loginId, oldPassword: o, newPassword: a });
        if (!r.success) { toast(r.message || 'Gagal mengganti password', 'err'); return false; }
        user.mustChangePassword = false;
        try { (sessionStorage.getItem('mp_finance_user') ? sessionStorage : localStorage).setItem('mp_finance_user', JSON.stringify(user)); } catch (e) {}
        var bn = $('.mp-banner'); if (bn) bn.remove();
        toast('Password berhasil diganti', 'ok');
      }
    });
    return mm;
  }

  /* ---------- bangun sidebar ---------- */
  function signOut() {
    try { sessionStorage.removeItem('mp_finance_user'); localStorage.removeItem('mp_finance_user'); } catch (e) {}
    location.href = 'login.html';
  }
  function build() {
    if (!user) { location.replace('login.html'); return; }
    var page = currentPage();
    // staf tidak punya halaman beranda keuangan
    var navItem = NAV.filter(function (n) { return n.id === page; })[0];
    if (!priv && navItem && navItem.priv) { location.replace('record.html'); return; }

    document.body.classList.add('mp-has-shell');
    var aside = document.createElement('aside');
    aside.className = 'mp-side';
    var links = NAV.map(function (n) {
      var locked = n.priv && !priv;
      return '<a href="' + (locked ? '#' : n.href) + '" data-id="' + n.id + '" class="' + (n.id === page ? 'active' : '') + (locked ? ' locked' : '') + '"' + (locked ? ' title="Hanya untuk Owner/Admin"' : '') + '>' +
        icon(n.icon) + '<span>' + esc(n.label) + '</span>' + (locked ? icon('lock', 'mp-lock') : '') + '</a>';
    }).join('');
    var th = getTheme();
    aside.innerHTML =
      '<div class="mp-brand"><img src="' + LOGO + '" alt="Masterpiece.id"><div class="mp-brand-txt"><span>Finance Dashboard</span></div></div>' +
      '<nav class="mp-nav">' + links + '</nav>' +
      '<div class="mp-side-foot">' +
      '<div class="mp-user"><div class="mp-avatar" id="mpAvatar" title="Ganti password" style="cursor:pointer">' + esc((user.nama || user.loginId || '?').charAt(0).toUpperCase()) + '</div>' +
      '<div><div class="mp-uname">' + esc(user.nama || user.loginId) + '</div><span class="mp-urole">' + esc(role || 'Staff') + '</span></div>' +
      '<div class="mp-theme"><button type="button" data-t="dark" class="' + (th === 'dark' ? 'on' : '') + '" aria-label="Mode gelap">' + icon('moon') + '</button><button type="button" data-t="light" class="' + (th !== 'dark' ? 'on' : '') + '" aria-label="Mode terang">' + icon('sun') + '</button></div></div>' +
      '<button type="button" class="mp-signout" id="mpSignout">' + icon('logout') + '<span>Keluar</span></button></div>';
    document.body.insertBefore(aside, document.body.firstChild);
    var cp = document.createElement('footer');
    cp.className = 'mp-copy';
    cp.innerHTML = '&copy; ' + new Date().getFullYear() + ' PT. Masterpiece Indonesia. Hak cipta dilindungi.';
    document.body.appendChild(cp);

    var mb = document.createElement('button'); mb.id = 'mpMenuBtn'; mb.type = 'button'; mb.textContent = '☰ Menu';
    var bdp = document.createElement('div'); bdp.id = 'mpBackdrop';
    document.body.appendChild(mb); document.body.appendChild(bdp);
    mb.addEventListener('click', function () { document.body.classList.toggle('mp-nav-open'); });
    bdp.addEventListener('click', function () { document.body.classList.remove('mp-nav-open'); });

    $$('.mp-nav a.locked', aside).forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); toast('Menu ini hanya untuk Owner/Admin', 'err'); });
    });
    $$('.mp-theme button', aside).forEach(function (b) {
      b.addEventListener('click', function () {
        setTheme(b.dataset.t);
        $$('.mp-theme button', aside).forEach(function (x) { x.classList.toggle('on', x === b); });
      });
    });
    $('#mpSignout', aside).addEventListener('click', signOut);
    $('#mpAvatar', aside).addEventListener('click', changePasswordModal);

    if (user.mustChangePassword) {
      var bn = document.createElement('div'); bn.className = 'mp-banner';
      bn.innerHTML = 'Password akun ini belum diatur. <a href="#" id="mpPwLink">Ganti sekarang</a>';
      var anchor = $('.page, .mp-main, main'); if (anchor) anchor.parentNode.insertBefore(bn, anchor); else document.body.appendChild(bn);
      $('#mpPwLink', bn).addEventListener('click', function (e) { e.preventDefault(); changePasswordModal(); });
    }
    document.dispatchEvent(new CustomEvent('mp-ready'));
  }

  window.MP = {
    API_URL: API_URL, user: user, role: role, priv: priv,
    get: apiGet, post: apiPost, loadAll: loadAll,
    esc: esc, num: num, rupiah: rupiah, isoDate: isoDate, today: today, fmtDate: fmtDate, debounce: debounce, $: $, $$: $$,
    icon: icon, toast: toast, modal: modal, confirm: confirmBox,
    moneyInput: moneyInput, moneyVal: moneyVal, setMoney: setMoney, readImage: readImage,
    normStatus: normStatus, canSeeProject: canSeeProject, matchProject: matchProject, projectStats: projectStats, jenisLabel: jenisLabel, projectLabel: projectLabel,
    changePassword: changePasswordModal, signOut: signOut,
    // jalankan fn setelah shell siap (halaman baru memakai ini)
    ready: function (fn) { if (document.body && document.body.classList.contains('mp-has-shell')) fn(); else document.addEventListener('mp-ready', fn, { once: true }); }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
