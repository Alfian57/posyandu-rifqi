/**
 * FormLoadingOverlay - Fullscreen overlay for form submission
 */

import { Loader2 } from "lucide-react";

interface FormLoadingOverlayProps {
  title?: string;
  message?: string;
}

export function FormLoadingOverlay({ 
  title = "Menyimpan Data", 
  message = "Mohon tunggu sebentar..." 
}: FormLoadingOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <div className="text-center">
          <p className="text-base font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500 mt-1">{message}</p>
        </div>
      </div>
    </div>
  );
}
