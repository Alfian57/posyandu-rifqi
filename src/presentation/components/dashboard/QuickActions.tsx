import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ClipboardPlus, FileText, ArrowRight, Zap, Bug } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ComingSoonModal } from '../common/ComingSoonModal';

interface QuickAction {
    id: string;
    label: string;
    description: string;
    icon: LucideIcon;
    bgGradient: string;
    route?: string;
    comingSoon?: boolean;
}

/**
 * QuickActions - 2x2 Grid action cards for Posyandu ILP
 */
export function QuickActions() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [modalFeature, setModalFeature] = useState('');

    const actions: QuickAction[] = [
        {
            id: 'pendaftaran',
            label: 'Pendaftaran',
            description: 'Daftarkan & kelola data peserta',
            icon: Users,
            bgGradient: 'from-blue-500 to-indigo-600',
            route: '/dashboard/participants',
            comingSoon: false,
        },
        {
            id: 'pemeriksaan',
            label: 'Pemeriksaan',
            description: 'Catat data kesehatan peserta',
            icon: ClipboardPlus,
            bgGradient: 'from-emerald-500 to-teal-600',
            route: '/dashboard/examinations',
            comingSoon: false,
        },
        {
            id: 'laporan',
            label: 'Laporan',
            description: 'Lihat dan unduh laporan kegiatan',
            icon: FileText,
            bgGradient: 'from-rose-500 to-pink-600',
            route: '/dashboard/reports',
            comingSoon: false,
        },
        {
            id: 'pengaduan',
            label: 'Pengaduan',
            description: 'Laporkan bug atau masalah sistem',
            icon: Bug,
            bgGradient: 'from-amber-500 to-orange-600',
            route: '/dashboard/pengaduan',
            comingSoon: true,
        },
    ];

    const handleClick = (action: QuickAction) => {
        if (action.comingSoon) {
            setModalFeature(action.label);
            setShowModal(true);
        } else if (action.route) {
            navigate(action.route);
        }
    };

    return (
        <>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-amber-600" strokeWidth={2} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Aksi Cepat</h3>
                    </div>
                    <span className="text-xs text-gray-500">Pilih untuk memulai</span>
                </div>

                {/* Actions - 2x2 Grid Layout */}
                <div className="grid grid-cols-2 gap-4">
                    {actions.map((action) => {
                        const IconComponent = action.icon;
                        return (
                            <button
                                key={action.id}
                                onClick={() => handleClick(action)}
                                className={`group bg-gray-50 hover:bg-white rounded-xl p-4 border border-gray-100 hover:border-gray-200 transition-all duration-300 text-left ${action.comingSoon ? 'relative' : ''
                                    }`}
                            >
                                {/* Coming Soon Badge */}
                                {action.comingSoon && (
                                    <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full">
                                        SOON
                                    </div>
                                )}

                                {/* Icon */}
                                <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${action.bgGradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 ${action.comingSoon ? 'opacity-70' : ''
                                    }`}>
                                    <IconComponent className="w-5 h-5 text-white" strokeWidth={2} />
                                </div>

                                {/* Label */}
                                <p className={`font-semibold text-sm mb-1 ${action.comingSoon ? 'text-gray-600' : 'text-gray-900'
                                    }`}>
                                    {action.label}
                                </p>

                                {/* Description */}
                                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                    {action.description}
                                </p>

                                {/* Arrow */}
                                <div className="mt-2 flex items-center text-xs font-medium text-gray-400 group-hover:text-gray-600 transition-colors">
                                    <span>{action.comingSoon ? 'Segera' : 'Mulai'}</span>
                                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <ComingSoonModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                featureName={modalFeature}
            />
        </>
    );
}
