
"use client"; // This page manages state and interactivity, so it's a client component.

import React, { useState, useEffect } from 'react';
import { AppHeader } from "@/components/layout/app-header";
import { NodeLibrary } from "@/components/node-library";
import { WorkflowCanvas } from "@/components/workflow-canvas";
import { RightPanelTabs } from "@/components/right-panel-tabs";
import { WorkflowActionsBar } from "@/components/workflow-actions-bar";
import type { Workflow } from "@/types/workflow";
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

// Default empty workflow
const createNewWorkflow = (): Workflow => ({
  id: uuidv4(),
  name: "Untitled Workflow",
  nodes: [],
  connections: [],
  description: "A new blank workflow.",
  version: "1.0.0"
});

export default function HomePage() {
  const [currentWorkflow, setCurrentWorkflow] = useState<Workflow | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure client-side only rendering for components relying on window/document
    setCurrentWorkflow(createNewWorkflow()); // Initialize with a new workflow on mount
  }, []);


  const handleNewWorkflow = () => {
    setCurrentWorkflow(createNewWorkflow());
  };

  const handleImportWorkflow = (importedWorkflow: Workflow) => {
    setCurrentWorkflow(importedWorkflow);
  };

  const handleApplyAiSuggestion = (suggestedWorkflow: Workflow) => {
    // The AI might return a partial structure or a full one.
    // For now, let's assume it returns a full workflow structure.
    // We might want to merge or validate it more thoroughly in a real app.
    setCurrentWorkflow({
      id: currentWorkflow?.id || uuidv4(), // Keep current ID or generate new
      name: suggestedWorkflow.name || currentWorkflow?.name || "AI Suggested Workflow",
      nodes: suggestedWorkflow.nodes || [],
      connections: suggestedWorkflow.connections || [],
      description: suggestedWorkflow.description || "Workflow generated by AI.",
      version: suggestedWorkflow.version || "1.0.0"
    });
  };
  
  if (!isClient) {
    // Render nothing or a loading indicator SSR/SSG, to avoid hydration mismatch for UUID
    return null; 
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      <AppHeader />
      <WorkflowActionsBar 
        currentWorkflow={currentWorkflow}
        onNewWorkflow={handleNewWorkflow}
        onImportWorkflow={handleImportWorkflow}
      />
      <main className="flex flex-row flex-grow overflow-hidden">
        <aside className="w-72 border-r border-sidebar-border flex-shrink-0 bg-card overflow-y-auto">
          <NodeLibrary />
        </aside>
        <section className="flex-grow flex flex-col overflow-hidden">
          {/* This is where the main canvas will be */}
          <WorkflowCanvas />
        </section>
        <aside className="w-96 border-l border-sidebar-border flex-shrink-0 bg-card overflow-y-auto">
          <RightPanelTabs 
            currentWorkflow={currentWorkflow}
            onApplyAiSuggestion={handleApplyAiSuggestion}
          />
        </aside>
      </main>
    </div>
  );
}
