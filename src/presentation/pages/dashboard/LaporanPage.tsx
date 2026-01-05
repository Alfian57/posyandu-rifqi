import { Home, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLaporan } from '../../hooks/useLaporan';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { 
    LaporanTypeSelection, 
    LaporanPeriodSelection, 
    LaporanPreview 
} from '../../components/laporan';

export function LaporanPage() {
    useDocumentTitle('Laporan');
    const {
        selectedReport,
        selectedMonth,
        setSelectedMonth,
        previewData,
        isLoadingPreview,
        previewError,
        isLoading,
        currentYear,
        handleReportToggle,
        handleGenerate,
        getReportLabel,
        reports,
        months
    } = useLaporan();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Unduh Laporan</h1>
                    <p className="text-gray-500 text-sm mt-1">Pilih jenis laporan dan periode untuk mengunduh file Excel</p>
                </div>
                <nav className="hidden md:flex items-center gap-2 text-sm">
                    <Link to="/dashboard" className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors">
                        <Home className="w-4 h-4" />
                        <span>Dashboard</span>
                    </Link>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">Laporan</span>
                </nav>
            </div>

            {/* Step 1: Report Type Selection */}
            <LaporanTypeSelection
                reports={reports}
                selectedReport={selectedReport}
                onToggle={handleReportToggle}
            />

            {/* Step 2: Period Selection & Download */}
            <LaporanPeriodSelection
                selectedReport={selectedReport}
                selectedMonth={selectedMonth}
                onMonthChange={setSelectedMonth}
                currentYear={currentYear}
                isLoading={isLoading}
                onGenerate={handleGenerate}
                months={months}
            />

            {/* Step 3: Preview */}
            {selectedReport && (
                <LaporanPreview
                    reportLabel={getReportLabel()}
                    isLoading={isLoadingPreview}
                    error={previewError}
                    data={previewData}
                    onReset={() => handleReportToggle(selectedReport)}
                />
            )}
        </div>
    );
}
