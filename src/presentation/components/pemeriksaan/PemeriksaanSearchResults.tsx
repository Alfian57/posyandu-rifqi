/**
 * PemeriksaanSearchResults Component
 * Search results list for pemeriksaan page
 */

import { ArrowRight } from 'lucide-react';
import { BeatLoader } from 'react-spinners';
import type { KategoriKey } from '../../../domain/entities/Peserta';
import type { KategoriConfig } from '../../constants/kategoriConfig';
import type { PesertaListItem } from '../../../data/models/PesertaApiTypes';
import { EmptyState } from '../common/EmptyState';

/**
 * Format date to Indonesian locale
 */
function formatDate(dateString?: string): string {
    if (!dateString) return 'Belum ada pemeriksaan';
    
    try {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleDateString('id-ID', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    } catch {
        return 'Belum ada pemeriksaan';
    }
}

interface PemeriksaanSearchResultsProps {
    isLoading?: boolean;
    results: PesertaListItem[];
    searchQuery: string;
    selectedFilters: KategoriKey[];
    kategoriConfig: Record<KategoriKey, KategoriConfig>;
    onSelectPeserta: (peserta: PesertaListItem) => void;
}

export function PemeriksaanSearchResults({
    isLoading,
    results,
    searchQuery,
    selectedFilters,
    kategoriConfig,
    onSelectPeserta,
}: PemeriksaanSearchResultsProps) {
    if (isLoading) {
        return (
            <div className="py-20 text-center">
                <div className="mb-4">
                    <BeatLoader color="#3B82F6" size={12} margin={4} />
                </div>
                <p className="text-gray-500">Mencari data peserta...</p>
            </div>
        );
    }

    // Check if user is searching or filtering
    const isSearching = searchQuery.length >= 1 || selectedFilters.length > 0;

    // Show empty state when no results
    if (results.length === 0) {
        // Initial state - no search/filter active
        if (!isSearching) {
            return (
                <EmptyState
                    type="search"
                    title="Cari Peserta untuk Pemeriksaan"
                    description="Gunakan pencarian atau filter untuk menemukan peserta yang akan diperiksa"
                />
            );
        }

        // Search/filter active but no results
        const description = searchQuery.length >= 1
            ? `Tidak ada peserta dengan kriteria "${searchQuery}"`
            : `Tidak ada peserta kategori ${selectedFilters.map(k => kategoriConfig[k].label).join(', ')}`;

        return (
            <EmptyState
                type="not-found"
                title="Peserta tidak ditemukan"
                description={description}
            />
        );
    }

    return (
        <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
            {results.map((peserta) => {
                const config = kategoriConfig[peserta.kategori as KategoriKey];
                const Icon = config.icon;
                return (
                    <button
                        key={peserta.id}
                        onClick={() => onSelectPeserta(peserta)}
                        className="w-full px-4 py-3 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors"
                    >
                        <div className={`w-10 h-10 ${config.bg} rounded-xl flex items-center justify-center shrink-0`}>
                            <Icon className={`w-5 h-5 ${config.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900">{peserta.nama}</p>
                            <p className="text-sm text-gray-500">NIK: {peserta.nik}</p>
                        </div>
                        <div className="flex items-center gap-2 mr-2">
                            <span className={`text-xs px-3 py-1 rounded-full border ${config.color} font-medium bg-white`} style={{ borderColor: 'currentColor' }}>
                                {config.label}
                            </span>
                            <span className="text-xs px-3 py-1 border border-gray-300 rounded-full bg-gray-100 text-gray-500 font-medium whitespace-nowrap">
                                {formatDate(peserta.last_kunjungan_date)}
                            </span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-300" />
                    </button>
                );
            })}
        </div>
    );
}
