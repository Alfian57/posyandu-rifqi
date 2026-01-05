/**
 * Auth Repository Implementation
 * Implementation of AuthRepository using AuthApiDataSource
 */

import { authApiDataSource } from '../datasources/AuthApiDataSource';
import type { AuthRepository } from '../../domain/repositories/AuthRepository';
import type { ApiResponse, AuthData, LoginParams, RegisterParams, User, UpdateProfileParams } from '../../domain/entities/User';

export class AuthRepositoryImpl implements AuthRepository {
    async login(params: LoginParams): Promise<ApiResponse<AuthData>> {
        return authApiDataSource.login(params);
    }

    async register(params: RegisterParams): Promise<ApiResponse<AuthData>> {
        return authApiDataSource.register(params);
    }

    async logout(): Promise<void> {
        return authApiDataSource.logout();
    }

    async getProfile(): Promise<ApiResponse<{ user: User }>> {
        return authApiDataSource.getProfile();
    }

    async updateProfile(params: UpdateProfileParams): Promise<ApiResponse<{ user: User }>> {
        return authApiDataSource.updateProfile(params);
    }

    async changePassword(params: UpdateProfileParams): Promise<ApiResponse<{ success: boolean; message: string }>> {
        return authApiDataSource.changePassword(params);
    }

    async deleteAccount(confirmation: string): Promise<ApiResponse<{ success: boolean; message: string }>> {
        return authApiDataSource.deleteAccount(confirmation);
    }
}

// Singleton instance
export const authRepository = new AuthRepositoryImpl();
