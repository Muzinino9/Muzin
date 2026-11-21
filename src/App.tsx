import { Moon, RotateCcw, Sun } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { PromptBox } from './components/PromptBox';
import { StyleMockup } from './components/StyleMockup';
import {
  APPS_SCRIPT_CODE,
  buildPrompts,
  DEFAULT_STATE,
  GENERATORS,
  STORAGE_KEY,
  STYLES,
  type StudioState,
} from './data/studioData';

const LOGO_SRC = '/src/assets/images/studio_guru_logo_1795223408030.jpg';
const HERO_SRC = '/src/assets/images/hero_teacher_studio_1795223408387.jpg';

const PROGRESS_KEYS = ['siap', 'gaya', 'p1', 'p2', 'p3', 'p4', 'p5', 'bagikan'] as const;

const SECTION_IDS = [
  'mulai',
  'siap',
  'gaya',
  'p1',
  'p2',
  'p3',
  'p4',
  'p5',
  'kuota',
  'error',
  'bagikan',
];

function loadInitialState(): StudioState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<StudioState>;
      return {
        ...DEFAULT_STATE,
        ...parsed,
        done: parsed.done || {},
      };
    }
  } catch {
    // ignore storage errors
  }
  return DEFAULT_STATE;
}

export default function App() {
  const [st, setSt] = useState<StudioState>(loadInitialState);
  const [activeId, setActiveId] = useState<string>('mulai');
  const [logoError, setLogoError] = useState(false);
  const [heroError, setHeroError] = useState(false);

  const isDark = useMemo(() => {
    if (st.theme === 'dark') return true;
    if (st.theme === 'light') return false;
    return (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }, [st.theme]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(st));
    } catch {
      // ignore storage errors
    }
  }, [st]);

  useEffect(() => {
    if (st.theme) {
      document.documentElement.setAttribute('data-theme', st.theme);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [st.theme]);

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!elements.length || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-18% 0px -65% 0px', threshold: [0.05, 0.2, 0.5] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const prompts = useMemo(() => buildPrompts(st), [st]);

  const completedCount = useMemo(
    () => PROGRESS_KEYS.filter((k) => Boolean(st.done[k])).length,
    [st.done],
  );
  const progressRatio = completedCount / PROGRESS_KEYS.length;

  const updateField = (
    field: 'sekolah' | 'alamat' | 'mapel' | 'guru' | 'customNama' | 'customIsian' | 'customHasil',
    value: string,
  ) => {
    setSt((prev) => ({ ...prev, [field]: value }));
  };

  const toggleDone = (key: string, checked: boolean) => {
    setSt((prev) => ({
      ...prev,
      done: { ...prev.done, [key]: checked },
    }));
  };

  const selectStyle = (id: string) => {
    setSt((prev) => ({
      ...prev,
      gaya: id,
      done: { ...prev.done, gaya: true },
    }));
  };

  const selectGen = (id: string) => {
    setSt((prev) => ({ ...prev, gen: id }));
  };

  const toggleTheme = () => {
    setSt((prev) => ({
      ...prev,
      theme: isDark ? 'light' : 'dark',
    }));
  };

  const resetIdentity = () => {
    setSt((prev) => ({
      ...prev,
      sekolah: '',
      alamat: '',
      mapel: '',
      guru: '',
    }));
  };

  const hasIdentityData = Boolean(st.sekolah || st.alamat || st.mapel || st.guru);

  return (
    <div className="app">
      <aside className="rail" aria-label="Langkah">
        <div className="brand">
          <div className="logo">
            {!logoError ? (
              <img
                src={LOGO_SRC}
                alt="Logo Studio Aplikasi Guru"
                referrerPolicy="no-referrer"
                onError={() => setLogoError(true)}
              />
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2B2100"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 19V6a2 2 0 0 1 2-2h12v13H6a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12" />
                <path d="M9 8h6M9 11h4" />
              </svg>
            )}
          </div>
          <div>
            <b>Studio Aplikasi Guru</b>
            <small>by. Muzin Rizqi Bakhtiar</small>
          </div>
        </div>

        <div className="rail-progress">
          <div className="rail-progress-top">
            <span>Progres belajar</span>
            <span className="tabular-nums">
              {completedCount}/{PROGRESS_KEYS.length} selesai
            </span>
          </div>
          <div className="rail-progress-track" aria-hidden="true">
            <div
              className="rail-progress-bar"
              style={{ transform: `scaleX(${progressRatio})` }}
            />
          </div>
        </div>

        <nav className="nav" id="nav">
          <div className="grp">Mulai</div>
          <a
            href="#mulai"
            className={`${st.done.mulai ? 'ok' : ''} ${activeId === 'mulai' ? 'active' : ''}`}
            onClick={() => setActiveId('mulai')}
          >
            <span className="dot" />
            Beranda
          </a>
          <a
            href="#siap"
            className={`${st.done.siap ? 'ok' : ''} ${activeId === 'siap' ? 'active' : ''}`}
            onClick={() => setActiveId('siap')}
          >
            <span className="dot" />
            Persiapan
          </a>
          <a
            href="#gaya"
            className={`${st.done.gaya ? 'ok' : ''} ${activeId === 'gaya' ? 'active' : ''}`}
            onClick={() => setActiveId('gaya')}
          >
            <span className="dot" />
            Pilih gaya
          </a>
          <div className="grp">Bangun</div>
          <a
            href="#p1"
            className={`${st.done.p1 ? 'ok' : ''} ${activeId === 'p1' ? 'active' : ''}`}
            onClick={() => setActiveId('p1')}
          >
            <span className="dot" />1 · Generator soal
          </a>
          <a
            href="#p2"
            className={`${st.done.p2 ? 'ok' : ''} ${activeId === 'p2' ? 'active' : ''}`}
            onClick={() => setActiveId('p2')}
          >
            <span className="dot" />2 · Modul ajar
          </a>
          <a
            href="#p3"
            className={`${st.done.p3 ? 'ok' : ''} ${activeId === 'p3' ? 'active' : ''}`}
            onClick={() => setActiveId('p3')}
          >
            <span className="dot" />3 · Generator lain
          </a>
          <a
            href="#p4"
            className={`${st.done.p4 ? 'ok' : ''} ${activeId === 'p4' ? 'active' : ''}`}
            onClick={() => setActiveId('p4')}
          >
            <span className="dot" />4 · Dashboard
          </a>
          <a
            href="#p5"
            className={`${st.done.p5 ? 'ok' : ''} ${activeId === 'p5' ? 'active' : ''}`}
            onClick={() => setActiveId('p5')}
          >
            <span className="dot" />5 · Database
          </a>
          <div className="grp">Bantuan</div>
          <a
            href="#kuota"
            className={`${st.done.kuota ? 'ok' : ''} ${activeId === 'kuota' ? 'active' : ''}`}
            onClick={() => setActiveId('kuota')}
          >
            <span className="dot" />
            Kuota habis
          </a>
          <a
            href="#error"
            className={`${st.done.error ? 'ok' : ''} ${activeId === 'error' ? 'active' : ''}`}
            onClick={() => setActiveId('error')}
          >
            <span className="dot" />
            Kalau error
          </a>
          <a
            href="#bagikan"
            className={`${st.done.bagikan ? 'ok' : ''} ${activeId === 'bagikan' ? 'active' : ''}`}
            onClick={() => setActiveId('bagikan')}
          >
            <span className="dot" />
            Bagikan
          </a>
        </nav>

        <div className="rail-footer">
          <button
            type="button"
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={isDark ? 'Ubah ke mode terang' : 'Ubah ke mode gelap'}
          >
            {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
            <span>{isDark ? 'Mode Terang' : 'Mode Gelap'}</span>
          </button>
        </div>
      </aside>

      <main className="main">
        {/* BERANDA */}
        <section className="card hero" id="mulai">
          <div className="hero-copy">
            <div>
              <div className="hero-kicker">
                <span>Gemini Canvas</span>
                <span aria-hidden="true">·</span>
                <span>Google Sheets</span>
                <span aria-hidden="true">·</span>
                <span>Google Drive</span>
              </div>
              <h1 className="mt-2">
                Hari ini Bapak Ibu membuat aplikasi guru sendiri, cukup dengan ngobrol.
              </h1>
              <p className="hero-sub mt-3">
                Ada lima prompt. Salin satu, tempel ke Gemini, lalu lihat aplikasinya tumbuh. Mulai
                dari generator soal yang siap cetak, tambah generator lain, satukan dalam
                dashboard, lalu sambungkan ke Drive.
              </p>
            </div>
            <div className="hero-quotes">
              <div className="hero-quote">“Wah, aku bisa membuat aplikasi sendiri.”</div>
              <div className="hero-quote">“Perangkat ajarku sekarang rapi di satu tempat.”</div>
              <div className="hero-quote">“Bikin soal dan modul jauh lebih cepat dengan AI.”</div>
            </div>
          </div>
          <div className="hero-visual">
            {!heroError ? (
              <img
                src={HERO_SRC}
                alt="Ilustrasi meja kerja guru modern dengan laptop menampilkan soal dan modul ajar"
                referrerPolicy="no-referrer"
                onError={() => setHeroError(true)}
              />
            ) : (
              <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-3 p-6 text-center text-white/90">
                <img
                  src={LOGO_SRC}
                  alt="Logo Studio Aplikasi Guru"
                  className="h-16 w-16 rounded-2xl object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="text-sm font-semibold">Studio Aplikasi Guru</span>
              </div>
            )}
          </div>
        </section>

        <section className="card">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Isi sekali</p>
              <h2>Data Bapak Ibu</h2>
            </div>
            {hasIdentityData && (
              <button
                type="button"
                onClick={resetIdentity}
                className="inline-flex min-h-[40px] items-center gap-2 rounded-[10px] border border-[var(--line)] bg-[var(--bg)] px-4 py-2 text-[13px] font-bold text-[var(--soft)] transition-colors hover:text-[var(--ink)] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw size={14} aria-hidden="true" />
                Reset isian
              </button>
            )}
          </div>
          <p className="lead mb-[14px]">
            Semua prompt di halaman ini otomatis terisi data berikut, jadi tinggal salin. Data
            hanya tersimpan di browser Bapak Ibu.
          </p>
          <div className="form">
            <label htmlFor="f-sekolah">
              Nama sekolah
              <input
                id="f-sekolah"
                value={st.sekolah}
                onChange={(e) => updateField('sekolah', e.target.value)}
                placeholder="SMK Negeri 1 Tuban"
              />
            </label>
            <label htmlFor="f-alamat">
              Alamat sekolah
              <input
                id="f-alamat"
                value={st.alamat}
                onChange={(e) => updateField('alamat', e.target.value)}
                placeholder="Jl. Mastrip No. 2 Tuban"
              />
            </label>
            <label htmlFor="f-mapel">
              Mata pelajaran
              <input
                id="f-mapel"
                value={st.mapel}
                onChange={(e) => updateField('mapel', e.target.value)}
                placeholder="Bahasa Inggris"
              />
            </label>
            <label htmlFor="f-guru">
              Nama guru dan gelar
              <input
                id="f-guru"
                value={st.guru}
                onChange={(e) => updateField('guru', e.target.value)}
                placeholder="Muzin Rizqi Bakhtiar, S.Pd."
              />
            </label>
          </div>
        </section>

        <section className="card">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Alur 5 jam</p>
              <h2>Rundown hari ini</h2>
            </div>
          </div>
          <div className="timeline">
            <div className="slot">
              <span className="t">08.00–08.45</span>
              <b>Pembuka dan persiapan</b>
              <span>Demo, API key, pilih gaya</span>
            </div>
            <div className="slot">
              <span className="t">08.45–09.45</span>
              <b>Prompt 1</b>
              <span>Generator soal siap cetak</span>
            </div>
            <div className="slot">
              <span className="t">09.45–10.15</span>
              <b>Prompt 2</b>
              <span>Modul ajar</span>
            </div>
            <div className="slot rest">
              <span className="t">10.15–10.30</span>
              <b>Rehat</b>
              <span>Simpan kode dulu</span>
            </div>
            <div className="slot">
              <span className="t">10.30–11.15</span>
              <b>Prompt 3</b>
              <span>Generator pilihan sendiri</span>
            </div>
            <div className="slot">
              <span className="t">11.15–11.45</span>
              <b>Prompt 4</b>
              <span>Satukan jadi dashboard</span>
            </div>
            <div className="slot">
              <span className="t">11.45–12.30</span>
              <b>Prompt 5</b>
              <span>Sambung ke Sheets dan Drive</span>
            </div>
            <div className="slot">
              <span className="t">12.30–13.00</span>
              <b>Bagikan dan pamer</b>
              <span>Link aplikasi ke HP</span>
            </div>
          </div>
        </section>

        {/* PERSIAPAN */}
        <section className="card" id="siap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Langkah 0 · 15 menit</p>
              <h2>Persiapan</h2>
            </div>
            <label className="done">
              <input
                type="checkbox"
                checked={!!st.done.siap}
                onChange={(e) => toggleDone('siap', e.target.checked)}
              />
              Sudah
            </label>
          </div>
          <ol className="steps">
            <li>
              <div>
                Buka Chrome dengan <b>satu akun Gmail pribadi</b> saja. Kalau Chrome berisi banyak
                akun, pakai jendela Samaran <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>N</kbd>.
              </div>
            </li>
            <li>
              <div>
                Buka <b>gemini.google.com</b>. Di kotak chat, pilih <b>Canvas</b>. Semua prompt
                nanti ditempel di chat yang sama.
              </div>
            </li>
            <li>
              <div>
                Ambil kunci AI: buka <b>aistudio.google.com</b> → <b>Get API key</b> →{' '}
                <b>Create API key</b> → salin. Simpan di catatan pribadi.
              </div>
            </li>
            <li>
              <div>
                Buat Google Docs baru bernama <b>Kode Aplikasi Saya</b>. Setiap langkah berhasil,
                salin kodenya ke sini. Ini penyelamat kalau kuota habis atau Canvas rusak.
              </div>
            </li>
            <li>
              <div>Pilih gaya tampilan di bawah.</div>
            </li>
          </ol>
          <div className="warn mt-[14px]">
            API key itu seperti kunci rumah. Jangan dikirim ke grup WA, jangan ditulis di kode,
            jangan klik <b>Upgrade</b> atau memasukkan kartu. Versi tanpa bayar sudah cukup untuk
            hari ini.
          </div>
        </section>

        {/* GAYA */}
        <section className="card" id="gaya">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Langkah 0 · pilih satu</p>
              <h2>Gaya tampilan aplikasi</h2>
            </div>
            <label className="done">
              <input
                type="checkbox"
                checked={!!st.done.gaya}
                onChange={(e) => toggleDone('gaya', e.target.checked)}
              />
              Sudah
            </label>
          </div>
          <p className="lead mb-[14px]">
            Klik satu gaya. Deskripsinya otomatis masuk ke Prompt 1. Mau ganti gaya nanti? Pakai
            prompt ganti gaya di bawah.
          </p>
          <div className="styles">
            {STYLES.map((s) => {
              const selected = st.gaya === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  className="style"
                  aria-pressed={selected ? 'true' : 'false'}
                  onClick={() => selectStyle(s.id)}
                >
                  <div className="mock" aria-hidden="true">
                    <StyleMockup mock={s.mock} />
                  </div>
                  <div className="style-head">
                    <b>{s.nama}</b>
                    {selected && <span className="style-selected">Dipilih</span>}
                  </div>
                  <small>{s.ket}</small>
                </button>
              );
            })}
          </div>
          <PromptBox
            className="mt-[16px]"
            title="Prompt ganti gaya (kapan saja)"
            content={prompts.gantiGaya}
          />
          <p className="lead mt-[12px] text-[14px]">
            Punya gambar contoh tampilan sendiri? Unggah gambarnya ke chat Gemini, lalu tulis:{' '}
            <i>
              “Ubah tampilan aplikasi agar mirip gambar ini. Fitur jangan diubah. Tulis ulang kode
              lengkap.”
            </i>
          </p>
        </section>

        {/* PROMPT 1 */}
        <section className="card" id="p1">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Prompt 1 · 60 menit</p>
              <h2>Generator soal siap cetak dengan kop sekolah</h2>
            </div>
            <label className="done">
              <input
                type="checkbox"
                checked={!!st.done.p1}
                onChange={(e) => toggleDone('p1', e.target.checked)}
              />
              Sudah
            </label>
          </div>
          <p className="lead mb-[14px]">
            Inti hari ini. Satu prompt ini membuat aplikasi pertama: isi formulir, klik, dan lembar
            soal A4 berkop siap dicetak.
          </p>
          <PromptBox title="Tempel ke Gemini Canvas" content={prompts.p1} />
          <div className="check">
            <div>Formulir kop dan soal di kiri</div>
            <div>Kertas A4 dengan kop garis ganda</div>
            <div>Ikon gerigi untuk mengisi API key</div>
            <div>Klik Buat Soal, soal muncul di kertas</div>
          </div>
          <div className="tip mt-[14px]">
            Setelah aplikasi muncul: klik ikon gerigi, tempel API key, lalu coba buat 5 soal dulu.
            Berhasil? Salin kodenya ke Docs <b>Kode Aplikasi Saya</b>.
          </div>
        </section>

        {/* PROMPT 2 */}
        <section className="card" id="p2">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Prompt 2 · 30 menit</p>
              <h2>Tambah generator modul ajar</h2>
            </div>
            <label className="done">
              <input
                type="checkbox"
                checked={!!st.done.p2}
                onChange={(e) => toggleDone('p2', e.target.checked)}
              />
              Sudah
            </label>
          </div>
          <PromptBox title="Tempel di chat yang sama" content={prompts.p2} />
          <div className="check">
            <div>Ada menu Soal Ujian dan Modul Ajar</div>
            <div>Kop sekolah sama</div>
            <div>Tanda tangan kepala sekolah dan guru</div>
          </div>
        </section>

        {/* PROMPT 3 */}
        <section className="card" id="p3">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Prompt 3 · 45 menit</p>
              <h2>Generator pilihan Bapak Ibu sendiri</h2>
            </div>
            <label className="done">
              <input
                type="checkbox"
                checked={!!st.done.p3}
                onChange={(e) => toggleDone('p3', e.target.checked)}
              />
              Sudah
            </label>
          </div>
          <p className="lead">
            Pilih satu generator yang paling Bapak Ibu butuhkan. Prompt di bawah langsung berubah.
            Ulangi dengan pilihan lain kalau masih ada waktu.
          </p>
          <div className="chips" role="group" aria-label="Pilihan generator">
            {GENERATORS.map((g) => (
              <button
                key={g.id}
                type="button"
                className="chip"
                aria-pressed={st.gen === g.id ? 'true' : 'false'}
                onClick={() => selectGen(g.id)}
              >
                {g.nama}
              </button>
            ))}
          </div>

          {st.gen === 'sendiri' && (
            <div className="form-3">
              <label htmlFor="f-custom-nama">
                Nama generator
                <input
                  id="f-custom-nama"
                  value={st.customNama || ''}
                  onChange={(e) => updateField('customNama', e.target.value)}
                  placeholder="Contoh: Program Semester"
                />
              </label>
              <label htmlFor="f-custom-isian">
                Isian yang diperlukan
                <input
                  id="f-custom-isian"
                  value={st.customIsian || ''}
                  onChange={(e) => updateField('customIsian', e.target.value)}
                  placeholder="Contoh: mapel, fase, daftar TP, minggu efektif"
                />
              </label>
              <label htmlFor="f-custom-hasil">
                Hasil yang diinginkan
                <input
                  id="f-custom-hasil"
                  value={st.customHasil || ''}
                  onChange={(e) => updateField('customHasil', e.target.value)}
                  placeholder="Contoh: tabel distribusi jam per minggu dalam 1 semester"
                />
              </label>
            </div>
          )}

          <PromptBox title="Tempel di chat yang sama" content={prompts.p3} />
          <div className="tip mt-[14px]">
            Pilih <b>Bikin sendiri</b> kalau idenya tidak ada di daftar. Isi langsung kolom di atas
            atau ganti tulisan berstabilo dengan ide Bapak Ibu. Pakai rumus:{' '}
            <b>apa yang dibuat</b>, <b>isian apa saja</b>, <b>hasilnya seperti apa</b>.
          </div>
        </section>

        {/* PROMPT 4 */}
        <section className="card" id="p4">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Prompt 4 · 30 menit</p>
              <h2>Satukan jadi satu dashboard</h2>
            </div>
            <label className="done">
              <input
                type="checkbox"
                checked={!!st.done.p4}
                onChange={(e) => toggleDone('p4', e.target.checked)}
              />
              Sudah
            </label>
          </div>
          <PromptBox title="Tempel di chat yang sama" content={prompts.p4} />
          <div className="check">
            <div>Beranda dengan sapaan dan angka</div>
            <div>Semua generator di menu samping</div>
            <div>Arsip bisa dicari dan dibuka lagi</div>
            <div>Di HP menu pindah ke bawah</div>
          </div>
        </section>

        {/* PROMPT 5 */}
        <section className="card" id="p5">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Prompt 5 · 45 menit</p>
              <h2>Sambungkan ke Google Sheets dan Drive</h2>
            </div>
            <label className="done">
              <input
                type="checkbox"
                checked={!!st.done.p5}
                onChange={(e) => toggleDone('p5', e.target.checked)}
              />
              Sudah
            </label>
          </div>
          <p className="lead mb-[16px]">
            Sampai Prompt 4, arsip hanya tersimpan di browser. Langkah ini membuat setiap dokumen
            masuk ke Spreadsheet sebagai daftar dan ke Drive sebagai Google Docs.
          </p>
          <div className="flow" aria-label="Alur data">
            <div className="node a">
              <b>Aplikasi di Canvas</b>
              <span>Klik Simpan ke Arsip</span>
            </div>
            <div className="arrow" aria-hidden="true" />
            <div className="node">
              <b>Apps Script</b>
              <span>Penerima, cek PIN</span>
            </div>
            <div className="arrow" aria-hidden="true" />
            <div className="node g">
              <b>Sheets + Drive</b>
              <span>Daftar arsip + Google Docs</span>
            </div>
          </div>
          <div className="two">
            <div className="box">
              <h3>A · Pasang database (15 menit)</h3>
              <ol className="steps">
                <li>
                  <div>
                    Buka <b>sheets.new</b>. Ganti nama <i>Untitled spreadsheet</i> menjadi{' '}
                    <b>Database Aplikasi Guru</b>.
                  </div>
                </li>
                <li>
                  <div>
                    Menu <b>Extensions → Apps Script</b> (bahasa Indonesia: <b>Ekstensi</b>). Di{' '}
                    <b>Code.gs</b>, hapus semua isinya termasuk <i>function myFunction</i>, lalu
                    tempel kode di bawah.
                  </div>
                </li>
                <li>
                  <div>
                    Di baris paling atas, ganti <b>GANTI-PIN</b> dengan PIN Bapak Ibu, misalnya 4
                    angka. Klik ikon simpan (disket). Ganti juga nama <i>Untitled project</i> agar
                    mudah dicari.
                  </div>
                </li>
                <li>
                  <div>
                    Di sebelah tombol <b>Run</b>/<b>Jalankan</b>, pilih fungsi <b>pasang</b>, lalu
                    klik <b>Run</b>. Muncul izin:{' '}
                    <b>Review permissions → pilih akun → Advanced → Go to … (unsafe) → Allow</b>{' '}
                    (Indonesia: <b>Lanjutan → Buka (tidak aman) → Izinkan</b>).
                  </div>
                </li>
                <li>
                  <div>
                    Tombol biru <b>Deploy → New deployment</b> (<b>Terapkan → Deployment baru</b>) →
                    ikon gerigi → <b>Web app</b>/<b>Aplikasi web</b>. Execute as: <b>Me</b>. Who
                    has access: <b>Anyone</b>/<b>Siapa saja</b>. Klik Deploy, salin{' '}
                    <b>Web app URL</b> yang berakhiran <b>/exec</b>.
                  </div>
                </li>
              </ol>
            </div>
            <div className="box">
              <h3>B · Sambungkan aplikasi (15 menit)</h3>
              <ol className="steps">
                <li>
                  <div>
                    Kembali ke Gemini, tempel <b>Prompt 5</b> di bawah.
                  </div>
                </li>
                <li>
                  <div>
                    Di aplikasi buka <b>Pengaturan</b>, tempel URL <b>/exec</b> dan PIN, lalu klik{' '}
                    <b>Tes Sambungan</b>.
                  </div>
                </li>
                <li>
                  <div>
                    Buat satu soal, klik <b>Simpan ke Arsip</b>.
                  </div>
                </li>
                <li>
                  <div>
                    Cek tab <b>Arsip</b> di Spreadsheet dan folder <b>Arsip Aplikasi Guru</b> di
                    Drive. Dokumennya sudah jadi Google Docs.
                  </div>
                </li>
              </ol>
              <div className="warn">
                Tulisan “tidak aman” muncul karena kodenya buatan sendiri, bukan dari toko aplikasi.
                Datanya tetap di akun Bapak Ibu.
              </div>
            </div>
          </div>

          <PromptBox
            className="mt-[16px]"
            title="Kode Apps Script (Code.gs) · tempel di langkah A2"
            buttonLabel="Salin kode"
            content={APPS_SCRIPT_CODE}
            wide
          />

          <PromptBox
            className="mt-[16px]"
            title="Prompt 5 · tempel ke Gemini di langkah B1"
            content={prompts.p5}
          />
        </section>

        {/* KUOTA */}
        <section className="card" id="kuota">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Pakai versi tanpa bayar</p>
              <h2>Trik kalau kuota Gemini habis</h2>
            </div>
          </div>
          <p className="lead mb-[16px]">
            Ada dua kuota yang berbeda. Kuota chat terpakai saat membangun aplikasi. Kuota API key
            terpakai saat aplikasinya dipakai membuat soal.
          </p>
          <div className="two">
            <div className="box">
              <h3>Saat membangun (chat Gemini)</h3>
              <ul>
                <li>
                  <b>Satu prompt, satu perubahan.</b> Jangan minta aplikasi dibuat ulang dari nol.
                  Setiap tulis ulang memakan kuota besar.
                </li>
                <li>
                  <b>Pilih model yang ringan</b> (Cepat/Flash) untuk perbaikan kecil. Simpan model
                  yang paling pintar untuk Prompt 1 dan 4.
                </li>
                <li>
                  <b>Simpan kode setiap langkah</b> ke Docs <i>Kode Aplikasi Saya</i>. Kalau kuota
                  habis, tidak ada yang hilang.
                </li>
                <li>
                  <b>Kuota habis?</b> Buka chat baru di akun Gmail lain, atau di Google AI Studio,
                  ChatGPT, atau Claude. Tempel kode terakhir dengan prompt <i>Lanjutkan</i> di
                  bawah.
                </li>
                <li>
                  <b>Kerja berpasangan.</b> Satu laptop membangun, satu laptop menguji, lalu
                  bergantian. Kuota terpakai separuhnya.
                </li>
                <li>
                  <b>Ketinggalan?</b> Ambil kode cadangan langkah itu dari fasilitator:{' '}
                  <b>[link kode cadangan]</b>.
                </li>
              </ul>
            </div>
            <div className="box">
              <h3>Saat dipakai (API key di aplikasi)</h3>
              <ul>
                <li>
                  <b>Setiap guru memakai API key sendiri.</b> Kuotanya per akun, jadi 60 guru tidak
                  berebut satu kuota.
                </li>
                <li>
                  <b>Model Flash-Lite</b> sudah dipasang di Prompt 1. Model ini paling hemat dan
                  cepat.
                </li>
                <li>
                  <b>Muncul “kuota penuh”?</b> Tunggu satu menit, lalu klik lagi. Batasnya dihitung
                  per menit dan per hari.
                </li>
                <li>
                  <b>Buat 10 soal per klik</b>, jangan 50 sekaligus. Hasilnya lebih rapi dan jarang
                  gagal.
                </li>
                <li>
                  <b>Habis untuk hari ini?</b> Buat API key di akun Gmail lain, lalu ganti di
                  Pengaturan.
                </li>
                <li>
                  <b>Saat membagikan aplikasi</b>, rekan memasukkan API key miliknya sendiri. Jangan
                  bagikan kunci Bapak Ibu.
                </li>
              </ul>
            </div>
          </div>
          <PromptBox
            className="mt-[16px]"
            title="Prompt Lanjutkan · untuk chat baru atau AI lain"
            content={prompts.lanjut}
          />
          <div className="warn mt-[14px]">
            Versi tanpa bayar boleh dipakai Google untuk memperbaiki layanannya. Jangan masukkan
            nama, NIK, atau data pribadi siswa. Pakai nomor absen.
          </div>
        </section>

        {/* ERROR */}
        <section className="card" id="error">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Tenang dulu</p>
              <h2>Kalau ada yang error</h2>
            </div>
          </div>
          <div className="table-wrap mb-[16px]">
            <table>
              <thead>
                <tr>
                  <th className="w-[42%]">Yang terlihat</th>
                  <th>Yang dilakukan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ada tulisan “... existing code ...” atau kode berhenti di tengah</td>
                  <td>
                    Tempel prompt <b>Kode terpotong</b> di bawah.
                  </td>
                </tr>
                <tr>
                  <td>Tombol tidak bisa ditekan</td>
                  <td>
                    Tempel prompt <b>Tombol mati</b>, sebut nama tombolnya.
                  </td>
                </tr>
                <tr>
                  <td>Klik Buat Soal, tidak ada hasil</td>
                  <td>
                    Cek API key di Pengaturan. Kalau sudah benar, tempel prompt{' '}
                    <b>Ada pesan error</b>.
                  </td>
                </tr>
                <tr>
                  <td>Unduh Word atau Cetak tidak jalan di Canvas</td>
                  <td>
                    Wajar, Canvas membatasi unduhan. Pakai <b>Salin ke Word</b>, atau buka
                    aplikasinya lewat link <b>Bagikan</b> di tab baru.
                  </td>
                </tr>
                <tr>
                  <td>Tes Sambungan: “PIN salah”</td>
                  <td>Samakan PIN di Pengaturan dengan PIN di baris atas Apps Script.</td>
                </tr>
                <tr>
                  <td>Tes Sambungan gagal tanpa pesan</td>
                  <td>
                    Cek deployment: akses <b>Siapa saja</b> dan URL berakhiran <b>/exec</b>. Setelah
                    kode Apps Script diubah: <b>Kelola deployment → Edit → Versi baru</b>.
                  </td>
                </tr>
                <tr>
                  <td>Aplikasi rusak setelah prompt terakhir</td>
                  <td>
                    Buka Docs <b>Kode Aplikasi Saya</b>, tempel kode terakhir dengan prompt{' '}
                    <b>Lanjutkan</b>.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="stack">
            <PromptBox title="Kode terpotong" content={prompts.e1} />
            <PromptBox title="Tombol mati" content={prompts.e2} />
            <PromptBox title="Ada pesan error" content={prompts.e3} />
            <PromptBox title="Berantakan di HP" content={prompts.e4} />
          </div>
        </section>

        {/* BAGIKAN */}
        <section className="card" id="bagikan">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Penutup · 30 menit</p>
              <h2>Bagikan dan pakai di HP</h2>
            </div>
            <label className="done">
              <input
                type="checkbox"
                checked={!!st.done.bagikan}
                onChange={(e) => toggleDone('bagikan', e.target.checked)}
              />
              Sudah
            </label>
          </div>
          <ol className="steps">
            <li>
              <div>
                Di Canvas klik <b>Bagikan</b> lalu salin link-nya. Buka link itu di HP, lalu pilih{' '}
                <b>Tambahkan ke layar utama</b>.
              </div>
            </li>
            <li>
              <div>
                Rekan yang memakai link itu memasukkan API key miliknya sendiri di Pengaturan.
              </div>
            </li>
            <li>
              <div>
                Database tetap milik Bapak Ibu. Rekan yang ingin arsip sendiri memasang Apps Script
                di Spreadsheet miliknya (langkah 5A). PIN jangan dibagikan.
              </div>
            </li>
            <li>
              <div>
                Kirim link aplikasi dan satu tangkapan layar hasil terbaik ke formulir panitia:{' '}
                <b>[link formulir panitia]</b>.
              </div>
            </li>
          </ol>
          <div className="tip mt-[14px]">
            Mulai dari satu generator yang benar-benar dipakai minggu depan. Ajak satu rekan di MGMP
            mencobanya.
          </div>
        </section>

        <p className="foot">by. Muzin Rizqi Bakhtiar</p>
      </main>
    </div>
  );
}
