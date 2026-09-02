export interface NodeDataIO {
  name: string;
  contentType: string;
}

// Mirrors continuum-platform-core/continuum-commons ContinuumWorkflowModel.NodeData.
// propertiesUISchema is capitalized exactly like this on the backend.
export interface NodeData {
  id?: string | null;
  description: string;
  title: string;
  subTitle?: string | null;
  icon?: string | null;
  nodeModel: string;
  inputs?: Record<string, NodeDataIO>;
  outputs?: Record<string, NodeDataIO>;
  properties: Record<string, any>;
  propertiesSchema: Record<string, any>;
  propertiesUISchema: Record<string, any>;
}

export type NodeExplorerItemType = 'CATEGORY' | 'NODE';

// Mirrors NodeExplorerController's tree item shape (api-server).
export interface NodeExplorerTreeItem {
  id: string;
  name: string;
  nodeInfo?: NodeData | null;
  hasChildren: boolean;
  type: NodeExplorerItemType;
  children?: NodeExplorerTreeItem[] | null;
}

export interface NodeCatalogEntry {
  id: string;
  name: string;
  categoryPath: string;
  nodeInfo: NodeData;
}
