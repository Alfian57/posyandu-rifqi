import { FileText, Loader2, AlertTriangle, RefreshCw } from 'lucide-react';

interface LaporanPreviewProps {
    reportLabel: string;
    isLoading: boolean;
    error: string | null;
    data: any[];
    onReset: () => void;
}

export function LaporanPreview({
    reportLabel,
    isLoading,
    error,
    data,
    onReset
}: LaporanPreviewProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-600">3</span>
                    </div>
                    Preview {reportLabel}
                </h2>
                <span className="text-xs text-gray-400">Menampilkan 10 data pertama</span>
            </div>

            <div className="p-6">
                {isLoading ? (
                    <div className="py-12 text-center">
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">Memuat preview...</p>
                        <p className="text-gray-400 text-xs mt-1">Maks 10 detik</p>
                    </div>
                ) : error ? (
                    <div className="py-12 text-center">
                        <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                        <p className="text-gray-700 font-medium mb-2">Gagal Memuat Preview</p>
                        <p className="text-gray-500 text-sm mb-4">{error}</p>
                        <button
                            onClick={onReset}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Pilih Ulang
                        </button>
                    </div>
                ) : data.length === 0 ? (
                    <div className="py-12 text-center">
                        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500">Belum ada data untuk laporan ini</p>
                        <p className="text-gray-400 text-sm mt-2">Silakan input data peserta atau kunjungan terlebih dahulu</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-xl border border-gray-100">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50">
                                    {Object.keys(data[0]).map((key) => (
                                        <th key={key} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                                            {key}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, index) => (
                                    <tr key={index} className="border-b border-gray-50 hover:bg-gray-50">
                                        {Object.values(row).map((value: any, cellIndex) => (
                                            <td key={cellIndex} className="py-3 px-4 text-sm text-gray-700">
                                                {value || '-'}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
