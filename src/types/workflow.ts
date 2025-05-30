
export interface WorkflowNode {
  id: string;
  type: string;
  label: string;
  position: { x: number; y: number };
  parameters?: Record<string, any>;
}

export interface WorkflowConnection {
  id: string;
  source: string; // source node id
  target: string; // target node id
  // Optional: sourceHandle, targetHandle if nodes have multiple ports
}

export interface Workflow {
  id: string;
  name: string;
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  // additional metadata like description, version, etc.
  description?: string;
  version?: string;
}

// For AI suggestions, the configuration is a string initially
export interface WorkflowSuggestion {
  suggestedWorkflowConfiguration: string; // JSON string
}
