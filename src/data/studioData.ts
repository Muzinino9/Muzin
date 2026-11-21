export interface StudioState {
  sekolah: string;
  alamat: string;
  mapel: string;
  guru: string;
  gaya: string;
  gen: string;
  customNama?: string;
  customIsian?: string;
  customHasil?: string;
  theme?: 'light' | 'dark';
  done: Record<string, boolean>;
}

export interface StyleOption {
  id: string;
  nama: string;
  ket: string;
  prompt: string;
  mock: {
    t:
      | 'quiz'
      | 'admin'
      | 'pro'
      | 'hp'
      | 'toska'
      | 'pastel'
      | 'cbt'
      | 'kertas'
      | 'gelap'
      | 'merah'
      | 'bento'
      | 'alam';
    side?: string;
    acc?: string;
    bg?: string;
    c?: string[];
  };
}

export interface GeneratorOption {
  id: string;
  nama: string;
  isian: string;
  hasil: string;
}

export const STORAGE_KEY = 'studio-guru-tuban';

export const DEFAULT_STATE: StudioState = {
  sekolah: '',
  alamat: '',
  mapel: '',
  guru: '',
  gaya: 'ungu',
  gen: 'lkpd',
  customNama: '',
  customIsian: '',
  customHasil: '',
  done: {},
};

