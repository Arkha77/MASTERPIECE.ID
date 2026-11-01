/* =========================================================
   Masterpiece.id Finance — modul dokumen (Invoice, Kwitansi, RAB)
   Dipakai invoice.html, kwitansi.html, rab.html, dokumen.html.
   Simpan satu folder dengan mp-shell.js / mp-shell.css.
   ========================================================= */
(function () {
  'use strict';
  var LOGO = 'data:image/png;base64,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AAAABDoAAAAg0AEAAECgAwAAAAIdAAAABDoAAAAg0AEAAECgAwAAAAIdAAAABDoAAAAg0AEAAECgAwAAAAIdAAAABDoAAAAg0AEAAECgAwAAAAIdAAAABDoAAAAg0AEAAECgAwAAAAIdAAAABDoAAAAg0AEAAECgAwAAAAIdAAAABDoAAAAg0AEAAECgAwAAAAIdAAAABDoAAAAg0AEAAECgAwAAAAIdAAAAEOgAAAAg0AEAAACBDgAAAAIdAAAAEOgAAAAg0AEAAACBDgAAAAIdAAAAEOgAAAAg0AEAAACBDgAAAAIdAAAAEOgAAAAg0AEAAACBDgAAAAIdAAAAEOgAAAAg0AEAAACBDgAAAAIdAAAAEOgAAAAg0AEAAACBDgAAAAIdAAAAEOgAAAAg0AEAAACBDgAAAAIdAAAAEOgAAAAg0AEAAACBDgAAAAIdAAAAEOgAAAAg0AEAAACBDgAAAAIdAAAAEOgAAAAg0AEAAACBDgAAAAIdAAAAEOgAAAAg0AEAAACBDgAAAAIdAAAAEOgAAAAg0AEAAACBDgAAAAIdAAAAEOgAAAAg0AEAAACBDgAAAAIdAAAAEOgAAAAg0AEAAACBDgAAAAIdAAAAEOgAAAAg0AEAAACBDgAAAAIdAAAAEOgAAAAg0AEAAACBDgAAAALdEgAAAIBABwAAAAQ6AAAACHQAAABAoAMAAIBABwAAAAQ6AAAACHQAAABAoAMAAIBABwAAAAQ6AAAACHQAAABAoAMAAIBABwAAAAQ6AAAACHQAAABAoAMAAIBABwAAAAQ6AAAACHQAAABAoAMAAIBABwAAAAQ6AAAACHQAAABAoAMAAIBABwAAAAQ6AAAACHQAAABAoAMAAIBABwAAAAQ6AAAACHQAAABAoAMAAIBABwAAAAQ6AAAACHQAAABAoAMAAIBABwAAAAQ6AAAACHQAAABAoAMAAIBABwAAAAQ6AAAACHQAAABAoAMAAIBABwAAAAQ6AAAACHQAAABAoAMAAIBABwAAAAQ6AAAACHQAAABAoAMAAMDi+P8DACe5tKhs8SA/AAAAAElFTkSuQmCC';
  var esc = function (s) { return window.MP.esc(s); };

  /* ---------- gaya (builder + kertas) ---------- */
  var css = [
    '.md-tabs{display:flex;gap:4px;background:var(--paper);border:1px solid var(--line);border-radius:999px;padding:4px;width:max-content;max-width:100%;overflow-x:auto;margin-bottom:16px}',
    '.md-tabs a{display:flex;align-items:center;gap:7px;padding:7px 16px;border-radius:999px;font:600 12.5px Inter,sans-serif;color:var(--ink-soft);text-decoration:none;white-space:nowrap}',
    '.md-tabs a svg{width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}',
    '.md-tabs a:hover{color:var(--ink)}',
    '.md-tabs a.on{background:var(--forest-soft);color:var(--forest)}',
    '.md-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:16px}',
    '.md-bar .grp{display:flex;gap:8px;align-items:center;flex-wrap:wrap}',
    '.md-chip{display:inline-block;font:600 11.5px Inter,sans-serif;padding:4px 12px;border-radius:999px;border:1px solid var(--line);background:var(--paper);color:var(--ink-soft)}',
    '.md-chip.ok{background:var(--forest-soft);color:var(--forest);border-color:transparent}',
    '.md-chip.warn{background:var(--amber-soft);color:var(--amber);border-color:transparent}',
    '.md-layout{display:grid;grid-template-columns:minmax(300px,380px) minmax(0,1fr);gap:22px;align-items:start}',
    '.md-form{display:flex;flex-direction:column;gap:14px;min-width:0}',
    '.md-card{background:var(--paper);border:1px solid var(--line);border-radius:16px;padding:16px 18px;box-shadow:var(--shadow)}',
    '.md-card h3{margin:0 0 12px;font:700 10.5px Inter,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-soft)}',
    '.md-card .mp-field{margin-bottom:12px}.md-card .mp-field:last-child{margin-bottom:0}',
    '.md-item{border:1px solid var(--line);border-radius:12px;padding:12px;margin-bottom:10px;background:var(--cream)}',
    '.md-item .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-size:11px;color:var(--ink-faint);font-weight:600}',
    '.md-item .top button{border:0;background:none;color:var(--ink-faint);cursor:pointer;padding:2px}',
    '.md-item .top button:hover{color:var(--rust)}',
    '.md-item .top svg{width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:1.9;stroke-linecap:round}',
    '.md-item .mp-input,.md-item .mp-select,.md-item .mp-textarea{background:var(--paper)}',
    '.md-item .row2{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}',
    '.md-item .sum{display:flex;justify-content:space-between;font-size:12px;color:var(--ink-soft);margin-top:8px}',
    '.md-item .sum b{color:var(--ink)}',
    '.md-lnk{font:600 12px Inter,sans-serif;color:var(--forest);background:none;border:0;cursor:pointer;padding:6px 0 0;display:inline-flex;gap:5px;align-items:center}',
    '.md-lnk svg{width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2}',
    '.md-tog{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;padding:9px 0;border-bottom:1px solid var(--line)}',
    '.md-tog:last-child{border-bottom:0}',
    '.md-tog b{font-size:13px;display:block}.md-tog small{font-size:11.5px;color:var(--ink-faint);display:block;margin-top:2px;line-height:1.35}',
    '.md-prev{min-width:0;position:sticky;top:14px}',
    '.md-zoom{display:flex;justify-content:flex-end;align-items:center;gap:6px;margin-bottom:8px;font-size:12px;color:var(--ink-soft)}',
    '.md-zoom button{width:26px;height:26px;border-radius:50%;border:1px solid var(--line);background:var(--paper);cursor:pointer;font-weight:700;color:var(--ink)}',
    '.md-stage{background:var(--paper);border:1px solid var(--line);border-radius:14px;padding:18px;overflow:auto;max-height:calc(100vh - 110px)}',
    '.md-sizer{margin:0 auto;position:relative}',
    /* kertas */
    '.dp{width:794px;min-height:1000px;background:#fff;color:#1b1f18;font:12px/1.5 Inter,Arial,sans-serif;padding:48px 54px;box-sizing:border-box;box-shadow:0 2px 14px rgba(0,0,0,.12);position:relative;transform-origin:top left}',
    '.dp *{box-sizing:border-box}',
    '.dp-head{display:flex;justify-content:space-between;align-items:flex-start;gap:24px}',
    '.dp-logo{height:58px;width:auto;display:block;margin-bottom:8px}',
    '.dp-biz{font-size:10.5px;color:#5b6156;line-height:1.55;max-width:300px}',
    '.dp-biz b{color:#1b1f18;font-size:11.5px}',
    '.dp-title{font:800 26px Inter,Arial,sans-serif;color:#0b6e09;letter-spacing:.02em;text-align:right;line-height:1}',
    '.dp-meta{margin-top:10px;font-size:11px;margin-left:auto;border-collapse:collapse}',
    '.dp-meta td{padding:2px 0 2px 14px}.dp-meta td:first-child{color:#5b6156;text-align:right}.dp-meta td:last-child{font-weight:600;text-align:right}',
    '.dp-sec{margin-top:26px;font:700 9.5px Inter,Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#5b6156;border-bottom:1px solid #1b1f18;padding-bottom:4px}',
    '.dp-to{margin-top:8px;font-size:12px;line-height:1.55;white-space:pre-line}.dp-to b{font-size:13px}',
    '.dp-table{width:100%;border-collapse:collapse;margin-top:22px;font-size:11px;table-layout:fixed}',
    '.dp-table th:nth-child(2){width:46px}.dp-table th:nth-child(3){width:58px}.dp-table th:nth-child(4){width:98px}.dp-table th:nth-child(5){width:46px}.dp-table th:nth-child(6){width:106px}',
    '.dp-table th{background:#0b6e09;color:#fff;text-align:left;padding:7px 8px;font-size:10px;letter-spacing:.04em}',
    '.dp-table th.n,.dp-table td.n{text-align:right;white-space:nowrap}',
    '.dp-table td{padding:8px;border-bottom:1px solid #e4e2da;vertical-align:top}',
    '.dp-table tr{break-inside:avoid;page-break-inside:avoid}',
    '.dp-table .sub{color:#5b6156;font-size:10px;margin-top:2px;white-space:pre-line}',
    '.dp-tot{margin-left:auto;margin-top:12px;width:260px;font-size:11.5px}',
    '.dp-tot div{display:flex;justify-content:space-between;padding:3px 0}',
    '.dp-tot .g{border-top:1.5px solid #1b1f18;margin-top:4px;padding-top:7px;font-weight:800;font-size:13px}',
    '.dp-tot .g span:last-child{color:#0b6e09}',
    '.dp-note{margin-top:20px;font-size:10.5px;color:#5b6156;white-space:pre-line;line-height:1.55}',
    '.dp-note b{color:#1b1f18}',
    '.dp-pay{margin-top:24px;font-size:11px;line-height:1.6}',
    '.dp-pay .h{font:700 9.5px Inter,Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#5b6156;margin-bottom:3px}',
    '.dp-sigrow{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;margin-top:30px;break-inside:avoid;page-break-inside:avoid}',
    '.dp-sig{width:230px;text-align:center;font-size:11px;position:relative;min-height:128px}',
    '.dp-sig .place{color:#5b6156;margin-bottom:2px}',
    '.dp-sig .area{height:70px;position:relative;display:flex;align-items:center;justify-content:center}',
    '.dp-sig .area img.sg{max-height:66px;max-width:190px;position:relative;z-index:2}',
    '.dp-sig .area .stamp{position:absolute;left:50%;top:50%;transform:translate(-30%,-50%) rotate(-9deg);z-index:1;opacity:.82;mix-blend-mode:multiply}',
    '.dp-sig .ln{border-top:1px solid #1b1f18;padding-top:4px;font-weight:700}',
    '.dp-sig .role{color:#5b6156;font-size:10.5px}',
    '.dp-foot{margin-top:28px;padding-top:10px;border-top:1px solid #e4e2da;font-size:9.5px;color:#8a8f84;text-align:center}',
    '.dp-kw{margin-top:28px;border:1.5px solid #1b1f18;border-radius:6px;padding:20px 22px}',
    '.dp-kw .r{display:flex;gap:10px;margin-bottom:14px;font-size:12px}',
    '.dp-kw .r .k{width:130px;color:#5b6156;flex:none}.dp-kw .r .v{flex:1;font-weight:600;border-bottom:1px dotted #8a8f84;padding-bottom:3px;white-space:pre-line}',
    '.dp-kw .big{display:inline-block;margin-top:6px;border:1.5px solid #0b6e09;color:#0b6e09;font:800 18px Inter,Arial,sans-serif;padding:8px 18px;border-radius:4px}',
    '.dp-kw .words{font-style:italic;font-weight:600}',
    '.md-empty-prev{padding:40px;text-align:center;color:#8a8f84}',
    '@media (max-width:1100px){.md-layout{grid-template-columns:1fr}.md-prev{position:static}}',
    '@media screen{#printRoot{display:none}}',
    '@media print{',
    '@page{size:A4;margin:0}',
    'html,body{background:#fff !important;margin:0 !important;padding:0 !important}',
    'body > *:not(#printRoot){display:none !important}',
    '#printRoot{display:block !important}',
    '#printRoot .dp{width:210mm !important;min-height:297mm;box-shadow:none !important;transform:none !important;padding:16mm 15mm !important;margin:0 !important}',
    '}'
  ].join('\n');
  var st = document.createElement('style'); st.setAttribute('data-mpd', '1'); st.textContent = css; document.head.appendChild(st);

  /* ---------- helper ---------- */
  var BLN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  function tglPanjang(iso) {
    iso = window.MP.isoDate(iso);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return '';
    return Number(iso.slice(8)) + ' ' + BLN[Number(iso.slice(5, 7)) - 1] + ' ' + iso.slice(0, 4);
  }
  function addDays(iso, n) {
    var d = new Date(iso + 'T00:00:00'); d.setDate(d.getDate() + n);
    return window.MP.isoDate(d);
  }
  var SATUAN = ['Ls', 'Unit', 'm²', 'm', 'Pcs', 'Set', 'Titik', 'Hari', 'Orang', 'Paket', 'Lembar', 'Bulan'];

  var SATUAN_TXT = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'];
  function terbilang(n) {
    n = Math.floor(Math.abs(Number(n) || 0));
    function t(x) {
      if (x < 12) return SATUAN_TXT[x];
      if (x < 20) return t(x - 10) + ' belas';
      if (x < 100) return t(Math.floor(x / 10)) + ' puluh' + (x % 10 ? ' ' + t(x % 10) : '');
      if (x < 200) return 'seratus' + (x - 100 ? ' ' + t(x - 100) : '');
      if (x < 1000) return t(Math.floor(x / 100)) + ' ratus' + (x % 100 ? ' ' + t(x % 100) : '');
      if (x < 2000) return 'seribu' + (x - 1000 ? ' ' + t(x - 1000) : '');
      if (x < 1e6) return t(Math.floor(x / 1000)) + ' ribu' + (x % 1000 ? ' ' + t(x % 1000) : '');
      if (x < 1e9) return t(Math.floor(x / 1e6)) + ' juta' + (x % 1e6 ? ' ' + t(x % 1e6) : '');
      if (x < 1e12) return t(Math.floor(x / 1e9)) + ' miliar' + (x % 1e9 ? ' ' + t(x % 1e9) : '');
      return t(Math.floor(x / 1e12)) + ' triliun' + (x % 1e12 ? ' ' + t(x % 1e12) : '');
    }
    return n === 0 ? 'nol' : t(n);
  }
  function terbilangRupiah(n) { var s = terbilang(n) + ' rupiah'; return s.charAt(0).toUpperCase() + s.slice(1); }

  // nomor: PREFIX.YY.MM.NNN — urut per bulan
  function nextNumber(prefix, tipe, docs, iso) {
    var d = iso ? new Date(iso + 'T00:00:00') : new Date();
    var yy = String(d.getFullYear()).slice(2), mm = String(d.getMonth() + 1).padStart(2, '0');
    var head = prefix + '.' + yy + '.' + mm + '.';
    var max = 0;
    (docs || []).forEach(function (x) {
      if (String(x.tipe).toLowerCase() !== tipe) return;
      var n = String(x.nomor || '');
      if (n.indexOf(head) === 0) max = Math.max(max, parseInt(n.slice(head.length), 10) || 0);
    });
    return head + String(max + 1).padStart(3, '0');
  }

  function tabs(active) {
    var T = [['dokumen', 'dokumen.html', 'Dokumen Tersimpan', 'log'], ['invoice', 'invoice.html', 'Invoice', 'transaksi'], ['kwitansi', 'kwitansi.html', 'Kwitansi', 'check'], ['rab', 'rab.html', 'RAB Builder', 'kontrak'], ['kontrak', 'kontrak.html', 'Surat Kontrak', 'users']];
    return '<nav class="md-tabs">' + T.map(function (t) {
      return '<a href="' + t[1] + '" class="' + (t[0] === active ? 'on' : '') + '">' + window.MP.icon(t[3]) + t[2] + '</a>';
    }).join('') + '</nav>';
  }
  function toggle(id, title, hint, on) {
    return '<div class="md-tog"><div><b>' + esc(title) + '</b>' + (hint ? '<small>' + esc(hint) + '</small>' : '') + '</div><label class="mp-switch"><input type="checkbox" id="' + id + '"' + (on ? ' checked' : '') + '><i></i></label></div>';
  }
  function unitOptions(sel) {
    return SATUAN.map(function (u) { return '<option' + (u === sel ? ' selected' : '') + '>' + u + '</option>'; }).join('');
  }

  /* ---------- kop surat & tanda tangan ---------- */
  function bizLines(s, useLegal) {
    var nama = (useLegal && s.namaLegal) ? s.namaLegal : (s.namaPerusahaan || 'Masterpiece.id');
    var kontak = [s.email, s.telepon].filter(Boolean).join(' · ');
    return '<b>' + esc(nama) + '</b><br>' + esc(s.alamat || '') + (s.alamat ? '<br>' : '') + esc(kontak) + (useLegal && s.npwp ? '<br>NPWP ' + esc(s.npwp) : '');
  }
  function letterhead(s, useLegal) {
    return '<div><img class="dp-logo" src="' + LOGO + '" alt="logo"><div class="dp-biz">' + bizLines(s, useLegal) + '</div></div>';
  }
  function stampSVG(s, iso) {
    var nama = String(s.namaPerusahaan || 'Masterpiece.id').toUpperCase();
    var kota = String(s.kota || '').toUpperCase();
    var tgl = tglPanjang(iso).toUpperCase();
    var c = '#0b6e09';
    return '<svg class="stamp" width="104" height="104" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><path id="stcirc" d="M60,60 m-41,0 a41,41 0 1,1 82,0 a41,41 0 1,1 -82,0"/></defs>' +
      '<circle cx="60" cy="60" r="57" fill="none" stroke="' + c + '" stroke-width="2.6"/><circle cx="60" cy="60" r="52" fill="none" stroke="' + c + '" stroke-width="1"/>' +
      '<text font-family="Arial,sans-serif" font-size="10.5" font-weight="700" letter-spacing="1.6" fill="' + c + '"><textPath href="#stcirc" startOffset="50%" text-anchor="middle">' + esc(nama) + ' · ' + esc(s.tagline ? String(s.tagline).toUpperCase() : 'INTERIOR') + '</textPath></text>' +
      '<line x1="26" y1="50" x2="94" y2="50" stroke="' + c + '" stroke-width="1"/><line x1="26" y1="76" x2="94" y2="76" stroke="' + c + '" stroke-width="1"/>' +
      '<text x="60" y="66" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="800" fill="' + c + '">' + esc(kota || 'LUNAS') + '</text>' +
      '<text x="60" y="90" text-anchor="middle" font-family="Arial,sans-serif" font-size="7.5" font-weight="700" fill="' + c + '">' + esc(tgl) + '</text></svg>';
  }
  // opt: {label, nama, jabatan, img, stamp, kota, tanggal, s}
  function signBlock(o) {
    var place = o.kota || o.tanggal ? '<div class="place">' + esc([o.kota, tglPanjang(o.tanggal)].filter(Boolean).join(', ')) + '</div>' : '<div class="place">&nbsp;</div>';
    return '<div class="dp-sig">' + place + '<div class="area">' + (o.stamp ? stampSVG(o.s || {}, o.tanggal) : '') + (o.img ? '<img class="sg" src="' + o.img + '" alt="tanda tangan">' : '') + '</div>' +
      '<div class="ln">' + esc(o.nama || '') + '</div><div class="role">' + esc(o.jabatan || o.label || '') + '</div></div>';
  }

  /* ---------- pad tanda tangan ---------- */
  function savedSig(key) { try { return localStorage.getItem('mp_sig_' + key) || ''; } catch (e) { return ''; } }
  function saveSig(key, v) { try { if (v) localStorage.setItem('mp_sig_' + key, v); else localStorage.removeItem('mp_sig_' + key); } catch (e) {} }
  // -> Promise<dataURL | '' (hapus) | null (batal)>
  function signPad(opt) {
    opt = opt || {};
    return new Promise(function (resolve) {
      var done = false;
      var key = opt.key || 'company';
      var official = key === 'company' && !!MPD_TTD.v && savedSig(key) === MPD_TTD.v;
      var body = '<p class="mp-hint" style="margin:0 0 10px">' + esc(opt.hint || 'Tanda tangani di kotak di bawah dengan jari atau mouse.') + '</p>' +
        '<canvas id="sgCanvas" width="520" height="190" style="width:100%;height:auto;aspect-ratio:520/190;border:1.5px dashed var(--line);border-radius:12px;background:#fff;touch-action:none;cursor:crosshair"></canvas>' +
        '<div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap"><button type="button" class="mp-btn sm" id="sgClear">Ulangi</button>' +
        (savedSig(key) ? '<button type="button" class="mp-btn ' + (official ? 'dark' : 'sm') + '" id="sgUse">' + (official ? 'Pakai tanda tangan resmi' : 'Pakai tanda tangan tersimpan') + '</button>' : '') +
        (opt.current ? '<button type="button" class="mp-btn sm" id="sgRemove" style="color:var(--rust)">Hapus tanda tangan</button>' : '') + '</div>' +
        '<label style="display:flex;gap:8px;align-items:center;font-size:12.5px;color:var(--ink-soft);margin-top:12px"><input type="checkbox" id="sgSave"' + (opt.key ? ' checked' : '') + '> Simpan di perangkat ini untuk dipakai lagi</label>';
      var m = window.MP.modal({
        title: opt.title || 'Tanda tangan', body: body, okText: 'Pakai tanda tangan', noFocus: true,
        onSubmit: function (f) {
          if (!has) { window.MP.toast('Tanda tangan masih kosong', 'err'); return false; }
          var out = trim(cv);
          if (f.querySelector('#sgSave').checked) saveSig(key, out);
          done = true; resolve(out);
        }
      });
      var cv = m.el.querySelector('#sgCanvas'), ctx = cv.getContext('2d'), drawing = false, has = false;
      ctx.lineWidth = 2.6; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#111';
      function pos(e) { var r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) * cv.width / r.width, y: (e.clientY - r.top) * cv.height / r.height }; }
      cv.addEventListener('pointerdown', function (e) { drawing = true; has = true; cv.setPointerCapture(e.pointerId); var p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + .1, p.y + .1); ctx.stroke(); e.preventDefault(); });
      cv.addEventListener('pointermove', function (e) { if (!drawing) return; var p = pos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); e.preventDefault(); });
      ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (ev) { cv.addEventListener(ev, function () { drawing = false; }); });
      m.el.querySelector('#sgClear').addEventListener('click', function () { ctx.clearRect(0, 0, cv.width, cv.height); has = false; });
      var use = m.el.querySelector('#sgUse');
      if (use) use.addEventListener('click', function () { done = true; resolve(savedSig(key)); m.close(); });
      var rm = m.el.querySelector('#sgRemove');
      if (rm) rm.addEventListener('click', function () { done = true; resolve(''); m.close(); });
      new MutationObserver(function (_, ob) { if (!document.body.contains(m.el)) { ob.disconnect(); if (!done) resolve(null); } }).observe(document.body, { childList: true, subtree: true });
    });
  }
  function trim(cv) {
    var ctx = cv.getContext('2d'), w = cv.width, h = cv.height, d = ctx.getImageData(0, 0, w, h).data;
    var x0 = w, y0 = h, x1 = 0, y1 = 0;
    for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) if (d[(y * w + x) * 4 + 3] > 8) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    if (x1 <= x0 || y1 <= y0) return cv.toDataURL('image/png');
    var pad = 6; x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad); x1 = Math.min(w, x1 + pad); y1 = Math.min(h, y1 + pad);
    var o = document.createElement('canvas'); o.width = x1 - x0; o.height = y1 - y0;
    o.getContext('2d').drawImage(cv, x0, y0, o.width, o.height, 0, 0, o.width, o.height);
    return o.toDataURL('image/png');
  }

  /* ---------- zoom pratinjau ---------- */
  function zoomCtl(stage, sizer, paper, label, minus, plus) {
    var z = 1;
    function apply() {
      paper.style.transform = 'scale(' + z + ')';
      sizer.style.width = Math.round(794 * z) + 'px';
      sizer.style.height = Math.round(paper.offsetHeight * z) + 'px';
      label.textContent = Math.round(z * 100) + '%';
    }
    function fit() { var avail = stage.clientWidth - 36; z = Math.max(.4, Math.min(1, avail / 794)); apply(); }
    minus.addEventListener('click', function () { z = Math.max(.4, +(z - .1).toFixed(2)); apply(); });
    plus.addEventListener('click', function () { z = Math.min(1.4, +(z + .1).toFixed(2)); apply(); });
    window.addEventListener('resize', fit);
    fit();
    return { refresh: apply, fit: fit };
  }

  /* ---------- data bersama ---------- */
  var MPD_TTD = { v: '' };
  async function loadCommon() {
    var d = await window.MP.loadAll({ klien: 'getKlien', proyek: 'getProyek', dok: 'getDokumen', inv: 'getInvoice' });
    var r = await window.MP.get('getSettings');
    d.settings = (r && r.data) || {};
    // tanda tangan resmi (aset perusahaan, hanya Owner/Admin yang menerimanya dari server)
    if (d.settings.pemilikTtd && /^data:image\//.test(d.settings.pemilikTtd)) { MPD_TTD.v = d.settings.pemilikTtd; saveSig('company', MPD_TTD.v); }
    return d;
  }
  function parseData(doc) { try { return JSON.parse(doc.dataJson || '{}') || {}; } catch (e) { return {}; } }
  function printDoc(nomor, paper) {
    paper = paper || document.getElementById('docPaper');
    if (!paper) return;
    var old = document.title;
    document.title = (nomor || 'dokumen') + ' — Masterpiece.id';
    var root = document.getElementById('printRoot');
    if (root) root.remove();
    root = document.createElement('div'); root.id = 'printRoot';
    var clone = paper.cloneNode(true); clone.removeAttribute('id'); clone.style.transform = 'none'; clone.innerHTML = clone.innerHTML.replace(/stcirc/g, 'stcircP');
    root.appendChild(clone); document.body.appendChild(root);
    var cleaned = false;
    function cleanup() { if (cleaned) return; cleaned = true; root.remove(); document.title = old; window.removeEventListener('afterprint', cleanup); }
    window.addEventListener('afterprint', cleanup);
    setTimeout(function () { window.print(); setTimeout(cleanup, 4000); }, 80);
  }
  function qs(name) { try { return new URLSearchParams(location.search).get(name); } catch (e) { return null; } }

  window.MPD = {
    LOGO: LOGO, tabs: tabs, toggle: toggle, unitOptions: unitOptions, SATUAN: SATUAN,
    tglPanjang: tglPanjang, addDays: addDays, terbilang: terbilang, terbilangRupiah: terbilangRupiah, nextNumber: nextNumber,
    letterhead: letterhead, bizLines: bizLines, stampSVG: stampSVG, signBlock: signBlock, signPad: signPad, savedSig: savedSig,
    zoomCtl: zoomCtl, loadCommon: loadCommon, parseData: parseData, printDoc: printDoc, qs: qs
  };
})();
