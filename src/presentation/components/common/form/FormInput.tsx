/**
 * FormInput - Reusable floating label input component
 */

import DatePicker from 'react-datepicker';
import { Calendar } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';

interface FormInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    placeholder?: string;
    type?: 'text' | 'number';
    disabled?: boolean;
}

export function FormInput({
    label,
    value,
    onChange,
    required = false,
    placeholder = '',
    type = 'text',
    disabled = false
}: FormInputProps) {
    return (
        <div className="relative">
            <label className="block text-xs font-medium text-gray-600 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all ${disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''}`}
            />
        </div>
    );
}

/**
 * FormDateInput - Date input with label
 */
interface FormDateInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
}

export function FormDateInput({
    label,
    value,
    onChange,
    required = false
}: FormDateInputProps) {
    return (
        <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type="date"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
        </div>
    );
}

/**
 * FormDatePicker - Date picker using react-datepicker library
 * Works with string format (YYYY-MM-DD) for compatibility
 */
interface FormDatePickerProps {
    label: string;
    value: string; // YYYY-MM-DD format
    onChange: (value: string) => void;
    required?: boolean;
    placeholder?: string;
    maxDate?: Date;
}

export function FormDatePicker({
    label,
    value,
    onChange,
    required = false,
    placeholder = 'Pilih tanggal',
    maxDate
}: FormDatePickerProps) {
    // Convert string to Date for DatePicker
    const dateValue = value ? new Date(value) : null;
    
    // Convert Date back to string (YYYY-MM-DD)
    const handleChange = (date: Date | null) => {
        if (date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            onChange(`${year}-${month}-${day}`);
        } else {
            onChange('');
        }
    };

    return (
        <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <DatePicker
                    selected={dateValue}
                    onChange={handleChange}
                    dateFormat="dd/MM/yyyy"
                    placeholderText={placeholder}
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    maxDate={maxDate}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    wrapperClassName="w-full"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
        </div>
    );
}
