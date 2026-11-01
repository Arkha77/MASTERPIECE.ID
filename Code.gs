/**
 * MASTERPIECE.ID FINANCE — BACKEND (Google Apps Script)
 */

const SHEET_IDS = {
  USERS: '1YGRi7RfrHxeOWe8YvCuxoZ2-LGNH0tPN5Al7H-FF5KM',
  TRANSAKSI: '132etvwAm616Rgv74CJSO9ZeVXBI7YNutPXZcyA-Tslc',
  PROYEK: '1xP04dLxRh-8QEI-aizLeNjJ4CRCgP7wJfg1xRSBkiTw',
  INVOICE: '1bomYdutohzMCcWMIwYVf_P9f2FDRaeKTTWAoCjQf0ZY',
  RAB: '19vYTuaNplSo4am2gDJRuACHqi95Xeh0UcJ-pFhZCl3k',
  LOG: '1Dpplg2EIjhxD6ZHnYxvULw3D1Xq7LUkeDSdesMl2Am8',
  VENDOR: '1trvzfW48xou5glxBpjVc11fCLPpCvw4LAzBo7PGTU70',
  HUTANG: '10BfgG3tSLQJxS7zJj6NydzVhgmAM2J8AJ73lfOK1G7E',
  SETTINGS: '1cfZsRbuV-Qy5uCy7fURsP-pGAk6PBE97B083K6Bzg8A'
};

const BUKTI_FOLDER_ID = '1Nr6dAq7cRRHqcTC1RIAuKAogTdIjY2vq';
const DB_FOLDER_ID = '1cLZEkRMBvKp85FLze1QPuGin3iknDfKo';

/**
 * Sheet baru dibuat OTOMATIS saat pertama dipakai (tidak perlu bikin manual).
 * ID-nya disimpan di Script Properties. Akses lewat SHEET_IDS.NAMA seperti biasa.
 */
const AUTO_SHEETS = {
  KLIEN: { title: 'Klien', headers: ['kodeKlien', 'namaKlien', 'telepon', 'alamat', 'perusahaan', 'ktp', 'catatan', 'dibuatPada'] },
  KATEGORI: {
    title: 'Kategori', headers: ['id', 'nama', 'jenis', 'lingkup', 'tag'],
    seed: [
      ['K-001', 'Material', 'pengeluaran', 'Project', ''],
      ['K-002', 'Upah Tukang (Worker Wages)', 'pengeluaran', 'Project', ''],
      ['K-003', 'Pembayaran Vendor', 'pengeluaran', 'Both', 'Vendor Project'],
      ['K-004', 'Logistik / Transport', 'pengeluaran', 'Both', ''],
      ['K-005', 'Konsumsi (Food & Drink)', 'pengeluaran', 'Both', ''],
      ['K-006', 'Peralatan (Equipment)', 'pengeluaran', 'Office', ''],
      ['K-007', 'Gaji', 'pengeluaran', 'Office', 'Karyawan'],
      ['K-008', 'Sewa Kantor', 'pengeluaran', 'Office', ''],
      ['K-009', 'Sewa Workshop', 'pengeluaran', 'Office', ''],
      ['K-010', 'Listrik', 'pengeluaran', 'Office', ''],
      ['K-011', 'Internet / Wifi', 'pengeluaran', 'Office', ''],
      ['K-012', 'Marketing', 'pengeluaran', 'Office', ''],
      ['K-013', 'Bayar Cicilan Hutang', 'pengeluaran', 'Office', 'Hutang / Piutang'],
      ['K-014', 'Beri Pinjaman (Piutang)', 'pengeluaran', 'Office', 'Hutang / Piutang'],
      ['K-015', 'Pengeluaran Lain', 'pengeluaran', 'Both', ''],
      ['K-016', 'Down Payment', 'pemasukan', 'Project', ''],
      ['K-017', 'Client Payment', 'pemasukan', 'Project', ''],
      ['K-018', 'Design Fee', 'pemasukan', 'Project', ''],
      ['K-019', 'Suntikan Modal', 'pemasukan', 'Office', ''],
      ['K-020', 'Pelunasan Piutang', 'pemasukan', 'Office', 'Hutang / Piutang'],
      ['K-021', 'Terima Pinjaman (Hutang)', 'pemasukan', 'Office', 'Hutang / Piutang'],
      ['K-022', 'Pemasukan Lain', 'pemasukan', 'Both', '']
    ]
  },
  KONTRAK_VENDOR: { title: 'Kontrak Vendor', headers: ['idKontrak', 'vendor', 'proyekKode', 'proyekNama', 'judul', 'nilaiKontrak', 'deadline', 'status', 'items', 'catatan', 'dibuatOleh', 'dibuatPada'] },
  PEMBAYARAN_VENDOR: { title: 'Pembayaran Vendor', headers: ['idBayar', 'kontrakId', 'vendor', 'tanggal', 'jumlah', 'metode', 'catatan', 'buktiUrl', 'dibuatOleh'] },
  TERMIN: { title: 'Termin Pembayaran', headers: ['idTermin', 'proyekKode', 'proyekNama', 'klienKode', 'klienNama', 'urutan', 'nama', 'persen', 'nominal', 'jatuhTempo', 'status', 'invoiceNo', 'tanggalLunas', 'transaksiId', 'catatan', 'dibuatOleh', 'dibuatPada'] },
  DOKUMEN: { title: 'Dokumen Tersimpan', headers: ['idDokumen', 'tipe', 'nomor', 'tanggal', 'klienKode', 'klienNama', 'proyekKode', 'total', 'status', 'dataJson', 'dibuatOleh', 'dibuatPada', 'diperbarui'] }
};
var _autoCache = {};
Object.keys(AUTO_SHEETS).forEach(function (k) {
  Object.defineProperty(SHEET_IDS, k, { get: function () { return ensureSheet(k); }, enumerable: true });
});

