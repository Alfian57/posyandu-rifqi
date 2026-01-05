/**
 * PesertaDeleteModal Component
 * Delete confirmation modal
 */

import { X, Trash2 } from 'lucide-react';

interface Props {
    isOpen: boolean;
    pesertaName: string;
    onClose: () => void;
    onConfirm: () => void;
}

export function PesertaDeleteModal({ isOpen, pesertaName, onClose, onConfirm }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 text-center">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <X className="w-5 h-5 text-gray-400" />
                </button>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Hapus Peserta?</h3>
                <p className="text-gray-500 mb-6">
                    Anda yakin ingin menghapus data <strong>{pesertaName}</strong>? Tindakan ini tidak dapat dibatalkan.
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 px-4 text-gray-700 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-2.5 px-4 text-white bg-red-600 rounded-xl font-medium hover:bg-red-700 transition-colors"
                    >
                        Ya, Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}
