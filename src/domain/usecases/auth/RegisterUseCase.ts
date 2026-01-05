/**
 * Register UseCase
 * Handles registration logic and token storage
 */

import { authRepository } from '../../../data/repositories/AuthRepositoryImpl';
import { TOKEN_KEY } from '../../../data/core/api';
import type { RegisterParams, User } from '../../entities/User';

export interface RegisterResult {
    user: User;
    token: string;
}

export class RegisterUseCase {
    async execute(params: RegisterParams): Promise<RegisterResult> {
        const response = await authRepository.register(params);
        
        if (!response.success) {
            throw new Error(response.message || 'Registrasi gagal');
        }

        // Store token in localStorage
        localStorage.setItem(TOKEN_KEY, response.data.token);

        return {
            user: response.data.user,
            token: response.data.token,
        };
    }
}

export const registerUseCase = new RegisterUseCase();
