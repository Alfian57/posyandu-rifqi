import { Download, Loader2 } from 'lucide-react';
import type { ReportType } from '@/presentation/hooks/useLaporanData';

interface LaporanPeriodSelectionProps {
    selectedReport: ReportType | null;
    selectedMonth: number;
    onMonthChange: (month: number) => void;
    currentYear: number;
    isLoading: boolean;
    onGenerate: () => void;
    months: { value: number; label: string }[];
}

export function LaporanPeriodSelection({
    selectedReport,
    selectedMonth,
    onMonthChange,
    currentYear,
    isLoading,
    onGenerate,
    months
}: LaporanPeriodSelectionProps) {
    return (
        <div className={`bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4 transition-opacity ${!selectedReport ? 'opacity-50' : ''}`}>
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100">
                <h2 className={`font-semibold flex items-center gap-2 ${selectedReport ? 'text-gray-900' : 'text-gray-400'}`}>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${selectedReport ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400'}`}>
                        2
                    </div>
                    Pilih Periode & Unduh
                </h2>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-gray-500 uppercase tracking-wide mb-2 font-bold">Bulan</label>
                        <select
                            value={selectedMonth}
                            onChange={(e) => onMonthChange(Number(e.target.value))}
                            disabled={!selectedReport}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
                        >
                            {months.map((month) => (
                                <option key={month.value} value={month.value}>{month.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 uppercase tracking-wide mb-2 font-bold">Tahun</label>
                        <div className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-700">
                            {currentYear}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                <button
                    onClick={onGenerate}
                    disabled={!selectedReport || isLoading}
                    className={`px-6 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 ${selectedReport && !isLoading
                        ? 'bg-slate-800 text-white'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    {isLoading ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Membuat Laporan...</>
                    ) : (
                        <><Download className="w-5 h-5" /> Unduh Laporan Excel</>
                    )}
                </button>
            </div>
        </div>
    );
}
