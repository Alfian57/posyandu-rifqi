/**
 * LoginForm - Login form card component
 * Pure UI component - receives all state and handlers via props
 */

import { Link } from 'react-router-dom';
import { User as UserIcon, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import type { FormEvent } from 'react';

interface LoginFormProps {
    identifier: string;
    password: string;
    showPassword: boolean;
    identifierError: string;
    passwordError: string;
    generalError: string;
    isLoading: boolean;
    onIdentifierChange: (value: string) => void;
    onPasswordChange: (value: string) => void;
    onTogglePassword: () => void;
    onSubmit: (e: FormEvent) => void;
}

export function LoginForm({
    identifier,
    password,
    showPassword,
    identifierError,
    passwordError,
    generalError,
    isLoading,
    onIdentifierChange,
    onPasswordChange,
    onTogglePassword,
    onSubmit,
}: LoginFormProps) {
    return (
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 border border-slate-100">
            <div className="mb-4">
                <h2 className="text-2xl font-urbanist font-bold text-gray-900">
                    Masuk ke Dashboard
                </h2>
                <p className="mt-1 text-gray-500">
                    Gunakan email atau NIK untuk masuk
                </p>
            </div>

            {/* Error message */}
            {generalError && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span className="text-sm">{generalError}</span>
                </div>
            )}

            {/* Login Form */}
            <form onSubmit={onSubmit} className="space-y-4">
                {/* Identifier field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email atau NIK
                    </label>
                    <div className="relative">
                        <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={identifier}
                            onChange={(e) => onIdentifierChange(e.target.value)}
                            className={`w-full pl-11 pr-4 py-2 text-sm rounded-xl border ${identifierError ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'} bg-slate-50 focus:bg-white outline-none transition-all`}
                            placeholder="Masukkan email atau NIK"
                            disabled={isLoading}
                        />
                    </div>
                    {identifierError && (
                        <p className="mt-1.5 text-sm text-red-500">{identifierError}</p>
                    )}
                </div>

                {/* Password field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => onPasswordChange(e.target.value)}
                            className={`w-full pl-11 pr-11 text-sm py-2 rounded-xl border ${passwordError ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'} bg-slate-50 focus:bg-white outline-none transition-all`}
                            placeholder="Masukkan password"
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={onTogglePassword}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    {passwordError && (
                        <p className="mt-1.5 text-sm text-red-500">{passwordError}</p>
                    )}
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 px-4 bg-linear-to-r from-slate-800 to-slate-900 text-white font-medium rounded-xl hover:from-slate-700 hover:to-slate-800 focus:ring-4 focus:ring-slate-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-slate-300"
                >
                    {isLoading ? 'Memproses...' : 'Masuk'}
                </button>
            </form>

            {/* Register link */}
            <p className="mt-6 text-center text-sm text-gray-600">
                Belum punya akun?{' '}
                <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                    Daftar
                </Link>
            </p>
        </div>
    );
}
