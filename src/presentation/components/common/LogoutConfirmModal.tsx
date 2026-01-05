/**
 * LogoutConfirmModal - Modal for confirming logout action
 */

import { X, LogOut } from 'lucide-react';
import { useEffect } from 'react';

interface LogoutConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading?: boolean;
}

export function LogoutConfirmModal({ isOpen, onClose, onConfirm, isLoading = false }: LogoutConfirmModalProps) {
    // Close on escape key (only if not loading)
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && !isLoading) onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, isLoading]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={isLoading ? undefined : onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 animate-in fade-in zoom-in duration-200">
                {/* Close button */}
                {!isLoading && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                )}

                {/* Content */}
                <div className="text-center">
                    {/* Icon */}
                    <div className="w-20 h-20 mx-auto mb-4 bg-linear-to-br from-red-100 to-rose-100 rounded-2xl flex items-center justify-center">
                        <LogOut className="w-10 h-10 text-red-600" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Keluar dari Akun?
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-6">
                        Anda akan keluar dari sesi ini dan perlu login kembali untuk mengakses dashboard.
                    </p>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all disabled:opacity-50"
                        >
                            Batal
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className="flex-1 py-3 px-4 bg-linear-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
                        >
                            {isLoading ? 'Keluar...' : 'Ya, Keluar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
