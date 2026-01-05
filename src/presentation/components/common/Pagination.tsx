/**
 * Pagination Component
 * Reusable pagination controls
 */

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
    currentPage: number;
    totalPages: number;
    onPrevPage: () => void;
    onNextPage: () => void;
    onGoToPage: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPrevPage, onNextPage, onGoToPage }: Props) {
    if (totalPages <= 1) return null;

    return (
        <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
            <button
                onClick={onPrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
            >
                <ChevronLeft className="w-4 h-4" />
                Sebelumnya
            </button>
            <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                        key={page}
                        onClick={() => onGoToPage(page)}
                        className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>
            <button
                onClick={onNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
            >
                Selanjutnya
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}
