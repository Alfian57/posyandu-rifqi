/**
 * ProfileSection - Pengaturan profil kader
 */

import { User, Camera, X, Mail, Phone, CreditCard, Briefcase, Save } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import type { ProfileData } from '@/presentation/hooks/useAccountSettings';

interface ProfileSectionProps {
    profileData: ProfileData;
    isProfileSaving: boolean;
    isEditMode: boolean;
    handleProfileChange: (field: keyof ProfileData, value: string) => void;
    handleProfileSave: () => void;
    toggleEditMode: () => void;
}

export function ProfileSection({
    profileData,
    isProfileSaving,
    isEditMode,
    handleProfileChange,
    handleProfileSave,
    toggleEditMode
}: ProfileSectionProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string>(profileData.foto || '');

    // Sync preview when profileData.foto changes (e.g. on cancel or initial load)
    useEffect(() => {
        setPreviewUrl(profileData.foto || '');
    }, [profileData.foto]);

    const handlePhotoClick = () => fileInputRef.current?.click();
    
    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            handleProfileChange('foto', url);
        }
    };

    const handleRemovePhoto = () => {
        setPreviewUrl('');
        handleProfileChange('foto', '');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const getInitial = (name: string) => 
        name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '??';

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600" />
                    </div>
                    Profile Kader
                </h2>
                <button 
                    onClick={toggleEditMode}
                    className={`text-sm px-4 py-1.5 rounded-lg font-medium transition-all ${
                        isEditMode ? 'text-red-600 bg-red-50 hover:bg-red-100' : 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                    }`}
                >
                    {isEditMode ? 'Batal' : 'Edit Profil'}
                </button>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Avatar */}
                    <div className="flex flex-col items-center gap-4 lg:w-1/4">
                        <div className="relative group">
                            {previewUrl ? (
                                <img src={previewUrl} alt="Profile" className="w-32 h-32 rounded-3xl object-cover shadow-md border-4 border-white" />
                            ) : (
                                <div className="w-32 h-32 bg-linear-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-blue-500/30">
                                    {getInitial(profileData.nama)}
                                </div>
                            )}
                            <button onClick={handlePhotoClick} className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-colors border-2 border-white">
                                <Camera className="w-5 h-5" />
                            </button>
                            <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                        </div>
                        <div className="text-center">
                            <h3 className="font-bold text-gray-900 text-lg">{profileData.nama}</h3>
                            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">{profileData.role}</p>
                            <div className="flex flex-col gap-1 mt-4">
                                <button onClick={handlePhotoClick} className="text-sm text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg font-medium transition-colors">Ganti Foto Profil</button>
                                {previewUrl && (
                                    <button onClick={handleRemovePhoto} className="text-sm text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg font-medium flex items-center justify-center gap-1 transition-colors">
                                        <X className="w-3 h-3" /> Hapus Foto
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Fields */}
                    <div className="lg:w-3/4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    <User className="w-4 h-4 inline mr-1 text-gray-400" /> Nama Lengkap
                                </label>
                                <input 
                                    type="text" 
                                    value={profileData.nama} 
                                    onChange={(e) => handleProfileChange('nama', e.target.value)} 
                                    placeholder="Masukkan nama lengkap" 
                                    readOnly={!isEditMode}
                                    className={`w-full px-4 py-2.5 border rounded-xl outline-none transition-all ${
                                        isEditMode ? 'border-blue-400 ring-2 ring-blue-100 bg-white' : 'border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed'
                                    }`} 
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    <CreditCard className="w-4 h-4 inline mr-1 text-gray-400" /> NIK
                                </label>
                                <input 
                                    type="text" 
                                    value={profileData.nik} 
                                    onChange={(e) => handleProfileChange('nik', e.target.value)} 
                                    placeholder="Masukkan NIK 16 digit" 
                                    maxLength={16} 
                                    readOnly={!isEditMode}
                                    className={`w-full px-4 py-2.5 border rounded-xl outline-none transition-all ${
                                        isEditMode ? 'border-blue-400 ring-2 ring-blue-100 bg-white' : 'border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed'
                                    }`} 
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    <Briefcase className="w-4 h-4 inline mr-1 text-gray-400" /> Role / Jabatan
                                </label>
                                <select
                                    value={profileData.role}
                                    disabled
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed outline-none transition-all"
                                >
                                    <option value="Kader">Kader</option>
                                    <option value="Bidan">Bidan</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Kepala Puskesmas">Kepala Puskesmas</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    <Mail className="w-4 h-4 inline mr-1 text-gray-400" /> Email
                                </label>
                                <input 
                                    type="email" 
                                    value={profileData.email} 
                                    onChange={(e) => handleProfileChange('email', e.target.value)} 
                                    placeholder="Masukkan email" 
                                    readOnly={!isEditMode}
                                    className={`w-full px-4 py-2.5 border rounded-xl outline-none transition-all ${
                                        isEditMode ? 'border-blue-400 ring-2 ring-blue-100 bg-white' : 'border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed'
                                    }`} 
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    <Phone className="w-4 h-4 inline mr-1 text-gray-400" /> No. Telepon
                                </label>
                                <input 
                                    type="tel" 
                                    value={profileData.noHp} 
                                    onChange={(e) => handleProfileChange('noHp', e.target.value)} 
                                    placeholder="Masukkan nomor telepon" 
                                    readOnly={!isEditMode}
                                    className={`w-full px-4 py-2.5 border rounded-xl outline-none transition-all ${
                                        isEditMode ? 'border-blue-400 ring-2 ring-blue-100 bg-white' : 'border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed'
                                    }`} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            {isEditMode && (
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                    <button 
                        onClick={toggleEditMode}
                        className="px-6 py-2.5 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                    >
                        Batal
                    </button>
                    <button 
                        onClick={handleProfileSave} 
                        disabled={isProfileSaving} 
                        className="px-6 py-2.5 bg-slate-800 disabled:bg-slate-400 text-white rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-slate-200 hover:bg-slate-900 transition-all"
                    >
                        <Save className="w-4 h-4" />
                        {isProfileSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                </div>
            )}
        </div>
    );
}