function ensureSheet(key) {
  if (_autoCache[key]) return _autoCache[key];
  var def = AUTO_SHEETS[key];
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('SHEET_' + key);
  if (!id) {
    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      id = props.getProperty('SHEET_' + key);
      if (!id) {
        var ss = SpreadsheetApp.create('Masterpiece - ' + def.title);
        var sh = ss.getSheets()[0];
        sh.setName(def.title);
        sh.getRange(1, 1, 1, def.headers.length).setValues([def.headers]).setFontWeight('bold');
        sh.setFrozenRows(1);
        if (def.seed && def.seed.length) {
          sh.getRange(2, 1, def.seed.length, def.headers.length).setValues(def.seed);
        }
        try { DriveApp.getFileById(ss.getId()).moveTo(DriveApp.getFolderById(DB_FOLDER_ID)); } catch (e) {}
        id = ss.getId();
        props.setProperty('SHEET_' + key, id);
      }
    } finally {
      lock.releaseLock();
    }
  }
  _autoCache[key] = id;
  return id;
}

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  try {
    var params = {};
    if (e.postData && e.postData.contents) {
      params = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      params = e.parameter;
    }

    var action = params.action;
    var result;

    // ---- GERBANG KEAMANAN: semua aksi selain login wajib bawa token sesi yang sah ----
    if (action !== 'login') {
      var auth = verifyToken(params.token);
      if (!auth.ok) return jsonResponse({ success: false, code: 'AUTH', message: auth.message });
      if (ADMIN_ONLY_ACTIONS.indexOf(action) !== -1 && ['Owner', 'Admin'].indexOf(auth.user.role) === -1) {
        return jsonResponse({ success: false, code: 'FORBIDDEN', message: 'Akses ditolak. Fitur ini hanya untuk Owner/Admin.' });
      }
      // identitas diambil dari token, bukan dari kiriman browser (anti pemalsuan)
      params.actorLoginId = auth.user.loginId;
      params.actorRole = auth.user.role;
      params.pelaku = auth.user.nama || auth.user.loginId;
      if (/^add/.test(action)) {
        params.dibuatOleh = params.pelaku;
        if (action === 'addTransaksi') params.diinputOleh = params.pelaku;
      }
      delete params.token;
    }

    switch (action) {
      case 'login':
        result = handleLogin(params);
        break;

      case 'getUsers':
        result = { success: true, data: sheetToObjects(SHEET_IDS.USERS, ['passwordHash']) };
        if (!isPriv(params)) {
          // staf hanya butuh nama untuk dropdown (AE/PM) — data akun lain disembunyikan
          result.data = result.data.map(function (u) { return { loginId: u.loginId, nama: u.nama, role: u.role, status: u.status }; });
        }
        break;
      case 'createUser':
        if (!isAuthorized(params.actorLoginId, ['Owner', 'Admin'])) { result = accessDenied(); break; }
        result = createUser(params);
        logActivity(params.pelaku, 'Tambah user', params.nama + ' (' + params.loginId + ')');
        break;
      case 'updateUser':
        if (!isAuthorized(params.actorLoginId, ['Owner', 'Admin'])) { result = accessDenied(); break; }
        delete params.passwordHash;
        if (params.password) {
          if (String(params.password).length < MIN_PASSWORD) { result = fail('Password minimal ' + MIN_PASSWORD + ' karakter.'); break; }
          params.passwordHash = makeHash(params.password);
        }
        delete params.password;
        result = updateRow(SHEET_IDS.USERS, 'loginId', params.loginId, params);
        clearUserCache(params.loginId);
        logActivity(params.pelaku, 'Edit user', params.loginId);
        break;
      case 'deleteUser':
        if (!isAuthorized(params.actorLoginId, ['Owner', 'Admin'])) { result = accessDenied(); break; }
        if (String(params.loginId) === String(params.actorLoginId)) { result = fail('Anda tidak bisa menghapus akun Anda sendiri.'); break; }
        result = deleteRow(SHEET_IDS.USERS, 'loginId', params.loginId);
        clearUserCache(params.loginId);
        logActivity(params.pelaku, 'Hapus user', params.loginId);
        break;
      case 'changePassword':
        result = changePassword(params);
        break;

      case 'getTransaksi':
        result = { success: true, data: sheetToObjects(SHEET_IDS.TRANSAKSI) };
        if (!isPriv(params)) {
          var vis = visibleProjectSet(params);
          result.data = result.data.filter(function (t) {
            return String(t.diinputOleh) === String(params.pelaku) || projectMatches(vis, t.proyekKode, t.proyekTerkait);
          });
        }
        break;
      case 'addTransaksi':
        if (!isPriv(params)) {
          var visT = visibleProjectSet(params);
          if (!projectMatches(visT, params.proyekKode, params.proyekTerkait)) { result = fail('Anda tidak ditugaskan di proyek ini.'); break; }
        }
        result = handleAddTransaksi(params);
        break;
      case 'updateTransaksi':
        result = handleUpdateTransaksi(params);
        logActivity(params.pelaku, 'Edit transaksi', 'ID ' + params.id);
        break;
      case 'deleteTransaksi':
        result = deleteRow(SHEET_IDS.TRANSAKSI, 'id', params.id);
        logActivity(params.pelaku, 'Hapus transaksi', 'ID ' + params.id);
        break;

      case 'getProyek':
        result = { success: true, data: sheetToObjects(SHEET_IDS.PROYEK) };
        if (!isPriv(params)) result.data = result.data.filter(function (p) { return canSeeProjectRow(params, p); });
        break;
      case 'addProyek':
        result = handleAddProyek(params);
        if (result.success) logActivity(params.pelaku, 'Tambah proyek', (params.kodeProyek || '') + ' ' + params.namaProyek);
        break;
      case 'updateProyek':
        result = handleUpdateProyek(params);
        logActivity(params.pelaku, 'Edit proyek', params.namaProyek || params.idProyek);
        break;
      case 'deleteProyek':
        result = deleteRow(SHEET_IDS.PROYEK, 'idProyek', params.idProyek);
        logActivity(params.pelaku, 'Hapus proyek', params.idProyek);
        break;

      case 'getInvoice':
        // daftar piutang hanya untuk Owner/Admin; staf mendapat daftar kosong
        result = { success: true, data: isPriv(params) ? sheetToObjects(SHEET_IDS.INVOICE) : [] };
        break;
      case 'addInvoice':
        result = addRow(SHEET_IDS.INVOICE, 'INV', [
          'noInvoice', 'tanggal', 'klien', 'proyekTerkait', 'itemDeskripsi',
          'jumlah', 'status', 'jatuhTempo', 'dibuatOleh'
        ], params, 'noInvoice');
        logActivity(params.dibuatOleh, 'Buat invoice', (params.klien || '') + ' (' + formatRupiahLog(params.jumlah) + ')');
        break;
      case 'updateInvoiceStatus':
        result = updateInvoiceStatus(params);
        if (result.success) syncTerminWithInvoice(params);
        logActivity(params.pelaku, 'Update status invoice', params.noInvoice + ' -> ' + params.status);
        break;
      case 'updateInvoice':
        result = updateRow(SHEET_IDS.INVOICE, 'noInvoice', params.noInvoice, params);
        logActivity(params.pelaku, 'Edit invoice', params.noInvoice);
        break;
      case 'deleteInvoice':
        result = deleteRow(SHEET_IDS.INVOICE, 'noInvoice', params.noInvoice);
        logActivity(params.pelaku, 'Hapus invoice', params.noInvoice);
        break;

      case 'getRab':
        result = { success: true, data: sheetToObjects(SHEET_IDS.RAB) };
        break;
      case 'addRab':
        result = addRow(SHEET_IDS.RAB, 'RAB', [
          'idRab', 'tanggal', 'klien', 'proyekTerkait', 'namaRab',
          'totalRab', 'detailItem', 'dibuatOleh'
        ], params, 'idRab');
        logActivity(params.dibuatOleh, 'Simpan RAB', (params.namaRab || '') + ' (' + formatRupiahLog(params.totalRab) + ')');
        break;
      case 'deleteRab':
        result = deleteRow(SHEET_IDS.RAB, 'idRab', params.idRab);
        logActivity(params.pelaku, 'Hapus RAB', params.idRab);
        break;

      case 'getLog':
        if (!isAuthorized(params.actorLoginId, ['Owner', 'Admin'])) { result = accessDenied(); break; }
        result = { success: true, data: getLogData() };
        break;

      case 'getVendor':
        result = { success: true, data: sheetToObjects(SHEET_IDS.VENDOR) };
        break;
      case 'addVendor':
        result = handleAddVendor(params);
        if (result.success) logActivity(params.pelaku, 'Tambah vendor', params.namaVendor);
        break;
      case 'updateVendor':
        result = handleUpdateVendor(params);
        if (result.success) logActivity(params.pelaku, 'Edit vendor', params.idVendor);
        break;
      case 'deleteVendor':
        result = deleteRow(SHEET_IDS.VENDOR, 'idVendor', params.idVendor);
        logActivity(params.pelaku, 'Hapus vendor', params.idVendor);
        break;

      case 'getHutang':
        result = { success: true, data: sheetToObjects(SHEET_IDS.HUTANG) };
        break;
      case 'addHutang':
        result = addRow(SHEET_IDS.HUTANG, 'H', [
          'noHutang', 'tanggal', 'vendor', 'proyekTerkait', 'deskripsi',
          'jumlah', 'status', 'jatuhTempo', 'dibuatOleh'
        ], params, 'noHutang');
        logActivity(params.dibuatOleh, 'Tambah hutang', (params.vendor || '') + ' (' + formatRupiahLog(params.jumlah) + ')');
        break;
      case 'updateHutang':
        result = updateRow(SHEET_IDS.HUTANG, 'noHutang', params.noHutang, params);
        logActivity(params.pelaku, 'Edit hutang', params.noHutang);
        break;
      case 'updateHutangStatus':
        result = updateRow(SHEET_IDS.HUTANG, 'noHutang', params.noHutang, { status: params.status });
        logActivity(params.pelaku, 'Update status hutang', params.noHutang + ' -> ' + params.status);
        break;
      case 'deleteHutang':
        result = deleteRow(SHEET_IDS.HUTANG, 'noHutang', params.noHutang);
        logActivity(params.pelaku, 'Hapus hutang', params.noHutang);
        break;

      case 'getKlien':
        result = { success: true, data: sheetToObjects(SHEET_IDS.KLIEN) };
        break;
      case 'addKlien':
        result = handleAddKlien(params);
        if (result.success) logActivity(params.pelaku, 'Tambah klien', params.kodeKlien + ' ' + params.namaKlien);
        break;
      case 'updateKlien':
        result = updateRow(SHEET_IDS.KLIEN, 'kodeKlien', params.kodeKlien, params);
        logActivity(params.pelaku, 'Edit klien', params.kodeKlien);
        break;
      case 'deleteKlien':
        result = handleDeleteKlien(params);
        if (result.success) logActivity(params.pelaku, 'Hapus klien', params.kodeKlien);
        break;

      case 'getKategori':
        result = { success: true, data: sheetToObjects(SHEET_IDS.KATEGORI) };
        break;
      case 'addKategori':
        result = addRow(SHEET_IDS.KATEGORI, 'K', ['id', 'nama', 'jenis', 'lingkup', 'tag'], params, 'id');
        logActivity(params.pelaku, 'Tambah kategori', params.nama);
        break;
      case 'updateKategori':
        result = updateRow(SHEET_IDS.KATEGORI, 'id', params.id, params);
        logActivity(params.pelaku, 'Edit kategori', params.nama || params.id);
        break;
      case 'deleteKategori':
        result = deleteRow(SHEET_IDS.KATEGORI, 'id', params.id);
        logActivity(params.pelaku, 'Hapus kategori', params.id);
        break;

      case 'getKontrakVendor':
        result = { success: true, data: sheetToObjects(SHEET_IDS.KONTRAK_VENDOR) };
        if (!isPriv(params)) {
          var visK = visibleProjectSet(params);
          result.data = result.data.filter(function (k) { return projectMatches(visK, k.proyekKode, k.proyekNama); });
        }
        break;
      case 'addKontrakVendor':
        params.dibuatPada = new Date().toISOString();
        params.dibuatOleh = params.pelaku;
        result = addRow(SHEET_IDS.KONTRAK_VENDOR, 'KV', ['idKontrak', 'vendor', 'proyekKode', 'proyekNama', 'judul', 'nilaiKontrak', 'deadline', 'status', 'items', 'catatan', 'dibuatOleh', 'dibuatPada'], params, 'idKontrak');
        logActivity(params.pelaku, 'Tambah kontrak vendor', (params.vendor || '') + ' - ' + (params.judul || '') + ' (' + formatRupiahLog(params.nilaiKontrak) + ')');
        break;
      case 'updateKontrakVendor':
        result = updateRow(SHEET_IDS.KONTRAK_VENDOR, 'idKontrak', params.idKontrak, params);
        logActivity(params.pelaku, 'Edit kontrak vendor', params.idKontrak);
        break;
      case 'deleteKontrakVendor':
        result = handleDeleteKontrakVendor(params);
        if (result.success) logActivity(params.pelaku, 'Hapus kontrak vendor', params.idKontrak);
        break;
      case 'getPembayaranVendor':
        result = { success: true, data: sheetToObjects(SHEET_IDS.PEMBAYARAN_VENDOR) };
        if (!isPriv(params)) {
          var visP = visibleProjectSet(params);
          var okIds = {};
          sheetToObjects(SHEET_IDS.KONTRAK_VENDOR).forEach(function (k) { if (projectMatches(visP, k.proyekKode, k.proyekNama)) okIds[String(k.idKontrak)] = 1; });
          result.data = result.data.filter(function (b) { return okIds[String(b.kontrakId)]; });
        }
        break;
      case 'addPembayaranVendor':
        result = handleAddPembayaranVendor(params);
        break;
      case 'deletePembayaranVendor':
        result = handleDeletePembayaranVendor(params);
        break;

      case 'getTermin':
        result = { success: true, data: sheetToObjects(SHEET_IDS.TERMIN) };
        break;
      case 'addTermin':
        result = handleAddTermin(params);
        break;
      case 'addTerminBatch':
        result = handleAddTerminBatch(params);
        break;
      case 'updateTermin':
        result = handleUpdateTermin(params);
        break;
      case 'deleteTermin':
        result = handleDeleteTermin(params);
        break;
      case 'lunasiTermin':
        result = handleLunasiTermin(params);
        break;
      case 'batalLunasTermin':
        result = handleBatalLunasTermin(params);
        break;

      case 'getDokumen':
        result = { success: true, data: sheetToObjects(SHEET_IDS.DOKUMEN) };
        if (!isPriv(params)) {
          var visD = visibleProjectSet(params);
          result.data = result.data.filter(function (d) {
            return String(d.dibuatOleh) === String(params.pelaku) || (d.proyekKode && projectMatches(visD, d.proyekKode, ''));
          });
        }
        break;
      case 'saveDokumen':
        result = handleSaveDokumen(params);
        break;
      case 'deleteDokumen':
        result = handleDeleteDokumen(params);
        break;

      case 'getSettings':
        result = { success: true, data: getSettingsData(isPriv(params)) };
        break;
      case 'uploadKtpPemilik':
        result = uploadKtpPemilik(params);
        break;
      case 'getKtpPemilik':
        result = getKtpPemilik();
        break;
      case 'updateSettings':
        result = updateSettingsData(params);
        logActivity(params.pelaku, 'Update pengaturan perusahaan', '');
        break;

      default:
        result = { success: false, message: 'Aksi tidak dikenali: ' + action };
    }

    return jsonResponse(result);
  } catch (err) {
    return jsonResponse({ success: false, message: 'Error: ' + err.message });
  }
}

