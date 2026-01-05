/**
 * Auth API Datasource
 * Handles all API calls related to authentication
 */

import api from '../core/api';
import type { ApiResponse, AuthData, LoginParams, RegisterParams, User, UpdateProfileParams } from '../../domain/entities/User';

export class AuthApiDataSource {
    /**
     * Login user with identifier and password
     * POST /api/login
     */
    async login(params: LoginParams): Promise<ApiResponse<AuthData>> {
        const response = await api.post<ApiResponse<AuthData>>('/login', params);
        return response.data;
    }

    /**
     * Register new user
     * POST /api/register
     */
    async register(params: RegisterParams): Promise<ApiResponse<AuthData>> {
        const response = await api.post<ApiResponse<AuthData>>('/register', params);
        return response.data;
    }

    /**
     * Logout current user
     * POST /api/logout
     */
    async logout(): Promise<void> {
        await api.post('/logout');
    }

    /**
     * Get current user profile
     * GET /api/profile
     */
    async getProfile(): Promise<ApiResponse<{ user: User }>> {
        const response = await api.get<ApiResponse<{ user: User }>>('/profile');
        return response.data;
    }

    /**
     * Update user profile
     * PUT /api/profile
     */
    async updateProfile(params: UpdateProfileParams): Promise<ApiResponse<{ user: User }>> {
        const response = await api.put<ApiResponse<{ user: User }>>('/profile', params);
        return response.data;
    }

    /**
     * Change user password
     * PUT /api/profile/password
     */
    async changePassword(params: UpdateProfileParams): Promise<ApiResponse<{ success: boolean; message: string }>> {
        const response = await api.put<ApiResponse<{ success: boolean; message: string }>>('/profile/password', params);
        return response.data;
    }

    /**
     * Delete user account
     * DELETE /api/profile
     */
    async deleteAccount(confirmation: string): Promise<ApiResponse<{ success: boolean; message: string }>> {
        const response = await api.delete<ApiResponse<{ success: boolean; message: string }>>('/profile', {
            data: { confirmation }
        });
        return response.data;
    }
}

// Singleton instance
export const authApiDataSource = new AuthApiDataSource();
