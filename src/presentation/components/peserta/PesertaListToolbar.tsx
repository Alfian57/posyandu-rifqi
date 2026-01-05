import { useState } from 'react';
import { Search, Plus, Filter, ArrowUpDown, SlidersHorizontal, ChevronDown } from 'lucide-react';
import type { KategoriKey } from '@/domain/entities/Peserta';
import type { SortType, GenderFilter, AgeRange } from '@/presentation/hooks/usePesertaList';
import { kategoriConfig } from '@/presentation/constants/kategoriConfig';
import { 
    PesertaKategoriModal, 
    PesertaSortModal, 
    PesertaFilterModal 
} from './modals';

interface PesertaListToolbarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedKategori: KategoriKey | null;
    onFilterChange: (kategori: KategoriKey | null) => void;
    selectedSort: SortType;
    onSortChange: (sort: SortType) => void;
    selectedGender: GenderFilter;
    onGenderChange: (gender: GenderFilter) => void;
    selectedAgeRange: AgeRange;
    onAgeRangeChange: (ageRange: AgeRange) => void;
    onAddPeserta: () => void;
}

const getSortLabel = (sort: SortType): string => {
    const labels: Record<SortType, string> = {
        'nama-asc': 'Nama A-Z',
        'nama-desc': 'Nama Z-A',
        'umur-asc': 'Umur Termuda',
        'umur-desc': 'Umur Tertua',
        'terbaru': 'Terbaru',
    };
    return labels[sort] || 'Nama A-Z';
};

const getFilterCount = (gender: GenderFilter, ageRange: AgeRange): number => {
    let count = 0;
    if (gender !== 'all') count++;
    if (ageRange.min !== null || ageRange.max !== null) count++;
    return count;
};

export function PesertaListToolbar({
    searchQuery,
    onSearchChange,
    selectedKategori,
    onFilterChange,
    selectedSort,
    onSortChange,
    selectedGender,
    onGenderChange,
    selectedAgeRange,
    onAgeRangeChange,
    onAddPeserta,
}: PesertaListToolbarProps) {
    const [isKategoriOpen, setIsKategoriOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const filterCount = getFilterCount(selectedGender, selectedAgeRange);

    return (
        <>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
                <div className="space-y-4">
                    {/* Search Input + Add Button Row */}
                    <div className="flex gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari berdasarkan NIK atau nama peserta..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                            />
                        </div>
                        <button
                            onClick={onAddPeserta}
                            className="px-6 py-2 bg-linear-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white text-sm font-medium rounded-xl flex items-center gap-2 transition-colors whitespace-nowrap"
                        >
                            <Plus className="w-5 h-5" />
                            <span className="hidden sm:inline">Peserta Baru</span>
                        </button>
                    </div>

                    {/* Filter Buttons Row */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Category Filter Button */}
                        <button
                            onClick={() => setIsKategoriOpen(true)}
                            className="flex-1 flex items-center justify-between px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm font-medium text-gray-700 hover:border-gray-300 transition-all"
                        >
                            <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4 text-gray-400" />
                                <span>
                                    {selectedKategori 
                                        ? kategoriConfig[selectedKategori].label 
                                        : 'Semua Kategori'
                                    }
                                </span>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>

                        {/* Sort Button */}
                        <button
                            onClick={() => setIsSortOpen(true)}
                            className="flex-1 flex items-center justify-between px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm font-medium text-gray-700 hover:border-gray-300 transition-all"
                        >
                            <div className="flex items-center gap-2">
                                <ArrowUpDown className="w-4 h-4 text-gray-400" />
                                <span>{getSortLabel(selectedSort)}</span>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>

                        {/* Advanced Filter Button */}
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className={`flex-1 flex items-center justify-between px-4 py-2.5 border rounded-xl text-sm font-medium transition-all ${
                                filterCount > 0
                                    ? 'border-slate-800 bg-slate-50 text-slate-800'
                                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <SlidersHorizontal className="w-4 h-4" />
                                <span>Filter</span>
                                {filterCount > 0 && (
                                    <span className="px-1.5 py-0.5 text-xs font-bold bg-slate-800 text-white rounded-md">
                                        {filterCount}
                                    </span>
                                )}
                            </div>
                            <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <PesertaKategoriModal
                isOpen={isKategoriOpen}
                onClose={() => setIsKategoriOpen(false)}
                selectedKategori={selectedKategori}
                onApply={onFilterChange}
            />
            <PesertaSortModal
                isOpen={isSortOpen}
                onClose={() => setIsSortOpen(false)}
                selectedSort={selectedSort}
                onApply={onSortChange}
            />
            <PesertaFilterModal
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                selectedGender={selectedGender}
                selectedAgeRange={selectedAgeRange}
                onApply={(gender, ageRange) => {
                    onGenderChange(gender);
                    onAgeRangeChange(ageRange);
                }}
            />
        </>
    );
}
