/**
 * Login UseCase
 * Handles login logic and token storage
 * Supports identifier (email/NIK)
 */

import { authRepository } from '../../../data/repositories/AuthRepositoryImpl';
import { TOKEN_KEY } from '../../../data/core/api';
import type { LoginParams, User } from '../../entities/User';

export interface LoginResult {
    user: User;
    token: string;
}

export class LoginUseCase {
    async execute(params: LoginParams): Promise<LoginResult> {
        const response = await authRepository.login(params);
        
        if (!response.success) {
            throw new Error(response.message || 'Login gagal');
        }

        // Store token in localStorage
        localStorage.setItem(TOKEN_KEY, response.data.token);

        return {
            user: response.data.user,
            token: response.data.token,
        };
    }
}

export const loginUseCase = new LoginUseCase();
