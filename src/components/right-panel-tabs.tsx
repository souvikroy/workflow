
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AiHelperTab } from "./ai-helper-tab";
import { JsonViewTab } from "./json-view-tab";
import { ConfigPlaceholderTab } from "./config-placeholder-tab";
import type { Workflow } from "@/types/workflow";
import { Settings, Wand2, Code } from "lucide-react";

interface RightPanelTabsProps {
  currentWorkflow: Workflow | null;
  onApplyAiSuggestion: (suggestedWorkflow: Workflow) => void;
}

export function RightPanelTabs({ currentWorkflow, onApplyAiSuggestion }: RightPanelTabsProps) {
  return (
    <Tabs defaultValue="config" className="h-full flex flex-col border-0 rounded-none">
      <TabsList className="grid w-full grid-cols-3 rounded-none border-b">
        <TabsTrigger value="config" className="rounded-none gap-2">
          <Settings className="h-4 w-4" /> Config
        </TabsTrigger>
        <TabsTrigger value="ai-helper" className="rounded-none gap-2">
          <Wand2 className="h-4 w-4" /> AI Helper
        </TabsTrigger>
        <TabsTrigger value="json" className="rounded-none gap-2">
          <Code className="h-4 w-4" /> JSON
        </TabsTrigger>
      </TabsList>
      <TabsContent value="config" className="flex-grow overflow-auto mt-0">
        <ConfigPlaceholderTab />
      </TabsContent>
      <TabsContent value="ai-helper" className="flex-grow overflow-auto mt-0">
        <AiHelperTab onApplySuggestion={onApplyAiSuggestion} />
      </TabsContent>
      <TabsContent value="json" className="flex-grow overflow-auto mt-0">
        <JsonViewTab workflow={currentWorkflow} />
      </TabsContent>
    </Tabs>
  );
}
