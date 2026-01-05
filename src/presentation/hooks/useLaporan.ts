import { useState, useEffect, useCallback } from 'react';
import { useLaporanData, type ReportType } from './useLaporanData';
import toast from 'react-hot-toast';
import { FileText, Calendar, Users } from 'lucide-react';

export interface ReportConfig {
    id: ReportType;
    name: string;
    description: string;
    details: string[];
    icon: typeof FileText;
    color: string;
    bgColor: string;
    borderColor: string;
}

export const reports: ReportConfig[] = [
    {
        id: 'kunjungan',
        name: 'Laporan Kunjungan',
        description: 'Rekap data kunjungan peserta',
        details: ['Tanggal kunjungan', 'Data peserta', 'Lokasi pemeriksaan', 'Status rujukan'],
        icon: Calendar,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-500',
    },
    {
        id: 'peserta',
        name: 'Laporan Peserta',
        description: 'Data lengkap semua peserta',
        details: ['Data pribadi', 'Kategori peserta', 'Kontak & alamat', 'Status BPJS'],
        icon: Users,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-500',
    },
];

export const months = [
    { value: 1, label: 'Januari' }, { value: 2, label: 'Februari' },
    { value: 3, label: 'Maret' }, { value: 4, label: 'April' },
    { value: 5, label: 'Mei' }, { value: 6, label: 'Juni' },
    { value: 7, label: 'Juli' }, { value: 8, label: 'Agustus' },
    { value: 9, label: 'September' }, { value: 10, label: 'Oktober' },
    { value: 11, label: 'November' }, { value: 12, label: 'Desember' },
];

export function useLaporan() {
    const [selectedReport, setSelectedReport] = useState<ReportType | null>(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [previewData, setPreviewData] = useState<any[]>([]);
    const [isLoadingPreview, setIsLoadingPreview] = useState(false);
    const [previewError, setPreviewError] = useState<string | null>(null);

    const { isLoading, generateReport, getPreviewData } = useLaporanData();
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const loadPreview = async () => {
            if (!selectedReport) {
                setPreviewData([]);
                setPreviewError(null);
                return;
            }
            setIsLoadingPreview(true);
            setPreviewError(null);
            try {
                const data = await getPreviewData(selectedReport);
                setPreviewData(data.slice(0, 10));
            } catch (err) {
                console.error('Preview error:', err);
                setPreviewError('Gagal memuat preview. Pastikan sudah klik Sinkronkan di Dashboard.');
                setPreviewData([]);
            } finally {
                setIsLoadingPreview(false);
            }
        };
        loadPreview();
    }, [selectedReport, getPreviewData]);

    const handleReportToggle = useCallback((id: ReportType) => {
        setSelectedReport(prev => prev === id ? null : id);
    }, []);

    const handleGenerate = async () => {
        if (!selectedReport) {
            toast.error('Pilih jenis laporan terlebih dahulu');
            return;
        }
        const result = await generateReport(selectedReport, selectedMonth, currentYear);
        if (result.success) {
            toast.success(`Laporan berhasil diunduh: ${result.filename}`);
        } else {
            toast.error('Gagal membuat laporan');
        }
    };

    const getReportLabel = useCallback(() => {
        const report = reports.find(r => r.id === selectedReport);
        return report?.name || 'Laporan';
    }, [selectedReport]);

    return {
        selectedReport,
        selectedMonth,
        setSelectedMonth,
        previewData,
        isLoadingPreview,
        previewError,
        isLoading,
        currentYear,
        handleReportToggle,
        handleGenerate,
        getReportLabel,
        reports,
        months
    };
}
