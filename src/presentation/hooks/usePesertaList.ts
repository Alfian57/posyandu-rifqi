/**
 * usePesertaList Hook
 * State and logic for PesertaPage - search, filter, pagination
 * Uses Laravel API via PesertaApiDataSource
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { calculateAge, type KategoriKey } from '../../domain/entities/Peserta';
import { kategoriConfig } from '../constants/kategoriConfig';
import type { PesertaListItem } from '../../data/models/PesertaApiTypes';
import { useDataCache } from '../contexts/RealtimeDataContext';

const ITEMS_PER_PAGE = 5;

export type SortType = 'nama-asc' | 'nama-desc' | 'umur-asc' | 'umur-desc' | 'terbaru';
export type GenderFilter = 'all' | 'L' | 'P';
export interface AgeRange {
    min: number | null;
    max: number | null;
}

export const sortOptions: { value: SortType; label: string }[] = [
    { value: 'nama-asc', label: 'Nama A-Z' },
    { value: 'nama-desc', label: 'Nama Z-A' },
    { value: 'umur-asc', label: 'Umur Termuda' },
    { value: 'umur-desc', label: 'Umur Tertua' },
    { value: 'terbaru', label: 'Terbaru' },
];

// Map API response to internal Peserta format
export interface PesertaDisplay extends PesertaListItem {
    kunjunganTerakhir?: string;
    status?: 'sehat' | 'perhatian' | 'risiko';
}

export function usePesertaList() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    
    // State
    const [pesertaList, setPesertaList] = useState<PesertaDisplay[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedKategori, setSelectedKategori] = useState<KategoriKey | null>(null);
    const [selectedSort, setSelectedSort] = useState<SortType>('nama-asc');
    const [selectedGender, setSelectedGender] = useState<GenderFilter>('all');
    const [selectedAgeRange, setSelectedAgeRange] = useState<AgeRange>({ min: null, max: null });
    const [currentPage, setCurrentPage] = useState(1);
    const [successData, setSuccessData] = useState<{ nama: string; nik: string } | null>(null);

    // Banner logic
    useEffect(() => {
        const success = searchParams.get('success');
        const nama = searchParams.get('nama');
        const nik = searchParams.get('nik');
        
        if (success === '1' && nama && nik) {
            setSuccessData({ nama, nik });
            setSearchParams({}, { replace: true });
        }
    }, [searchParams, setSearchParams]);

    // Use cache context
    const { fetchPeserta: fetchFromCache } = useDataCache();

    // Fetch data from cache (uses API only if cache expired)
    const loadPeserta = useCallback(async (forceRefresh = false) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchFromCache(forceRefresh);
            setPesertaList(data as PesertaDisplay[]);
        } catch (err) {
            console.error('[usePesertaList] Error fetching:', err);
            setError('Gagal memuat data peserta');
        } finally {
            setIsLoading(false);
        }
    }, [fetchFromCache]);

    // Initial fetch (uses cache if valid)
    useEffect(() => {
        loadPeserta();
    }, [loadPeserta]);


    // Filter and Sort peserta (client-side)
    const filteredPeserta = useMemo(() => {
        let result = pesertaList.filter((p) => {
            const matchSearch = p.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.nik.includes(searchQuery);
            const matchKategori = !selectedKategori || p.kategori === selectedKategori;
            const matchGender = selectedGender === 'all' || p.jenis_kelamin === selectedGender;
            
            // Age filter
            let matchAge = true;
            if (selectedAgeRange.min !== null || selectedAgeRange.max !== null) {
                const age = calculateAge(p.tanggal_lahir);
                if (selectedAgeRange.min !== null && age < selectedAgeRange.min) matchAge = false;
                if (selectedAgeRange.max !== null && selectedAgeRange.max !== 999 && age > selectedAgeRange.max) matchAge = false;
                if (selectedAgeRange.max === 999 && selectedAgeRange.min !== null && age < selectedAgeRange.min) matchAge = false;
            }
            
            return matchSearch && matchKategori && matchGender && matchAge;
        });

        // Apply Sorting
        result.sort((a, b) => {
            switch (selectedSort) {
                case 'nama-asc':
                    return a.nama.localeCompare(b.nama);
                case 'nama-desc':
                    return b.nama.localeCompare(a.nama);
                case 'umur-asc':
                    return calculateAge(a.tanggal_lahir) - calculateAge(b.tanggal_lahir);
                case 'umur-desc':
                    return calculateAge(b.tanggal_lahir) - calculateAge(a.tanggal_lahir);
                case 'terbaru':
                    return Number(b.id) - Number(a.id);
                default:
                    return 0;
            }
        });

        return result;
    }, [pesertaList, searchQuery, selectedKategori, selectedSort, selectedGender, selectedAgeRange]);

    // Pagination
    const totalPages = Math.ceil(filteredPeserta.length / ITEMS_PER_PAGE);
    const paginatedPeserta = useMemo(() => {
        return filteredPeserta.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
        );
    }, [filteredPeserta, currentPage]);

    // Count per kategori
    const kategoryCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        Object.keys(kategoriConfig).forEach(key => {
            counts[key] = pesertaList.filter((p) => p.kategori === key).length;
        });
        return counts;
    }, [pesertaList]);

    // Actions
    const handleFilterChange = useCallback((kategori: KategoriKey | null) => {
        setSelectedKategori(kategori);
        setCurrentPage(1);
    }, []);

    const handleSearchChange = useCallback((query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    }, []);

    const handleSortChange = useCallback((sort: SortType) => {
        setSelectedSort(sort);
        setCurrentPage(1);
    }, []);

    const handleGenderChange = useCallback((gender: GenderFilter) => {
        setSelectedGender(gender);
        setCurrentPage(1);
    }, []);

    const handleAgeRangeChange = useCallback((ageRange: AgeRange) => {
        setSelectedAgeRange(ageRange);
        setCurrentPage(1);
    }, []);

    const handleNavigateToDetail = useCallback((id: string | number) => {
        navigate(`/dashboard/participants/${id}`);
    }, [navigate]);

    const handleAddPeserta = useCallback(() => {
        navigate('/dashboard/participants/register');
    }, [navigate]);

    const handlePrevPage = useCallback(() => {
        setCurrentPage(p => Math.max(1, p - 1));
    }, []);

    const handleNextPage = useCallback(() => {
        setCurrentPage(p => Math.min(totalPages, p + 1));
    }, [totalPages]);

    const handleGoToPage = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    const handleDismissSuccess = useCallback(() => {
        setSuccessData(null);
    }, []);

    const refresh = useCallback(async () => {
        return loadPeserta(true);
    }, [loadPeserta]);

    return {
        // Data
        paginatedPeserta,
        filteredPeserta,
        kategoryCounts,
        isLoading,
        error,
        totalDataCount: pesertaList.length,
        successData,

        // State
        searchQuery,
        selectedKategori,
        selectedSort,
        selectedGender,
        selectedAgeRange,
        currentPage,
        totalPages,
        itemsPerPage: ITEMS_PER_PAGE,

        // Actions
        handleSearchChange,
        handleFilterChange,
        handleSortChange,
        handleGenderChange,
        handleAgeRangeChange,
        handleNavigateToDetail,
        handleAddPeserta,
        handlePrevPage,
        handleNextPage,
        handleGoToPage,
        handleDismissSuccess,
        refresh,

        // Helpers
        calculateAge,
        kategoriConfig,
        sortOptions,
    };
}
