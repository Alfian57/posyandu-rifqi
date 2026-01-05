/**
 * Application Router Configuration
 * Uses AppLayout as shared layout for all authenticated pages
 * 
 * Route structure:
 * - / → Redirect to login
 * - /login → Login page (public)
 * - /register → Register page (public)
 * - /auth/callback → OAuth callback handler
 * 
 * DASHBOARD & QUICK ACTIONS:
 * - /dashboard → Main dashboard
 * - /dashboard/participants → Manage Participants (Daftar Peserta)
 * - /dashboard/participants/register → Register new participant
 * - /dashboard/participants/:id → Participant detail, edit, delete
 * - /dashboard/examinations → Search & start health examination
 * - /dashboard/examinations/:category/:id → Record health data (wizard)
 * - /dashboard/reports → View & download Excel reports
 * - /dashboard/pengaduan → Submit bug reports
 * - /dashboard/pengaturan → Account profile & security settings
 */

import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { AuthCallbackPage } from '../pages/auth/AuthCallbackPage';

import { AppLayout } from '../components/layouts/AppLayout';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { LaporanPage } from '../pages/dashboard/LaporanPage';
import { PengaduanPage } from '../pages/dashboard/PengaduanPage';
import { PesertaPage } from '../pages/dashboard/PesertaPage';
import { PesertaDetailPage } from '../pages/dashboard/PesertaDetailPage';
import { PemeriksaanPage } from '../pages/dashboard/PemeriksaanPage';
import { PemeriksaanAddPage } from '../pages/dashboard/PemeriksaanAddPage';
import { PesertaAddPage } from '../pages/dashboard/PesertaAddPage';

import { AccountSettingsPage } from '../pages/dashboard/AccountSettingsPage';
import { useAuth } from '../hooks/useAuth';
import { ClipLoader } from 'react-spinners';

/**
 * ProtectedRoute - Guards routes that require authentication
 */
function ProtectedRoute() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900">
                <ClipLoader color="#ffffff" size={50} speedMultiplier={0.8} />
                <p className="mt-4 text-white font-medium">Memuat...</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

/**
 * PublicRoute - Redirects to dashboard if already authenticated
 */
function PublicRoute() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900">
                <ClipLoader color="#ffffff" size={50} speedMultiplier={0.8} />
                <p className="mt-4 text-white font-medium">Memuat...</p>
            </div>
        );
    }

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}

/**
 * Application routes configuration
 */
export const router = createBrowserRouter([
    // Root redirect
    {
        path: '/',
        element: <Navigate to="/login" replace />,
    },

    // Public routes (login, register)
    {
        element: <PublicRoute />,
        children: [
            {
                path: '/login',
                element: <LoginPage />,
            },
            {
                path: '/register',
                element: <RegisterPage />,
            },
        ],
    },

    // OAuth callback (no auth check needed)
    {
        path: '/auth/callback',
        element: <AuthCallbackPage />,
    },
    // Protected routes (require authentication)
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <AppLayout />,
                children: [
                    // ========================================
                    // DASHBOARD & QUICK ACTIONS
                    // ========================================
                    {
                        path: '/dashboard',
                        element: <DashboardPage />,
                    },

                    // Participants Management (formerly Pendaftaran)
                    {
                        path: '/dashboard/participants',
                        element: <PesertaPage />,
                    },
                    {
                        path: '/dashboard/participants/register',
                        element: <PesertaAddPage />,
                    },
                    {
                        path: '/dashboard/participants/:id',
                        element: <PesertaDetailPage />,
                    },

                    // Pemeriksaan (formerly Posyandu/Kunjungan)
                    {
                        path: '/dashboard/examinations',
                        element: <PemeriksaanPage />,
                    },
                    {
                        path: '/dashboard/examinations/:category/:id',
                        element: <PemeriksaanAddPage />,
                    },

                    // Reports (formerly Laporan)
                    {
                        path: '/dashboard/reports',
                        element: <LaporanPage />,
                    },

                    // Pengaduan (Quick Action)
                    {
                        path: '/dashboard/pengaduan',
                        element: <PengaduanPage />,
                    },

                    // ========================================
                    // LEGACY REDIRECTS
                    // ========================================
                    {
                        path: '/dashboard/peserta',
                        element: <Navigate to="/dashboard/participants" replace />,
                    },
                    {
                        path: '/dashboard/peserta/:id',
                        element: <Navigate to="/dashboard/participants" replace />,
                    },
                    {
                        path: '/dashboard/pendaftaran',
                        element: <Navigate to="/dashboard/participants" replace />,
                    },
                    {
                        path: '/dashboard/kunjungan',
                        element: <Navigate to="/dashboard/examinations" replace />,
                    },
                    {
                        path: '/dashboard/kunjungan/baru',
                        element: <Navigate to="/dashboard/participants/register" replace />,
                    },
                    {
                        path: '/dashboard/kunjungan/:nik',
                        element: <Navigate to="/dashboard/examinations" replace />,
                    },
                    {
                        path: '/dashboard/posyandu',
                        element: <Navigate to="/dashboard/examinations" replace />,
                    },
                    {
                        path: '/dashboard/posyandu/:id',
                        element: <Navigate to="/dashboard/examinations" replace />,
                    },
                    {
                        path: '/dashboard/posyandu/baru',
                        element: <Navigate to="/dashboard/participants/register" replace />,
                    },
                    {
                        path: '/dashboard/pemeriksaan',
                        element: <Navigate to="/dashboard/examinations" replace />,
                    },
                    {
                        path: '/dashboard/laporan',
                        element: <Navigate to="/dashboard/reports" replace />,
                    },

                    // ========================================
                    // TOP-LEVEL PAGES (Navbar items)
                    // ========================================


                    // Pengaturan Akun (Single page with all sections like Laporan)
                    {
                        path: '/dashboard/pengaturan',
                        element: <AccountSettingsPage />,
                    },
                    // Legacy routes → redirect to pengaturan
                    {
                        path: '/dashboard/settings',
                        element: <Navigate to="/dashboard/pengaturan" replace />,
                    },
                    {
                        path: '/dashboard/profile',
                        element: <Navigate to="/dashboard/pengaturan" replace />,
                    },
                    {
                        path: '/dashboard/password',
                        element: <Navigate to="/dashboard/pengaturan" replace />,
                    },
                    {
                        path: '/dashboard/hapus-akun',
                        element: <Navigate to="/dashboard/pengaturan" replace />,
                    },
                ],
            },
        ],
    },
]);

