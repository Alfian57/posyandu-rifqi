/**
 * TagSelector - Reusable multi-select tag component
 * 2-column layout: selected tags on left, available options on right
 */

interface TagSelectorProps {
    label: string;
    selectedTags: string[];
    options: readonly string[];
    onChange: (tags: string[]) => void;
    required?: boolean;
}

export function TagSelector({
    label,
    selectedTags,
    options,
    onChange,
    required = false
}: TagSelectorProps) {
    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            onChange(selectedTags.filter(t => t !== tag));
        } else {
            onChange([...selectedTags, tag]);
        }
    };

    const removeTag = (tag: string) => {
        onChange(selectedTags.filter(t => t !== tag));
    };

    return (
        <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Left: Selected tags display */}
                <div className="min-h-[42px] px-3 py-2 border border-gray-200 rounded-lg bg-white flex flex-wrap gap-2 items-start content-start">
                    {selectedTags.length === 0 ? (
                        <span className="text-gray-400 text-sm">Belum ada yang dipilih...</span>
                    ) : (
                        selectedTags.map(tag => (
                            <span
                                key={tag}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-800 text-white text-sm rounded-full"
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-gray-600 transition-colors text-xs"
                                >
                                    ×
                                </button>
                            </span>
                        ))
                    )}
                </div>

                {/* Right: Available options */}
                <div className="flex flex-wrap gap-2 items-start content-start">
                    {options.map(option => {
                        const isSelected = selectedTags.includes(option);
                        return (
                            <button
                                key={option}
                                type="button"
                                onClick={() => toggleTag(option)}
                                className={`px-3 py-1.5 rounded-full border text-sm transition-all ${isSelected
                                        ? 'bg-gray-200 border-gray-400 text-gray-600'
                                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                                    }`}
                            >
                                {isSelected && <span className="mr-1">✓</span>}
                                {option}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