export const STYLES: StyleOption[] = [
  {
    id: 'ungu',
    nama: 'Ungu Kuis',
    ket: 'Bersih, kartu berkepala ungu. Cocok untuk generator soal.',
    prompt:
      'gaya "Ungu Kuis": latar putih bersih, panel kiri ungu muda (#EEEAFB) berisi daftar, setiap kartu punya kepala berwarna ungu (#7B5CE0) dengan teks putih, tombol utama ungu, sudut membulat 12px, bayangan halus, font Poppins dari Google Fonts.',
    mock: { t: 'quiz', side: '#EEEAFB', acc: '#7B5CE0', bg: '#FFFFFF' },
  },
  {
    id: 'ceria',
    nama: 'Admin Ceria',
    ket: 'Menu ungu tua, kartu angka berwarna, kalender.',
    prompt:
      'gaya "Admin Ceria": menu samping ungu tua (#3D2E7C) dengan menu aktif berbentuk tab putih yang menyatu ke konten, 4 kartu statistik putih dengan ikon berwarna (merah muda #F37C8C, ungu #6C4FD8, kuning #F9C846, hijau #3DBE7A), grafik batang tiga warna, hiasan daun pastel di pojok bawah menu, latar abu sangat muda, font Nunito.',
    mock: {
      t: 'admin',
      side: '#3D2E7C',
      bg: '#F4F4FA',
      c: ['#F37C8C', '#6C4FD8', '#F9C846', '#3DBE7A'],
    },
  },
  {
    id: 'biru',
    nama: 'Biru Profesional',
    ket: 'Menu dongker, banner biru, kartu berlabel warna.',
    prompt:
      'gaya "Biru Profesional": menu samping biru dongker (#1B2559) dengan teks putih, banner sambutan gradasi biru (#1E6FE8 ke #12A8E8) di atas, kartu putih dengan label warna-warni (biru, oranye, merah, toska) dan progress bar tipis, daftar notifikasi bergaris waktu, font Inter.',
    mock: {
      t: 'pro',
      side: '#1B2559',
      bg: '#F3F6FB',
      c: ['#1E6FE8', '#F39A1E', '#EF5A3C', '#16B8E0'],
    },
  },
  {
    id: 'hp',
    nama: 'Portal HP',
    ket: 'Dirancang untuk HP: ubin pastel dan menu bawah.',
    prompt:
      'gaya "Portal HP" yang mengutamakan layar HP: kepala ungu (#5B3FD9) melengkung dengan sapaan dan kotak cari putih membulat, grid ubin pastel 3 kolom (ungu, oranye, biru, hijau, merah muda, kuning muda) masing-masing dengan ikon bulat berwarna dan judul, bilah menu bawah berisi 4 ikon. Di laptop tampil sebagai kolom tengah selebar 480px. Font Poppins.',
    mock: {
      t: 'hp',
      acc: '#5B3FD9',
      c: ['#E6E0FF', '#FFE6D2', '#DDEBFF', '#DDF4E4', '#FFE0EA', '#FFF3CC'],
    },
  },
  {
    id: 'toska',
    nama: 'Toska Santai',
    ket: 'Bingkai toska, aksen kuning, ilustrasi pastel.',
    prompt:
      'gaya "Toska Santai": bingkai luar dan menu samping toska (#1F9E94) dengan menu aktif putih membulat, konten putih dengan sudut membulat besar (24px), aksen kuning (#FFD54F) untuk sorotan dan tombol, grafik batang biru muda dengan satu batang kuning, ilustrasi pastel merah muda dan toska, font Nunito.',
    mock: { t: 'toska', side: '#1F9E94', acc: '#FFD54F' },
  },
  {
    id: 'pastel',
    nama: 'Pastel Kuning',
    ket: 'Hangat dan ramah, kartu sambutan lavender.',
    prompt:
      'gaya "Pastel Kuning": latar luar kuning lembut (#FCE9A8), panel utama putih membulat, kartu sambutan lavender (#DCD3FB) dengan ilustrasi guru sederhana dari SVG, 4 ubin statistik berwarna (kuning #F5C451, ungu tua #4B3B9A, merah muda #EC5F8F, lavender #C9BEF5), daftar dokumen dengan sakelar, font Quicksand.',
    mock: {
      t: 'pastel',
      bg: '#FCE9A8',
      c: ['#F5C451', '#4B3B9A', '#EC5F8F', '#C9BEF5'],
    },
  },
  {
    id: 'cbt',
    nama: 'Hijau Ujian',
    ket: 'Seperti aplikasi ujian: nomor soal dan waktu.',
    prompt:
      'gaya "Hijau Ujian" seperti aplikasi ujian berbasis komputer: menu samping hijau (#12A383) dengan teks putih, latar abu muda, kartu putih membulat, grid nomor soal hijau dengan nomor aktif bergaris tepi, kartu sisa waktu, tombol Sebelumnya dan Selanjutnya, font Roboto.',
    mock: { t: 'cbt', side: '#12A383', bg: '#F2F4F5' },
  },
  {
    id: 'kertas',
    nama: 'Kertas Editorial',
    ket: 'Nuansa krem hangat, garis tegas, nyaman dibaca lama.',
    prompt:
      'gaya "Kertas Editorial": latar krem hangat (#FAF7F0), panel formulir dan kartu putih bersih dengan garis tepi tipis abu kecokelatan (#E2DDD3), aksen merah bata (#B84A39) dan tinta gelap (#22201E), judul memakai font serif klasik Merriweather dan isi memakai Plus Jakarta Sans, tanpa bayangan berat.',
    mock: { t: 'kertas', bg: '#FAF7F0', acc: '#B84A39' },
  },
  {
    id: 'gelap',
    nama: 'Mode Malam Fokus',
    ket: 'Latar gelap nyaman saat lembur, aksen biru langit.',
    prompt:
      'gaya "Mode Malam Fokus": tampilan gelap modern dengan latar biru malam (#0F172A), menu samping lebih gelap (#090D16), kartu abu gelap (#1E293B) bergaris tipis (#334155), teks putih lembut (#F1F5F9), aksen biru langit cerah (#38BDF8) dan hijau mint (#34D399) untuk tombol utama, pratinjau kertas A4 tetap putih terang agar mudah dicek saat cetak, font Plus Jakarta Sans.',
    mock: { t: 'gelap', side: '#090D16', bg: '#0F172A', acc: '#38BDF8' },
  },
  {
    id: 'merah',
    nama: 'Merah Putih Sekolah',
    ket: 'Tegas dan resmi: kepala marun, mirip portal sekolah.',
    prompt:
      'gaya "Merah Putih Sekolah": nuansa resmi pendidikan dengan bilah atas merah marun (#9B1C2E) dan teks putih, menu samping putih bersih dengan penanda garis kiri merah (#C81E37) pada menu aktif, latar abu sangat muda (#F8F9FB), kartu putih dengan sudut membulat 10px, tombol aksi utama merah marun dan tombol sekunder abu gelap, font Inter.',
    mock: { t: 'merah', bg: '#F8F9FB', acc: '#9B1C2E' },
  },
  {
    id: 'bento',
    nama: 'Bento Modern',
    ket: 'Kotak modular simetris, ringkas dan serba cepat.',
    prompt:
      'gaya "Bento Modern": tata letak kotak modular bergaya modern dengan latar abu pucat (#F5F6FA), semua kartu putih sudut membulat 20px bergaris tepi halus (#E5E7EB), bilah atas melayang dengan tab pill di tengah, aksen hitam karbon (#111827) untuk tombol utama dan aksen gradasi ungu-biru (#6366F1 ke #06B6D4) untuk sorotan angka, font DM Sans.',
    mock: { t: 'bento', bg: '#F5F6FA', acc: '#111827', c: ['#6366F1', '#06B6D4'] },
  },
  {
    id: 'alam',
    nama: 'Hijau Alam Nusantara',
    ket: 'Hijau daun menenangkan mata dengan aksen kunyit hangat.',
    prompt:
      'gaya "Hijau Alam Nusantara": menu samping hijau hutan (#1E4D3B) dengan teks putih krem, latar utama hijau sage sangat muda (#F1F6F3), kartu putih dengan sudut membulat 16px, aksen kuning kunyit lembut (#E5A93C) untuk lencana dan tombol utama hijau zamrud (#2B7A5B), font Outfit.',
    mock: { t: 'alam', side: '#1E4D3B', bg: '#F1F6F3', acc: '#E5A93C' },
  },
];