// =================== AUTH & USER ===================

function handleLogin(params) {
  var loginId = String(params.loginId || '').trim();
  var password = String(params.password || '');
  if (!loginId || !password) return { success: false, message: 'Login ID dan password wajib diisi.' };

  // anti tebak-tebakan password: maks 5 gagal per 10 menit per Login ID
  var cache = CacheService.getScriptCache();
  var failKey = 'fail_' + loginId.toLowerCase();
  var fails = Number(cache.get(failKey) || 0);
  if (fails >= MAX_LOGIN_FAILS) {
    return { success: false, message: 'Terlalu banyak percobaan gagal. Coba lagi dalam 10 menit.' };
  }

  var sheet = SpreadsheetApp.openById(SHEET_IDS.USERS).getSheets()[0];
  var data = sheet.getDataRange().getValues();
  var headers = data[0].map(normalizeHeader);
  var loginIdCol = headers.indexOf('loginId');
  var passCol = headers.indexOf('passwordHash');
  var statusCol = headers.indexOf('status');

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (String(row[loginIdCol]).trim() !== loginId) continue;

    if (String(row[statusCol]).toLowerCase() !== 'aktif') {
      return { success: false, message: 'Akun tidak aktif. Hubungi admin.' };
    }
    var stored = String(row[passCol] || '');
    if (stored === '') {
      return { success: false, message: 'Password akun ini belum diatur. Owner perlu menjalankan fungsi aturPasswordAwal di Apps Script.' };
    }
    if (!verifyPassword(stored, password)) {
      cache.put(failKey, String(fails + 1), 600);
      return { success: false, message: 'Login ID atau password salah.' };
    }
    cache.remove(failKey);
    // upgrade hash lama (tanpa salt) ke hash bersalt secara diam-diam
    if (stored.indexOf('s1$') !== 0) sheet.getRange(i + 1, passCol + 1).setValue(makeHash(password));

    var user = {};
    headers.forEach(function (h, idx) {
      if (h !== 'passwordHash') user[h] = row[idx];
    });
    user.token = createToken(user.loginId, user.role);
    user.mustChangePassword = false;
    logActivity(user.nama || user.loginId, 'Login', '');
    return { success: true, user: user };
  }
  cache.put(failKey, String(fails + 1), 600);
  return { success: false, message: 'Login ID atau password salah.' };
}

function createUser(params) {
  if (!params.password || String(params.password).length < MIN_PASSWORD) {
    return fail('Password minimal ' + MIN_PASSWORD + ' karakter.');
  }
  var result = addRow(SHEET_IDS.USERS, 'U', [
    'id', 'nama', 'email', 'loginId', 'passwordHash', 'role', 'status', 'tanggalDibuat'
  ], {
    nama: params.nama || '',
    email: params.email || '',
    loginId: params.loginId || '',
    passwordHash: makeHash(params.password),
    role: params.role || 'Staff',
    status: 'Aktif',
    tanggalDibuat: new Date().toISOString()
  }, 'id');
  return result;
}

function changePassword(params) {
  // hanya boleh mengganti password akun sendiri (identitas dari token)
  var loginId = String(params.actorLoginId || '').trim();
  if (!params.newPassword || String(params.newPassword).length < MIN_PASSWORD) {
    return fail('Password baru minimal ' + MIN_PASSWORD + ' karakter.');
  }
  var sheet = SpreadsheetApp.openById(SHEET_IDS.USERS).getSheets()[0];
  var data = sheet.getDataRange().getValues();
  var headers = data[0].map(normalizeHeader);
  var loginIdCol = headers.indexOf('loginId');
  var passCol = headers.indexOf('passwordHash');

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][loginIdCol]).trim() === loginId) {
      var stored = String(data[i][passCol] || '');
      if (!verifyPassword(stored, params.oldPassword || '')) {
        return { success: false, message: 'Password lama salah.' };
      }
      sheet.getRange(i + 1, passCol + 1).setValue(makeHash(params.newPassword));
      logActivity(loginId, 'Ganti password', '');
      return { success: true };
    }
  }
  return { success: false, message: 'User tidak ditemukan.' };
}

// =================== KEAMANAN: TOKEN, HASH, ROLE ===================

var MIN_PASSWORD = 8;
var MAX_LOGIN_FAILS = 5;
var TOKEN_TTL_HOURS = 72;

