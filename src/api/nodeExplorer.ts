import { NodeCatalogEntry, NodeExplorerTreeItem } from '../types/nodeExplorer';

const API_SERVER_URL: string =
  (import.meta.env.VITE_API_SERVER_URL as string | undefined) || 'http://localhost:8081';

export async function fetchChildren(parentId?: string): Promise<NodeExplorerTreeItem[]> {
  const url = new URL('/api/v1/node-explorer/children', API_SERVER_URL);
  if (parentId) {
    url.searchParams.set('parentId', parentId);
  }
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`node-explorer request failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

async function walk(parentId: string | undefined, categoryPath: string, out: NodeCatalogEntry[]): Promise<void> {
  const items = await fetchChildren(parentId);
  await Promise.all(
    items.map(async (item) => {
      if (item.type === 'NODE' && item.nodeInfo) {
        out.push({
          id: item.id,
          name: item.name,
          categoryPath: categoryPath || 'Uncategorized',
          nodeInfo: item.nodeInfo,
        });
      } else if (item.type === 'CATEGORY' && item.hasChildren) {
        const childPath = categoryPath ? `${categoryPath} / ${item.name}` : item.name;
        await walk(item.id, childPath, out);
      }
    })
  );
}

export async function fetchNodeCatalog(): Promise<NodeCatalogEntry[]> {
  const entries: NodeCatalogEntry[] = [];
  await walk(undefined, '', entries);
  entries.sort((a, b) => a.categoryPath.localeCompare(b.categoryPath) || a.name.localeCompare(b.name));
  return entries;
}
