import { Home, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePesertaList } from '../../hooks/usePesertaList';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { 
    RegistrationSuccessBanner, 
    PesertaListToolbar, 
    PesertaListResults 
} from '../../components/peserta';

export function PesertaPage() {
    useDocumentTitle('Daftar Peserta');
    const {
        paginatedPeserta,
        filteredPeserta,
        isLoading,
        searchQuery,
        selectedKategori,
        selectedSort,
        selectedGender,
        selectedAgeRange,
        currentPage,
        totalPages,
        successData,
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
        calculateAge,
        kategoriConfig,
    } = usePesertaList();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Success Banner */}
            {successData && (
                <RegistrationSuccessBanner
                    pesertaNama={successData.nama}
                    pesertaNik={successData.nik}
                    onDismiss={handleDismissSuccess}
                />
            )}

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Daftar Peserta</h1>
                    <p className="text-gray-500 text-sm mt-1">Kelola data peserta posyandu</p>
                </div>
                <nav className="hidden sm:flex items-center gap-2 text-sm">
                    <Link to="/dashboard" className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors">
                        <Home className="w-4 h-4" />
                        <span>Dashboard</span>
                    </Link>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">Daftar Peserta</span>
                </nav>
            </div>

            {/* Toolbar Card - Search, Filter, Sort */}
            <PesertaListToolbar
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                selectedKategori={selectedKategori}
                onFilterChange={handleFilterChange}
                selectedSort={selectedSort}
                onSortChange={handleSortChange}
                selectedGender={selectedGender}
                onGenderChange={handleGenderChange}
                selectedAgeRange={selectedAgeRange}
                onAgeRangeChange={handleAgeRangeChange}
                onAddPeserta={handleAddPeserta}
            />

            {/* Results Card - List Peserta */}
            <PesertaListResults
                isLoading={isLoading}
                paginatedPeserta={paginatedPeserta}
                filteredPeserta={filteredPeserta}
                selectedKategori={selectedKategori}
                kategoriConfig={kategoriConfig}
                currentPage={currentPage}
                totalPages={totalPages}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
                onGoToPage={handleGoToPage}
                onNavigateToDetail={handleNavigateToDetail}
                calculateAge={calculateAge}
            />
        </div>
    );
}




