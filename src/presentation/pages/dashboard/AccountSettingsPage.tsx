/**
 * AccountSettingsPage - Pengaturan Akun
 * Now refactored into focused sub-components
 * 
 * Route: /dashboard/pengaturan
 */
 
import { Home, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAccountSettings } from '@/presentation/hooks/useAccountSettings';
import { useDocumentTitle } from '@/presentation/hooks/useDocumentTitle';
import { ProfileSection, SecuritySection, DangerZoneSection } from '../../components/settings';

export function AccountSettingsPage() {
    useDocumentTitle('Pengaturan Akun');
    const {
        profileData,
        isProfileSaving,
        handleProfileChange,
        handleProfileSave,
        isEditMode,
        toggleEditMode,
        passwordData,
        isPasswordSaving,
        handlePasswordChange,
        handlePasswordSave,
        deleteConfirmText,
        isDeleting,
        handleDeleteConfirmChange,
        handleDeleteAccount,
    } = useAccountSettings();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Pengaturan Akun</h1>
                    <p className="text-gray-500 text-sm mt-1">Kelola profil, keamanan, dan preferensi akun Anda</p>
                </div>
                <nav className="hidden md:flex items-center gap-2 text-sm">
                    <Link to="/dashboard" className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors">
                        <Home className="w-4 h-4" />
                        <span>Dashboard</span>
                    </Link>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">Pengaturan</span>
                </nav>
            </div>

            {/* Profile Section */}
            <ProfileSection 
                profileData={profileData}
                isProfileSaving={isProfileSaving}
                isEditMode={isEditMode}
                handleProfileChange={handleProfileChange}
                handleProfileSave={handleProfileSave}
                toggleEditMode={toggleEditMode}
            />

            {/* Security Section */}
            <SecuritySection 
                passwordData={passwordData}
                isPasswordSaving={isPasswordSaving}
                handlePasswordChange={handlePasswordChange}
                handlePasswordSave={handlePasswordSave}
            />

            {/* Danger Zone Section */}
            <DangerZoneSection 
                deleteConfirmText={deleteConfirmText}
                isDeleting={isDeleting}
                handleDeleteConfirmChange={handleDeleteConfirmChange}
                handleDeleteAccount={handleDeleteAccount}
            />
        </div>
    );
}
