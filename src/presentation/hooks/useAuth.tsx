/**
 * Auth Context & Provider
 * Manages authentication state using Laravel API integration
 */

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import { loginUseCase } from '../../domain/usecases/auth/LoginUseCase';
import { registerUseCase } from '../../domain/usecases/auth/RegisterUseCase';
import { logoutUseCase } from '../../domain/usecases/auth/LogoutUseCase';
import { authRepository } from '../../data/repositories/AuthRepositoryImpl';
import { TOKEN_KEY } from '../../data/core/api';
import type { User, RegisterParams } from '../../domain/entities/User';
import type { AxiosError } from 'axios';

// ============================================================
// TYPES
// ============================================================

interface ApiErrorResponse {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
}

interface AuthContextType {
    // State
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;

    // Actions
    login: (identifier: string, password: string) => Promise<void>;
    register: (params: RegisterParams) => Promise<void>;
    logout: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

// ============================================================
// CONTEXT
// ============================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================================
// ERROR HELPERS
// ============================================================

function extractErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        // Check if it's an Axios error with response
        const axiosError = error as AxiosError<ApiErrorResponse>;
        if (axiosError.response?.data) {
            const data = axiosError.response.data;
            
            // Handle validation errors
            if (data.errors) {
                const firstError = Object.values(data.errors)[0];
                if (Array.isArray(firstError) && firstError.length > 0) {
                    return firstError[0];
                }
            }
            
            // Return message from API
            if (data.message) {
                return data.message;
            }
        }
        return error.message;
    }
    return 'Terjadi kesalahan. Silakan coba lagi.';
}

// ============================================================
// PROVIDER
// ============================================================

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); // Start true for initial auth check

    // Check for existing token on mount
    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem(TOKEN_KEY);
            if (token) {
                try {
                    const response = await authRepository.getProfile();
                    if (response.success) {
                        setUser(response.data.user);
                    }
                } catch (error) {
                    console.warn('[Auth] Failed to restore session:', error);
                    localStorage.removeItem(TOKEN_KEY);
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = useCallback(async (identifier: string, password: string) => {
        // Note: Loading state handled by LoginPage locally, not here
        // to avoid PublicRoute showing global spinner overlay
        try {
            const result = await loginUseCase.execute({ identifier, password });
            setUser(result.user);
        } catch (error) {
            throw new Error(extractErrorMessage(error));
        }
    }, []);

    const register = useCallback(async (params: RegisterParams) => {
        // Note: Loading state handled by useRegister locally, not here
        // to avoid PublicRoute showing global spinner overlay
        try {
            const result = await registerUseCase.execute(params);
            setUser(result.user);
        } catch (error) {
            throw new Error(extractErrorMessage(error));
        }
    }, []);

    const logout = useCallback(async () => {
        // Note: Loading state handled by AppLayout locally, not here
        // to avoid ProtectedRoute showing global spinner overlay
        await logoutUseCase.execute();
        setUser(null);
    }, []);

    const refreshProfile = useCallback(async () => {
        if (!localStorage.getItem(TOKEN_KEY)) return;
        
        try {
            const response = await authRepository.getProfile();
            if (response.success) {
                setUser(response.data.user);
            }
        } catch (error) {
            console.warn('[Auth] Profile refresh failed:', error);
        }
    }, []);

    const value: AuthContextType = {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshProfile,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// ============================================================
// HOOK
// ============================================================

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
