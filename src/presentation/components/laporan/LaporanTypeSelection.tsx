import { Check } from 'lucide-react';
import type { ReportType } from '@/presentation/hooks/useLaporanData';
import type { ReportConfig } from '@/presentation/hooks/useLaporan';

interface LaporanTypeSelectionProps {
    reports: ReportConfig[];
    selectedReport: ReportType | null;
    onToggle: (id: ReportType) => void;
}

export function LaporanTypeSelection({ reports, selectedReport, onToggle }: LaporanTypeSelectionProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-600">1</span>
                    </div>
                    Pilih Jenis Laporan
                </h2>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reports.map((report) => {
                        const IconComponent = report.icon;
                        const isSelected = selectedReport === report.id;

                        return (
                            <button
                                key={report.id}
                                onClick={() => onToggle(report.id)}
                                className={`relative p-5 rounded-xl border-2 text-left transition-all ${isSelected
                                    ? `${report.borderColor} ${report.bgColor}`
                                    : 'border-gray-100 bg-gray-50'
                                    }`}
                            >
                                {isSelected && (
                                    <div className={`absolute top-4 right-4 w-6 h-6 rounded-full ${report.bgColor} ${report.color} flex items-center justify-center`}>
                                        <Check className="w-4 h-4" />
                                    </div>
                                )}
                                <div className={`w-12 h-12 rounded-xl ${report.bgColor} flex items-center justify-center mb-3`}>
                                    <IconComponent className={`w-6 h-6 ${report.color}`} />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">{report.name}</h3>
                                <p className="text-sm text-gray-500 mb-3">{report.description}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {report.details.map((detail, idx) => (
                                        <span key={idx} className="text-xs px-2 py-0.5 bg-white/80 text-gray-600 rounded-full border border-gray-100">
                                            {detail}
                                        </span>
                                    ))}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
