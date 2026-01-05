/**
 * FormCard - Reusable card wrapper with colored header
 */

import type { ReactNode } from 'react';

interface FormCardProps {
    title: string;
    icon: ReactNode;
    iconBgColor: string;  // e.g., 'bg-pink-100'
    iconColor: string;    // e.g., 'text-pink-600'
    children: ReactNode;
}

export function FormCard({
    title,
    icon,
    iconBgColor,
    iconColor,
    children
}: FormCardProps) {
    return (
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
            <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                <span className={`w-7 h-7 ${iconBgColor} rounded-lg flex items-center justify-center ${iconColor}`}>
                    {icon}
                </span>
                {title}
            </h4>
            {children}
        </div>
    );
}

/**
 * Common card class for backward compatibility
 */
export const cardClass = "bg-gray-50 rounded-2xl p-5 border border-gray-100";

/**
 * Pre-built icon components for common card types
 */
export const CardIcons = {
    // Generic person icon
    Person: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
    ),
    // Measurement/ruler icon
    Measurement: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
        </svg>
    ),
    // Service/checkmark icon
    Service: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
    ),
    // Education/book icon
    Education: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
        </svg>
    ),
    // ADL/screening icon
    Screening: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
    ),
    // Question/info icon
    Question: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
    )
};
