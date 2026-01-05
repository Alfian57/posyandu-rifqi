/**
 * useLaporanData Hook
 * Fetches data for reports and generates Excel files
 * Stub implementation - Supabase removed, ready for Laravel API integration
 */

import { useState, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { useDataCache } from '../contexts/RealtimeDataContext';

export type ReportType = 'kunjungan' | 'peserta' | 'kegiatan';

interface LaporanStats {
    kunjunganPerBulan: { bulan: string; posyandu: number; rumah: number }[];
    pesertaPerKategori: { kategori: string; jumlah: number }[];
    kegiatanPerJenis: { jenis: string; jumlah: number }[];
    totalKunjungan: number;
    totalPeserta: number;
    totalKegiatan: number;
}

export function useLaporanData() {
    const [isLoading, setIsLoading] = useState(false);
    const [stats, setStats] = useState<LaporanStats | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Get cached data from DataCacheContext
    const { pesertaList, kunjunganList, isSyncing, lastSyncTime } = useDataCache();

    // Fetch stats for visualizations - uses cached data only
    const fetchStats = useCallback(async (_month: number, _year: number) => {
        setIsLoading(true);
        setError(null);

        try {
            // TODO: Replace with Laravel API call
            console.warn('[Laporan] Using cached data only - backend not connected');

            // Use cached data
            const pesertaData = pesertaList;
            const kunjunganData = kunjunganList;

            // Process peserta per kategori
            const kategoriCounts: Record<string, number> = {};
            pesertaData.forEach((p: any) => {
                kategoriCounts[p.kategori] = (kategoriCounts[p.kategori] || 0) + 1;
            });

            const pesertaPerKategori = Object.entries(kategoriCounts).map(([kategori, jumlah]) => ({
                kategori: getKategoriLabel(kategori),
                jumlah
            }));

            // Process kunjungan per lokasi
            const posyanduCount = kunjunganData.filter((k: any) => k.lokasi_pemeriksaan === 'posyandu' || k.lokasi === 'posyandu').length;
            const rumahCount = kunjunganData.filter((k: any) => k.lokasi_pemeriksaan === 'rumah' || k.lokasi === 'rumah').length;

            const newStats = {
                kunjunganPerBulan: [{
                    bulan: 'Des',
                    posyandu: posyanduCount,
                    rumah: rumahCount
                }],
                pesertaPerKategori,
                kegiatanPerJenis: [], // No activity data without backend
                totalKunjungan: kunjunganData.length,
                totalPeserta: pesertaData.length,
                totalKegiatan: 0
            };

            setStats(newStats);

        } catch (err) {
            console.error('Error fetching stats:', err);
            setError('Gagal memuat data statistik');
        } finally {
            setIsLoading(false);
        }
    }, [pesertaList, kunjunganList]);

    // Generate and download Excel report - uses cache only
    const generateReport = useCallback(async (type: ReportType, month: number, year: number) => {
        setIsLoading(true);
        setError(null);

        try {
            const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

            let workbook: XLSX.WorkBook;
            let filename: string;

            if (type === 'kunjungan') {
                const data = kunjunganList;

                const rows = data.map((k: any, index: number) => {
                    // Lookup peserta from cache if fields are missing
                    const pesertaInfo = pesertaList.find(p => p.id === k.peserta_id);
                    
                    return {
                        'No': index + 1,
                        'Tanggal': k.tanggal_kunjungan ? new Date(k.tanggal_kunjungan).toLocaleDateString('id-ID') : '-',
                        'Nama Peserta': k.peserta_nama || k.peserta?.nama || pesertaInfo?.nama || '-',
                        'NIK': k.peserta_nik || k.peserta?.nik || pesertaInfo?.nik || '-',
                        'Kategori': getKategoriLabel(k.peserta_kategori || k.peserta?.kategori || pesertaInfo?.kategori || ''),
                        'Lokasi': k.lokasi === 'posyandu' ? 'Posyandu' : 'Kunjungan Rumah',
                        'Rujuk': k.rujuk ? 'Ya' : 'Tidak'
                    };
                });

                workbook = XLSX.utils.book_new();
                const worksheet = XLSX.utils.json_to_sheet(rows);

                worksheet['!cols'] = [
                    { width: 5 }, { width: 15 }, { width: 25 }, { width: 20 },
                    { width: 15 }, { width: 18 }, { width: 30 }
                ];

                XLSX.utils.book_append_sheet(workbook, worksheet, 'Kunjungan');
                filename = `Laporan_Kunjungan_${monthNames[month - 1]}_${year}.xlsx`;

            } else if (type === 'peserta') {
                const data = pesertaList;

                const rows = data.map((p: any, index: number) => ({
                    'No': index + 1,
                    'Nama': p.nama,
                    'NIK': p.nik,
                    'Kategori': getKategoriLabel(p.kategori),
                    'Jenis Kelamin': p.jenis_kelamin || p.jenisKelamin,
                    'Tanggal Lahir': p.tanggal_lahir ? new Date(p.tanggal_lahir).toLocaleDateString('id-ID') : '-',
                    'Telepon': p.telepon || '-',
                    'Alamat': p.alamat || '-',
                    'RT/RW': `${p.rt || '-'}/${p.rw || '-'}`,
                    'BPJS': (p.kepesertaan_bpjs ?? p.kepesertaanBpjs) ? 'Ya' : 'Tidak',
                    'No. BPJS': p.nomor_bpjs || p.nomorBpjs || '-'
                }));

                workbook = XLSX.utils.book_new();
                const worksheet = XLSX.utils.json_to_sheet(rows);

                worksheet['!cols'] = [
                    { width: 5 }, { width: 25 }, { width: 20 }, { width: 12 },
                    { width: 15 }, { width: 15 }, { width: 15 }, { width: 30 },
                    { width: 10 }, { width: 8 }, { width: 15 }
                ];

                XLSX.utils.book_append_sheet(workbook, worksheet, 'Peserta');
                filename = `Laporan_Peserta_${monthNames[month - 1]}_${year}.xlsx`;

            } else {
                // Kegiatan - no data without backend
                console.warn('[Laporan] Kegiatan report requires backend');
                setError('Laporan kegiatan tidak tersedia tanpa backend');
                return { success: false, error: 'Backend tidak terhubung' };
            }

            // Download the file
            XLSX.writeFile(workbook, filename);

            return { success: true, filename };

        } catch (err) {
            console.error('Error generating report:', err);
            setError('Gagal membuat laporan');
            return { success: false, error: 'Gagal membuat laporan' };
        } finally {
            setIsLoading(false);
        }
    }, [pesertaList, kunjunganList]);

    // Get preview data for display - uses cache only
    const getPreviewData = useCallback(async (type: ReportType) => {
        try {
            if (type === 'kunjungan') {
                const data = kunjunganList;
                if (data.length === 0 && !isSyncing && lastSyncTime) {
                    console.log('[Laporan] Cache is empty and sync is done. Returning empty.');
                    return [];
                }

                return data.map((k: any, index: number) => {
                    // Lookup peserta from cache if fields are missing
                    const pesertaInfo = pesertaList.find(p => p.id === k.peserta_id);

                    return {
                        'No': index + 1,
                        'Tanggal': k.tanggal_kunjungan ? new Date(k.tanggal_kunjungan).toLocaleDateString('id-ID') : '-',
                        'Nama Peserta': k.peserta_nama || k.peserta?.nama || pesertaInfo?.nama || '-',
                        'NIK': k.peserta_nik || k.peserta?.nik || pesertaInfo?.nik || '-',
                        'Kategori': getKategoriLabel(k.peserta_kategori || k.peserta?.kategori || pesertaInfo?.kategori || ''),
                        'Lokasi': k.lokasi === 'posyandu' ? 'Posyandu' : 'Kunjungan Rumah',
                    };
                });
            } else if (type === 'peserta') {
                const data = pesertaList;
                if (data.length === 0 && !isSyncing && lastSyncTime) {
                    console.log('[Laporan] Cache is empty and sync is done. Returning empty.');
                    return [];
                }

                return data.map((p: any, index: number) => ({
                    'No': index + 1,
                    'Nama': p.nama,
                    'NIK': p.nik,
                    'Kategori': getKategoriLabel(p.kategori),
                    'Jenis Kelamin': p.jenis_kelamin || p.jenisKelamin || '-',
                    'Telepon': p.telepon || '-',
                }));
            } else {
                // Activity log - not available without backend
                console.warn('[Laporan] Kegiatan preview requires backend');
                return [];
            }
        } catch (err) {
            console.error('Error getting preview data:', err);
            throw err;
        }
    }, [pesertaList, kunjunganList, isSyncing, lastSyncTime]);

    return {
        isLoading,
        stats,
        error,
        fetchStats,
        generateReport,
        getPreviewData
    };
}

// Helper functions
function getKategoriLabel(kategori: string): string {
    const labels: Record<string, string> = {
        bumil: 'Ibu Hamil',
        balita: 'Balita',
        remaja: 'Remaja',
        produktif: 'Produktif',
        lansia: 'Lansia'
    };
    return labels[kategori] || kategori || '-';
}
