/**
 * RegisterForm - Registration form card component
 * Pure UI component - receives all state and handlers via props
 */

import { Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, CreditCard, Phone } from 'lucide-react';
import type { FormEvent } from 'react';

interface RegisterFormProps {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    nik: string;
    phoneNumber: string;
    showPassword: boolean;
    showPasswordConfirmation: boolean;
    fieldErrors: Record<string, string>;
    generalError: string;
    isLoading: boolean;
    passwordStrength: {
        strength: string;
        label: string;
        passed: number;
        checks: {
            length: boolean;
            lowercase: boolean;
            uppercase: boolean;
            number: boolean;
        };
    };
    onNameChange: (value: string) => void;
    onEmailChange: (value: string) => void;
    onPasswordChange: (value: string) => void;
    onPasswordConfirmationChange: (value: string) => void;
    onNikChange: (value: string) => void;
    onPhoneNumberChange: (value: string) => void;
    onTogglePassword: () => void;
    onTogglePasswordConfirmation: () => void;
    onSubmit: (e: FormEvent) => void;
}

export function RegisterForm({
    name,
    email,
    password,
    passwordConfirmation,
    nik,
    phoneNumber,
    showPassword,
    showPasswordConfirmation,
    fieldErrors,
    generalError,
    isLoading,
    passwordStrength,
    onNameChange,
    onEmailChange,
    onPasswordChange,
    onPasswordConfirmationChange,
    onNikChange,
    onPhoneNumberChange,
    onTogglePassword,
    onTogglePasswordConfirmation,
    onSubmit,
}: RegisterFormProps) {
    return (
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 border border-slate-100">
            <div className="mb-4">
                <h2 className="text-2xl font-urbanist font-bold text-gray-900">
                    Daftar Akun
                </h2>
                <p className="mt-1 text-gray-500">
                    Lengkapi data di bawah ini untuk mendaftar
                </p>
            </div>

            {/* Error message */}
            {generalError && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span className="text-sm">{generalError}</span>
                </div>
            )}

            {/* Register Form */}
            <form onSubmit={onSubmit} className="space-y-4">
                {/* Name field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Nama Lengkap
                    </label>
                    <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => onNameChange(e.target.value)}
                            className={`w-full pl-11 pr-4 py-2 rounded-xl text-sm border ${fieldErrors.name ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'} bg-slate-50 focus:bg-white outline-none transition-all`}
                            placeholder="Masukkan nama lengkap"
                            disabled={isLoading}
                        />
                    </div>
                    {fieldErrors.name && (
                        <p className="mt-1.5 text-sm text-red-500">{fieldErrors.name}</p>
                    )}
                </div>

                {/* Email field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => onEmailChange(e.target.value)}
                            className={`w-full pl-11 pr-4 py-2 rounded-xl text-sm border ${fieldErrors.email ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'} bg-slate-50 focus:bg-white outline-none transition-all`}
                            placeholder="Masukkan email"
                            disabled={isLoading}
                        />
                    </div>
                    {fieldErrors.email && (
                        <p className="mt-1.5 text-sm text-red-500">{fieldErrors.email}</p>
                    )}
                </div>

                {/* Password fields - Side by Side */}
                <div className="grid grid-cols-2 gap-3">
                    {/* Password field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => onPasswordChange(e.target.value)}
                                className={`w-full pl-9 pr-9 py-2 rounded-xl border text-sm ${fieldErrors.password ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'} bg-slate-50 focus:bg-white outline-none transition-all`}
                                placeholder="Min. 8 karakter"
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={onTogglePassword}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {fieldErrors.password && (
                            <p className="mt-1 text-xs text-red-500">{fieldErrors.password}</p>
                        )}
                    </div>

                    {/* Password Confirmation field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Konfirmasi
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type={showPasswordConfirmation ? 'text' : 'password'}
                                value={passwordConfirmation}
                                onChange={(e) => onPasswordConfirmationChange(e.target.value)}
                                className={`w-full pl-9 pr-9 py-2 rounded-xl border text-sm ${fieldErrors.passwordConfirmation ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'} bg-slate-50 focus:bg-white outline-none transition-all`}
                                placeholder="Ulangi password"
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={onTogglePasswordConfirmation}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPasswordConfirmation ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {fieldErrors.passwordConfirmation && (
                            <p className="mt-1 text-xs text-red-500">{fieldErrors.passwordConfirmation}</p>
                        )}
                    </div>
                </div>

                {/* Password Strength Indicator */}
                {password && (
                    <div className="-mt-2 space-y-2">
                        <div className="flex items-center gap-1.5">
                            {[1, 2, 3, 4].map((level) => (
                                <div
                                    key={level}
                                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${passwordStrength.passed >= level
                                        ? passwordStrength.passed === 4 ? 'bg-emerald-500'
                                            : passwordStrength.passed === 3 ? 'bg-blue-500'
                                                : passwordStrength.passed === 2 ? 'bg-amber-500'
                                                    : 'bg-red-500'
                                        : 'bg-slate-200'
                                        }`}
                                />
                            ))}
                            <span className={`text-xs font-medium ml-1 ${passwordStrength.strength === 'strong' ? 'text-emerald-600' :
                                passwordStrength.strength === 'good' ? 'text-blue-600' :
                                    passwordStrength.strength === 'fair' ? 'text-amber-600' : 'text-red-600'
                                }`}>
                                {passwordStrength.label}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                            <span className={`text-xs ${passwordStrength.checks.length ? 'text-emerald-600' : 'text-slate-400'}`}>
                                {passwordStrength.checks.length ? '✓' : '○'} 8+ karakter
                            </span>
                            <span className={`text-xs ${passwordStrength.checks.lowercase ? 'text-emerald-600' : 'text-slate-400'}`}>
                                {passwordStrength.checks.lowercase ? '✓' : '○'} huruf kecil
                            </span>
                            <span className={`text-xs ${passwordStrength.checks.uppercase ? 'text-emerald-600' : 'text-slate-400'}`}>
                                {passwordStrength.checks.uppercase ? '✓' : '○'} huruf besar
                            </span>
                            <span className={`text-xs ${passwordStrength.checks.number ? 'text-emerald-600' : 'text-slate-400'}`}>
                                {passwordStrength.checks.number ? '✓' : '○'} angka
                            </span>
                        </div>
                    </div>
                )}

                {/* Identity Fields Section - Mandatory */}
                <div className="pt-2 border-t border-slate-100">
                    {/* NIK and Phone Number - Side by Side */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* NIK field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                NIK
                            </label>
                            <div className="relative">
                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={nik}
                                    onChange={(e) => onNikChange(e.target.value.replace(/\D/g, '').slice(0, 16))}
                                    className={`w-full pl-9 pr-2 py-2 rounded-xl border text-sm ${fieldErrors.nik ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'} bg-slate-50 focus:bg-white outline-none transition-all`}
                                    placeholder="16 digit"
                                    disabled={isLoading}
                                    maxLength={16}
                                />
                            </div>
                            {fieldErrors.nik && (
                                <p className="mt-1 text-xs text-red-500">{fieldErrors.nik}</p>
                            )}
                        </div>

                        {/* Phone Number field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                No. Telepon
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => onPhoneNumberChange(e.target.value)}
                                    className={`w-full pl-9 pr-2 py-2 rounded-xl border text-sm ${fieldErrors.phoneNumber ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'} bg-slate-50 focus:bg-white outline-none transition-all`}
                                    placeholder="08xxx"
                                    disabled={isLoading}
                                />
                            </div>
                            {fieldErrors.phoneNumber && (
                                <p className="mt-1 text-xs text-red-500">{fieldErrors.phoneNumber}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 px-4 bg-linear-to-r from-slate-800 to-slate-900 text-white font-medium rounded-xl hover:from-slate-700 hover:to-slate-800 focus:ring-4 focus:ring-slate-500/30 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-slate-300"
                >
                    {isLoading ? 'Memproses...' : 'Daftar'}
                </button>
            </form>

            {/* Login link */}
            <p className="mt-4 text-center text-sm text-gray-600">
                Sudah punya akun?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                    Masuk
                </Link>
            </p>
        </div>
    );
}
