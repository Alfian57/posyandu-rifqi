/**
 * AppLayout - Shared layout for all authenticated pages
 * Structure: Navbar + Main Content (via Outlet)
 */

import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';
import { UserDropdown, LogoutConfirmModal, FullPageLoading } from '../common';
import { SyncLoadingOverlay } from '../common/SyncLoadingOverlay';
import { useAuth } from '../../hooks/useAuth';

export function AppLayout() {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const handleLogoutConfirm = async () => {
        setIsLoggingOut(true);
        setShowLogoutModal(false);
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('[AppLayout] Logout failed:', error);
            window.location.href = '/login';
        } finally {
            setIsLoggingOut(false);
        }
    };

    // Get display name: Full Name > Email
    const displayName = user?.name || user?.email?.split('@')[0] || 'Pengguna';
    const userEmail = user?.email || '';

    return (
        <div className="min-h-screen bg-slate-100 relative">
            {/* Sync Loading Overlay */}
            <SyncLoadingOverlay />
            
            {/* Logout Loading Overlay */}
            {isLoggingOut && <FullPageLoading message="Keluar dari akun..." />}

            {/* Logout Confirmation Modal */}
            <LogoutConfirmModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogoutConfirm}
            />

            {/* Header */}
            <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div
                            className="flex items-center gap-3 cursor-pointer"
                            onClick={() => navigate('/dashboard')}
                        >
                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                                <Stethoscope className="w-5 h-5" strokeWidth={2} />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-gray-900">Posyandu ILP</h1>
                                <p className="text-xs text-gray-500">Desa Tondomulyo</p>
                            </div>
                        </div>

                        {/* User Dropdown */}
                        <UserDropdown
                            userName={displayName}
                            userEmail={userEmail}
                            onLogout={handleLogoutClick}
                        />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main>
                <Outlet />
            </main>
        </div>
    );
}