export const GENERATORS: GeneratorOption[] = [
  {
    id: 'lkpd',
    nama: 'LKPD',
    isian: 'mapel, kelas, topik, jumlah kegiatan (awal 2), model kerja (individu/kelompok)',
    hasil:
      'lembar kerja peserta didik berisi identitas kelompok, tujuan, alat dan bahan, langkah kegiatan bernomor, tabel pengamatan kosong, pertanyaan diskusi, dan kotak kesimpulan',
  },
  {
    id: 'rpp',
    nama: 'RPP Pembelajaran Mendalam',
    isian:
      'mapel, fase/kelas (Fase E kelas X, Fase F kelas XI/XII), topik/materi, alokasi waktu (contoh 2 × 45 menit), jumlah pertemuan (awal 1), dimensi profil lulusan (pilih beberapa dari 8 dimensi: Keimanan & Ketakwaan, Kewargaan, Penalaran Kritis, Kreativitas, Kolaborasi, Kemandirian, Kesehatan, Komunikasi), praktik pedagogis (PBL, PjBL, Discovery Learning, Inquiry), kemitraan & pemanfaatan digital (boleh kosong), nama guru, NIP guru, nama kepala sekolah, NIP kepala sekolah, kota dan tanggal (isi awal "Tuban")',
    hasil:
      'RPP Pembelajaran Mendalam siap cetak berisi: (1) Identitas (sekolah, mapel, fase/kelas, topik, alokasi waktu, pertemuan), (2) Identifikasi (kesiapan peserta didik, karakteristik materi, dimensi profil lulusan), (3) Desain Pembelajaran (tujuan pembelajaran, lintas disiplin ilmu, praktik pedagogis, kemitraan pembelajaran, lingkungan pembelajaran, pemanfaatan digital), (4) Pengalaman Belajar tiap pertemuan berprinsip Berkesadaran, Bermakna, dan Menggembirakan dengan tahap Awal, Inti (Memahami, Mengaplikasi, Merefleksi), dan Penutup, (5) Asesmen Pembelajaran (awal, proses, akhir beserta rubrik singkat), serta (6) Kolom tanda tangan kepala sekolah di kiri dan guru di kanan',
  },
  {
    id: 'kisi',
    nama: 'Kisi-kisi Soal',
    isian: 'mapel, kelas, materi (kotak teks panjang), jumlah soal, bentuk soal (pilihan ganda/uraian/campuran)',
    hasil:
      'tabel kisi-kisi dengan kolom No, Tujuan Pembelajaran, Materi, Indikator Soal, Level Kognitif (L1/L2/L3), Bentuk Soal, Nomor Soal',
  },
  {
    id: 'rapor',
    nama: 'Deskripsi Rapor',
    isian: 'mapel, kelas, daftar nilai per nomor absen (kotak teks panjang, contoh baris: 1: TP1 90, TP2 75, TP3 82)',
    hasil:
      'tabel No Absen dan Deskripsi Capaian 1–2 kalimat per siswa: sebut capaian tertinggi lalu yang perlu ditingkatkan. Jangan meminta atau menampilkan nama siswa. Tambahkan tombol Salin Tabel',
  },
  {
    id: 'tka',
    nama: 'Soal Penalaran TKA',
    isian: 'mapel, kelas, materi, jumlah soal (awal 5)',
    hasil:
      'soal penalaran berbasis teks, data, atau kasus nyata dengan pilihan A–E, memakai lembar soal dan kunci yang sama seperti generator soal',
  },
  {
    id: 'rubrik',
    nama: 'Rubrik Penilaian',
    isian: 'mapel, kelas, nama tugas atau proyek, jumlah kriteria (awal 4)',
    hasil:
      'tabel rubrik dengan 4 level (Sangat Baik 4, Baik 3, Cukup 2, Perlu Bimbingan 1) dan deskripsi tiap kriteria, ditutup cara menghitung nilai akhir',
  },
  {
    id: 'jurnal',
    nama: 'Jurnal Mengajar',
    isian: 'tanggal, kelas, jam ke-, materi, kegiatan, catatan kejadian (kotak teks panjang)',
    hasil:
      'jurnal mengajar harian yang rapi dalam bentuk tabel, ditambah refleksi singkat dan rencana tindak lanjut',
  },
  {
    id: 'ice',
    nama: 'Ice Breaking',
    isian: 'durasi (menit), jumlah siswa, suasana kelas (mengantuk/ramai/tegang), kaitan materi (boleh kosong)',
    hasil:
      '3 ide permainan pembuka kelas, masing-masing dengan nama, alat, langkah, dan durasi',
  },
  {
    id: 'sendiri',
    nama: 'Bikin sendiri',
    isian: '[TULIS ISIAN YANG DIPERLUKAN]',
    hasil: '[TULIS HASIL YANG DIINGINKAN]',
  },
];

