/**
 * PemeriksaanToolbar Component
 * Toolbar with search and separate filter/sort buttons that open dedicated modals
 */

import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import type { KategoriKey } from '../../../domain/entities/Peserta';
import type { KategoriConfig } from '../../constants/kategoriConfig';
import { FilterModal } from './FilterModal';
import { SortModal } from './SortModal';

export type FilterType = KategoriKey | 'all';
export type SortType = 'nama-asc' | 'nama-desc' | 'kunjungan-desc' | 'kunjungan-asc';

interface PemeriksaanToolbarProps {
    searchQuery: string;
    selectedFilters: KategoriKey[];
    selectedSort: SortType;
    kategoriConfig: Record<KategoriKey, KategoriConfig>;
    onSearchChange: (query: string) => void;
    onFilterChange: (filters: KategoriKey[]) => void;
    onSortChange: (sort: SortType) => void;
}

export function PemeriksaanToolbar({
    searchQuery,
    selectedFilters,
    selectedSort,
    kategoriConfig,
    onSearchChange,
    onFilterChange,
    onSortChange,
}: PemeriksaanToolbarProps) {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isSortModalOpen, setIsSortModalOpen] = useState(false);

    const activeFilterCount = selectedFilters.length;

    return (
        <>
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Search Input - Dominant */}
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Cari berdasarkan NIK atau nama peserta..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                        autoFocus
                    />
                </div>

                {/* Filter & Sort Buttons */}
                <div className="flex items-center gap-3">
                    {/* Filter Button */}
                    <button
                        onClick={() => setIsFilterModalOpen(true)}
                        className={`h-[42px] px-4 border rounded-xl flex items-center gap-2 transition-all text-sm font-medium whitespace-nowrap ${
                            activeFilterCount > 0
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        <Filter className={`w-4 h-4 ${
                            activeFilterCount > 0 ? 'text-blue-500' : 'text-gray-500'
                        }`} />
                        <span>Filter</span>
                        {activeFilterCount > 0 && (
                            <span className="ml-1 px-2 py-0.5 bg-blue-500 text-white rounded-full text-xs">
                                {activeFilterCount}
                            </span>
                        )}
                    </button>

                    {/* Sort Button */}
                    <button
                        onClick={() => setIsSortModalOpen(true)}
                        className="h-[42px] px-4 border border-gray-200 rounded-xl bg-white flex items-center gap-2 text-sm font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all whitespace-nowrap"
                    >
                        <ArrowUpDown className="w-4 h-4 text-gray-500" />
                        <span className="hidden sm:inline">Urutkan</span>
                    </button>
                </div>
            </div>

            {/* Filter Modal */}
            <FilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                selectedFilters={selectedFilters}
                kategoriConfig={kategoriConfig}
                onApply={onFilterChange}
            />

            {/* Sort Modal */}
            <SortModal
                isOpen={isSortModalOpen}
                onClose={() => setIsSortModalOpen(false)}
                selectedSort={selectedSort}
                onApply={onSortChange}
            />
        </>
    );
}
