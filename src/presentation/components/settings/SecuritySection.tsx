/**
 * SecuritySection - Pengaturan keamanan (ganti password)
 */

import { Shield, Lock, Eye, EyeOff, Save } from 'lucide-react';
import { useState } from 'react';
import type { PasswordData } from '@/presentation/hooks/useAccountSettings';

interface SecuritySectionProps {
    passwordData: PasswordData;
    isPasswordSaving: boolean;
    handlePasswordChange: (field: keyof PasswordData, value: string) => void;
    handlePasswordSave: () => void;
}

export function SecuritySection({
    passwordData,
    isPasswordSaving,
    handlePasswordChange,
    handlePasswordSave
}: SecuritySectionProps) {
    // Local visibility states
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const passwordsMatch = passwordData.newPassword === passwordData.confirmPassword;
    const isPasswordValid = 
        passwordData.currentPassword && 
        passwordData.newPassword && 
        passwordData.confirmPassword && 
        passwordsMatch &&
        passwordData.newPassword.length >= 8;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-amber-600" />
                    </div>
                    Keamanan
                </h2>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <Lock className="w-4 h-4 inline mr-1" /> Password Saat Ini
                        </label>
                        <div className="relative">
                            <input 
                                type={showCurrent ? 'text' : 'password'} 
                                value={passwordData.currentPassword} 
                                onChange={(e) => handlePasswordChange('currentPassword', e.target.value)} 
                                placeholder="Masukkan password saat ini" 
                                className="w-full px-4 py-2.5 pr-12 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" 
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowCurrent(!showCurrent)} 
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <Lock className="w-4 h-4 inline mr-1" /> Password Baru
                        </label>
                        <div className="relative">
                            <input 
                                type={showNew ? 'text' : 'password'} 
                                value={passwordData.newPassword} 
                                onChange={(e) => handlePasswordChange('newPassword', e.target.value)} 
                                placeholder="Masukkan password baru" 
                                className="w-full px-4 py-2.5 pr-12 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all" 
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowNew(!showNew)} 
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <Lock className="w-4 h-4 inline mr-1" /> Konfirmasi Password
                        </label>
                        <div className="relative">
                            <input 
                                type={showConfirm ? 'text' : 'password'} 
                                value={passwordData.confirmPassword} 
                                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)} 
                                placeholder="Ulangi password baru" 
                                className={`w-full px-4 py-2.5 pr-12 border rounded-xl focus:ring-2 outline-none transition-all ${passwordData.confirmPassword && !passwordsMatch ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-blue-400 focus:ring-blue-100'}`} 
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowConfirm(!showConfirm)} 
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {passwordData.confirmPassword && !passwordsMatch && (
                            <p className="text-sm text-red-500 mt-1">Password tidak cocok</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                <button 
                    onClick={handlePasswordSave} 
                    disabled={isPasswordSaving || !isPasswordValid} 
                    className="px-6 py-2.5 bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed text-white rounded-xl font-medium flex items-center gap-2"
                >
                    <Save className="w-4 h-4" />
                    {isPasswordSaving ? 'Menyimpan...' : 'Ganti Password'}
                </button>
            </div>
        </div>
    );
}
