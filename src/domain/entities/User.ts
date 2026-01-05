/**
 * User Entity
 * Represents a user from the Laravel API
 */

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'kader';
    nik: string;
    phone_number: string;
    avatar_url: string | null;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    errors?: Record<string, string[]>;
}

/**
 * Auth Response data structure
 */
export interface AuthData {
    user: User;
    token: string;
    token_type: string;
}

/**
 * Login request parameters
 * Supports email or NIK as identifier
 */
export interface LoginParams {
    identifier: string;
    password: string;
}

/**
 * Register request parameters
 * NIK and phone_number are now required
 */
export interface RegisterParams {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    nik: string;
    phone_number: string;
}

/**
 * Update Profile request parameters
 */
export interface UpdateProfileParams {
    name?: string;
    phone_number?: string;
    avatar_url?: string;
    current_password?: string;
    new_password?: string;
    new_password_confirmation?: string;
}
