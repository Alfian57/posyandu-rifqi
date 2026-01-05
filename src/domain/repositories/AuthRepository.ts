/**
 * Auth Repository Interface
 * Contract for authentication operations
 */

import type { ApiResponse, AuthData, LoginParams, RegisterParams, User, UpdateProfileParams } from '../entities/User';

export interface AuthRepository {
    /**
     * Login with email and password
     */
    login(params: LoginParams): Promise<ApiResponse<AuthData>>;

    /**
     * Register a new user
     */
    register(params: RegisterParams): Promise<ApiResponse<AuthData>>;

    /**
     * Logout current user
     */
    logout(): Promise<void>;

    /**
     * Get current user profile
     */
    getProfile(): Promise<ApiResponse<{ user: User }>>;

    /**
     * Update user profile
     */
    updateProfile(params: UpdateProfileParams): Promise<ApiResponse<{ user: User }>>;

    /**
     * Change user password
     */
    changePassword(params: UpdateProfileParams): Promise<ApiResponse<{ success: boolean; message: string }>>;

    /**
     * Delete user account
     */
    deleteAccount(confirmation: string): Promise<ApiResponse<{ success: boolean; message: string }>>;
}
