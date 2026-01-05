/**
 * LoadingOverlay - Fullscreen loading overlay with spinner
 */

import { ClipLoader } from 'react-spinners';

interface LoadingOverlayProps {
    message?: string;
}

export function LoadingOverlay({ message = 'Memproses...' }: LoadingOverlayProps) {
    return (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex flex-col items-center justify-center">
            <ClipLoader color="#ffffff" size={50} speedMultiplier={0.8} />
            <p className="mt-4 text-white font-medium">{message}</p>
        </div>
    );
}
