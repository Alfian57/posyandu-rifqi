/**
 * RecentPemeriksaan Component
 * Displays last 5 pemeriksaan records
 */

import { Clock, ArrowRight, Calendar, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDataCache } from '../../contexts/RealtimeDataContext';
import { useMemo, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';

// Kategori badge colors
const kategoriColors: Record<string, { bg: string; text: string }> = {
    bumil: { bg: 'bg-pink-100', text: 'text-pink-700' },
    balita: { bg: 'bg-blue-100', text: 'text-blue-700' },
    remaja: { bg: 'bg-orange-100', text: 'text-orange-700' },
    produktif: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
    lansia: { bg: 'bg-purple-100', text: 'text-purple-700' },
};

function formatDate(dateString: string): string {
    try {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleDateString('id-ID', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    } catch {
        return dateString;
    }
}

export function RecentPemeriksaan() {
    const navigate = useNavigate();
    const { 
        pemeriksaanList, 
        pesertaList, 
        isPemeriksaanLoading, 
        isPesertaLoading,
        fetchPemeriksaan, 
        fetchPeserta 
    } = useDataCache();

    // Load data on mount
    useEffect(() => {
        if (pemeriksaanList.length === 0) {
            fetchPemeriksaan();
        }
        if (pesertaList.length === 0) {
            fetchPeserta();
        }
    }, [pemeriksaanList.length, pesertaList.length, fetchPemeriksaan, fetchPeserta]);

    // Merge pemeriksaan with peserta data and get last 5
    const recentPemeriksaan = useMemo(() => {
        return [...pemeriksaanList]
            .sort((a, b) => new Date(b.tanggal_kunjungan).getTime() - new Date(a.tanggal_kunjungan).getTime())
            .slice(0, 5)
            .map(item => {
                // Find matching peserta
                const peserta = pesertaList.find(p => p.id === item.peserta_id);
                return {
                    ...item,
                    peserta_nama: peserta?.nama || item.peserta_nama || `Peserta #${item.peserta_id}`,
                    peserta_kategori: peserta?.kategori || item.peserta_kategori
                };
            });
    }, [pemeriksaanList, pesertaList]);

    if ((isPemeriksaanLoading || isPesertaLoading) && pemeriksaanList.length === 0) {
        return (
            <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-8">
                <div className="text-center">
                    <BeatLoader color="#3B82F6" size={10} margin={3} />
                    <p className="text-gray-500 text-sm mt-3">Memuat data pemeriksaan terakhir...</p>
                </div>
            </div>
        );
    }

    if (recentPemeriksaan.length === 0) {
        return null; // Don't show anything if no data
    }

    return (
        <div className="mt-8 bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">Pemeriksaan Terakhir</h3>
                        <p className="text-xs text-gray-500">5 pemeriksaan terbaru</p>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="divide-y divide-gray-50">
                {recentPemeriksaan.map((item) => {
                    const kategori = item.peserta_kategori || 'produktif';
                    const colors = kategoriColors[kategori] || kategoriColors.produktif;
                    
                    // Correct route: /dashboard/examinations/:category/:id
                    const handleClick = () => {
                        navigate(`/dashboard/examinations/${kategori}/${item.peserta_id}`);
                    };
                    
                    return (
                        <div 
                            key={item.id}
                            className="px-6 py-4 hover:bg-gray-50/50 transition-colors cursor-pointer flex items-center justify-between gap-4"
                            onClick={handleClick}
                        >
                            {/* Left - Info */}
                            <div className="flex items-center gap-4 min-w-0 flex-1">
                                {/* Icon */}
                                <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center shrink-0`}>
                                    <Stethoscope className={`w-5 h-5 ${colors.text}`} />
                                </div>
                                
                                {/* Details */}
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-semibold text-gray-900 truncate">
                                            {item.peserta_nama}
                                        </p>
                                        <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full uppercase ${colors.bg} ${colors.text}`}>
                                            {kategori}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {formatDate(item.tanggal_kunjungan)}
                                        </span>
                                        <span className="text-xs text-gray-400">•</span>
                                        <span className="text-xs text-gray-500">
                                            {item.lokasi === 'posyandu' ? 'Posyandu' : 'Kunjungan Rumah'}
                                        </span>
                                        <span className="text-xs text-gray-400">•</span>
                                        <span className="text-xs font-medium text-gray-700">
                                            {item.berat_badan} kg
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right - Arrow */}
                            <ArrowRight className="w-4 h-4 text-gray-400 shrink-0" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
