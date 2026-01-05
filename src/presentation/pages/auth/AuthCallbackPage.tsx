import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Loader2 } from 'lucide-react';

/**
 * AuthCallbackPage
 * Handles the redirect from third-party OAuth providers (like Google)
 */
export function AuthCallbackPage() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // If user is authenticated, redirect to dashboard
        if (!loading && user) {
            console.log('[AuthCallback] User authenticated, redirecting to dashboard');
            navigate('/dashboard', { replace: true });
        }

        // If not loading and no user after some time, something might be wrong
        // but typically Supabase handles the hash exchange automatically
    }, [user, loading, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Memproses Login...</h2>
                <p className="text-gray-500">Mohon tunggu sebentar, kami sedang menyiapkan dashboard Anda.</p>
            </div>
        </div>
    );
}
