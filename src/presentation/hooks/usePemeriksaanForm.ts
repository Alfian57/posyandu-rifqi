/**
 * useKunjunganForm Hook
 * Logic for health examination visit wizard
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { pesertaApiDataSource } from '@/data/datasources/PesertaApiDataSource';
import { pemeriksaanApiDataSource } from '@/data/datasources/PemeriksaanApiDataSource';
import { kategoriConfig } from '@/presentation/constants/kategoriConfig';
import type { ParticipantType } from '@/domain/entities/Pemeriksaan';

// Combined form data type
export interface PemeriksaanFormData {
    // Step 3: Data Kunjungan
    tanggal_kunjungan: string;
    lokasi: 'posyandu' | 'kunjungan_rumah' | '';
    berat_badan: string;
    rujuk: boolean | null;

    // Common Profile Fields (for Peserta API Update)
    alamat: string;
    rt: string;
    rw: string;
    telepon: string;
    kepesertaan_bpjs: boolean;
    nomor_bpjs: string;
    
    // Step 2: Pemeriksaan - Bumil (Data Kehamilan)
    nama_suami: string;
    hamil_anak_ke: string;
    jarak_anak: string;
    bb_sebelum_hamil: string;
    // Pemeriksaan Bumil
    umur_kehamilan: string;
    lila: string;
    tekanan_darah: string;
    tablet_darah: boolean | null;
    asi_eksklusif: boolean | null;
    mt_bumil_kek: boolean | null;
    kelas_bumil: boolean | null;
    penyuluhan: string[];
    
    // Step 2: Pemeriksaan - Balita
    nama_ortu: string;
    umur_bulan: string;
    kesimpulan_bb: string;
    panjang_badan: string;
    lingkar_kepala: string;
    lingkar_lengan: string;
    balita_mendapatkan: string[];
    edukasi_konseling: string[];
    
    // Step 2: Pemeriksaan - Remaja (Data Riwayat)
    nama_ortu_remaja: string;
    riwayat_keluarga: string[];
    perilaku_berisiko: string[];
    // Pemeriksaan Remaja
    tinggi_badan: string;
    imt: string;
    lingkar_perut: string;
    gula_darah: string;
    kadar_hb: string;
    skrining_mental: {
        nyamanDirumah: boolean | null;
        bebanSekolah: boolean | null;
        sukaTubuh: boolean | null;
        temanDiluarGrup: boolean | null;
        konsumsiRokokAlkoholNarkoba: boolean | null;
        hubunganSeksual: boolean | null;
        tidakAmanLingkungan: boolean | null;
        inginBunuhDiri: boolean | null;
    };
    edukasi: string[];
    
    // Step 2: Pemeriksaan - Produktif/Lansia (Data Kesehatan)
    pekerjaan: string;
    status_perkawinan: string;
    riwayat_diri: string[];
    merokok: boolean | null;
    konsumsi_gula: boolean | null;
    konsumsi_garam: boolean | null;
    konsumsi_lemak: boolean | null;
    // Pemeriksaan Dewasa
    asam_urat: string;
    kolesterol: string;
    tes_mata: string;
    tes_telinga: string;
    skrining_puma: {
        napasPendek: boolean | null;
        dahakSaatTidakFlu: boolean | null;
        batukSaatTidakFlu: boolean | null;
        tesSpirometri: boolean | null;
    };
    adl: {
        pengendalianBab: number;
        pengendalianBak: number;
        kebersihanDiri: number;
        penggunaanWc: number;
        makanMinum: number;
        mobilitas: number;
        berjalanTempatRata: number;
        naikTurunTangga: number;
    };
    jumlah_skor_adl: number;
    tingkat_kemandirian: string;
    alat_kontrasepsi: string;
    
    // Common skrining
    skrining_tbc: string[];
}

export const initialPemeriksaanForm: PemeriksaanFormData = {
    tanggal_kunjungan: new Date().toISOString().split('T')[0],
    lokasi: '',
    berat_badan: '',
    rujuk: null,

    // Common Profile Fields
    alamat: '',
    rt: '',
    rw: '',
    telepon: '',
    kepesertaan_bpjs: false,
    nomor_bpjs: '',

    // Bumil - Data Kehamilan
    nama_suami: '',
    hamil_anak_ke: '',
    jarak_anak: '',
    bb_sebelum_hamil: '',
    // Bumil - Pemeriksaan
    umur_kehamilan: '',
    lila: '',
    tekanan_darah: '',
    tablet_darah: null,
    asi_eksklusif: null,
    mt_bumil_kek: null,
    kelas_bumil: null,
    penyuluhan: [],
    // Balita
    nama_ortu: '',
    umur_bulan: '',
    kesimpulan_bb: '',
    panjang_badan: '',
    lingkar_kepala: '',
    lingkar_lengan: '',
    balita_mendapatkan: [],
    edukasi_konseling: [],
    // Remaja - Data Riwayat
    nama_ortu_remaja: '',
    riwayat_keluarga: [],
    perilaku_berisiko: [],
    // Remaja - Pemeriksaan
    tinggi_badan: '',
    imt: '',
    lingkar_perut: '',
    gula_darah: '',
    kadar_hb: '',
    skrining_mental: {
        nyamanDirumah: null,
        bebanSekolah: null,
        sukaTubuh: null,
        temanDiluarGrup: null,
        konsumsiRokokAlkoholNarkoba: null,
        hubunganSeksual: null,
        tidakAmanLingkungan: null,
        inginBunuhDiri: null
    },
    edukasi: [],
    // Produktif/Lansia - Data Kesehatan
    pekerjaan: '',
    status_perkawinan: '',
    riwayat_diri: [],
    merokok: null,
    konsumsi_gula: null,
    konsumsi_garam: null,
    konsumsi_lemak: null,
    // Dewasa - Pemeriksaan
    asam_urat: '',
    kolesterol: '',
    tes_mata: '',
    tes_telinga: '',
    skrining_puma: {
        napasPendek: null,
        dahakSaatTidakFlu: null,
        batukSaatTidakFlu: null,
        tesSpirometri: null
    },
    adl: {
        pengendalianBab: 0,
        pengendalianBak: 0,
        kebersihanDiri: 0,
        penggunaanWc: 0,
        makanMinum: 0,
        mobilitas: 0,
        berjalanTempatRata: 0,
        naikTurunTangga: 0
    },
    jumlah_skor_adl: 0,
    tingkat_kemandirian: '',
    alat_kontrasepsi: '',
    skrining_tbc: []
};

export interface SelectedPeserta {
    id: string;
    nik: string;
    nama: string;
    kategori: ParticipantType;
    identity: {
        nama: string;
        nik: string;
        tanggalLahir: string;
        jenisKelamin: string;
        tinggiBadan?: string;
        alamat?: string;
        rt?: string;
        rw?: string;
        telepon?: string;
        kepesertaanBpjs?: boolean;
        nomorBpjs?: string;
        namaSuami?: string;
        namaOrtu?: string;
        pekerjaan?: string;
    };
    lastVisitDate?: string;
}

export interface UsePemeriksaanFormReturn {
    selectedPeserta: SelectedPeserta | null;
    isLoading: boolean;
    isSaving: boolean;
    error: string | null;
    currentStep: number;
    formData: PemeriksaanFormData;
    handleFormChange: (field: keyof PemeriksaanFormData, value: any) => void;
    handleSkriningTbcChange: (tags: string[]) => void;
    handleMentalChange: (key: string, value: boolean | null) => void;
    handlePumaChange: (key: string, value: boolean | null) => void;
    handleAdlChange: (key: string, value: number) => void;
    handleNext: () => void;
    handlePrev: () => void;
    handleSubmit: () => Promise<void>;
    handleBack: () => void;
}

export function usePemeriksaanForm(id: string | undefined): UsePemeriksaanFormReturn {
    const navigate = useNavigate();
    const [selectedPeserta, setSelectedPeserta] = useState<SelectedPeserta | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<PemeriksaanFormData>(initialPemeriksaanForm);

    useEffect(() => {
        const fetchPeserta = async () => {
            if (!id || id === 'baru') {
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            try {
                const response = await pesertaApiDataSource.getPesertaById(Number(id));
                if (response.success && response.data) {
                    const ext = response.data.extension || {};
                    const d = response.data;
                    const mapped: SelectedPeserta = {
                        id: String(d.id),
                        nik: d.nik,
                        nama: d.nama,
                        kategori: d.kategori as ParticipantType,
                        lastVisitDate: d.updated_at,
                        identity: {
                            nama: d.nama,
                            nik: d.nik,
                            tanggalLahir: d.tanggal_lahir?.slice(0, 10),
                            jenisKelamin: d.jenis_kelamin,
                            tinggiBadan: (ext as any).tinggi_badan?.toString() || '',
                            alamat: d.alamat || '',
                            rt: d.rt || '',
                            rw: d.rw || '',
                            telepon: d.telepon || '',
                            kepesertaanBpjs: d.kepesertaan_bpjs ?? false,
                            nomorBpjs: d.nomor_bpjs || '',
                            namaSuami: (ext as any).nama_suami || '',
                            namaOrtu: (ext as any).nama_ortu || '',
                            pekerjaan: (ext as any).pekerjaan || '',
                        }
                    };
                    setSelectedPeserta(mapped);
                    
                    // Semantic URL Redirection
                    const currentPath = window.location.pathname;
                    const slug = kategoriConfig[mapped.kategori].urlSlug;
                    if (!currentPath.includes(`/${slug}/`)) {
                        navigate(`/dashboard/examinations/${slug}/${id}`, { replace: true });
                    }

                    // Pre-populate formData
                    setFormData((prev: PemeriksaanFormData) => ({ 
                        ...prev, 
                        alamat: mapped.identity.alamat || '',
                        rt: mapped.identity.rt || '',
                        rw: mapped.identity.rw || '',
                        telepon: mapped.identity.telepon || '',
                        kepesertaan_bpjs: mapped.identity.kepesertaanBpjs ?? false,
                        nomor_bpjs: mapped.identity.nomorBpjs || '',
                        nama_suami: mapped.identity.namaSuami || '',
                        nama_ortu: mapped.identity.namaOrtu || '',
                        nama_ortu_remaja: mapped.identity.namaOrtu || '',
                        pekerjaan: mapped.identity.pekerjaan || '',
                        tinggi_badan: mapped.identity.tinggiBadan || prev.tinggi_badan
                    }));
                } else {
                    setError('Data peserta tidak ditemukan.');
                }
            } catch (err) {
                setError('Terjadi kesalahan saat memuat data peserta.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchPeserta();
    }, [id, navigate]);

    const handleFormChange = (field: keyof PemeriksaanFormData, value: any) => {
        setFormData((prev: PemeriksaanFormData) => ({ ...prev, [field]: value }));
    };

    // Specialized Handlers
    const handleSkriningTbcChange = (tags: string[]) => {
        const prevTags = formData.skrining_tbc;
        const hasNotAda = tags.includes('Tidak ada');
        const prevHasNotAda = prevTags.includes('Tidak ada');

        if (hasNotAda && !prevHasNotAda) {
            handleFormChange('skrining_tbc', ['Tidak ada']);
        } else if (hasNotAda && tags.length > 1) {
            handleFormChange('skrining_tbc', tags.filter(t => t !== 'Tidak ada'));
        } else {
            handleFormChange('skrining_tbc', tags);
        }
    };

    const handleMentalChange = (key: string, value: boolean | null) => {
        handleFormChange('skrining_mental', {
            ...formData.skrining_mental,
            [key]: value
        });
    };

    const handlePumaChange = (key: string, value: boolean | null) => {
        handleFormChange('skrining_puma', {
            ...formData.skrining_puma,
            [key]: value
        });
    };

    const handleAdlChange = (key: string, value: number) => {
        const newAdl = { ...formData.adl, [key]: value };
        const totalScore = Object.values(newAdl).reduce((sum, val) => sum + (val || 0), 0);
        
        let tingkat = '';
        if (totalScore > 15) tingkat = 'mandiri';
        else if (totalScore >= 10) tingkat = 'ringan';
        else if (totalScore >= 6) tingkat = 'sedang';
        else if (totalScore >= 3) tingkat = 'berat';
        else tingkat = 'total';
        
        handleFormChange('adl', newAdl);
        handleFormChange('jumlah_skor_adl', totalScore);
        handleFormChange('tingkat_kemandirian', tingkat);
    };

    const validateStep = (step: number): boolean => {

        if (!selectedPeserta) return false;

        if (step === 2) {
            if (!formData.berat_badan) {
                toast.error('Mohon isi Berat Badan terlebih dahulu');
                return false;
            }
            return true;
        }

        if (step === 3) {
            if (!formData.lokasi) {
                toast.error('Mohon pilih Lokasi Pemeriksaan');
                return false;
            }
            if (formData.rujuk === null) {
                toast.error('Mohon tentukan apakah perlu Rujukan atau tidak');
                return false;
            }
            return true;
        }

        return true;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 4));
        }
    };

    const handlePrev = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async () => {
        if (!selectedPeserta) return;
        setIsSaving(true);
        
        try {
            const cat = selectedPeserta.kategori;
            const pesertaRequest: any = {
                alamat: formData.alamat || undefined,
                rt: formData.rt || undefined,
                rw: formData.rw || undefined,
                telepon: formData.telepon || undefined,
                kepesertaan_bpjs: formData.kepesertaan_bpjs,
                nomor_bpjs: formData.nomor_bpjs || undefined,
            };

            if (cat === 'bumil') {
                Object.assign(pesertaRequest, {
                    nama_suami: formData.nama_suami || undefined,
                    hamil_anak_ke: formData.hamil_anak_ke ? parseInt(formData.hamil_anak_ke) : undefined,
                    jarak_anak: formData.jarak_anak || undefined,
                    bb_sebelum_hamil: formData.bb_sebelum_hamil ? parseFloat(formData.bb_sebelum_hamil) : undefined,
                    tinggi_badan: formData.tinggi_badan ? parseFloat(formData.tinggi_badan) : undefined,
                });
            } else if (cat === 'balita') {
                Object.assign(pesertaRequest, {
                    nama_ortu: formData.nama_ortu || undefined,
                });
            } else if (cat === 'remaja') {
                Object.assign(pesertaRequest, {
                    nama_ortu: formData.nama_ortu || undefined,
                    riwayat_keluarga: formData.riwayat_keluarga.length > 0 ? formData.riwayat_keluarga : undefined,
                    perilaku_berisiko: formData.perilaku_berisiko.length > 0 ? formData.perilaku_berisiko : undefined,
                });
            } else if (cat === 'produktif' || cat === 'lansia') {
                Object.assign(pesertaRequest, {
                    pekerjaan: formData.pekerjaan || undefined,
                    status_perkawinan: formData.status_perkawinan || undefined,
                    riwayat_diri: formData.riwayat_diri.length > 0 ? formData.riwayat_diri : undefined,
                    merokok: formData.merokok,
                    konsumsi_gula: formData.konsumsi_gula,
                    konsumsi_garam: formData.konsumsi_garam,
                    konsumsi_lemak: formData.konsumsi_lemak,
                });
            }

            Object.keys(pesertaRequest).forEach(key => {
                if (pesertaRequest[key] === undefined) delete pesertaRequest[key];
            });

            const kunjunganRequest: any = {
                peserta_id: parseInt(selectedPeserta.id),
                tanggal_kunjungan: formData.tanggal_kunjungan,
                lokasi: formData.lokasi || undefined,
                rujuk: formData.rujuk === null ? undefined : formData.rujuk,
                berat_badan: formData.berat_badan ? parseFloat(formData.berat_badan) : undefined,
            };

            if (cat === 'bumil') {
                Object.assign(kunjunganRequest, {
                    umur_kehamilan: formData.umur_kehamilan ? parseInt(formData.umur_kehamilan) : undefined,
                    lila: formData.lila ? parseFloat(formData.lila) : undefined,
                    tekanan_darah: formData.tekanan_darah || undefined,
                    skrining_tbc: formData.skrining_tbc.length > 0 ? formData.skrining_tbc : undefined,
                    tablet_darah: formData.tablet_darah,
                    asi_eksklusif: formData.asi_eksklusif,
                    mt_bumil_kek: formData.mt_bumil_kek,
                    kelas_bumil: formData.kelas_bumil,
                    penyuluhan: formData.penyuluhan.length > 0 ? formData.penyuluhan : undefined,
                });
            } else if (cat === 'balita') {
                Object.assign(kunjunganRequest, {
                    umur_bulan: formData.umur_bulan ? parseInt(formData.umur_bulan) : undefined,
                    kesimpulan_bb: formData.kesimpulan_bb || undefined,
                    panjang_badan: formData.panjang_badan ? parseFloat(formData.panjang_badan) : undefined,
                    lingkar_kepala: formData.lingkar_kepala ? parseFloat(formData.lingkar_kepala) : undefined,
                    lingkar_lengan: formData.lingkar_lengan ? parseFloat(formData.lingkar_lengan) : undefined,
                    skrining_tbc: formData.skrining_tbc.length > 0 ? formData.skrining_tbc : undefined,
                    balita_mendapatkan: formData.balita_mendapatkan.length > 0 ? formData.balita_mendapatkan : undefined,
                    edukasi_konseling: formData.edukasi_konseling.length > 0 ? formData.edukasi_konseling : undefined,
                });
            } else if (cat === 'remaja') {
                const skriningMentalArray = Object.entries(formData.skrining_mental)
                    .filter(([_, value]) => value === true)
                    .map(([key]) => key);

                Object.assign(kunjunganRequest, {
                    tinggi_badan: formData.tinggi_badan ? parseFloat(formData.tinggi_badan) : undefined,
                    imt: formData.imt || undefined,
                    lingkar_perut: formData.lingkar_perut ? parseFloat(formData.lingkar_perut) : undefined,
                    tekanan_darah: formData.tekanan_darah || undefined,
                    gula_darah: formData.gula_darah ? parseFloat(formData.gula_darah) : undefined,
                    kadar_hb: formData.kadar_hb || undefined,
                    skrining_tbc: formData.skrining_tbc.length > 0 ? formData.skrining_tbc : undefined,
                    skrining_mental: skriningMentalArray.length > 0 ? skriningMentalArray : undefined,
                    edukasi: formData.edukasi.length > 0 ? formData.edukasi : undefined,
                });
            } else if (cat === 'produktif' || cat === 'lansia') {
                const skriningPumaArray = Object.entries(formData.skrining_puma)
                    .filter(([_, value]) => value === true)
                    .map(([key]) => key);

                const adlEntries = Object.entries(formData.adl) as [string, number][];
                const adlArray = adlEntries
                    .filter(([_, value]) => value > 0)
                    .map(([key, value]) => `${key}:${value}`);

                Object.assign(kunjunganRequest, {
                    tinggi_badan: formData.tinggi_badan ? parseFloat(formData.tinggi_badan) : undefined,
                    imt: formData.imt || undefined,
                    lingkar_perut: formData.lingkar_perut ? parseFloat(formData.lingkar_perut) : undefined,
                    tekanan_darah: formData.tekanan_darah || undefined,
                    gula_darah: formData.gula_darah ? parseFloat(formData.gula_darah) : undefined,
                    asam_urat: formData.asam_urat ? parseFloat(formData.asam_urat) : undefined,
                    kolesterol: formData.kolesterol ? parseFloat(formData.kolesterol) : undefined,
                    tes_mata: formData.tes_mata || undefined,
                    tes_telinga: formData.tes_telinga || undefined,
                    skrining_tbc: formData.skrining_tbc.length > 0 ? formData.skrining_tbc : undefined,
                    skrining_puma: skriningPumaArray.length > 0 ? skriningPumaArray : undefined,
                    adl: cat === 'lansia' && adlArray.length > 0 ? adlArray : undefined,
                    edukasi: formData.edukasi.length > 0 ? formData.edukasi : undefined,
                });
            }

            Object.keys(kunjunganRequest).forEach(key => {
                if (kunjunganRequest[key] === undefined) delete kunjunganRequest[key];
            });

            // Sequential execution
            const pesertaRes = await pesertaApiDataSource.updatePeserta(parseInt(selectedPeserta.id), pesertaRequest);
            if (!pesertaRes.success) throw new Error(pesertaRes.message || 'Gagal memperbarui data peserta');

            const kunjunganRes = await pemeriksaanApiDataSource.createPemeriksaan(kunjunganRequest);
            if (!kunjunganRes.success) throw new Error(kunjunganRes.message || 'Gagal menyimpan hasil pemeriksaan');

            toast.success('Data pemeriksaan berhasil disimpan');
            navigate('/dashboard/examinations');

        } catch (err: any) {
            console.error('Error during submission:', err);
            toast.error(err.message || 'Terjadi kesalahan saat menyimpan data');
        } finally {
            setIsSaving(false);
        }
    };

    const handleBack = () => navigate('/dashboard/examinations');

    return {
        selectedPeserta,
        isLoading,
        isSaving,
        error,
        currentStep,
        formData,
        handleFormChange,
        handleSkriningTbcChange,
        handleMentalChange,
        handlePumaChange,
        handleAdlChange,
        handleNext,
        handlePrev,
        handleSubmit,
        handleBack,
    };
}
