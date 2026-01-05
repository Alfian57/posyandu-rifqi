/**
 * useAccountSettings Hook
 * Logic for Account Settings page: Profile, Password, Delete Account
 * Integrated with Laravel API via useAuth context
 */

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from './useAuth';
import { authRepository } from '../../data/repositories/AuthRepositoryImpl';

export type SettingsTab = 'profile' | 'password' | 'delete';

export interface ProfileData {
    id: number | string;
    nama: string;
    email: string;
    noHp: string;
    nik: string;
    role: string;
    foto: string;
}

export interface PasswordData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export function useAccountSettings() {
    const { user, refreshProfile, logout } = useAuth();
    const [searchParams] = useSearchParams();

    // UI State
    const [activeTab, setActiveTab] = useState<SettingsTab>(
        (searchParams.get('tab') as SettingsTab) || 'profile'
    );
    
    // Mode Edit Profil
    const [isEditMode, setIsEditMode] = useState(false);

    // Profile State
    const [profileData, setProfileData] = useState<ProfileData>({
        id: '',
        nama: '',
        email: '',
        noHp: '',
        nik: '',
        role: 'Kader',
        foto: ''
    });
    const [isProfileSaving, setIsProfileSaving] = useState(false);

    // Password State
    const [passwordData, setPasswordData] = useState<PasswordData>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [isPasswordSaving, setIsPasswordSaving] = useState(false);

    // Delete State
    const [deleteConfirmText, setDeleteConfirmText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Sync state with auth user
    const syncWithUser = () => {
        if (user) {
            setProfileData({
                id: user.id,
                nama: user.name || '',
                email: user.email || '',
                noHp: user.phone_number || '',
                nik: user.nik || '',
                role: user.role || 'Kader',
                foto: user.avatar_url || ''
            });
        }
    };

    useEffect(() => {
        syncWithUser();
    }, [user]);

    const handleTabChange = (tab: SettingsTab) => {
        setActiveTab(tab);
    };

    const toggleEditMode = () => {
        if (isEditMode) {
            // Jika membatalkan edit, kembalikan data ke awal
            syncWithUser();
        }
        setIsEditMode(!isEditMode);
    };

    // Profile Actions
    const handleProfileChange = (field: keyof ProfileData, value: string) => {
        setProfileData(prev => ({ ...prev, [field]: value }));
    };

    const handleProfileSave = async () => {
        if (!user) return;
        setIsProfileSaving(true);
        try {
            const response = await authRepository.updateProfile({
                name: profileData.nama,
                phone_number: profileData.noHp,
                avatar_url: profileData.foto
            });

            if (response.success) {
                toast.success('Profil berhasil diperbarui maseh! Mazzeh!');
                setIsEditMode(false);
                await refreshProfile(); // Ambil data terbaru dari backend
            } else {
                toast.error(response.message || 'Gagal memperbarui profil');
            }
        } catch (error: any) {
            console.error('Save profile error:', error);
            const message = error.response?.data?.message || error.message || 'Gagal memperbarui profil';
            toast.error(message);
        } finally {
            setIsProfileSaving(false);
        }
    };

    // Password Actions
    const handlePasswordChange = (field: keyof PasswordData, value: string) => {
        setPasswordData(prev => ({ ...prev, [field]: value }));
    };

    const handlePasswordSave = async () => {
        if (!user) return;
        if (!passwordData.currentPassword) {
            toast.error('Masukkan password saat ini maseh');
            return;
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('Konfirmasi password baru tidak cocok');
            return;
        }
        if (passwordData.newPassword.length < 8) {
            toast.error('Password baru minimal 8 karakter maseh');
            return;
        }

        setIsPasswordSaving(true);
        try {
            // Memanggil endpoint KHUSUS /api/profile/password maseh!
            const response = await authRepository.changePassword({
                current_password: passwordData.currentPassword,
                new_password: passwordData.newPassword,
                new_password_confirmation: passwordData.confirmPassword
            });

            if (response.success) {
                toast.success('Password berhasil diperbarui maseh! Mazzeh!');
                setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            } else {
                toast.error(response.message || 'Gagal memperbarui password');
            }
        } catch (error: any) {
            console.error('Update password error:', error);
            const message = error.response?.data?.message || error.message || 'Gagal memperbarui password';
            toast.error(message);
        } finally {
            setIsPasswordSaving(false);
        }
    };

    const handleDeleteConfirmChange = (value: string) => {
        setDeleteConfirmText(value);
    };

    const handleDeleteAccount = async () => {
        if (deleteConfirmText.toUpperCase() !== 'HAPUS AKUN') {
            toast.error('Silakan ketik HAPUS AKUN untuk konfirmasi');
            return;
        }

        const isSure = window.confirm('Apakah Anda benar-benar yakin ingin menghapus akun? Tindakan ini permanen maseh!');
        if (!isSure) return;

        setIsDeleting(true);
        try {
            const response = await authRepository.deleteAccount(deleteConfirmText);
            if (response.success) {
                toast.success('Akun berhasil dihapus. Sampai jumpa maseh! Mazzeh!');
                logout(); // Langsung keluarkan user
            } else {
                toast.error(response.message || 'Gagal menghapus akun');
            }
        } catch (error: any) {
            console.error('Delete account error:', error);
            const message = error.response?.data?.message || error.message || 'Gagal menghapus akun';
            toast.error(message);
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        activeTab,
        handleTabChange,
        isEditMode,
        toggleEditMode,
        profileData,
        isProfileSaving,
        handleProfileChange,
        handleProfileSave,
        passwordData,
        isPasswordSaving,
        handlePasswordChange,
        handlePasswordSave,
        deleteConfirmText,
        isDeleting,
        handleDeleteConfirmChange,
        handleDeleteAccount,
    };
}
