/**
 * useDashboard Hook
 * State and logic for Dashboard page
 * Uses DataCacheContext for caching
 */

import { useState, useEffect, useCallback } from 'react';
import { dashboardApiDataSource } from '../../data/datasources/DashboardApiDataSource';
import type { DashboardStats, DashboardChartItem } from '../../data/models/DashboardApiTypes';
import { useDataCache } from '../contexts/RealtimeDataContext';

// Cache for chart data (not in context cache)
let chartDataCache: DashboardChartItem[] = [];
let chartCacheTimestamp: number | null = null;
const CHART_CACHE_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

export function useDashboard() {
    const { fetchStats, dashboardStats, isStatsLoading } = useDataCache();
    
    const [chartData, setChartData] = useState<DashboardChartItem[]>(chartDataCache);
    const [isChartLoading, setIsChartLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Check if chart cache is valid
    const isChartCacheValid = useCallback(() => {
        if (!chartCacheTimestamp) return false;
        return Date.now() - chartCacheTimestamp < CHART_CACHE_EXPIRY_MS;
    }, []);

    // Fetch chart data with caching
    const fetchChartData = useCallback(async (forceRefresh = false) => {
        // Return cached data if valid
        if (!forceRefresh && isChartCacheValid() && chartDataCache.length > 0) {
            console.log('[Dashboard] Using cached chart data');
            setChartData(chartDataCache);
            return;
        }

        console.log('[Dashboard] Fetching chart data from API...');
        setIsChartLoading(true);
        try {
            const chartRes = await dashboardApiDataSource.getChartData();
            if (chartRes.success) {
                chartDataCache = chartRes.data;
                chartCacheTimestamp = Date.now();
                setChartData(chartRes.data);
            }
        } catch (err) {
            console.error('[useDashboard] Error fetching chart data:', err);
            setError('Gagal memuat data chart');
        } finally {
            setIsChartLoading(false);
        }
    }, [isChartCacheValid]);

    // Load data on mount (uses cache if valid)
    useEffect(() => {
        fetchStats(); // Uses context cache
        fetchChartData(); // Uses local chart cache
    }, [fetchStats, fetchChartData]);

    // Refresh function for force reload
    const refresh = useCallback(async () => {
        setError(null);
        await Promise.all([
            fetchStats(true),
            fetchChartData(true)
        ]);
    }, [fetchStats, fetchChartData]);

    // Convert context stats format to API stats format
    const stats: DashboardStats | null = dashboardStats ? {
        total_peserta: dashboardStats.totalPeserta,
        kunjungan_hari_ini: dashboardStats.totalKunjungan,
        kategori: {
            bumil: dashboardStats.totalBumil,
            balita: dashboardStats.totalBalita,
            remaja: dashboardStats.totalRemaja,
            produktif: dashboardStats.totalProduktif,
            lansia: dashboardStats.totalLansia
        }
    } : null;

    return {
        stats,
        chartData,
        isLoading: isStatsLoading || isChartLoading,
        error,
        refresh
    };
}
