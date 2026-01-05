import { ClipLoader } from 'react-spinners';

interface FullPageLoadingProps {
    message?: string;
}

/**
 * FullPageLoading - Fullscreen loading overlay with dark background
 * Used to provide immediate feedback during page transitions or data fetching
 */
export function FullPageLoading({ message = "Memuat data..." }: FullPageLoadingProps) {
    return (
        <div className="fixed inset-0 z-100 bg-black/50 backdrop-blur-[2px] flex flex-col items-center justify-center">
            <ClipLoader color="#ffffff" size={50} speedMultiplier={0.8} />
            <p className="mt-4 text-white font-medium">{message}</p>
        </div>
    );
}
