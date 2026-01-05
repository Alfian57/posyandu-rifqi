# Posyandu Terintegrasi Layanan Primer (ILP) - Desa Tondomulyo

Sistem manajemen kesehatan Posyandu modern yang dirancang untuk mendukung transformasi layanan kesehatan primer di tingkat desa (Desa Tondomulyo). Aplikasi ini membantu kader Posyandu untuk mencatat, melacak, dan mengelola data kesehatan masyarakat secara efisien di seluruh siklus hidup.

## ✨ Fitur Unggulan

### 🏥 **Layanan 5 Klaster Terintegrasi**

Sistem disesuaikan dengan standar Puskesmas & Posyandu ILP untuk mencakup seluruh tahapan usia:

- 💝 **Ibu Hamil & Nifas** — _Pemantauan kehamilan, LILA, & tensi._
- 👶 **Bayi & Balita** — _Pelacakan BB/TB & status gizi (Antropometri)._
- 🎒 **Remaja** — _Skrining kesehatan & edukasi masa pertumbuhan._
- 💼 **Usia Produktif** — _Deteksi dini PTM (Penyakit Tidak Menular)._
- 🧓 **Lansia** — _Pengecekan rutin & pemantauan kualitas hidup._

### ⚡ **Teknologi Pintar & Efisiensi**

- **📊 Dashboard Real-Time** — Visualisasi data kunjungan dan statistik peserta yang interaktif.
- **⚡ Akses Super Cepat** — Navigasi instan dengan sistem caching **Dexie.js (IndexedDB)**.
- **� Status Sinkronisasi** — Indikator status data yang cerdas (Hijau/Merah) untuk menjamin validitas data.
- **📱 Desain Premium (UI/UX)** — Antarmuka modern dengan efek _Glassmorphism_ yang nyaman di mata.
- **🔍 Power Search** — Cari peserta kilat hanya dengan NIK atau Nama.
- **📋 Pelayanan Lapangan** — Optimal digunakan di tablet/laptop oleh Kader saat kegiatan Posyandu.

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Visualisasi Data**: [Recharts](https://recharts.org/)
- **Iconography**: [Lucide React](https://lucide.dev/)
- **Data Persistence**: [Axios](https://axios-http.com/) & [Dexie.js](https://dexie.org/) (IndexedDB Caching)
- **Arsitektur**: Clean Architecture (Data, Domain, & Presentation Layers)

## 📁 Struktur Proyek (Clean Architecture)

- `src/data`: Implementasi Datasource, Model API, dan Repository.
- `src/domain`: Business Logic (Entities & Use Cases).
- `src/presentation`: Komponen UI, Pages, Hooks, dan Contexts.
  - `components/`: UI atomik dan molekular (Dashboard, Pemeriksaan, Peserta).
  - `pages/`: Halaman utama aplikasi.
  - `hooks/`: Logika stateful reusable (useAuth, usePemeriksaan, dll).
  - `contexts/`: State management global untuk data realtime.

## 🏁 Memulai

### Prasyarat

- Node.js (Versi terbaru direkomendasikan)
- npm atau yarn

### Instalasi & Jalankan

1. Clone repositori:
   ```bash
   git clone https://github.com/Vrynd/Posyandu-terintegrasi-layanan-primer.git
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```
4. Buka `http://localhost:5173` di browser Anda.

---

Dikembangkan dengan ❤️ untuk kemajuan kesehatan **Desa Tondomulyo**.