export const APPS_SCRIPT_CODE = `/**
 * DATABASE APLIKASI GURU — Google Apps Script
 * Menyimpan arsip dari aplikasi buatan Gemini Canvas ke:
 *   - Spreadsheet ini (tab "Arsip")
 *   - Folder Google Drive "Arsip Aplikasi Guru" (sebagai Google Docs)
 *
 * Cara pakai singkat:
 * 1. Ganti PIN di bawah ini (4–6 angka, jangan 1234).
 * 2. Simpan, pilih fungsi "pasang", klik Jalankan, lalu izinkan.
 * 3. Terapkan → Deployment baru → Aplikasi web
 *    Jalankan sebagai: Saya · Yang memiliki akses: Siapa saja
 * 4. Salin URL yang berakhiran /exec ke menu Pengaturan aplikasi.
 */

const PIN = 'GANTI-PIN';          // ← ganti dengan PIN Bapak/Ibu
const NAMA_FOLDER = 'Arsip Aplikasi Guru';
const NAMA_TAB = 'Arsip';
const KOLOM = ['ID', 'Tanggal', 'Jenis', 'Judul', 'Mapel', 'Kelas', 'Link Drive', 'ID File'];

/** Jalankan sekali dari editor untuk membuat tab dan folder. */
function pasang() {
  tab_();
  folder_();
  Logger.log('Siap. Tab "' + NAMA_TAB + '" dan folder "' + NAMA_FOLDER + '" sudah dibuat.');
}

/** Dibuka lewat browser: cek bahwa link-nya hidup. */
function doGet() {
  return balas_({ ok: true, pesan: 'Database Aplikasi Guru aktif. Kirim data lewat POST.' });
}

/** Semua permintaan dari aplikasi masuk ke sini. */
function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (PIN === 'GANTI-PIN') return balas_({ ok: false, error: 'PIN di Apps Script belum diganti.' });
    if (String(data.pin || '') !== String(PIN)) return balas_({ ok: false, error: 'PIN salah.' });

    const aksi = data.aksi || 'daftar';
    if (aksi === 'daftar') return balas_({ ok: true, items: daftar_() });
    if (aksi === 'simpan') return balas_(simpan_(data.item || {}));
    if (aksi === 'hapus') return balas_(hapus_(String(data.id || '')));
    return balas_({ ok: false, error: 'Aksi tidak dikenal: ' + aksi });
  } catch (err) {
    return balas_({ ok: false, error: String(err && err.message || err) });
  }
}

/* ---------- isi ---------- */

function daftar_() {
  const sh = tab_();
  const n = sh.getLastRow();
  if (n < 2) return [];
  return sh.getRange(2, 1, n - 1, KOLOM.length).getDisplayValues()
    .filter(function (r) { return r[0]; })
    .map(function (r) {
      return { id: r[0], tanggal: r[1], jenis: r[2], judul: r[3], mapel: r[4], kelas: r[5], link: r[6] };
    })
    .reverse();
}

function simpan_(item) {
  const id = String(item.id || ('doc_' + Date.now()));
  const judul = String(item.judul || 'Dokumen tanpa judul').slice(0, 200);
  const html = String(item.html || '');
  const tanggal = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'Asia/Jakarta', 'yyyy-MM-dd HH:mm');

  let link = '', fileId = '';
  if (html) {
    const f = buatDoc_(judul, html);
    link = f.link; fileId = f.id;
  }

  const sh = tab_();
  const baris = [id, tanggal, item.jenis || '', judul, item.mapel || '', item.kelas || '', link, fileId];
  const r = cariBaris_(sh, id);
  if (r > 0) {
    const lama = sh.getRange(r, 8).getValue();
    if (lama && lama !== fileId) { try { DriveApp.getFileById(lama).setTrashed(true); } catch (e) {} }
    sh.getRange(r, 1, 1, KOLOM.length).setValues([baris]);
  } else {
    sh.appendRow(baris);
  }
  return { ok: true, id: id, link: link, tanggal: tanggal };
}

function hapus_(id) {
  const sh = tab_();
  const r = cariBaris_(sh, id);
  if (r < 1) return { ok: false, error: 'Data tidak ditemukan.' };
  const fileId = sh.getRange(r, 8).getValue();
  if (fileId) { try { DriveApp.getFileById(fileId).setTrashed(true); } catch (e) {} } // masuk Sampah, masih bisa dipulihkan
  sh.deleteRow(r);
  return { ok: true, id: id };
}

/* ---------- Google Docs dari HTML ---------- */

function buatDoc_(judul, html) {
  const folderId = folder_().getId();
  const dok = '<html><head><meta charset="utf-8"></head><body>' + html + '</body></html>';
  const batas = 'batas' + Date.now();
  const meta = { name: judul, mimeType: 'application/vnd.google-apps.document', parents: [folderId] };
  const isi = '--' + batas + '\\r\\nContent-Type: application/json; charset=UTF-8\\r\\n\\r\\n' + JSON.stringify(meta) +
    '\\r\\n--' + batas + '\\r\\nContent-Type: text/html; charset=UTF-8\\r\\n\\r\\n' + dok + '\\r\\n--' + batas + '--';

  const res = UrlFetchApp.fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink', {
    method: 'post',
    contentType: 'multipart/related; boundary=' + batas,
    payload: Utilities.newBlob(isi).getBytes(),
    headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() },
    muteHttpExceptions: true
  });

  if (res.getResponseCode() < 300) {
    const j = JSON.parse(res.getContentText());
    return { id: j.id, link: j.webViewLink };
  }
  // Cadangan: simpan sebagai file .html biasa kalau konversi ke Docs gagal
  const file = folder_().createFile(Utilities.newBlob(dok, 'text/html', judul + '.html'));
  return { id: file.getId(), link: file.getUrl() };
}

/* ---------- pembantu ---------- */

function tab_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(NAMA_TAB);
  if (!sh) {
    sh = ss.insertSheet(NAMA_TAB);
    sh.getRange(1, 1, 1, KOLOM.length).setValues([KOLOM]).setFontWeight('bold').setBackground('#5B47C4').setFontColor('#FFFFFF');
    sh.setFrozenRows(1);
    sh.setColumnWidth(4, 320);
    sh.setColumnWidth(7, 280);
  }
  return sh;
}

function folder_() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('FOLDER_ID');
  if (id) { try { return DriveApp.getFolderById(id); } catch (e) {} }
  const f = DriveApp.createFolder(NAMA_FOLDER);
  props.setProperty('FOLDER_ID', f.getId());
  return f;
}

function cariBaris_(sh, id) {
  const n = sh.getLastRow();
  if (n < 2) return -1;
  const ids = sh.getRange(2, 1, n - 1, 1).getDisplayValues();
  for (let i = 0; i < ids.length; i++) if (ids[i][0] === id) return i + 2;
  return -1;
}

function balas_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}`;

