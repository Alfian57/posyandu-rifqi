/**
 * PesertaCardGrid Component
 * Card grid layout for displaying participants
 */

import { ChevronRight, Loader2 } from 'lucide-react';
import type { Peserta, KategoriKey } from '../../../domain/entities/Peserta';
import type { KategoriConfig } from '../../constants/kategoriConfig';
import { EmptyState } from '../common/EmptyState';

interface Props {
    isLoading?: boolean;
    pesertaList: Peserta[];
    totalCount: number; // Filtered count
    totalDataCount?: number; // Total data before any filter/search
    kategoriConfig: Record<KategoriKey, KategoriConfig>;
    calculateAge: (birthDate: string) => number;
    onNavigate: (id: string) => void;
    searchQuery?: string;
    selectedKategori?: string;
}

export function PesertaCardGrid({
    isLoading,
    pesertaList,
    totalCount,
    totalDataCount = 0,
    kategoriConfig,
    calculateAge,
    onNavigate,
    searchQuery = '',
    selectedKategori = 'all'
}: Props) {
    // Loading state
    if (isLoading) {
        return (
            <div className="py-20 text-center">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-4" />
                <p className="text-gray-500">Memuat data peserta...</p>
            </div>
        );
    }

    // Empty state
    const isSearching = searchQuery.length >= 1 || selectedKategori !== 'all';
    const hasNoDataAtAll = totalDataCount === 0 && !isSearching;

    if (pesertaList.length === 0) {
        if (hasNoDataAtAll) {
            return (
                <EmptyState
                    type="no-data"
                    title="Belum ada peserta terdaftar"
                    description="Silakan daftarkan peserta baru pada halaman Kunjungan"
                />
            );
        }

        return (
            <EmptyState
                type="not-found"
                title="Peserta tidak ditemukan"
                description="Coba ubah kata kunci pencarian atau filter"
            />
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">
                    Menampilkan <span className="font-semibold text-gray-700">{pesertaList.length}</span> dari <span className="font-semibold text-gray-700">{totalCount}</span> peserta
                </p>
            </div>

            {/* Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pesertaList.map((peserta) => {
                    const config = kategoriConfig[peserta.kategori];
                    const Icon = config.icon;
                    const age = calculateAge(peserta.tanggalLahir);

                    return (
                        <button
                            key={peserta.id}
                            onClick={() => onNavigate(peserta.id)}
                            className="bg-white border border-gray-100 rounded-xl p-5 text-left hover:border-blue-300 transition-all duration-200 group"
                        >
                            <div className="flex items-start gap-4">
                                {/* Avatar */}
                                <div className={`w-14 h-14 ${config.bgDark} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                                    <Icon className={`w-7 h-7 ${config.color}`} />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    {/* Name & Category */}
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h3 className="font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                                            {peserta.nama}
                                        </h3>
                                        <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg ${config.bg} ${config.color} font-bold uppercase tracking-wide shrink-0`}>
                                            <Icon className="w-3 h-3" />
                                            {config.label}
                                        </span>
                                    </div>

                                    {/* Details Grid */}
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                                        <div>
                                            <span className="text-gray-400 text-xs">Umur</span>
                                            <p className="text-gray-700 font-medium">{age} tahun</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 text-xs">NIK</span>
                                            <p className="text-gray-700 font-medium truncate">{peserta.nik}</p>
                                        </div>
                                    </div>

                                    {/* Last Visit */}
                                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                                        <div>
                                            <span className="text-gray-400 text-xs">Kunjungan Terakhir</span>
                                            <p className="text-gray-700 font-medium text-sm">
                                                {new Date(peserta.kunjunganTerakhir).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </p>
                                        </div>
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
                                            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-all" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

