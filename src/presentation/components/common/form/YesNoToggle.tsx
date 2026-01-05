/**
 * YesNoToggle - Toggle button for yes/no questions (like mental screening)
 * Supports null value for "not selected" state
 */

interface YesNoToggleProps {
    label: string;
    value: boolean | null;
    onChange: (value: boolean) => void;
    danger?: boolean;
}

export function YesNoToggle({
    label,
    value,
    onChange,
    danger = false
}: YesNoToggleProps) {
    // Handle null as unselected state
    const isYes = value === true;
    const isNo = value === false;

    return (
        <div className="p-3 bg-white rounded-xl border border-gray-200">
            <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-gray-700">{label}</span>
                <div className="flex gap-1">
                    <button
                        type="button"
                        onClick={() => onChange(false)}
                        className={`px-3 py-1 text-xs rounded-full transition-all ${
                            isNo
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        Tidak
                    </button>
                    <button
                        type="button"
                        onClick={() => onChange(true)}
                        className={`px-3 py-1 text-xs rounded-full transition-all ${
                            isYes
                                ? danger
                                    ? 'bg-red-600 text-white'
                                    : 'bg-green-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        Ya
                    </button>
                </div>
            </div>
        </div>
    );
}
