/**
 * Pemeriksaan Entity
 * Domain layer - type definitions
 * Supports: Bumil, Balita, Remaja
 */

import type { LucideIcon } from 'lucide-react';

// ============================================================
// BASIC TYPES
// ============================================================

export type ParticipantType = 'bumil' | 'balita' | 'remaja' | 'produktif' | 'lansia';
export type SectionType = 'category' | 'identity' | 'health' | 'preview';
export type JenisKelamin = 'Laki-Laki' | 'Perempuan';
export type LokasiKunjungan = '' | 'posyandu' | 'kunjungan_rumah';

export interface CategoryConfig {
    id: ParticipantType;
    label: string;
    icon: LucideIcon;
    color: string;
    bgColor: string;
    borderColor: string;
}

// ============================================================
// IDENTITY FORM DATA (Same for all categories)
// Based on PESERTA table (12 fields)
// ============================================================

export interface IdentityFormData {
    nama: string;
    nik: string;
    tanggalLahir: string;
    jenisKelamin: JenisKelamin | '';
    kepesertaanBpjs: boolean;
    nomorBpjs: string;
    rt: string;
    rw: string;
    alamat: string;
    noHp: string;
    // Bumil specific (PESERTA_BUMIL table)
    namaSuami: string;
    hamilAnakKe: string;
    jarakAnak: string;
    bbSebelumHamil: string;
    tinggiBadan: string;
    // Balita/Remaja specific
    namaOrtu: string;
    // Remaja specific (PESERTA_REMAJA table)
    riwayatKeluarga: string[];
    perilakuBerisiko: string[];
    // Produktif/Lansia specific (PESERTA_DEWASA table)
    pekerjaan: string;
    statusPerkawinan: string;
    riwayatDiri: string[];  // Riwayat penyakit diri sendiri
    merokok: boolean;
    konsumsiGula: boolean;
    konsumsiGaram: boolean;
    konsumsiLemak: boolean;
}

// ============================================================
// HEALTH FORM DATA - BUMIL
// Based on KUNJUNGAN + KUNJUNGAN_BUMIL tables
// ============================================================

export interface BumilHealthFormData {
    // KUNJUNGAN table (common)
    tanggalKunjungan: string;
    beratBadan: string;
    rujuk: boolean | null;
    lokasi: LokasiKunjungan;
    // KUNJUNGAN_BUMIL table (10 fields)
    umurKehamilan: string;
    lila: string;
    tekananDarah: string;
    skriningTbc: string[];
    tabletDarah: boolean | null;
    asiEksklusif: boolean | null;
    mtBumilKek: boolean | null;
    kelasBumil: boolean | null;
    penyuluhan: string[];
}

// ============================================================
// HEALTH FORM DATA - BALITA
// Based on KUNJUNGAN + KUNJUNGAN_BALITA tables
// ============================================================

export interface BalitaHealthFormData {
    // KUNJUNGAN table (common)
    tanggalKunjungan: string;
    beratBadan: string;
    rujuk: boolean;
    lokasi: LokasiKunjungan;
    // KUNJUNGAN_BALITA table
    umurBulan: string;
    kesimpulanBb: 'NAIK' | 'TIDAK NAIK' | 'BGM' | '';
    panjangBadan: string;
    lingkarKepala: string;
    lingkarLengan: string;
    skriningTbc: string[];
    balitaMendapatkan: string[];  // ASI Eksklusif, MP ASI, Imunisasi, Vitamin A, Obat Cacing, PMT
    edukasiKonseling: string[];   // MP ASI Protein Hewani, PHBS
    adaGejalaSakit: boolean;
}

// ============================================================
// HEALTH FORM DATA - REMAJA
// Based on KUNJUNGAN + KUNJUNGAN_REMAJA tables
// ============================================================

export interface RemajaHealthFormData {
    // KUNJUNGAN table (common)
    tanggalKunjungan: string;
    beratBadan: string;
    rujuk: boolean;
    lokasi: LokasiKunjungan;
    // KUNJUNGAN_REMAJA table
    tinggiBadan: string;
    imt: 'sangat_kurus' | 'kurus' | 'normal' | 'gemuk' | 'obesitas' | '';
    lingkarPerut: string;
    tekananDarah: string;       // >15th
    gulaDarah: string;          // >15th
    kadarHb: '>12' | '11-11.9' | '8-10.9' | '<8' | '';  // remaja putri
    skriningTbc: string[];
    // Skrining Mental (8 pertanyaan)
    skriningMental: {
        nyamanDirumah: boolean;
        bebanSekolah: boolean;
        sukaTubuh: boolean;
        temanDiluarGrup: boolean;
        konsumsiRokokAlkoholNarkoba: boolean;
        hubunganSeksual: boolean;
        tidakAmanLingkungan: boolean;
        inginBunuhDiri: boolean;
    };
    edukasi: string[];
}

// ============================================================
// HEALTH FORM DATA - PRODUKTIF
// Based on KUNJUNGAN + KUNJUNGAN_DEWASA tables
// ============================================================

