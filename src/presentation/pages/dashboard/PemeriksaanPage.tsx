/**
 * PemeriksaanPage - Posyandu (Health Data Input)
 * 
 * Route: /dashboard/examinations
 */

import { Home, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePemeriksaan } from '../../hooks/usePemeriksaan';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { PemeriksaanToolbar, PemeriksaanSearchResults, RecentPemeriksaan } from '../../components/pemeriksaan';
import { Pagination } from '../../components/common/Pagination';

export function PemeriksaanPage() {
    useDocumentTitle('Pemeriksaan');
    const {
        searchQuery,
        selectedFilters,
        selectedSort,
        currentPage,
        totalPages,
        totalResults,
        searchResults,
        handleSearchChange,
        handleFilterChange,
        handleSortChange,
        handleSelectPeserta,
        handlePrevPage,
        handleNextPage,
        handleGoToPage,
        kategoriConfig,
        isLoading,
    } = usePemeriksaan();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Pemeriksaan</h1>
                    <p className="text-gray-500 text-sm mt-1">Cari peserta dan catat data kesehatan</p>
                </div>
                <nav className="hidden sm:flex items-center gap-2 text-sm">
                    <Link to="/dashboard" className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors">
                        <Home className="w-4 h-4" />
                        <span>Dashboard</span>
                    </Link>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">Pemeriksaan</span>
                </nav>
            </div>

            {/* Main Card */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {/* Toolbar Section */}
                <div className="p-6 border-b border-gray-100">
                    <PemeriksaanToolbar
                        searchQuery={searchQuery}
                        selectedFilters={selectedFilters}
                        selectedSort={selectedSort}
                        kategoriConfig={kategoriConfig}
                        onSearchChange={handleSearchChange}
                        onFilterChange={handleFilterChange}
                        onSortChange={handleSortChange}
                    />
                </div>

                {/* Results Summary - Only show when there's data */}
                {totalResults > 0 && (
                    <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
                        <p className="text-sm text-gray-600">
                            Menampilkan{' '}
                            <span className="font-semibold text-blue-600">{searchResults.length}</span>
                            {' '}dari{' '}
                            <span className="font-semibold text-gray-900">{totalResults}</span>
                            {' '}peserta
                            {selectedFilters.length > 0 && ` (${selectedFilters.length} kategori)`}
                            {searchQuery.length >= 1 && ` untuk "${searchQuery}"`}
                        </p>
                    </div>
                )}

                {/* Results List */}
                <div className="p-6 pt-0 mt-4">
                    <PemeriksaanSearchResults
                        isLoading={isLoading}
                        results={searchResults}
                        searchQuery={searchQuery}
                        selectedFilters={selectedFilters}
                        kategoriConfig={kategoriConfig}
                        onSelectPeserta={handleSelectPeserta}
                    />
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrevPage={handlePrevPage}
                    onNextPage={handleNextPage}
                    onGoToPage={handleGoToPage}
                />
            </div>

            {/* Recent Pemeriksaan - Show when no search is active */}
            {searchQuery.length === 0 && selectedFilters.length === 0 && (
                <RecentPemeriksaan />
            )}
        </div>
    );
}


