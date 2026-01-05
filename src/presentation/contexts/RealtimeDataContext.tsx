/**
 * DataCacheContext
 * Global state management with cache expiry for API data
 * - Cache expiry: 5 minutes
 * - Force refresh capability
 */

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import type { PesertaListItem } from '../../data/models/PesertaApiTypes';
import type { PemeriksaanListItem } from '../../data/models/PemeriksaanApiTypes';
import { pesertaApiDataSource } from '../../data/datasources/PesertaApiDataSource';
import { pemeriksaanApiDataSource } from '../../data/datasources/PemeriksaanApiDataSource';
import { dashboardApiDataSource } from '../../data/datasources/DashboardApiDataSource';

// Cache expiry time in milliseconds (5 minutes)
const CACHE_EXPIRY_MS = 5 * 60 * 1000;

interface DashboardStats {
    totalPeserta: number;
    totalKunjungan: number;
    pesertaBaruBulanIni: number;
    kunjunganBulanIni: number;
    totalBumil: number;
    totalBalita: number;
    totalRemaja: number;
    totalProduktif: number;
    totalLansia: number;
}

interface CacheTimestamps {
    peserta: number | null;
    pemeriksaan: number | null;
    stats: number | null;
}

interface DataCacheContextType {
    // Data
    pesertaList: PesertaListItem[];
    pemeriksaanList: PemeriksaanListItem[];
    dashboardStats: DashboardStats;
    
    // Loading states
    isPesertaLoading: boolean;
    isPemeriksaanLoading: boolean;
    isStatsLoading: boolean;
    isSyncing: boolean;
    
    // Cache info
    lastSyncTime: Date | null;
    cacheTimestamps: CacheTimestamps;
    
    // Sync functions (uses cache if valid)
    fetchPeserta: (forceRefresh?: boolean) => Promise<PesertaListItem[]>;
    fetchPemeriksaan: (forceRefresh?: boolean) => Promise<PemeriksaanListItem[]>;
    fetchStats: (forceRefresh?: boolean) => Promise<DashboardStats>;
    
    // Force refresh all
    forceRefreshAll: () => Promise<void>;
    
    // Cache validation
    isCacheValid: (type: 'peserta' | 'pemeriksaan' | 'stats') => boolean;
    
    // Legacy compatibility
    syncPeserta: () => Promise<boolean>;
    syncKunjungan: () => Promise<boolean>;
    syncStats: () => Promise<boolean>;
    syncAll: () => Promise<void>;
    kunjunganList: PemeriksaanListItem[]; // alias for backward compatibility
}

const DataCacheContext = createContext<DataCacheContextType | undefined>(undefined);

