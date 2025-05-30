
"use client";

import React, { useState } from 'react';
import type { Workflow } from "@/types/workflow";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from './ui/button';
import { ClipboardCopy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface JsonViewTabProps {
  workflow: Workflow | null;
}

export function JsonViewTab({ workflow }: JsonViewTabProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const workflowJson = workflow ? JSON.stringify(workflow, null, 2) : "No workflow loaded.";

  const handleCopy = () => {
    if (workflow) {
      navigator.clipboard.writeText(workflowJson).then(() => {
        setCopied(true);
        toast({ title: "Copied!", description: "Workflow JSON copied to clipboard." });
        setTimeout(() => setCopied(false), 2000);
      }).catch(err => {
        toast({ title: "Copy Failed", description: "Could not copy to clipboard.", variant: "destructive" });
      });
    }
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="relative flex-grow min-h-0">
        <ScrollArea className="h-full border rounded-md bg-muted/30">
          <pre className="p-4 text-xs whitespace-pre-wrap break-all">
            {workflowJson}
          </pre>
        </ScrollArea>
        {workflow && (
           <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-7 w-7"
              onClick={handleCopy}
              title="Copy JSON"
            >
              {copied ? <Check className="h-4 w-4 text-accent" /> : <ClipboardCopy className="h-4 w-4" />}
          </Button>
        )}
      </div>
    </div>
  );
}
