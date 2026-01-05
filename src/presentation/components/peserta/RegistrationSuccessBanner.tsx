/**
 * RegistrationSuccessBanner Component
 * Shows after successful registration with link to Posyandu page
 */

import { CheckCircle, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
    pesertaNama: string;
    pesertaNik: string;
    onDismiss: () => void;
}

export function RegistrationSuccessBanner({ pesertaNama, pesertaNik, onDismiss }: Props) {
    const navigate = useNavigate();

    const handleGoToExaminations = () => {
        // We use the ID-only fallback route, router will handle it
        navigate(`/dashboard/examinations/${pesertaNik}`); 
        onDismiss();
    };

    return (
        <div className="mb-6 bg-linear-to-r from-emerald-500 to-teal-500 rounded-2xl p-4 shadow-lg shadow-emerald-500/20 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-white">Peserta Berhasil Didaftarkan!</h3>
                        <p className="text-sm text-white/80">
                            {pesertaNama} sudah terdaftar. Lanjutkan ke Pemeriksaan untuk catat data kesehatan.
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleGoToExaminations}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-emerald-600 rounded-xl font-medium hover:bg-white/90 transition-colors"
                    >
                        Lanjut ke Pemeriksaan
                        <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                        onClick={onDismiss}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}
