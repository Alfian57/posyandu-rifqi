/**
 * Peserta Entity Types
 * Domain layer - defines the shape of participant data
 * NOTE: Pure domain entity - NO UI dependencies (icons, colors moved to presentation/constants)
 */

export type KategoriKey = 'bumil' | 'balita' | 'remaja' | 'produktif' | 'lansia';

export interface Peserta {
    id: string; // Internal UUID or NIK depending on usage
    nik: string;
    nama: string;
    kategori: KategoriKey;
    tanggalLahir: string;
    jenisKelamin: 'L' | 'P' | 'Laki-laki' | 'Perempuan';
    alamat?: string;
    desa?: string;
    rt?: string;
    rw?: string;
    telepon?: string;
    kepesertaanBpjs: boolean;
    nomorBpjs?: string;
    fotoUrl?: string;
    kunjunganTerakhir: string;
    status: 'sehat' | 'perhatian' | 'risiko';
    createdAt: string;
}

export interface PesertaEditForm {
    nama: string;
    nik: string;
    jenisKelamin: string;
    tanggalLahir: string;
    telepon: string;
    desa: string;
    rt: string;
    rw: string;
    kepesertaanBpjs: boolean;
    nomorBpjs: string;
}

/**
 * Utility: Calculate age from birth date string
 */
export function calculateAge(birthDate: string): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

/**
 * Utility: Create empty edit form
 */
export function createEmptyEditForm(): PesertaEditForm {
    return {
        nama: '',
        nik: '',
        jenisKelamin: 'Perempuan',
        tanggalLahir: '',
        telepon: '',
        desa: '',
        rt: '',
        rw: '',
        kepesertaanBpjs: false,
        nomorBpjs: ''
    };
}

/**
 * Utility: Convert Peserta entity to Edit Form data
 */
export function pesertaToEditForm(peserta: Peserta): PesertaEditForm {
    return {
        nama: peserta.nama,
        nik: peserta.nik,
        jenisKelamin: peserta.jenisKelamin,
        tanggalLahir: peserta.tanggalLahir,
        telepon: peserta.telepon || '',
        desa: peserta.desa || '',
        rt: peserta.rt || '',
        rw: peserta.rw || '',
        kepesertaanBpjs: peserta.kepesertaanBpjs,
        nomorBpjs: peserta.nomorBpjs || ''
    };
}
