/**
 * DangerZoneSection - Hapus akun
 */

import { Trash2, AlertTriangle } from 'lucide-react';

interface DangerZoneSectionProps {
    deleteConfirmText: string;
    isDeleting: boolean;
    handleDeleteConfirmChange: (value: string) => void;
    handleDeleteAccount: () => void;
}

export function DangerZoneSection({
    deleteConfirmText,
    isDeleting,
    handleDeleteConfirmChange,
    handleDeleteAccount
}: DangerZoneSectionProps) {
    const isDeleteConfirmed = deleteConfirmText.toUpperCase() === 'HAPUS AKUN';

    return (
        <div className="bg-white rounded-2xl border border-red-200 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-red-200">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
                        <Trash2 className="w-4 h-4 text-red-600" />
                    </div>
                    Hapus Akun
                </h2>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Warning Box */}
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                                <AlertTriangle className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-red-800 mb-1">Peringatan!</h4>
                                <p className="text-sm text-red-700">Menghapus akun akan menghapus semua data termasuk:</p>
                                <ul className="text-sm text-red-700 mt-2 space-y-1 list-disc list-inside">
                                    <li>Profil dan informasi akun</li>
                                    <li>Riwayat aktivitas</li>
                                    <li>Akses ke sistem Posyandu</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Confirmation */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ketik <span className="font-bold text-red-600">HAPUS AKUN</span> untuk konfirmasi
                            </label>
                            <input 
                                type="text" 
                                value={deleteConfirmText} 
                                onChange={(e) => handleDeleteConfirmChange(e.target.value)} 
                                placeholder="Ketik di sini..." 
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none transition-all" 
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-red-200 flex justify-end">
                <button 
                    onClick={handleDeleteAccount} 
                    disabled={isDeleting || !isDeleteConfirmed} 
                    className="px-6 py-2.5 bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed text-white rounded-xl font-medium flex items-center gap-2"
                >
                    <Trash2 className="w-4 h-4" />
                    {isDeleting ? 'Menghapus...' : 'Hapus Akun Saya'}
                </button>
            </div>
        </div>
    );
}
