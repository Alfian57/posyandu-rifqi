/**
 * ComingSoonModal - Modal for features that are not yet available
 */

import { X, Clock, Wrench } from 'lucide-react';
import { useEffect } from 'react';

interface ComingSoonModalProps {
    isOpen: boolean;
    onClose: () => void;
    featureName: string;
}

export function ComingSoonModal({ isOpen, onClose, featureName }: ComingSoonModalProps) {
    // Close on escape key
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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 animate-in fade-in zoom-in duration-200">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <X className="w-5 h-5 text-gray-400" />
                </button>

                {/* Content */}
                <div className="text-center">
                    {/* Icon */}
                    <div className="w-20 h-20 mx-auto mb-4 bg-linear-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center">
                        <Wrench className="w-10 h-10 text-amber-600" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Segera Hadir!
                    </h3>

                    {/* Feature name */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full mb-4">
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span className="text-sm font-medium text-amber-700">{featureName}</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-6">
                        Fitur ini sedang dalam pengembangan dan akan segera tersedia.
                        Terima kasih atas kesabaran Anda!
                    </p>

                    {/* Action */}
                    <button
                        onClick={onClose}
                        className="w-full py-3 px-4 bg-linear-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white font-semibold rounded-xl transition-all"
                    >
                        Mengerti
                    </button>
                </div>
            </div>
        </div>
    );
}
