
"use client";

import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { FilePlus2, Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Workflow } from '@/types/workflow';

interface WorkflowActionsBarProps {
  currentWorkflow: Workflow | null;
  onNewWorkflow: () => void;
  onImportWorkflow: (workflow: Workflow) => void;
}

export function WorkflowActionsBar({ currentWorkflow, onNewWorkflow, onImportWorkflow }: WorkflowActionsBarProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    if (!currentWorkflow) {
      toast({ title: "Export Error", description: "No workflow to export.", variant: "destructive" });
      return;
    }
    const jsonString = JSON.stringify(currentWorkflow, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `${currentWorkflow.name || "workflow"}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
    toast({ title: "Exported", description: "Workflow JSON downloaded." });
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string) as Workflow;
          // Basic validation
          if (json && json.nodes && json.connections && json.name) {
            onImportWorkflow(json);
            toast({ title: "Import Successful", description: `Workflow "${json.name}" imported.` });
          } else {
            throw new Error("Invalid workflow_legacy.json format.");
          }
        } catch (error) {
          toast({ title: "Import Error", description: "Failed to parse or invalid workflow_legacy.json file.", variant: "destructive" });
        }
      };
      reader.readAsText(file);
      // Reset file input value to allow importing the same file again
      if(fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-3 border-b bg-card flex items-center space-x-2">
      <Button variant="outline" size="sm" onClick={onNewWorkflow}>
        <FilePlus2 className="mr-2 h-4 w-4" /> New Workflow
      </Button>
      <Button variant="outline" size="sm" onClick={handleImportClick}>
        <Upload className="mr-2 h-4 w-4" /> Import JSON
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
      <Button variant="outline" size="sm" onClick={handleExport} disabled={!currentWorkflow}>
        <Download className="mr-2 h-4 w-4" /> Export JSON
      </Button>
    </div>
  );
}
