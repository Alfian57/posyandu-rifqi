/**
 * PesertaFilterModal - Advanced Filter Modal
 * Filter by Gender and Age Range
 */

import { X, Check, SlidersHorizontal } from 'lucide-react';
import { useState, useEffect } from 'react';

export type GenderFilter = 'all' | 'L' | 'P';
export interface AgeRange {
    min: number | null;
    max: number | null;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    selectedGender: GenderFilter;
    selectedAgeRange: AgeRange;
    onApply: (gender: GenderFilter, ageRange: AgeRange) => void;
}

const genderOptions: { value: GenderFilter; label: string }[] = [
    { value: 'all', label: 'Semua' },
    { value: 'L', label: 'Laki-laki' },
    { value: 'P', label: 'Perempuan' },
];

const agePresets: { label: string; min: number; max: number }[] = [
    { label: '0-5', min: 0, max: 5 },
    { label: '6-12', min: 6, max: 12 },
    { label: '13-17', min: 13, max: 17 },
    { label: '18-59', min: 18, max: 59 },
    { label: '60+', min: 60, max: 999 },
];

export function PesertaFilterModal({
    isOpen,
    onClose,
    selectedGender,
    selectedAgeRange,
    onApply,
}: Props) {
    const [tempGender, setTempGender] = useState<GenderFilter>(selectedGender);
    const [tempAgeRange, setTempAgeRange] = useState<AgeRange>(selectedAgeRange);

    useEffect(() => {
        if (isOpen) {
            setTempGender(selectedGender);
            setTempAgeRange(selectedAgeRange);
        }
    }, [isOpen, selectedGender, selectedAgeRange]);

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
        onApply(tempGender, tempAgeRange);
        onClose();
    };

    const handleReset = () => {
        setTempGender('all');
        setTempAgeRange({ min: null, max: null });
    };

    const handleAgePreset = (min: number, max: number) => {
        // Toggle off if same preset clicked
        if (tempAgeRange.min === min && tempAgeRange.max === max) {
            setTempAgeRange({ min: null, max: null });
        } else {
            setTempAgeRange({ min, max });
        }
    };

    const isAgePresetSelected = (min: number, max: number) => {
        return tempAgeRange.min === min && tempAgeRange.max === max;
    };

    const hasChanges = 
        tempGender !== selectedGender || 
        tempAgeRange.min !== selectedAgeRange.min || 
        tempAgeRange.max !== selectedAgeRange.max;

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
                            <SlidersHorizontal className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Filter Lainnya</h3>
                            <p className="text-xs text-gray-500">Jenis kelamin & rentang umur</p>
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
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
                    {/* Gender Section */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Jenis Kelamin</h4>
                        <div className="flex gap-2">
                            {genderOptions.map((option) => {
                                const isSelected = tempGender === option.value;
                                return (
                                    <button
                                        key={option.value}
                                        onClick={() => setTempGender(option.value)}
                                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
                                            isSelected
                                                ? 'border-slate-800 bg-slate-50'
                                                : 'border-gray-200 hover:border-gray-300 bg-white'
                                        }`}
                                    >
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                            isSelected 
                                                ? 'bg-slate-800 border-slate-800' 
                                                : 'border-gray-300'
                                        }`}>
                                            {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                                        </div>
                                        <span className={`text-sm font-medium ${
                                            isSelected ? 'text-slate-800' : 'text-gray-700'
                                        }`}>
                                            {option.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Age Range Section */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Rentang Umur</h4>
                        <div className="grid grid-cols-5 gap-2">
                            {agePresets.map((preset) => {
                                const isSelected = isAgePresetSelected(preset.min, preset.max);
                                return (
                                    <button
                                        key={preset.label}
                                        onClick={() => handleAgePreset(preset.min, preset.max)}
                                        className={`py-2.5 px-3 rounded-xl border-2 text-center transition-all ${
                                            isSelected
                                                ? 'border-slate-800 bg-slate-800 text-white'
                                                : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
                                        }`}
                                    >
                                        <span className="text-sm font-semibold">{preset.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                        <p className="text-xs text-gray-400 mt-2 text-center">
                            {tempAgeRange.min !== null 
                                ? `Menampilkan peserta usia ${tempAgeRange.min} - ${tempAgeRange.max === 999 ? '∞' : tempAgeRange.max} tahun`
                                : 'Klik untuk memilih rentang umur'
                            }
                        </p>
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
