/**
 * Logout UseCase
 * Handles logout logic and token removal
 */

import { authRepository } from '../../../data/repositories/AuthRepositoryImpl';
import { TOKEN_KEY } from '../../../data/core/api';

export class LogoutUseCase {
    async execute(): Promise<void> {
        try {
            // Call API to invalidate token on server
            await authRepository.logout();
        } catch (error) {
            // Even if API call fails, we still clear local token
            console.warn('[Logout] API call failed, clearing local token anyway', error);
        } finally {
            // Always clear local token
            localStorage.removeItem(TOKEN_KEY);
        }
    }
}

export const logoutUseCase = new LogoutUseCase();