// Aksi yang hanya boleh dijalankan Owner/Admin (dicek di server, bukan hanya di tampilan)
var ADMIN_ONLY_ACTIONS = [
  'getLog',
  'createUser', 'updateUser', 'deleteUser',
  'updateSettings', 'uploadKtpPemilik', 'getKtpPemilik',
  'getTermin', 'addTermin', 'addTerminBatch', 'updateTermin', 'deleteTermin', 'lunasiTermin', 'batalLunasTermin', 'updateInvoiceStatus',
  'getHutang', 'addHutang', 'updateHutang', 'updateHutangStatus', 'deleteHutang',
  'updateTransaksi', 'deleteTransaksi',
  'addInvoice', 'updateInvoice', 'deleteInvoice',
  'deleteRab',
  'deleteProyek', 'deleteKlien', 'deleteVendor', 'deleteKategori',
  'deleteKontrakVendor', 'deletePembayaranVendor', 'deleteDokumen'
];

function isPriv(params) { return ['Owner', 'Admin'].indexOf(params.actorRole) !== -1; }

// Staf (non Owner/Admin) hanya melihat proyek yang ditugaskan padanya (AE/PM) atau yang belum punya penugasan
function canSeeProjectRow(params, p) {
  var ae = String(p.accountExecutive || '').trim().toLowerCase(), pm = String(p.projectManager || '').trim().toLowerCase();
  if (!ae && !pm) return true;
  var me = [params.pelaku, params.actorLoginId].filter(Boolean).map(function (x) { return String(x).trim().toLowerCase(); });
  return me.indexOf(ae) !== -1 || me.indexOf(pm) !== -1;
}
function visibleProjectSet(params) {
  var set = { kode: {}, nama: {} };
  sheetToObjects(SHEET_IDS.PROYEK).forEach(function (p) {
    if (!canSeeProjectRow(params, p)) return;
    if (p.kodeProyek) set.kode[String(p.kodeProyek).trim().toLowerCase()] = 1;
    if (p.namaProyek) set.nama[String(p.namaProyek).trim().toLowerCase()] = 1;
  });
  return set;
}
function projectMatches(set, kode, nama) {
  var k = String(kode || '').trim().toLowerCase(), n = String(nama || '').trim().toLowerCase();
  if (!k && !n) return false;
  if (k && set.kode[k]) return true;
  if (n && (set.nama[n] || set.kode[n])) return true;
  // label gabungan "KODE · Nama"
  var parts = n.split('·').map(function (x) { return x.trim(); });
  return parts.some(function (x) { return x && (set.kode[x] || set.nama[x]); });
}

function getSecret() {
  var props = PropertiesService.getScriptProperties();
  var sec = props.getProperty('MP_SECRET');
  if (!sec) {
    sec = Utilities.getUuid() + Utilities.getUuid() + Utilities.getUuid();
    props.setProperty('MP_SECRET', sec);
  }
  return sec;
}

function b64url(bytesOrStr) {
  var enc = typeof bytesOrStr === 'string'
    ? Utilities.base64EncodeWebSafe(bytesOrStr, Utilities.Charset.UTF_8)
    : Utilities.base64EncodeWebSafe(bytesOrStr);
  return enc.replace(/=+$/, '');
}

function signPayload(payloadB64) {
  return b64url(Utilities.computeHmacSha256Signature(payloadB64, getSecret()));
}

function createToken(loginId, role) {
  var payload = b64url(JSON.stringify({ u: loginId, e: Date.now() + TOKEN_TTL_HOURS * 3600 * 1000 }));
  return payload + '.' + signPayload(payload);
}

function sameString(a, b) {
  if (a.length !== b.length) return false;
  var diff = 0;
  for (var i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// -> { ok:true, user:{loginId,nama,role} } atau { ok:false, message }
function verifyToken(token) {
  var bad = { ok: false, message: 'Sesi tidak valid atau sudah berakhir. Silakan login lagi.' };
  if (!token || typeof token !== 'string' || token.indexOf('.') === -1) return bad;
  var parts = token.split('.');
  if (parts.length !== 2) return bad;
  if (!sameString(signPayload(parts[0]), parts[1])) return bad;
  var data;
  try {
    var json = Utilities.newBlob(Utilities.base64DecodeWebSafe(parts[0] + '===='.slice(parts[0].length % 4 || 4))).getDataAsString();
    data = JSON.parse(json);
  } catch (err) { return bad; }
  if (!data || !data.u || !data.e || Date.now() > Number(data.e)) return bad;
  // role & status selalu dibaca dari sheet Users (jadi perubahan role/nonaktif langsung berlaku)
  var u = getUserRecord(data.u);
  if (!u || String(u.status).toLowerCase() !== 'aktif') {
    return { ok: false, message: 'Akun tidak aktif atau tidak ditemukan.' };
  }
  return { ok: true, user: u };
}

function getUserRecord(loginId) {
  var cache = CacheService.getScriptCache();
  var key = 'usr_' + String(loginId).toLowerCase();
  var hit = cache.get(key);
  if (hit) { try { return JSON.parse(hit); } catch (e) {} }
  var sheet = SpreadsheetApp.openById(SHEET_IDS.USERS).getSheets()[0];
  var data = sheet.getDataRange().getValues();
  var headers = data[0].map(normalizeHeader);
  var iLogin = headers.indexOf('loginId'), iNama = headers.indexOf('nama'), iRole = headers.indexOf('role'), iStatus = headers.indexOf('status');
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][iLogin]).trim() === String(loginId).trim()) {
      var rec = { loginId: String(data[i][iLogin]).trim(), nama: String(data[i][iNama] || ''), role: String(data[i][iRole] || '').trim(), status: String(data[i][iStatus] || '') };
      cache.put(key, JSON.stringify(rec), 60);
      return rec;
    }
  }
  return null;
}

function clearUserCache(loginId) {
  CacheService.getScriptCache().remove('usr_' + String(loginId).toLowerCase());
}

// Hash password: format baru "s1$salt$hex" (bersalt). Hash lama (hex polos SHA-256) tetap bisa diverifikasi.
function sha256Hex(str) {
  var digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, str, Utilities.Charset.UTF_8);
  return digest.map(function (b) { return (b < 0 ? b + 256 : b).toString(16).padStart(2, '0'); }).join('');
}
function makeHash(password) {
  var salt = Utilities.getUuid().replace(/-/g, '').slice(0, 16);
  return 's1$' + salt + '$' + sha256Hex(salt + String(password));
}
function verifyPassword(stored, password) {
  stored = String(stored || '');
  if (!stored) return false;
  if (stored.indexOf('s1$') === 0) {
    var p = stored.split('$');
    return p.length === 3 && sameString(sha256Hex(p[1] + String(password)), p[2]);
  }
  return sameString(sha256Hex(String(password)), stored);
}
function hashPassword(password) { return sha256Hex(String(password)); }

/**
 * SETUP AWAL / RESET PASSWORD — dijalankan SEKALI dari editor Apps Script oleh Owner.
 * 1) Ubah LOGIN_ID dan PASSWORD_BARU di bawah (min. 8 karakter)
 * 2) Pilih fungsi "aturPasswordAwal" di dropdown atas, klik Jalankan
 * 3) Setelah selesai, kembalikan PASSWORD_BARU jadi kosong ('') agar tidak tersimpan di kode
 */
function aturPasswordAwal() {
  var LOGIN_ID = 'admin';
  var PASSWORD_BARU = '';   // <-- isi password baru di antara tanda kutip, lalu Jalankan

  if (!PASSWORD_BARU || PASSWORD_BARU.length < MIN_PASSWORD) throw new Error('Isi PASSWORD_BARU minimal ' + MIN_PASSWORD + ' karakter dulu.');
  var sheet = SpreadsheetApp.openById(SHEET_IDS.USERS).getSheets()[0];
  var data = sheet.getDataRange().getValues();
  var headers = data[0].map(normalizeHeader);
  var iLogin = headers.indexOf('loginId'), iPass = headers.indexOf('passwordHash');
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][iLogin]).trim() === LOGIN_ID) {
      sheet.getRange(i + 1, iPass + 1).setValue(makeHash(PASSWORD_BARU));
      clearUserCache(LOGIN_ID);
      Logger.log('Password untuk "' + LOGIN_ID + '" berhasil diatur. Kosongkan lagi PASSWORD_BARU di kode.');
      return;
    }
  }
  throw new Error('Login ID "' + LOGIN_ID + '" tidak ditemukan di sheet Users.');
}


// =================== TERMIN PEMBAYARAN PROYEK ===================

var TERMIN_FIELDS = ['idTermin', 'proyekKode', 'proyekNama', 'klienKode', 'klienNama', 'urutan', 'nama', 'persen', 'nominal', 'jatuhTempo', 'status', 'invoiceNo', 'tanggalLunas', 'transaksiId', 'catatan', 'dibuatOleh', 'dibuatPada'];