export interface ProduktifHealthFormData {
    // KUNJUNGAN table (common)
    tanggalKunjungan: string;
    beratBadan: string;
    rujuk: boolean;
    lokasi: LokasiKunjungan;
    // KUNJUNGAN_DEWASA table
    tinggiBadan: string;
    imt: 'sangat_kurus' | 'kurus' | 'normal' | 'gemuk' | 'obesitas' | '';
    lingkarPerut: string;
    tekananDarah: string;
    gulaDarah: string;
    asamUrat: string;
    kolesterol: string;
    tesMata: 'normal' | 'gangguan' | '';
    tesTelinga: 'normal' | 'gangguan' | '';
    skriningTbc: string[];
    // Skrining PUMA (PPOK)
    skriningPuma: {
        skorJenisKelamin: number;  // L=1, P=0
        skorUsia: number;         // 40-49=0, 50-59=1, >60=2
        skorMerokok: number;      // Tidak=0, <20=0, 20-30=1, >30=2
        napasPendek: boolean;
        dahakSaatTidakFlu: boolean;
        batukSaatTidakFlu: boolean;
        tesSpirometri: boolean;
    };
    jumlahSkorPuma: number;
    alatKontrasepsi: string;
    edukasi: string[];
}

// ============================================================
// OPTIONS
// ============================================================

export const skriningTbcOptions = [
    'Batuk > 2 minggu',
    'Demam > 2 minggu',
    'BB tidak naik',
    'Kontak TBC',
    'Tidak ada'
] as const;

export const penyuluhanBumilOptions = [
    'Isi Piringku',
    'TTD (Tablet Tambah Darah)',
    'Tanda Bahaya Kehamilan'
] as const;

export const balitaMendapatkanOptions = [
    'ASI Eksklusif',
    'MP ASI',
    'Imunisasi Lengkap',
    'Vitamin A',
    'Obat Cacing',
    'PMT'
] as const;

export const edukasiKonselingOptions = [
    'MP ASI Protein Hewani',
    'PHBS'
] as const;

export const kesimpulanBbOptions = [
    { value: 'NAIK', label: 'Naik' },
    { value: 'TIDAK NAIK', label: 'Tidak Naik' },
    { value: 'BGM', label: 'BGM (Bawah Garis Merah)' }
] as const;

// Remaja Options
export const riwayatKeluargaOptions = [
    'Hipertensi',
    'Diabetes Mellitus',
    'Stroke',
    'Jantung',
    'Asma',
    'Kanker',
    'Kolesterol',
    'Tidak Ada'
] as const;

export const perilakuBerisikoOptions = [
    'Merokok',
    'Kurang Aktivitas Fisik',
    'Kurang Sayur dan Buah',
    'Konsumsi Gula/Garam/Lemak Berlebih',
    'Konsumsi Alkohol',
    'Tidak Ada'
] as const;

export const imtOptions = [
    { value: 'sangat_kurus', label: 'Sangat Kurus' },
    { value: 'kurus', label: 'Kurus' },
    { value: 'normal', label: 'Normal' },
    { value: 'gemuk', label: 'Gemuk' },
    { value: 'obesitas', label: 'Obesitas' }
] as const;

export const kadarHbOptions = [
    { value: '>12', label: '> 12 g/dL (Normal)' },
    { value: '11-11.9', label: '11 - 11.9 g/dL (Ringan)' },
    { value: '8-10.9', label: '8 - 10.9 g/dL (Sedang)' },
    { value: '<8', label: '< 8 g/dL (Berat)' }
] as const;

export const edukasiRemajaOptions = [
    'Isi Piringku',
    'Aktivitas Fisik',
    'Anemia Remaja Putri',
    'Bahaya Rokok',
    'Bahaya NAPZA'
] as const;

export const edukasiOptions = [
    'Germas',
    'Pola Makan Sehat',
    'Aktivitas Fisik',
    'Berhenti Merokok',
    'Kesehatan Mental',
    'Lainnya'
] as const;

// Produktif/Lansia Options
export const statusPerkawinanOptions = [
    { value: 'menikah', label: 'Menikah' },
    { value: 'belum_menikah', label: 'Belum Menikah' },
    { value: 'cerai_hidup', label: 'Cerai Hidup' },
    { value: 'cerai_mati', label: 'Cerai Mati' }
] as const;

export const riwayatDiriOptions = [
    'Hipertensi',
    'Diabetes Mellitus',
    'Stroke',
    'Jantung Koroner',
    'Asma/PPOK',
    'Kanker',
    'Kolesterol Tinggi',
    'Gagal Ginjal',
    'Artritis/Reumatik',
    'Tidak Ada'
] as const;

export const pekerjaanOptions = [
    { value: 'petani', label: 'Petani' },
    { value: 'buruh', label: 'Buruh' },
    { value: 'pns', label: 'PNS' },
    { value: 'wiraswasta', label: 'Wiraswasta' },
    { value: 'swasta', label: 'Swasta' },
    { value: 'nelayan', label: 'Nelayan' },
    { value: 'irt', label: 'IRT' },
    { value: 'tidak_bekerja', label: 'Tidak Bekerja' }
] as const;

