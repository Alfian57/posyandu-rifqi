/**
 * PesertaKategoriModal - Filter by Category Modal
 * Single select modal for filtering participants by category
 */

import { X, Check, Filter as FilterIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { KategoriKey } from '@/domain/entities/Peserta';
import { kategoriConfig } from '@/presentation/constants/kategoriConfig';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    selectedKategori: KategoriKey | null;
    onApply: (kategori: KategoriKey | null) => void;
}

const dotColors: Record<KategoriKey, string> = {
    bumil: 'bg-pink-500',
    balita: 'bg-blue-500',
    remaja: 'bg-amber-500',
    produktif: 'bg-emerald-500',
    lansia: 'bg-purple-500',
};

export function PesertaKategoriModal({
    isOpen,
    onClose,
    selectedKategori,
    onApply,
}: Props) {
    const [tempKategori, setTempKategori] = useState<KategoriKey | null>(selectedKategori);

    useEffect(() => {
        if (isOpen) {
            setTempKategori(selectedKategori);
        }
    }, [isOpen, selectedKategori]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleApply = () => {
        onApply(tempKategori);
        onClose();
    };

    const handleReset = () => {
        setTempKategori(null);
    };

    const hasChanges = tempKategori !== selectedKategori;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[85vh]">
                {/* ===== HEADER ===== */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-linear-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center">
                            <FilterIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Filter Kategori</h3>
                            <p className="text-xs text-gray-500">Pilih satu kategori peserta</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {/* ===== CONTENT ===== */}
                <div className="flex-1 overflow-y-auto px-5 py-4">
                    {/* Semua Kategori Option */}
                    <button
                        onClick={() => setTempKategori(null)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all mb-4 ${
                            tempKategori === null
                                ? 'border-slate-800 bg-slate-50'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                tempKategori === null 
                                    ? 'bg-slate-800 border-slate-800' 
                                    : 'border-gray-300'
                            }`}>
                                {tempKategori === null && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <span className={`text-sm font-semibold ${
                                tempKategori === null ? 'text-slate-800' : 'text-gray-700'
                            }`}>
                                Semua Kategori
                            </span>
                        </div>
                        <span className="text-xs text-gray-400">
                            {Object.keys(kategoriConfig).length} kategori
                        </span>
                    </button>

                    {/* Category Grid - 2 columns */}
                    <div className="grid grid-cols-2 gap-2">
                        {(Object.entries(kategoriConfig) as [KategoriKey, typeof kategoriConfig[KategoriKey]][]).map(([key, config]) => {
                            const isSelected = tempKategori === key;
                            return (
                                <button
                                    key={key}
                                    onClick={() => setTempKategori(key)}
                                    className={`flex items-center gap-2.5 px-3 py-3 rounded-xl border-2 transition-all text-left ${
                                        isSelected
                                            ? 'border-slate-800 bg-slate-50'
                                            : 'border-gray-200 hover:border-gray-300 bg-white'
                                    }`}
                                >
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                        isSelected 
                                            ? 'bg-slate-800 border-slate-800' 
                                            : 'border-gray-300'
                                    }`}>
                                        {isSelected && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <div className={`w-2 h-2 rounded-full shrink-0 ${dotColors[key]}`} />
                                            <span className={`text-sm font-medium truncate ${
                                                isSelected ? 'text-slate-800' : 'text-gray-700'
                                            }`}>
                                                {config.label}
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ===== FOOTER ===== */}
                <div className="px-5 py-4 border-t border-gray-100 bg-white shrink-0">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleReset}
                            className="flex-1 py-3 px-4 bg-white border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                        >
                            Reset
                        </button>
                        <button
                            onClick={handleApply}
                            disabled={!hasChanges}
                            className={`flex-1 py-3 px-4 font-semibold rounded-xl transition-all ${
                                hasChanges
                                    ? 'bg-linear-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white shadow-lg shadow-slate-300'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            Terapkan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