function terminById(id) {
  return sheetToObjects(SHEET_IDS.TERMIN).filter(function (t) { return String(t.idTermin) === String(id); })[0];
}
function terminDate(v) {
  if (v instanceof Date) return Utilities.formatDate(v, 'Asia/Jakarta', 'yyyy-MM-dd');
  var x = String(v == null ? '' : v).trim();
  return /^\d{4}-\d{2}-\d{2}/.test(x) ? x.slice(0, 10) : x;
}
function terminNum(v) { var n = Number(String(v == null ? '' : v).replace(/[^\d.-]/g, '')); return isFinite(n) ? n : 0; }

function cleanTerminInput(p) {
  var nominal = terminNum(p.nominal);
  if (nominal <= 0) return { error: 'Nominal termin harus lebih dari 0.' };
  if (!String(p.nama || '').trim()) return { error: 'Nama termin wajib diisi.' };
  return {
    proyekKode: String(p.proyekKode || '').trim(), proyekNama: String(p.proyekNama || '').trim(),
    klienKode: String(p.klienKode || '').trim(), klienNama: String(p.klienNama || '').trim(),
    urutan: terminNum(p.urutan) || 1, nama: String(p.nama).trim(), persen: terminNum(p.persen),
    nominal: nominal, jatuhTempo: terminDate(p.jatuhTempo), catatan: String(p.catatan || '').trim()
  };
}

function handleAddTermin(params) {
  var c = cleanTerminInput(params);
  if (c.error) return fail(c.error);
  if (!c.proyekKode && !c.proyekNama) return fail('Proyek wajib dipilih.');
  c.status = 'belum'; c.invoiceNo = ''; c.tanggalLunas = ''; c.transaksiId = ''; c.dibuatOleh = params.pelaku; c.dibuatPada = new Date().toISOString();
  var r = addRow(SHEET_IDS.TERMIN, 'TRM', TERMIN_FIELDS, c, 'idTermin');
  if (r.success) logActivity(params.pelaku, 'Tambah termin', c.proyekKode + ' ' + c.nama + ' (' + formatRupiahLog(c.nominal) + ')');
  return r;
}

function handleAddTerminBatch(params) {
  var items = params.items;
  if (typeof items === 'string') { try { items = JSON.parse(items); } catch (e) { items = null; } }
  if (!items || !items.length) return fail('Daftar termin kosong.');
  if (items.length > 20) return fail('Maksimal 20 termin per proyek sekaligus.');
  var base = { proyekKode: params.proyekKode, proyekNama: params.proyekNama, klienKode: params.klienKode, klienNama: params.klienNama };
  var rows = [];
  for (var i = 0; i < items.length; i++) {
    var it = items[i] || {};
    var c = cleanTerminInput({ proyekKode: base.proyekKode, proyekNama: base.proyekNama, klienKode: base.klienKode, klienNama: base.klienNama,
      urutan: i + 1, nama: it.nama, persen: it.persen, nominal: it.nominal, jatuhTempo: it.jatuhTempo, catatan: it.catatan });
    if (c.error) return fail('Termin ' + (i + 1) + ': ' + c.error);
    rows.push(c);
  }
  if (!base.proyekKode && !base.proyekNama) return fail('Proyek wajib dipilih.');
  var ids = [];
  rows.forEach(function (c) {
    c.status = 'belum'; c.invoiceNo = ''; c.tanggalLunas = ''; c.transaksiId = ''; c.dibuatOleh = params.pelaku; c.dibuatPada = new Date().toISOString();
    ids.push(addRow(SHEET_IDS.TERMIN, 'TRM', TERMIN_FIELDS, c, 'idTermin').id);
  });
  logActivity(params.pelaku, 'Buat jadwal termin', (base.proyekKode || base.proyekNama) + ' (' + rows.length + ' termin)');
  return { success: true, ids: ids };
}

function handleUpdateTermin(params) {
  var t = terminById(params.idTermin);
  if (!t) return fail('Termin tidak ditemukan.');
  var c = cleanTerminInput(Object.assign({}, t, params));
  if (c.error) return fail(c.error);
  if (t.status === 'lunas' && terminNum(c.nominal) !== terminNum(t.nominal)) return fail('Termin sudah lunas. Batalkan pelunasan dulu sebelum mengubah nominal.');
  var upd = { urutan: c.urutan, nama: c.nama, persen: c.persen, nominal: c.nominal, jatuhTempo: c.jatuhTempo, catatan: c.catatan };
  var r = updateRow(SHEET_IDS.TERMIN, 'idTermin', params.idTermin, upd);
  if (r.success) logActivity(params.pelaku, 'Edit termin', t.proyekKode + ' ' + c.nama);
  return r;
}

function handleDeleteTermin(params) {
  var t = terminById(params.idTermin);
  if (!t) return fail('Termin tidak ditemukan.');
  if (t.status === 'lunas') return fail('Termin sudah lunas. Batalkan pelunasan dulu sebelum menghapus.');
  var r = deleteRow(SHEET_IDS.TERMIN, 'idTermin', params.idTermin);
  if (r.success) logActivity(params.pelaku, 'Hapus termin', t.proyekKode + ' ' + t.nama);
  return r;
}

// Tandai lunas: mencatat pemasukan ke proyek + menandai invoice terkait lunas. Aman dipanggil dua kali.
function settleTermin(id, tanggal, metode, pelaku) {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    var t = terminById(id);
    if (!t) return fail('Termin tidak ditemukan.');
    if (t.status === 'lunas') return { success: true, already: true };
    var tgl = terminDate(tanggal) || Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd');
    var tx = addRow(SHEET_IDS.TRANSAKSI, 'T', TRANSAKSI_FIELDS, {
      tanggal: tgl, jenis: 'pemasukan', kategori: 'Client Payment', jumlah: terminNum(t.nominal),
      keterangan: 'Termin ' + t.nama + ' — ' + (t.proyekNama || t.proyekKode),
      proyekTerkait: t.proyekNama, proyekKode: t.proyekKode, metodePembayaran: metode || 'Transfer Bank',
      diinputOleh: pelaku || 'Sistem', refPembayaran: 'TERMIN:' + t.idTermin
    }, 'id');
    updateRow(SHEET_IDS.TERMIN, 'idTermin', id, { status: 'lunas', tanggalLunas: tgl, transaksiId: tx.id });
    if (t.invoiceNo) { try { updateInvoiceStatus({ noInvoice: t.invoiceNo, status: 'Lunas' }); } catch (e) {} }
    logActivity(pelaku, 'Termin lunas', (t.proyekKode || t.proyekNama) + ' · ' + t.nama + ' (' + formatRupiahLog(t.nominal) + ')');
    return { success: true, transaksiId: tx.id };
  } finally { lock.releaseLock(); }
}

function unsettleTermin(id, pelaku) {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    var t = terminById(id);
    if (!t) return fail('Termin tidak ditemukan.');
    if (t.status !== 'lunas') return { success: true, already: true };
    if (t.transaksiId) deleteRow(SHEET_IDS.TRANSAKSI, 'id', t.transaksiId);
    updateRow(SHEET_IDS.TERMIN, 'idTermin', id, { status: t.invoiceNo ? 'ditagih' : 'belum', tanggalLunas: '', transaksiId: '' });
    if (t.invoiceNo) { try { updateInvoiceStatus({ noInvoice: t.invoiceNo, status: 'Belum Lunas' }); } catch (e) {} }
    logActivity(pelaku, 'Batal lunas termin', (t.proyekKode || t.proyekNama) + ' · ' + t.nama);
    return { success: true };
  } finally { lock.releaseLock(); }
}

function handleLunasiTermin(params) { return settleTermin(params.idTermin, params.tanggal, params.metode, params.pelaku); }
function handleBatalLunasTermin(params) { return unsettleTermin(params.idTermin, params.pelaku); }

function isLunasStatus(st) { st = String(st || '').toLowerCase(); return st.indexOf('belum') === -1 && st.indexOf('lunas') !== -1; }

// Dipanggil setelah status invoice diubah dari mana pun: sinkronkan termin yang memakai invoice itu
function syncTerminWithInvoice(params) {
  var list = sheetToObjects(SHEET_IDS.TERMIN).filter(function (t) { return String(t.invoiceNo) === String(params.noInvoice); });
  list.forEach(function (t) {
    if (isLunasStatus(params.status)) settleTermin(t.idTermin, '', '', params.pelaku);
    else if (t.status === 'lunas') unsettleTermin(t.idTermin, params.pelaku);
  });
}