export const tesMataTelingaOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'gangguan', label: 'Gangguan' }
] as const;

export const alatKontrasepsiOptions = [
    { value: 'iud', label: 'IUD' },
    { value: 'implan', label: 'Implan' },
    { value: 'suntik', label: 'Suntik' },
    { value: 'pil', label: 'Pil' },
    { value: 'kondom', label: 'Kondom' },
    { value: 'mow', label: 'MOW' },
    { value: 'menopause', label: 'Menopause' },
    { value: 'tidak_kb', label: 'Tidak KB' }
] as const;

export const edukasiProduktifOptions = [
    'Germas',
    'Penyakit Terbanyak',
    'Lainnya'
] as const;

// ============================================================
// HEALTH FORM DATA - LANSIA
// Based on KUNJUNGAN + KUNJUNGAN_DEWASA tables (with ADL)
// ============================================================

export interface LansiaHealthFormData {
    // KUNJUNGAN table (common)
    tanggalKunjungan: string;
    beratBadan: string;
    rujuk: boolean;
    lokasi: LokasiKunjungan;
    // KUNJUNGAN_DEWASA table
    tinggiBadan: string;
    imt: 'sangat_kurus' | 'kurus' | 'normal' | 'gemuk' | 'obesitas' | '';
    lingkarPerut: string;
    tekananDarah: string;
    gulaDarah: string;
    asamUrat: string;
    kolesterol: string;
    tesMata: 'normal' | 'gangguan' | '';
    tesTelinga: 'normal' | 'gangguan' | '';
    skriningTbc: string[];
    // ADL - Indeks Barthel (8 skor)
    adl: {
        pengendalianBab: number;      // 0-2
        pengendalianBak: number;      // 0-2
        kebersihanDiri: number;       // 0-1
        penggunaanWc: number;         // 0-2
        makanMinum: number;           // 0-2
        mobilitas: number;            // 0-3
        berjalanTempatRata: number;   // 0-3
        naikTurunTangga: number;      // 0-2
    };
    jumlahSkorAdl: number;
    tingkatKemandirian: 'mandiri' | 'ringan' | 'sedang' | 'berat' | 'total' | '';
    edukasi: string[];
}

// Lansia ADL Options
export const adlPengendalianBabOptions = [
    { value: '0', label: 'Tak terkendali (0)' },
    { value: '1', label: 'Kadang-kadang (1)' },
    { value: '2', label: 'Terkendali (2)' }
] as const;

export const adlPengendalianBakOptions = [
    { value: '0', label: 'Tak terkendali (0)' },
    { value: '1', label: 'Kadang-kadang (1)' },
    { value: '2', label: 'Mandiri (2)' }
] as const;

export const adlKebersihanDiriOptions = [
    { value: '0', label: 'Butuh pertolongan (0)' },
    { value: '1', label: 'Mandiri (1)' }
] as const;

export const adlPenggunaanWcOptions = [
    { value: '0', label: 'Butuh pertolongan (0)' },
    { value: '1', label: 'Perlu bantuan sebagian (1)' },
    { value: '2', label: 'Mandiri (2)' }
] as const;

export const adlMakanMinumOptions = [
    { value: '0', label: 'Tidak mampu (0)' },
    { value: '1', label: 'Ditolong sebagian (1)' },
    { value: '2', label: 'Mandiri (2)' }
] as const;

export const adlMobilitasOptions = [
    { value: '0', label: 'Tidak mampu (0)' },
    { value: '1', label: 'Banyak bantuan (1)' },
    { value: '2', label: 'Bantuan minimal (2)' },
    { value: '3', label: 'Mandiri (3)' }
] as const;

export const adlBerjalanOptions = [
    { value: '0', label: 'Tidak mampu (0)' },
    { value: '1', label: 'Kursi roda (1)' },
    { value: '2', label: 'Dengan bantuan (2)' },
    { value: '3', label: 'Mandiri (3)' }
] as const;

export const adlNaikTurunTanggaOptions = [
    { value: '0', label: 'Tidak mampu (0)' },
    { value: '1', label: 'Butuh pertolongan (1)' },
    { value: '2', label: 'Mandiri (2)' }
] as const;

export const tingkatKemandirianOptions = [
    { value: 'mandiri', label: 'Mandiri (>15)' },
    { value: 'ringan', label: 'Ketergantungan Ringan (10-14)' },
    { value: 'sedang', label: 'Ketergantungan Sedang (6-9)' },
    { value: 'berat', label: 'Ketergantungan Berat (3-5)' },
    { value: 'total', label: 'Ketergantungan Total (0-2)' }
] as const;

// ============================================================
// COMBINED DATA
// ============================================================

export type HealthFormData = BumilHealthFormData | BalitaHealthFormData | RemajaHealthFormData | ProduktifHealthFormData | LansiaHealthFormData;

export interface PemeriksaanData {
    kategori: ParticipantType;
    identitas: IdentityFormData;
    kesehatan: HealthFormData;
}
