import { User, Calendar, Stethoscope, ClipboardCheck, AlertTriangle, CheckCircle } from 'lucide-react';
import type { SelectedPeserta } from '@/presentation/hooks/usePemeriksaanForm';
import type { PemeriksaanFormData } from '@/presentation/hooks/usePemeriksaanForm';

interface Step4KonfirmasiProps {
    peserta: SelectedPeserta;
    formData: PemeriksaanFormData;
}

export function Step4Konfirmasi({ peserta, formData }: Step4KonfirmasiProps) {
    const renderExaminationSummary = () => {
        switch (peserta.kategori) {
            case 'bumil':
                return (
                    <>
                        <div className="flex justify-between text-sm py-1 border-b border-gray-50">
                            <span className="text-gray-500">Umur Kehamilan</span>
                            <span className="font-semibold text-gray-900">{formData.umur_kehamilan} minggu</span>
                        </div>
                        <div className="flex justify-between text-sm py-1 border-b border-gray-50">
                            <span className="text-gray-500">Tekanan Darah</span>
                            <span className="font-semibold text-gray-900">{formData.tekanan_darah || '-'}</span>
                        </div>
                        <div className="flex justify-between text-sm py-1">
                            <span className="text-gray-500">LILA</span>
                            <span className="font-semibold text-gray-900">{formData.lila ? `${formData.lila} cm` : '-'}</span>
                        </div>
                    </>
                );
            case 'balita':
                return (
                    <>
                        <div className="flex justify-between text-sm py-1 border-b border-gray-50">
                            <span className="text-gray-500">Umur</span>
                            <span className="font-semibold text-gray-900">{formData.umur_bulan} bulan</span>
                        </div>
                        <div className="flex justify-between text-sm py-1 border-b border-gray-50">
                            <span className="text-gray-500">P/T Badan</span>
                            <span className="font-semibold text-gray-900">{formData.panjang_badan || '-'} cm</span>
                        </div>
                        <div className="flex justify-between text-sm py-1">
                            <span className="text-gray-500">Kesimpulan</span>
                            <span className="font-semibold text-gray-900">{formData.kesimpulan_bb || '-'}</span>
                        </div>
                    </>
                );
            case 'remaja':
            case 'produktif':
            case 'lansia':
                return (
                    <>
                        <div className="flex justify-between text-sm py-1 border-b border-gray-50">
                            <span className="text-gray-500">Tinggi Badan</span>
                            <span className="font-semibold text-gray-900">{formData.tinggi_badan || '-'} cm</span>
                        </div>
                        <div className="flex justify-between text-sm py-1 border-b border-gray-50">
                            <span className="text-gray-500">IMT</span>
                            <span className="font-semibold text-gray-900">{formData.imt || '-'}</span>
                        </div>
                        <div className="flex justify-between text-sm py-1">
                            <span className="text-gray-500">Tekanan Darah</span>
                            <span className="font-semibold text-gray-900">{formData.tekanan_darah || '-'}</span>
                        </div>
                    </>
                );
            default: return null;
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                    <ClipboardCheck className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-blue-900 font-bold">Siap untuk menyimpan?</h3>
                    <p className="text-blue-800 text-sm mt-0.5">Harap periksa kembali data yang telah dimasukkan sebelum menyimpan data kunjungan ke sistem.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50/50 rounded-2xl border border-gray-100 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                            <User className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Identitas Peserta</h4>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-medium tracking-tight">Nama Lengkap</p>
                            <p className="text-sm font-semibold text-gray-900">{peserta.nama}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-medium tracking-tight">NIK</p>
                                <p className="text-sm font-medium text-gray-700">{peserta.nik}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-medium tracking-tight">Kategori</p>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-700 uppercase">
                                    {peserta.kategori}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50/50 rounded-2xl border border-gray-100 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                            <Calendar className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Rincian Kunjungan</h4>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center py-1 border-b border-gray-100">
                            <span className="text-xs text-gray-500 font-medium uppercase">Tanggal</span>
                            <span className="text-sm font-medium text-gray-900">{formData.tanggal_kunjungan}</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-b border-gray-100">
                            <span className="text-xs text-gray-500 font-medium uppercase">Lokasi</span>
                            <span className="text-sm font-medium text-gray-900">
                                {formData.lokasi === 'posyandu' ? 'Posyandu' : 
                                 formData.lokasi === 'kunjungan_rumah' ? 'Kunjungan Rumah' : '-'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-xs text-gray-500 font-medium uppercase">Rujukan</span>
                            {formData.rujuk === null ? (
                                <span className="text-sm font-medium text-gray-400">-</span>
                            ) : formData.rujuk ? (
                                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-600">
                                    <AlertTriangle className="w-4 h-4" />
                                    Perlu Rujukan
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                                    <CheckCircle className="w-4 h-4" />
                                    Tidak Perlu
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-gray-600" />
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Ringkasan Hasil Pemeriksaan</h4>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg">
                        <span className="text-xs text-blue-600 font-medium">Berat Badan:</span>
                        <span className="text-sm font-black text-blue-700">{formData.berat_badan ? `${formData.berat_badan} kg` : '-'}</span>
                    </div>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column - Parameter Utama */}
                        <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-4">Parameter Utama</p>
                            <div className="space-y-1">
                                {renderExaminationSummary()}
                            </div>
                        </div>

                        {/* Right Column - Skrining TBC */}
                        <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-4">Skrining TBC</p>
                            {formData.skrining_tbc.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {formData.skrining_tbc.map((tag: string) => (
                                        <span 
                                            key={tag} 
                                            className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
                                                tag === 'Tidak ada' 
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                            }`}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-gray-400">
                                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                                    <p className="text-sm">Tidak ada gejala terdeteksi</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