function linkTerminInvoice(idTermin, nomor) {
  var t = terminById(idTermin);
  if (!t) return;
  // satu invoice hanya untuk satu termin
  sheetToObjects(SHEET_IDS.TERMIN).forEach(function (o) {
    if (String(o.invoiceNo) === String(nomor) && String(o.idTermin) !== String(idTermin) && o.status !== 'lunas') {
      updateRow(SHEET_IDS.TERMIN, 'idTermin', o.idTermin, { invoiceNo: '', status: 'belum' });
    }
  });
  updateRow(SHEET_IDS.TERMIN, 'idTermin', idTermin, { invoiceNo: nomor, status: t.status === 'lunas' ? 'lunas' : 'ditagih' });
}

function unlinkTerminInvoice(nomor) {
  sheetToObjects(SHEET_IDS.TERMIN).forEach(function (t) {
    if (String(t.invoiceNo) !== String(nomor)) return;
    updateRow(SHEET_IDS.TERMIN, 'idTermin', t.idTermin, { invoiceNo: '', status: t.status === 'lunas' ? 'lunas' : 'belum' });
  });
}

// =================== TRANSAKSI (dengan upload bukti) ===================

var TRANSAKSI_FIELDS = [
  'id', 'tanggal', 'jenis', 'kategori', 'jumlah', 'biayaTransfer', 'keterangan',
  'proyekTerkait', 'proyekKode', 'vendorTerkait', 'dibayarKepada', 'metodePembayaran',
  'diinputOleh', 'buktiUrl', 'kontrakVendorId', 'refPembayaran'
];

// Upload satu atau banyak foto bukti. buktiFiles = [{base64,mime,name}], atau buktiBase64 tunggal (lama)
function collectBukti(params) {
  var urls = [];
  if (params.buktiUrl) urls.push(params.buktiUrl);
  if (params.buktiFiles && params.buktiFiles.length) {
    params.buktiFiles.forEach(function (f) {
      if (f && f.base64) urls.push(saveFileToDrive(f.base64, f.name || 'bukti.jpg', f.mime || 'image/jpeg'));
    });
  }
  if (params.buktiBase64) {
    urls.push(saveFileToDrive(params.buktiBase64, params.buktiFilename || 'bukti.jpg', params.buktiMimeType || 'image/jpeg'));
  }
  return urls.join(',');
}

function handleAddTransaksi(params) {
  params.buktiUrl = collectBukti(params);
  var r = addRow(SHEET_IDS.TRANSAKSI, 'T', TRANSAKSI_FIELDS, params, 'id');
  logActivity(params.diinputOleh || params.pelaku, 'Catat ' + (params.jenis || 'transaksi'), (params.keterangan || params.kategori || '') + ' (' + formatRupiahLog(params.jumlah) + ')');
  return r;
}

function handleUpdateTransaksi(params) {
  var u = collectBukti(params);
  if (u) params.buktiUrl = u; else delete params.buktiUrl;
  ensureColumns(SHEET_IDS.TRANSAKSI, TRANSAKSI_FIELDS);
  return updateRow(SHEET_IDS.TRANSAKSI, 'id', params.id, params);
}

function saveFileToDrive(base64Data, filename, mimeType) {
  var folder = DriveApp.getFolderById(BUKTI_FOLDER_ID);
  var decoded = Utilities.base64Decode(base64Data);
  var blob = Utilities.newBlob(decoded, mimeType, filename);
  var file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}

// =================== LOG AKTIVITAS ===================

function logActivity(pelaku, aksi, detail) {
  try {
    var sheet = SpreadsheetApp.openById(SHEET_IDS.LOG).getSheets()[0];
    sheet.appendRow([new Date().toISOString(), pelaku || '-', aksi, detail || '']);
  } catch (err) {
    // jangan sampai gagal log menghentikan aksi utama
  }
}

function getSettingsData(priv) {
  var sheet = SpreadsheetApp.openById(SHEET_IDS.SETTINGS).getSheets()[0];
  var data = sheet.getDataRange().getValues();
  var settings = {};
  for (var i = 1; i < data.length; i++) {
    if (data[i][0]) settings[data[i][0]] = data[i][1];
  }
  if (!priv) { Object.keys(settings).forEach(function (k) { if (/^pemilik/.test(k)) delete settings[k]; }); } // data identitas pemilik hanya Owner/Admin
  return settings;
}

function updateSettingsData(params) {
  var sheet = SpreadsheetApp.openById(SHEET_IDS.SETTINGS).getSheets()[0];
  var data = sheet.getDataRange().getValues();
  var keysToUpdate = ['namaPerusahaan', 'namaLegal', 'alamat', 'email', 'telepon', 'tagline', 'kota', 'npwp', 'bank', 'noRekening', 'atasNamaRekening', 'penandatangan', 'jabatan', 'ppnPersen', 'catatanDefault', 'prefixInvoice', 'pemilikNama', 'pemilikNik', 'pemilikAlamat', 'pemilikHp', 'pemilikTtd'];

  keysToUpdate.forEach(function (key) {
    if (params[key] === undefined) return;
    var found = false;
    for (var i = 1; i < data.length; i++) {
      if (data[i][0] === key) {
        sheet.getRange(i + 1, 2).setValue(params[key]);
        found = true;
        break;
      }
    }
    if (!found) {
      sheet.appendRow([key, params[key]]);
    }
  });
  return { success: true };
}

// =================== IDENTITAS PEMILIK (KTP) ===================
// Foto KTP disimpan PRIBADI di Drive (tidak dibagikan lewat link), hanya Owner/Admin yang bisa mengambilnya lewat server.
function setSettingValue(key, value) {
  var sheet = SpreadsheetApp.openById(SHEET_IDS.SETTINGS).getSheets()[0];
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === key) { sheet.getRange(i + 1, 2).setValue(value); return; }
  }
  sheet.appendRow([key, value]);
}
function identitasFolder() {
  var parent = DriveApp.getFolderById(BUKTI_FOLDER_ID);
  var it = parent.getFoldersByName('Identitas Pemilik (Privat)');
  return it.hasNext() ? it.next() : parent.createFolder('Identitas Pemilik (Privat)');
}
function simpanKtpPemilik(base64Data, mimeType) {
  if (!base64Data) return fail('Foto KTP kosong.');
  if (String(base64Data).length > 6000000) return fail('Foto terlalu besar. Perkecil dulu.');
  var old = String(getSettingsData(true).pemilikKtpId || '');
  var blob = Utilities.newBlob(Utilities.base64Decode(base64Data), mimeType || 'image/jpeg', 'KTP-Pemilik.jpg');
  var file = identitasFolder().createFile(blob);
  file.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE);
  setSettingValue('pemilikKtpId', file.getId());
  if (old) { try { DriveApp.getFileById(old).setTrashed(true); } catch (e) {} }
  return { success: true, id: file.getId() };
}
function uploadKtpPemilik(params) {
  var r = simpanKtpPemilik(params.base64, params.mime);
  if (r.success) logActivity(params.pelaku, 'Ganti foto KTP pemilik', '');
  return r;
}
function getKtpPemilik() {
  var id = String(getSettingsData(true).pemilikKtpId || '');
  if (!id) return { success: true, data: '' };
  try {
    var blob = DriveApp.getFileById(id).getBlob();
    return { success: true, data: 'data:' + blob.getContentType() + ';base64,' + Utilities.base64Encode(blob.getBytes()) };
  } catch (e) { return fail('Foto KTP tidak ditemukan di Drive.'); }
}

function getLogData() {
  var sheet = SpreadsheetApp.openById(SHEET_IDS.LOG).getSheets()[0];
  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  var headers = data[0].map(normalizeHeader);
  var rows = [];
  for (var i = data.length - 1; i >= 1; i--) {
    var obj = {};
    var isEmpty = true;
    headers.forEach(function (h, idx) {
      obj[h] = data[i][idx];
      if (data[i][idx] !== '' && data[i][idx] !== null) isEmpty = false;
    });
    if (!isEmpty) rows.push(obj);
    if (rows.length >= 200) break; // batasi 200 log terbaru
  }
  return rows;
}

// =================== KLIEN / PROYEK / VENDOR ===================

function fail(msg) { return { success: false, message: msg }; }

// Pastikan kolom ada di sheet (self-healing) & opsional paksa format teks (supaya 0812... tidak jadi angka)
function ensureColumns(sheetId, fields, textCols) {
  var sheet = SpreadsheetApp.openById(sheetId).getSheets()[0];
  var lastCol = Math.max(sheet.getLastColumn(), 1);
  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(normalizeHeader);
  fields.forEach(function (f) {
    if (headers.indexOf(f) === -1) {
      sheet.getRange(1, headers.length + 1).setValue(f);
      headers.push(f);
    }
  });
  (textCols || []).forEach(function (c) {
    var idx = headers.indexOf(c);
    if (idx !== -1) sheet.getRange(1, idx + 1, sheet.getMaxRows(), 1).setNumberFormat('@');
  });
}

