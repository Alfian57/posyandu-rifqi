import { Users } from 'lucide-react';
import { BeatLoader } from 'react-spinners';
import { PesertaListItem } from './PesertaListItem';
import { Pagination } from '../common/Pagination';
import type { PesertaDisplay } from '@/presentation/hooks/usePesertaList';

interface PesertaListResultsProps {
    isLoading: boolean;
    paginatedPeserta: PesertaDisplay[];
    filteredPeserta: PesertaDisplay[];
    selectedKategori: string | null;
    kategoriConfig: any;
    currentPage: number;
    totalPages: number;
    onPrevPage: () => void;
    onNextPage: () => void;
    onGoToPage: (page: number) => void;
    onNavigateToDetail: (id: string | number) => void;
    calculateAge: (birthDate: string) => number;
}

export function PesertaListResults({
    isLoading,
    paginatedPeserta,
    filteredPeserta,
    selectedKategori,
    kategoriConfig,
    currentPage,
    totalPages,
    onPrevPage,
    onNextPage,
    onGoToPage,
    onNavigateToDetail,
    calculateAge
}: PesertaListResultsProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* Results Summary Header */}
            {!isLoading && filteredPeserta.length > 0 && (
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-gray-400" />
                        <span className="font-semibold text-gray-900">Daftar Peserta</span>
                    </div>
                    <p className="text-sm text-gray-500">
                        Menampilkan{' '}
                        <span className="font-semibold text-blue-600">{paginatedPeserta.length}</span>
                        {' '}dari{' '}
                        <span className="font-semibold text-gray-900">{filteredPeserta.length}</span>
                        {' '}peserta
                        {selectedKategori && ` (${kategoriConfig[selectedKategori].label})`}
                    </p>
                </div>
            )}

            {/* Results List */}
            <div className="p-6">
                {isLoading ? (
                    <div className="py-16 text-center">
                        <div className="mb-4">
                            <BeatLoader color="#3B82F6" size={12} margin={4} />
                        </div>
                        <p className="text-gray-500">Memuat data peserta...</p>
                    </div>
                ) : paginatedPeserta.length === 0 ? (
                    <div className="py-16 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="font-semibold text-gray-900">Belum ada peserta terdaftar</p>
                        <p className="text-sm text-gray-500 mt-1">Silakan daftarkan peserta baru terlebih dahulu</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {paginatedPeserta.map((peserta) => (
                            <PesertaListItem
                                key={peserta.id}
                                peserta={peserta}
                                config={kategoriConfig[peserta.kategori]}
                                age={calculateAge(peserta.tanggal_lahir)}
                                onClick={() => onNavigateToDetail(peserta.id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrevPage={onPrevPage}
                    onNextPage={onNextPage}
                    onGoToPage={onGoToPage}
                />
            )}
        </div>
    );
}
