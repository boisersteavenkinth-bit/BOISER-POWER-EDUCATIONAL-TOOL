import { useState, useEffect, useCallback } from 'react';

export interface StorageBreakdown {
  quotaBytes: number;
  usedBytes: number;
  percentUsed: number;
  cacheCount: number;
  localStorageKeysCount: number;
  draftsCount: number;
  isPersisted: boolean;
}

export function useStorageManager() {
  const [breakdown, setBreakdown] = useState<StorageBreakdown>({
    quotaBytes: 0,
    usedBytes: 0,
    percentUsed: 0,
    cacheCount: 0,
    localStorageKeysCount: 0,
    draftsCount: 0,
    isPersisted: false
  });
  const [isClearing, setIsClearing] = useState(false);
  const [clearResult, setClearResult] = useState<string | null>(null);

  const refreshStorageMetrics = useCallback(async () => {
    let quota = 0;
    let used = 0;

    if (navigator.storage && navigator.storage.estimate) {
      try {
        const estimate = await navigator.storage.estimate();
        quota = estimate.quota || 0;
        used = estimate.usage || 0;
      } catch (e) {
        console.warn('Storage estimate failed:', e);
      }
    }

    let isPersisted = false;
    if (navigator.storage && navigator.storage.persisted) {
      try {
        isPersisted = await navigator.storage.persisted();
      } catch {
        // ignore
      }
    }

    let cacheCount = 0;
    if ('caches' in window) {
      try {
        const keys = await caches.keys();
        cacheCount = keys.length;
      } catch {
        // ignore
      }
    }

    const localStorageKeysCount = Object.keys(localStorage).length;

    // Count local drafts
    let draftsCount = 0;
    const rawDrafts = localStorage.getItem('boiser_draft_vault') || localStorage.getItem('boiser_saved_projects');
    if (rawDrafts) {
      try {
        const parsed = JSON.parse(rawDrafts);
        if (Array.isArray(parsed)) draftsCount = parsed.length;
      } catch {
        // ignore
      }
    }

    const percentUsed = quota > 0 ? Math.min(100, (used / quota) * 100) : 0;

    setBreakdown({
      quotaBytes: quota,
      usedBytes: used,
      percentUsed,
      cacheCount,
      localStorageKeysCount,
      draftsCount,
      isPersisted
    });
  }, []);

  useEffect(() => {
    refreshStorageMetrics();
  }, [refreshStorageMetrics]);

  // Safe Cache Clear: deletes CacheStorage and non-critical temporary keys,
  // preserving user authentication, active draft projects, and master credentials.
  const clearCache = async (clearTemporaryOnly = true) => {
    setIsClearing(true);
    setClearResult(null);

    try {
      let cachesDeleted = 0;
      if ('caches' in window) {
        const keys = await caches.keys();
        for (const key of keys) {
          // Keep active service worker cache shell if temporary only
          if (clearTemporaryOnly && key.includes('shell')) continue;
          await caches.delete(key);
          cachesDeleted++;
        }
      }

      // Clean temporary localStorage items (like search queries, temporary preview buffers)
      const temporaryKeys = [
        'temporary_preview_buffer',
        'lnnchs_temp_filter',
        'last_tts_voice_cache',
        'temp_search_history',
        'boiser_temp_export_cache'
      ];

      let keysCleared = 0;
      temporaryKeys.forEach((key) => {
        if (localStorage.getItem(key)) {
          localStorage.removeItem(key);
          keysCleared++;
        }
      });

      await refreshStorageMetrics();
      setClearResult(`Successfully freed storage: ${cachesDeleted} cache stores cleared, ${keysCleared} temp buffers cleaned. Your cloud account and project drafts were safely preserved.`);
    } catch (err: any) {
      setClearResult(`Error clearing storage: ${err.message || err}`);
    } finally {
      setIsClearing(false);
    }
  };

  // Export draft vault as JSON backup file
  const exportDraftsBackup = () => {
    const raw = localStorage.getItem('boiser_draft_vault') || localStorage.getItem('boiser_saved_projects') || '[]';
    const blob = new Blob([raw], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `boiser-power-tools-drafts-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return {
    breakdown,
    isClearing,
    clearResult,
    refreshStorageMetrics,
    clearCache,
    exportDraftsBackup
  };
}
