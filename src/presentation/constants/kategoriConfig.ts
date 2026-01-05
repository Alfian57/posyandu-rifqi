/**
 * Kategori Configuration
 * UI-specific configuration for participant categories
 * Contains icons, colors, and display properties
 */

import { Baby, GraduationCap, User, Users, Heart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { KategoriKey } from '../../domain/entities/Peserta';

export interface KategoriConfig {
    label: string;
    description: string;
    icon: LucideIcon;
    color: string;
    bg: string;
    bgDark: string;
    borderColor: string;
    gradient: string;
    urlSlug: string;
}

export const kategoriConfig: Record<KategoriKey, KategoriConfig> = {
    bumil: {
        label: 'Ibu Hamil',
        description: 'Ibu Hamil & Masa Nifas',
        icon: Heart,
        color: 'text-pink-600',
        bg: 'bg-pink-100',
        bgDark: 'bg-pink-50',
        borderColor: 'border-pink-200',
        gradient: 'from-pink-500 to-rose-500',
        urlSlug: 'pregnant'
    },
    balita: {
        label: 'Balita',
        description: 'Bayi & Anak Usia 0-5 Tahun',
        icon: Baby,
        color: 'text-blue-600',
        bg: 'bg-blue-100',
        bgDark: 'bg-blue-50',
        borderColor: 'border-blue-200',
        gradient: 'from-blue-500 to-cyan-500',
        urlSlug: 'toddler'
    },
    remaja: {
        label: 'Remaja',
        description: 'Anak Sekolah & Remaja',
        icon: GraduationCap,
        color: 'text-amber-600',
        bg: 'bg-amber-100',
        bgDark: 'bg-amber-50',
        borderColor: 'border-amber-200',
        gradient: 'from-amber-500 to-orange-500',
        urlSlug: 'adolescent'
    },
    produktif: {
        label: 'Produktif',
        description: 'Usia Dewasa 15-59 Tahun',
        icon: Users,
        color: 'text-emerald-600',
        bg: 'bg-emerald-100',
        bgDark: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        gradient: 'from-emerald-500 to-teal-500',
        urlSlug: 'productive'
    },
    lansia: {
        label: 'Lansia',
        description: 'Lanjut Usia > 60 Tahun',
        icon: User,
        color: 'text-purple-600',
        bg: 'bg-purple-100',
        bgDark: 'bg-purple-50',
        borderColor: 'border-purple-200',
        gradient: 'from-purple-500 to-violet-500',
        urlSlug: 'elderly'
    },
};