var KLIEN_FIELDS = ['kodeKlien', 'namaKlien', 'telepon', 'alamat', 'perusahaan', 'ktp', 'catatan', 'dibuatPada'];

function handleAddKlien(params) {
  var kode = String(params.kodeKlien || '').trim().toUpperCase();
  if (!/^[A-Z]{4}$/.test(kode)) return fail('Kode klien harus tepat 4 huruf (A-Z).');
  if (!String(params.namaKlien || '').trim()) return fail('Nama klien wajib diisi.');
  var exists = sheetToObjects(SHEET_IDS.KLIEN).some(function (k) { return String(k.kodeKlien).toUpperCase() === kode; });
  if (exists) return fail('Kode klien ' + kode + ' sudah dipakai klien lain.');
  params.kodeKlien = kode;
  params.dibuatPada = new Date().toISOString();
  ensureColumns(SHEET_IDS.KLIEN, KLIEN_FIELDS, ['kodeKlien', 'telepon', 'ktp']);
  return addRow(SHEET_IDS.KLIEN, 'KL', KLIEN_FIELDS, params, 'kodeKlien');
}

function handleDeleteKlien(params) {
  var kode = String(params.kodeKlien || '').toUpperCase();
  var used = sheetToObjects(SHEET_IDS.PROYEK).some(function (p) { return String(p.klienKode || '').toUpperCase() === kode; });
  if (used) return fail('Klien ini masih punya proyek. Hapus/pindahkan proyeknya dulu.');
  return deleteRow(SHEET_IDS.KLIEN, 'kodeKlien', kode);
}

var PROYEK_FIELDS = [
  'idProyek', 'kodeProyek', 'namaProyek', 'klienKode', 'klien', 'tanggalMulai', 'tanggalSelesai',
  'status', 'nilaiKontrak', 'budgetSpend', 'totalBiaya', 'totalPemasukan',
  'accountExecutive', 'projectManager', 'keterangan'
];

function handleAddProyek(params) {
  if (!String(params.namaProyek || '').trim()) return fail('Nama proyek wajib diisi.');
  var kode = String(params.kodeProyek || '').trim().toUpperCase();
  if (kode) {
    var dup = sheetToObjects(SHEET_IDS.PROYEK).some(function (p) { return String(p.kodeProyek || '').toUpperCase() === kode; });
    if (dup) return fail('Kode proyek ' + kode + ' sudah ada.');
  }
  params.kodeProyek = kode;
  if (params.totalBiaya === undefined && params.nilaiKontrak !== undefined) params.totalBiaya = params.nilaiKontrak;
  if (!params.status) params.status = 'active';
  ensureColumns(SHEET_IDS.PROYEK, PROYEK_FIELDS, ['kodeProyek']);
  return addRow(SHEET_IDS.PROYEK, 'P', PROYEK_FIELDS, params, 'idProyek');
}

function handleUpdateProyek(params) {
  if (params.nilaiKontrak !== undefined && params.totalBiaya === undefined) params.totalBiaya = params.nilaiKontrak;
  ensureColumns(SHEET_IDS.PROYEK, PROYEK_FIELDS, ['kodeProyek']);
  return updateRow(SHEET_IDS.PROYEK, 'idProyek', params.idProyek, params);
}

var VENDOR_FIELDS = ['idVendor', 'namaVendor', 'tipe', 'kategori', 'kontak', 'alamat', 'keterangan', 'bank', 'noRekening', 'atasNama'];

function rekeningDuplikat(noRek, selfId) {
  var clean = String(noRek || '').replace(/\D/g, '');
  if (!clean) return false;
  return sheetToObjects(SHEET_IDS.VENDOR).some(function (v) {
    if (selfId && String(v.idVendor) === String(selfId)) return false;
    return String(v.noRekening || '').replace(/\D/g, '') === clean;
  });
}

function handleAddVendor(params) {
  if (!String(params.namaVendor || '').trim()) return fail('Nama vendor/toko wajib diisi.');
  if (rekeningDuplikat(params.noRekening)) return fail('Nomor rekening ini sudah terdaftar di vendor lain.');
  if (!params.tipe) params.tipe = 'vendor';
  ensureColumns(SHEET_IDS.VENDOR, VENDOR_FIELDS, ['kontak', 'noRekening']);
  return addRow(SHEET_IDS.VENDOR, 'V', VENDOR_FIELDS, params, 'idVendor');
}

function handleUpdateVendor(params) {
  if (rekeningDuplikat(params.noRekening, params.idVendor)) return fail('Nomor rekening ini sudah terdaftar di vendor lain.');
  ensureColumns(SHEET_IDS.VENDOR, VENDOR_FIELDS, ['kontak', 'noRekening']);
  return updateRow(SHEET_IDS.VENDOR, 'idVendor', params.idVendor, params);
}

// =================== KONTRAK & PEMBAYARAN VENDOR ===================

function handleDeleteKontrakVendor(params) {
  var has = sheetToObjects(SHEET_IDS.PEMBAYARAN_VENDOR).some(function (b) { return String(b.kontrakId) === String(params.idKontrak); });
  if (has) return fail('Kontrak ini sudah punya riwayat pembayaran. Hapus pembayarannya dulu.');
  return deleteRow(SHEET_IDS.KONTRAK_VENDOR, 'idKontrak', params.idKontrak);
}

var BAYAR_FIELDS = ['idBayar', 'kontrakId', 'vendor', 'tanggal', 'jumlah', 'metode', 'catatan', 'buktiUrl', 'dibuatOleh'];

function handleAddPembayaranVendor(params) {
  var jumlah = Number(params.jumlah) || 0;
  if (jumlah <= 0) return fail('Jumlah pembayaran harus lebih dari 0.');
  var kontrak = sheetToObjects(SHEET_IDS.KONTRAK_VENDOR).filter(function (k) { return String(k.idKontrak) === String(params.kontrakId); })[0];
  if (!kontrak) return fail('Kontrak vendor tidak ditemukan.');

  params.buktiUrl = collectBukti(params);
  params.vendor = kontrak.vendor;
  params.dibuatOleh = params.pelaku;
  var r = addRow(SHEET_IDS.PEMBAYARAN_VENDOR, 'PV', BAYAR_FIELDS, params, 'idBayar');

  var catat = !(params.catatTransaksi === false || params.catatTransaksi === 'false');
  if (r.success && catat) {
    addRow(SHEET_IDS.TRANSAKSI, 'T', TRANSAKSI_FIELDS, {
      tanggal: params.tanggal, jenis: 'pengeluaran', kategori: 'Pembayaran Vendor', jumlah: jumlah,
      keterangan: 'Bayar vendor: ' + kontrak.vendor + ' - ' + kontrak.judul,
      proyekTerkait: kontrak.proyekNama, proyekKode: kontrak.proyekKode,
      vendorTerkait: kontrak.vendor, dibayarKepada: kontrak.vendor,
      metodePembayaran: params.metode || '', diinputOleh: params.pelaku,
      buktiUrl: params.buktiUrl, kontrakVendorId: kontrak.idKontrak, refPembayaran: r.id
    }, 'id');
  }
  logActivity(params.pelaku, 'Bayar vendor', kontrak.vendor + ' ' + formatRupiahLog(jumlah) + ' (' + kontrak.judul + ')');
  return r;
}

function handleDeletePembayaranVendor(params) {
  var r = deleteRow(SHEET_IDS.PEMBAYARAN_VENDOR, 'idBayar', params.idBayar);
  if (r.success) {
    sheetToObjects(SHEET_IDS.TRANSAKSI).forEach(function (t) {
      if (String(t.refPembayaran || '') === String(params.idBayar)) deleteRow(SHEET_IDS.TRANSAKSI, 'id', t.id);
    });
    logActivity(params.pelaku, 'Hapus pembayaran vendor', params.idBayar);
  }
  return r;
}

// =================== DOKUMEN (invoice / kwitansi / RAB tersimpan) ===================

var DOKUMEN_FIELDS = ['idDokumen', 'tipe', 'nomor', 'tanggal', 'klienKode', 'klienNama', 'proyekKode', 'total', 'status', 'dataJson', 'dibuatOleh', 'dibuatPada', 'diperbarui'];

