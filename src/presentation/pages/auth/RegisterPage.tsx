/**
 * Register Page
 * New user registration with email/password
 * 
 * UI-only component - all logic handled by useRegister hook
 * Uses extracted components for better maintainability and consistency
 */

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRegister } from '../../hooks/useRegister';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { AuthBrandingPanel, LoadingOverlay, MobileLogo, RegisterForm } from '../../components/auth';

export function RegisterPage() {
    useDocumentTitle('Daftar');
    const {
        name,
        email,
        password,
        passwordConfirmation,
        nik,
        phoneNumber,
        setName,
        setEmail,
        setPassword,
        setPasswordConfirmation,
        setNik,
        setPhoneNumber,
        fieldErrors,
        generalError,
        isLoading,
        passwordStrength,
        handleSubmit,
    } = useRegister();

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    // Show toast on error
    const onSubmit = async (e: React.FormEvent) => {
        try {
            await handleSubmit(e);
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex relative">
            {isLoading && <LoadingOverlay message="Memproses pendaftaran..." />}
            
            <AuthBrandingPanel />

            {/* Right Side - Register Form */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
                <div className="w-full max-w-md">
                    <MobileLogo />

                    <RegisterForm
                        name={name}
                        email={email}
                        password={password}
                        passwordConfirmation={passwordConfirmation}
                        nik={nik}
                        phoneNumber={phoneNumber}
                        showPassword={showPassword}
                        showPasswordConfirmation={showPasswordConfirmation}
                        fieldErrors={fieldErrors}
                        generalError={generalError}
                        isLoading={isLoading}
                        passwordStrength={passwordStrength}
                        onNameChange={setName}
                        onEmailChange={setEmail}
                        onPasswordChange={setPassword}
                        onPasswordConfirmationChange={setPasswordConfirmation}
                        onNikChange={setNik}
                        onPhoneNumberChange={setPhoneNumber}
                        onTogglePassword={() => setShowPassword(!showPassword)}
                        onTogglePasswordConfirmation={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                        onSubmit={onSubmit}
                    />

                    {/* Location info - mobile only, outside card */}
                    <div className="lg:hidden mt-8 text-center">
                        <p className="text-sm text-gray-500">Desa Tondomulyo, Kec. Jakenan, Kab. Pati</p>
                        <p className="text-xs text-gray-400">Jawa Tengah • Indonesia</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
