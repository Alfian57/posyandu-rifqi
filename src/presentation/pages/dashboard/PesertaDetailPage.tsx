/**
 * PesertaDetailPage - Detail halaman peserta
 * Menampilkan informasi lengkap peserta dengan aksi edit/hapus
 * 
 * Refactored to Clean Architecture:
 * - Uses usePesertaDetail hook for state & logic
 * - Uses separate components for UI sections
 */

import { useParams, Link } from 'react-router-dom';
import { Home, ChevronRight, User, AlertTriangle, RefreshCw } from 'lucide-react';
import { usePesertaDetail } from '../../hooks/usePesertaDetail';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import {
    PesertaProfileHeader,
    PesertaInfoCards,
    PesertaEditModal,
    PesertaDeleteModal
} from '../../components/peserta';
import { FullPageLoading } from '../../components/common';

export function PesertaDetailPage() {
    const { id } = useParams();
    const {
        peserta,
        config,
        age,
        editForm,
        isLoading,
        isSaving,
        isDeleting,
        error,
        showDeleteConfirm,
        showEditModal,
        openEditModal,
        closeEditModal,
        handleEditChange,
        handleSaveEdit,
        openDeleteConfirm,
        closeDeleteConfirm,
        handleDelete,
        handleBack,
    } = usePesertaDetail(id);

    // Dynamic page title
    useDocumentTitle(peserta?.nama ? `Detail: ${peserta.nama}` : 'Detail Peserta');

    // Saving state - full screen overlay
    if (isSaving) {
        return <FullPageLoading message="Menyimpan perubahan..." />;
    }

    // Deleting state - full screen overlay
    if (isDeleting) {
        return <FullPageLoading message="Menghapus peserta..." />;
    }

    // Loading state - full screen overlay like logout
    if (isLoading) {
        return <FullPageLoading message="Memuat data peserta..." />;
    }

    // Error state - show error message with retry button
    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Gagal Memuat Data</h2>
                <p className="text-gray-500 mb-6">{error}</p>
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Coba Lagi
                    </button>
                    <button
                        onClick={handleBack}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Kembali
                    </button>
                </div>
            </div>
        );
    }

    // Not found state - only show after loading is complete
    if (!peserta || !config) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 text-center">
                <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Peserta Tidak Ditemukan</h2>
                <p className="text-gray-500 mb-6">Data peserta dengan ID {id} tidak ditemukan.</p>
                <button
                    onClick={handleBack}
                    className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                >
                    Kembali ke Daftar
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Header with Breadcrumb */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Detail Peserta</h1>
                    <p className="text-gray-500 text-sm mt-1">Informasi lengkap peserta posyandu</p>
                </div>
                <nav className="flex items-center gap-2 text-sm">
                    <Link to="/dashboard" className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors">
                        <Home className="w-4 h-4" />
                        <span>Dashboard</span>
                    </Link>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <Link to="/dashboard/participants" className="text-gray-500 hover:text-gray-700 transition-colors">
                        Daftar Peserta
                    </Link>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">{peserta.nama}</span>
                </nav>
            </div>

            {/* Profile Header */}
            <PesertaProfileHeader
                peserta={peserta}
                config={config}
                age={age}
                onEdit={openEditModal}
                onDelete={openDeleteConfirm}
            />

            {/* Info Cards */}
            <PesertaInfoCards peserta={peserta} />

            {/* Delete Modal */}
            <PesertaDeleteModal
                isOpen={showDeleteConfirm}
                pesertaName={peserta.nama}
                onClose={closeDeleteConfirm}
                onConfirm={handleDelete}
            />

            {/* Edit Modal */}
            <PesertaEditModal
                isOpen={showEditModal}
                editForm={editForm}
                onClose={closeEditModal}
                onChange={handleEditChange}
                onSave={handleSaveEdit}
            />
        </div>
    );
}