export function buildPrompts(st: StudioState): Record<string, string> {
  const v = (k: 'sekolah' | 'alamat' | 'mapel' | 'guru', def: string) =>
    (st[k] || '').trim() || def;
  const gaya = (STYLES.find((s) => s.id === st.gaya) || STYLES[0]).prompt;
  const g = GENERATORS.find((x) => x.id === st.gen) || GENERATORS[0];
  const sek = v('sekolah', 'SMK Negeri 1 Tuban');
  const al = v('alamat', 'Jl. Mastrip No. 2 Tuban');
  const mp = v('mapel', 'Bahasa Inggris');
  const gr = v('guru', 'Muzin Rizqi Bakhtiar, S.Pd.');
  const M = (x: string) => `\u0001${x}\u0002`;
  const customNama = (st.customNama || '').trim();
  const customIsian = (st.customIsian || '').trim();
  const customHasil = (st.customHasil || '').trim();

  const namaGen =
    g.id === 'sendiri'
      ? M(customNama ? customNama.toUpperCase() : '[NAMA GENERATOR]')
      : g.nama.toUpperCase();
  const isianGen =
    g.id === 'rpp'
      ? g.isian
          .replace('mapel,', `mapel (isi awal "${mp}"),`)
          .replace('nama guru,', `nama guru (isi awal "${gr}"),`)
      : g.id === 'sendiri'
        ? customIsian || g.isian
        : g.isian;
  const hasilGen = g.id === 'sendiri' ? customHasil || g.hasil : g.hasil;

  return {
    p1:
      'Buatkan aplikasi web dalam SATU file HTML bernama "Asisten Guru" untuk guru SMA. Untuk sekarang cukup satu fitur: GENERATOR SOAL UJIAN yang hasilnya siap cetak.\n\n' +
      '1. Formulir di sebelah kiri:\n' +
      `- Kop sekolah: nama pemerintah/yayasan (isi awal "PEMERINTAH PROVINSI JAWA TIMUR"), nama sekolah (isi awal "${M(sek)}"), alamat (isi awal "${M(al)}"), dan tombol unggah logo. Simpan kop di localStorage supaya tidak perlu diisi ulang.\n` +
      '- Jenis penilaian (Ulangan Harian, Sumatif Tengah Semester, Sumatif Akhir Semester, Latihan Soal) dan tahun pelajaran (isi awal 2026/2027).\n' +
      `- Mapel (isi awal "${M(mp)}"), kelas (X, XI, XII), materi/topik, jumlah pilihan ganda (awal 10), jumlah uraian (awal 2), tingkat kesulitan (Mudah, Sedang, HOTS), alokasi waktu (awal 90 menit).\n` +
      '- Tombol besar "Buat Soal dengan AI".\n\n' +
      '2. Pratinjau kertas A4 di sebelah kanan (210 × 297 mm, Times New Roman 12pt):\n' +
      '- Kop: logo di kiri, teks di tengah, garis ganda di bawahnya.\n' +
      '- Judul penilaian dan tahun pelajaran.\n' +
      '- Tabel identitas: Mata Pelajaran, Kelas, Waktu, Nama, No. Absen, Hari/Tanggal.\n' +
      '- Petunjuk umum, soal pilihan ganda A–E dengan pilihan 2 kolom, lalu soal uraian.\n' +
      '- Kunci jawaban dan pembahasan di halaman baru, dengan sakelar tampil/sembunyi.\n' +
      '- Teks di kertas bisa diedit langsung (contenteditable).\n' +
      '- Kertas memakai CSS biasa atau inline, bukan class Tailwind, supaya tetap rapi saat dipindah ke Word atau Google Docs.\n\n' +
      '3. Tombol di atas kertas:\n' +
      '- "Cetak / PDF": window.print() dengan @media print ukuran A4, hanya kertas yang tercetak.\n' +
      '- "Salin ke Word": salin isi kertas sebagai HTML ke clipboard.\n' +
      '- "Unduh Word": unduh isi kertas sebagai file .doc.\n\n' +
      '4. AI:\n' +
      '- Panggil Gemini API langsung dari browser: POST https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent dengan header x-goog-api-key. Kalau gagal, ulangi sekali dengan model gemini-3.8-flash.\n' +
      '- Minta jawaban JSON (generationConfig.responseMimeType "application/json") dengan bentuk {"pg":[{"soal":"","opsi":["","","","",""],"kunci":"A","pembahasan":""}],"uraian":[{"soal":"","jawaban":"","skor":10}]}.\n' +
      '- Soal memakai bahasa Indonesia baku, sesuai kurikulum SMA, dan kalau cocok dikaitkan dengan konteks Tuban.\n' +
      '- API key diisi di menu Pengaturan (ikon gerigi), disimpan di localStorage, tidak pernah ditulis di kode.\n' +
      '- Pesan dalam bahasa Indonesia: saat memproses "Sedang menyusun soal...", kalau kode 429 "Kuota AI sedang penuh. Tunggu 1 menit lalu coba lagi.", kalau kunci salah atau kosong "API key belum diisi atau salah. Buka Pengaturan."\n\n' +
      `5. Tampilan: ${M(gaya)}\n\n` +
      'Pakai Tailwind CDN dan ikon Lucide. Jangan pakai Firebase. Tulis kode lengkap tanpa ada bagian yang disingkat.',
    p2:
      'Aplikasinya sudah bagus. Sekarang tambahkan fitur kedua: GENERATOR MODUL AJAR dengan pendekatan pembelajaran mendalam. Generator soal yang sudah ada jangan diubah.\n\n' +
      '- Tambahkan menu untuk berpindah antara "Soal Ujian" dan "Modul Ajar".\n' +
      '- Pakai kop sekolah dan kertas A4 yang sama, juga tombol Cetak / PDF, Salin ke Word, dan Unduh Word.\n' +
      `- Isian: mapel (isi awal "${M(mp)}"), fase/kelas (Fase E kelas X, Fase F kelas XI, Fase F kelas XII), topik, alokasi waktu (contoh 2 × 45 menit), jumlah pertemuan, model pembelajaran (PBL, PjBL, Discovery Learning, Inquiry), kondisi kelas (kotak teks panjang), nama guru (isi awal "${M(gr)}"), NIP guru, nama kepala sekolah, NIP kepala sekolah, kota dan tanggal (isi awal "Tuban").\n` +
      '- Isi modul di kertas: tabel identitas, tujuan pembelajaran, pemahaman bermakna, pertanyaan pemantik, langkah pembelajaran tiap pertemuan (pendahuluan; inti dengan tahap memahami, mengaplikasi, merefleksi; penutup), asesmen awal, proses, dan akhir, diferensiasi, lampiran singkat, lalu kolom tanda tangan kepala sekolah di kiri dan guru di kanan.\n' +
      '- AI memakai cara panggil Gemini yang sama, minta jawaban JSON per bagian.\n\n' +
      'Tulis ulang kode lengkap tanpa ada bagian yang disingkat.',
    p3:
      `Tambahkan fitur baru: GENERATOR ${namaGen}. Fitur yang sudah ada jangan diubah.\n\n` +
      '- Tambahkan ke menu, sejajar dengan Soal Ujian dan Modul Ajar.\n' +
      `- Isian: ${M(isianGen)}.\n` +
      `- Hasil di kertas A4 dengan kop sekolah yang sama: ${M(hasilGen)}.\n` +
      '- Ada tombol Cetak / PDF, Salin ke Word, dan Unduh Word.\n' +
      '- AI memakai cara panggil Gemini yang sama, minta jawaban JSON lalu susun di kertas.\n\n' +
      'Tulis ulang kode lengkap tanpa ada bagian yang disingkat.',
    p4:
      'Sekarang satukan semua fitur menjadi satu DASHBOARD GURU. Isi generator yang sudah ada jangan diubah.\n\n' +
      '- Menu samping: Beranda, setiap generator yang sudah ada, Arsip, dan Pengaturan. Di HP, menu pindah menjadi bilah bawah.\n' +
      `- Beranda: sapaan "Selamat pagi, ${M(gr)}" (pagi/siang/sore/malam mengikuti jam), nama sekolah dari kop, 4 kartu angka (Paket Soal, Modul Ajar, Dokumen Lain, Total Arsip), tombol cepat ke setiap generator, dan 5 dokumen terakhir.\n` +
      `- Setiap generator punya tombol "Simpan ke Arsip". Yang disimpan: id, jenis, judul otomatis (contoh "SAS ${M(mp)} XI - Sistem Pernapasan"), mapel, kelas, tanggal, dan isi kertas (HTML).\n` +
      '- Halaman Arsip: kotak cari, filter jenis, mapel, dan kelas, kartu dokumen dengan tombol Buka (tampil lagi di kertas untuk diedit atau dicetak) dan Hapus (konfirmasi di dalam halaman, bukan confirm()).\n' +
      '- Arsip disimpan di localStorage. Tambahkan tombol Cadangkan (unduh .json) dan Pulihkan.\n' +
      '- Tampilan mengikuti gaya yang sudah dipakai.\n\n' +
      'Tulis ulang kode lengkap tanpa ada bagian yang disingkat.',
    p5:
      'Sambungkan arsip ke Google Spreadsheet dan Google Drive lewat Google Apps Script yang sudah saya pasang. Fitur lain jangan diubah.\n\n' +
      '- Di Pengaturan tambahkan isian "URL Apps Script" dan "PIN Database" (disimpan di localStorage) serta tombol "Tes Sambungan".\n' +
      '- Semua permintaan memakai fetch(URL, {method: "POST", headers: {"Content-Type": "text/plain;charset=utf-8"}, body: JSON.stringify(data)}). Jangan pakai mode no-cors.\n' +
      '- Tes Sambungan dan saat aplikasi dibuka: kirim {"aksi":"daftar","pin":PIN}. Jawabannya {"ok":true,"items":[{"id","tanggal","jenis","judul","mapel","kelas","link"}]}. Gabungkan ke Arsip, data dengan id yang sama jangan dobel.\n' +
      '- Simpan ke Arsip: setelah tersimpan di localStorage, kirim {"aksi":"simpan","pin":PIN,"item":{"id","jenis","judul","mapel","kelas","html"}} dengan html berisi isi kertas. Jawabannya {"ok":true,"link":"..."}. Simpan link itu dan tampilkan tombol "Buka di Drive" di kartu arsip.\n' +
      '- Hapus: kirim {"aksi":"hapus","pin":PIN,"id":ID}.\n' +
      '- Kalau jawabannya {"ok":false,"error":"..."}, tampilkan pesan error itu apa adanya.\n' +
      '- Tampilkan lencana di atas: "Tersambung ke Drive" (hijau) atau "Hanya di perangkat ini" (abu-abu).\n\n' +
      'Tulis ulang kode lengkap tanpa ada bagian yang disingkat.',
    gantiGaya: `Ubah tampilan aplikasi menjadi ${M(gaya)} Semua fitur, isian, dan tata letak kertas A4 jangan diubah. Tulis ulang kode lengkap tanpa ada bagian yang disingkat.`,
    lanjut:
      `Ini kode aplikasi guru saya yang terakhir berhasil:\n\n${M('[TEMPEL SELURUH KODE DI SINI]')}\n\n` +
      `Lanjutkan dari kode ini. Langkah berikutnya: ${M('[TEMPEL PROMPT BERIKUTNYA DI SINI]')}\n\n` +
      'Tulis ulang kode lengkap dalam satu file HTML tanpa ada bagian yang disingkat.',
    e1: 'Kode yang kamu tulis terpotong (ada tulisan "... existing code ..." atau bagian yang hilang). Tulis ulang SELURUH kode aplikasi dari awal sampai akhir dalam satu file, tanpa ada bagian yang disingkat. Fitur dan tampilan jangan diubah.',
    e2: `Tombol ${M('[NAMA TOMBOL]')} tidak bisa ditekan atau tidak terjadi apa-apa. Periksa error JavaScript yang menyebabkannya dan perbaiki. Fitur lain jangan diubah. Tulis ulang kode lengkap tanpa ada bagian yang disingkat.`,
    e3: `Saat saya klik ${M('[NAMA TOMBOL]')} muncul pesan: ${M('[TEMPEL PESAN ERROR]')}. Jelaskan penyebabnya dalam satu kalimat sederhana, lalu perbaiki. Fitur lain jangan diubah. Tulis ulang kode lengkap tanpa ada bagian yang disingkat.`,
    e4: `Di layar HP tampilannya berantakan: ${M('[CERITAKAN YANG BERANTAKAN]')}. Rapikan untuk layar 390px: formulir di atas, kertas A4 di bawah dan bisa digeser, menu jadi bilah bawah. Tampilan laptop jangan diubah. Tulis ulang kode lengkap tanpa ada bagian yang disingkat.`,
  };
}
