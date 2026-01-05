/**
 * SortModal Component
 * Modal for sorting options
 */

import { X, Check, ArrowUpDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { SortType } from './PemeriksaanToolbar';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    selectedSort: SortType;
    onApply: (sort: SortType) => void;
}

const sortOptions: { value: SortType; label: string; description: string }[] = [
    { value: 'nama-asc', label: 'Nama A-Z', description: 'Urutkan berdasarkan nama A ke Z' },
    { value: 'nama-desc', label: 'Nama Z-A', description: 'Urutkan berdasarkan nama Z ke A' },
    { value: 'kunjungan-desc', label: 'Pemeriksaan Terbaru', description: 'Pemeriksaan paling baru dahulu' },
    { value: 'kunjungan-asc', label: 'Pemeriksaan Terlama', description: 'Pemeriksaan paling lama dahulu' },
];

export function SortModal({
    isOpen,
    onClose,
    selectedSort,
    onApply,
}: Props) {
    const [tempSort, setTempSort] = useState<SortType>(selectedSort);

    // Sync with props when modal opens
    useEffect(() => {
        if (isOpen) {
            setTempSort(selectedSort);
        }
    }, [isOpen, selectedSort]);

    // Close on ESC and handle body overflow
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
        onApply(tempSort);
        onClose();
    };

    const hasChanges = tempSort !== selectedSort;

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
                            <ArrowUpDown className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Urutkan Data</h3>
                            <p className="text-xs text-gray-500">Pilih urutan tampilan data</p>
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
                    {/* Sort Options - 2 columns grid */}
                    <div className="grid grid-cols-2 gap-2">
                        {sortOptions.map((option) => {
                            const isSelected = tempSort === option.value;
                            return (
                                <button
                                    key={option.value}
                                    onClick={() => setTempSort(option.value)}
                                    className={`flex items-start gap-2.5 px-3 py-3 rounded-xl border-2 transition-all text-left ${
                                        isSelected
                                            ? 'border-purple-500 bg-purple-50'
                                            : 'border-gray-200 hover:border-gray-300 bg-white'
                                    }`}
                                >
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                                        isSelected 
                                            ? 'bg-purple-500 border-purple-500' 
                                            : 'border-gray-300'
                                    }`}>
                                        {isSelected && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                    <div className="min-w-0">
                                        <p className={`text-sm font-semibold ${
                                            isSelected ? 'text-purple-700' : 'text-gray-700'
                                        }`}>
                                            {option.label}
                                        </p>
                                        <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">
                                            {option.description}
                                        </p>
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
                            onClick={() => setTempSort('nama-asc')}
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
