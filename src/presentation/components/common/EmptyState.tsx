/**
 * EmptyState Component
 * Reusable empty state display for lists and search results
 */

import type { LucideIcon } from 'lucide-react';
import { FileText, Users, UserX, Search } from 'lucide-react';

type EmptyStateType = 'no-data' | 'not-found' | 'search' | 'custom';

interface Props {
    type?: EmptyStateType;
    icon?: LucideIcon;
    title: string;
    description?: string;
}

const defaultIcons: Record<EmptyStateType, LucideIcon> = {
    'no-data': Users,
    'not-found': UserX,
    'search': Search,
    'custom': FileText,
};

export function EmptyState({ type = 'custom', icon, title, description }: Props) {
    const Icon = icon || defaultIcons[type];

    return (
        <div className="py-12 text-center">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-7 h-7 text-gray-400" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">{title}</h4>
            {description && (
                <p className="text-gray-500 text-sm">{description}</p>
            )}
        </div>
    );
}