function handleSaveDokumen(params) {
  var tipe = String(params.tipe || '').toLowerCase();
  if (!tipe) return fail('Tipe dokumen wajib diisi.');
  var all = sheetToObjects(SHEET_IDS.DOKUMEN);
  var now = new Date().toISOString();
  var existing = params.idDokumen ? all.filter(function (d) { return String(d.idDokumen) === String(params.idDokumen); })[0] : null;

  if (!existing && params.nomor) {
    var dup = all.some(function (d) { return d.tipe === tipe && String(d.nomor) === String(params.nomor); });
    if (dup) return fail('Nomor ' + params.nomor + ' sudah dipakai.');
  }
  params.tipe = tipe;
  params.diperbarui = now;
  var res;
  if (existing) {
    res = updateRow(SHEET_IDS.DOKUMEN, 'idDokumen', params.idDokumen, params);
    if (res.success) res.id = params.idDokumen;
  } else {
    params.dibuatPada = now;
    params.dibuatOleh = params.pelaku;
    res = addRow(SHEET_IDS.DOKUMEN, 'DOC', DOKUMEN_FIELDS, params, 'idDokumen');
  }

  // invoice ikut dicatat di sheet Invoice (dipakai Piutang & Dashboard)
  if (res.success && tipe === 'invoice' && params.nomor) {
    var inv = {
      noInvoice: params.nomor, tanggal: params.tanggal, klien: params.klienNama || '',
      proyekTerkait: params.proyekNama || params.proyekKode || '', itemDeskripsi: params.itemDeskripsi || '',
      jumlah: params.total, jatuhTempo: params.jatuhTempo || '', dibuatOleh: params.pelaku
    };
    var cur = sheetToObjects(SHEET_IDS.INVOICE).filter(function (i) { return String(i.noInvoice) === String(params.nomor); })[0];
    if (cur) {
      updateRow(SHEET_IDS.INVOICE, 'noInvoice', params.nomor, inv);
    } else {
      inv.status = 'Belum Lunas';
      addRow(SHEET_IDS.INVOICE, 'INV', ['noInvoice', 'tanggal', 'klien', 'proyekTerkait', 'itemDeskripsi', 'jumlah', 'status', 'jatuhTempo', 'dibuatOleh'], inv, 'noInvoice');
    }
  }
  if (res.success && tipe === 'invoice' && params.terminId && params.nomor) {
    try { linkTerminInvoice(params.terminId, params.nomor); } catch (e) {}
  }
  logActivity(params.pelaku, (existing ? 'Edit ' : 'Simpan ') + tipe, params.nomor || res.id);
  return res;
}

function handleDeleteDokumen(params) {
  var d = sheetToObjects(SHEET_IDS.DOKUMEN).filter(function (x) { return String(x.idDokumen) === String(params.idDokumen); })[0];
  var r = deleteRow(SHEET_IDS.DOKUMEN, 'idDokumen', params.idDokumen);
  if (r.success && d && d.tipe === 'invoice' && d.nomor) {
    deleteRow(SHEET_IDS.INVOICE, 'noInvoice', d.nomor);
    try { unlinkTerminInvoice(d.nomor); } catch (e) {}
  }
  if (r.success) logActivity(params.pelaku, 'Hapus dokumen', (d && d.nomor) || params.idDokumen);
  return r;
}

// =================== HELPERS ===================

function normalizeHeader(h) {
  var s = String(h).trim().replace(/[^a-zA-Z0-9 ]/g, '');
  // Header sudah camelCase (mis. "vendorTerkait" hasil self-healing): pertahankan
  if (s.indexOf(' ') === -1 && /[a-z]/.test(s) && /[A-Z]/.test(s.slice(1))) {
    return s.charAt(0).toLowerCase() + s.slice(1);
  }
  return s
    .split(' ')
    .map(function (word, i) {
      word = word.toLowerCase();
      return i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}

function formatRupiahLog(num) {
  num = Math.round(Number(num) || 0);
  return 'Rp ' + num.toLocaleString('id-ID');
}

function sheetToObjects(sheetId, excludeFields) {
  excludeFields = excludeFields || [];
  var sheet = SpreadsheetApp.openById(sheetId).getSheets()[0];
  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  var headers = data[0].map(normalizeHeader);
  var rows = [];
  for (var i = 1; i < data.length; i++) {
    var obj = {};
    var isEmpty = true;
    headers.forEach(function (h, idx) {
      if (excludeFields.indexOf(h) === -1) obj[h] = data[i][idx];
      if (data[i][idx] !== '' && data[i][idx] !== null) isEmpty = false;
    });
    if (!isEmpty) rows.push(obj);
  }
  return rows;
}

/**
 * Tambah baris baru. Kalau ada field di fieldOrder yang belum jadi kolom
 * di sheet, otomatis ditambahkan kolomnya dulu (self-healing).
 */
function addRow(sheetId, idPrefix, fieldOrder, params, idFieldName) {
  var sheet = SpreadsheetApp.openById(sheetId).getSheets()[0];
  idFieldName = idFieldName || fieldOrder[0];

  var lastCol = Math.max(sheet.getLastColumn(), 1);
  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(normalizeHeader);

  fieldOrder.forEach(function (field) {
    if (headers.indexOf(field) === -1) {
      sheet.getRange(1, headers.length + 1).setValue(field);
      headers.push(field);
    }
  });

  var newId = params[idFieldName];
  if (!newId) {
    // ID unik: nomor terbesar yang sudah ada + 1 (aman walau ada baris yang pernah dihapus)
    var idCol = headers.indexOf(idFieldName);
    var maxN = 0;
    if (idCol !== -1 && sheet.getLastRow() > 1) {
      sheet.getRange(2, idCol + 1, sheet.getLastRow() - 1, 1).getValues().forEach(function (r) {
        var m = String(r[0]).match(/(\d+)\s*$/);
        if (m) maxN = Math.max(maxN, parseInt(m[1], 10));
      });
    }
    newId = idPrefix + '-' + String(maxN + 1).padStart(4, '0');
  }

  var row = headers.map(function (h) {
    if (h === idFieldName) return newId;
    return params[h] !== undefined ? params[h] : '';
  });

  sheet.appendRow(row);
  return { success: true, id: newId };
}

function updateRow(sheetId, idFieldName, idValue, fieldsToUpdate) {
  var sheet = SpreadsheetApp.openById(sheetId).getSheets()[0];
  var data = sheet.getDataRange().getValues();
  var headers = data[0].map(normalizeHeader);
  var idCol = headers.indexOf(idFieldName);

  if (idCol === -1) {
    return { success: false, message: 'Kolom ID tidak ditemukan: ' + idFieldName };
  }

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][idCol]).trim() === String(idValue).trim()) {
      headers.forEach(function (h, colIdx) {
        if (h === idFieldName) return;
        if (fieldsToUpdate[h] !== undefined) {
          sheet.getRange(i + 1, colIdx + 1).setValue(fieldsToUpdate[h]);
        }
      });
      return { success: true };
    }
  }
  return { success: false, message: 'Data dengan ID ' + idValue + ' tidak ditemukan.' };
}

function deleteRow(sheetId, idFieldName, idValue) {
  var sheet = SpreadsheetApp.openById(sheetId).getSheets()[0];
  var data = sheet.getDataRange().getValues();
  var headers = data[0].map(normalizeHeader);
  var idCol = headers.indexOf(idFieldName);

  if (idCol === -1) {
    return { success: false, message: 'Kolom ID tidak ditemukan: ' + idFieldName };
  }

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][idCol]).trim() === String(idValue).trim()) {
      sheet.deleteRow(i + 1);
      return { success: true };
    }
  }
  return { success: false, message: 'Data dengan ID ' + idValue + ' tidak ditemukan.' };
}

function updateInvoiceStatus(params) {
  var sheet = SpreadsheetApp.openById(SHEET_IDS.INVOICE).getSheets()[0];
  var data = sheet.getDataRange().getValues();
  var headers = data[0].map(normalizeHeader);
  var noInvoiceCol = headers.indexOf('noInvoice');
  var statusCol = headers.indexOf('status');

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][noInvoiceCol]).trim() === String(params.noInvoice).trim()) {
      sheet.getRange(i + 1, statusCol + 1).setValue(params.status);
      return { success: true };
    }
  }
  return { success: false, message: 'Invoice tidak ditemukan.' };
}

function isAuthorized(actorLoginId, allowedRoles) {
  if (!actorLoginId) return false;
  var sheet = SpreadsheetApp.openById(SHEET_IDS.USERS).getSheets()[0];
  var data = sheet.getDataRange().getValues();
  var headers = data[0].map(normalizeHeader);
  var loginIdCol = headers.indexOf('loginId');
  var roleCol = headers.indexOf('role');

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][loginIdCol]).trim() === String(actorLoginId).trim()) {
      var role = String(data[i][roleCol]).trim();
      return allowedRoles.indexOf(role) !== -1;
    }
  }
  return false;
}

function accessDenied() {
  return { success: false, message: 'Akses ditolak. Fitur ini hanya untuk Owner/Admin.' };
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function testAuth() {
  var sheet = SpreadsheetApp.openById(SHEET_IDS.USERS).getSheets()[0];
  Logger.log('Berhasil! Nama sheet: ' + sheet.getName());
}
