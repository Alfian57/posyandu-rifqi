
import { RouterProvider } from 'react-router-dom'
import { router } from './presentation/routes/router'
import { AuthProvider } from './presentation/hooks/useAuth'
import { DataCacheProvider } from '@/presentation/contexts/RealtimeDataContext'
import { Toaster } from 'react-hot-toast'

import './index.css'

// Expose database and cache utilities to window for easy console access
declare global {
  interface Window {
    posyanduDB: {
      clearAll: () => Promise<void>;
      getStats: () => Promise<{ peserta: number; kunjungan: number; activities: number }>;
      clearCache: () => void;
      getCacheInfo: () => { used: string; keys: string[] };
    };
  }
}

function App() {

  return (
    <AuthProvider>
      <DataCacheProvider>
        <Toaster position="top-right" />
        <RouterProvider router={router} />
      </DataCacheProvider>
    </AuthProvider>
  )
}

export default App
