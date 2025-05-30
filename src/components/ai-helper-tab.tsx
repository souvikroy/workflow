
"use client";

import React, { useState, useTransition } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { suggestWorkflowAction } from "@/app/actions";
import type { Workflow } from '@/types/workflow';
import { Wand2, Loader2, ClipboardCopy, Check } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface AiHelperTabProps {
  onApplySuggestion: (suggestedWorkflow: Workflow) => void;
}

export function AiHelperTab({ onApplySuggestion }: AiHelperTabProps) {
  const [description, setDescription] = useState("");
  const [suggestedJson, setSuggestedJson] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    if (!description.trim()) {
      toast({ title: "Input Required", description: "Please describe your desired workflow.", variant: "destructive" });
      return;
    }

    startTransition(async () => {
      const result = await suggestWorkflowAction({ description });
      if ("error" in result) {
        toast({ title: "AI Suggestion Error", description: result.error, variant: "destructive" });
        setSuggestedJson(null);
      } else {
        const formattedJson = JSON.stringify(JSON.parse(result.suggestedWorkflowConfiguration), null, 2);
        setSuggestedJson(formattedJson);
        toast({ title: "AI Suggestion Ready", description: "Workflow configuration suggested." });
      }
    });
  };

  const handleApply = () => {
    if (suggestedJson) {
      try {
        const parsedWorkflow = JSON.parse(suggestedJson) as Workflow; // Assuming the AI returns the full Workflow structure
        onApplySuggestion(parsedWorkflow);
        toast({ title: "Suggestion Applied", description: "The AI-suggested workflow has been loaded." });
      } catch (error) {
        toast({ title: "Apply Error", description: "Could not parse or apply the suggestion.", variant: "destructive" });
      }
    }
  };
  
  const handleCopy = () => {
    if (suggestedJson) {
      navigator.clipboard.writeText(suggestedJson).then(() => {
        setCopied(true);
        toast({ title: "Copied!", description: "Suggestion copied to clipboard." });
        setTimeout(() => setCopied(false), 2000);
      }).catch(err => {
        toast({ title: "Copy Failed", description: "Could not copy to clipboard.", variant: "destructive" });
      });
    }
  };

  return (
    <div className="p-4 space-y-4 h-full flex flex-col">
      <Label htmlFor="workflow-description" className="text-base font-semibold">Describe your workflow</Label>
      <Textarea
        id="workflow-description"
        placeholder="e.g., 'When a new file is uploaded to S3, process it with a Lambda function, then send a notification to Slack.'"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="min-h-[100px] text-sm"
      />
      <Button onClick={handleSubmit} disabled={isPending} className="w-full">
        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
        Get AI Suggestions
      </Button>

      {suggestedJson && (
        <div className="space-y-2 flex-grow flex flex-col min-h-0">
          <h3 className="text-base font-semibold">Suggested Workflow (JSON)</h3>
          <div className="relative flex-grow min-h-0">
            <ScrollArea className="h-full border rounded-md bg-muted/30">
              <pre className="p-4 text-xs whitespace-pre-wrap break-all">{suggestedJson}</pre>
            </ScrollArea>
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-7 w-7"
                onClick={handleCopy}
                title="Copy JSON"
              >
                {copied ? <Check className="h-4 w-4 text-accent" /> : <ClipboardCopy className="h-4 w-4" />}
            </Button>
          </div>
          <Button onClick={handleApply} variant="outline" className="w-full mt-2">Apply Suggestion to Canvas</Button>
        </div>
      )}
    </div>
  );
}