export function DataCacheProvider({ children }: { children: React.ReactNode }) {
    // Data state
    const [pesertaList, setPesertaList] = useState<PesertaListItem[]>([]);
    const [pemeriksaanList, setPemeriksaanList] = useState<PemeriksaanListItem[]>([]);
    const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
        totalPeserta: 0,
        totalKunjungan: 0,
        pesertaBaruBulanIni: 0,
        kunjunganBulanIni: 0,
        totalBumil: 0,
        totalBalita: 0,
        totalRemaja: 0,
        totalProduktif: 0,
        totalLansia: 0
    });

    // Loading states
    const [isPesertaLoading, setIsPesertaLoading] = useState(false);
    const [isPemeriksaanLoading, setIsPemeriksaanLoading] = useState(false);
    const [isStatsLoading, setIsStatsLoading] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

    // Cache timestamps
    const cacheTimestampsRef = useRef<CacheTimestamps>({
        peserta: null,
        pemeriksaan: null,
        stats: null
    });

    // Check if cache is valid
    const isCacheValid = useCallback((type: 'peserta' | 'pemeriksaan' | 'stats'): boolean => {
        const timestamp = cacheTimestampsRef.current[type];
        if (!timestamp) return false;
        return Date.now() - timestamp < CACHE_EXPIRY_MS;
    }, []);

    // Fetch peserta with cache
    const fetchPeserta = useCallback(async (forceRefresh = false): Promise<PesertaListItem[]> => {
        // Return cached data if valid and not forcing refresh
        if (!forceRefresh && isCacheValid('peserta') && pesertaList.length > 0) {
            console.log('[Cache] Using cached peserta data');
            return pesertaList;
        }

        console.log('[Cache] Fetching peserta from API...');
        setIsPesertaLoading(true);
        try {
            const response = await pesertaApiDataSource.getPeserta({ limit: 100 });
            if (response.success && response.data) {
                const data = Array.isArray(response.data) 
                    ? response.data 
                    : response.data.data || [];
                setPesertaList(data);
                cacheTimestampsRef.current.peserta = Date.now();
                return data;
            }
            return pesertaList;
        } catch (error) {
            console.error('[Cache] Error fetching peserta:', error);
            return pesertaList;
        } finally {
            setIsPesertaLoading(false);
        }
    }, [pesertaList, isCacheValid]);

    // Fetch pemeriksaan with cache
    const fetchPemeriksaan = useCallback(async (forceRefresh = false): Promise<PemeriksaanListItem[]> => {
        if (!forceRefresh && isCacheValid('pemeriksaan') && pemeriksaanList.length > 0) {
            console.log('[Cache] Using cached pemeriksaan data');
            return pemeriksaanList;
        }

        console.log('[Cache] Fetching pemeriksaan from API...');
        setIsPemeriksaanLoading(true);
        try {
            const response = await pemeriksaanApiDataSource.getPemeriksaan({ limit: 100 });
            if (response.success && response.data) {
                const data = response.data.data || [];
                setPemeriksaanList(data);
                cacheTimestampsRef.current.pemeriksaan = Date.now();
                return data;
            }
            return pemeriksaanList;
        } catch (error) {
            console.error('[Cache] Error fetching pemeriksaan:', error);
            return pemeriksaanList;
        } finally {
            setIsPemeriksaanLoading(false);
        }
    }, [pemeriksaanList, isCacheValid]);

    // Fetch stats with cache
    const fetchStats = useCallback(async (forceRefresh = false): Promise<DashboardStats> => {
        if (!forceRefresh && isCacheValid('stats')) {
            console.log('[Cache] Using cached stats data');
            return dashboardStats;
        }

        console.log('[Cache] Fetching stats from API...');
        setIsStatsLoading(true);
        try {
            const response = await dashboardApiDataSource.getStats();
            if (response.success && response.data) {
                const apiData = response.data;
                const stats: DashboardStats = {
                    totalPeserta: apiData.total_peserta || 0,
                    totalKunjungan: apiData.kunjungan_hari_ini || 0,
                    pesertaBaruBulanIni: 0, // Not in current API
                    kunjunganBulanIni: apiData.kunjungan_hari_ini || 0,
                    totalBumil: apiData.kategori?.bumil || 0,
                    totalBalita: apiData.kategori?.balita || 0,
                    totalRemaja: apiData.kategori?.remaja || 0,
                    totalProduktif: apiData.kategori?.produktif || 0,
                    totalLansia: apiData.kategori?.lansia || 0
                };
                setDashboardStats(stats);
                cacheTimestampsRef.current.stats = Date.now();
                // Update lastSyncTime when stats are successfully loaded
                setLastSyncTime(new Date());
                return stats;
            }
            return dashboardStats;
        } catch (error) {
            console.error('[Cache] Error fetching stats:', error);
            return dashboardStats;
        } finally {
            setIsStatsLoading(false);
        }
    }, [dashboardStats, isCacheValid]);

    // Force refresh all data
    const forceRefreshAll = useCallback(async () => {
        console.log('[Cache] Force refreshing all data...');
        setIsSyncing(true);
        try {
            await Promise.all([
                fetchPeserta(true),
                fetchPemeriksaan(true),
                fetchStats(true)
            ]);
            setLastSyncTime(new Date());
        } finally {
            setIsSyncing(false);
        }
    }, [fetchPeserta, fetchPemeriksaan, fetchStats]);

    // Legacy sync functions for backward compatibility
    const syncPeserta = useCallback(async () => {
        await fetchPeserta(true);
        return true;
    }, [fetchPeserta]);

    const syncKunjungan = useCallback(async () => {
        await fetchPemeriksaan(true);
        return true;
    }, [fetchPemeriksaan]);

    const syncStats = useCallback(async () => {
        await fetchStats(true);
        return true;
    }, [fetchStats]);

    const syncAll = useCallback(async () => {
        await forceRefreshAll();
    }, [forceRefreshAll]);

    // Initial fetch on mount
    useEffect(() => {
        fetchPeserta();
        fetchPemeriksaan();
        fetchStats();
    }, []);

    const value: DataCacheContextType = {
        pesertaList,
        pemeriksaanList,
        dashboardStats,
        isPesertaLoading,
        isPemeriksaanLoading,
        isStatsLoading,
        isSyncing,
        lastSyncTime,
        cacheTimestamps: cacheTimestampsRef.current,
        fetchPeserta,
        fetchPemeriksaan,
        fetchStats,
        forceRefreshAll,
        isCacheValid,
        // Legacy compatibility
        syncPeserta,
        syncKunjungan,
        syncStats,
        syncAll,
        kunjunganList: pemeriksaanList
    };

    return (
        <DataCacheContext.Provider value={value}>
            {children}
        </DataCacheContext.Provider>
    );
}

export function useDataCache() {
    const context = useContext(DataCacheContext);
    if (!context) {
        throw new Error('useDataCache must be used within a DataCacheProvider');
    }
    return context;
}
