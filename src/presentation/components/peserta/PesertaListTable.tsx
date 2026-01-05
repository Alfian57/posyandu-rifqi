/**
 * PesertaListTable Component
 * Table-style list of peserta with grid columns
 */

import { Users, Filter, ChevronRight, Loader2 } from 'lucide-react';
import type { Peserta, KategoriKey } from '../../../domain/entities/Peserta';
import type { KategoriConfig } from '../../constants/kategoriConfig';

interface Props {
    isLoading?: boolean;
    pesertaList: Peserta[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    kategoriConfig: Record<KategoriKey, KategoriConfig>;
    calculateAge: (birthDate: string) => number;
    onNavigate: (id: string) => void;
}

export function PesertaListTable({
    isLoading,
    pesertaList,
    totalCount,
    currentPage,
    totalPages,
    itemsPerPage,
    kategoriConfig,
    calculateAge,
    onNavigate
}: Props) {
    return (
        <div className="bg-white overflow-hidden">
            {/* List Header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold text-gray-900">Daftar Peserta</span>
                    <span className="text-sm text-gray-500">({totalCount} peserta)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Filter className="w-4 h-4" />
                    <span>Halaman {currentPage} dari {totalPages || 1}</span>
                </div>
            </div>

            {/* List Content - Fixed min height */}
            <div style={{ minHeight: `${itemsPerPage * 88}px` }}>
                {isLoading ? (
                    <div className="py-20 text-center">
                        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-4" />
                        <p className="text-gray-500">Memuat data peserta...</p>
                    </div>
                ) : pesertaList.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="w-10 h-10 text-gray-300" />
                        </div>
                        <p className="text-gray-600 font-semibold">Tidak ada peserta ditemukan</p>
                        <p className="text-sm text-gray-400 mt-1">Coba ubah kata kunci pencarian atau filter</p>
                    </div>
                ) : (
                    pesertaList.map((peserta, index) => {
                        const config = kategoriConfig[peserta.kategori];
                        const Icon = config.icon;
                        const age = calculateAge(peserta.tanggalLahir);
                        const isEven = index % 2 === 0;

                        return (
                            <button
                                key={peserta.id}
                                onClick={() => onNavigate(peserta.id)}
                                className={`w-full px-5 py-4 transition-all duration-200 text-left border-b border-gray-100 last:border-b-0 group
                                    ${isEven ? 'bg-white' : 'bg-white'}
                                    hover:bg-gray-50
                                `}
                            >
                                {/* Row Content - Distributed */}
                                <div className="flex items-center gap-4">
                                    {/* Avatar */}
                                    <div className={`w-12 h-12 ${config.bgDark} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                                        <Icon className={`w-6 h-6 ${config.color}`} />
                                    </div>

                                    {/* Content Grid - Distributed across width */}
                                    <div className="flex-1 min-w-0 grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-1 items-center">
                                        {/* Name */}
                                        <div className="col-span-1">
                                            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Nama</p>
                                            <p className="font-semibold text-gray-900 truncate group-hover:text-blue-700 transition-colors">
                                                {peserta.nama}
                                            </p>
                                        </div>

                                        {/* Age */}
                                        <div className="col-span-1">
                                            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Umur</p>
                                            <p className="text-sm text-gray-700">{age} tahun</p>
                                        </div>

                                        {/* NIK */}
                                        <div className="col-span-1">
                                            <p className="text-[10px] text-gray-400 uppercase tracking-wide">NIK</p>
                                            <p className="text-sm text-gray-700">{peserta.nik}</p>
                                        </div>

                                        {/* Category */}
                                        <div className="col-span-1">
                                            <p className="text-[10px] text-gray-400 uppercase tracking-wide hidden md:block">Kategori</p>
                                            <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full ${config.bg} ${config.color} font-medium`}>
                                                <Icon className="w-3 h-3" />
                                                {config.label}
                                            </span>
                                        </div>

                                        {/* Last Visit */}
                                        <div className="col-span-1">
                                            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Kunjungan</p>
                                            <p className="text-sm text-gray-700">
                                                {new Date(peserta.kunjunganTerakhir).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <div className="shrink-0">
                                        <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-all" />
                                        </div>
                                    </div>
                                </div>
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
}
