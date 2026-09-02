import React from 'react';
import { NodeCatalogEntry } from '../types/nodeExplorer';
import { fetchNodeCatalog } from '../api/nodeExplorer';

interface UseNodeCatalogResult {
  entries: NodeCatalogEntry[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

// Walking the full node-explorer tree is slow and not always needed, so callers pass `enabled`
// to gate the automatic on-mount/on-toggle load. `refresh` always fetches immediately regardless
// of `enabled`, since a manual refresh is an explicit user action. `apiServerUrl` is configured
// from the playground UI (not an env var), so changing it re-triggers the load like `enabled` does.
export function useNodeCatalog(enabled: boolean, apiServerUrl: string): UseNodeCatalogResult {
  const [entries, setEntries] = React.useState<NodeCatalogEntry[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchNodeCatalog(apiServerUrl)
      .then((result) => {
        if (!cancelled) setEntries(result);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load node catalog');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [apiServerUrl]);

  React.useEffect(() => {
    if (!enabled) return;
    return load();
  }, [enabled, load]);

  return { entries, loading, error, refresh: load };
}
