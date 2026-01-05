/**
 * useLogin Hook
 * Handles all login form logic - state, validation, and submission
 * 
 * Follows React best practice: separation of logic from UI
 */

import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from './useAuth';

interface UseLoginReturn {
    // Form state
    identifier: string;
    password: string;
    showPassword: boolean;
    
    // Error state
    identifierError: string;
    passwordError: string;
    generalError: string;
    
    // Loading state
    isLoading: boolean;
    
    // Actions
    setIdentifier: (value: string) => void;
    setPassword: (value: string) => void;
    setShowPassword: (value: boolean) => void;
    toggleShowPassword: () => void;
    handleSubmit: (e: FormEvent) => Promise<void>;
}

/**
 * useLogin - Custom hook that handles login logic
 * Supports login with email or NIK
 */
export function useLogin(): UseLoginReturn {
    const navigate = useNavigate();
    const { login } = useAuth();

    // Form state
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Error state
    const [identifierError, setIdentifierError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');

    // Loading state
    const [isLoading, setIsLoading] = useState(false);

    const clearErrors = () => {
        setIdentifierError('');
        setPasswordError('');
        setGeneralError('');
    };

    const validateForm = (): boolean => {
        let isValid = true;
        clearErrors();

        if (!identifier.trim()) {
            setIdentifierError('Email atau NIK wajib diisi');
            isValid = false;
        }

        if (!password) {
            setPasswordError('Password wajib diisi');
            isValid = false;
        }

        return isValid;
    };

    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setGeneralError('');

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await login(identifier.trim(), password);
            toast.success('Login berhasil!');
            navigate('/dashboard');
        } catch (err) {
            if (err instanceof Error) {
                setGeneralError(err.message);
                toast.error(err.message);
            } else {
                const errorMsg = 'Terjadi kesalahan. Silakan coba lagi.';
                setGeneralError(errorMsg);
                toast.error(errorMsg);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        // Form state
        identifier,
        password,
        showPassword,
        
        // Error state
        identifierError,
        passwordError,
        generalError,
        
        // Loading state
        isLoading,
        
        // Actions
        setIdentifier,
        setPassword,
        setShowPassword,
        toggleShowPassword,
        handleSubmit,
    };
}
